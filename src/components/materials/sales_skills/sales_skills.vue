<template>
  <div class="faq" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="300">
    <mt-navbar v-model="selected" class="fad-header">
      <mt-tab-item id="1">延保资料</mt-tab-item>
      <mt-tab-item id="2">在线学习</mt-tab-item>
      <mt-tab-item id="3">销售技巧</mt-tab-item>
      <mt-tab-item id="4">常见问题</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" class="tab-container">
      <!--延保资料-->
      <mt-tab-container-item id="1">
        <adPage></adPage>
      </mt-tab-container-item>
      <!--在线学习-->
      <mt-tab-container-item id="2">
        <classRoom></classRoom>
      </mt-tab-container-item>
      <!--销售技巧-->
      <mt-tab-container-item id="3">
        <div class="faqList" v-for="item in materials" @click="spreadDisplay(item.id)">
          <mt-cell :title="item.title">
            <i class="link"></i>
          </mt-cell>
          <div v-if="item.contentType !== 'Url'" class="content display" v-html="item.content"></div>
          <div v-else class="content display"><a :href="item.content">{{item.content}}</a></div>
        </div>
        <div v-if="materials.length === 0" class="null_data">
          <div class="null"></div>
          <p>亲，暂无销售技巧哦~~</p>
        </div>
        <div v-else>
          <div class="load noMore" v-show="noMore">已无更多</div>
          <div class="load" v-show="loading">
            <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
            正在加载
          </div>
        </div>
      </mt-tab-container-item>
      <!--常见问题-->
      <mt-tab-container-item id="4">
        <FaqList></FaqList>
      </mt-tab-container-item>
    </mt-tab-container>


  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import _ from 'lodash'
  import { loadData } from '../../../common/utils'
  import FaqList from '../faq_list/faq_list.vue'
  import classRoom from '../classroom/classroom.vue'
  import adPage from '../ad_page/ad_page.vue'
  export default {
    name: 'SalesSkills',
    components: {
      FaqList,
      classRoom,
      adPage
    },
    data () {
      return {
        selected: '1',
        page: 1,
        materialType: 2,
        salesSkillId: null,
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
        this.materials = _.filter(this.$store.state.materials, {materialTypeCode: 2})
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
    word-wrap: break-word;
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

  .fad-header{
    margin-bottom: 5px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
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
  .tab-container{
    margin-top: 57px;
  }
</style>
