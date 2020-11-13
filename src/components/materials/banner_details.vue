<template>
  <div class="MaterialsDetail">
    <div class="title">{{detail.title}}</div>
    <div class="content" v-html="detail.content"></div>
  </div>

</template>

<script>
  import {mapActions} from 'vuex'
  import {loadData} from '../../common/utils'
  import _ from 'lodash'

  export default {
    name: 'BannerDetails',
    data () {
      return {
        bannerId: null,
        detail: {},
        bannerList: [],
        page: 1,
        materialType: 3
      }
    },
    async created () {
      this.bannerId = Number(this.$route.query.bannerId)
      await this.getBannerData()
      await this.getBannerDetail()
    },
    methods: {
      ...mapActions(['getMaterials']),
      async getBannerDetail () {
        let find = _.find(this.$store.state.materials, {id: this.bannerId}).content !== ''
        if (!find) {
          await this.$store.dispatch('getMaterialsDetails', this.bannerId)
        }
        this.detail = _.find(this.$store.state.materials, {id: this.bannerId})
      },
      async getBannerData () {
        this.getBannerList()
        let vue = this
        if (_.isEmpty(this.bannerList)) {
          let par = {
            page: this.page,
            materialType: this.materialType
          }
          const list = async function () {
            await loadData(() => {
              vue.getMaterials(par)
            })
            let find = _.find(vue.$store.state.materials, {id: this.bannerId})
            if (!find) {
              vue.page += 1
              await list()
            }
          }
          await list()
        }
      },
      getBannerList () {
        this.bannerList = _.filter(this.$store.state.materials, {materialTypeCode: 3})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .MaterialsDetail {
    text-align: center;
    padding: 15px;
  }

  .MaterialsDetail .title {
    font-size: 22px;
    line-height: 2;
  }

</style>
