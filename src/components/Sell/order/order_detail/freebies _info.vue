<template>
  <div class="freebies-info">
    <div class="title" v-if="freebiesInfo.length">
      <mt-cell><p slot="title">赠品信息</p></mt-cell>
    </div>
    <div class="content">
      <div class="container" v-for="item in freebiesInfo">
        <mt-cell :title="item.serviceOptionItem.name" :value="`￥${item.serviceOptionItem.parValue}`"></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'freebies_info',
  props: {
    freebiesInfo: Array
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

  .content >>> .mint-cell-text {
    max-width: 17rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: initial;
  }
  
</style>
