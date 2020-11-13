<template>
  <div v-if="showOrderInfo">
    <div class="header">订单信息</div>
    <div>
      <mt-cell v-if="orderInfo[11]" title="延保发票号/工单号">{{orderInfo[11]}}</mt-cell>
      <mt-cell v-if="orderInfo[12]" title="购机价格">{{orderInfo[12]}}</mt-cell>
      <mt-cell v-if="orderInfo[13]" title="购机日期">{{orderInfo[13]}}</mt-cell>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'orderInfoDetail',
    props: {
      orderInfo: {
        type: Object,
        default: () => {
          return {
          }
        }
      }
    },
    computed: {
      showOrderInfo () {
        return !_.isEmpty(this.orderInfo)
      }
    }
  }
</script>

<style scoped>

</style>
