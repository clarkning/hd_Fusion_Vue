<template>
  <div>
    <div class="content" @touchmove.stop>
      <customer-info :customer-info="customerInfo" ref="customerInfo"></customer-info>
      <customer-address :address-info="addressInfo" :address-ids="addressIds" ref="addressInfo"></customer-address>
      <device-info :device-info="deviceInfo" ref="deviceInfo"></device-info>
      <order-info :order-info="orderInfo" :max-price="skuMaxPrice" :min-price="skuMinPrice" ref="orderInfo"></order-info>
      <div class="mt">
        <mt-cell title="申请人" :value="$store.state.person.name"></mt-cell>
      </div>
    </div>

    <mt-button class="btn" type="primary" size="large" @click="goToPageNext">下一步</mt-button>
  </div>
</template>

<script>
  import moment from 'moment'
  import customerInfo from './customer_info'
  import customerAddress from './customer_address'
  import deviceInfo from './device_info'
  import orderInfo from './order_info'
  import { MessageBox } from 'mint-ui'
  import api from '../../../../../api/index2'
  import { loadData, defaultPreHandler } from '../../../../../common/utils'
  import { createNamespacedHelpers } from 'vuex'

  const {mapState, mapMutations} = createNamespacedHelpers('customerService')

  export default {
    name: 'contractEdit',
    components: {
      customerInfo,
      customerAddress,
      deviceInfo,
      orderInfo
    },
    data () {
      return {
        detail: {},
        skuMaxPrice: 0,
        skuMinPrice: 0,
        customerInfo: {},
        addressInfo: {},
        addressIds: [],
        deviceInfo: {},
        orderInfo: {}
      }
    },
    async created () {
      this.initCustomerServiceInfo()
      this.$store.dispatch('getPersonInfo', this.$store.state.person.personId)
      await this.loadContractDetail()
      this.initInfo()
    },
    methods: {
      ...mapMutations(['setChangeContractInfo', 'setBrandName', 'setProductCategoryName', 'setSubmitCustomerService']),
      initCustomerServiceInfo () {
        this.setBrandName('')
        this.setProductCategoryName('')
        this.setChangeContractInfo([])
        this.setSubmitCustomerService([])
      },
      initInfo () {
        this.customerInfo = {
          1: this.detail.customer.name,
          2: this.detail.customer.phone
        }
        this.addressInfo = {
          3: this.detail.contract.provicneName,
          4: this.detail.contract.cityName,
          5: this.detail.contract.countyName,
          6: this.detail.contract.addressDescription.trim()
        }
        this.addressIds = [
          this.detail.contract.provicneId,
          this.detail.contract.cityId,
          this.detail.contract.countyId
        ]
        this.deviceInfo = {
          7: this.storeCategoryName ? this.storeCategoryName : this.detail.contract.productCateogry,
          8: this.storeBrandName ? this.storeBrandName : this.detail.contract.brand,
          9: this.detail.contract.factoryModel,
          10: this.detail.contract.serialNumber
        }
        this.orderInfo = {
          13: this.detail.contract.purchaseTime ? moment(this.detail.contract.purchaseTime).format('YYYY-MM-DD') : '',
          12: this.detail.contract.purchasePrice,
          11: this.detail.contract.invoiceCode
        }
      },
      setSkuPrice (priceRange) {
        let range = priceRange.split('-')
        this.skuMaxPrice = Number(range[1])
        this.skuMinPrice = Number(range[0])
      },
      async loadContractDetail () {
        await loadData(() => {
          return api.getContractDetail(this.$route.query.serviceContractId)
        }, data => {
          this.detail = data
          this.setSkuPrice(data.contract.priceRange)
        }, defaultPreHandler)
      },
      showErrors (message) {
        MessageBox({
          title: '提示',
          message,
          confirmText: '确认'
        })
      },
      goToPageNext () {
        let customerInfo = this.$refs.customerInfo.validate()
        if (typeof customerInfo === 'string') {
          this.showErrors(customerInfo)
          return
        }
        let addressInfo = this.$refs.addressInfo.validate()
        if (typeof addressInfo === 'string') {
          this.showErrors(addressInfo)
          return
        }
        let deviceInfo = this.$refs.deviceInfo.validate()
        if (typeof deviceInfo === 'string') {
          this.showErrors(deviceInfo)
          return
        }
        let orderInfo = this.$refs.orderInfo.validate()
        if (typeof orderInfo === 'string') {
          this.showErrors(orderInfo)
          return
        }
        let params = [...customerInfo, ...addressInfo, ...deviceInfo, ...orderInfo]
        if (params.length > 0) {
          this.setChangeContractInfo(params)
          this.$router.push({
            name: 'uploadVoucher',
            query: {
              serviceContractId: this.$route.query.serviceContractId
            }
          })
        } else {
          this.showErrors('您没有修改任何信息')
        }
      }
    },
    computed: {
      ...mapState({
        storeBrandName: state => state.brandName,
        storeCategoryName: state => state.categoryName
      })
    }
  }
</script>

<style scoped>
  .content {
    padding-bottom: 50px;
  }
  .btn {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  .mt {
    margin-top: 15px;
  }

  >>> .header {
    background-color: transparent;
    color: #888;
    font-size: 14px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }

  >>> textarea::-webkit-input-placeholder,
  >>> textarea:-moz-placeholder,
  >>> textarea::-moz-placeholder,
  >>> textarea:-ms-input-placeholder {
    font-size: 14px;
    font-family: Arial;
    color: #888;
  }

  >>> textarea,
  >>> input {
    font-size: 14px;
    text-align: right;
  }

  >>> .is_link_font_color {
    color: #000;
  }
  >>> .is_link_placeholder {
    color: #cfcfcf;
  }
</style>
