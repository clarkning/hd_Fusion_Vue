<template>
  <div class="PersonRanking bg_img_none" v-if="isOk">
    <div class="report_hd" v-if="rankingDetail.currentRanking">
      <div class="report_bd">
        <div class="rank" v-if="rankingDetail.currentRanking.rankNumber <= rankingDetail.reportConfig.rankingNumber">{{rankingDetail.currentRanking.rankNumber}}<em>名</em></div>
        <div class="rank_2" v-else>未进入榜单</div>

        <div v-if="rankingDetail.reportConfig.summaryValue === 10" class="name">
          <span v-if="rankingDetail.reportConfig.summaryType === 210">{{rankingDetail.currentRanking.name}}</span>
          <span v-if="rankingDetail.reportConfig.summaryType !== 210">{{rankingDetail.currentRanking.display}}</span>
          <em>{{rankingDetail.currentRanking.value}}</em>单</div>

        <div v-if="rankingDetail.reportConfig.summaryValue === 20" class="name">
          <span v-if="rankingDetail.reportConfig.summaryType === 210">{{rankingDetail.currentRanking.name}}</span>
          <span v-if="rankingDetail.reportConfig.summaryType !== 210">{{rankingDetail.currentRanking.display}}</span>
          <em>￥{{rankingDetail.currentRanking.value}}</em></div>

      </div>
      <div class="report_img"><img src="../../../static/Ranking_1.png" width="52%"></div>
    </div>

    <div v-infinite-scroll = "loadMore"
         infinite-scroll-disabled = "loading"
         infinite-scroll-distance = "300">
      <div class="flex" v-for="(item, index) in showList" :key="index">
          <div class="img">
            <div class="ranking_number" v-if="item.rankNumber > 3">{{ item.rankNumber }}</div>
            <img v-else :src="'../../../static/' + item.rankNumber + '.png'" width="44" />
          </div>
          <div class="content">
            <mt-cell>
              <span slot="title">
                <span class="mint-cell-text clear">
                  <span v-if="rankingDetail.reportConfig.summaryType === 210" class="f-l">{{item.name}}</span>
                  <span v-if="rankingDetail.reportConfig.summaryType !== 210" class="f-l">{{item.display}}</span>
                  <span class="f-r" v-if="rankingDetail.reportConfig.summaryValue === 10">{{item.value}}单</span>
                  <span class="f-r" v-else>￥{{item.value}}</span>
                </span>
                <span v-if="rankingDetail.reportConfig.summaryType === 210" class="mint-cell-label">{{item.display}}</span>
                <span v-if="rankingDetail.reportConfig.summaryType !== 210" class="mint-cell-label">
                  <mt-progress :value="item.progress" :bar-height="5"></mt-progress>
                </span>
              </span>
            </mt-cell>
          </div>
        </div>
    </div>

    <div class="load" v-show="loading">
      <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
      正在加载
    </div>

    <div class="update_time" v-show="noMore">
      <p class="page__desc">每日0:00进行统计</p>
    </div>
  </div>

  <div class="update_time" v-else>
    <p class="page__desc">每日0:00进行统计</p>
  </div>
</template>
<script>
  import api from '../../api/index2'
  import { loadData, defaultPreHandler } from '../../common/utils'
  export default {
    name: 'PersonRanking',
    data () {
      return {
        showList: [],
        rankingDetail: {
          rankingList: []
        },
        noMore: true,
        loading: false,
        storeId: '',
        project: '',
        isOk: true
      }
    },
    async created () {
      this.storeId = this.$route.query.store
      this.project = this.$route.query.project
      this.reportConfigId = this.$route.query.reportConfigId
      await this.getPersonRankingList()
    },
    methods: {
      loadMore () {
        if (this.noMore) return
        this.loading = true
        let last = this.showList.length
        let end = last + 50
        this.noMore = this.rankingDetail.rankingList.slice(last, end).length < 50
        this.showList.push(...this.rankingDetail.rankingList.slice(last, end))
        this.loading = false
      },
      async getPersonRankingList () {
        let obj = {
          reportConfigId: this.reportConfigId,
          storeId: this.storeId,
          projectId: this.project
        }
        await loadData(() => {
          return api.getRankingDetail(obj)
        }, (data) => {
          this.rankingDetail = data
        }, defaultPreHandler)
        if (this.rankingDetail.rankingList.length > 0) {
          this.manipulationData()
        }
        this.showList = this.rankingDetail.rankingList.slice(0, 50)
        this.noMore = this.showList.length < 50
        this.isOk = this.showList.length > 0
      },
      manipulationData () {
        for (let ranking of this.rankingDetail.rankingList) {
          if (this.rankingDetail.maxValue) {
            let progress
            if (this.rankingDetail.maxValue > 0) {
              progress = Math.floor(ranking.value / this.rankingDetail.maxValue * 100)
              if (progress === 0 && ranking.value > 0) {
                progress = 1
              }
            } else {
              if (ranking.value > 0) {
                progress = 100
              } else {
                progress = 0
              }
            }
            ranking.progress = progress
          }
          if (this.rankingDetail.reportConfig.confusionType === 0) {
            ranking.display = ranking.storeNames.join()
          } else if (this.rankingDetail.reportConfig.confusionType === 10) {
            let arr = ranking.storeNames.slice(0, 5).map((item) => {
              return item.length > 5 ? item.slice(0, 5) + '***' : item
            })
            ranking.display = arr.join(',')
          }
        }
        if (this.rankingDetail.currentRanking) {
          if (this.rankingDetail.reportConfig.confusionType === 0) {
            this.rankingDetail.currentRanking.display = this.rankingDetail.currentRanking.storeNames.join()
          } else if (this.rankingDetail.reportConfig.confusionType === 10) {
            let arr = this.rankingDetail.currentRanking.storeNames.slice(0, 5).map((item) => {
              return item.length > 5 ? item.slice(0, 5) + '***' : item
            })
            this.rankingDetail.currentRanking.display = arr.join(',')
          }
        }
      }
    }
  }
</script>
<style scoped>
  .img{
    margin-left: 10px;
  }
  .img img{
    vertical-align: middle;
  }
  .flex{
    display: flex;
    padding: 10px 0;
    background: #fff;
    position: relative;
  }
  .flex:not(:last-child)::after{
    position: absolute;
    bottom: 0;
    content: " ";
    display: block;
    width: calc(100% - 15px);
    margin-left: 15px;
    height: 1px;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    background: #e5e5e5;
  }
  .content{
    flex: 1;
  }
  .mint-cell{
    min-height: 44px !important;
  }
  .report_hd {
    width: 100%;
    background-size: 100%;
    overflow: hidden;
    text-align: center;
    position: relative;
    height: 205px;
    z-index: -2;
    display: block;
    background: url("../../../static/Ranking_2.png")no-repeat center bottom #26a2ff;
    background-size: 100%;
  }
  .report_hd .report_bd em {
    font-style: normal;
    font-size: 12px
  }
  .report_hd .report_bd {
    text-align: center;
    overflow: hidden;
    color: #26a2ff;
    z-index: 99 !important;
    margin-top: 78px;
  }
  .report_hd .report_bd .name {
    font-size: 13px;
    color: #fff;
    margin-top: 40px;
  }
  .report_hd .report_bd .name em{
    font-size: 17px;
    margin-left: 10px;
  }
  .report_hd .report_bd .rank {
    font-size: 30px;
  }
  .report_hd .report_bd .rank_2 {
    font-size: 16px;
    padding: 7px 0;
  }
  .report_hd .report_bd .zuzhi_name {
    font-size: 13px
  }
  .report_img {
    margin: auto;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -140px;
    z-index: -1;
  }
  .ranking_number {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: block;
    text-align: center;
    line-height: 40px;
    color: #26a2ff;
    font-size: 20px;
  }
  .update_time {
    text-align: center;
    width: 100%;
    color: #888888;
    font-size: 13px;
  }
  .update_time .page__desc {
    padding: 20px;
    text-align: center !important;
  }
</style>
