<template>
  <div class="Materials" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="300">
    <ul>
      <li class="media" v-for="item in materials"
          @click="goToPageAdPageDetails(item.id, item.contentType, item.content)">
        <div class="media-left">
          <img class="media-object" :src="item.logoUrl" width="100%"/>
        </div>
        <div class="media-body">
          <div class="media-heading">{{item.title}}</div>
          <div class="time">{{item.createTime.slice(0, 10)}}</div>
        </div>
      </li>
    </ul>
    <div v-if="materials.length === 0" class="null_data">
      <div class="null"></div>
      <p>亲，暂无延保单页哦~~</p>
    </div>
    <div v-else>
      <div class="load noMore" v-show="noMore">已无更多</div>
      <div class="load" v-show="loading">
        <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
        正在加载
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import _ from 'lodash'
  import { loadData } from '../../../common/utils'

  export default {
    name: 'AdPage',
    data () {
      return {
        page: 1,
        materialType: 0,
        materials: [],
        noMore: true,
        loading: false
      }
    },
    async created () {
      let param = {
        page: this.page,
        materialType: this.materialType
      }
      this.gettingMaterials()
      if (this.materials.length === 0) {
        this.page = 1
        await loadData(() => { return this.getMaterials(param) })
        this.gettingMaterials()
      } else {
        this.page = Math.ceil(this.materials.length / 16)
      }
      this.noMore = this.materials.length < (16 * this.page)
    },
    methods: {
      gettingMaterials () {
        this.materials = _.filter(this.$store.state.materials, {materialTypeCode: 0})
      },
      goToPageAdPageDetails: async function (id, contentType, content) {
        if (contentType === '富文本') {
          this.$router.push({
            name: 'AdPageDetails',
            query: {
              id: id
            }
          })
        } else if (contentType === 'Url') {
          window.location.href = content
        }
      },
      async loadMore () {
        if (this.noMore) return
        this.loading = true
        this.page += 1
        let param = {
          page: this.page,
          materialType: this.materialType
        }
        await this.getMaterials(param)
          .then(() => {
            this.gettingMaterials()
            this.noMore = this.materials.length < (16 * this.page)
          })
          .catch(() => {
            this.noMore = true
          })
        this.loading = false
      },
      ...mapActions(['getMaterials'])
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
