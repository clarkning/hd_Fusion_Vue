<template>
  <div class="order-confirm">
    <div class="head_title">
      <h3>{{order.orderItemDtos[0].serviceOptionItem.name}}</h3>
    </div>
    <div class="center-box">
      <div class="service-name">延保服务订单</div>
      <div class="center_title" :class="{font_black: payState}">电器信息</div>
      <div :class="{font_gray: payState}">
        <div class="order_inf"><span class="fr">{{order.orderCode}}</span>订单编号</div>
        <div class="order_inf"><span class="fr">{{order.orderItemDtos[0].customerDeviceDto.brandName || ''}}</span>品牌
        </div>
        <div class="order_inf"><span
          class="fr">{{order.orderItemDtos[0].customerDeviceDto.productCategoriesName || ''}}</span>品类
        </div>
        <div class="order_inf" v-if="order.orderItemDtos[0].customerDeviceDto.purchasePrice"><span class="fr">￥{{order.orderItemDtos[0].customerDeviceDto.purchasePrice}}</span>购机价格
        </div>
        <div class="order_inf" v-if="order.purchaseTime"><span class="fr">{{order.purchaseTime}}</span>购机日期</div>
      </div>
      <div class="center_title" :class="{font_black: payState}">订单信息</div>
      <div class="order_inf"><span class="fr" :class="{font_black: payState}">{{order.customerDto.customerName}}</span>用户姓名
      </div>
      <div class="order_inf"><span class="fr" :class="{money: !payState, font_money: payState }">￥{{order.paymentDto.payAmount}}</span>延保价格
      </div>
      <div class="order_inf cg" v-if="payState">{{order.orderStatusStr}}</div>
      <div class="tips" v-if="payState">您可以关注“大诚保”企业服务号查询延保合同</div>
      <div class="confirm-pay-btn" v-if="!payState">
        <mt-button type="primary" size="large" @click="goToPay()">
          <img src="../../../../../static/alipay.png" height="24" width="24" slot="icon"/>去支付
        </mt-button>
      </div>
      <div id="alipay_form" style="visibility: hidden; position: absolute; top: 0"></div>
    </div>
  </div>
</template>

<script>
  import {loadData} from '../../../../common/utils'
  import {mapActions} from 'vuex'
  import moment from 'moment'
  import api from '../../../../api/index2'

  export default {
    name: 'OrderConfirm',
    data () {
      return {
        payState: false,
        orderId: null,
        paymentId: null,
        order: {
          paymentDto: {
            payAmount: ''
          },
          purchaseTime: '',
          orderCode: '',
          customerDto: {
            customerName: ''
          },
          orderItemDtos: [{
            customerDeviceDto: {
              brandName: null,
              productCategoriesName: null,
              purchasePrice: null
            },
            serviceOptionItem: {
              name: ''
            }
          }]
        }
      }
    },
    async created () {
      this.orderId = this.$route.query.orderId
      await loadData(() => {
        return api.getOrderConfirm(this.orderId)
      }, (responseOrder) => {
        if (responseOrder.isOk) {
          let purchaseTime = responseOrder.content.orderItemDtos[0].customerDeviceDto.purchaseTime
          if (purchaseTime) {
            responseOrder.content.purchaseTime = moment(purchaseTime).format('YYYY-MM-DD')
          }
          let order = responseOrder.content
          if (!order) {
            let message = encodeURI(responseOrder.message)
            this.$router.push({
              name: 'OrderError',
              query: {
                message: message,
                type: 2,
                code: responseOrder.code
              }
            })
          } else {
            order.orderStatusStr = this.orderStatusStr(order.orderStatus, order.paymentDto.paymentStatus, order.paymentDto.payType)
            this.order = order
            this.payState = !(this.order.paymentDto.payType === 0 && (this.order.paymentDto.paymentStatus === 10 && this.order.orderStatus === 21))
            this.paymentId = order.paymentDto.id
          }
        } else {
          let message = encodeURI(responseOrder.message)
          this.$router.push({
            name: 'OrderError',
            query: {
              message: message,
              type: 2,
              code: responseOrder.code
            }
          })
        }
      }, null)
    },
    methods: {
      ...mapActions(['getOrderConfirm']),
      setHTMLWithScript (container, rawHTML) {
        container.innerHTML = rawHTML
        const scripts = container.querySelectorAll('script')
        for (let script of scripts) {
          this.runScript(script)
        }
      },
      runScript (script) {
        const newScript = document.createElement('script')
        newScript.innerHTML = script.innerHTML
        const src = script.getAttribute('src')
        if (src) newScript.setAttribute('src', src)

        document.head.appendChild(newScript)
        document.head.removeChild(newScript)
      },
      async goToPay () {
        await loadData(() => {
          return api.getAlipayForm(this.paymentId)
        }, (responseFormData) => {
          if (responseFormData.isOk) {
            this.setHTMLWithScript(document.getElementById('alipay_form'), responseFormData.content)
          } else {
            let message = encodeURI(responseFormData.message)
            this.$router.push({
              name: 'OrderError',
              query: {
                message: message,
                type: 1,
                code: responseFormData.code
              }
            })
          }
        }, null)
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
              return '已支付'
            case '60200':
              return '已支付'
            case '110201':
              return '已支付'
            case '60201':
              return '已支付'
            case '60202':
              return '已支付'
            case '110202':
              return '已支付'
            case '20100':
              return '待录入'
            case '20202':
              return '待录入'
            case '20201':
              return '待录入'
            case '21100':
              return '未支付'
            case '20102':
              return '未支付'
            case '20101':
              return '未支付'
            case '2010':
              return '未支付'
            default:
              return ''
          }
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .confirm-pay-btn {
    padding: 20px 15px;
  }

  .title p {
    font-size: 14px;
    color: #888;
  }

  /* 合同 订单确认*/
  .head_title {
    text-align: center;
    padding: 10px 0;
  }

  .service-name {
    font-weight: 900;
    text-align: center;
    line-height: 2;
  }

  .head_title h3 {
  }

  .order-confirm {
    box-sizing: border-box;
    background: #ffffff;
    color: #333;
    font-size: 14px;
    position: absolute;
    width: 100%;
    /*padding: 5%;*/
    height: 100%;
  }

  /*  .card-number .number{
      color: #26a2ff;
    }*/
  .card-number {
    text-align: right;
    font-size: 12px;
    color: #888888;
    margin: 10px 0;
  }

  .center_title {
    border-bottom: 1px solid #dedede;
    line-height: 2.5;
    margin-bottom: 10px;
    color: #888888;
  }

  .center-box {
    background: #fff;
    padding: 5%;
  }

  .center-box .order_inf {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }

  .center-box .order_inf .fr {
    color: #888888;
  }

  .zan-logo {
    text-align: right;
  }

  .mint-radiolist {
    padding: 0 10px;
  }

  .money {
    color: #FE633F !important;
    font-size: 16px;
  }

  .regular-radio + label {
    -webkit-appearance: none;
    background-color: #fff;
    border: 1px solid #aaa;
    padding: 9px;
    border-radius: 50px;
    display: inline-block;
    position: relative;
  }

  .regular-radio:checked + label:after {
    content: ' ';
    width: 12px;
    height: 12px;
    border-radius: 50px;
    position: absolute;
    top: 3px;
    background: #26a2ff;
    box-shadow: 0px 0px 5px 0px #26a2ff;
    left: 3px;
  }

  .alipay, .wechat {
    display: block;
    overflow: hidden;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
  }

  .tips {
    color: #888888;
    padding: 10px;
    line-height: 1.5;
    text-align: center;
  }

  .tips .paystate {
    font-style: normal;

  }

  .cg {
    color: #333;
    font-weight: bold;
    text-align: right;
    font-size: 18px;
  }

  .font_black {
    color: #333 !important;
  }

  .font_money {
    font-size: 16px !important;
    font-weight: bold !important;
    color: #333 !important;
  }

  .font_gray .order_inf {
    color: #888888;
  }

</style>
