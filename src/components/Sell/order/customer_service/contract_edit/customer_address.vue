<template>
  <div>
    <div class="header">客户地址</div>
    <div>
      <mt-cell @click.native="openGeoPicker" title="省" is-link>
        <span v-if="customerAddress[3]" class="is_link_font_color">{{customerAddress[3]}}</span>
        <span v-else class="is_link_placeholder">请选择省</span>
        <span v-show="provinceNameStatus !== 'default'" class="mint-field-state f_r" :class="provinceNameStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="provinceNameStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
      <mt-cell @click.native="openGeoPicker" title="市" is-link>
        <span v-if="customerAddress[4]" class="is_link_font_color">{{customerAddress[4]}}</span>
        <span v-else class="is_link_placeholder">请选择市</span>
        <span v-show="cityNameStatus !== 'default'" class="mint-field-state f_r" :class="cityNameStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="cityNameStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
      <mt-cell @click.native="openGeoPicker" title="区/县" is-link>
        <span v-if="customerAddress[5]" class="is_link_font_color">{{customerAddress[5]}}</span>
        <span v-else class="is_link_placeholder">请选择区/县</span>
        <span v-show="countyNameStatus !== 'default'" class="mint-field-state f_r" :class="countyNameStatus === 'success' ? 'is-success' : 'is-error'">
          <i v-if="countyNameStatus === 'success'" class="mintui mintui-field-success"></i>
          <i v-else class="mintui mintui-field-error"></i>
        </span>
      </mt-cell>
      <mt-field label="详细地址" placeholder="请输入详细地址" type="textarea" v-model="customerAddress[6]"
                :state="addressDescriptionStatus"></mt-field>
    </div>
    <mt-popup v-model="picker.show" position="bottom" class="geo_popup" lock-scroll="true"
              :closeOnClickModal="false">
      <div @touchmove.prevent>
        <div class="popup-top clear">
          <mt-button type="primary" size="small" class="popup-button cancel"
                     @click="picker.show = false">取消
          </mt-button>
          <mt-button type="primary" size="small" class="popup-button" @click="chooseAddress()">确定</mt-button>
        </div>
        <mt-picker ref="picker" :slots="picker.slot" value-key="name" @change="pickerChange"></mt-picker>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { contractEditMixin } from './mixins'
  import { loadData, defaultPreHandler } from '../../../../../common/utils'
  import api from '../../../../../api/index2'
  import _ from 'lodash'

  export default {
    name: 'customer_address',
    mixins: [contractEditMixin],
    props: {
      addressInfo: {
        type: Object,
        default: () => {
          return {}
        }
      },
      addressIds: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        customerAddress: {
          3: '',
          cityName: '',
          countyName: '',
          addressDescription: ''
        },
        geographies: null,
        addressValues: [],
        picker: {
          values: [],
          slot: [
            {
              flex: 1,
              values: [],
              className: 'province',
              textAlign: 'center'
            },
            {
              flex: 1,
              values: [],
              className: 'city',
              textAlign: 'center'
            },
            {
              flex: 1,
              values: [],
              className: 'county',
              textAlign: 'center'
            }
          ],
          show: false
        }
      }
    },
    created () {
      this.updateAddress()
    },
    methods: {
      async openGeoPicker () {
        await this.setGeographyData()
        let picker = this.$refs.picker
        if (this.addressValues.length === 0) {
          picker.setSlotValues(0, this.geographies)
        } else {
          let parent = null
          for (let index in this.addressValues) {
            let intIndex = parseInt(index)
            let value = this.addressValues[intIndex]
            if (parent) {
              this.picker.slot[intIndex].values = parent.children
              if (parent.children) {
                parent = _.find(parent.children, {id: value.id})
              }
            } else {
              picker.setSlotValues(intIndex, this.geographies)
              parent = _.find(this.geographies, {id: value.id})
            }
            if (!picker.getSlotValue(intIndex) || value.id !== picker.getSlotValue(intIndex).id) {
              if (intIndex + 1 < this.addressValues.length) {
                parent.children = await this.getGeography(parent.id, intIndex + 1)
              }
            }
            picker.setSlotValue(intIndex, parent)
          }
        }
        this.picker.show = true
      },
      async getGeography (parentId = 0, geographyType = 0) {
        let geography
        await loadData(() => {
          let query = {
            geographyType,
            parentId
          }
          return api.getGeography(query)
        }, (values) => {
          geography = values.geographyDtos
        }, defaultPreHandler, true)
        return geography
      },

      async pickerChange (picker, values) {
        if (this.picker.show) {
          if (values.length > 0) {
            for (let index in values) {
              let i = parseInt(index)
              let newValue = values[i]
              if (newValue) {
                if (i + 1 < values.length) {
                  if (!newValue.children) {
                    newValue.children = await this.getGeography(newValue.id, i + 1)
                  }
                  picker.setSlotValues(i + 1, newValue.children)
                  let code = values[i + 1] ? values[i + 1].id : ''
                  let find = newValue.children.find((item) => {
                    return item.id === code
                  })
                  if (!find) {
                    picker.setSlotValue(i + 1, newValue.children[0])
                  }
                }
              }
            }
          }
        }
      },

      geoObjectCopy (source, target) {
        if (source.length) {
          for (let index in source) {
            if (source[index]) {
              if (!target[index]) target[index] = {}
              let obj = {
                id: source[index].id,
                name: source[index].name
              }
              this.$set(target, index, obj)
            }
          }
        }
      },
      async chooseAddress () {
        let picker = this.$refs.picker
        this.geoObjectCopy(picker.getValues(), this.addressValues)
        this.customerAddress[3] = this.addressValues[0].name
        this.customerAddress[4] = this.addressValues[1].name
        this.customerAddress[5] = this.addressValues[2].name
        this.picker.show = false
      },
      async setGeographyData () {
        if (!this.geographies) {
          this.geographies = await this.getGeography()
        }
      },
      updateAddress () {
        this.customerAddress = _.cloneDeep(this.addressInfo)
        let geoIds = _.cloneDeep(this.addressIds)
        if (geoIds[0]) {
          this.addressValues[0] = {
            id: geoIds[0],
            name: this.customerAddress[3]
          }
        }
        if (geoIds[1]) {
          this.addressValues[1] = {
            id: geoIds[1],
            name: this.customerAddress[4]
          }
        }
        if (geoIds[2]) {
          this.addressValues[2] = {
            id: geoIds[2],
            name: this.customerAddress[5]
          }
        }
      },
      validate () {
        if (this.addressInfo[3] && !this.customerAddress[3]) {
          return '省不能为空，请填写后重新提交。'
        } else if (this.addressInfo[4] && !this.customerAddress[4]) {
          return '市不能为空，请填写后重新提交。'
        } else if (this.addressInfo[5] && !this.customerAddress[5]) {
          return '区/县不能为空，请填写后重新提交。'
        } else if (this.addressInfo[6] && !this.customerAddress[6]) {
          return '详细地址不能为空，请填写后重新提交。'
        } else {
          return this.$_setSubmitCustomerInfo(this.customerAddress, this.addressInfo)
        }
      }
    },
    computed: {
      provinceNameStatus () {
        if (this.customerAddress[3] === this.addressInfo[3]) {
          return 'default'
        } else {
          return this.customerAddress[3] ? 'success' : 'error'
        }
      },
      cityNameStatus () {
        if (this.customerAddress[4] === this.addressInfo[4]) {
          return 'default'
        } else {
          return this.customerAddress[4] ? 'success' : 'error'
        }
      },
      countyNameStatus () {
        if (this.customerAddress[5] === this.addressInfo[5]) {
          return 'default'
        } else {
          return this.customerAddress[5] ? 'success' : 'error'
        }
      },
      addressDescriptionStatus () {
        if (this.customerAddress[6] === this.addressInfo[6]) {
          return 'default'
        } else {
          return this.customerAddress[6] ? 'success' : 'error'
        }
      }
    },
    watch: {
      addressInfo: {
        deep: true,
        handler: function (newValue, oldValue) {
          this.updateAddress()
        }
      }
    }
  }
</script>

<style scoped>
  .geo_popup {
    width: 100%
  }
  .clear :after {
    clear: both;
    content: '.';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .popup-top {
    background: #ffffff;
    width: 100%;
  }

  .popup-button {
    float: right;
    margin: 5px 10px 0 0;
    line-height: 40px;
    color: #26a2ff;
    background: none;
  }
  .cancel {
    float: left;
    margin: 5px 0 0 10px;
  }
</style>
