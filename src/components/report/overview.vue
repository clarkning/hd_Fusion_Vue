<template>
  <div class="overview">
    <div v-if="juniorAch.show" @click="goToPageJuniorAch()">
      <cell title="下级业绩" :total="juniorAch.total" :time="time"></cell>
    </div>
    <div @click="goToPageTeam()">
      <cell title="团队业绩" :total="teamTotal" :time="time"></cell>
    </div>
    <div v-if="myAch.show" @click="goToPageMyAch()">
      <cell title="我的业绩" :total="myAch.total" :time="time"></cell>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import api from '../../api/index2'
  import { loadData, defaultPreHandler } from '../../common/utils'
  import cell from './overview_cell'
  import _ from 'lodash'
  import { mapActions } from 'vuex'

  export default {
    name: 'Overview',
    components: {
      cell
    },
    data () {
      return {
        juniorAch: {
          show: false,
          total: '0'
        },
        myAch: {
          show: false,
          total: '0'
        },
        query: {
          startTime: '',
          endTime: '',
          partnerId: NaN,
          projectId: NaN,
          organizationId: NaN,
          personId: NaN,
          organizationScopes: '1,2',
          dimensions: '1,2,3,4,5',
          results: '1,2'
        },
        teamTotal: '0',
        time: ''
      }
    },
    async created () {
      await this.getOrganizationInfo()
      this.getTime()
      this.setQuery()
      await loadData(() => { return this.getData() })
    },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'ChooseReportProject') {
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
      ...mapActions(['getSubOrganizations', 'getPersonInfo', 'getProject']),
      async getOrganizationInfo () {
        await loadData(() => { return this.getProject() })
      },
      async getData () {
        await this.getTeamData()
        await this.getJuniorAchOrMyAch()
      },
      getTime () {
        this.time = moment().format('A h:mm')
        this.time = this.time.replace('AM', '上午')
        this.time = this.time.replace('PM', '下午')
      },
      setQuery () {
        this.query.startTime = moment().format('YYYY-MM-DD')
        this.query.endTime = moment().add(1, 'days').format('YYYY-MM-DD')
        this.query.partnerId = this.$route.query.partnerId
        this.query.projectId = this.$route.query.project
        this.query.organizationId = Number(this.$route.query.store)
        this.query.personId = this.$store.state.person.personId
      },
      async getTeamData () {
        await loadData(() => {
          return api.getReportForm(this.query)
        }, data => {
          let teamTotal = 0
          _.forEach(data, item => {
            teamTotal += item.resultData.salesAmount ? Number(item.resultData.salesAmount) : 0
          })
          this.teamTotal = (Math.round(teamTotal)).toLocaleString('en-US')
        }, defaultPreHandler, true)
      },
      async getJuniorAchOrMyAch () {
        await this.getSubOrganizations(this.query.organizationId)
        let find = _.find(this.$store.state.person.orgInfo, {organizationId: this.query.organizationId})
        if (!find) return
        let x = find.subOrganizations.length > 0
        let total = 0
        if (x) {
          this.query.organizationScopes = '2'
          this.query.dimensions = '4,5'
          await loadData(() => {
            return api.getReportForm(this.query)
          }, data => {
            _.forEach(data, item => {
              total += item.resultData.salesAmount ? Number(item.resultData.salesAmount) : 0
            })
            this.juniorAch.total = (Math.round(total)).toLocaleString('en-US')
            this.juniorAch.show = true
          }, defaultPreHandler, true)
        } else {
          this.query.organizationScopes = '1'
          this.query.dimensions = '6,7'
          let data
          await loadData(() => {
            return api.getReportForm(this.query)
          }, res => {
            data = res
          }, defaultPreHandler, true)
          await this.getPersonInfo(this.$store.state.person.personId)
          let find = _.find(data, (item) => {
            return item.resultDimension.personId === Number(this.$store.state.person.personId)
          })
          total = find
            ? find.resultData.salesAmount
              ? Number(find.resultData.salesAmount)
              : 0
            : 0
          this.myAch.total = (Math.round(total)).toLocaleString('en-US')
          this.myAch.show = true
        }
      },
      goToPageTeam () {
        this.$router.push({
          name: 'Team',
          query: {
            partnerId: this.query.partnerId,
            projectId: this.query.projectId,
            organizationId: this.query.organizationId
          }
        })
      },
      goToPageMyAch () {
        this.$router.push({
          name: 'MyAch',
          query: {
            partnerId: this.query.partnerId,
            projectId: this.query.projectId,
            organizationId: this.query.organizationId
          }
        })
      },
      goToPageJuniorAch () {
        this.$router.push({
          name: 'JuniorAch',
          query: {
            partnerId: this.query.partnerId,
            projectId: this.query.projectId,
            organizationId: this.query.organizationId
          }
        })
      }
    }
  }
</script>
<style scoped>
  .m_b {
    margin-bottom: 15px;
  }
</style>

