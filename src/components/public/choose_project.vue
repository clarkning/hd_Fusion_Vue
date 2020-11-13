<template>
  <div class="bg">
    <div v-show="showList">
      <div v-if="project.listNone" class="null_data">
        <div class="null"></div>
        <p>暂无可选项目</p>
      </div>
      <div class="ChooseProject bg_img_none" v-else>
        <div v-if="isSell">
          <sellProgress></sellProgress>
        </div>
        <div :class="{margin: isSell}">
          <div v-for="org in project.list" v-if="org.namePath">
            <div class="title">
              <mt-cell>
                <span slot="title">{{ org.namePath }}</span>
              </mt-cell>
            </div>
            <div class="choose clear" v-if="org.projectList.length > 0">
              <div class="pic" v-for="item in org.projectList" @click="goToPage(org.organizationId, item.projectId, org.partnerId)">
                <div><img class="img" :src="item.projectLogo"></div>
                <div>{{ item.projectName }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isSell">
      <bottomNav :select="bottomNav"></bottomNav>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { loadData } from '../../common/utils'
  import sellProgress from './progress.vue'
  import bottomNav from './bottom_nav.vue'

  export default {
    name: 'ChooseProject',
    components: {
      bottomNav,
      sellProgress
    },
    data () {
      return {
        isSell: false,
        isRanking: false,
        isReport: false,
        bottomNav: 'sales',
        project: {
          list: [],
          listNone: false
        },
        showList: false,
        pushName: ''
      }
    },
    async created () {
      this.setType()
      await loadData(() => { return this.getProject() })
      this.getProjectList()
      this.setNamePath()
      this.redirect()
    },
    methods: {
      ...mapActions(['getProject']),
      setType () {
        this.isSell = this.$route.name === 'ChooseProject'
        this.isRanking = this.$route.name === 'ChooseRankingProject'
        this.isReport = this.$route.name === 'ChooseReportProject'
        if (this.isSell) {
          this.pushName = this.$route.meta.pushName
        }
      },
      setNamePath () {
        for (let item of this.project.list) {
          if (item.organizationNamePath) {
            let index = item.organizationNamePath.indexOf('/')
            if (index !== -1) {
              item.namePath = item.organizationNamePath.slice(0, index)
            } else {
              item.namePath = item.organizationName
            }
          }
        }
      },
      getProjectList () {
        let projectList = []
        if (!this.isSell) {
          projectList = this.$store.state.project.filter((item) => {
            return item.projectList.length > 0
          })
        } else {
          for (let projectItem of this.$store.state.project) {
            if (projectItem.positionType) {
              let item = projectItem.positionType.split(',')
              let find = item.find((i) => {
                return i === '销售'
              })
              if (find) {
                projectList.push(projectItem)
              }
            }
          }
        }
        this.project.list = projectList.filter((item) => {
          return item.projectList.length > 0
        })
        this.project.listNone = this.project.list.length === 0
      },
      setGaDimension (organizationId, projectId) {
        try {
          let organization = this.project.list.find((item) => {
            return item.organizationId === organizationId
          })
          let project = organization.projectList.find((item) => {
            return item.projectId === projectId
          })
          this.$ga.set('dimension2', organization.namePath)
          this.$ga.set('dimension1', project.projectName)
          localStorage.setItem('dimension2', organization.namePath)
          localStorage.setItem('dimension1', project.projectName)
        } catch (error) {
          console.error(error)
        }
      },
      goToPage (store, project, partnerId) {
        this.setGaDimension(store, project)
        let query = {
          store,
          project
        }
        if (this.isRanking) {
          this.pushName = 'Ranking'
        } else if (this.isReport) {
          this.pushName = 'Overview'
          query.partnerId = partnerId
        }
        this.$router.push({
          name: this.pushName,
          query
        })
      },
      redirect () {
        let len = (this.project.list.length === 1 && this.project.list[0].projectList.length === 1)
        if (len) {
          let store = this.project.list[0].organizationId
          let project = this.project.list[0].projectList[0].projectId
          let partnerId = this.project.list[0].partnerId
          if (!this.isSell) {
            this.goToPage(store, project, partnerId)
          } else {
            this.setGaDimension(store, project)
            this.$router.replace({
              name: this.pushName,
              query: {
                store,
                project,
                redirect: true
              }
            })
          }
        } else {
          this.showList = true
        }
      }
    }
  }
</script>
<style scoped>
  .bg {
    background: #ffffff;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .margin {
    margin-top: 40px;
    margin-bottom: 60px;
  }

  .title {
    position: relative;
    z-index: 0;
  }

  .title:before {
    content: " ";
    position: absolute;
    top: 40px;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }

  .title span {
    font-size: 14px;
    color: #888;
  }

  .choose {
    padding-left: 15px;
  }

  .choose:not(:last-child) {
    padding-bottom: 15px;
  }

  .pic {
    box-sizing: border-box;
    width: calc((100% - 45px) / 3);
    float: left;
    margin-right: 15px;
    height: 110px;
    padding: 20px 15px 0;
    margin-bottom: 10px;
    background: #fff;
  }

  .img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }

  .pic div {
    text-align: center;
    font-size: 12px;
  }
</style>
