<template>
  <div class="detail_container">
    <mt-cell title="订单详情" style="font-weight: bold;"></mt-cell>
    <!-- 客户信息 -->
    <div class="customer">
      <div class="title">
        <mt-cell><p slot="title">客户信息</p></mt-cell>
      </div>
      <div class="content bg_img_none">
        <mt-cell title="客户姓名" :value="detailInfo.customer.name"></mt-cell>
        <mt-cell title="手机号码" :value="detailInfo.customer.phone"></mt-cell>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order">
      <div class="title">
        <mt-cell><p slot="title">订单信息</p></mt-cell>
      </div>
      <div class="content bg_img_none">
        <mt-cell title="订单状态" :value="currentValueAddedOrderStatus"></mt-cell>
        <mt-cell title="订单编号" :value="detailInfo.code"></mt-cell>
        <mt-cell title="产品品类" :value="detailInfo.productCategory"></mt-cell>
        <mt-cell title="下单信息" :value="detailInfo.orderAttributes"></mt-cell>
        <mt-cell title="检测结果" v-if="isFinalStatus" :value="detailInfo.finalAttributes"></mt-cell>
        <mt-cell title="销售佣金" v-if="isFinalStatus" :value="'￥' + detailInfo.salesCommission"></mt-cell>
        <mt-cell title="下单时间" :value="timeHandler(detailInfo.orderTime)"></mt-cell>
        <mt-cell title="完成时间" v-if="isFinalStatus || isCancelStatus" :value="timeHandler(detailInfo.finishTime)"></mt-cell>
        <mt-cell title="保底价" :value="detailInfo.bottomPrice || ''"></mt-cell>
        <mt-cell title="取消原因" v-if="isCancelStatus" :value="detailInfo.cancelReason"></mt-cell>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="button" v-if="detailInfo.status === valueAddedOrderStatusEnum.处理中" @click="popupVisibleHandler">
      <mt-button type="primary" size="large">取消订单</mt-button>
    </div>
    <!-- 取消原因填写弹窗 -->
    <mt-popup
      style="width: 100%;"
      v-model="popupVisible"
      position="bottom">
      <div class="reason_wrap">
        <div class="close" @click="popupVisible = false">
          <i class="mintui mintui-field-error close-icon" aria-hidden="true"></i>
        </div>
        <div class="textarea button">
          <mt-field placeholder="请填写取消原因" type="textarea" rows="4" v-model="cancelReason"></mt-field>
        </div>
        <div class="button" @click="cancleOrderHandler">
          <mt-button type="primary" size="large">提交</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { Toast } from 'mint-ui'
import { ValueAddedOrderStatus, ValueAddedOrderSource } from '../../../../../common/enum/fusion_resource'
import newApi from '../../../../../api/fusion_api'
import { loadData, defaultPreHandler, boolPreHandler } from '../../../../../common/utils'

export default {
  name: 'recycle_detail',
  data () {
    return {
      valueAddedOrderSource: ValueAddedOrderSource,
      valueAddedOrderStatusEnum: ValueAddedOrderStatus,
      valueAddedOrderStatusInvert: _.invert(ValueAddedOrderStatus),
      recycleOrderId: null,
      detailInfo: {},
      popupVisible: false,
      cancelReason: ''
    }
  },
  created () {
    this.recycleOrderId = this.$route.query.recycleOrderId

    this.loadRecycleDetail()
  },
  methods: {
    async loadRecycleDetail () {
      await loadData(() => {
        return newApi.recycleOrder.getRecyleOrder(this.recycleOrderId)
      }, resData => {
        this.detailInfo = resData
      }, defaultPreHandler)
    },
    timeHandler (time) {
      return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    popupVisibleHandler () {
      this.popupVisible = true
      this.cancelReason = ''
    },
    async cancleOrderHandler () {
      if (!this.cancelReason) {
        Toast('取消原因不可为空')
        return
      }
      await loadData(() => {
        return newApi.recycleOrder.cancelRecyleOrder(this.recycleOrderId, this.cancelReason)
      }, success => {
        if (success) {
          Toast('订单已取消')
          this.loadRecycleDetail()
          this.popupVisible = false
        }
      }, boolPreHandler)
    }
  },
  computed: {
    isFinalStatus () {
      return this.detailInfo.status === this.valueAddedOrderStatusEnum.已完成
    },
    isCancelStatus () {
      return this.detailInfo.status === this.valueAddedOrderStatusEnum.已取消
    },
    currentValueAddedOrderStatus () {
      if (this.detailInfo.status === this.valueAddedOrderStatusEnum.新建) {
        // 新建状态 显示为 处理中
        return this.valueAddedOrderStatusInvert[this.valueAddedOrderStatusEnum.处理中]
      }
      return this.valueAddedOrderStatusInvert[this.detailInfo.status]
    }
  }
}
</script>

<style scoped>
  .title p {
    font-size: 14px;
    color: #888;
  }
  .content {
    background: #fff;
    font-size: 14px;
  }
  .button {
    width: 90%;
    margin: 15px auto;
  }
  .reason_wrap {
    width: 100%;
  }
  .reason_wrap .close {
    text-align: right;
    padding-top: 5px;
    padding-right: 15px;
  }
  .reason_wrap .close-icon {
    font-size: 24px;
    opacity: .2;
  }
  .reason_wrap .textarea {
    border-right: solid 1px #d9d9d9;
    border-left: solid 1px #d9d9d9;
  }
  .detail_container .content >>> .mint-cell-text {
    display: inline-block;
    min-width: 56px;
  }
  .detail_container .content >>> .mint-cell-value {
    text-align: right;
  }
</style>>
