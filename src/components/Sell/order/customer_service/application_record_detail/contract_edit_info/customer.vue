<template>
  <div v-if="showCustomerInfo">
    <div class="header">客户信息</div>
    <div>
      <mt-cell v-if="customerInfo[1]" title="客户姓名">{{customerInfo[1]}}</mt-cell>
      <mt-cell v-if="customerInfo[2]" title="客户电话">{{customerInfo[2]}}</mt-cell>
      <mt-cell v-if="customerInfo[3]" title="省">{{customerInfo[3]}}</mt-cell>
      <mt-cell v-if="customerInfo[4]" title="市">{{customerInfo[4]}}</mt-cell>
      <mt-cell v-if="customerInfo[5]" title="区/县">{{customerInfo[5]}}</mt-cell>
      <mt-cell v-if="customerInfo[6]" title="详细地址">{{customerInfo[6]}}</mt-cell>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'customer',
    props: {
      customerInfo: {
        type: Object,
        default: () => {
          return {
          }
        }
      }
    },
    computed: {
      showCustomerInfo () {
        return !_.isEmpty(this.customerInfo)
      }
    }
  }
</script>

<style scoped>

</style>
