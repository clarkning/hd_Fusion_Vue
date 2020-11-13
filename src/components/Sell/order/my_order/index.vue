<template>
  <div class="my_order_wrap">
		<mt-navbar v-model="selectedTab" :fixed="true" class="navbar_box">
      <mt-tab-item id="csoOrder">延保订单</mt-tab-item>
      <mt-tab-item id="recycleOrder">回收订单</mt-tab-item>
    </mt-navbar>
		<mt-tab-container v-model="selectedTab" :class="{tab_box: personId}">
      <mt-tab-container-item id="csoOrder">
        <csoOrder ref="csoOrderRef" v-if="selectedTab === 'csoOrder'"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="recycleOrder">
				<recycleOrder ref="recycleOrderRef" v-if="selectedTab === 'recycleOrder'"/>
      </mt-tab-container-item>
    </mt-tab-container>
	</div>
</template>

<script>
	import _ from 'lodash'
	import csoOrder from '../my_order'
	import recycleOrder from './recycle/list'
	import { createNamespacedHelpers } from 'vuex'

	const { mapState, mapMutations } = createNamespacedHelpers('order')

	export default {
		name: 'my_order',
		components: {
			csoOrder,
			recycleOrder
		},
		data () {
			return {
				selectedTab: 'csoOrder',
				personId: this.$store.state.person.personId || null
			}
		},
		created () {
			this.initSelected()
		},
		mounted () {
			// 如果当前选中的是 csoOrder， 初始化的时候需主动触发数据请求
			if (this.selectedTab === 'csoOrder' && _.isEmpty(this.$refs.csoOrderRef.orderList)) {
				this.$refs.csoOrderRef.createdLoadMyOrderList()
      }
		},
		methods: {
			...mapMutations(['setHistoryOrderNav']),
			initSelected () {
				this.storeHistoryOrderNav
					? this.selectedTab = this.storeHistoryOrderNav
					: this.selectedTab = 'csoOrder'
			}
		},
		computed: {
      ...mapState({
        storeHistoryOrderNav: state => state.historyOrderNav
      })
    },
		watch: {
      'selectedTab': {
				handler:  async function (v) {
					this.setHistoryOrderNav(v)
					this.$nextTick(() => {
						if (v === 'csoOrder' && _.isEmpty(this.$refs.csoOrderRef.orderList)) {
							this.$refs.csoOrderRef.createdLoadMyOrderList()
						} else if (v === 'recycleOrder' && _.isEmpty(this.$refs.recycleOrderRef.recycleOrderList)) {
							this.$refs.recycleOrderRef.createdLoadRecycleList()
						}
					})
				}
			}
    }
	}
</script>

<style scoped>
  .tab_box {
    margin-top: 55px;
  }
</style>
