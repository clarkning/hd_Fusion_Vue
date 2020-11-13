<template>
  <div>
    <BottomNav :select="selected"></BottomNav>
    <!--swipe-->
    <yd-slider autoplay="4000">
      <yd-slider-item v-for="banner in bannerList" :key="banner.id">
        <img @click="goToPageBannerDetail(banner.id)" :src="banner.logoUrl" width="100%"/>
      </yd-slider-item>
    </yd-slider>

    <!--nav-->
    <div class="home_nav">
      <mt-navbar class="fs-navbar">
        <mt-tab-item id="1">
          <div class="top_nav" @click="goToPageTaskList()">
            <span class="home_nav_span nav_msg_span">
              <i class="iconfont icon-hongbao fs-2s-2 color_3" aria-hidden="true"></i>
              <mt-badge type="error" class="nav_msg" size="small"
                        v-if="acceptable.length > 0">{{acceptable.length}}</mt-badge>
            </span>
            <span class="fs-navbar-tit">红包奖励</span>
          </div>
        </mt-tab-item>
        <mt-tab-item id="2">
          <div class="top_nav" @click="goToPageChooseRankingProject()">
            <span class="home_nav_span"><i class="iconfont icon-paiming fs-2s-2 color_2" aria-hidden="true"></i></span>
            <span class="fs-navbar-tit">销售排名</span>
          </div>
        </mt-tab-item>
        <mt-tab-item id="3">
          <div class="top_nav" @click="goToPageOrderInfo()">
            <span class="home_nav_span"><i class="iconfont icon-dingdan1 fs-1l color_1" aria-hidden="true"></i></span>
            <span class="fs-navbar-tit">历史订单</span>
          </div>
        </mt-tab-item>
        <mt-tab-item id="4">
          <div class="top_nav" @click="goToPageMessageList()">
          <span class="home_nav_span nav_msg_span">
            <i class="iconfont icon-xiaoxi1 fs-2s-2 color_4" aria-hidden="true"></i>
            <mt-badge type="error" class="nav_msg" size="small"
                      v-if="unReads.length > 0 && $store.state.messageTotal > 0">{{$store.state.messageTotal}}</mt-badge>
          </span>
            <span class="fs-navbar-tit">最新消息</span>
          </div>
        </mt-tab-item>
      </mt-navbar>
      <mt-navbar class="fs-navbar">
        <mt-tab-item id="5">
          <div class="top_nav" @click="goToPageChooseReportProject()">
            <span class="home_nav_span"><i class="iconfont icon-baoxiutongji fs-2s color_1"
                                           aria-hidden="true"></i></span>
            <span class="fs-navbar-tit">统计报表</span>
          </div>
        </mt-tab-item>
        <mt-tab-item id="6" v-if="show">
          <div class="top_nav" @click="goToContractInquiry()">
            <span class="home_nav_span"><i class="iconfont icon-weixiu fs-2s color_4" aria-hidden="true"></i></span>
            <span class="fs-navbar-tit">出险核销</span>
          </div>
        </mt-tab-item>
        <!--培训-->
        <mt-tab-item id="7">
          <div class="top_nav" @click="goToPageSalesSkills()">
            <span class="home_nav_span nav_msg_span">
            <i class="iconfont icon-peixunxuanchuan fs-2s color_3" aria-hidden="true"></i>
            </span>
            <span class="fs-navbar-tit">培训</span>
          </div>
        </mt-tab-item>

        <!--售后逸mp-->
        <mt-tab-item id="8" v-if="showRecycleEntry">
          <div class="top_nav" @click="goToPageServiceCatalog()">
            <span class="home_nav_span nav_msg_span">
            <i class="iconfont icon-huishou fs-2s color_2" aria-hidden="true"></i>
            </span>
            <span class="fs-navbar-tit">维修回收</span>
          </div>
        </mt-tab-item>

      </mt-navbar>
    </div>

    <div v-if="unReads.length > 0">
      <div class="fv_title">消息列表</div>
      <MessageList></MessageList>
    </div>
    <div v-if="personTask.length > 0">
      <div class="fv_title">任务列表</div>
      <TaskList class="hm_taskList"></TaskList>
    </div>
    <div v-if="unReads.length === 0 && personTask.length === 0 " class="null_data">
      <div class="null"></div>
      <p>亲，暂无内容哦~~</p>
    </div>
  </div>

</template>

<script>
  import BottomNav from './public/bottom_nav.vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { loadData } from '../common/utils'
  import _ from 'lodash'
  import moment from 'moment'
  import MessageList from './message/message'
  import TaskList from './task/task_list'

  export default {
    name: 'Home',
    components: {
      BottomNav,
      MessageList,
      TaskList
    },
    data () {
      return {
        selected: 'home',
        bannerList: [],
        page: 1,
        unRead: [],
        materialType: 3,
        acceptable: [],
        personTask: [],
        show: '',
        showItem: '',
        showRecycleEntry: '', // 是否显示 维修回收 入口
        menuControlEnum: {
          '维修回收': 2
        }
      }
    },
    async created () {
      this.getBannerList()
      this.authority()
      if (_.isEmpty(this.bannerList)) {
        let par = {
          page: this.page,
          materialType: this.materialType
        }
        await loadData(() => {
          return this.getMaterials(par)
        }, null, null, true)
        this.getBannerList()
      }
      let param = {
        page: this.page,
        read: false
      }
      let msg = _.isEmpty(this.$store.state.messages)
      if (msg) {
        await this.getMessageList(param)
      }
      await loadData(() => {
        return this.getTasks()
      }, null, null, true)
    },
    computed: {
      unReads () {
        return _.filter(this.$store.state.messages, {status: false})
      },
      ...mapState('task', {
        storeAcceptable: state => state.taskList.acceptable,
        storePersonTask: state => state.taskList.personTask
      }),
      ...mapState({
        storeAuthorityList: state => state.authorityList
      })
    },
    methods: {
      ...mapMutations('task', ['setTaskListNav']),
      ...mapMutations('order', ['setHistoryOrderNav']),
      ...mapActions(['getMaterials', 'getMessageList', 'getAuthorityList']),
      ...mapActions('task', ['getHomePersonTaskList', 'getTaskListAcceptable']),
      getAcceptable () {
        this.acceptable = JSON.parse(JSON.stringify(this.storeAcceptable))
        let arr = []
        _.forEach(this.acceptable, (item) => {
          if (!item.acceptEndTime && !item.acceptStartTime) {
            arr.push(item)
          } else {
            let more = true
            let less = true
            if (item.acceptEndTime) {
              less = moment().isBefore(item.acceptEndTime)
            }
            if (item.acceptStartTime) {
              more = moment().isAfter(item.acceptStartTime)
            }
            if (less && more) {
              arr.push(item)
            }
          }
        })
        this.acceptable = JSON.parse(JSON.stringify(arr))
      },
      async getTasks () {
        let taskA = this.storeAcceptable.length === 0
        if (taskA) {
          await this.getTaskListAcceptable()
        }
        this.getAcceptable()
        await this.getHomePersonTaskList()
        this.personTask = this.storePersonTask
      },
      async authority () {
        await this.getAuthorityList()
        this.show = _.find(this.storeAuthorityList.content, (item) => {
          return item === 0
        })
        if (this.show === 0) {
          this.show = true
        }
        this.showItem = _.find(this.storeAuthorityList.content, (item) => {
          return item === 1
        })
        if (this.showItem === 1) {
          this.showItem = true
        }
        this.showRecycleEntry = _.find(this.storeAuthorityList.content, (item) => {
          return item === this.menuControlEnum.维修回收
        })
        if (this.showRecycleEntry === this.menuControlEnum.维修回收) {
          this.showRecycleEntry = true
        }
      },
      getBannerList () {
        this.bannerList = _.filter(this.$store.state.materials, {materialTypeCode: 3})
      },
      goToPageMessageList: function () {
        this.$router.push({
          name: 'Message',
          query: {}
        })
      },
      goToPageTaskList: function () {
        this.setTaskListNav('acceptable')
        this.$router.push({
          name: 'TaskList',
          query: {}
        })
      },
      goToPageBannerDetail: async function (bannerId) {
        let res = _.find(this.$store.state.materials, {id: bannerId})
        if (res.contentType === '富文本') {
          this.$router.push({
            name: 'BannerDetails',
            query: {
              bannerId
            }
          })
        } else if (res.contentType === 'Url') {
          if (res.id === bannerId) {
            window.location.href = res.content
          }
        }
      },
      goToPageChooseReportProject: function () {
        this.$router.push({
          name: 'ChooseReportProject'
        })
      },
      goToContractInquiry: function () {
        this.$router.push({
          name: 'insuranceClaim',
          query: {}
        })
      },
      goToPageSalesSkills: function () {
        this.$router.push({
          name: 'SalesSkills',
          query: {}
        })
      },
      goToPageServiceCatalog: function () {
        this.$router.push({
          name: 'recycle',
          query: {}
        })
      },
      goToPageChooseRankingProject () {
        this.$router.push({
          name: 'ChooseRankingProject'
        })
      },
      goToPageOrderInfo () {
        this.setHistoryOrderNav('csoOrder')
        this.$router.push({
          name: 'MyOrder',
          query: {}
        })
      },
      goToMiniProgram () {
        this.$router.push({
          name: 'index',
          query: {}
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../common/ydui.base.css';

  .home_nav {
    background: #ffffff;
  }

  .hm_message {
    max-height: 375px;
    overflow: hidden;
  }

  .hm_taskList {
    margin-bottom: 70px
  }

  .nav_msg_span {
    position: relative
  }

  .nav_msg {
    padding: 1px 4px;
    font-size: 12px;
    position: absolute;
    left: 20px;
    top: -2px;
  }

  .fa-4x {
    font-size: 1.8em;
    margin-top: 3px;
  }

  .home_nav_span {
    width: 2.5em;
    height: 2.2em;
    display: inline-block;
  }

  .home_task {
    margin-bottom: 70px;
  }

  .label span {
    margin-right: 4%;
  }

  .connected span {
    display: inline-block;
    width: 100%;
  }

  .fustion_box {
    width: 100%;
    height: 200px;
  }

  .fustion_box img {
    height: 200px;
  }

  .fs-navbar {
    z-index: 9999;
  }

  @media screen and (width: 768px) {
    .fustion_box {
      width: 100%;
      height: 350px;
    }

    .fustion_box img {
      height: 350px;
    }
  }

  @media screen and (width: 1024px) {
    .fustion_box {
      width: 100%;
      height: 450px;
    }

    .fustion_box img {
      height: 450px;
    }

  }

  .fs-navbar .fs-navbar-tit {
    display: block;
    padding-top: 5px;
  }

  .home_msg {
    margin-top: 10px;
    background: #ffffff
  }

  .home_msg .mint-cell {
    text-align: left;
  }

  .pro .t-c {
    color: #888;
    text-decoration: none;
  }

  .mint-tab-item-label .fs-navbar-tit {
    font-size: 14px;
  }

  .mint-navbar .mint-tab-item {
    padding: 0px;
    width: 25%;
    flex: none;
  }

  .top_nav {
    padding: 10px 0
  }

  .mint-tab-item:active {
    background: #E5E5E5;
  }

  @media only screen and (max-width: 320px) and (max-height: 568px) {
    .fustion_box {
      height: 170px;
    }

    .fustion_box img {
      height: 170px;
    }
  }
</style>
