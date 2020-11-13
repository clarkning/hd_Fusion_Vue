<template>
  <div class="hbSellProduct SellProduct bg_img_none">
    <div class="header">匹配可售产品</div>
    <div @click="openPicker()"
         v-show="showOrHide.existPurchaseTime && !showOrHide.isHardwareProducts">
      <mt-field label="购机日期:" placeholder="请选择购机日期" type="text" v-model="timePicker.viewDate" :disabled="true"
                :disableClear="true"></mt-field>
    </div>
    <div id="price" class="border_price" v-show="!showOrHide.isHardwareProducts"
         :class="{m_t15: showOrHide.existPurchaseTime && !showOrHide.isHardwareProducts}">
      <mt-field label="购机价格(元):" placeholder="请输入购机价格" type="tel" v-model="purchasePrice"
      ></mt-field>
    </div>
    <div class="overflow_y">
      <div v-if="serviceOptionItem.showList" class="null_data">
        <div class="null"></div>
        <p>暂无符合条件的产品服务</p>
      </div>
      <div v-else class="product_list" id="option">
        <div class="item_container " v-for="item in serviceOptionItem.list">
          <div class="mt-10">
            <div class="item_container">
              <div class="item_p">
                <div class="item_img"><img :src="item.imageUrl"></div>
                <div class="item_content">
                  <p class="productName">{{ item.name }}</p>
                  <p><span class="item_font12 item_color">{{item.unitPrice}}元</span><s class="delete_price">{{item.unitPrice
                    + 100}}元</s>
                  </p>
                </div>
                <label class="pay-label">
                  <input class="pay-radio" type="radio" name="pay-radio" :value="item" v-model="checkValue"
                         checked="true">
                  <span class="pay-radioInput"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @touchmove.prevent v-show="showOrHide.existPurchaseTime && !showOrHide.isHardwareProducts">
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
    <div class="remarks">
      <div class="header" id="lift">用户及设备信息</div>
      <div class="container">
        <mt-field label="姓名" placeholder="请输入客户姓名" v-model="customerName"
                  :disableClear="true"></mt-field>
      </div>
      <div class="container">
        <mt-field label="手机" placeholder="请输入客户手机号码" type="tel" v-model="phoneNumber"
                  :disableClear="true"></mt-field>
      </div>
      <div>
        <div class="container">
          <div class="container_c" :class="{placeholder: isCategoryPlaceholder}">
            <div class="content">
              <mt-cell title="品类" :value="orderFilling.category.value.categoryName"></mt-cell>
            </div>
          </div>
        </div>
        <div @click="goToPageBrand()" class="container">
          <div class="container_c" :class="{placeholder: isBrandPlaceholder}">
            <div class="content" :class="{select: orderFilling.brand.value.brandName === '请选择品牌'}">
              <mt-cell title="品牌" :value="orderFilling.brand.value.brandName"></mt-cell>
            </div>
            <span class="link"></span>
          </div>
        </div>
        <div class="container" v-for="item in expand.otherExpand">
          <div class="geography" v-if="item.contentTypeCode === 5">
            <div @click="provincePicker.show = expand.showLocation"
                 :class="{address: address.province.name !== ''}" class="container">
              <mt-field label="省" placeholder="请选择省" v-model="address.province.name"
                        :disabled="true"></mt-field>
            </div>
            <mt-popup v-model="provincePicker.show" position="bottom" class="upimg-popup" lock-scroll="true"
                      :closeOnClickModal="false">
              <div @touchmove.prevent>
                <div class="popup-top clear_button">
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
                <div class="popup-top clear_button">
                  <mt-button type="primary" size="small" class="popup-button cancel" @click="cityPicker.show = false">
                    取消
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
                <div class="popup-top clear_button">
                  <mt-button type="primary" size="small" class="popup-button cancel"
                             @click="countyPicker.show = false">
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
          <div v-else>
            <mt-field :label="item.name" :placeholder="item.describe" v-model="item.value"
                      :disableClear="true" :disabled="!remarksFlag">
              <span v-if="item.contentTypeCode === 4" @click="scanQRCode(item.id)" class="scan_icon"><img
                src="/static/we-icon.png"/></span>
            </mt-field>
          </div>
        </div>
        <div class="img_container" :class="{'disabled':!remarksFlag}">
          <div class="pic" v-for="item in expand.imageExpand">
            <div class="img" @click="chooseImage(item.id)">
              <img v-show="item.src" :src="item.src">
            </div>
            <p class="title">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="height_40" :class="{height_100: licenceId && remarksFlag}"></div>
    <div class="fixButton footer" :class="{pt_8: licenceId && remarksFlag}">
      <div class="p_r15 clear" v-show="licenceId && remarksFlag">
        <label class="f-l">
          <input class="pay-radio" type="radio" name="licence" value="true" v-model="agreeChecked"
                 @click="inputType()"
                 checked="true">
          <span class="pay-radioInput m-0"></span>
        </label>
        <span class="agreeClause">本人承诺上述信息的真实性，理解并同意<span class="item_button item_color_02"
                                                          @click.stop="goToPageLicence()">《服务条款》</span>的全部内容</span>
      </div>
      <div class="w_90" :class="{mt_5: licenceId && remarksFlag}">
        <span v-if="remarksFlag" class="price_buy">￥{{checkValue.unitPrice}}</span>
        <span v-else class="color_5">--</span>
        <mt-button class="buttonBuy" size="normal" type="primary" @click="submitOrder()">立即购买</mt-button>
      </div>
    </div>
  </div>

</template>

<script>
  import api from '../../../api/index2'
  import moment from 'moment'
  import _ from 'lodash'
  import { loadData, defaultPreHandler, boolPreHandler } from '../../../common/utils'
  import { Toast } from 'mint-ui'
  import wechatlib from 'weixin-js-sdk'

  export default {
    name: 'haoBaiSellProduct',
    data () {
      return {
        customerName: window.localStorage.getItem('customerName') || '',
        phoneNumber: window.localStorage.getItem('phoneNumber') || '',
        loadInfo: true,
        licenceId: '',
        agreeChecked: window.localStorage.getItem('agreeChecked') || '',
        checkValue: {},
        radioFlag: false,
        remarksFlag: false,
        showOrHide: {
          existPurchaseTime: '',
          isHardwareProducts: true
        },
        params: {
          servicePackId: null,
          storeId: null,
          projectId: null
        },
        timePicker: {
          pickerValue: moment().toDate(),
          viewDate: null,
          purchaseTime: null,
          maxDate: moment().toDate()
        },
        purchasePrice: '',
        serviceOptionItem: {
          list: [],
          showList: false
        },
        ifSubmit: true,
        orderId: null,
        orderFilling: {},
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
        }
      }
    },
    async created () {
      this.params.servicePackId = this.$route.query.servicePackId
      this.params.storeId = this.$route.query.storeId
      this.params.projectId = this.$route.query.projectId
      this.orderDetail = window.localStorage.getItem('orderDetail') ? JSON.parse(window.localStorage.getItem('orderDetail')) : {}
      if (_.isEmpty(this.orderDetail)) {
        this.initOrder()
      } else {
        this.orderId = this.orderDetail.orderId
      }
      this.getOrderFillingData()
      this.purchasePrice = this.orderFilling.purchasePrice
      this.timePicker.viewDate = this.orderFilling.viewDate
      this.timePicker.purchaseTime = this.orderFilling.purchaseTime
      await this.loadHardwareProduct()
      this.agreeChecked = window.localStorage.getItem('agreeChecked')
    },
    async mounted () {
      await this.config()
    },
    beforeRouteLeave (to, from, next) {
      this.setOrderDetail()
      this.setOrderFilling()
      next()
    },
    methods: {
      inputType () {
        this.agreeChecked = true
        window.localStorage.setItem('agreeChecked', JSON.stringify(this.agreeChecked))
      },
      setOrderDetail () {
        window.localStorage.setItem('orderDetail', JSON.stringify(this.orderDetail))
      },
      setOrderFilling () {
        let params = {
          viewDate: this.timePicker.viewDate,
          purchasePrice: this.purchasePrice,
          purchaseTime: this.timePicker.purchaseTime
        }
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
        let orderFilling = JSON.parse(JSON.stringify(this.orderFilling))
        Object.assign(orderFilling, params)
        orderFilling.expand = this.expand.expands
        window.localStorage.setItem('orderFilling', JSON.stringify(orderFilling))
      },
      initOrder () {
        let orderDetail = {}
        let orderFilling = {
          category: {
            value: {
              categoryName: '手机',
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
          expand: [{
            'contentTypeCode': 3,
            'describe': '请上传显示IMEI屏幕照片',
            'name': '上传显示IMEI的屏幕照片'
          }, {
            'contentTypeCode': 3,
            'describe': '请上传购机发票照片',
            'name': '上传购机发票照片'
          }, {
            'contentTypeCode': 0,
            'describe': '请输入手机型号',
            'name': '手机型号'
          }, {
            'contentTypeCode': 0,
            'describe': '请输入IMEI',
            'name': 'IMEI'
          }, {
            'contentTypeCode': 0,
            'describe': '请输入发票编号',
            'name': '发票编号'
          }],
          service: {
            serviceItemName: null,
            unitPrice: null,
            serviceOptionItemId: null,
            servicePackId: null
          },
          viewDate: null,
          purchaseTime: null,
          purchasePrice: ''
        }
        window.localStorage.setItem('orderDetail', JSON.stringify(orderDetail))
        window.localStorage.setItem('orderFilling', JSON.stringify(orderFilling))
      },
      async amendOrder (serviceOptionItemId) {
        this.initOrder()
        this.orderDetail = {}
        this.orderFilling = JSON.parse(window.localStorage.getItem('orderFilling'))
        let param = {
          purchasePrice: this.purchasePrice,
          purchaseTime: this.timePicker.viewDate,
          serviceOptionItemId
        }
        await loadData(() => {
          return api.reviseOrder(this.orderId, param)
        }, () => {}, defaultPreHandler, false)
      },
      async getOrderId (serviceOptionItemId) {
        if (this.orderId === null) {
          let data = await this.saveOrder(serviceOptionItemId)
          this.orderId = data.orderId
        } else {
          this.loadInfo = _.isEmpty(this.orderDetail) ? true : serviceOptionItemId !== this.orderDetail.orderItemDtos[0].serviceOptionItem.serviceOptionItemId
          if (this.loadInfo) {
            await this.amendOrder(serviceOptionItemId)
          }
        }
        await loadData(() => { return this.load() })
      },
      addTitle () {
        let len = document.getElementsByClassName('datetime_title').length
        if (len === 1) return
        let element = document.getElementsByClassName('picker-toolbar')[0]
        element.insertAdjacentHTML('beforeBegin', '<div class="datetime_title">请选择购机日期</div>')
      },
      async loadHardwareProduct () {
        await loadData(() => {
          return api.getServicePack(this.params.servicePackId)
        }, specificInformation => {
          this.showOrHide.existPurchaseTime = specificInformation.existPurchaseTime
          this.showOrHide.isHardwareProducts = specificInformation.isHardwareProducts
          if (this.showOrHide.isHardwareProducts === true) {
            this.getServiceOptionItems()
          }
        }, defaultPreHandler, true)
      },
      executeLoadingProducts: _.debounce(async function () {
        if ((this.timePicker.purchaseTime && this.purchasePrice) || (!this.showOrHide.isHardwareProducts && !this.showOrHide.existPurchaseTime)) {
          await this.getServiceOptionItems()
          if (this.purchasePrice === '') {
            this.serviceOptionItem.list = []
            this.serviceOptionItem.showList = false
          }
        } else if (this.orderId) {
          this.amendOrder(this.checkValue.serviceOptionItemId)
          await loadData(() => {
            return this.load()
          })
        } else {
          this.serviceOptionItem.list = []
          this.serviceOptionItem.showList = false
        }
      }, 300),
      openPicker () {
        this.addTitle()
        if (this.timePicker.purchaseTime) {
          this.timePicker.pickerValue = moment(this.timePicker.purchaseTime).toDate()
        }
        this.$refs.picker.open()
      },
      setDate (data) {
        this.timePicker.viewDate = moment(data).format('YYYY 年 MM 月 DD 日')
        this.timePicker.purchaseTime = moment(data).format('YYYY/MM/DD')
      },
      async getServiceOptionItems () {
        let re = /^[0-9]+(.[0-9]{1,2})?$/
        if (re.test(this.purchasePrice) || !this.purchasePrice) {
          let param = {
            servicePackId: this.params.servicePackId,
            purchasePrice: this.purchasePrice,
            purchaseTime: this.timePicker.purchaseTime
          }
          await loadData(() => {
            return api.getServiceOptionItems(param)
          }, async (data) => {
            _.forEach(data, (item) => {
              if (item.salesTimes === 0) {
                item.salesTimes = 1
              }
              let sale = item.salesBaseValue + (item.salesCount * item.salesTimes)
              item.sale = _.padStart(sale.toString(), 6, '0')
            })
            if (this.purchasePrice === param.purchasePrice) {
              this.serviceOptionItem.list = data
              this.remarksFlag = data.length > 0 && !_.isEmpty(this.checkValue)
              this.expand.showLocation = this.remarksFlag
              if (data.length === 0) {
                this.initOrder()
                this.orderDetail = {}
                this.orderFilling = JSON.parse(window.localStorage.getItem('orderFilling'))
              } else if (data.length === 1) {
                this.checkValue = data[0]
              }
              this.serviceOptionItem.showList = this.serviceOptionItem.list.length === 0
            } else {
              await this.getServiceOptionItems()
            }
          }, defaultPreHandler)
          if (!_.isEmpty(this.orderDetail)) {
            this.checkValue = _.find(this.serviceOptionItem.list, (item) => {
              return item.serviceOptionItemId === this.orderDetail.orderItemDtos[0].serviceOptionItem.serviceOptionItemId
            })
          }
        }
      },
      handleConfirm (data) {
        this.setDate(data)
        document.getElementById('price').getElementsByTagName('input')[0].focus()
      },
      goToPageLicence () {
        this.$router.push({
          name: 'Licence',
          query: {
            licenceId: this.licenceId
          }
        })
      },
      async saveOrder (serviceOptionItemId) {
        let response
        let params = {
          storeId: this.params.storeId,
          projectId: this.params.projectId,
          personId: this.$store.state.person.personId,
          purchasePrice: this.purchasePrice,
          purchaseTime: this.timePicker.purchaseTime,
          serviceOptionItemId
        }
        await
          loadData(() => {
            return api.getSaveOrder(params)
          }, (data) => {
            response = data
          }, defaultPreHandler)
        return response
      },
      async load () {
        await this.getOrderFillingData()
        await this.getCategoryList()
        await this.getBrandList()
        await this.getExpand()
      },
      async config () {
        let url = location.href.split('#')[0]
        let appId = window.localStorage.getItem('agentId')
        await this.$initWxConfig(url, ['chooseImage', 'getLocalImgData', 'uploadImage', 'scanQRCode', 'getLocation'], appId)
      },
      async loadOrderDetail () {
        if (this.orderId) {
          await loadData(() => { return api.getOrderDetail(this.orderId) },
            (data) => { this.orderDetail = data },
            defaultPreHandler,
            true
          )
        }
      },
      async getOrderFillingData () {
        this.orderFilling = JSON.parse(window.localStorage.getItem('orderFilling'))
        if (_.isEmpty(this.orderDetail)) {
          await this.loadOrderDetail()
        } else {
          this.orderFilling.service = {
            serviceItemName: this.orderDetail.orderItemDtos[0].serviceOptionItem.name,
            unitPrice: this.orderDetail.orderItemDtos[0].serviceOptionItem.unitPrice,
            serviceOptionItemId: this.orderDetail.orderItemDtos[0].serviceOptionItem.serviceOptionItemId,
            servicePackId: this.orderDetail.orderItemDtos[0].servicePackDto.servicePackId
          }
          this.orderFilling.purchaseTime = this.orderDetail.orderItemDtos[0].customerDeviceDto.purchaseTime
          this.orderFilling.purchasePrice = this.orderDetail.orderItemDtos[0].customerDeviceDto.purchasePrice
        }
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
        if (!this.loadInfo) return
        await loadData(() => {
          return api.getCategories(this.orderId)
        }, data => {
          this.orderFilling.category.value = data[0]
          this.orderFilling.category.isJumpingCategory = false
          this.orderFilling.category.categoryList = data
        }, defaultPreHandler, true)
      },
      async getBrandList () {
        if (this.loadInfo) {
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
        }
        if (this.orderFilling.brand.brandList.length === 1) {
          this.orderFilling.brand.value = this.orderFilling.brand.brandList[0]
          this.orderFilling.brand.isJumpingBrand = false
        } else {
          this.orderFilling.brand.isJumpingBrand = true
        }
      },
      async getExpand () {
        if (this.loadInfo) {
          let params = {
            servicePackId: this.$route.query.servicePackId,
            categoryId: this.orderFilling.category.value.categoryId
          }
          await loadData(() => { return api.getObjectExpands(params) },
            (data) => { this.expand.expands = data },
            defaultPreHandler,
            true
          )
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
        if (address.length > 0 && !address[0].value) {
          await this.fixPosition()
        }
      },
      async fixPosition () {
        let u = navigator.userAgent
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isIOS) {
          let vue = this
          wechatlib.getLocation({
            type: 'wgs84',
            success: async function (res) {
              await loadData(() => {
                return api.geocode(res.latitude, res.longitude, 3)
              }, value => {
                if (value) {
                  vue.address.province.id = value.provinceId
                  vue.address.city.id = value.cityId
                  vue.address.county.id = value.districtId
                  vue.address.desc = value.street
                }
                vue.expand.showLocation = true
              }, defaultPreHandler, true)
            },
            fail: function () {
              vue.toast('获取不到位置信息')
              vue.expand.showLocation = true
            },
            cancel: function () {
              vue.expand.showLocation = true
            }
          })
        } else {
          if (navigator.geolocation) {
            let option = {
              timeout: 3000,
              maximumAge: 0
            }
            navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, option)
          }
        }
      },
      async geoSuccess (res) {
        await loadData(() => {
          return api.geocode(res.coords.latitude, res.coords.longitude, 3)
        }, value => {
          if (value) {
            this.address.province.id = value.provinceId
            this.address.city.id = value.cityId
            this.address.county.id = value.districtId
            this.address.desc = value.street
          }
        }, defaultPreHandler, true)
        this.expand.showLocation = true
      },
      geoError (error) {
        switch (error.code) {
          // case error.PERMISSION_DENIED:
          //   this.toast('用户拒绝对获取地理位置的请求')
          //   break
          case error.POSITION_UNAVAILABLE:
            this.toast('获取不到位置信息')
            break
          case error.TIMEOUT:
            this.toast('获取不到位置信息')
            break
          case error.UNKNOWN_ERROR:
            this.toast('未知错误')
            break
        }
        this.expand.showLocation = true
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
      goToPageBrand () {
        if (this.orderFilling.category.value.categoryId && this.orderFilling.brand.isJumpingBrand && this.remarksFlag) {
          this.$router.push({
            name: 'hbSelectBrand',
            query: {
              category: this.orderFilling.category.value.categoryId,
              orderId: this.orderId,
              projectId: this.orderDetail.projectId
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
      chooseImage (id) {
        let vue = this
        this.expand.submitImage = true
        let index = _.findIndex(this.expand.imageExpand, {id})
        wechatlib.chooseImage({
          count: 1,
          sizeType: ['original'],
          sourceType: ['album', 'camera'],
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
        if (this.showOrHide.existPurchaseTime && !this.showOrHide.isHardwareProducts && !this.timePicker.viewDate) {
          this.toast('请选择购机日期')
        } else if (!this.showOrHide.isHardwareProducts && !this.purchasePrice) {
          this.toast('请输入购机金额')
        } else if (_.isEmpty(this.checkValue)) {
          this.toast('请选择服务产品')
        } else if (!nameRe.test(this.customerName)) {
          this.toast('请输入正确的客户姓名')
        } else if (!phoneRe.test(this.phoneNumber)) {
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
        } else if (!this.agreeChecked) {
          this.toast('请勾选服务条款')
        } else if (expandsState) {
          let message
          if (expandsState.regexMsg === '') {
            message = expandsState.name + '不可为空'
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
        this.setFillingData()
        await loadData(() => {
          return api.postOrder(this.data)
        }, (res) => {
          if (res) {
            this.initOrder()
            this.$router.push({
              name: 'BaiPay',
              query: {
                orderId: this.orderDetail.orderId
              }
            })
          } else {
            this.ifSubmit = true
          }
        }, boolPreHandler)
      },
      async submitOrder () {
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
            await loadData(() => { return this.postData() })
          }
        }
        window.localStorage.removeItem('agreeChecked')
      },
      setFillingData () {
        this.data.orderId = this.orderId
        this.data.brandId = this.orderFilling.brand.value.brandId
        this.data.categoryId = this.orderFilling.category.value.categoryId
        this.data.customerName = this.customerName
        this.data.customerPhone = this.phoneNumber
        this.data.purchasePrice = this.orderFilling.purchasePrice || ''
        this.data.serviceOptionItemId = this.orderFilling.service.serviceOptionItemId
        let expandData = []
        let remark = ''
        _.forEach(this.expand.expands, (expand) => {
          let item = {
            customerDeviceExpandId: expand.id,
            customerDeviceExpandValue: expand.value || ''
          }
          if (expand.contentTypeCode === 1) {
            item.customerDeviceExpandValue = this.orderFilling.purchaseTime
          }
          expandData.push(item)
          let re = new RegExp('备注')
          if (re.test(expand.name)) {
            remark = expand.value || ''
          }
        })
        this.data.expandData = expandData
        this.data.remark = remark || ''
      }
    },
    computed: {
      listScroll () {
        return this.showOrHide.existPurchaseTime && !this.showOrHide.isHardwareProducts
      },
      listTimeScroll () {
        return !this.showOrHide.isHardwareProducts && !this.showOrHide.existPurchaseTime
      },
      isCategoryPlaceholder: function () {
        return this.orderFilling.category.value.categoryName === '请选择品类'
      },
      isBrandPlaceholder: function () {
        return this.orderFilling.brand.value.brandName === '请选择品牌'
      }
    },
    watch: {
      'customerName': function (name) {
        window.localStorage.setItem('customerName', name)
      },
      'phoneNumber': function (phoneNumber) {
        window.localStorage.setItem('phoneNumber', phoneNumber)
      },
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
      },
      'checkValue': function (v) {
        if (_.isEmpty(v)) return
        this.licenceId = v.licenceId
        this.remarksFlag = !!v
        this.getOrderId(v.serviceOptionItemId)
      },
      'timePicker.purchaseTime': 'executeLoadingProducts',
      'purchasePrice': 'executeLoadingProducts'
    }
  }
</script>

<style scoped>
  .height_40 {
    height: 40px;
  }

  .height_100 {
    height: 100px;
  }

  .header {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .disabled {
    pointer-events: none;
    color: red
  }

  .mint-popup-bottom {
    width: 100%;
  }

  .mint-field-core {
    background: #fff;
  }

  .productName {
    font-size: 14px;
  }

  .delete_price {
    color: #888;
    margin-left: 5px;
  }

  .bg_none {
    background: none;
  }

  .item_font12 {
    font-size: 14px;
  }

  .price_buy {
    margin-left: 29px;
    font-size: 18px;
    vertical-align: middle;
    margin-top: 5px;
    display: inline-block;
    color: #F15151;
  }

  .color_5 {
    color: #F15151;
    display: inline-block;
    height: 41px;
    line-height: 41px;
  }

  .item_container {
    background: #fff;
    font-size: 12px;
  }

  .item_container:not(:last-child)::after {
    content: " ";
    display: block;
    width: calc(100% - 15px);
    margin-left: 15px;
    height: 1px;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    background: #e5e5e5;
  }

  .item_p {
    padding: 10px 0 10px 15px;
    display: table;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
  }

  .item_color {
    color: #F15151;
  }

  .item_color_02 {
    color: #3396E4;
  }

  .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
    width: 62px;
    height: 62px;
  }

  .item_img img {
    width: 100%;
    height: 100%;
  }

  .item_content {
    line-height: 2;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
    width: 70%;
  }

  .border_price {
    border-top: 1px solid #e5e5e5;
  }

  .product_list {
    margin-top: 10px;
  }

  .pay-label {
    display: inline-block;
    float: right;
    width: 30px;
    height: 30px;
    padding-top: 17px;
    padding-left: 20px;
  }

  .pay-radio {
    display: none;
  }

  .pay-radioInput {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 100%;
    display: inline-block;
    height: 16px;
    margin-right: 10px;
    margin-top: -1px;
    vertical-align: middle;
    width: 16px;
    line-height: 1
  }

  .pay-radio:checked + .pay-radioInput:after, .pay-radio-checked {
    background-color: #3396E4;
    border-radius: 100%;
    content: "";
    display: inline-block;
    height: 12px;
    margin: 2px;
    width: 12px
  }

  .mt-10 {
    margin-top: 0;
  }

  .item_button {
    font-size: 14px;
    padding: 0;
    background: #fff;
    border: none;
    outline: none;
    word-break: normal;
    width: auto;
    word-wrap: break-word;
    overflow: hidden;
  }

  .overflow_y {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .timePicker {
    position: fixed;
    bottom: 0;
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

  .p_r15 {
    padding-right: 15px;
  }

  .fixButton {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    z-index: 1;
    padding-left: 15px;
  }

  .pt_8 {
    padding-top: 8px;
  }

  .buttonBuy {
    width: 60%;
    float: right;
    border-radius: 0
  }

  .agreeClause {
    font-size: 14px;
    margin-left: 5px;
    line-height: 1.5;
    width: calc(100% - 24px);
    float: right;
  }

  .title {
    color: #888;
    padding: 10px 0;
    font-size: 14px;
  }

  .mt_5 {
    margin-top: 5px;
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
    width: 29%;
    display: inline-block;
    text-align: center;
    margin-right: calc((13% - 15px) / 3);
  }

  .pic .img {
    width: 100%;
    box-sizing: border-box;
    height: 28vw;
    background: url('/static/img-bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    border: 1px solid #f4f3f3;
  }

  .pic img {
    width: 100%;
    height: 100%;
  }

  .pic .title {
    font-size: 12px;
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

  .clear_button :after {
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

  .m-0 {
    margin-right: 0;
    margin-top: 0;
  }

  @media (max-height: 400px) {
    .footer {
      display: none;
    }
  }
</style>
