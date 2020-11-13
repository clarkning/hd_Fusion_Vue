<template>
  <div class="address">
    <div class="flex address_border">
      <div class="flex_title">省</div>
      <div class="flex_content clear" @click="openPicker()">
        <div class="f_l">
          <span class="choose" v-if="address.province">{{address.province.name}}</span>
          <span v-else>省</span>
        </div>
        <div v-show="address.province && address.province.id" class="mint-field-state f_r is-success">
          <i class="mintui mintui-field-success"></i>
        </div>
      </div>
    </div>
    <div class="flex address_border">
      <div class="flex_title">市</div>
      <div class="flex_content clear" @click="openPicker()">
        <div class="f_l">
          <span class="choose" v-if="address.city">{{address.city.name}}</span>
          <span v-else>市</span>
        </div>
        <div v-show="address.city && address.city.id" class="mint-field-state f_r is-success">
          <i class="mintui mintui-field-success"></i>
        </div>
      </div>
    </div>
    <div class="flex address_border">
      <div class="flex_title">县</div>
      <div class="flex_content clear" @click="openPicker()">
        <div class="f_l">
          <span class="choose" v-if="address.county">{{address.county.name}}</span>
          <span v-else>县</span>
        </div>
        <div v-show="address.county && address.county.id" class="mint-field-state f_r is-success">
          <i class="mintui mintui-field-success"></i>
        </div>
      </div>
    </div>
    <div class="flex address_border">
      <div class="flex_title">详细地址</div>
      <div class="flex_content clear">
        <div class="f_l textarea_box">
          <textarea class="textarea" placeholder="详细地址" v-model="address.desc" rows="4"></textarea>
        </div>
        <div v-show="address.desc" class="mint-field-state f_r is-success">
          <i class="mintui mintui-field-success"></i>
        </div>
      </div>
    </div>

    <mt-popup v-model="provincePicker.show" position="bottom" class="address_popup">
      <div @touchmove.prevent>
        <div class="select-btn-box zindex999">
          <mt-cell title="请选择省市县" class="popup-btn-bg">
      <span>
        <mt-button type="primary" size="small" class="popup-confirm" @click="chooseProvince()">确定</mt-button>
      </span>
          </mt-cell>
        </div>
        <mt-picker ref="picker" :slots="provincePicker.slot" @change="pickerChange" value-key="name"
                   class="popup-picker zindex99"></mt-picker>
      </div>
    </mt-popup>

  </div>


</template>

<script>
  import { loadData, defaultPreHandler } from '../../../../../common/utils'
  import api from '../../../../../api/index2'
  import _ from 'lodash'

  export default {
    name: 'index',
    model: {
      prop: 'address',
      event: 'change'
    },
    props: {
      address: Object
    },
    data () {
      return {
        visible: false,
        geographies: null,
        provincePicker: {
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
          show: false,
          values: []
        },
        values: []
      }
    },
    methods: {
      async openPicker () {
        await this.setGeographyData()
        let picker = this.$refs.picker
        if (this.values.length === 0) {
          picker.setSlotValues(0, this.geographies)
        } else {
          let parent = null
          for (let index in this.values) {
            let intIndex = parseInt(index)
            let value = this.values[intIndex]
            if (parent) {
              this.provincePicker.slot[intIndex].values = parent.children
              if (parent.children) {
                parent = _.find(parent.children, {id: value.id})
              }
            } else {
              picker.setSlotValues(intIndex, this.geographies)
              parent = _.find(this.geographies, {id: value.id})
            }
            if (!picker.getSlotValue(intIndex) || value.id !== picker.getSlotValue(intIndex).id) {
              if (intIndex + 1 < this.values.length) {
                parent.children = await this.getGeography(parent.id, intIndex + 1)
              }
            }
            picker.setSlotValue(intIndex, parent)
          }
        }
        this.provincePicker.show = true
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
        if (this.provincePicker.show) {
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

      async chooseProvince () {
        let picker = this.$refs.picker
        this.geoObjectCopy(picker.getValues(), this.values)
        this.address.province = this.values[0]
        this.address.city = this.values[1]
        this.address.county = this.values[2]
        this.$emit('change', this.address)
        this.provincePicker.show = false
      },

      async setGeographyData () {
        if (!this.geographies) {
          this.geographies = await this.getGeography()
        }
        if (this.address.province) {
          this.values[0] = this.address.province
        }
        if (this.address.city) {
          this.values[1] = this.address.city
        }
        if (this.address.county) {
          this.values[2] = this.address.county
        }
      }
    }

  }
</script>

<style scoped>
  .f_l {
    float: left;
  }

  .f_r {
    float: right;
    margin-right: 15px;
  }

  .clear::after {
    content: '';
    clear: both;
    display: block;
  }

  .address {
    padding-left: 10px;
    background: #fff;
    font-size: 14px;
  }

  .flex {
    min-height: 40px;
    line-height: 40px;
    vertical-align: text-top;
    display: flex;
  }

  .flex_title {
    padding-left: 5px;
    color: #000;
    width: 105px;
  }

  .flex_content {
    flex: 1;
    color: #ccc;
  }

  .choose {
    color: #000;
  }

  .address_popup {
    width: 100%;
  }

  .textarea_box {
    width: 72%;
  }

  .textarea {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    font-size: inherit;
  }

  textarea {
    font-family: Arial;
  }

  textarea::-webkit-input-placeholder,
  textarea:-moz-placeholder,
  textarea::-moz-placeholder,
  textarea:-ms-input-placeholder {
    font-family: Arial;
    color: #888;
  }

  .address_border {
    position: relative
  }

  .address_border::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0;
    border-bottom: 1px solid #dcdfe6;
    left: 0;
    z-index: 1;
  }
</style>
