<template>
</template>
<script>
  import api from '../../../api/index2'
  import { loadData, boolPreHandler } from '../../../common/utils'

  export default {
    name: 'BaiPay',
    data () {
      return {
        orderId: null,
        orderCode: null,
        returnFruit: null
      }
    },
    async created () {
      this.orderId = this.$route.query.orderId
      this.submitOrder()
    },
    methods: {
      async submitOrder () {
        await loadData(() => {
          return api.submitOrders(this.orderId)
        }, (info) => {
          this.returnFruit = info
          if (this.returnFruit) {
            this.$router.replace({
              name: 'OrderBai',
              query: {
                orderId: this.orderId
              }
            })
          }
        }, boolPreHandler, true)
      }
    }
  }
</script>
