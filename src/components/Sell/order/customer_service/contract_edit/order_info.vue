<template>
  <div>
    <div class="header">订单信息</div>
    <div>
      <mt-cell title="延保发票号/工单号" v-if="orderInfo[11]">
        <input class="mint-field-core input" placeholder="请输入延保发票号/工单号" type="text" v-model.trim="order[11]"/>
        <span v-show="invoiceCodeStatus !== 'default'" class="mint-field-state f_r"
              :class="invoiceCodeStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="invoiceCodeStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
      <mt-cell title="购机价格(元)">
        <input class="mint-field-core input" placeholder="请输入购机价格(元)" type="number" v-model.trim="order[12]"
               @blur.stop="handleBlur"
               @focus.stop="handleFocus"/>
        <span v-show="purchasePriceStatus !== 'default'" class="mint-field-state f_r"
              :class="purchasePriceStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="purchasePriceStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
      <mt-cell @click.native="openPicker" title="购机日期">
        <span v-if="order[13]" class="is_link_font_color">{{order[13]}}</span>
        <span v-else class="is_link_placeholder">请输入购机日期</span>
        <span v-show="purchaseTimeStatus !== 'default'" class="mint-field-state f_r"
              :class="purchaseTimeStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="purchaseTimeStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
    </div>
    <div @touchmove.prevent>
      <mt-datetime-picker
        lock-scroll="true"
        class="timePicker"
        v-model="timePicker.pickerValue"
        type="date"
        ref="picker"
        :endDate="timePicker.maxDate"
        year-format="{value} "
        @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
  import { contractEditMixin } from './mixins'
  import _ from 'lodash'
  import moment from 'moment'

  export default {
    name: 'orderInfo',
    mixins: [contractEditMixin],
    props: {
      maxPrice: Number,
      minPrice: Number,
      orderInfo: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        timePicker: {
          pickerValue: '',
          maxDate: moment().toDate()
        },
        order: {
          13: '',
          12: '',
          11: ''
        }
      }
    },
    created () {
      this.updateOrder()
    },
    methods: {
      openPicker () {
        if (this.order[13]) {
          this.timePicker.pickerValue = moment(this.order[13]).toDate()
        }
        this.$refs.picker.open()
      },
      handleConfirm (data) {
        this.order[13] = moment(data).format('YYYY-MM-DD')
      },
      updateOrder () {
        this.order = _.cloneDeep(this.orderInfo)
      },
      validate () {
        if (!this.order[11] && this.orderInfo[11]) {
          return '延保发票号/工单号不能为空，请填写后重新提交。'
        } else if (this.orderInfo[12] && !this.order[12]) {
          return '购机价格不能为空，请填写后重新提交。'
        } else if (this.orderInfo[12] && (this.order[12] !== this.orderInfo[12] && (this.order[12] > this.maxPrice || this.order[12] < this.minPrice))) {
          return `该合同的购机价范围为 ${this.minPrice}-${this.maxPrice} 元，如有疑问请咨询客服重录合同信息。`
        } else if (this.orderInfo[13] && !this.order[13]) {
          return '购机日期不能为空，请填写后重新提交。'
        } else {
          return this.$_setSubmitCustomerInfo(this.order, this.orderInfo)
        }
      },
      handleBlur (v) {
        window.scroll(0, 300)
        this.order[12] = Number(v.target.value).toFixed(2)
      },
      handleFocus (v) {
        if (!v.target.valueAsNumber) {
          this.order[12] = ''
        } else {
          this.order[12] = Number(v.target.value)
        }
      }
    },
    computed: {
      purchaseTimeStatus () {
        if (this.order[13] === this.orderInfo[13]) {
          return 'default'
        } else {
          return this.order[13] ? 'success' : 'error'
        }
      },
      purchasePriceStatus () {
        if (this.order[12] === this.orderInfo[12]) {
          return 'default'
        } else {
          if (this.order[12] > this.maxPrice || this.order[12] < this.minPrice) {
            return 'error'
          } else {
            return 'success'
          }
        }
      },
      invoiceCodeStatus () {
        if (this.order[11] === this.orderInfo[11]) {
          return 'default'
        } else {
          return this.order[11] ? 'success' : 'error'
        }
      }
    },
    watch: {
      orderInfo: {
        deep: true,
        handler: function (newValue, oldValue) {
          this.updateOrder()
        }
      }
    }
  }
</script>

<style scoped>

</style>
