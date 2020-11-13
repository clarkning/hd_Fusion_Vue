<template>
  <div class="recovery_wrap">
		<!-- 步骤条 -->
		<step :active="1" :category="{category: category,serviceType: currentServiceType}"/>
		<!-- 类型，规格，功能，设备年限 -->
		<div class="select_wrap">
			<specification
				v-if="filterData.type.list.length"
				v-model="filterData.type.value"
				@change="changeHandler1"
				:type="'Type'"
				ref="type"
				:title="filterData.type.title"
        :spec="filterData.type.list"
			/>
			<specification
				v-if="filterData.spec.list.length"
				v-model="filterData.spec.value"
				@change="changeHandler2"
				:type="'Spec'"
				ref="specification"
				:title="filterData.spec.title"
        :spec="filterData.spec.list"
			/>
			<selectRadio
				v-if="filterData.func.list.length"
				v-model="filterData.func.value"
				@change="changeHandler3"
				:type="'Func'"
				ref="func"
				:title="filterData.func.title"
				:spec="filterData.func.list"
			/>
		</div>
		<!-- 预约回收价 -->
		<div class="projected_price" v-if="projectedPrice">
			<projectedPrice
				:currentCategory="category"
				:projectedPrice="`${projectedPrice}元`"
				:smallProjectedPrice="smallProjectedPrice"
			/>
		</div>
		<!-- 预约按钮 -->
		<div class="btn-box">
      <van-button
				class="btn"
				type="info"
				size="large"
				:disabled="!projectedPrice"
				@click="appointmentHandler">
				立即预约，免收30上门费
			</van-button>
    </div>
		<!-- <div class="cell-title center">预约成功后，由专业回收人员免费上门取机</div> -->
	</div>
</template>

<script>
	import _ from "lodash"
	import step from '../step'
	import specification from "../specification"
	import selectRadio from '../select_radio'
	import projectedPrice from './projected_price'
	import { recycleData } from 'priceTable'
	import { Button } from 'vant'

	export default {
		name: 'recovery_index',
		components: {
			step,
			specification,
			projectedPrice,
			[Button.name]: Button,
			selectRadio
		},
		data () {
			return {
				category: this.$route.params.category,
				currentServiceType: Number(this.$route.params.serviceType),
				recycleData: recycleData.root.data,
				filterData: {
          type: {
						list: [],
						title: '',
            value: ''
          },
          spec: {
						list: [],
						title: '',
            value: ''
          },
          func: {
						list: [],
						title: '',
            value: ''
          }
				},
				typeList: null,
				specList: null,
				funcList: null,
				projectedPrice: null, // 预计回收价格
				smallProjectedPrice: 0 // 保底回收价格
			}
		},
		created () {
			this.initTypeData()
		},
		methods: {
			changeHandler1() {
				this.projectedPrice = null
				if (this.filterData.type.value) {
					let selectTypeName = this.filterData.type.value.name
					let findSpecObject = _.find(this.typeList, typeItem => {
						return typeItem.name === selectTypeName
					})

					if (findSpecObject.items) {
						this.filterData.spec.title = findSpecObject.items.name // 当前类型下的规格title
						this.specList = findSpecObject.items.item // 当前类型下的规格数据
					}

					let specList = []
					if (this.specList.length) {
						_.each(this.specList, specItem => {
							specList.push({
								label: specItem.name,
								value: specItem.name
							})
						})

						this.filterData.spec.list = specList
					}

					this.changeHandler2()
				}
			},
			changeHandler2 () {
				this.projectedPrice = null
				if (this.filterData.spec.value) {
					let selectspecName = this.filterData.spec.value.name
					let findFuncObject = _.find(this.specList, specItem => {
						return specItem.name === selectspecName
					})

					if (findFuncObject && findFuncObject.items) {
						this.filterData.func.title = findFuncObject.items.name // 当前类型，当前规格下的 功能title
						this.funcList = findFuncObject.items.item // 当前类型，当前规格下的 功能数据
					}

					let funcList = []
					if (this.funcList.length) {
						_.each(this.funcList, funcItem => {
							funcList.push({
								label: funcItem.name,
								value: funcItem.name,
								desc: funcItem.desc
							})
						})

						this.filterData.func.list = funcList
					}

					if (!findFuncObject) {
						this.funcList = []
						this.filterData.func.value = ''
						this.filterData.func.list = []
						return
					}

					this.changeHandler3()
				}
			},
			changeHandler3 () {
				if (this.filterData.func.value) {
					let selectFuncName = this.filterData.func.value.name
					let findSelectFuncObj = _.find(this.funcList, funcItem => {
						return funcItem.name === selectFuncName
					})
					// 预计收入
					findSelectFuncObj.name === selectFuncName
						? this.projectedPrice = findSelectFuncObj.basePrice
						: this.projectedPrice = null
					// 保底收入
					let findSmallPriceObj = _.find(this.funcList, {'bottomPrice' : 'true'})
					findSelectFuncObj.bottomPrice === 'false'
						? this.smallProjectedPrice = findSmallPriceObj.basePrice
						: this.smallProjectedPrice = findSelectFuncObj.basePrice
				}
			},
			initTypeData () {
				let findServiceTypeItem = _.find(this.recycleData, serviceTypeItem => {
					return serviceTypeItem.name === this.category
				})

				if (findServiceTypeItem.items) {
					this.filterData.type.title = findServiceTypeItem.items.name
				}

				let typeList = [] // 当前服务类型大类下的类型小类
				if (findServiceTypeItem.items.item.length) {
					this.typeList = findServiceTypeItem.items.item

					_.each(this.typeList, typeItem => {
						typeList.push({
							label: typeItem.name,
              value: typeItem.name
						})
					})
				}

				this.filterData.type.list = typeList

			},
			appointmentHandler () {
				let formArray = _.map(this.filterData, item => {
					return {
						pn: item.title,
						pv: item.value.name
					}
				})
        window.localStorage.setItem('recycleData',JSON.stringify({
					attributes:formArray,
					estimatedAmount: this.projectedPrice,
					bottomPrice: this.smallProjectedPrice
				}))
        this.$router.push({
          name: 'reservationService',
          params: {
            serviceType: this.currentServiceType,
						category: this.category,
						attributes: formArray,
						estimatedAmount: this.projectedPrice,
						bottomPrice: this.smallProjectedPrice
          }
				})
			}
		}
	}
</script>

<style scoped>
	.recovery_wrap {
		width: 100%;
		background-color: #ffffff;
	}

  .btn-box {
    padding: 10px 5%;
    box-sizing: border-box;

  }

  .btn {
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
  }

	.cell-title {
    color: #58727e;
    font-size: 13px;
		padding: 0 0 10px;
  }

	.center {
    text-align: center;
  }
</style>
