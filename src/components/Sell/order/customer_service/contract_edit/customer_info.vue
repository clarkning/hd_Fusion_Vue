<template>
  <div>
    <div class="header">客户信息</div>
    <div>
      <mt-cell title="客户姓名">
        <input class="mint-field-core input" placeholder="请输入客户姓名" type="text" v-model.trim="customer[1]" />
        <span v-show="nameStatus !== 'default'" class="mint-field-state f_r"
              :class="nameStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="nameStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
      <mt-cell title="客户电话">
        <input class="mint-field-core input" placeholder="请输入客户电话" type="tel" v-model.trim="customer[2]" />
        <span v-show="phoneStatus !== 'default'" class="mint-field-state f_r"
              :class="phoneStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="phoneStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  import { contractEditMixin } from './mixins'
  import _ from 'lodash'

  export default {
    name: 'customerInfo',
    mixins: [contractEditMixin],
    props: {
      customerInfo: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        customer: {
          1: '', // 客户姓名
          2: null // 客户电话
        }
      }
    },
    created () {
      this.updateCustomer()
    },
    methods: {
      updateCustomer () {
        this.customer = _.cloneDeep(this.customerInfo)
      },
      validate () {
        let phoneRe = /^(86)*0*1\d{10}$/
        if (!this.customer[1]) {
          return '客户姓名不能为空，请填写后重新提交。'
        } else if (this.customer[1].length < 2) {
          return '客户姓名格式不正确，请核对后重新输入。'
        } else if (!this.customer[2]) {
          return '客户电话不能为空，请填写后重新提交。'
        } else if (!phoneRe.test(this.customer[2])) {
          return '客户电话格式不正确，请核对后重新输入。'
        } else {
          return this.$_setSubmitCustomerInfo(this.customer, this.customerInfo)
        }
      }
    },
    computed: {
      nameStatus () {
        if (this.customer[1] === this.customerInfo[1]) {
          return 'default'
        } else {
          return this.customer[1].length >= 2 ? 'success' : 'error'
        }
      },
      phoneStatus () {
        if (this.customer[2] === this.customerInfo[2]) {
          return 'default'
        } else {
          let phoneRe = /^(86)*0*1\d{10}$/
          return phoneRe.test(this.customer[2]) ? 'success' : 'error'
        }
      }
    },
    watch: {
      customerInfo: {
        deep: true,
        handler: function (newValue, oldValue) {
          this.updateCustomer()
        }
      }
    }
  }
</script>

<style scoped>


</style>
