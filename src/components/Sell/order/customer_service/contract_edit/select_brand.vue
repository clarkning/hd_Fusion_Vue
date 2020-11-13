<template>
  <div class="Brand">
    <mt-field v-model.trim="params.name" :disableClear="true">
      <mt-button type="primary" size="small" @click="filterBrands">搜索</mt-button>
    </mt-field>
    <div class="content" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="brand.loading"
         infinite-scroll-distance="300">
      <mt-cell v-for="item in brand.list" :key="item.id" :title="item.name" @click.native="selectBrand(item)"></mt-cell>
      <div class="load noMore" v-show="brand.noMore && !brand.loading">已无更多</div>
      <div class="load spinner" v-show="brand.loading">
        <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
        正在加载
      </div>
    </div>
  </div>
</template>
<script>
  import { createNamespacedHelpers } from 'vuex'
  import api from '../../../../../api/index2'
  import _ from 'lodash'
  import { loadData, defaultPreHandler } from '../../../../../common/utils'
  const {mapMutations} = createNamespacedHelpers('customerService')

  export default {
    name: 'selectBrand',
    data () {
      return {
        params: {
          page: 0,
          limit: 50,
          name: ''
        },
        brand: {
          loading: false,
          noMore: false,
          list: []
        }
      }
    },
    methods: {
      ...mapMutations(['setBrandName']),
      async filterBrands () {
        this.params.page = 1
        await this.getBrandList()
      },
      executeLoadingProducts: _.debounce(async function () {
        this.params.page = 1
        await this.getBrandList()
      }, 300),
      async getBrandList () {
        if (this.params.page === 1) {
          this.brand.list = []
        }
        await loadData(() => { return api.getCSBrands(this.params) }, (brand) => {
          this.brand.list.push(...brand)
        }, defaultPreHandler, true)
        this.brand.noMore = this.brand.list.length < (this.params.page * this.params.limit)
      },
      selectBrand (data) {
        this.setBrandName(data.name)
        this.$router.go(-1)
      },
      async loadMore () {
        if (this.brand.noMore) return
        this.brand.loading = true
        this.params.page += 1
        await this.getBrandList()
        this.brand.loading = false
      }
    }
  }
</script>
<style scoped>
  .content {
    overflow-y: scroll;
    height: calc(100vh - 50px);
    margin-top: 10px;
  }
</style>
