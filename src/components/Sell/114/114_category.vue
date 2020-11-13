<template>
  <div class="Category">
    <mt-radio
      title="请选择品类"
      v-model="optionsId"
      :options="options">
    </mt-radio>
  </div>
</template>
<script>
  import api from '../../../api/index2'
  import { loadData, defaultPreHandler } from '../../../common/utils'
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapMutations } = createNamespacedHelpers('order')

  export default {
    name: 'hbCategory',
    data () {
      return {
        sku: null,
        category: [],
        options: [],
        optionsId: ''
      }
    },
    async created () {
      this.sku = this.$route.query.sku
      this.optionsId = this.categoryId ? this.categoryId.toString() : ''
      await this.getCategoryList()
    },
    methods: {
      ...mapMutations(['setBrandValue', 'setCategoryValue', 'setExpand']),
      async getCategoryList () {
        await loadData(() => {
          return api.activateCategories(this.sku)
        }, (data) => {
          this.category = data
          for (let item of data) {
            let object = {
              label: item.categoryName,
              value: item.categoryId.toString()
            }
            this.options.push(object)
          }
        }, defaultPreHandler)
      },
      setCategory () {
        if (Number(this.optionsId) !== this.categoryId) {
          let value = this.category.find((item) => { return item.categoryId === Number(this.optionsId) })
          let params = {
            value,
            isJumpingCategory: this.storeOrderFilling.category.isJumpingCategory
          }
          this.setCategoryValue(params)
          this.setBrandValue()
          this.setExpand([])
          this.$router.go(-1)
        }
      }
    },
    computed: {
      ...mapState({
        storeOrderFilling: state => state.orderFilling,
        categoryId: state => state.orderFilling.category.value.categoryId
      })
    },
    watch: {
      'optionsId': 'setCategory'
    }
  }
</script>
