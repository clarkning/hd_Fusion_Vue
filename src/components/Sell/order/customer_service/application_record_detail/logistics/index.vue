<template>
  <div>
    <mt-cell title="申请类型" :value="customerServiceType[applicationRecordDetail.customerServiceType]"></mt-cell>
    <mt-cell title="承运商" :value="applicationRecordDetail.logisticsOrder.vendor"></mt-cell>
    <mt-cell title="快递单号" :value="applicationRecordDetail.logisticsOrder.code"></mt-cell>
    <mt-cell title="快递状态" :value="logisticsOrderStatus[applicationRecordDetail.logisticsOrder.status]"></mt-cell>
    <div class="block"></div>
    <logistics-order-track :logisticsOrderDynamics="applicationRecordDetail.logisticsOrder.logisiticsOrderDynamics"></logistics-order-track>
  </div>
</template>

<script>
  import {CustomerServiceType, LogisticsOrderStatus} from '../../../../../../common/enum/zwsResource'
  import {EnumType} from '../../../../../../common/enum/enum_type'
  import LogisticsOrderTrack from './logistics_order_track'
  import api from '../../../../../../api/index2'
  import {loadData, defaultPreHandler} from '../../../../../../common/utils'

  export default {
    name: 'ApplicationRecordDetail',
    components: {
      LogisticsOrderTrack
    },
    data () {
      return {
        applicationRecordDetail: null,
        customerServiceType: {},
        logisticsOrderStatus: {}
      }
    },
    created () {
      this.handleEnum()
      this.getApplicationRecordDetail()
    },
    methods: {
      handleEnum () {
        let customerServiceType = new EnumType(CustomerServiceType)
        this.customerServiceType = customerServiceType.getInvertedEnum()
        let logisticsOrderStatus = new EnumType(LogisticsOrderStatus)
        this.logisticsOrderStatus = logisticsOrderStatus.getInvertedEnum()
      },
      async getApplicationRecordDetail () {
        await loadData(() => {
          return api.getCustomerServiceDetail(this.$route.query.customerServiceId)
        }, data => {
          this.applicationRecordDetail = data
        }, defaultPreHandler)
      }
    }
  }
</script>

<style scoped>
  .block {
    margin-bottom: 15px
  }
</style>
