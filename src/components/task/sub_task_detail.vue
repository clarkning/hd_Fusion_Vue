<template>
  <div class="TaskSchedule SubTaskDetail">
    <div class="case" v-for="(subTask) in sameLevelSubTask">
      <div class="subTask bg_img_none">
        <mt-cell>
          <span slot="title">{{subTask.personName}}<mt-badge size="normal" type="warning">{{ subTask.taskStatus }}</mt-badge></span>
          <span class="subTaskSpan">完成进度: {{ subTask.task.finishRate }}%</span>
        </mt-cell>
        <mt-cell>
          <span class="organizeTitle" slot="title">组织</span>
          <span class="organizeValue">{{ subTask.organizationNamePath }}</span>
        </mt-cell>
        <mt-cell>
          <span class="organizeTitle" slot="title">职位</span>
          <span class="organizeValue">{{ subTask.positionName }}</span>
        </mt-cell>
      </div>
      <div class="form">
        <div class="bg_img_none">
          <div v-for="task in subTask.task.taskItems" :key="task.id">
            <div class="bg_img_none">
              <mt-cell :title="task.name">
                <span class="fontfamily">{{task.target}}</span>
                <span class="fontfamily" v-if="task.targetType === '销售量'">单</span>
                <span class="fontfamily" v-else>元</span>
              </mt-cell>
            </div>
            <div class="bg_img_none computed">
              <mt-cell title="已完成">
                <div class="flex t-l">{{task.progressRate}}%</div>
                <div class="flex t-r">{{task.progress}}</div>
              </mt-cell>
            </div>
          </div>
        </div>
        <div class="bg_img_none" v-if="subTask.task.reward.length > 0">
          <mt-cell>
            <p slot="title">
            <span v-for="reward in subTask.task.reward" class="t-l w-3 f-s-10">
              <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }} 元</span>
              <span v-else class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }}/{{ reward.taskIncomeObject }}</span>
            </span>
            </p>
          </mt-cell>
        </div>
      </div>
    </div>

    <div v-infinite-scroll = "loadMore"
         infinite-scroll-disabled = "loading"
         infinite-scroll-distance = "300">
      <div class="case" v-for="subTask in showSubLevelSubTask" v-show="subTask.decomposition">
        <div class="subTask bg_img_none">
          <mt-cell>
            <span slot="title">{{subTask.personName}}<mt-badge size="normal" type="warning">{{ subTask.taskStatus }}</mt-badge></span>
            <span class="subTaskSpan">完成进度: {{ subTask.task.finishRate }}%</span>
          </mt-cell>
          <mt-cell>
            <span class="organizeTitle" slot="title">组织</span>
            <span class="organizeValue">{{ subTask.organizationNamePath }}</span>
          </mt-cell>
          <mt-cell>
            <span class="organizeTitle" slot="title">职位</span>
            <span class="organizeValue">{{ subTask.positionName }}</span>
          </mt-cell>
        </div>
        <div class="form">
          <div class="bg_img_none">
            <div v-for="task in subTask.task.taskItems" :key="task.id">
              <div class="bg_img_none">
                <mt-cell :title="task.name">
                  <span class="fontfamily">{{task.target}}</span>
                  <span class="fontfamily" v-if="task.targetType === '销售量'">单</span>
                  <span class="fontfamily" v-else>元</span>
                </mt-cell>
              </div>
              <div class="bg_img_none computed">
                <mt-cell title="已分配">
                  <div class="flex t-l">{{task.taskAllotRate}}%</div>
                  <div class="flex t-r">{{task.distribute}}</div>
                </mt-cell>
                <mt-cell title="已完成">
                  <div class="flex t-l">{{task.progressRate}}%</div>
                  <div class="flex t-r">{{task.progress}}</div>
                </mt-cell>
              </div>
            </div>
          </div>
          <div class="bg_img_none" v-if="subTask.task.reward.length > 0">
            <mt-cell>
              <p slot="title">
                <span v-for="reward in subTask.task.reward" class="t-l w-3 f-s-10">
                  <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }} 元</span>
                  <span v-else class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }}/{{ reward.taskIncomeObject }}</span>
                </span>
              </p>
            </mt-cell>
          </div>
        </div>
      </div>
    </div>
    <div class="load" v-show="loading">
      <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
      正在加载
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import _ from 'lodash'
  import {loadData} from '../../common/utils'

  export default {
    name: 'TaskSchedule',
    data () {
      return {
        personTaskId: null,
        sameLevelSubTask: [],
        subLevelSubTask: [],
        showSubLevelSubTask: [],
        detail: {
          task: {
            taskItems: [],
            amerce: [],
            reward: []
          },
          personTaskStatus: null,
          progress: []
        },
        noMore: true,
        loading: false
      }
    },
    async created () {
      this.personTaskId = Number(this.$route.query.personTaskId)
      await this.getTaskList()
      this.getTaskDetail()
      await loadData(() => { return this.getSubTaskDetail() })
      this.getTaskDetail()
      this.showSubTaskDetail()
      this.showSubLevelSubTask = this.subLevelSubTask.slice(0, 10)
    },
    methods: {
      ...mapActions(['getOrganizationInfo', 'getSameInfo', 'getSubInfo']),
      ...mapActions('task', [
        'getPersonTaskList',
        'getSubTask',
        'getDetail'
      ]),
      getTaskDetail () {
        let detail = _.find(this.storePersonTask, {personTaskId: this.personTaskId})
        this.detail = JSON.parse(JSON.stringify(detail))
      },
      showSubTaskDetail () {
        if (this.detail.sameLevelSubTask) {
          this.getSameLevelSubTask()
          this.getSubLevelSubTask()
        }
      },
      async getSubTaskDetail () {
        if (!this.detail.sameLevelSubTask && this.detail.task.taskType === '分解任务') {
          await this.getSubTaskPerson()
          let params = {
            subPersonTaskIds: this.detail.subPersonTaskIds,
            partnerId: this.detail.partnerId,
            taskId: this.detail.taskId
          }
          await this.getSubTask(params)
        }
      },
      async getSubTaskPerson () {
        await this.getOrganizationInfo(this.$store.state.person.personId)
        let organizationId = _.find(this.$store.state.person.orgInfo, {partnerId: this.detail.partnerId}).organizationId
        await this.getSameInfo(organizationId)
        await this.getSubInfo(organizationId)
      },
      taskProgress (detail) {
        for (let taskItem of detail.task.taskItems) {
          let progressItem = _.find(detail.progress, {taskItemId: taskItem.taskItemId})
          let distribute = parseInt(progressItem.distribute - progressItem.newDistribute || 0)
          let taskAllotRate = (distribute / taskItem.target) * 100
          let progress = progressItem.progress || 0
          let progressRate = (progress / taskItem.target) * 100
          if (taskAllotRate > 0 && taskAllotRate < 1) {
            taskAllotRate = 1
          } else {
            taskAllotRate = Math.floor(taskAllotRate)
          }
          if (progressRate > 0 && progressRate < 1) {
            progressRate = 1
          } else {
            progressRate = Math.floor(progressRate)
          }
          let obj = {
            status: progressItem.status,
            progress,
            progressRate,
            distribute,
            taskAllotRate
          }
          _.assign(taskItem, obj)
        }
      },
      getSameLevelSubTask () {
        let arr = this.detail.sameLevelSubTask.filter((item) => {
          return item.taskStatus && item.taskStatus !== '新建'
        })
        this.sameLevelSubTask = JSON.parse(JSON.stringify(arr))
        _.forEach(this.sameLevelSubTask, item => {
          this.taskProgress(item)
        })
      },
      getSubLevelSubTask () {
        let arr = this.detail.subLevelSubTask.filter((item) => {
          return item.taskStatus && item.taskStatus !== '新建'
        })
        this.subLevelSubTask = JSON.parse(JSON.stringify(arr))
        this.noMore = this.subLevelSubTask.length < 10
        _.forEach(this.subLevelSubTask, item => {
          this.taskProgress(item)
        })
      },
      async getTaskList () {
        if (_.isEmpty(this.storePersonTask)) {
          let page = 1
          let vue = this
          const list = async function () {
            await vue.getPersonTaskList(page)
            let detail = _.find(vue.storePersonTask, {personTaskId: vue.personTaskId})
            if (!detail) {
              page++
              await list()
            } else {
              let params = {
                taskId: detail.taskId,
                personTaskId: detail.personTaskId
              }
              await vue.getDetail(params)
            }
          }
          await list()
        }
      },
      loadMore () {
        if (this.noMore) return
        this.loading = true
        setTimeout(() => {
          let last = this.showSubLevelSubTask.length
          let end = last + 10
          this.noMore = this.subLevelSubTask.slice(last, end).length < 10
          this.showSubLevelSubTask.push(...this.subLevelSubTask.slice(last, end))
          this.loading = false
        }, 2000)
      }
    },
    computed: {
      ...mapState('task', {
        storePersonTask: state => state.taskList.personTask
      })
    }
  }
</script>
<style scoped>
  .organizeTitle{
    width: 5rem;
    display: inline-block;
  }
  .organizeValue{
    line-height: 1.7rem;
    text-align: right;
  }
  .w-3{
    display: inline-block;
    padding-right: 10px;
    line-height: 1.5;
  }
  .case{
    width: 95%;
    padding: 5px;
    border-radius: 5px;
    background: #fff;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .case{
    margin-top: 10px;
  }
  .case:last-child{
    margin-bottom: 10px;
  }
  .content span{
    font-size: 14px;
  }
  i{
    margin: 0 3px;
  }
  .title p{
    font-size: 14px;
    color: #888;
  }
  .subTaskSpan{
    color: #26a2ff;
    min-width: 5rem;
    text-align: right;
  }
  .flex{
    flex: 1;
    color: #888;
  }
  .fontfamily{
    font-weight: bold;
  }
</style>
