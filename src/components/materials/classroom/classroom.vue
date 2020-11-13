<template>
  <div class="classroom">
    <ul class="content" v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="300">
      <li class="col-6" v-for="item in materials" @click="showClassRoomDetail(item.id)">
        <mt-badge class="ongoing" size="small" type="warning">独播</mt-badge>
        <div class="img"><img :src="item.logoUrl" width="100%"/></div>
        <div class="title">{{item.title}}</div>
      </li>
    </ul>
    <div v-if="materials.length === 0" class="null_data">
      <div class="null"></div>
      <p>亲，暂无学习视频哦~~</p>
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
    name: 'classroom',
    data () {
      return {
        page: 1,
        materialType: 1,
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
      ...mapActions(['getMaterials']),
      gettingMaterials () {
        this.materials = _.filter(this.$store.state.materials, {materialTypeCode: 1})
      },
      showClassRoomDetail: async function (id) {
        let mate = this.$store.state.materials
        _.forEach(mate, function (value) {
          if (value.id === id) {
            window.location.href = value.content
          }
        })
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
            this.noMore = this.materials.length < (16 * param.page)
          })
        this.loading = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    padding: 5px;
    overflow: hidden;
  }

  .classroom {
    overflow: hidden;
  }

  .content li {
    position: relative;
    list-style-type: none;
  }

  .content .title {
    padding: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  .content .img img {
    border-radius: 5px;
    display: block;
  }

  .ongoing {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
  }
</style>
