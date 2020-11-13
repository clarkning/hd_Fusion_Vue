<template>
  <div></div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'haoBaiCustomerPurchase',
    data () {
      return {
        personId: null,
        project: null,
        store: null,
        agentId: null
      }
    },
    created () {
      this.agentId = this.$route.query.agentId
      this.personId = this.$route.query.personId
      localStorage.setItem('agentId', this.agentId)
      localStorage.setItem('zanPersonId', this.personId)
      this.project = this.$route.query.project
      this.store = this.$route.query.store
      if (this.project && this.store && this.personId && this.agentId) {
        this.goToPageProductCategory()
      } else {
        Toast({
          message: '网络忙，请稍后再试!',
          position: 'middle',
          duration: 1000
        })
      }
    },
    methods: {
      goToPageProductCategory: function () {
        this.$router.replace({
          name: 'hbProductCategory',
          query: {
            store: this.store,
            project: this.project
          }
        })
      }
    }
  }
</script>
