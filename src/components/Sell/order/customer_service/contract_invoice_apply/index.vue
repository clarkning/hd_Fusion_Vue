<template>
  <div class="contractApply">
    <div class="content" @touchmove.stop>
      <div class="header">申请内容</div>
      <div class="contractCheckBox">
      <span class="contractCheckBoxItem" v-for="(item, index) in options" :key="item.value">
        <input class="mint-checkbox-input" type="checkbox" :id="item.label" :value="item.value" v-model="optionsValue"
               :disabled="!item.appliable || item.disabled" @change="check">
        <span class="mint-checkbox-core"></span>
        <label class="mint-checkbox-label label" :for="item.label">{{item.label}}</label>
      </span>
      </div>

      <div class="address" v-if="!load && showAddress">
        <div class="header">设备安装地址</div>
        <span class="addressTip">用于生成合同,请填写真实地址。</span>
        <geography v-model="address"></geography>
      </div>

      <div class="invoice" v-if="showInvoice">
        <invoiceInformation :information="information"></invoiceInformation>
      </div>

      <div v-show="showMail">
        <receiverAddress v-model="form" ref="mailState"></receiverAddress>
      </div>
      <weChatPay ref="weChatPay" @success="submitSuccess"></weChatPay>
    </div>

    <div @click="submit()" class="submitBtn">
      <mt-button type="primary" size="large">{{submitBtnText}}</mt-button>
    </div>

  </div>
</template>

<script>
  import { Cell, Checklist, Button, MessageBox } from 'mint-ui'
  import _ from 'lodash'
  import invoiceInformation from './invoice_information'
  import geography from './geography'
  import receiverAddress from './receiver_address'
  import weChatPay from './wechat_pay'
  import { loadData, defaultPreHandler } from '../../../../../common/utils'
  import api from '../../../../../api/index2'
  import { CustomerServiceType } from '../../../../../common/enum/zwsResource'
  import { EnumType } from '../../../../../common/enum/enum_type'
  import { createNamespacedHelpers } from 'vuex'

  const {mapMutations} = createNamespacedHelpers('customerService')

  export default {
    name: 'contractApply',
    components: {
      [Cell.name]: Cell,
      [Checklist.name]: Checklist,
      [Button.name]: Button,
      invoiceInformation,
      geography,
      receiverAddress,
      weChatPay
    },
    data () {
      return {
        options: [],
        optionsValue: [],
        address: {
          province: null,
          city: null,
          county: null,
          desc: ''
        },
        form: {
          name: null,
          phoneNumber: null,
          mail: null,
          address: {
            province: null,
            city: null,
            county: null,
            desc: ''
          }
        },
        submitBtnText: '提交申请',
        contractDetail: {},
        isPay: true,
        load: true,
        appliedRequestOptions: [],
        information: true,
        replaced: []
      }
    },
    created () {
      this.getContractAppliableRequest()
      this.loadContractDetail()
    },
    beforeRouteLeave (to, from, next) {
      if (to.name !== 'introductionElectronicInvoice') {
        this.$store.commit('noKeepAlive', from.name)
      }
      next()
    },
    methods: {
      ...mapMutations(['setSubmitCustomerService']),
      async getContractAppliedRequest () {
        await loadData(() => {
          return api.getCustomerServices(this.$route.query.serviceContractId)
        }, (data) => {
          if (data) {
            let customerServiceTypes = []
            _.forEach(data, item => {
              if (item.customerServiceType === CustomerServiceType.邮寄纸质发票及纸质合同) {
                customerServiceTypes.push(...[CustomerServiceType.邮寄纸质合同, CustomerServiceType.邮寄纸质发票])
              } else {
                customerServiceTypes.push(item.customerServiceType)
              }
            })
            this.replaced = customerServiceTypes
          }
        }, defaultPreHandler)
      },
      setInstallAddress () {
        if (this.showAddress) {
          this.$nextTick(async () => {
            let address = this.contractDetail
            if (address.provicneId) {
              this.address.province = {
                id: Number(address.provicneId),
                name: address.provicneName
              }
              if (address.cityId) {
                this.address.city = {
                  id: Number(address.cityId),
                  name: address.cityName
                }
                if (address.county) {
                  this.address.county = {
                    id: Number(address.county),
                    name: address.countyName
                  }
                }
              }
            }
            this.address.desc = address.addressDescription.trim()
          })
        }
      },
      // 合同详情
      async loadContractDetail () {
        await loadData(() => {
          this.load = true
          return api.getContractDetail(this.$route.query.serviceContractId)
        }, (data) => {
          if (data) {
            this.contractDetail = data.contract
            this.form.name = data.customer.name
            this.form.phoneNumber = data.customer.phone
            this.setInstallAddress()
          }
          this.load = false
        }, defaultPreHandler)
      },
      async getContractAppliableRequest () {
        let data = defaultPreHandler(await api.getCustomerServiceTypeAppliable(this.$route.query.serviceContractId))
        this.isPay = data.needPay
        await this.getContractAppliedRequest()
        let customerServiceType = {
          [CustomerServiceType.电子合同]: '电子合同',
          [CustomerServiceType.电子发票]: '电子发票',
          [CustomerServiceType.邮寄纸质合同]: '纸质合同',
          [CustomerServiceType.邮寄纸质发票]: '纸质发票'
        }
        _.forEach(data.customerServiceTypes, (value, index) => {
          let find = _.find(this.replaced, i => {
            return i === value.customerServiceType
          })
          let label = customerServiceType[value.customerServiceType]
          if (find && !value.appliable) {
            label += '(已申请)'
          }
          this.options.push({
            value: value.customerServiceType,
            appliable: value.appliable,
            label
          })
        })
      },
      // 合同
      contract (item) {
        let find = _.find(this.options, {value: CustomerServiceType.电子合同, appliable: true})
        if (item) {
          let isPaperContract = _.includes(this.optionsValue, CustomerServiceType.邮寄纸质合同)
          if (!isPaperContract) {
            this.optionsValue.push(CustomerServiceType.邮寄纸质合同)
          }
          if (find) {
            let isElectronicContract = _.includes(this.optionsValue, CustomerServiceType.电子合同)
            if (!isElectronicContract) {
              this.optionsValue.push(CustomerServiceType.电子合同)
            }
            find.disabled = true
          }
        } else {
          if (find) {
            find.disabled = false
          }
        }
      },
      // 发票
      invoice (item) {
        let find60 = _.find(this.options, {value: CustomerServiceType.电子发票})
        if (find60) {
          find60.disabled = item === CustomerServiceType.邮寄纸质发票
        }
        let find30 = _.find(this.options, {value: CustomerServiceType.邮寄纸质发票})
        if (find30) {
          find30.disabled = item === CustomerServiceType.电子发票
        }
      },
      check () {
        let paperContract = _.includes(this.optionsValue, CustomerServiceType.邮寄纸质合同)
        this.contract(paperContract)
        let findInvoice = _.find(this.optionsValue, item => {
          return item === CustomerServiceType.电子发票 || item === CustomerServiceType.邮寄纸质发票
        })
        this.invoice(findInvoice)
      },
      validate () {
        if (this.optionsValue.length === 0) {
          return '请选择申请内容'
        }
        if (this.showAddress) {
          if (!this.address.province || !this.address.desc) {
            return '请维护设备安装地址'
          }
        }
        if (this.showMail) {
          if (!this.form.name) {
            return '请输入收件人'
          } else if (!this.form.phoneNumber) {
            return '请输入联系电话'
          } else if (!this.form.mail) {
            return '请输入邮编'
          } else if (this.$refs.mailState.state.userEmailState === 'error' || this.$refs.mailState.state.userEmailState === 'default') {
            return '请输入正确的邮编'
          } else if (!this.form.address.province || !this.form.address.desc) {
            return '请维护设备收货地址'
          }
        }
      },
      showMsgBox (msg) {
        MessageBox({
          title: '提示',
          message: msg
        })
      },
      setSubmitData () {
        let receiver = this.showMail ? {
          name: this.form.name,
          phone: this.form.phoneNumber,
          address: {
            postCode: this.form.mail,
            provinceId: this.form.address.province.id,
            cityId: this.form.address.city.id,
            countyId: this.form.address.county.id,
            addressDescription: this.form.address.desc
          }
        } : {}
        let installationAddress = this.contractDetail.provicneId ? {} : {
          provinceId: this.address.province.id,
          cityId: this.address.city.id,
          countyId: this.address.county.id,
          addressDescription: this.address.desc
        }
        return {
          personId: this.$store.state.person.personId,
          agentId: window.localStorage.getItem('agentId') || 1000034,
          customerService: {
            customerServiceTypes: this.optionsValue,
            receiver,
            installationAddress
          }
        }
      },
      async submit () {
        let msg = this.validate()
        if (msg) {
          this.showMsgBox(msg)
        } else {
          let params = this.setSubmitData()
          await loadData(() => {
            return api.postCustomerService(this.$route.query.serviceContractId, params)
          }, async (data) => {
            if (data.isOk) {
              this.setSubmitCustomerService(data.content.customerServiceResults)
              if (this.isPay && this.showMail) {
                if (data.content.paymentForm) {
                  let paymentForm = JSON.parse(data.content.paymentForm)
                  this.$refs.weChatPay.pay(paymentForm)
                } else {
                  let filter = _.filter(data.content.customerServiceResults, item => {
                    return !item.success
                  })
                  let message = ''
                  _.forEach(filter, item => {
                    message += (item.message + ';')
                  })
                  this.showMsgBox(message)
                }
              } else {
                this.submitSuccess()
              }
            } else {
              this.showMsgBox(data.message)
            }
          }, null)
        }
      },
      submitSuccess () {
        this.$router.push({
          name: 'submitComplete'
        })
      },
      handleEum () {
        let customerServiceType = new EnumType(CustomerServiceType)
        return customerServiceType
      }
    },
    computed: {
      showAddress () {
        let installAddress = this.contractDetail
        return !installAddress.provicneId || !installAddress.cityId || !installAddress.countyId || !installAddress.addressDescription
      },
      showInvoice () {
        if (_.includes(this.optionsValue, CustomerServiceType.电子发票)) {
          this.information = true
        }
        if (_.includes(this.optionsValue, CustomerServiceType.邮寄纸质发票)) {
          this.information = false
        }
        return _.includes(this.optionsValue, CustomerServiceType.电子发票) || _.includes(this.optionsValue, CustomerServiceType.邮寄纸质发票)
      },
      showMail () {
        return _.includes(this.optionsValue, CustomerServiceType.邮寄纸质合同) || _.includes(this.optionsValue, CustomerServiceType.邮寄纸质发票)
      }
    },
    watch: {
      'address': {
        deep: true,
        handler: function (v) {
          this.form.address = _.cloneDeep(v)
        }
      },
      'showMail': function (show) {
        if (show) {
          this.$nextTick(async () => {
            if (this.contractDetail.provicneId) {
              this.form.address = {
                province: {
                  id: this.contractDetail.provicneId,
                  name: this.contractDetail.provicneName
                },
                city: {
                  id: this.contractDetail.cityId,
                  name: this.contractDetail.cityName
                },
                county: {
                  id: this.contractDetail.countyId,
                  name: this.contractDetail.countyName
                },
                desc: this.contractDetail.addressDescription
              }
            }
          })
        }
      },
      'optionsValue': function (val) {
        let paperContant = _.includes(val, CustomerServiceType.邮寄纸质合同)
        let paperInvoice = _.includes(val, CustomerServiceType.邮寄纸质发票)
        if ((paperContant || paperInvoice) && this.isPay) {
          this.submitBtnText = '支付快递费：￥10.00元'
        } else {
          this.submitBtnText = '提交申请'
        }
      }
    }
  }
</script>

<style scoped>
  .content {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }

  .submitBtn {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .header {
    background-color: transparent;
    color: #888;
    font-size: 14px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }

  .contractCheckBox {
    display: flex;
    flex-wrap: wrap;
    margin: 0 5px;
  }

  .clear :after {
    clear: both;
    content: '.';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .addressTip {
    color: #F15151;
    font-size: 14px;
    padding-left: 10px;
  }

  .contractCheckBoxItem {
    width: 49%;
    height: 35px;
    line-height: 35px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0 2px;
    position: relative;
    background: #fff;
    margin-bottom: 10px;
  }

  .label {
    position: absolute;
    left: 0;
    padding-left: 35px;
    width: 100%;
    box-sizing: border-box;
  }

  .contractCheckBoxItem:nth-child(odd) {
    margin-right: 3px;
  }

  .mint-checkbox-core, .mint-checkbox-label {
    margin-left: 0;
    font-size: 13px;
  }

</style>
