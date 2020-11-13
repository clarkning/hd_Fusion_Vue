<template>
  <div class="bg">
    <div>
      <div class="choose_project_title">项目选择</div>
      <div v-if="project.listNone" class="null_data">
        <div class="null"></div>
        <p>暂无可选项目</p>
      </div>
      <div class="ChooseProject bg_img_none" v-else>
        <div>
          <div v-for="org in project.list" v-if="org.namePath">
            <div class="title">
              <mt-cell>
                <span slot="title">{{ org.namePath }}</span>
              </mt-cell>
            </div>
            <div class="choose clear" v-if="org.projectList.length > 0">
              <div class="pic" v-for="item in org.projectList"
                   @click="goToPage(org.organizationId, item.projectId, item.projectName)">
                <div><img class="img" :src="item.projectLogo"></div>
                <div>{{ item.projectName }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { loadData } from '../../common/utils'

  export default {
    name: 'choose',
    data () {
      return {
        project: {
          list: [],
          listNone: false
        }
      }
    },
    async created () {
      await loadData(() => { return this.getProject() })
      this.getProjectList()
      this.setNamePath()
    },
    methods: {
      ...mapActions(['getProject']),
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
        this.project.list = projectList.filter((item) => {
          return item.projectList.length > 0
        })
        this.project.listNone = this.project.list.length === 0
        this.redirect()
      },
      goToPage (store, project, projectName, redirect) {
        let query = {
          store,
          project,
          projectName,
          redirect
        }
        this.$emit('changeProject', query)
      },
      redirect () {
        let len = (this.project.list.length === 1 && this.project.list[0].projectList.length === 1)
        if (len) {
          let store = this.project.list[0].organizationId
          let project = this.project.list[0].projectList[0].projectId
          let projectName = this.project.list[0].projectList[0].projectName
          let redirect = true
          this.goToPage(store, project, projectName, redirect)
        }
      }
    }
  }
</script>
<style scoped>
  .bg {
    background: #ffffff;
    width: 100%;
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
  }
  .choose_project_title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
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
