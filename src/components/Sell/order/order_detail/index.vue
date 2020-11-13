<template>
  <div class="OrderDetail" v-show="showOrderDetail">
    <orderDetailInfo :basicOrderDetailInfo="basicOrderDetailInfo"
                     :expand="expand"
                     :address="address">
    </orderDetailInfo>

    <freebiesInfo :freebiesInfo="freebiesInfo">
    </freebiesInfo>

    <div @click="redirectToCustomerService" class="applyBtn" v-if="orderDetail.baseServiceContractdId">
      <mt-button type="primary" size="large">服务申请</mt-button>
    </div>

    <div class="qrcode" v-if="orderDetail.orderStatusStr === '已完成'">
      <p>请用户微信扫描下方二维码，绑定手机即刻领取电子合同凭证。</p>
      <div class="img">
        <img :src="scan"/>
      </div>
    </div>

    <div class="button" v-if="orderDetail.orderStatusStr === '已支付,待录入'" @click="redirectToFilling()">
      <mt-button type="primary" size="large">去录单,领佣金</mt-button>
    </div>

    <div class="button" v-if="orderDetail.orderStatusStr === '未支付'" @click="redirectToFilling()">
      <mt-button type="primary" size="large">去提交</mt-button>
    </div>

  </div>
</template>
<script>
import api from '../../../../api/index2'
import moment from 'moment'
import { loadData, defaultPreHandler } from '../../../../common/utils'
import { createNamespacedHelpers } from 'vuex'
import _ from 'lodash'
import orderDetailInfo from './order_detail_info'
import freebiesInfo from './freebies _info'
import { SaleMode } from '../../../../common/enum/fusion_resource'

const {mapMutations} = createNamespacedHelpers('order')
export default {
  name: 'OrderDetail',
  components: {
    orderDetailInfo,
    freebiesInfo
  },
  data () {
    return {
      showOrderDetail: false,
      customerServicesList: [],
      orderDetail: {},
      index: null,
      orderId: null,
      expand: {
        imageExpand: [],
        otherExpand: [],
        expands: []
      },
      address: {
        desc: '',
        province: {
          id: null,
          name: ''
        },
        city: {
          id: null,
          name: ''
        },
        county: {
          id: null,
          name: ''
        }
      },
      electronicContract: {
        flag: false
      },
      electronicInvoice: {
        flag: false,
        id: null
      },
      ContractAppliedRequest: [],
      scan: ''
    }
  },
  async created () {
    this.orderId = this.$route.query.orderId
    await this.initOrderDetail()
    await this.getScan()
    await this.getExpands()
    this.showOrderDetail = true
    window.scrollTo(0, 1)
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'MyOrder' && this.isPreview) {
      this.isPreview = false
      next(false)
    } else {
      next()
    }
  },
  methods: {
    ...mapMutations(['removeOrderFilling']),
    async config () {
      let url = location.href.split('#')[0]
      await this.$initWxConfig(url, ['previewFile'])
    },
    logisticsOrderTrack: function (customerServiceDetail) {
      window.sessionStorage.setItem('customerServiceDetail', JSON.stringify(customerServiceDetail))
      this.$router.push({
        name: 'LogisticsOrderTrack'
      })
    },
    async initOrderDetail () {
      await loadData(() => {
        return api.getOrderDetail(this.orderId)
      }, (data) => {
        _.forEach(data.orderItemDtos, item => {
          if (item.customerDeviceDto.purchaseTime) {
            item.customerDeviceDto.purchaseTime = moment(item.customerDeviceDto.purchaseTime).format('YYYY-MM-DD')
          }
        })
        data.orderStatusStr = this.orderStatusStr(data.orderStatus, data.paymentDto.paymentStatus, data.paymentDto.payType)
        this.orderDetail = data
      }, defaultPreHandler)
    },
    async getExpands () {
      let orderItemsFilteredBySaleMode = _.filter(this.orderDetail.orderItemDtos, item => {
        return item.serviceOptionItem.saleMode === SaleMode.零售
      })
      if (orderItemsFilteredBySaleMode[0].customerDeviceDto.productCategoriesId) {
        let param = {
          orderId: this.orderId,
          deviceId: orderItemsFilteredBySaleMode[0].customerDeviceDto.id
        }
        await loadData(() => {
          return api.getDeviceExpands(param)
        }, data => {
          this.expand.expands = data
        }, defaultPreHandler, true)
        this.expand.otherExpand = _.filter(this.expand.expands, function (item) {
          return item.objectExpandContentType !== 1 && item.objectExpandContentType !== 3
        })

        this.expand.imageExpand = _.filter(this.expand.expands, {objectExpandContentType: 3})
        let address = _.filter(this.expand.expands, {objectExpandContentType: 5})
        if (address.length > 0) {
          let value = JSON.parse(address[0].value)
          this.address.desc = value.addressDescription
          this.address.city.name = value.city
          this.address.city.id = value.cityId
          this.address.county.name = value.county
          this.address.county.id = value.countyId
          this.address.province.name = value.province
          this.address.province.id = value.provinceId
        }
      }
    },
    async getScan () {
      if (this.orderDetail.orderStatusStr === '已完成') {
        let partnerId = this.orderDetail.partnerId
        await loadData(() => {
          return api.getPartner(partnerId)
        }, data => {
          let scan = data
          this.scan = scan.qrCode
        }, defaultPreHandler, true)
      }
    },
    orderStatusStr (orderCode, payCode, payMethod) {
      if (payCode === 30 || orderCode === 100) {
        return '已退款'
      } else if (payCode === 50 || orderCode === 40) {
        return '已取消'
      } else {
        let arr = [orderCode, payCode, payMethod]
        let status = arr.join('')
        switch (status) {
          case '110200':
            return '已完成'
          case '60200':
            return '已完成'
          case '110201':
            return '已完成'
          case '60201':
            return '已完成'
          case '60202':
            return '已完成'
          case '110202':
            return '已完成'
          case '20100':
            return '已支付,待录入'
          case '20202':
            return '已支付,待录入'
          case '20201':
            return '已支付,待录入'
          case '21100':
            return '未支付'
          // case '20102':
          //   return '未支付'
          // case '20101':
          //   return '未支付'
          // case '2010':
          //   return '未支付'
          default:
            return ''
        }
      }
    },
    redirectToFilling () {
      this.removeOrderFilling()
      this.$router.push({
        name: 'OrderFilling',
        query: {
          orderId: this.orderId
        }
      })
    },
    redirectToCustomerService () {
      this.$router.push({
        path: '/customerService',
        query: {
          serviceContractId: this.orderDetail.baseServiceContractdId
        }
      })
    }
  },
  computed: {
    basicOrderDetailInfo () {
      let self = this
      if (self.orderDetail.orderItemDtos.length) {
        let orderDetail = _.cloneDeep(self.orderDetail)
        let orderItemsFilteredBySaleMode = _.filter(orderDetail.orderItemDtos, item => {
          return item.serviceOptionItem.saleMode === SaleMode.零售
        })
        orderDetail.orderItemDtos = orderItemsFilteredBySaleMode
        return orderDetail
      }
    },
    freebiesInfo () {
      let self = this
      if (self.orderDetail.orderItemDtos.length) {
        let orderDetail = _.cloneDeep(self.orderDetail)
        let orderItemsFilteredBySaleMode = _.filter(orderDetail.orderItemDtos, item => {
          return item.serviceOptionItem.saleMode === SaleMode.赠送
        })
        return orderItemsFilteredBySaleMode
      }
    }

  }
}
</script>
<style scoped>
  .button {
    width: 90%;
    margin: 15px auto;
  }

  .qrcode {
    background: #fff;
    margin-top: 15px;
    padding-bottom: 40px;
  }

  .qrcode p {
    color: #888;
    font-size: 14px;
    line-height: 1.5rem;
    padding: 15px 15px 0;
    text-indent: 28px;
  }

  .qrcode .img {
    width: 50%;
    margin: auto;
    padding: 10px 0;
  }

  .qrcode .img img {
    width: 100%;
    text-align: center;
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

  .popup_color3 {
    color: #333;
  }

  .popup_color8 {
    line-height: 1;
    color: #888;
    margin-top: 6px;
  }

  .applyBtn {
    width: 94%;
    margin: 10px auto;
  }
</style>
