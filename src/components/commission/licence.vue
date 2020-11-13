<template>
  <div class="licence">
    <h3>{{licenceDetail.title}}</h3>
    <div class="content" v-html="licenceDetail.content"></div>
  </div>
</template>

<script>
  import api from '../../api/index2'
  import { loadData, defaultPreHandler } from '../../common/utils'

  export default {
    // 劳务合同
    name: 'LicenceDetail',
    data () {
      return {
        licenceDetail: {
          title: '',
          content: ''
        },
        licenceId: null
      }
    },
    async created () {
      await loadData(() => {
        return api.getLicenceDetail(this.$route.query.licenceId)
      }, (licenceDetail) => {
        this.licenceDetail = licenceDetail
      }, defaultPreHandler)
    }
  }
</script>

<style scoped>
  .licence {
    background: #ffffff;
    position: absolute;
    width: 100%;
    min-height: 100%;
  }

  h3 {
    text-align: center;
    line-height: 2.5;
    font-size: 16px;
    padding: 15px 0;
  }

  .content {
    color: #666666;
    font-size: 14px;
    padding: 0 20px;
  }
</style>
