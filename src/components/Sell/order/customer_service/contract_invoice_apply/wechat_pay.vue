<template>
  <div>
  </div>
</template>

<script>
  import { loadData } from '../../../../../common/utils'

  export default {
    name: 'wechat_pay',
    data () {
      return {
        needPayment: true
      }
    },
    methods: {
      async pay (paymentForm) {
        let url = location.href.split('#')[0]
        await loadData(() => { return this.$initWxConfig(url, ['getBrandWCPayRequest']) },
          async () => {
            // eslint-disable-next-line
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                'appId': paymentForm.AppId,
                'timeStamp': paymentForm.TimeStamp,
                'nonceStr': paymentForm.NonceStr,
                'package': paymentForm.Package,
                'signType': 'MD5',
                'paySign': paymentForm.PaySign
              },
              (res) => {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  this.$emit('success')
                }
                if (res.err_msg === 'get_brand_wcpay_request:fail') {
                  console.log('Payment fail')
                }
                if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                  console.log('Payment cancel')
                }
              }
            )
          })
      }
    }
  }
</script>

<style scoped>

</style>
