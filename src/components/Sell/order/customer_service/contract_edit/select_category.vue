<template>
  <div class="Brand">
    <mt-field v-model.trim="params.name" :disableClear="true">
      <mt-button type="primary" size="small" @click="filterCategories">搜索</mt-button>
    </mt-field>
    <div class="content" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="category.loading"
         infinite-scroll-distance="300">
      <mt-cell v-for="item in category.showList" :key="item.id" :title="item.productCateogryName"
               @click.native="selectCategory(item)"></mt-cell>
      <div class="load noMore" v-show="category.noMore && !category.loading">已无更多</div>
      <div class="load" v-show="category.loading">
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
          name: '',
          page: 1,
          limit: 50
        },
        category: {
          loading: false,
          noMore: true,
          list: [],
          showList: []
        },
        serviceContractId: this.$route.query.serviceContractId
      }
    },
    created () {
      this.getCategoryList()
    },
    methods: {
      ...mapMutations(['setProductCategoryName']),
      async filterCategories () {
        this.params.page = 1
        this.category.showList = _.filter(this.category.list, item => {
          let name = this.params.name.trim().toLowerCase()
          let nameB = item.productCateogryName.toLowerCase()
          return nameB.indexOf(name) >= 0
        })
        this.category.loading = false
        this.category.noMore = true
      },
      async getCategoryList () {
        await loadData(() => { return api.getCSProductCategories(this.serviceContractId) }, (category) => {
          this.category.list = category
          this.category.showList = this.category.list.slice(0, this.params.limit)
          this.category.noMore = this.category.showList.length < (this.params.page * this.params.limit)
        }, defaultPreHandler, false)
      },
      selectCategory (data) {
        this.setProductCategoryName(data.productCateogryName)
        this.$router.go(-1)
      },
      async loadMore () {
        if (this.category.noMore) return
        this.category.loading = true
        setTimeout(() => {
          let showList = this.category.list.slice(this.params.page * this.params.limit, (this.params.page + 1) * this.params.limit)
          this.category.showList.push(...showList)
          this.params.page += 1
          this.category.noMore = this.category.showList.length < (this.params.page * this.params.limit)
          this.category.loading = false
        }, 1000)
      }
    }
  }
</script>
<style scoped>
  .content {
    margin-top: 10px;
    overflow-y: scroll;
    height: calc(100vh - 50px);
  }
</style>
