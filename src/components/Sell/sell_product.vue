<template>
  <div class="SellProduct">
    <sellProgress></sellProgress>
    <div class="m_t" @touchmove.stop>
      <div @click="openPicker()" class="bg_img_none"
           v-show="showOrHide.existPurchaseTime && !showOrHide.isHardwareProducts">
        <mt-field label="购机日期:" placeholder="请输入购机日期" type="text" v-model="timePicker.viewDate" :readonly="true"
                  :disableClear="true"></mt-field>
      </div>
      <div id="price" class="bg_img_none" v-show="!showOrHide.isHardwareProducts"
           :class="{m_t15: showOrHide.existPurchaseTime && !showOrHide.isHardwareProducts}">
        <mt-field label="购机价格(元):" placeholder="请输入购机价格" type="tel" v-model="purchasePrice"
        ></mt-field>
      </div>
      <div class="overflow_y"
           :class="{'List': listScroll, 'listTime': listTimeScroll, 'm_t15': (listScroll || listTimeScroll)}">
        <div v-if="serviceOptionItem.showList" class="null_data">
          <div class="null"></div>
          <p>暂无符合条件的产品服务</p>
        </div>

        <div v-else>
          <div class="item_container" v-for="item in serviceOptionItem.list"
               @click="goToPagePayList(item.serviceOptionItemId, item.licenceId)">
            <div class="item_p">
              <div class="item_img"><img :src="item.imageUrl"></div>
              <div class="item_content">
                <p class="item_over popup_color3 font-size16">{{ item.name }}</p>
                <p class="popup_color8">累计销售 {{item.sale}} 份</p>
                <button class="item_button item_color"
                        @click.stop="redirectToProductInfo(params.servicePackId, item.licenceId, 'instruction', item.serviceOptionItemId)">产品介绍
                </button>
                <button class="item_button item_color"
                        @click.stop="redirectToProductInfo(params.servicePackId, item.licenceId, 'service', item.serviceOptionItemId)">
                  服务条款
                </button>
              </div>
              <div class="item_price font-size16">{{item.unitPrice}}元</div>
              <div class="item_link"></div>
            </div>
            <div class="item_coupon"
                 @click.stop="redirectToProductInfo(params.servicePackId, item.licenceId, 'couponList', item.serviceOptionItemId)">
              <productCouponBriefs :freebies="item.freebies"></productCouponBriefs>
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
  </div>
</template>
<script>
  import api from '../../api/index2'
  import moment from 'moment'
  import sellProgress from '../public/progress.vue'
  import productCouponBriefs from './components/product_coupon_briefs'
  import _ from 'lodash'
  import {loadData, defaultPreHandler} from '../../common/utils'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapMutations} = createNamespacedHelpers('order')

  export default {
    name: 'SellProduct',
    components: {
      sellProgress,
      productCouponBriefs
    },
    data () {
      return {
        sellTips: true,
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
        pushName: this.$route.meta.pushName
      }
    },
    async created () {
      this.params.servicePackId = this.$route.query.servicePackId
      this.params.storeId = this.$route.query.storeId
      this.params.projectId = this.$route.query.projectId
      this.timePicker.viewDate = this.storeOrderFilling.viewDate
      this.purchasePrice = this.storeOrderFilling.purchasePrice
      this.timePicker.purchaseTime = this.storeOrderFilling.purchaseTime
      await this.loadHardwareProduct()
    },
    async mounted () {
      this.addTitle()
      if (!this.timePicker.viewDate) {
        this.openPicker()
      }
    },
    beforeRouteLeave (to, from, next) {
      let params = {
        viewDate: this.timePicker.viewDate,
        purchasePrice: this.purchasePrice,
        purchaseTime: this.timePicker.purchaseTime
      }
      this.setSellProduct(params)
      next()
    },
    methods: {
      ...mapMutations(['setSellProduct']),
      addTitle () {
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
            this.sellTips = true
            this.serviceOptionItem.list = []
            this.serviceOptionItem.showList = false
          }
        } else {
          this.sellTips = true
          this.serviceOptionItem.list = []
          this.serviceOptionItem.showList = false
        }
      }, 300),
      openPicker () {
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
              if (this.serviceOptionItem.list.length > 0) {
                this.sellTips = false
              }
              this.serviceOptionItem.showList = this.serviceOptionItem.list.length === 0
              if (this.serviceOptionItem.showList) {
                this.sellTips = false
              }
            } else {
              await this.getServiceOptionItems()
            }
          }, defaultPreHandler)
        }
      },
      handleConfirm (data) {
        this.setDate(data)
        document.getElementById('price').getElementsByTagName('input')[0].focus()
      },
      redirectToProductInfo (servicePackId, licenceId, service, serviceOptionItemId) {
        let query = {
          servicePackId,
          licenceId,
          serviceOptionItemId
        }
        if (service) {
          query.service = service
        }
        this.$router.push({
          name: 'ProductInfo',
          query
        })
      },
      async goToPagePayList (serviceOptionItemId) {
        let data = await this.saveOrder(serviceOptionItemId)
        if (data) {
          this.$router.push({
            name: this.pushName,
            query: {
              orderId: data.orderId
            }
          })
        }
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
        await loadData(() => {
          return api.getSaveOrder(params)
        }, (data) => {
          response = data
        }, defaultPreHandler)
        return response
      }
    },
    computed: {
      ...mapState({
        storeOrderFilling: state => state.orderFilling
      }),
      listScroll () {
        return this.showOrHide.existPurchaseTime && !this.showOrHide.isHardwareProducts
      },
      listTimeScroll () {
        return !this.showOrHide.isHardwareProducts && !this.showOrHide.existPurchaseTime
      }
    },
    watch: {
      'timePicker.purchaseTime': 'executeLoadingProducts',
      'purchasePrice': 'executeLoadingProducts'
    }
  }
</script>
<style scoped>
  .sell-tips {
    padding: 10px;
    text-align: center;
    margin: 10%;
    background: #f9f9f9;
    font-size: 14px;
    color: #666;
  }

  .m_t15 {
    margin-top: 15px;
  }

  .m_t {
    margin-top: 40px;
    height: calc(100vh - 42px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .popup_color3 {
    color: #333;
  }

  .popup_color8 {
    color: #888;
  }

  .item_container {
    background: #fff;
    font-size: 14px;
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
    color: #888;
  }

  .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
    width: 70px;
    height: 70px;
  }

  .item_img img {
    width: 100%;
    height: 100%;
  }

  .item_content {
    line-height:1.8;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
  }

  .item_price {
    display: table-cell;
    vertical-align: middle;
    text-align: right;
    width: 25%;
  }

  .item_over {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item_button {
    background: #fff;
    padding: 2px 4px;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
  }

  .item_link {
    display: table-cell;
    position: relative;
    width: 25px;
  }

  .item_link::after {
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

  .item_font14 {
    font-size: 16px;
  }
  .font-size16 {
    font-size: 16px;
  }

  .overflow_y {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .listTime {
    height: calc(100vh - 100px);
  }

  .List {
    height: calc(100vh - 155px);
  }

  .timePicker {
    position: fixed;
    bottom: 0;
  }

</style>
