<template>
  <div class="WeChatPay" v-show="scan !== ''">
    <div class="bg_1">
      <div class="t-r clear">
        <img class="f-l" src="/static/wechat.png">
        <span class="wechat-pay">微信支付</span>
      </div>
      <div class="qrcode">
        <div class="img">
          <img class="scan" :src="'data:image/jpeg;base64,' + scan"/>
          <img class="icon" src="/static/￥.png"/>
        </div>

        <p class="tip">扫码付款</p>
      </div>
    </div>
    <div class="bg_2 bg_img_none">
      <mt-cell>
        <span slot="title">订单编号</span>
        <span class="color_2">{{orderCode}}</span>
      </mt-cell>
      <mt-cell>
        <span slot="title">金额</span>
        <span class="color">￥{{payAmount}}</span>
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index2'
  import {loadData, defaultPreHandler} from '../../../common/utils'

  export default {
    name: 'WeChatPay',
    data () {
      return {
        pushName: this.$route.meta.pushName,
        pay: false,
        orderId: null,
        paymentId: null,
        orderCode: '',
        payAmount: '',
        scan: '',
        timeInterval: null
      }
    },
    async created () {
      this.orderId = this.$route.query.orderId
      await this.getData()
      await this.getScan()
      this.interval()
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(this.timeInterval)
      next()
    },
    methods: {
      interval () {
        let vue = this
        this.timeInterval = setInterval(async () => {
          await loadData(() => {
            return api.payment(vue.paymentId)
          }, data => {
            let paymentStatus = data.paymentStatus
            vue.pay = paymentStatus === 20
          }, defaultPreHandler, true)
        }, 3000)
      },
      async getData () {
        await loadData(() => {
          return api.getOrderDetail(this.orderId)
        }, (data) => {
          this.payAmount = data.paymentDto.payAmount
          this.orderCode = data.orderCode
          this.paymentId = data.paymentDto.id
        }, defaultPreHandler)
      },
      async getScan () {
        await loadData(() => {
          return api.scan(this.paymentId)
        }, data => {
          this.scan = data
        }, defaultPreHandler, true)
      }
    },
    watch: {
      'pay': async function (status) {
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
  @font-face {
    font-family: 'HYQiHei-55S';
    src: url('/static/fonts/HYQiHei-55S.otf');
  }

  @font-face {
    font-family: 'HYQiHei-80W';
    src: url('/static/fonts/HYQiHei-80W.otf');
  }

  .WeChatPay {
    width: 92%;
    margin: 4% auto;
  }

  .bg_1 {
    background: #23ac38;
    border-radius: 15px 15px 0 0;
    padding: 11% 0 16%;
  }

  .t-r {
    width: 13rem;
    margin: auto;
    line-height: 54px;
    height: 54px;
    margin-bottom: 8%;
  }

  .f-l {
    width: 47px;
    margin-top: 2px;
  }

  .wechat-pay {
    color: #fff;
    font-family: HYQiHei-55S;
    font-size: 2.1rem;
    letter-spacing: 2px;
  }

  .qrcode {
    width: 64%;
    margin: 0 auto;
    background: #fff;
    text-align: center;
    padding-top: 3.8%;
  }

  .qrcode .img {
    width: 100%;
    margin: auto;
    position: relative;
  }

  .scan {
    width: 86.8%;
  }

  .icon {
    position: absolute;
    top: 38.4%;
    left: 40%;
    height: 22.6%;
    width: 20%;
    z-index: 1;
  }

  .tip {
    font-family: HYQiHei-80W;
    line-height: 30px;
    font-size: 18px;
    letter-spacing: 3px;
  }

  .bg_2 {
    background: #fff;
    border-radius: 0 0 15px 15px;
    padding: 20px 10px;
  }

  .color {
    color: #333;
    font-weight: bold;
    font-size: 16px;
  }

  .color_2 {
    color: #333;
  }
</style>
