<template>
  <div class="ProductCategory">
    <sellProgress></sellProgress>
    <div :class="{list_a: isRedirect}" class="list">
      <div v-for="item in servicePacksList" class="item_container">
        <zanProduct :visible="visiblePopup" :logo="item.mainPicUrl" :title="item.title" :summary="item.summary"
                    :servicePackId="item.servicePackId" @child-say="listenContractsList" @goToPageSellProduct="goToPageSellProduct"></zanProduct>
      </div>
    </div>
    <div v-if="isRedirect">
      <bottomNav :select="bottomNav"></bottomNav>
    </div>
  </div>
</template>
<script>
  import api from '../../api/index2'
  import bottomNav from '../public/bottom_nav.vue'
  import sellProgress from '../public/progress.vue'
  import zanProduct from '../Sell/zan_product'
  import {loadData, defaultPreHandler} from '../../common/utils'
  import {createNamespacedHelpers} from 'vuex'
  const {mapMutations} = createNamespacedHelpers('order')

  export default {
    name: 'ProductCategory',
    components: {
      bottomNav,
      sellProgress,
      zanProduct
    },
    data () {
      return {
        servicePacksList: [],
        bottomNav: 'sales',
        isRedirect: false,
        pushName: this.$route.meta.pushName,
        query: {
          storeId: null,
          projectId: null
        },
        visiblePopup: false
      }
    },
    async created () {
      this.query.storeId = this.$route.query.store
      this.query.projectId = this.$route.query.project
      this.isRedirect = Boolean(this.$route.query.redirect)
      await this.getServicePacksList()
    },
    beforeRouteLeave (to, from, next) {
      if (this.visiblePopup) {
        this.visiblePopup = false
        next(false)
      } else {
        next()
      }
    },
    methods: {
      ...mapMutations(['removeOrderFilling']),
      listenContractsList: function (v) {
        this.visiblePopup = v
      },
      async getServicePacksList () {
        await loadData(() => {
          return api.getServicePacks(this.query)
        }, (data) => {
          this.servicePacksList = data
        }, defaultPreHandler)
      },
      goToPageSellProduct (servicePackId) {
        this.removeOrderFilling()
        this.$router.push({
          name: this.pushName,
          query: {
            storeId: this.query.storeId,
            projectId: this.query.projectId,
            servicePackId
          }
        })
      }
    }
  }
</script>
<style scoped>
  .list {
    margin-top: 40px;
  }

  .list_a {
    margin-bottom: 50px;
  }

  .item_container {
    background: #fff;
    font-size: 14px;
  }

  .item_container:not(:last-child)::after {
    content: " ";
    display: block;
    width: calc(100% - 15px);
    margin-left: 15px;
    height: 1px;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    background: #e5e5e5;
  }

  .p{
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }
</style>
