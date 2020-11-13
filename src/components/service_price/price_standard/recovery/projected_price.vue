<template>
  <div class="projected_price_wrap">
		<div class="projected_price_main">
			<p class="content_title">{{currentCategory}}回收</p>
			<p class="content_price">预计收入{{projectedPrice}}</p>
			<p class="content_explain">保底回收价不低于{{smallProjectedPrice}}元</p>
		</div>
		<div class="result_desc">实际回收价以回收员上门质检结果为准</div>
	</div>
</template>

<script>
export default {
	name: 'projected_price',
	props: {
		currentCategory: {
			default: ''
		},
		projectedPrice: {
			default: ''
		},
		smallProjectedPrice: {
			default: '0'
		}
  }
}
</script>

<style scoped>
	.projected_price_wrap {
		width: 100%;
		margin: 30px auto 50px;
	}
	.projected_price_main {
		width: 85%;
		padding: 0 10px;
		margin: auto;
		background-color: #d26d6a;
		border: solid 1px #ddd;
		border-radius: 6px;
	}
	.content_title {
		color: #ffffff;
		padding: 12px 0 18px;
	}
	.content_price {
		font-size: 38px;
		color: #ffffff;
		text-align: center;
		font-weight: bold;
	}
	.content_explain {
		color: #ffffff;
		font-size: 12px;
		text-align: right;
		padding: 16px 0 8px;
	}
	.result_desc {
		text-align: center;
		margin-top: 10px;
		font-size: 14px;
		color: #969799;
	}
</style>
