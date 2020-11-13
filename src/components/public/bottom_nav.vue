<template>
  <div class="bottom-nav">
    <mt-tabbar v-model="selected" class="fs-tabbar zan_tabbar" :fixed="true">
      <mt-tab-item id="home">
        <div class="btm_nav" @click="goToPageHome()">
          <i class="iconfont icon-shouye1-copy fs-2s" aria-hidden="true" slot="icon"></i>
          <span class="nav_title">首页</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="commission">
        <div class="btm_nav" @click="goToPageCommission()">
          <i class="iconfont icon-qiandai fs-2s" aria-hidden="true" slot="icon"></i>
          <span class="nav_title">佣金</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="sales">
        <div class="btm_nav" @click="goToPageOrder()">
          <i class="iconfont icon-xiadan fs-2s" aria-hidden="true" slot="icon"></i>
          <span class="nav_title">下单</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="user">
        <div class="btm_nav" @click="goToPageMine()">
          <i class="iconfont icon-wodedangxuan fs-2s" aria-hidden="true" slot="icon"></i>
          <span class="nav_title">我的</span>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  export default {
    name: 'bottomNav',
    props: ['select'],
    data () {
      return {
        selected: this.select
      }
    },
    methods: {
      goToPageMine: function () {
        this.$router.replace({
          name: 'Mine'
        })
      },
      goToPageHome: function () {
        this.$router.replace({
          path: '/home'
        })
      },
      goToPageOrder () {
        this.$router.replace({
          name: 'ChooseProject'
        })
      },
      goToPageCommission () {
        this.$router.replace({
          name: 'Commission'
        })
      }
    }
  }
</script>
