<template>
  <div>
    <mt-cell v-if="electronic.contract" @click.native="goToPageElectronicContract()" title="电子合同" is-link></mt-cell>
    <mt-cell v-if="electronic.invoice" @click.native="goToPageInvoiceInquiry()" title="电子发票" is-link></mt-cell>
  </div>
</template>

<script>
  import { defaultPreHandler } from '../../../../common/utils'
  import api from '../../../../api/index2'
  import _ from 'lodash'
  import {CustomerServiceType, CustomerServiceStatus} from '../../../../common/enum/zwsResource'

  export default {
    name: 'el_contract_invoice',
    props: {
      contractId: Number
    },
    data () {
      return {
        electronic: {
          contract: false,
          invoice: false
        }
      }
    },
    async created () {
      await this.getContractAppliedRequest()
    },
    methods: {
      async getContractAppliedRequest () {
        let data = defaultPreHandler(await api.getCustomerServices(this.contractId))
        if (data) {
          this.electronic.contract = !!_.find(data, item => {
            return item.customerServiceType === CustomerServiceType.电子合同 && item.customerServiceStatus === CustomerServiceStatus.完成
          })
          this.electronic.invoice = !!_.find(data, item => {
            return item.customerServiceType === CustomerServiceType.电子发票 && item.customerServiceStatus === CustomerServiceStatus.完成
          })
        }
      },
      goToPageElectronicContract () {
        this.$router.push({
          name: 'elContract',
          query: {
            contractId: this.contractId
          }
        })
      },
      goToPageInvoiceInquiry () {
        this.$router.push({
          name: 'elInvoice',
          query: {
            contractId: this.contractId
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
