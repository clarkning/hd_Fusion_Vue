<template>
  <div class="coupon_list_wrap">
    <div v-for="(item, index) in couponList" :key="index">
      <div v-for="(value, key) in item.qty" :key="key">
        <couponItem :couponItemData="item"></couponItem>
      </div>
    </div>
    <div v-if="!couponList.length" class="empty_data">
      <p>暂无相关信息</p>
    </div>
  </div>
</template>

<script>
import api from '../../../../api/fusion_api'
import {loadData, defaultPreHandler} from '../../../../common/utils'
import couponItem from './coupon'

export default {
  name: 'couponList',
  components: {
    couponItem
  },
  data () {
    return {
      couponList: []
    }
  },
  methods: {
    async loadCouponList (servicePackId, serviceOptionItemId) {
      await loadData(() => {
        return api.servicePack.getServiceOptionItem(
          servicePackId,
          serviceOptionItemId
        )
      }, (data) => {
        this.couponList = data.freebies
      }, defaultPreHandler)
    }
  }
}
</script>

<style scoped>
.coupon_list_wrap {
  padding: 10px 15px;
}
.empty_data {
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
</style>
