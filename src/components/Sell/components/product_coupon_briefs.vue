<template>
  <div class="product_coupon_briefs" v-show="freebies.length">
    <div class="item_coupon_briefs" v-for="(item, index) in freebies" :key="index">
      <span class="coupon_title">{{item.name}}</span>
      <span class="coupon_qty">x{{item.qty}}</span>
      <span class="coupon_par_value" :class="{ visible: !item.parValue }">￥{{item.parValue}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'product_coupon_briefs',
  props: ['freebies']
}
</script>

<style scoped>
.product_coupon_briefs {
  padding: 10px 15px;
  border-top: dashed 1px #efefef;
}
.item_coupon_briefs {
  display: flex;
  justify-content: center;
}
.coupon_title,.coupon_qty,.coupon_par_value {
  padding-right: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.coupon_title {
  flex: 1.4;
  text-align: left;
}
.coupon_qty {
  flex: .2;
}
.coupon_par_value {
  flex: .4;
}
.visible {
  visibility: hidden;
}
</style>
