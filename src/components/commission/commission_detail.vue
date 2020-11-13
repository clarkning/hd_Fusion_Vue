<template>
  <div class="Withdraw">
    <!-- 订单信息 -->
    <div class="orderInfoWrap">
      <!-- 非电器回收佣金类 -->
      <div v-if="showOrderInfo && !isRecycleType">
        <p class="p">订单信息</p>
        <mt-cell class="money" title="订单金额" :value="'￥ '+detail.orderAmount"></mt-cell>
        <mt-cell title="订单号" :value="detail.orderCode"></mt-cell>
        <mt-cell title="项目" :value="detail.projectName"></mt-cell>
        <mt-cell title="销售员" :value="detail.salesName"></mt-cell>
        <mt-cell title="完成时间" :value="detail.orderFinishTime ? detail.orderFinishTime.slice(0, 10) : ''"></mt-cell>
      </div>
      <!-- 电器回收类 -->
      <div v-if="isRecycleType">
        <p class="p">订单信息</p>
        <mt-cell title="订单号" :value="detail.orderCode"></mt-cell>
        <mt-cell title="完成时间" :value="detail.orderFinishTime ? formatTime(detail.orderFinishTime) : ''"></mt-cell>
      </div>
    </div>
    <!-- 佣金信息 -->
    <div class="moneyInfoWrap">
      <!-- 非电器回收类 -->
      <div v-if="!isRecycleType">
        <p class="p">佣金信息</p>
        <mt-cell class="money" title="结算状态" :value="detail.accountSettleStatus"></mt-cell>
        <mt-cell title="结算单号" :value="detail.accountSettleCode"></mt-cell>
        <mt-cell title="佣金" :value="detail.dividePrice"></mt-cell>
        <mt-cell title="佣金类别" :value="detail.divideType"></mt-cell>
        <mt-cell title="结算类型" :value="detail.accountSettleType"></mt-cell>
        <mt-cell title="结算时间" :value="detail.created ? detail.created.slice(0, 10) : ''"></mt-cell>
      </div>
      <!-- 电器回收类 -->
      <div v-else>
        <p class="p">佣金信息</p>
        <mt-cell class="money" title="结算状态" :value="detail.accountSettleStatus"></mt-cell>
        <mt-cell title="结算单号" :value="detail.accountSettleCode"></mt-cell>
        <mt-cell title="销售佣金" :value="detail.dividePrice"></mt-cell>
        <mt-cell title="佣金类别" :value="detail.divideType"></mt-cell>
        <mt-cell title="结算类型" :value="detail.accountSettleType"></mt-cell>
        <mt-cell title="结算日期" :value="detail.created ? detail.created.slice(0, 10) : ''"></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import api from '../../api/index2'
import { loadData, defaultPreHandler } from '../../common/utils'
import { DivideType } from '../../common/enum/fusion_resource'

export default {
  // 佣金详情
  name: 'CommissionDetail',
  data () {
    return {
      divideTypeInvert: _.invert(DivideType),
      detail: {
        orderAmount: '',
        orderCode: '',
        projectName: '',
        salesName: '',
        orderFinishTime: '',
        accountSettleStatus: '',
        accountSettleCode: '',
        dividePrice: '',
        divideType: '',
        accountSettleType: '',
        created: ''
      },
      accountSettleId: null,
      divideType: null,
      page: 1
    }
  },
  async created () {
    this.accountSettleId = this.$route.query.accountSettleId
    this.showOrderInfo = this.$route.query.showOrderInfo
    this.divideType = this.$route.query.divideType

    await loadData(() => {
      return api.getCommissionDetail(this.accountSettleId)
    }, (detail) => {
      this.detail = detail
    }, defaultPreHandler, true)
  },
  methods: {
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  },
  computed: {
    isRecycleType() {
      let typeCode = DivideType.电器回收佣金

      return this.divideType === this.divideTypeInvert[typeCode]
    }
  }
}
</script>

<style scoped>
  .p {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }
</style>
