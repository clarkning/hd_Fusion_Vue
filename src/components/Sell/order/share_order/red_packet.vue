<template>
  <div class="red_packet_wrap">
    <div class="">
      <mt-popup v-model="sum.show" position="bottom" lock-scroll="true" class="sum">
        <div @touchmove.prevent>
          <div class="popup-button">
            <mt-button @click="cancel()" class="popup_btn">取消</mt-button>
            <span class="popup-text">选择红包金额</span>
            <mt-button type="primary" @click="confirm()" class="popup_btn">确认</mt-button>
          </div>
          <mt-picker :slots="sum.slot" valueKey="text"
                     ref="typePickerObject"></mt-picker>
        </div>
      </mt-popup>
    </div>
    <!--<div class="trapezoid"></div>-->
    <div class="red-packet" v-if="pageState!==PageStatusEnums.无红包" :class="{gray:pageState===PageStatusEnums.红包已过期 || pageState===PageStatusEnums.红包已领取}">
      <div
        v-if="pageState===PageStatusEnums.有可领红包 || pageState===PageStatusEnums.红包已领取 || pageState===PageStatusEnums.红包已过期 || pageState===PageStatusEnums.已发红包 || pageState===PageStatusEnums.有红包不可领"
        class="padding">
        <p class="title">{{redInfo.bonusType.name}}</p>
        <p class="money">{{redInfo.bonusType.amount}}<i>元</i></p>
        <button class="btn" v-if="pageState===PageStatusEnums.有可领红包" @click="accept">领取</button>
        <p class="small_text_red" v-else-if="pageState===PageStatusEnums.红包已领取">红包已存入佣金</p>
        <p class="small_text_red" v-else-if="pageState===PageStatusEnums.红包已过期">未在24小时内领取，已过期</p>
      </div>

      <div v-else-if="pageState===PageStatusEnums.可发红包" class="send padding">
        <div @click="sum.show = true" class="send_number">
          <span v-if="number.name">{{number.name}}</span>
          <span v-else>红包金额</span>
          <span>
            <span v-if="number.text">{{number.text}}</span>
            <span v-else>请选择</span>
            <span v-show="number.text">元</span>
          </span>
        </div>
        <p class="red_font" v-show="err">活动运营资金余额不足</p>
        <p class="font_small">活动运营资金余额: ￥{{amount}}</p>
        <button class="btn" @click="send" :disabled="!redPacketId" :class="{btn_disable:!redPacketId}">发红包</button>
      </div>
      <div v-else-if="pageState===PageStatusEnums.订单已过期" class="padding">
        <p class="title red_font">订单完成已超过24小时，无法发放红包</p>
      </div>
    </div>
    <div v-else class="bottom_tips">
      <p class="large_text">红包未发放</p>
      <p class="small_text">您没有发红包的权限</p>
    </div>

    <div v-show="pageState===PageStatusEnums.已发红包">
      <p class="share" @click="share"><span class="share_text">分享领红包图片</span></p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {PersonInfo, RedInfoStatus, PageStatus} from 'enum/enums'
import api from '../../../../api/index2'
import {MessageBox, Toast} from 'mint-ui'
import _ from 'lodash'
import {loadData, defaultPreHandler} from '../../../../common/utils'
import {BonusPayType} from 'enum/fusion_resource'

export default {
  name: 'red_packet',
  props: {
    redPacket: {
      type: Object,
      default: {}
    },
    personName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      amount: 0,
      number: {
        text: null,
        value: null
      },
      PageStatusEnums: PageStatus,
      redInfo: {
        orderId: null,
        bonusId: null,
        projectId: null,
        partnerId: null,
        shareFinishTime: null,
        receiveFinishTime: null,
        // personId: null,
        boundEventId: null,
        personInfo: null,
        status: null,
        releaseTime: null,
        finishTime: null,
        bonusType: {
          name: null,
          amount: null
        }
      },
      personId: this.$store.state.person.personId,
      redPacketId: null,
      err: false,
      pageState: null,
      sum: {
        value: '晒单红包',
        slot: [
          {
            flex: 1,
            values: [],
            className: 'Types',
            textAlign: 'center'
          }
        ],
        show: false
      },
      bonusPayType: null
    }
  },
  created () {
    document.addEventListener('touchstart', function () {
    }, false)
  },
  watch: {
    redPacket: {
      deep: true,
      handler (nv, ov) {
        this.redInfo = _.cloneDeep(nv)
        this.bounsEventOperators()
        this.pageState = this.pageStatus()
      }
    }
  },
  methods: {
    timeDiff (s) {
      let now = moment().format('YYYY-MM-DD HH:mm:ss')
      let finishTime = moment(s).format('YYYY-MM-DD HH:mm:ss')
      return now < finishTime
    },
    async bounsEventOperators () {
      await loadData(() => {
        return api.getPersonBonusOperators(this.personId)
      }, (data) => {
        let amount = _.find(data, item => {
          return item.project.id === this.redInfo.projectId && item.partner.id === this.redInfo.partnerId && item.bonusEvent.queryBonusEventStatus === 2
        })
        if (amount) {
          console.log(amount)
          this.$set(this.$data, 'amount', amount.balance)
          this.bonusPayType = amount.bonusEvent.bonusPayType
          let sumRedPacket = []
          _.forEach(amount.bonusEvent.bonusTypes, item => {
            let redPacketItem = {}
            redPacketItem.name = item.name
            redPacketItem.text = `${item.name} ￥ ${item.amount}`
            redPacketItem.code = item.amount
            redPacketItem.id = item.id
            sumRedPacket.push(redPacketItem)
          })
          this.sum.slot[0].values = sumRedPacket
        }
      }, defaultPreHandler)
    },
    pageStatus () {
      switch (this.redInfo.personInfo) {
        case PersonInfo.销售员:
          if (this.redInfo.status === RedInfoStatus.未发放) {
            return PageStatus.无红包
          } else if (this.redInfo.status === RedInfoStatus.未领取) {
            if (this.timeDiff(this.redInfo.receiveFinishTime)) { // 发放时间
              return PageStatus.有可领红包
            } else {
              return PageStatus.红包已过期
            }
          } else if (this.redInfo.status === RedInfoStatus.已领取) {
            return PageStatus.红包已领取
          } else {
            return ''
          }
        case PersonInfo.已对订单发红包:
          return PageStatus.已发红包
        case PersonInfo.有发红包权限:
          if (this.redInfo.status === RedInfoStatus.未发放) {
            if (this.timeDiff(this.redInfo.shareFinishTime)) { // 完成时间
              return PageStatus.可发红包
            } else {
              return PageStatus.订单已过期
            }
          } else {
            return PageStatus.有红包不可领
          }
        case PersonInfo.其他人:
          if (this.redInfo.status === RedInfoStatus.未发放) {
            return PageStatus.无红包
          } else {
            return PageStatus.有红包不可领
          }
      }
    },
    async accept () {
      await loadData(() => {
        return api.getBonu(this.redInfo.bonusId, this.personId)
      }, (data) => {
        if (data) {
          this.$emit('success')
          Toast({
            message: '领取成功',
            iconClass: 'iconfont icon-duihao',
            duration: 2000
          })
        }
      }, defaultPreHandler)
    },
    cancel () {
      this.sum.show = false
    },
    confirm () {
      this.number.text = this.$refs.typePickerObject.getValues()[0].code
      this.number.name = this.$refs.typePickerObject.getValues()[0].name
      this.sum.show = false
      if (Number(this.amount) < this.number.text) {
        this.err = true
        this.redPacketId = null
      } else {
        this.$set(this.$data, 'redPacketId', this.$refs.typePickerObject.getValues()[0].id)
        this.redPacketId = this.$refs.typePickerObject.getValues()[0].id
        this.err = false
      }
    },
    async send () {
      if (!this.err) {
        let param = {
          bonusTypeId: this.redPacketId,
          personId: Number(this.personId)
        }
        await loadData(() => {
          return api.sendBonus(this.redInfo.bonusId, param)
        }, (data) => {
          if (data.isOk) {
            if (this.bonusPayType === BonusPayType.自动入账) {
              this.$emit('success')
              Toast({
                message: '发送成功',
                iconClass: 'iconfont icon-duihao',
                duration: 2000
              })
            } else {
              this.$router.push({
                path: '/created_image',
                query: {
                  orderId: this.redInfo.orderId,
                  bonusShow: true,
                  personName: this.personName
                }
              })
            }
          } else {
            MessageBox('提示', data.message)
          }
        })
      }
    },
    share () {
      this.$router.push({
        path: '/created_image',
        query: {
          orderId: this.redInfo.orderId,
          bonusShow: true,
          personName: this.personName
        }
      })
    }
  }
}
</script>

<style scoped>
  .red_packet_wrap.page {
    padding: 20px;
    background: #fff;
  }

  .red_packet_wrap.share_image {
    padding: 15px;
  }

  .small_text {
    font-size: 14px;
  }

  .large_text {
    font-size: 24px;
    color: #F1464C;
  }

  .red_font {
    color: #F6CE8C;
  }

  .padding {
    padding: 25px 0;
  }

  .gray {
    background-image: linear-gradient(to bottom, #E79593, #E79593)!important;
  }

  .bottom_tips {
    color: #bbb;
    text-align: center;
    vertical-align: middle;
    padding: 30px;
    line-height: 3;
  }

  .small_text_red {
    font-size: 14px;
    text-align: center;
    margin-top: 15px;
  }

  .popup-text {
    vertical-align: middle;
    display: inline-block;
    margin-top: 3%;
  }

  .popup-button {
    display: flex;
    justify-content: space-between;
  }

  .popup_btn {
    border: none;
    border-radius: 0;
  }

  .share {
    padding: 20px;
    font-size: 14px;
    text-align: center;
  }

  .share_text {
    color: #F1464C;
    position: relative;
  }

  .share_text::after {
    content: '';
    width: 100%;
    left: 0;
    background: #F1464C;
    position: absolute;
    height: 1px;
    bottom: 0;
  }

  .share_text::after:active {
    background: #fff;
    color: #fff;
  }

  .send_number {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    width: 70%;
    font-size: 14px;
    margin: 0 auto 10px;
    background: #F9DAB6;
    color: #000;
    text-align: left;
    border-radius: 5px;
  }

  .font_small {
    text-align: center;
    font-size: 12px;
    color: #F9DAB6;
  }

  .send {
    line-height: 2;
  }

  .sum {
    width: 100%;
  }

  .tac {
    text-align: center;
  }

  .red-packet {
    width: 90%;
    background-image: linear-gradient(to bottom, #F1464C, #F3002A);
    margin: auto;
    color: #fcffff;
    border-radius: 10px;
    text-align: center;
    display: block;
    overflow: hidden;
  }

  .title {
    font-size: 16px;
  }

  .money {
    font-size: 32px;
    margin-top: 15px;
  }

  .money i {
    font-size: 14px;
    font-style: normal;
  }

  .share_image .money i {
    margin-left: 3px;
  }

  .btn {
    background: #F9D81A;
    border-radius: 20px;
    border: none;
    height: 35px;
    font-size: 16px;
    width: 60%;
    margin: 20px auto 0;
    box-shadow: 0px 5px 0px 0px #D8AB00;
  }

  .btn_disable {
    filter: grayscale(0.6);
    /*color:#444549;*/
    /*background: #AAABAD;*/
  }

  .btn:focus {
    outline: 0;
  }

  .btn:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    box-shadow: 0px 1px 0px 0px #D8AB00;
    border: none;
  }

  .trapezoid {
    border-top: 50px solid #F9D81A;
    border-left: 80px solid transparent;
    border-right: 80px solid transparent;
    height: 0;
    width: 50%;
    margin: auto;
  }
</style>
