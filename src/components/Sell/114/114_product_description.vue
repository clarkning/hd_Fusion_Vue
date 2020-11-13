<template>
  <div class="ProductDescription">
    <div class="p_15" v-html="productDesc.description"></div>
  </div>
</template>
<script>
  import {loadData, defaultPreHandler} from '../../../common/utils'
  import api from '../../../api/index2'

  export default {
    name: 'haoBai_product_description',
    data () {
      return {
        servicePackId: null,
        productDesc: {}
      }
    },
    created () {
      this.servicePackId = Number(this.$route.query.servicePackId)
      this.getProductDesc()
    },
    methods: {
      async getProductDesc () {
        await loadData(() => {
          return api.getServicePack(this.servicePackId)
        }, (data) => {
          this.productDesc = data
        }, defaultPreHandler, true)
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
