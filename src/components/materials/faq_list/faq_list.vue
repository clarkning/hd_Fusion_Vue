<template>
  <div class="faq" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="300">
    <div class="faqList" v-for="item in materials" @click="spreadDisplay(item.id)">
      <mt-cell :title="item.title">
        <i class="link"></i>
      </mt-cell>
      <div class="content display" v-html="item.content"></div>
    </div>
    <div v-if="materials.length === 0" class="null_data">
      <div class="null"></div>
      <p>亲，暂无常见问题哦~~</p>
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
    name: 'FaqList',
    data () {
      return {
        page: 1,
        materialType: 4,
        faListId: null,
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
      spreadDisplay () {
        let e = window.event
        if (e.currentTarget.lastChild.style.display === 'none' || !e.currentTarget.lastChild.style.display) {
          e.currentTarget.firstChild.getElementsByClassName('link')[0].style.transform = 'rotate(-45deg)'
          e.currentTarget.lastChild.style.display = 'block'
        } else {
          e.currentTarget.firstChild.getElementsByClassName('link')[0].style.transform = 'rotate(135deg)'
          e.currentTarget.lastChild.style.display = 'none'
        }
      },
      gettingMaterials () {
        this.materials = _.filter(this.$store.state.materials, {materialTypeCode: 4})
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
      },
      ...mapActions(['getMaterials'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    padding: 15px;
    background: #fdfdfd;
    font-size: 14px;
    line-height: 1.7;
    color: #888888;
    word-break: break-word;
  }

  .link {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(135deg);
    transition: all 0.35s
  }

  .display {
    display: none;
  }

  .mint-cell:before {
    content: " ";
    position: absolute;
    top: 47px;
    right: 0;
    height: 1px;
    border-top: 2px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
</style>
