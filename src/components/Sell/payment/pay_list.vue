<template>
  <div class="PayList" v-if="!isRedirect">
    <Progress></Progress>

    <div class="item_container_top m_t">
      <div class="item_p">
        <div class="item_img"><img :src="orderDetail.imageUrl"></div>
        <div class="item_content">
          <p class="item_over popup_color3 font-size16">{{orderDetail.name}}</p>
        </div>
      </div>
    </div>
    <div class="bg_img_none mt-10">
      <mt-cell title="产品价格">
        <span class="pay-amount">￥{{orderDetail.payAmount}} 元</span>
      </mt-cell>
    </div>
    <p class="title">请选择支付方式</p>
    <div v-if="payMethod.weiXinPay">
      <div class="item_container">
        <div class="item_p">
          <div class="item_img"><img src="/static/wechat_2.png"></div>
          <div class="item_content">
            <p class="">微信支付</p>
            <p class="item_font12 item_color">点击进入，顾客扫码支付</p>
          </div>
          <label class="pay-label">
            <input class="pay-radio" type="radio" name="pay-radio" value="微信支付" v-model="payTypeValue">
            <span class="pay-radioInput"></span>
          </label>
        </div>
      </div>
    </div>

    <div v-if="payMethod.smsPay">
      <div class="item_container">
        <div class="item_p">
          <div class="item_img"><img src="/static/alipay.png"></div>
          <div class="item_content">
            <p class="">支付宝支付</p>
            <p class="item_font12 item_color">发送短信，顾客点击支付</p>
          </div>
          <label class="pay-label">
            <input class="pay-radio" type="radio" name="pay-radio" value="支付宝支付" v-model="payTypeValue">
            <span class="pay-radioInput"></span>
          </label>
        </div>
      </div>
    </div>

    <div v-if="payMethod.weiXinPay">
      <div class="item_container">
        <div class="item_p">
          <div class="item_img"><img src="/static/wechat_2.png"></div>
          <div class="item_content">
            <p class="">我用微信代付</p>
            <p class="item_font12 item_color">点击进入，代顾客支付</p>
          </div>
          <label class="pay-label">
            <input class="pay-radio" type="radio" name="pay-radio" value="我用微信代付" v-model="payTypeValue">
            <span class="pay-radioInput"></span>
          </label>
        </div>
      </div>
    </div>

    <div v-if="payMethod.cashierPay">
      <div class="item_container">
        <div class="item_p">
          <div class="item_img"><img src="/static/cashier.jpg"></div>
          <div class="item_content">
            <p class="">顾客在收银台支付</p>
            <p class="item_font12 item_color">顾客支付现金</p>
          </div>
          <label class="pay-label">
            <input class="pay-radio" type="radio" name="pay-radio" value="收银台支付" v-model="payTypeValue">
            <span class="pay-radioInput"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="bottom-button">
      <mt-button type="primary" size="large" @click="goToPay()">确认支付：{{orderDetail.payAmount}}元</mt-button>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index2'
  import { loadData, defaultPreHandler, boolPreHandler } from '../../../common/utils'
  import Progress from '../../public/progress.vue'
  import { MessageBox } from 'mint-ui'

  export default {
    name: 'PayList',
    components: {
      Progress
    },
    data () {
      return {
        query: {
          paymentId: NaN,
          payType: NaN,
          payerType: NaN
        },
        payTypeValue: '',
        orderDetail: {
          payAmount: '',
          orderCode: ''
        },
        gender: '',
        payMethod: {
          cashierPay: false,
          smsPay: false,
          weiXinPay: false,
          weChatPay: false
        },
        timeInterval: null,
        useWeChatPay: true,
        pushName: '',
        orderId: null,
        isRedirect: true
      }
    },
    async created () {
      this.orderId = this.$route.query.orderId
      await this.getDetail()
      await this.getMethod()
      await this.redirect()
    },
    methods: {
      async getDetail () {
        await loadData(() => {
          return api.getOrderDetail(this.orderId)
        }, (data) => {
          this.orderDetail.imageUrl = data.orderItemDtos[0].serviceOptionItem.imageUrl
          this.orderDetail.name = data.orderItemDtos[0].serviceOptionItem.name
          this.orderDetail.payAmount = data.paymentDto.payAmount
          this.orderDetail.orderCode = data.orderCode
          this.query.paymentId = data.paymentDto.id
        }, defaultPreHandler, true)
      },
      async getMethod () {
        await loadData(() => {
          return api.getPaymentMethod(this.query.paymentId)
        }, data => {
          let paymentMethod = data
          this.payMethod.cashierPay = paymentMethod.cashierPay
          this.payMethod.smsPay = paymentMethod.smsPay
          this.payMethod.weiXinPay = paymentMethod.weixinPay
        }, defaultPreHandler, true)
      },
      async redirect () {
        if (!this.payMethod.weiXinPay && this.payMethod.cashierPay && !this.payMethod.smsPay) {
          this.payTypeValue = '收银台支付'
          this.getPayType()
          await loadData(() => {
            return api.postPayConfirm(this.query)
          }, data => {
            if (data) {
              this.$router.replace({
                name: this.pushName,
                query: {
                  orderId: this.orderId
                }
              })
            }
          }, boolPreHandler, true)
        } else {
          this.isRedirect = false
        }
      },
      getPayType () {
        switch (this.payTypeValue) {
          case '微信支付': {
            this.query.payType = 2
            this.query.payerType = 20
            break
          }
          case '我用微信代付': {
            this.query.payType = 2
            this.query.payerType = 30
            break
          }
          case '支付宝支付': {
            this.query.payType = 0
            this.query.payerType = 20
            break
          }
          case '收银台支付': {
            this.query.payType = 1
            this.query.payerType = 40
            break
          }
          default: {
            break
          }
        }
        let arr = [this.query.payType, this.query.payerType]
        let key = arr.join('')
        this.pushName = this.$route.meta.pushName[key]
      },
      async goToPay () {
        if (this.payTypeValue) {
          this.getPayType()
          if (this.payTypeValue === '我用微信代付') {
            await this.weChatPay()
          } else {
            await loadData(() => {
              return api.postPayConfirm(this.query)
            }, res => {
              if (res) {
                if (this.payTypeValue === '支付宝支付') {
                  window.history.pushState({}, 'title', '#/login')
                  window.history.pushState({}, 'title', '#/MyOrder')
                }
                this.$router.push({
                  name: this.pushName,
                  query: {
                    orderId: this.orderId
                  }
                })
              }
            }, boolPreHandler, true)
          }
        } else {
          MessageBox({
            title: '提示',
            message: '请先选择支付方式'
          })
        }
      },
      // 我用微信代付
      async weChatPay () {
        let vue = this
        if (this.useWeChatPay) {
          this.useWeChatPay = false
          let result = await api.postPayConfirm(this.query)
          if (result.isOk) {
            let url = location.href.split('#')[0]
            await loadData(() => { return this.$initWxConfig(url, ['getBrandWCPayRequest']) },
              async () => {
                await loadData(() => {
                  return api.sales(vue.query.paymentId)
                }, (data) => {
                  // eslint-disable-next-line
                  WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                      'appId': data.appId,
                      'timeStamp': data.timeStamp,
                      'nonceStr': data.nonceStr,
                      'package': data.package,
                      'signType': 'MD5',
                      'paySign': data.paySign
                    },
                    function (res) {
                      if (res.err_msg === 'get_brand_wcpay_request:ok') {
                        vue.payMethod.weChatPay = true
                      }
                      vue.useWeChatPay = true
                    }
                  )
                }, defaultPreHandler, true)
              })
          } else {
            vue.useWeChatPay = true
          }
        }
      }
    },
    watch: {
      'payMethod.weChatPay': async function (status) {
        if (status === true) {
          window.history.pushState({}, 'title', '#/login')
          window.history.pushState({}, 'title', '#/MyOrder')
          this.$router.push({
            name: this.pushName,
            query: {
              orderId: this.orderId
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
  .item_container_top{
    background: #fff;
  }
  .item_container_top .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
    width: 60px;
    height: 60px;
  }

  .item_container_top .item_img img {
    width: 100%;
    height: 100%;
  }
  .m_t {
    margin-top: 40px;
  }

  .mint-button {
    height: 43px;
    font-size: 16px;
  }

  .pay-label {
    display: inline-block;
    float: right;
    width: 30px;
    height: 30px;
    padding-top: 17px;
    padding-left: 20px;
  }

  .pay-radio {
    display: none;
  }

  .pay-radioInput {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 100%;
    display: inline-block;
    height: 16px;
    margin-right: 10px;
    margin-top: -1px;
    vertical-align: middle;
    width: 16px;
    line-height: 1
  }

  .pay-radio:checked + .pay-radioInput:after {
    background-color: #3396E4;
    border-radius: 100%;
    content: "";
    display: inline-block;
    height: 12px;
    margin: 2px;
    width: 12px
  }

  .pay-checkbox.pay-radioInput, .pay-radio:checked + .pay-checkbox.pay-radioInput:after {
    border-radius: 0
  }

  .pay-amount {
    font-size: 18px;
    color: #FE633F;
  }

  .mt-10 {
    margin-top: 10px;
  }

  .m_t5 {
    margin-top: 5px;
  }

  .progress {
    width: 66.66%;
  }

  .item_container {
    background: #fff;
    font-size: 14px;
    position: relative;
    /*border-bottom: 1px solid #f4f3f3;*/
  }

  .item_container:before {
    content: " ";
    position: absolute;
    top: 57px;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }

  .item_p {
    padding: 4px 15px;
    display: table;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
  }

  .item_color {
    color: #888;
  }

  .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
    width: 23px;
    height: 23px;
  }

  .item_img img {
    width: 100%;
  }

  .item_content {
    line-height: 1.8;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
    width: 80%;
  }

  .item_link {
    display: table-cell;
    position: relative;
    width: 25px;
  }

  .item_link::after {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 50%;
    position: absolute;
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(45deg);
  }

  .title {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .bg_img_none {
    border-top: 1px solid #f4f3f3;
    border-bottom: 1px solid #f4f3f3;
  }

  .m_r5 {
    margin-right: 5px;
  }

  .color {
    color: #f44336;
  }
  .item_container_top .item_p {
    padding: 10px 15px;
    display: table;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
  }

</style>
