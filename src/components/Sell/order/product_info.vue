<template>
  <div class="ProductDescription">
    <mt-navbar v-show="licenceId" v-model="selectedTab" :fixed="true" class="navbar_box">
      <mt-tab-item id="couponList">超值赠送</mt-tab-item>
      <mt-tab-item id="instruction">产品介绍</mt-tab-item>
      <mt-tab-item id="service">服务条款</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selectedTab" :class="{tab_box: licenceId}">
      <mt-tab-container-item id="couponList">
        <couponList ref="couponList"></couponList>
      </mt-tab-container-item>
      <mt-tab-container-item id="instruction">
        <div class="title">
          <div>服务产品：{{productDesc.title}}</div>
          <div class="label" :class="{color_888: licenceId}" v-html="productDesc.summary"></div>
        </div>
        <div class="p_15" v-html="productDesc.description"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="service" class="pt_10 background">
        <div class="p_15" v-html="licenceContent"></div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import {loadData, defaultPreHandler} from '../../../common/utils'
  import api from '../../../api/index2'
  import _ from 'lodash'
  import couponList from './tab_components/coupon_list'

  export default {
    name: 'ProductInfo',
    components: {
      couponList
    },
    data () {
      return {
        selectedTab: '',
        servicePackId: null,
        licenceId: null,
        serviceOptionItemId: null, // 超值赠送 tab 详情所需
        productDesc: {},
        licenceContent: ''
      }
    },
    created () {
      this.servicePackId = Number(this.$route.query.servicePackId)
      this.licenceId = this.$route.query.licenceId ? Number(this.$route.query.licenceId) : null
      this.serviceOptionItemId = this.$route.query.serviceOptionItemId ? _.toNumber(this.$route.query.serviceOptionItemId) : null

      if (this.$route.query.service) {
        this.selectedTab = this.tabName.get(this.$route.query.service)
      } else {
        this.selectedTab = 'instruction'
      }
    },
    methods: {
      async getProductDesc () {
        await loadData(() => {
          return api.getServicePack(this.servicePackId)
        }, (data) => {
          this.productDesc = data
        }, defaultPreHandler, true)
      },
      async getLicence () {
        await loadData(() => {
          return api.getLicenceBySku(this.licenceId)
        }, data => {
          this.licenceContent = data
        }, defaultPreHandler, true)
      }
    },
    computed: {
      tabName () {
        return new Map([
          ['service', 'service'],
          ['instruction', 'instruction'],
          ['couponList', 'couponList']
        ])
      }
    },
    watch: {
      'selectedTab': async function (v) {
        if (v === 'instruction' && _.isEmpty(this.productDesc)) {
          await this.getProductDesc()
        } else if (v === 'service' && _.isEmpty(this.licenceContent)) {
          await this.getLicence()
        } else if (v === 'couponList' && _.isEmpty(this.$refs.couponList.couponList)) {
          this.$refs.couponList.loadCouponList(this.servicePackId, this.serviceOptionItemId)
        }
      }
    }
  }
</script>
<style scoped>
  .title {
    font-size: 14px;
    padding: 10px 15px;
    color: #333;
  }

  .p_15 {
    padding: 0 15px;
  }

  .color_888 {
    color: #888;
  }

  .label {
    margin-top: 10px;
  }

  .background {
    background: #fff;
  }

  .pt_10 {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .tab_box {
    margin-top: 55px;
  }
</style>
