<template>
  <div class="OrderFilling">
    <div class="fixed_a">
      <sellProgress :orderStatus="orderStatus"></sellProgress>
      <mt-field label="姓名" placeholder="请输入客户姓名" v-model="orderFilling.customerDto.customerName"
                :disableClear="true"></mt-field>
      <mt-field label="手机" placeholder="请输入客户手机号码" type="tel" v-model="orderFilling.customerDto.phoneNumber"
                :disableClear="true"></mt-field>
      <div>
        <div @click="goToPageCategory()" class="container mt_15">
          <div class="container_c" :class="{placeholder: isCategoryPlaceholder}">
            <div class="content bg_img_none">
              <mt-cell title="品类" :value="orderFilling.category.value.categoryName"></mt-cell>
            </div>
            <span class="link"></span>
          </div>
        </div>
        <div @click="goToPageBrand()" class="container">
          <div class="container_c" :class="{placeholder: isBrandPlaceholder}">
            <div class="content bg_img_none">
              <mt-cell title="品牌" :value="orderFilling.brand.value.brandName"></mt-cell>
            </div>
            <span class="link"></span>
          </div>
        </div>
        <div class="container bg_img_none" v-for="item in expand.otherExpand">
          <div class="geography bg_img_none" v-if="item.contentTypeCode === 5">
            <div @click="provincePicker.show = expand.showLocation"
                 :class="{address: address.province.name !== ''}" class="container">
              <mt-field label="省" placeholder="请选择省" v-model="address.province.name"
                        :disabled="true"></mt-field>
            </div>
            <mt-popup v-model="provincePicker.show" position="bottom" class="upimg-popup" lock-scroll="true"
                      :closeOnClickModal="false">
              <div @touchmove.prevent>
                <div class="popup-top clear">
                  <mt-button type="primary" size="small" class="popup-button cancel"
                             @click="provincePicker.show = false">取消
                  </mt-button>
                  <mt-button type="primary" size="small" class="popup-button" @click="chooseProvince()">确定</mt-button>
                </div>
                <mt-picker ref="provincePickerObject" :slots="provincePicker.slot" value-key="name"></mt-picker>
              </div>
            </mt-popup>
            <div @click="cityPicker.show = expand.showLocation"
                 :class="{address: address.city.name !== ''}" class="container">
              <mt-field label="市" placeholder="请选择市" v-model="address.city.name"
                        :disabled="true"></mt-field>
            </div>
            <mt-popup v-model="cityPicker.show" position="bottom" class="upimg-popup" lock-scroll="true"
                      :closeOnClickModal="false">
              <div @touchmove.prevent>
                <div class="popup-top clear">
                  <mt-button type="primary" size="small" class="popup-button cancel" @click="cityPicker.show = false">取消
                  </mt-button>
                  <mt-button type="primary" size="small" class="popup-button" @click="chooseCity()">确定</mt-button>
                </div>
                <mt-picker ref="cityPickerObject" :slots="cityPicker.slot" value-key="name"></mt-picker>
              </div>
            </mt-popup>
            <div @click="countyPicker.show = expand.showLocation"
                 :class="{address: address.county.name !== ''}" class="container">
              <mt-field label="县" placeholder="请选择县"
                        v-model="address.county.name"
                        :disabled="true"></mt-field>
            </div>
            <mt-popup v-model="countyPicker.show" position="bottom" class="upimg-popup" lock-scroll="true"
                      :closeOnClickModal="false">
              <div @touchmove.prevent>
                <div class="popup-top clear">
                  <mt-button type="primary" size="small" class="popup-button cancel" @click="countyPicker.show = false">
                    取消
                  </mt-button>
                  <mt-button type="primary" size="small" class="popup-button" @click="chooseCounty()">确定</mt-button>
                </div>
                <mt-picker ref="countyPickerObject" :slots="countyPicker.slot" value-key="name"></mt-picker>
              </div>

            </mt-popup>
            <mt-field :readonly="!expand.showLocation" label="详细地址" placeholder="请输入详细地址" type="textarea" rows="2"
                      v-model="address.desc"
                      :disableClear="true"></mt-field>
          </div>
          <div v-else-if="item.contentTypeCode !== 6">
            <mt-field :label="item.name" :placeholder="item.describe" v-model="item.value"
                      :disableClear="true">
              <span v-if="item.contentTypeCode === 4" @click="scanQRCode(item.id)" class="scan_icon"><img
                src="/static/we-icon.png"/></span>
            </mt-field>
          </div>
        </div>
        <div class="container bg_img_none" v-if="orderFilling.purchasePrice">
          <mt-cell title="购机价格" :value="orderFilling.purchasePrice"></mt-cell>
        </div>
        <div class="container bg_img_none" v-if="orderFilling.purchaseTime || expand.timeExpand.length === 1"
             @click="openPicker()" :class="{placeholder: !orderFilling.purchaseTime}">
          <mt-cell title="购机时间" :value="orderFilling.purchaseTime || '请选择购机时间'"></mt-cell>
        </div>
        <div class="geography">
          <mt-datetime-picker
            lock-scroll="true"
            class="timePicker"
            v-model="timePicker.pickerValue"
            type="date"
            ref="picker"
            :endDate="timePicker.maxDate"
            year-format="{value}"
            @confirm="handleConfirm">
          </mt-datetime-picker>
        </div>
        <div class="container bg_img_none" v-if="orderFilling.service.unitPrice">
          <mt-cell :title="orderFilling.service.serviceItemName"
                   :value="orderFilling.service.unitPrice + ' 元'"></mt-cell>
        </div>
      </div>

      <div class="img_container">
        <div v-for="item in expand.imageExpand" class="pic">
          <div class="img" @click="ensureOnlyImage(item.id)">
            <p v-if="!item.src" class="describe">{{item.describe}}</p>
            <i v-if="!item.src" class="iconfont icon-jiahao icon-size" aria-hidden="true" slot="icon"></i>
            <img v-show="item.src" :src="item.src">
          </div>
          <p class="title">{{item.name}}</p>
        </div>
      </div>
      <div class="fixButton">
        <div class="mt_15 w_90 mb_15">
          <mt-button size="large" type="primary" @click="submitOrder()">提交</mt-button>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="confirmationInformation"
      position="center"
      :closeOnClickModal="false"
      class="confirmation-information"
      lock-scroll="true">
      <div class="conInf">
        <div class="conInf-con">
          <div style="text-align: center" class="confirmTitle">确认提交</div>
          <p class="clear">{{orderFilling.service.serviceItemName }}</p>
          <p class="clear"><span class="conInf-label">姓名:</span><span>{{orderFilling.customerDto.customerName}}</span></p>
          <p class="clear"><span class="conInf-label">手机:</span><span>{{orderFilling.customerDto.phoneNumber}}</span></p>
          <p class="clear"><span class="conInf-label">品类:</span><span>{{orderFilling.category.value.categoryName }}</span></p>
          <p class="clear"><span class="conInf-label">售价:</span><span>{{orderFilling.service.unitPrice}}</span></p>
        </div>
        <div class="btn">
          <mt-button type="default" @click="confirmationInformation=false">否</mt-button>
          <mt-button type="primary" @click="confirmBtn()">是</mt-button>
        </div>
      </div>
    </mt-popup>
    <getLocationFailWin ref="getLocationFail"></getLocationFailWin>
  </div>
</template>
<script>
  import { createNamespacedHelpers } from 'vuex'
  import sellProgress from '../public/progress.vue'
  import api from '../../api/index2'
  import moment from 'moment'
  import { loadData, defaultPreHandler, boolPreHandler } from '../../common/utils'
  import wechatlib from 'weixin-js-sdk'
  import _ from 'lodash'
  import { Toast, Indicator } from 'mint-ui'
  import getLocationFailWin from '../public/get_location_fail_win'

  const {mapState, mapMutations, mapActions} = createNamespacedHelpers('order')

  export default {
    name: 'OrderFilling',
    components: {
      sellProgress,
      getLocationFailWin
    },
    data () {
      return {
        indicatorLoading: false,
        pushName: '',
        confirmationInformation: false,
        ifSubmit: true,
        orderId: null,
        timePicker: {
          pickerValue: moment().toDate(),
          maxDate: moment().toDate()
        },
        orderFilling: {
          customerDto: {
            customerName: '',
            phoneNumber: ''
          },
          category: {
            value: {
              categoryName: '请选择品类',
              categoryId: null
            },
            categoryList: [],
            isJumpingCategory: null
          },
          brand: {
            value: {
              brandName: '请选择品牌',
              brandId: null
            },
            brandList: [],
            isJumpingBrand: null
          },
          expand: [],
          service: {
            serviceItemName: null,
            unitPrice: null,
            serviceOptionItemId: null,
            servicePackId: null
          },
          viewDate: null,
          purchaseTime: null,
          purchasePrice: ''
        },
        orderDetail: {},
        expand: {
          submitImage: false,
          showLocation: false,
          confirm: false,
          imageExpand: [],
          timeExpand: [],
          otherExpand: [],
          expands: []
        },
        provincePicker: {
          value: '',
          slot: [
            {
              flex: 1,
              values: [],
              className: 'province',
              textAlign: 'center'
            }
          ],
          show: false
        },
        cityPicker: {
          value: '',
          slot: [
            {
              flex: 1,
              values: [],
              className: 'city',
              textAlign: 'center'
            }
          ],
          show: false
        },
        countyPicker: {
          value: '',
          slot: [
            {
              flex: 1,
              values: [],
              className: 'county',
              textAlign: 'center'
            }
          ],
          show: false
        },
        address: {
          desc: '',
          province: {
            geographyType: 0,
            id: null,
            name: ''
          },
          city: {
            geographyType: 1,
            id: null,
            name: ''
          },
          county: {
            geographyType: 2,
            id: null,
            name: ''
          }
        },
        data: {
          orderId: '',
          brandId: '',
          categoryId: '',
          customerName: '',
          customerPhone: '',
          expandData: [],
          purchasePrice: '',
          remark: '',
          serviceOptionItemId: ''
        },
        orderStatus: 'noSubmit'
      }
    },
    async created () {
      await this.load()
    },
    async mounted () {
      await this.config()
    },
    beforeRouteLeave (to, from, next) {
      this.setCustomerDto(this.orderFilling.customerDto)
      this.setBrandValue(this.orderFilling.brand)
      this.setCategoryValue(this.orderFilling.category)
      for (let expand of this.expand.expands) {
        if (expand.contentTypeCode === 5) {
          expand.value = JSON.stringify({
            addressDescription: this.address.desc,
            city: this.address.city.name,
            cityId: this.address.city.id,
            county: this.address.county.name,
            countyId: this.address.county.id,
            province: this.address.province.name,
            provinceId: this.address.province.id
          })
        }
      }
      this.setExpand(this.expand.expands)
      next()
    },
    methods: {
      ...mapActions(['getOrderDetail', 'getObjectExpands']),
      ...mapMutations(['setService', 'setCustomerDto', 'setBrandValue', 'setCategoryValue', 'setExpand', 'removeOrderFilling']),
      async load () {
        let ifFixPosition = false
        await loadData(async () => {
          await this.getOrderFillingData()
          this.setPushName()
          await this.getCategoryList()
          await this.getBrandList()
          return this.getExpand()
        }, v => { ifFixPosition = v })
        if (ifFixPosition) {
          this.fixPosition()
        }
      },
      setPushName () {
        let payType = this.storeOrderDetail.paymentDto.payType
        let payerType = this.storeOrderDetail.paymentDto.payerType
        let arr = [payType, payerType]
        let key = arr.join('')
        this.pushName = this.$route.meta.pushName[key]
      },
      async config () {
        let url = location.href.split('#')[0]
        await this.$initWxConfig(url, ['chooseImage', 'getLocalImgData', 'uploadImage', 'scanQRCode', 'getLocation'])
      },
      handleConfirm (data) {
        this.orderFilling.purchaseTime = moment(data).format('YYYY/MM/DD')
        this.expand.timeExpand[0].value = this.orderFilling.purchaseTime
      },
      openPicker () {
        if (!this.orderDetail.orderItemDtos[0].customerDeviceDto.purchaseTime) {
          let time = this.orderFilling.purchaseTime
          this.timePicker.pickerValue = (time ? moment(time).toDate() : moment().toDate())
          this.$refs.picker.open()
        }
      },
      async getOrderFillingData () {
        this.orderId = this.$route.query.orderId
        await this.getOrderDetail(this.orderId)
        this.setService(this.orderId)
        this.orderFilling = JSON.parse(JSON.stringify(this.storeOrderFilling))
        this.orderDetail = JSON.parse(JSON.stringify(this.storeOrderDetail))
        if (this.orderFilling.purchaseTime) {
          this.orderFilling.purchaseTime = moment(this.orderFilling.purchaseTime).format('YYYY-MM-DD')
        }
        this.expand.expands = this.orderFilling.expand
        this.expand.otherExpand = this.expand.expands.filter((item) => {
          return item.contentTypeCode !== 1 && item.contentTypeCode !== 3
        })
        this.expand.timeExpand = this.expand.expands.filter((item) => {
          return item.contentTypeCode === 1
        })
        this.expand.imageExpand = this.expand.expands.filter((item) => {
          return item.contentTypeCode === 3
        })
        let address = this.expand.expands.filter((item) => {
          return item.contentTypeCode === 5
        })
        if (address.length > 0 && address[0].value) {
          let value = JSON.parse(address[0].value)
          this.address.desc = value.addressDescription
          this.address.city.name = value.city
          this.address.city.id = value.cityId
          this.address.county.name = value.county
          this.address.county.id = value.countyId
          this.address.province.name = value.province
          this.address.province.id = value.provinceId
        }
      },
      async getCategoryList () {
        if (this.orderFilling.category.isJumpingCategory === null) {
          await loadData(() => {
            return api.getCategories(this.orderId)
          }, data => {
            if (data.length === 1) {
              this.orderFilling.category.value = data[0]
              this.orderFilling.category.isJumpingCategory = false
            } else {
              this.orderFilling.category.isJumpingCategory = true
            }
            this.orderFilling.category.categoryList = data
          }, defaultPreHandler, true)
        }
      },
      async getBrandList () {
        if (this.orderFilling.brand.isJumpingBrand === null) {
          let params = {
            orderId: this.orderId,
            categoryId: this.orderFilling.category.value.categoryId,
            name: '',
            page: 1
          }
          if (this.orderFilling.category.value.categoryId && !this.orderFilling.brand.value.brandId) {
            await loadData(() => {
              return api.getBrands(params)
            }, data => {
              this.orderFilling.brand.brandList = data
            }, defaultPreHandler, true)
          }
          if (this.orderFilling.brand.brandList.length === 1) {
            this.orderFilling.brand.value = this.orderFilling.brand.brandList[0]
            this.orderFilling.brand.isJumpingBrand = false
          } else {
            this.orderFilling.brand.isJumpingBrand = true
          }
        }
      },
      async getExpand () {
        let params = {
          servicePackId: this.orderFilling.service.servicePackId,
          categoryId: this.orderFilling.category.value.categoryId
        }
        this.expand.expands = JSON.parse(JSON.stringify(this.orderFilling.expand))
        if (this.orderFilling.category.value.categoryId && this.expand.expands.length === 0) {
          await this.getObjectExpands(params)
          let orderFilling = JSON.parse(JSON.stringify(this.storeOrderFilling))
          this.expand.expands = orderFilling.expand
          _.forEach(this.expand.expands, (item) => {
            if (item.isNull) {
              item.state = 'success'
            } else {
              item.state = 'default'
            }
            Object.assign(item, {value: null})
          })
        }
        this.expand.otherExpand = this.expand.expands.filter((item) => {
          return item.contentTypeCode !== 1 && item.contentTypeCode !== 3
        })
        this.expand.timeExpand = this.expand.expands.filter((item) => {
          return item.contentTypeCode === 1
        })
        if (this.expand.timeExpand && this.expand.timeExpand.length > 0) {
          if (this.orderFilling.purchaseTime) {
            this.expand.timeExpand[0].value = this.orderFilling.purchaseTime
          } else {
            this.orderFilling.purchaseTime = this.expand.timeExpand[0].value
          }
        }
        this.expand.imageExpand = this.expand.expands.filter((item) => {
          return item.contentTypeCode === 3
        })
        let address = this.expand.expands.filter((item) => {
          return item.contentTypeCode === 5
        })
        this.expand.showLocation = !!(address.length > 0 && address[0].value)
        return address.length > 0 && !address[0].value
      },
      async geocode (res) {
        await loadData(() => {
          return api.geocode(res.latitude, res.longitude, 3)
        }, value => {
          if (value) {
            this.address.province.id = value.provinceId
            this.address.city.id = value.cityId
            this.address.county.id = value.districtId
            this.address.desc = value.street
          }
        }, defaultPreHandler, true)
      },
      ensureOnlyImage (id) {
        let find = _.find(this.expand.imageExpand, {id})
        if (find.needAddress) {
          this.fixPosition(id)
        } else {
          this.chooseImage(id)
        }
      },
      async fixPosition (id) {
        this.indicator('地理位置获取中')
        this.indicatorLoading = true
        let vue = this
        let u = navigator.userAgent
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (!isIOS) {
          setTimeout(() => {
            if (vue.indicatorLoading) {
              Indicator.close()
              vue.indicatorLoading = false
              vue.$refs.getLocationFail.show(true)
            }
          }, 5000)
        }
        wechatlib.getLocation({
          type: 'wgs84',
          success: async function (res) {
            if (id) {
              setTimeout(() => {
                vue.chooseImage(id, res)
              }, 300)
            } else {
              await vue.geocode(res)
              vue.expand.showLocation = true
            }
            Indicator.close()
            vue.indicatorLoading = false
          },
          fail: function () {
            if (!id) {
              vue.expand.showLocation = true
            }
            vue.$refs.getLocationFail.show(true)
            Indicator.close()
            vue.indicatorLoading = false
          },
          cancel: function () {
            if (!id) {
              vue.expand.showLocation = true
            }
            vue.$refs.getLocationFail.show(false)
            Indicator.close()
            vue.indicatorLoading = false
          }
        })
      },
      setPickerDefaultIndex (picker, value, key = 'id') {
        let v = picker.getSlotValues(0).find(s => s[key] === value)
        if (v) {
          picker.setSlotValue(0, v)
        }
      },
      async getGeography (picker, parentId = 0, geographyType = 0) {
        let param = {
          geographyType,
          parentId
        }
        await loadData(() => {
          return api.getGeography(param)
        }, values => {
          picker.setSlotValues(0, values.geographyDtos)
        }, defaultPreHandler, true)
      },
      async chooseProvince () {
        let picker = this.$refs.provincePickerObject[0]
        this.address.province = picker.getValues()[0]
        this.provincePicker.show = false
        this.cityPicker.show = true
      },
      async chooseCity () {
        let picker = this.$refs.cityPickerObject[0]
        this.address.city = picker.getValues()[0]
        this.cityPicker.show = false
        this.countyPicker.show = true
      },
      chooseCounty () {
        let picker = this.$refs.countyPickerObject[0]
        this.address.county = picker.getSlotValue(0)
        this.countyPicker.show = false
      },
      goToPageCategory () {
        if (this.orderFilling.category.isJumpingCategory) {
          this.$router.push({
            name: 'Category',
            query: {
              orderId: this.orderId
            }
          })
        }
      },
      goToPageBrand () {
        if (this.orderFilling.category.value.categoryId && this.orderFilling.brand.isJumpingBrand) {
          this.$router.push({
            name: 'Brand',
            query: {
              category: this.orderFilling.category.value.categoryId,
              orderId: this.orderId,
              projectId: this.storeOrderDetail.projectId
            }
          })
        }
      },
      scanQRCode (expandId) {
        let vue = this
        let index = _.findIndex(this.expand.otherExpand, {id: expandId})
        wechatlib.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: function (res) {
            let result = res.resultStr
            let resIndex = res.resultStr.indexOf(',') + 1
            result = result.slice(resIndex)
            vue.expand.otherExpand[index].value = result
            vue.$set(vue.expand.otherExpand, index, vue.expand.otherExpand[index])
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        })
      },
      chooseImage (id, res) {
        let vue = this
        this.expand.submitImage = true
        let index = _.findIndex(this.expand.imageExpand, {id})
        let sourceType = this.expand.imageExpand[index].cameraOnly ? ['camera'] : ['album', 'camera']
        if (res) {
          this.expand.imageExpand[index].location = {
            coordX: res.longitude,
            coordY: res.latitude
          }
        }
        wechatlib.chooseImage({
          count: 1,
          sizeType: ['original'],
          sourceType,
          success: async function (res) {
            vue.$set(vue.expand.imageExpand[index], 'src', res.localIds[0])
            vue.$set(vue.expand.imageExpand[index], 'save', true)
            vue.uploadImage(index, res.localIds[0])
          },
          fail: function () {
            vue.expand.submitImage = false
          },
          cancel: function () {
            vue.expand.submitImage = false
          }
        })
      },
      getLocalImageDate (index, localID) {
        let vue = this
        wechatlib.getLocalImgData({
          localId: localID,
          success: function (res) {
            let localData = res.localData
            vue.$set(vue.expand.imageExpand[index], 'src', localData)
          }
        })
      },
      uploadImage (index, localId) {
        let vue = this
        wechatlib.uploadImage({
          localId: localId,
          isShowProgressTips: 1,
          success: function (res) {
            vue.expand.imageExpand[index].value = res.serverId
            let u = navigator.userAgent
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            if (isIOS) {
              vue.getLocalImageDate(index, localId)
            }
            vue.expand.submitImage = false
          },
          fail: function () {
            this.toast('图片上传失败，请重试')
            vue.expand.submitImage = false
          }
        })
      },
      confirmExpands () {
        let isNotNull = this.expand.expands.filter((item) => {
          return !item.isNull
        })
        let regs = isNotNull.filter((item) => {
          return item.regex !== ''
        })
        let leaf = _.filter(isNotNull, {regex: ''})
        _.forEach(leaf, (item) => {
          if (item.value) {
            item.state = 'success'
          } else {
            item.state = 'default'
          }
        })
        _.forEach(regs, (item) => {
          let re = new RegExp(item.regex, 'i')
          if (item.value) {
            let res = re.test(item.value)
            if (res) {
              item.state = 'success'
            } else {
              item.state = 'default'
            }
          } else {
            item.state = 'default'
          }
          if (item.contentTypeCode === 1 && item.value) {
            let purchaseTime = moment(item.value).toDate()
            let submitTime = this.orderDetail.submitTime
            let today = moment(submitTime).toDate()
            let days = parseInt((today - purchaseTime) / 1000 / 60 / 60 / 24)
            if (days > item.regex) {
              item.state = 'default'
            } else {
              item.state = 'success'
            }
          }
        })
        return this.expand.expands.find((item) => {
          return item.state === 'default'
        })
      },
      toast (msg) {
        Toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
      },
      indicator (message) {
        Indicator.open({
          text: message,
          spinnerType: 'fading-circle'
        })
      },
      confirm () {
        this.expand.confirm = false
        let expandsState = this.confirmExpands()
        let phoneRe = /^(86)*0*1\d{10}$/
        let nameRe = /^([A-Za-z\u4e00-\u9fa5]{2,14})$/
        let address = this.expand.expands.find((item) => {
          return item.contentTypeCode === 5
        })
        if (address) {
          address = !address.isNull
        }
        if (!nameRe.test(this.orderFilling.customerDto.customerName)) {
          this.toast('请输入正确的客户姓名')
        } else if (!phoneRe.test(this.orderFilling.customerDto.phoneNumber)) {
          this.toast('请输入11位手机号')
        } else if (!this.orderFilling.category.value.categoryId) {
          this.toast('请选择品类')
        } else if (!this.orderFilling.brand.value.brandId) {
          this.toast('请选择品牌')
        } else if (address && !this.address.province.id) {
          this.toast('请选择省')
        } else if (address && !this.address.city.id) {
          this.toast('请选择市')
        } else if (address && !this.address.county.id) {
          this.toast('请选择县')
        } else if (address && this.address.desc === '') {
          this.toast('请输入详细地址')
        } else if (expandsState) {
          let message
          if (expandsState.regexMsg === '') {
            if (expandsState.contentTypeCode === 1) {
              message = '购机时间不可为空'
            } else {
              message = expandsState.name + '不可为空'
            }
          } else {
            message = expandsState.regexMsg
          }
          this.toast(message)
        } else {
          this.expand.confirm = true
        }
      },
      async postData () {
        for (let item of this.expand.expands) {
          if (item.contentTypeCode === 3 && item.save) {
            await loadData(() => {
              return api.getImage(item.value, 20)
            }, (image) => {
              item.value = image.id
            }, defaultPreHandler, true)
          }
        }
        await this.setData()
        await loadData(() => {
          return api.postOrder(this.data)
        }, (res) => {
          if (res) {
            this.orderStatus = 'submit'
            this.confirmationInformation = false
            let timeout = 0
            if (this.orderDetail.paymentDto.payType === 0) {
              Toast({
                message: '已成功发送短信',
                duration: 1000
              })
              timeout = 1000
            }
            setTimeout(() => {
              this.removeOrderFilling()
              let query = {}
              if (timeout === 0) {
                query.orderId = this.orderId
              } else {
                window.history.pushState({}, 'title', '#/login')
              }
              this.$router.push({
                name: this.pushName,
                query
              })
            }, timeout)
          } else {
            this.ifSubmit = true
          }
        }, boolPreHandler)
      },
      async confirmBtn () {
        if (this.ifSubmit) {
          this.ifSubmit = false
          await loadData(() => {
            return this.postData()
          })
        }
      },
      async submitOrder () {
        if (this.indicatorLoading) return
        if (this.expand.submitImage) {
          this.toast('图片上传中，请稍候...')
        } else {
          for (let item of this.expand.expands) {
            if (item.contentTypeCode === 5) {
              item.value = JSON.stringify({
                addressDescription: this.address.desc,
                city: this.address.city.name,
                cityId: this.address.city.id,
                county: this.address.county.name,
                countyId: this.address.county.id,
                province: this.address.province.name,
                provinceId: this.address.province.id
              })
            }
          }
          this.confirm()
          if (this.expand.confirm) {
            this.confirmationInformation = true
          }
        }
      },
      async setData () {
        this.data.orderId = this.$route.query.orderId
        this.data.brandId = this.orderFilling.brand.value.brandId
        this.data.categoryId = this.orderFilling.category.value.categoryId
        this.data.customerName = this.orderFilling.customerDto.customerName
        this.data.customerPhone = this.orderFilling.customerDto.phoneNumber
        this.data.purchasePrice = this.orderFilling.purchasePrice || ''
        this.data.serviceOptionItemId = this.orderFilling.service.serviceOptionItemId
        let expandData = []
        let remark = ''
        for (let expand of this.expand.expands) {
          let item = {
            customerDeviceExpandId: expand.id,
            customerDeviceExpandValue: expand.value || ''
          }
          if (expand.contentTypeCode === 1) {
            item.customerDeviceExpandValue = this.orderFilling.purchaseTime
          } else if (expand.contentTypeCode === 3) {
            if (!expand.coord) {
              item.coord = {}
            } else {
              item.coord = expand.coord
            }
            if (expand.location && expand.save) {
              item.coord = expand.location
              await loadData(() => {
                return api.geocode(expand.location.coordY, expand.location.coordX, 3)
              }, value => {
                if (value) {
                  item.coord.provinceId = value.provinceId
                  item.coord.cityId = value.cityId
                  item.coord.countyId = value.districtId
                  item.coord.addressDescription = value.address
                }
              }, defaultPreHandler, true)
            }
          }
          expandData.push(item)
          let re = new RegExp('备注')
          if (re.test(expand.name)) {
            remark = expand.value || ''
          }
        }
        this.data.expandData = expandData
        this.data.remark = remark || ''
      }
    },
    computed: {
      ...mapState({
        storeOrderDetail: state => state.orderDetail,
        storeOrderFilling: state => state.orderFilling
      }),
      isCategoryPlaceholder: function () {
        return this.orderFilling.category.value.categoryName === '请选择品类'
      },
      isBrandPlaceholder: function () {
        return this.orderFilling.brand.value.brandName === '请选择品牌'
      }
    },
    watch: {
      'provincePicker.show': function (v) {
        if (v && !this.address.province.id) {
          let picker = this.$refs.provincePickerObject[0]
          if (picker.getSlotValues(0).length === 0) {
            this.getGeography(picker)
          }
        }
      },
      'cityPicker.show': function (v) {
        if (v) {
          if (!this.address.province.id) {
            this.cityPicker.show = false
            this.toast('请先选择开户省')
          }
        }
      },
      'countyPicker.show': function (v) {
        if (v) {
          if (!this.address.city.id) {
            this.countyPicker.show = false
            this.toast('请先选择开户省市')
          }
        }
      },
      'address.province.id': function (newValue, oldValue) {
        if (newValue) {
          this.$nextTick(async () => {
            let picker = this.$refs.provincePickerObject[0]
            if (picker.getSlotValues(0).length === 0 && oldValue === null) {
              await this.getGeography(picker)
              this.setPickerDefaultIndex(picker, newValue, 'id')
              this.address.province.name = (picker.getSlotValues(0).find(s => s['id'] === newValue) ? picker.getSlotValues(0).find(s => s['id'] === newValue).name : '')
              if (!this.address.city.id) {
                await this.getGeography(this.$refs.cityPickerObject[0], newValue, 1)
              }
            } else {
              await this.getGeography(this.$refs.cityPickerObject[0], newValue, 1)
              this.address.city.id = null
              this.address.city.name = ''
              this.address.county.id = null
              this.address.county.name = ''
            }
          })
        }
      },
      'address.city.id': function (newValue, oldValue) {
        if (newValue) {
          this.$nextTick(async () => {
            let picker = this.$refs.cityPickerObject[0]
            if (picker.getSlotValues(0).length === 0 && oldValue === null) {
              await this.getGeography(picker, this.address.province.id, 1)
              this.setPickerDefaultIndex(picker, newValue, 'id')
              this.address.city.name = (picker.getSlotValues(0).find(s => s['id'] === newValue) ? picker.getSlotValues(0).find(s => s['id'] === newValue).name : '')
              if (!this.address.county.id) {
                await this.getGeography(this.$refs.countyPickerObject[0], newValue, 1)
              }
            } else {
              await this.getGeography(this.$refs.countyPickerObject[0], newValue, 2)
              this.address.county.id = null
              this.address.county.name = ''
            }
          })
        }
      },
      'address.county.id': async function (newValue, oldValue) {
        if (newValue) {
          this.$nextTick(async () => {
            let picker = this.$refs.countyPickerObject[0]
            if (picker.getSlotValues(0).length === 0 && oldValue === null) {
              await this.getGeography(picker, this.address.city.id, 2)
              this.setPickerDefaultIndex(picker, newValue, 'id')
              this.address.county.name = (picker.getSlotValues(0).find(s => s['id'] === newValue) ? picker.getSlotValues(0).find(s => s['id'] === newValue).name : '')
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
  .conInf-label{
    color: #666;
  }
  .describe{
    font-size: 14px;
    color: #aaa;
    line-height: 1.5;
    padding-top: 10px;
  }
  .icon-size{
    font-size: 100px;
    color: #ddd;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -38px;
  }
  .fixed_a {
    margin-top: 40px;
    padding-bottom: 70px;
  }

  .fixButton {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #F0EFF5;
    z-index: 1;
  }

  .title {
    color: #888;
    padding: 10px 0;
    font-size: 14px;
  }

  .w_90 {
    width: 90%;
    margin: auto;
  }

  .mt_15 {
    margin-top: 15px;
  }

  .mb_15 {
    margin-bottom: 15px;
  }

  .container {
    background: #fff;
    position: relative;
  }

  .container_c {
    display: table;
    width: 100%;
    table-layout: fixed;
    background: #fff;
  }

  .container:not(:last-child)::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 15px;
    width: calc(100% - 15px);
    height: 1px;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    background: #e5e5e5;
  }

  .content {
    display: table-cell;
  }

  .link {
    display: table-cell;
    position: relative;
    width: 25px;
  }

  .link::after {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 50%;
    position: absolute;
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(45deg);
  }

  .img_container {
    padding: 10px 0 0 15px;
    font-size: 0;
  }

  .pic {
    width: calc(100% - 15px);
    display: inline-block;
    text-align: center;
    margin-bottom: 10px;
  }

  .pic .img {
    width: 100%;
    box-sizing: border-box;
    height: 45vw;
    position: relative;
    background: #fff;
  }

  .geo .img {
    background: url('/static/camera.png');
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .image .img {
    /*background: url('/static/img-bg.png');*/
    background-size: 100%;
    background-repeat: no-repeat;

  }

  .pic img {
    width: 100%;
    height: 100%;
  }

  .pic .title {
    padding: 10px 0;
    color: #888;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .scan_icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 15px;
  }

  .scan_icon img {
    width: 100%;
    height: 100%;
  }

  .confirmation-information {
    border: 0;
  }

  .conInf {
    border-radius: 0;
    letter-spacing: 0;
  }

  .conInf .conInf-con {
    padding: 20px;
  }
.confirmTitle{
  font-size: 20px;
}
  .conInf p {
    line-height: 40px;
    font-size: 18px;
    font-weight: normal;
  }

  .conInf p span:first-child {
    margin-right: 20px;
    float: left;
  }

  .conInf p span:last-child {
    max-width: 70%;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }

  .conInf .btn {
    display: flex;
  }

  .conInf .btn button {
    padding: 10px 0;
    flex: auto;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 0;
    margin-top: -2px;
  }

  .conInf .btn button:first-child {
    border-bottom-left-radius: 10px;
  }

  .conInf .btn button:last-child {
    border-bottom-right-radius: 10px;
  }

  .confirmTitle {
    font-weight: bold;
    margin-bottom: 20px;
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
