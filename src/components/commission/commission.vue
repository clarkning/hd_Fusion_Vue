<template>
  <div class="commission">
    <div class="commission-head">
      <van-notice-bar
        v-if="noticeBarText"
        :text="noticeBarText"
        left-icon="volume-o"
        style="z-index: 999;"
      />
      <div class="available-amount" @click="goToPageSettles('可提金额')" :style="{ height: noticeBarText ? '110px' : '150px'}">
        <h1 class="money" :style="{ paddingTop: noticeBarText ? '20px' : '60px'}">{{amount.gainable}}</h1>
        <p>可提金额</p>
      </div>
      <div class="sum-money">
        <div class="ui-flex" @click="goToPageSettles('累计金额')">
          <p>{{amount.totalAmount}}</p>
          <span>累计</span>
        </div>
        <div class="ui-flex" @click="goToPageSettles('本月佣金')">
          <p>{{amount.curMonthAmount}}</p>
          <span>本月</span>
        </div>
        <div class="ui-flex" @click="goToPageSettles('待审佣金')">
          <p>{{amount.auditingAmount}}</p>
          <span>待审</span>
        </div>
      </div>
    </div>
    <div class="center-title">
      <div class="ui-flex">提现日期</div>
      <div class="ui-flex">状态</div>
      <div class="ui-flex">金额</div>
    </div>
    <div class="commission-center">
      <div
        class="center-body"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div
          class="center-body-list"
          v-for="item in paymentList"
          @click="goToPageAccountSettles(item.paymentId)">
          <div class="ui-flex">{{item.createTime.slice(0, 10)}}</div>
          <div
            class="ui-flex"
            :class="{
              database: item.status === '未支付'|| item.status === '银行处理中' || item.status === '分配金额失败',
              star: item.status === '已支付',
              leaf: item.status === '支付失败'
            }">
            {{item.status.replace('分配金额失败', '银行处理中')}}
          </div>
          <div class="ui-flex">{{item.amount}}</div>
        </div>
        <div v-if="paymentList.length === 0" class="null_data">
          <div class="null"></div>
          <p>亲，暂无数据哦~~</p>
        </div>
        <div>
          <div class="load noMore" v-show="noMore">已无更多</div>
          <div class="load" v-show="loading">
            <mt-spinner color="#d4d4d4" type="fading-circle" />
            正在加载
          </div>
        </div>
      </div>
    </div>

    <div class="withdraw-box">
      <mt-button type="primary" size="large" @click="goToPageWithdraw(amount.gainable)"
                 :class="{bgColor: amount.gainable <= 2}" :disabled="amount.gainable <= 2">提现
      </mt-button>
    </div>
    <BottomNav :select="selected" />
    <mt-popup
      v-model="showMess" position="center" lock-scroll="true" :closeOnClickModal="false"
      class="tips-popup popup-commission">
      <h2 class="tips-title">提示</h2>
      <p class="tips-p">您还有未到账佣金，录单即可。<br>是否前往？</p>
      <div class="button">
        <a class="cancel" @click="showMess = false">暂不录单</a>
        <a class="confirm" @click="goToPageMyOrder()">前往录单</a>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import BottomNav from '../public/bottom_nav.vue'
import api from '../../api/index2'
import { loadData, defaultPreHandler } from '../../common/utils'
import newApi from '../../api/fusion_api'
import _ from 'lodash'
import {SigningStatus} from '../../common/enum/fusion_resource'
import {MessageBox} from 'mint-ui'
import { NoticeBar } from 'vant'

export default {
  name: 'Commission',
  components: {
    BottomNav,
    [NoticeBar.name]: NoticeBar
  },
  data () {
    return {
      showMess: false,
      orderPage: 1,
      selected: 'commission',
      amount: {
        gainable: '',
        totalAmount: '',
        curMonthAmount: '',
        auditingAmount: '',
        isInputMember: '',
        isInputInvoice: ''
      },
      paymentList: [],
      page: 1,
      noMore: true,
      loading: false,
      isServiceFee: null,
      noticeBarText: '',
      createCodeError: {
        '304': '身份证正面识别失败，请重新上传',
        '305': '身份证反面识别失败，请重新上传'
      } // 开户状态code提示信息
    }
  },
  async beforeCreate () {
    this.$nextTick(function () {
      this.showMessage()
    })
  },
  async created () {
    await loadData(() => {
      return api.getCommissionAmount()
    }, (data) => {
      this.amount = data
      this.noticeBarText = data.tips
    }, defaultPreHandler, true)
    await loadData(() => {
      return api.getAccountPayments(this.page)
    }, (data) => {
      this.paymentList = data
    }, defaultPreHandler, true)
    this.page = Math.ceil(this.paymentList.length / 10)
    this.noMore = this.paymentList.length < (10 * this.page)
    this.getServiceFee()
  },
  methods: {
    async getServiceFee () {
      let data = defaultPreHandler(await api.getPersonBankInfo())
      this.isServiceFee = data.isServiceFee
    },
    goToPageMyOrder () {
      this.$router.push({
        path: 'MyOrder',
        query: {}
      })
    },
    async showMessage () {
      await loadData(() => {
        return api.getOrders(this.orderPage)
      }, (orderList) => {
        let orderFlag = _.some(orderList, (item) => {
          item.status = this.orderStatusStr(item.orderStatus, item.paymentDto.paymentStatus, item.paymentDto.payType)
          return item.status === '已支付,待录入'
        })
        if (orderFlag) {
          this.showMess = true
        } else {
          this.showMess = false
        }
      }, defaultPreHandler, false)
    },
    goToPageAccountSettles: function (paymentId) {
      this.$router.push({
        path: 'WithdrawDetailList',
        query: {
          paymentId
        }
      })
    },
    goToPageSettles: function (type) {
      this.$router.push({
        path: 'CommissionList',
        query: {
          type
        }
      })
    },
    async goToPageWithdraw () {
      // 个人信息不完整
      if (this.amount.isInputMember) {
        const fn = () => {
          this.$router.push({
            path: 'PersonInfo',
            query: {
              pathAddress: 'commission'
            }
          })
        }
        this.showMessageBox({message: '请先完善你的个人信息'}, fn)
        return
      }
      // 当前人在所有职位对应的【佣金发放方式】存在【服务结费】
      if (this.isServiceFee) {
        if (this.amount.isInputInvoice) {
          // 发票剩余额度不足够
          const fn = () => {
            this.$router.push({
              path: 'SubmitInvoice',
              query: {}
            })
          }
          this.showMessageBox({message: '发票额度不足，请充值', confirmButtonText: '立即充值'}, fn)
        } else {
          this.$router.push({
            path: 'WithdrawApplication',
            query: {}
          })
        }
        return
      }
      // 当前人在所有职位对应的【佣金发放方式】中不存在【服务结费】
      if (this.isAccountOpeningStatus) {
        // 已开户
        this.$router.push({
          path: 'WithdrawApplication',
          query: {}
        })
      } else {
        // 非开户状态
        await loadData(() => {
          return newApi.person.createContractSign({
            personId: this.$store.state.person.personId
          })
        }, (response) => {
          let signState = response.content && response.content.signingStatus
          if (Number(signState) !== SigningStatus.已开户) {
            const createCode = response.content && response.content.code
            const message = this.createCodeError[createCode] ? '银行系统身份证照片识别失败，请重新上传' : '实名认证未通过，请检查你的个人信息'
            const fn = () => {
              this.$router.push({
                path: 'PersonInfo',
                query: {
                  pathAddress: 'commission'
                }
              })
            }
            this.showMessageBox({message: message}, fn)
          } else {
            this.$router.push({
              path: 'WithdrawApplication',
              query: {}
            })
          }
        })
      }
    },
    showMessageBox ({message = '', showCancelButton = true, confirmButtonText = '立即完善'}, func) {
      MessageBox({
        message: message,
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        closeOnClickModal: false
      }).then(action => {
        action === 'confirm' && func()
      })
    },
    async loadMore () {
      if (this.noMore) return
      this.loading = true
      this.page += 1
      await loadData(() => {
        return api.getAccountPayments(this.page)
      }, (data) => {
        this.paymentList.push(...data)
        this.noMore = this.paymentList.length < (10 * this.page)
      }, defaultPreHandler, true)
      this.loading = false
    },
    orderStatusStr (orderCode, payCode, payMethod) {
      if (payCode === 30 || orderCode === 100) {
        return '已退款'
      } else if (payCode === 50 || orderCode === 40) {
        return '已取消'
      } else {
        let arr = [orderCode, payCode, payMethod]
        let status = arr.join('')
        switch (status) {
          case '110200':
            return '已完成'
          case '60200':
            return '已完成'
          case '110201':
            return '已完成'
          case '60201':
            return '已完成'
          case '60202':
            return '已完成'
          case '110202':
            return '已完成'
          case '20100':
            return '已支付,待录入'
          case '20202':
            return '已支付,待录入'
          case '20201':
            return '已支付,待录入'
          case '21100':
            return '未支付'
          // case '20102':
          //   return '未支付'
          // case '20101':
          //   return '未支付'
          // case '2010':
          //   return '未支付'
          default:
            return ''
        }
      }
    }
  },
  computed: {
    // 当前人员和第三方平台的开户状态为【已开户】
    isAccountOpeningStatus () {
      return this.amount.signingStatus === SigningStatus.已开户
    }
  }
}
</script>

<style scoped>
  .bgColor {
    background: #999;
  }

  .commission-head {
    background: #3396E4;
    color: #ffffff;
    position: fixed;
    top: 0;
    width: 100%;
    height: 195px;
  }

  .available-amount {
    text-align: center;
    height: 150px;
  }

  .available-amount p {
    font-size: 14px;
  }

  .commission .money {
    font-size: 40px;
    font-weight: normal;
    padding-top: 60px;
  }

  .sum-money .ui-flex {
    height: 45px;
    line-height: 1.5;
  }

  .sum-money .ui-flex span {
    font-size: 12px;
  }

  .sum-money, .center-title, .center-body-list {
    font-size: 14px;
    display: flex;
  }

  .sum-money .ui-flex, .center-title .ui-flex, .center-body-list .ui-flex {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-decoration: none;
    text-align: center;
  }

  .center-title .ui-flex {
    height: 45px;
    line-height: 45px;
  }

  .center-title {
    position: fixed;
    width: 100%;
    background: #FFFFFF;
    z-index: 99;
    top: 195px;
  }

  .commission-center {
    /* main绝对定位，进行内部滚动 */
    position: absolute;
    top: 241px;
    bottom: 96px;
    /* 使之可以滚动 */
    overflow-y: scroll;
    width: 100%;
    background: #ffffff;
  }

  .center-body-list {
    height: 40px;
    line-height: 40px;
    position: relative;
  }

  .withdraw-box {
    height: 40px;
    position: fixed;
    bottom: 55px;
    width: 100%;
  }

  .withdraw-box button {
    border-radius: 0 !important;
  }

  .popup-commission {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    width: 80%;
    font-size: 15px;
  }

  .tips-title {
    margin-top: 10px;
    text-align: center;
    color: #333333;
    font-size: 15px;
  }

  .tips-p {
    letter-spacing: 1px;
    line-height: 2;
    text-align: center;
    color: #888;
    padding: 10px;
  }

  .button {
    display: flex;
  }

  .cancel {
    color: #333;
    border-bottom-left-radius: 5px;
  }

  .confirm {
    color: #26a2ff;
    border-bottom-right-radius: 5px;
  }

  .confirm, .cancel {
    border: none;
    border-top: 1px solid #EBEBEB;
    border-right: 1px solid #EBEBEB;
    width: 100%;
    text-align: center;
    height: 40px;
    outline: none;
    /*webkit-tap-highlight-color:rgba(0,0,0,0);*/
    line-height: 40px;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;

  }

  @media only screen and (max-width: 320px) and (max-height: 568px) {
    .available-amount {
      height: 130px;
    }

    .commission .money {
      padding-top: 35px;
    }

    .commission-head {
      height: 175px;
    }

    .center-title {
      top: 176px
    }

    .commission-center {
      top: 222px;
    }

    .withdraw-box {
      bottom: 54px;
    }

    .commission-center {
      bottom: 95px;
    }
  }

</style>
