<template>
  <div class="order-detail-info" v-if="orderDetail">
    <div class="title bg_img_none">
      <mt-cell><p slot="title">产品信息</p></mt-cell>
    </div>
    <div class="item_p"
         @click="redirectToProduct(orderDetail.orderItemDtos[0].servicePackDto.servicePackId, orderDetail.orderItemDtos[0].serviceOptionItem.licenceId,orderDetail.orderItemDtos[0].serviceOptionItem.serviceOptionItemId)">
      <div class="item_img"><img :src="orderDetail.orderItemDtos[0].servicePackDto.fileUrl"></div>
      <div class="item_content">
        <p class="item_over popup_color3">{{ orderDetail.orderItemDtos[0].servicePackDto.title }}</p>
        <p class="popup_color8" v-html="orderDetail.orderItemDtos[0].servicePackDto.summary"></p>
      </div>
      <div class="item_link"></div>
    </div>

    <div class="title">
      <mt-cell><p slot="title">客户信息</p></mt-cell>
    </div>
    <div class="content bg_img_none">
      <div class="container">
        <mt-cell title="客户姓名" :value="orderDetail.customerDto.customerName"></mt-cell>
      </div>
      <div class="container">
        <mt-cell title="联系电话" :value="orderDetail.customerDto.phoneNumber"></mt-cell>
      </div>
    </div>

    <div class="title">
      <mt-cell><p slot="title">设备信息</p></mt-cell>
    </div>
    <div class="content bg_img_none">
      <div class="container">
        <mt-cell title="品类"
                 :value="orderDetail.orderItemDtos[0].customerDeviceDto.productCategoriesName"></mt-cell>
      </div>
      <div class="container">
        <mt-cell title="品牌" :value="orderDetail.orderItemDtos[0].customerDeviceDto.brandName"></mt-cell>
      </div>
      <div class="container" v-for="item in expand.otherExpand" :key="item.id">
        <div class="container" v-if="item.objectExpandContentType !== 5">
          <mt-cell :title="item.text" :key="item.id">
            <span class="wrap">{{item.value || ''}}</span>
          </mt-cell>
        </div>
        <div v-else>
          <div class="container">
            <mt-cell title="省" :value="address.province.name"></mt-cell>
          </div>
          <div class="container">
            <mt-cell title="市" :value="address.city.name"></mt-cell>
          </div>
          <div class="container">
            <mt-cell title="县" :value="address.county.name"></mt-cell>
          </div>
          <div class="container">
            <mt-cell title="详细地址" :value="address.desc"></mt-cell>
          </div>
        </div>
      </div>
      <div class="container">
        <mt-cell v-if="orderDetail.orderItemDtos[0].customerDeviceDto.purchasePrice" title="购机价格"
                 :value="'￥' + orderDetail.orderItemDtos[0].customerDeviceDto.purchasePrice"></mt-cell>
      </div>
      <div class="container">
        <mt-cell v-if="orderDetail.orderItemDtos[0].customerDeviceDto.purchaseTime" title="购机时间"
                 :value="orderDetail.orderItemDtos[0].customerDeviceDto.purchaseTime"></mt-cell>
      </div>
    </div>
    <div class="equipment_pic content" v-if="expand.imageExpand.length > 0">
      <div class="pic" v-for="item in expand.imageExpand" :key="item.id">
        <div @click="previewImage(item.value)" v-if="item.value && item.value !== ''" class="img"
             :style="{background: 'url(' + item.value + ') no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}"></div>
        <div v-else class="text">未上传</div>
        <div class="nameplate">{{item.text}}</div>
      </div>
    </div>

    <div class="title">
      <mt-cell><p slot="title">支付信息</p></mt-cell>
    </div>
    <div class="content">
      <mt-cell title="订单编号" :value="orderDetail.orderCode"></mt-cell>
      <mt-cell title="产品" :value="orderDetail.orderItemDtos[0].serviceOptionItem.name"></mt-cell>
      <mt-cell title="支付金额" :value="'￥' + orderDetail.paymentDto.payAmount"></mt-cell>
      <mt-cell title="支付状态">
        <span
          :class="payStatusColor(orderDetail.orderStatusStr)">{{orderDetail.orderStatusStr}}</span>
      </mt-cell>
      <elContractInvoice :contractId="orderDetail.baseServiceContractdId"></elContractInvoice>
    </div>
  </div>
</template>

<script>
import elContractInvoice from './el_contract_invoice'
import wx from 'weixin-js-sdk'
import _ from 'lodash'

export default {
  name: 'order_detail_info',
  components: {elContractInvoice},
  props: {
    basicOrderDetailInfo: Object,
    expand: Object,
    address: Object
  },
  data () {
    return {
      orderDetail: {},
      previewUrl: []
    }
  },
  methods: {
    async config () {
      let url = location.href.split('#')[0]
      await this.$initWxConfig(url, ['previewFile'])
    },
    redirectToProduct (servicePackId, licenceId, serviceOptionItemId) {
      this.$router.push({
        name: 'ProductInfo',
        query: {
          servicePackId,
          licenceId,
          serviceOptionItemId
        }
      })
    },
    payStatusColor (status) {
      switch (status) {
        case '未支付':
          return 'color_1'
        case '已支付,待录入':
          return 'color_2'
        case '已完成':
          return 'color_0'
        default:
          return 'color_3'
      }
    },
    previewImage (url) {
      let vue = this
      if (_.isEmpty(this.previewUrl)) {
        let previewUrl = _.filter(this.expand.imageExpand, function (item) {
          return item.value && item.value !== ''
        })
        _.forEach(previewUrl, (item) => {
          this.previewUrl.push(item.value)
        })
      }
      wx.previewImage({
        current: url,
        urls: vue.previewUrl
      })
    }
  },
  watch: {
    'basicOrderDetailInfo': {
      handler: function (newValue) {
        if (newValue) {
          this.orderDetail = newValue
        }
      },
      deep: true,
      immediate: true
    }
  }

}
</script>

<style scoped>
  .wrap {
    word-break: break-all;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .title p {
    font-size: 14px;
    color: #888;
  }

  .content {
    background: #fff;
    font-size: 14px;
  }

  .container {
    background: #fff;
    position: relative;
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

  .equipment_pic {
    padding: 10px 15px;
    font-size: 0;
  }

  .pic {
    width: 29%;
    max-width: 115px;
    max-height: 115px;
    height: 26vw;
    display: inline-block;
    text-align: center;
    margin-right: calc((13% - 15px) / 3);
  }

  .pic .img {
    width: 100%;
    height: 100%;
    color: #888;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .pic .text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    font-size: 14px;
    color: #888;
  }

  .pic img {
    width: 100%;
  }

  .pic .nameplate {
    font-size: 12px;
    padding: 10px 0;
    color: #888;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .color_0 {
    color: #26a2ff;
  }

  .color_1 {
    color: #ef4f4f;
  }

  .color_2 {
    color: #ffc107;
  }

  .color_3 {
    color: #888;
  }

  .item_p {
    padding: 10px 0 10px 15px;
    display: table;
    width: 100%;
    font-size: 14px;
    box-sizing: border-box;
    table-layout: fixed;
    background: #fff;
  }

  .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
    width: 44px;
    height: 44px;
  }

  .item_img img {
    width: 100%;
    height: 100%;
  }

  .item_content {
    display: table-cell;
    padding-left: 15px;
  }

  .item_over {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

</style>
