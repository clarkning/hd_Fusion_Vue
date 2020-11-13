<template>
  <div class="recycle_wrap MyOrder">
		<div v-if="recycleOrderList.length === 0" class="null_data">
      <div class="null"></div>
      <p>暂无回收订单</p>
    </div>
		<div v-else>
			<div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
				<div
					class="bg_img_none"
					v-for="(item, index) in recycleOrderList"
					:key="index"
					@click="redirectToRecycleDetail(item.id)">
					<mt-cell title="产品：电器回收">
            <span class="status_color">{{ valueAddedOrderStatusHandler(item.status) }}</span>
          </mt-cell>
					<div class="content">
            <mt-cell title="订单编号" :value="item.code"></mt-cell>
						<mt-cell title="产品品类" :value="item.productCategory"></mt-cell>
            <mt-cell title="客户姓名" :value="item.customer.name"></mt-cell>
            <!-- <mt-cell title="回收价格"
							v-if="item.status !== valueAddedOrderStatusEnum.已完成"
							:value="'￥' + item.estimatedAmount + '（预估）'"
						>
						</mt-cell> -->
						<!-- <mt-cell
							v-else
							title="回收价格"
							:value="'￥' + item.finalAmount"
						>
						</mt-cell> -->
            <mt-cell title="下单时间" :value="timeHandler(item.orderTime)"></mt-cell>
          </div>
				</div>
			</div>
			<div class="load noMore" v-show="noMore">已无更多</div>
      <div class="load" v-show="loading">
        <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
        正在加载
      </div>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import newApi from '../../../../../api/fusion_api'
import { loadData, defaultPreHandler } from '../../../../../common/utils'
import { ValueAddedOrderStatus } from '../../../../../common/enum/fusion_resource'

export default {
  name: 'recycle_list',
  data () {
    return {
      valueAddedOrderStatusEnum: ValueAddedOrderStatus,
      valueAddedOrderStatusInvert: _.invert(ValueAddedOrderStatus),
      recycleOrderList: [],
      noMore: true,
      loading: false,
      listParams: {
        customerPhone: '',
        page: 1,
        limit: 5
      }
    }
  },
  methods: {
    async createdLoadRecycleList () {
      this.loading = true
      await this.initRecycleList()
      this.loading = false
    },
    async initRecycleList () {
      await loadData(() => {
        let { customerPhone, page, limit } = this.listParams
        return newApi.recycleOrder.getRecyleOrders(customerPhone, page, limit)
      }, resData => {
        this.recycleOrderList = resData
        this.noMore = this.recycleOrderList.length < (this.listParams.limit * this.listParams.page)
      }, defaultPreHandler)
    },
    async loadMore () {
      if (this.noMore) return
      this.loading = true
      this.listParams.page += 1
      await loadData(() => {
        let { customerPhone, page, limit } = this.listParams
        return newApi.recycleOrder.getRecyleOrders(customerPhone, page, limit)
      }, async (data) => {
        let orderList = data
        await loadData(() => {
          this.recycleOrderList.push(...orderList)
          this.noMore = this.recycleOrderList.length < (this.listParams.limit * this.listParams.page)
        }, null, null, true)
      }, defaultPreHandler, true)
      this.loading = false
    },
    timeHandler (time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    redirectToRecycleDetail (recycleOrderId) {
      this.$router.push({
        name: 'OrderDetailRecycle',
        query: {
          recycleOrderId
        }
      })
    },
    valueAddedOrderStatusHandler (status) {
      if (status === this.valueAddedOrderStatusEnum.新建) {
        // 新建状态 显示为 处理中
        return this.valueAddedOrderStatusInvert[this.valueAddedOrderStatusEnum.处理中]
      }
      return this.valueAddedOrderStatusInvert[status]
    }
  }
}
</script>

<style scoped>
	.bg_img_none {
    background: #fff;
    padding-bottom: 5px;
  }
	.bg_img_none:not(:last-child) {
    margin-bottom: 10px;
  }
	.status_color {
		color: #26a2ff;
	}
</style>
