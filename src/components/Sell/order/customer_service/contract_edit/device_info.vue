<template>
  <div>
    <div class="header">设备信息</div>
    <div>
      <mt-cell @click.native="goToPageSelectCategory()" title="品类" is-link>
        <span class="is_link_font_color">{{device[7]}}</span>
        <span v-show="productCateogryStatus !== 'default'" class="mint-field-state f_r" :class="productCateogryStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="productCateogryStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
      <mt-cell @click.native="goToPageSelectBrand()" title="品牌" is-link>
        <span class="is_link_font_color">{{device[8]}}</span>
        <span v-show="brandStatus !== 'default'" class="mint-field-state f_r" :class="brandStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="brandStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>

      <mt-cell title="型号">
        <input class="mint-field-core input" placeholder="请输入型号" type="text" v-model.trim="device[9]" />
        <span v-show="factoryModelStatus !== 'default'" class="mint-field-state f_r"
              :class="factoryModelStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="factoryModelStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
      <mt-cell v-if="deviceInfo[10]" title="机编号/序列号">
        <input class="mint-field-core input" placeholder="请输入机编号/序列号" type="text" v-model.trim="device[10]" />
        <span v-show="serialNumberStatus !== 'default'" class="mint-field-state f_r"
              :class="serialNumberStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="serialNumberStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  import { contractEditMixin } from './mixins'
  import _ from 'lodash'
  import { createNamespacedHelpers } from 'vuex'

  const {mapState} = createNamespacedHelpers('customerService')

  export default {
    name: 'deviceInfo',
    mixins: [contractEditMixin],
    props: {
      deviceInfo: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    activated () {
      if (this.storeBrandName) {
        this.device[8] = this.storeBrandName
      }
      if (this.storeCategoryName) {
        this.device[7] = this.storeCategoryName
      }
    },
    data () {
      return {
        device: {
          7: '',
          8: '',
          9: '',
          10: ''
        }
      }
    },
    created () {
      this.updateDevice()
    },
    methods: {
      goToPageSelectCategory () {
        this.$router.push({
          name: 'customerServiceSelectCategory',
          query: {
            serviceContractId: this.$route.query.serviceContractId
          }
        })
      },
      goToPageSelectBrand () {
        this.$router.push({
          name: 'customerServiceSelectBrand'
        })
      },
      updateDevice () {
        this.device = _.cloneDeep(this.deviceInfo)
      },
      validate () {
        if (!this.device[7]) {
          return '品类不能为空，请填写后重新提交。'
        } else if (!this.device[8]) {
          return '品牌不能为空，请填写后重新提交。'
        } else if (this.deviceInfo[9] && !this.device[9]) {
          return '型号不能为空，请填写后重新提交。'
        } else if (this.deviceInfo[10] && !this.device[10]) {
          return '机编号/序列号不能为空，请填写后重新提交。'
        } else {
          return this.$_setSubmitCustomerInfo(this.device, this.deviceInfo)
        }
      }
    },
    computed: {
      ...mapState({
        storeBrandName: state => state.brandName,
        storeCategoryName: state => state.categoryName
      }),
      productCateogryStatus () {
        if (this.device[7] === this.deviceInfo[7]) {
          return 'default'
        } else {
          return this.device[7] ? 'success' : 'error'
        }
      },
      brandStatus () {
        if (this.device[8] === this.deviceInfo[8]) {
          return 'default'
        } else {
          return this.device[8] ? 'success' : 'error'
        }
      },
      factoryModelStatus () {
        if (this.device[9] === this.deviceInfo[9]) {
          return 'default'
        } else {
          return this.device[9] ? 'success' : 'error'
        }
      },
      serialNumberStatus () {
        if (this.device[10] === this.deviceInfo[10]) {
          return 'default'
        } else {
          return this.device[10] ? 'success' : 'error'
        }
      }
    },
    watch: {
      deviceInfo: {
        deep: true,
        handler: function (newValue, oldValue) {
          this.updateDevice()
        }
      }
    }
  }
</script>

<style scoped>


</style>
