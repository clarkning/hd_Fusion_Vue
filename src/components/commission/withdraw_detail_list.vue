<template>
  <div class="Withdraw">
    <div class="withdraw-head">
      <div class="ui-flex" @click="divideTypePicker.show = true">
        <mt-cell :title="withdraw.queryParams.divideType" is-link></mt-cell>
      </div>
      <div class="ui-flex" @click="timePicker.show = true">
        <mt-cell :title="timePickerValue" is-link></mt-cell>
      </div>
      <mt-popup v-model="divideTypePicker.show" position="bottom" class="types" lock-scroll="true">
        <div @touchmove.prevent>
          <mt-picker :slots="divideTypePicker.slot" valueKey="text"
                     ref="typePickerObject"></mt-picker>
          <mt-button type="primary" class="popup-button" @click="chooseType()">确定</mt-button>
        </div>
      </mt-popup>
      <mt-popup v-model="timePicker.show" position="bottom" class="times" lock-scroll="true">
        <div @touchmove.prevent>
          <mt-picker :slots="timePicker.slot" @change="timeChange" ref="timePickerObject"></mt-picker>
          <mt-button type="primary" class="popup-button" @click="chooseTime()">确定</mt-button>
        </div>
      </mt-popup>
    </div>
    <div class="paystate">
      <mt-cell class="money" title="支付状态" :value="accountPayment.status"></mt-cell>
      <mt-cell title="提现日期" :value="resetTime(accountPayment.createTime)"></mt-cell>
      <mt-cell title="总金额" :value="accountPayment.amount"></mt-cell>
      <mt-cell title="发放日期" :value="resetTime(accountPayment.completeTime)"></mt-cell>
      <router-link class="personInfo-link" v-if="accountPayment.status === '支付失败'"
                   :to="{ path:'/PersonInfo', query: {} }">
        <mt-button type="primary" size="large" class="consummate">去完善个人信息</mt-button>
      </router-link>
    </div>
    <div class="withdraw-list" v-infinite-scroll="loadWithdrawDetails" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="list-for" v-for="item in withdraw.list" @click="goToPageWithdrawDetail(item.accountSettleId, item.divideType)">
        <mt-cell class="money" title="佣金" :value="'￥ '+item.dividePrice"></mt-cell>
        <mt-cell title="订单编号" v-show="item.divideType !== '手续费'" :value="item.orderCode"></mt-cell>
        <mt-cell title="佣金类别" :value="item.divideType"></mt-cell>
        <mt-cell title="生成日期" :value="item.created.slice(0, 10)"></mt-cell>
      </div>
      <div v-if="withdraw.list.length === 0" class="null_data">
        <div class="null"></div>
        <p>亲，暂无数据哦~~</p>
      </div>
      <div v-else>
        <div class="load noMore" v-show="withdraw.noMore">已无更多</div>
      </div>
    </div>
  </div>
</template>


<script>
  import api from '../../api/index2'
  import moment from 'moment'
  import { loadData, defaultPreHandler } from '../../common/utils'

  export default {
    name: 'WithdrawDetailList',
    data () {
      return {
        typePickerObject: '',
        accountPayment: {
          status: null,
          completeTime: null,
          createTime: null,
          amount: 0
        },
        divideTypePicker: {
          value: '全部',
          slot: [
            {
              flex: 1,
              values: [{
                code: null,
                ifDefault: true,
                text: '全部',
                value: null
              }],
              className: 'Types',
              textAlign: 'center'
            }
          ],
          show: false
        },
        timePicker: {
          value: '全部',
          slot: [
            {
              flex: 1,
              values: ['全部', '今日', '本周', '本月', '上月', '近三个月'],
              className: 'Times',
              textAlign: 'center'
            }
          ],
          show: false
        },
        withdraw: {
          list: [],
          loading: false,
          noMore: false,
          queryParams: {
            paymentId: null,
            divideType: '全部',
            page: 0,
            limit: 5,
            startTime: null,
            endTime: null
          }
        },
        isInputInvoice: null,
        timePickerValue: '全部'
      }
    },
    watch: {
      'accountPayment.status': function (c) {
        if (c === '分配金额失败') {
          this.accountPayment.status = '银行处理中'
        }
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.withdraw.queryParams.paymentId = this.$route.query.paymentId
      })
    },
    async created () {
      await loadData(() => {
        return api.getDivideType()
      }, (divideTypes) => {
        this.divideTypePicker.slot[0].values.push(...divideTypes)
      }, defaultPreHandler, true)
      await loadData(() => {
        return api.getAccountPayment(this.withdraw.queryParams.paymentId)
      }, (accountPayment) => {
        this.accountPayment = accountPayment
      }, defaultPreHandler)
    },
    methods: {
      chooseTime () {
        let time = this.$refs.timePickerObject.getValues()[0]
        this.timePicker.show = false
        this.timePickerValue = time
        this.withdraw.queryParams.page = 1
        this.withdraw.list = []
        this.withdraw.noMore = false
        this.initData()
      },
      chooseType () {
        let type = this.$refs.typePickerObject.getValues()[0].text
        this.divideTypePicker.show = false
        this.withdraw.queryParams.divideType = type
        this.withdraw.queryParams.page = 1
        this.withdraw.list = []
        this.withdraw.noMore = false
        this.initData()
      },
      resetTime: function (dateTime) {
        if (dateTime) {
          return dateTime.slice(0, 10)
        }
        return ''
      },
      goToPageWithdrawDetail: function (id, divideType) {
        this.$router.push({
          path: 'CommissionDetail',
          query: {
            accountSettleId: id,
            divideType: divideType
          }
        })
      },
      timeChange (picker, values) {
        switch (values[0]) {
          case '今日': {
            this.withdraw.queryParams.startTime = moment().format('YYYY-MM-DD')
            this.withdraw.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            break
          }
          case '本周': {
            this.withdraw.queryParams.startTime = moment().day('Monday').format('YYYY-MM-DD')
            this.withdraw.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            break
          }
          case '本月': {
            this.withdraw.queryParams.startTime = moment().startOf('month').format('YYYY-MM-DD')
            this.withdraw.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            break
          }
          case '上月': {
            this.withdraw.queryParams.startTime = moment().subtract(1, 'M').startOf('month').format('YYYY-MM-DD')
            this.withdraw.queryParams.endTime = moment().startOf('month').format('YYYY-MM-DD')
            break
          }
          case '近三个月': {
            this.withdraw.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            this.withdraw.queryParams.startTime = moment().add(1, 'd').subtract(3, 'M').format('YYYY-MM-DD')
            break
          }
          default: {
            this.withdraw.queryParams.endTime = null
            this.withdraw.queryParams.startTime = null
            break
          }
        }
      },
      loadWithdrawDetails () {
        this.withdraw.queryParams.page += 1
        this.initData()
      },
      async initData () {
        if (this.withdraw.noMore) return
        await loadData(
          () => {
            return api.getWithdrawDetailList(this.withdraw.queryParams)
          },
          (data) => {
            if (data.length === 0) {
              this.withdraw.noMore = true
            } else {
              // this.withdraw.noMore = false
              this.withdraw.list.push(...data)
            }
          }, defaultPreHandler)
      }
    }
  }
</script>

<style scoped>
  .withdraw-head {
    display: flex;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
  }

  .ui-flex {
    flex: 1;
  }

  .mint-cell-allow-right::after {
    transform: translateY(-50%) rotate(135deg) !important;
  }

  .types, .times {
    width: 100%;
  }

  .popup-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #26a2ff;
  }

  .paystate {
    margin-top: 50px;
  }

  .personInfo-link {
    text-align: center;
    color: #26a2ff;
    text-decoration: none;
  }

  .withdraw-list .list-for {
    margin-top: 10px;
  }

  .withdraw-list .list-for:first-child {
    margin-top: 50px;
  }

  .consummate {
    width: 90%;
    margin: 15px 15px 0;
  }
</style>
