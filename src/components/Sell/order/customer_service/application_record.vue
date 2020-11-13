<template>
  <div>
    <div class="header">申请记录</div>
    <mt-cell v-for="(item, index) in customerServicesList" :key="index" @click.native="goToPageDetail(item.customerServiceId, item.customerServiceType)"
             :title="formatterTime(item.createTime)" is-link>
      <span v-if="item.customerServiceType === CustomerServiceType.信息变更">{{customerServiceType[item.customerServiceType]}} - {{handleInfoStatus(item.customerServiceStatus)}}</span>
      <span v-else>{{customerServiceType[item.customerServiceType]}} - {{handleLogisticsStatus(item.customerServiceStatus)}}</span>
    </mt-cell>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'
  import { defaultPreHandler } from '../../../../common/utils'
  import api from '../../../../api/index2'
  import {CustomerServiceStatus, CustomerServiceType} from '../../../../common/enum/zwsResource'
  import {EnumType} from '../../../../common/enum/enum_type'

  export default {
    name: 'application_record',
    data () {
      return {
        customerServicesList: [],
        CustomerServiceType: CustomerServiceType,
        customerServiceType: {},
        contractId: null
      }
    },
    async created () {
      this.handleEnum()
      await this.getContractAppliedRequest()
    },
    methods: {
      async getContractAppliedRequest () {
        this.contractId = this.$route.query.serviceContractId
        let customerServicesList = defaultPreHandler(await api.getCustomerServices(this.contractId))
        if (customerServicesList) {
          this.customerServicesList = _.filter(customerServicesList, item => {
            return item.customerServiceType !== CustomerServiceType.电子合同 && item.customerServiceType !== CustomerServiceType.电子发票
          })
        }
      },
      goToPageDetail (customerServiceId, customerServiceType) {
        let name = ''
        if (customerServiceType === CustomerServiceType.信息变更) {
          name = 'contractEditInfo'
        } else {
          name = 'logisticsOrderTrack'
        }
        this.$router.push({
          name,
          query: {
            customerServiceId
          }
        })
      },
      formatterTime (time) {
        return moment(time).format('YYYY-MM-DD')
      },
      handleInfoStatus (status) {
        switch (status) {
          case CustomerServiceStatus.受理:
            return '待审核'
          case CustomerServiceStatus.完成:
            return '已完成'
          case CustomerServiceStatus.失败:
            return '未通过'
        }
      },
      handleLogisticsStatus (status) {
        switch (status) {
          case CustomerServiceStatus.受理:
            return '待发货'
          case CustomerServiceStatus.完成:
            return '已发货'
          case CustomerServiceStatus.失败:
            return '未通过'
        }
      },
      handleEnum () {
        let customerServiceType = new EnumType(CustomerServiceType)
        this.customerServiceType = customerServiceType.getInvertedEnum()
      }
    }
  }
</script>

<style scoped>
  .header {
    background-color: transparent;
    color: #888;
    font-size: 14px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }
</style>
