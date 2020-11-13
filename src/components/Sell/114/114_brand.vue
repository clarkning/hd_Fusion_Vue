<template>
  <div class="Brand bg_img_none">
    <mt-field placeholder="输入查询的品牌 如Apple/苹果" v-model="filter" :disableClear="true">
      <i class="iconfont icon-sousuo" aria-hidden="true"></i>
    </mt-field>
    <div class="list">
      <div v-if="popularBrand.length > 0">
        <p class="title">热门品牌</p>
        <div class="container">
          <div v-for="item in popularBrand" class="hot_brand" @click="selectBrand(item)" @touchstart="start()"
               @touchend="end()">{{item.brandName}}
          </div>
        </div>
      </div>
      <div class="content" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="brandList.loading"
           infinite-scroll-distance="300">
        <div v-for="item in brandList.list" :key="item.id">
          <p class="title">{{item.index}}</p>
          <div class="bg_f" v-for="cell in item.list" @touchstart="start()" @touchend="end()"
               @click="selectBrand(cell)">
            <mt-cell :title="cell.brandName"></mt-cell>
          </div>
        </div>
        <div class="load noMore" v-show="brandList.noMore && !brandList.loading">已无更多</div>
        <div class="load" v-show="brandList.loading">
          <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
          正在加载
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index2'
  import _ from 'lodash'
  import { loadData, defaultPreHandler } from '../../../common/utils'
  import { createNamespacedHelpers } from 'vuex'

  const {mapState, mapMutations} = createNamespacedHelpers('order')

  export default {
    name: 'hbBrand',
    data () {
      return {
        brandList: {
          loading: false,
          noMore: false,
          page: 0,
          list: []
        },
        categoryId: null,
        orderId: null,
        filter: '',
        popularBrand: []
      }
    },
    async created () {
      this.categoryId = this.$route.query.category
      await this.getPopularBrandList()
    },
    methods: {
      ...mapMutations(['setBrandValue']),
      executeLoadingProducts: _.debounce(async function () {
        this.brandList.page = 1
        await this.getBrandList()
      }, 300),
      async getPopularBrandList () {
        let popularBrand = {
          serviceOptionItemId: this.$route.query.sku,
          storeId: this.$route.query.storeId,
          projectId: this.$route.query.projectId,
          categoryId: this.categoryId
        }
        await loadData(() => {
          return api.popular(popularBrand)
        }, (data) => {
          this.popularBrand = data
        }, defaultPreHandler)
      },
      async getBrandList () {
        let params = {
          sku: this.$route.query.sku,
          categoryId: this.categoryId,
          name: this.$route.query.name,
          page: '',
          limit: ''
        }
        if (this.brandList.page === 1) {
          this.brandList.list = []
        }
        await loadData(() => { return api.activationBrands(params) }, (brandList) => {
          this.setIndex(brandList)
        }, defaultPreHandler, true)
        this.brandList.noMore = this.brandList.list.length < (this.brandList.page * 50)
      },
      setIndex (data) {
        _.forEach(data, (item) => {
          let index = item.brandName.substr(0, 1).toUpperCase()
          let find = _.find(this.brandList.list, {index})
          if (!find) {
            this.brandList.list.push({index: index, list: []})
          }
          let arrIndex = _.findIndex(this.brandList.list, {index})
          this.brandList.list[arrIndex].list.push(item)
        })
      },
      selectBrand (data) {
        let param = {
          value: data,
          isJumpingBrand: this.storeOrderFilling.brand.isJumpingBrand
        }
        // if (this.$route.name === 'hbSelectBrand') {
        let orderFilling = JSON.parse(window.localStorage.getItem('orderFilling'))
        orderFilling.brand.value = param.value
        window.localStorage.setItem('orderFilling', JSON.stringify(orderFilling))
        // } else {
        //   this.setBrandValue(param)
        // }
        this.$router.go(-1)
      },
      start () {
        let eve = window.event
        eve.currentTarget.style.background = '#f4f3f3'
      },
      end () {
        let eve = window.event
        eve.currentTarget.style.background = '#fff'
      },
      async loadMore () {
        if (this.brandList.noMore) return
        this.brandList.loading = true
        this.brandList.page += 1
        await this.getBrandList()
        this.brandList.loading = false
      }
    },
    computed: {
      ...mapState({
        storeOrderFilling: state => state.orderFilling
      })
    },
    watch: {
      'filter': 'executeLoadingProducts'
    }
  }
</script>
<style scoped>
  .list {
    overflow-y: scroll;
    height: calc(100vh - 40px);
  }

  .title {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .container {
    padding: 0 15px 5px;
    background: #fff;
    font-size: 0;
  }

  .hot_brand {
    min-width: 3rem;
    display: inline-block;
    line-height: 31px;
    height: 31px;
    border: 1px solid #f4f3f3;
    box-sizing: border-box;
    padding: 0 2%;
    text-align: center;
    font-size: 14px;
    border-radius: 15px;
    margin: 5px 5px 0 0;
    background: transparent;
  }

  .bg_f {
    background: #fff;
  }

  .content {
    overflow-y: scroll;
  }
</style>
