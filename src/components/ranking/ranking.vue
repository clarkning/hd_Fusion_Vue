<template>
  <div class="Ranking bg_img_none">
    <div class="title" v-if="personList.length > 0">
      <mt-cell><p slot="title">个人销售排行榜</p></mt-cell>
    </div>
    <div class="content">
      <div class="week" v-for="item in personList" @click="goToPagePersonRanking(item.reportConfigId)">
        <mt-cell is-link>
          <div slot="title">
            <span class="mint-cell-text">
              <span class="name">{{ item.name }}</span>
              <span class="label" v-if="item.reportType === 10">({{ rankings.weekTime }})</span>
              <span class="label" v-else>({{ rankings.monthTime }})</span>
            </span>
            <span class="mint-cell-label">{{ item.description }}</span>
          </div>
        </mt-cell>
      </div>
    </div>
    <div class="title bg_img_none" v-if="storeList.length > 0">
      <mt-cell><p slot="title">店面龙虎榜</p></mt-cell>
    </div>
    <div class="content">
      <div class="week" v-for="item in storeList" @click="goToPagePersonRanking(item.reportConfigId)">
        <mt-cell is-link>
          <div slot="title">
            <span class="mint-cell-text">
              <span class="name">{{ item.name }}</span>
              <span class="label" v-if="item.reportType === 10">({{ rankings.weekTime }})</span>
              <span class="label" v-else>({{ rankings.monthTime }})</span>
            </span>
            <span class="mint-cell-label">{{ item.description }}</span>
          </div>
        </mt-cell>
      </div>
    </div>
    <div class="null_data" v-if="showNull">
      <div class="null"></div>
      <p>暂无排行</p>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import api from '../../api/index2'
  import { loadData, defaultPreHandler } from '../../common/utils'

  export default {
    name: 'Ranking',
    data () {
      return {
        showNull: false,
        rankings: {
          weekTime: {},
          monthTime: {},
          reportConfigs: []
        },
        personList: [],
        storeList: [],
        storeId: '',
        project: ''
      }
    },
    async created () {
      await this.getOrganizationInfo()
      await this.getList()
    },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'ChooseRankingProject') {
        let projectList = this.$store.state.project
          .filter((item) => {
            return item.projectList.length > 0
          })
        let projectInfo = projectList[0].projectList
        if (projectList.length === 1 && projectInfo.length === 1) {
          next(false)
          this.$router.go(-2)
        } else {
          next()
        }
      } else {
        next()
      }
    },
    methods: {
      ...mapActions(['getProject']),
      async getOrganizationInfo () {
        await loadData(() => { return this.getProject() })
      },
      goToPagePersonRanking (reportConfigId) {
        this.$router.push({
          name: 'PersonRanking',
          query: {
            reportConfigId,
            store: this.storeId,
            project: this.project
          }
        })
      },
      async getList () {
        this.storeId = Number(this.$route.query.store)
        this.project = Number(this.$route.query.project)
        let obj = {
          storeId: this.storeId,
          projectId: this.project
        }
        await loadData(() => {
          return api.getRankings(obj)
        }, (rankings) => {
          this.rankings = rankings
          this.showNull = this.rankings.reportConfigs.length === 0
        }, defaultPreHandler)
        for (let reportConfigsItem of this.rankings.reportConfigs) {
          if (reportConfigsItem.summaryType === 210) {
            this.personList.push(reportConfigsItem)
          } else if (reportConfigsItem.summaryType === 110 || reportConfigsItem.summaryType === 120) {
            this.storeList.push(reportConfigsItem)
          }
        }
      }
    }
  }
</script>
<style scoped>
  .title p{
    font-size: 14px;
    color: #888;
  }
  .week:not(:last-child)::after {
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
    background: #fff;
  }
  .label{
    color: #888;
    font-size: 12px;
    margin-top: 6px;
  }
  .name{
    margin-right: 10px;
  }
</style>
