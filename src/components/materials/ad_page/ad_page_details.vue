<template>
  <div class="MaterialsDetail">
    <div class="title">{{detail.title}}</div>
    <div class="content" v-html="detail.content"></div>
  </div>

</template>

<script>
  import { mapActions } from 'vuex'
  import _ from 'lodash'
  import { loadData } from '../../../common/utils'

  export default {
    name: 'AdPageDetails',
    async created () {
      this.id = Number(this.$route.query.id)
      await this.initData()
      await this.getDetail()
    },
    data () {
      return {
        page: 1,
        materialType: 0,
        materials: [],
        id: null,
        detail: {}
      }
    },
    methods: {
      ...mapActions(['getMaterialsDetails', 'getMaterials']),
      async getDetail () {
        let find = _.find(this.$store.state.materials, {id: this.id}).content === ''
        if (find) {
          await loadData(() => { return this.getMaterialsDetails(this.id) })
        }
        this.detail = _.find(this.$store.state.materials, {id: this.id})
      },
      async initData () {
        this.getMaterials()
        let vue = this
        if (this.materials.length === 0) {
          let par = {
            page: this.page,
            materialType: this.materialType
          }
          const setList = async function () {
            await loadData(() => { return vue.getMaterials(par) })
            let find = _.find(vue.$store.state.materials, {id: vue.id})
            if (!find) {
              vue.page += 1
              await setList()
            }
          }
          await setList()
        }
      },
      getMaterials () {
        this.materials = _.filter(this.$store.state.materials, {materialTypeCode: 0})
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
