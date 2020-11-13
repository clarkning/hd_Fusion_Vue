<template>
  <div class="hb_licence bg_img_none" v-show="licenceContent">
    <div class="box" v-html="licenceContent"></div>
  </div>
</template>
<script>
  import api from '../../../api/index2'
  import {loadData, defaultPreHandler} from '../../../common/utils'

  export default {
    name: 'Licence',
    data () {
      return {
        licenceId: NaN,
        licenceContent: ''
      }
    },
    async created () {
      this.licenceId = Number(this.$route.query.licenceId)
      await this.getLicence()
    },
    methods: {
      async getLicence () {
        await loadData(() => {
          return api.getLicenceBySku(this.licenceId)
        }, data => {
          this.licenceContent = data
        }, defaultPreHandler)
      }
    }
  }
</script>
<style scoped>
  .box{
    background: #fff;
    padding: 15px;
  }
</style>
