<template>
  <div>
    <div class="project" v-if="orderInfo">
      <div class="flex">
        <slot class="slot-right"></slot>
        <div>{{orderInfo.title}}</div>
        <div class="name">{{displayName}}</div>
        <div class="f-size1">本月第 <b class="red">{{orderInfo.monthlyOrderSort}}</b> 单</div>
        <div class="f-size1">累计销售额 <b class="red">￥{{orderInfo.monthlyCumulativeAmount}}</b></div>
      </div>
    </div>

    <div class="info">
      <mt-cell title="订单编号" :value="orderInfo.orderCode|confidentiality"></mt-cell>
      <mt-cell title="品牌品类" :value="displayBrandName +' '+ orderInfo.productCategoriesName"></mt-cell>
      <mt-cell title="订单金额" :value="orderInfo.payAmount"></mt-cell>
      <mt-cell title="完成时间" :value="orderInfo.finishTime|formatTime"></mt-cell>
      <mt-cell title="上单完成" v-show="$route.path === '/shareOrder'" >
        <span class="position">{{orderInfo.lastOrderFinishTime|formatTime}}</span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'

  export default {
    name: 'order_detail',
    props: {
      orderDetail: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        orderInfo: {
          title: null,
          personName: null,
          monthlyOrderSort: null,
          monthlyCumulativeAmount: null,
          orderCode: null,
          hideSurname: false,
          hiddenBrandIds: null,
          brandName: null,
          brandId: null,
          productCategoriesName: null,
          payAmount: null,
          finishTime: null,
          lastOrderFinishTime: null
        }
      }
    },
    filters: {
      confidentiality: function (cso) {
        return `${cso.substr(0, 2)}****${cso.substr(cso.length - 4, 4)}`
      },
      formatTime: function (time) {
        return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : ''
      }
    },
    computed: {
      displayName () {
        let name = this.orderInfo.personName
        return name ? (this.orderInfo.hideSurname ? '*' + name.substr(1) : name) : ''
      },
      displayBrandName () {
        let includeBrand = this.orderInfo.hiddenBrandIds ? this.orderInfo.hiddenBrandIds.includes(this.orderInfo.brandId) : false
        return includeBrand ? '' : this.orderInfo.brandName
      }
    },
    watch: {
      orderDetail: {
        deep: true,
        handler (nv, ov) {
          this.orderInfo = _.cloneDeep(nv)
        }
      }
    }
  }
</script>

<style scoped>
  .project {
    padding: 5px 20px;
    line-height: 2;
    background: #fff;
    display: flex;
  }
  .position{
    position: absolute;
    right: 4%;
  }
  .name {
    font-size: 28px;
  }

  .flex {
    width: 100%;
  }
  .slot-right{
    float: right;
    width: 115px;
  }
  .share-image .project {
    padding: 15px;
    line-height: 1.5;
    display: flex;
    background: none;
  }

  .share-image .name {
    font-size: 36px;
  }

  .share-image .red {
    color: #F1464C;
    font-size: 28px;
  }

  .share-image .f-size1 {
    font-size: 20px;
  }

  .share-image .info >>> .mint-cell {
    min-height: 35px !important;
    background: none !important;
  }

  .share-image .info >>> .mint-cell-wrapper {
    color: #999;
    background-image: linear-gradient(180deg, #f9f9f9, #f9f9f9 50%, transparent 50%);
  }
</style>
