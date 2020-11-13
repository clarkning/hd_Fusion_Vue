<template>
  <div class="TaskSchedule" v-if="detail.task.taskName">
    <div :class="{fixed}">
      <p class="p">任务名称</p>
      <ul class="des">
        <li>{{ detail.task.taskName }}</li>
      </ul>
      <p class="p" v-if="taskDetailDescription">任务时间</p>
      <ul class="des">
        <li v-if="detail.task.acceptEndTime && !detail.task.acceptStartTime">任务接受时间截止至{{detail.task.acceptEndTime}}</li>
        <li v-if="detail.task.acceptEndTime && detail.task.acceptStartTime">{{detail.task.acceptStartTime}} ~ {{detail.task.acceptEndTime}}</li>
        <li v-if="!detail.task.acceptEndTime && detail.task.acceptStartTime">接受时间开始于：{{detail.task.acceptStartTime}}</li>

        <li v-if="detail.finishDate && !detail.startDate"><p>任务截止至 {{ detail.finishDate }}</p></li>
        <li v-if="!detail.finishDate && detail.startDate"><p>任务开始于 {{ detail.startDate }}</p></li>
        <li v-if="detail.finishDate && detail.startDate"><p>{{ detail.startDate }} ~ {{detail.finishDate}}</p></li>
      </ul>
      <p class="p" v-if="detail.task.taskDescription">任务描述</p>
      <ul class="des">
        <li v-if="detail.task.taskDescription" v-html="detail.task.taskDescription" class="description"></li>
      </ul>
      <p class="p" v-if="detail.task.taskItems.length>0">
        <span v-if="detail.personTaskStatus">任务进度</span>
        <span v-else>任务要求</span>
        <span v-if="detail.personTaskStatus" class="f-r">{{ detail.task.finishRate }}%</span>
      </p>
      <div class="bg_img_none">
        <div class="container" v-for="item in detail.task.taskItems" :key="item.id">
          <mt-cell :title="item.name">
            <div v-if="detail.personTaskStatus">
              <span>{{ item.progress }}/{{ item.target }}</span>
              <span v-if="item.targetType === '销售量'">单</span>
              <span v-else>元</span>
            </div>
            <div v-else>
              <span>{{ item.target }}</span>
              <span v-if="item.targetType === '销售量'">单</span>
              <span v-else>元</span>
            </div>
          </mt-cell>
          <div v-if="item.taskItemAttributes">
            <div class="KeyWord" v-for="attr in item.taskItemAttributes">
              <div class="TaskItemAttributeKeyWord" slot="title">{{ attr.keyWord }}</div>
              <div class="Value">{{ attr.value }}</div>
            </div>
          </div>
        </div>
        <div v-if="showSubTask" @click = "goToPageSubTaskDetail()">
          <mt-cell title="下级任务进度" is-link></mt-cell>
        </div>
      </div>
      <p v-if="detail.task.reward.length > 0" class="p">任务达成</p>
      <ul class="reward">
        <li class="taskList">
        <span class="t-l f-s-10" v-for="reward in incomeRewards">
          <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }} 元</span>
          <span v-else class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i>  +{{ reward.incomeValue }}/{{ reward.taskIncomeObject}}</span>
        </span>
        </li>
        <li v-for="task in incomeTask">
        <span @click="goToPageIncomeTask(task.incomeValue)">
         <i class="iconfont icon-hongbao color_3" aria-hidden="true" slot="icon"></i>
          <span>{{task.taskName}}</span>
          <span>点击查看详情</span>
        </span>
        </li>
      </ul>
      <p v-if="detail.task.amerce.length > 0" class="p">任务失败</p>
      <ul class="reward">
        <li class="taskList">
        <span class="t-l f-s-10" v-for="reward in amerceRewards">
          <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> -{{ reward.incomeValue }} 元</span>
          <span v-else class="color_3"> <i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i>-{{ reward.incomeValue }}/{{reward.taskIncomeObject}}</span>
        </span>
        </li>
        <li v-for="task in amerceTask">
        <span @click="goToPageIncomeTask(task.incomeValue)">
         <i class="iconfont icon-hongbao color_3" aria-hidden="true" slot="icon"></i>
          <span>{{task.taskName}}</span>
          <span>点击查看详情</span>
        </span>
        </li>
        <div v-if="detail.personTaskStatus === '已领取奖励'" class="Receive"></div>
        <div v-if="detail.personTaskStatus === '失败'" class="over"></div>
      </ul>
    </div>
    <div class="mg" @touchstart="btnStart()" @touchend="btnEnd()">
      <mt-button v-if="detail.personTaskStatus === '进行中' && detail.task.taskType === '分解任务'" type="primary" size="large" @click="goToPageDecompositionTask()">分解任务</mt-button>
      <mt-button v-if="!detail.personTaskStatus" type="primary" size="large" @click="acceptableTask(detail.task.taskId)" :disabled="!accept">接受任务</mt-button>
      <mt-button v-if="detail.personTaskStatus === '达成'" type="primary" size="large" @click="taskIncome(detail.personTaskId)">领取奖励</mt-button>
    </div>
    <div class="mg" v-if="detail.personTaskStatus === '进行中' && detail.task.taskType === '普通任务'">
      <mt-button type="default" size="large" :disabled="true">领取奖励</mt-button>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import api from '../../api/index2'
  import moment from 'moment'
  import _ from 'lodash'
  import { Toast } from 'mint-ui'
  import {loadData, defaultPreHandler, boolPreHandler} from '../../common/utils'

  export default {
    name: 'TaskSchedule',
    data () {
      return {
        fixed: false,
        taskDetailDescription: false,
        taskId: null,
        personTaskId: null,
        content: '',
        incomeRewards: [],
        incomeTask: [],
        amerceRewards: [],
        amerceTask: [],
        showSubTask: false,
        accept: true,
        detail: {
          task: {
            taskName: null,
            taskItems: [],
            amerce: [],
            reward: []
          },
          personTaskStatus: null,
          progress: []
        }
      }
    },
    async created () {
      this.content = this.$route.query.content
      if (this.content === 'schedule') {
        this.personTaskId = Number(this.$route.query.personTaskId)
      } else {
        this.taskId = Number(this.$route.query.taskId)
      }
      await this.initList()
      await this.getTaskDetail()
      await this.rewards()
      await this.amerces()
      this.showDescription()
      await this.getSubTaskDetail()
      this.showSubTaskLink()
    },
    methods: {
      ...mapActions(['getOrganizationInfo', 'getSameInfo', 'getSubInfo']),
      ...mapActions('task', [
        'rewardTask',
        'afterTaskIncome',
        'getTaskListAcceptable',
        'getPersonTaskList',
        'getHomePersonTaskList',
        'getSubTask',
        'getDetail'
      ]),
      toastMsg (msg) {
        Toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
      },
      fishRate (object, task) {
        task.taskItems = _.filter(task.taskItems, (item) => {
          return item.target > 0
        })
        let finishRate = 0
        let weight = 1 / task.taskItems.length
        for (let taskItem of task.taskItems) {
          let number = _.find(object.progress, {taskItemId: taskItem.taskItemId}).progress || 0
          let rate = number / taskItem.target
          finishRate += weight * rate * 100
        }
        let notComplete = _.find(object.progress, (item) => {
          return item.status !== '达成'
        })
        if (finishRate < 100 && !notComplete) {
          finishRate = 100
        } else if (finishRate > 0 && finishRate < 1) {
          finishRate = 1
        } else {
          finishRate = parseInt(finishRate.toString())
        }
        _.assign(task, {finishRate})
      },
      showDescription () {
        let accept = this.detail.task.acceptEndTime || this.detail.task.acceptStartTime
        let person = this.detail.finishDate || this.detail.startDate
        this.taskDetailDescription = accept || person
        this.fixed = !this.detail.personTaskStatus || (this.detail.personTaskStatus === '进行中' && this.detail.task.taskType === '分解任务') || this.detail.personTaskStatus === '达成'
      },
      incomeData (object) {
        let amerce = _.filter(object.taskIncomes, {taskImcomeCondition: '任务失败后'})
        let reward = _.filter(object.taskIncomes, (item) => {
          return item.taskImcomeCondition === '任务达成后' && item.incomeValue > 0
        })
        _.assign(object, {reward, amerce})
      },
      async getTaskDetail () {
        if (this.content === 'schedule') {
          let personTaskItem = _.find(this.storePersonTask, { personTaskId: this.personTaskId })
          let detail = JSON.parse(JSON.stringify(personTaskItem))
          this.fishRate(detail, detail.task)
          _.forEach(detail.task.taskItems, item => {
            let progressItem = _.find(detail.progress, {taskItemId: item.taskItemId})
            let object = {
              status: progressItem.status,
              progress: progressItem.progress || 0
            }
            _.assign(item, object)
          })
          this.detail = detail
          this.detail.finishDate = this.detail.finishDate ? moment(this.detail.finishDate).format('YYYY-MM-DD HH:mm') : null
          this.detail.startDate = this.detail.startDate ? moment(this.detail.startDate).format('YYYY-MM-DD HH:mm') : null
        } else {
          this.accept = _.find(this.storeAcceptable, {taskId: this.taskId})
          if (this.accept) {
            let detail = _.find(this.storeDetails, {taskId: this.taskId})
            this.detail.task = JSON.parse(JSON.stringify(detail))
          } else {
            await loadData(() => { return api.getTaskDetail(this.taskId) }, detail => {
              this.incomeData(detail)
              this.detail.task = detail
            }, defaultPreHandler)
          }
          this.detail.task.acceptEndTime = this.detail.task.acceptEndTime ? moment(this.detail.task.acceptEndTime).format('YYYY-MM-DD HH:mm') : null
          this.detail.task.acceptStartTime = this.detail.task.acceptStartTime ? moment(this.detail.task.acceptStartTime).format('YYYY-MM-DD HH:mm') : null
        }
      },
      goToPageSubTaskDetail () {
        this.$router.push({
          name: 'SubTaskDetail',
          query: {
            personTaskId: this.personTaskId
          }
        })
      },
      showSubTaskLink () {
        if (this.detail.sameLevelSubTask) {
          let same = _.find(this.detail.sameLevelSubTask, item => {
            return item.taskStatus && item.taskStatus !== '新建'
          })
          let sub = _.find(this.detail.subLevelSubTask, item => {
            return item.taskStatus && item.taskStatus !== '新建'
          })
          this.showSubTask = same || sub
        }
      },
      async getSubTaskDetail () {
        if (this.detail.task.taskType === '分解任务' && this.detail.subPersonTaskIds.length > 0 && !this.detail.sameLevelSubTask) {
          await loadData(() => { return this.getOrganizationInfo(this.$store.state.person.personId) })
          let organizationId = _.find(this.$store.state.person.orgInfo, {partnerId: this.detail.partnerId}).organizationId
          await this.getSameInfo(organizationId)
          await this.getSubInfo(organizationId)
          let params = {
            subPersonTaskIds: this.detail.subPersonTaskIds,
            partnerId: this.detail.partnerId,
            taskId: this.detail.taskId
          }
          await this.getSubTask(params)
          this.getTaskDetail()
        }
      },
      async rewards () {
        if (this.detail.task.reward) {
          this.incomeRewards = _.filter(this.detail.task.reward, item => {
            return item.taskIncomeObject !== '任务'
          })
          this.incomeTask = _.filter(this.detail.task.reward, {taskIncomeObject: '任务'})
          if (this.incomeTask.length > 0) {
            for (let incomeTaskItem of this.incomeTask) {
              let find = _.find(this.storeRewardTask, (item) => {
                let num = Number(incomeTaskItem.incomeValue)
                return item.taskId === num
              })
              let task
              if (!find) {
                await loadData(() => { return this.rewardTask(incomeTaskItem.incomeValue) }, data => {
                  task = data
                })
              } else {
                task = find
              }
              Object.assign(incomeTaskItem, {taskName: task.taskName})
            }
          }
        }
      },
      async amerces () {
        if (this.detail.task.amerce) {
          this.amerceRewards = _.filter(this.detail.task.amerce, (item) => {
            return item.taskIncomeObject !== '任务'
          })
          this.amerceTask = _.filter(this.detail.task.amerce, {taskIncomeObject: '任务'})
          if (this.amerceTask.length > 0) {
            for (let amerceTaskItem of this.amerceTask) {
              let find = _.find(this.storeRewardTask, (item) => {
                let num = Number(amerceTaskItem.incomeValue)
                return item.taskId === num
              })
              let task
              if (!find) {
                await loadData(() => { return this.rewardTask(amerceTaskItem.incomeValue) }, data => {
                  task = data
                })
              } else {
                task = find
              }
              _.assign(amerceTaskItem, {taskName: task.taskName})
            }
          }
        }
      },
      btnStart () {
        if (this.accept) {
          let eve = window.event
          eve.target.style.background = '#265C98'
          eve.target.style.color = '#6B8D9B'
        }
      },
      btnEnd () {
        if (this.accept) {
          let eve = window.event
          eve.target.style.background = '#26a2ff'
          eve.target.style.color = '#fff'
        }
      },
      async acceptableTask (params) {
        await loadData(() => { return api.postTask(params) }, async (res) => {
          if (res) {
            this.accept = false
            await loadData(() => { return this.getTaskListAcceptable() })
            await loadData(() => { return this.getHomePersonTaskList(1) })
            this.toastMsg('请前往红包奖励-已接任务列表，查看任务进度')
          }
        }, boolPreHandler)
      },
      goToPageDecompositionTask () {
        this.$router.push({
          name: 'DecompositionTask',
          query: {
            partnerId: this.detail.partnerId,
            personTaskId: this.personTaskId
          }
        })
      },
      async taskIncome (personTaskId) {
        await loadData(() => { return api.taskIncome(personTaskId) }, async (res) => {
          if (res) {
            if (res) {
              await loadData(() => { return this.afterTaskIncome(personTaskId) })
              this.toastMsg('领取成功')
              this.getTaskDetail()
              if (this.incomeTask.length > 0) {
                await loadData(() => { return this.getHomePersonTaskList(1) })
                this.$router.go(-1)
              }
            }
          }
        }, boolPreHandler)
      },
      async initList () {
        let vue = this
        if (this.content === 'schedule') {
          let find = _.find(this.storePersonTask, {personTaskId: vue.personTaskId})
          if (!find) {
            let page = 1
            const list = async function () {
              await loadData(() => { return vue.getPersonTaskList(page) }, null, null, true)
              let detail = _.find(vue.storePersonTask, {personTaskId: vue.personTaskId})
              if (!detail) {
                page++
                await list()
              } else {
                let params = {
                  taskId: detail.taskId,
                  personTaskId: detail.personTaskId
                }
                await loadData(() => { return vue.getDetail(params) })
              }
            }
            await list()
          } else {
            let detail = _.find(this.storePersonTask, {personTaskId: this.personTaskId})
            if (!detail.task) {
              let params = {
                taskId: detail.taskId,
                personTaskId: detail.personTaskId
              }
              await loadData(() => { return this.getDetail(params) })
            }
          }
        }
        if (this.content === 'detail' && this.storeDetails.length === 0) {
          await loadData(() => { return this.getTaskListAcceptable() })
        }
      },
      goToPageIncomeTask (taskId) {
        this.$router.push({
          name: 'IncomeTask',
          query: {
            taskId
          }
        })
      }
    },
    computed: {
      ...mapState('task', {
        storeRewardTask: state => state.rewardTask,
        storeDetails: state => state.taskList.details,
        storeAcceptable: state => state.taskList.acceptable,
        storePersonTask: state => state.taskList.personTask
      })
    }
  }
</script>
<style scoped>
  .reward{
    position: relative;
  }
  .fixed{
    height: calc(100vh - 61px);
    overflow-y: scroll;
  }
  .container{
    background: #fff;
  }
  .KeyWord{
    display: table;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px 10px 35px;
    color: #888;
  }
  .TaskItemAttributeKeyWord{
    display: table-cell;
    vertical-align: text-top;
    width: 6rem;
  }
  .Value{
    display: table-cell;
    vertical-align: text-top;
  }
  .color{
    color: #26a2ff
  }
  .Receive {
    width: 90px;
    position: absolute;
    bottom: 1%;
    right: 2%;
  }

  .over {
    width: 90px;
    position: absolute;
    bottom: 1%;
    right: 2%;
  }

  .TaskSchedule {
    box-sizing: border-box;
    position: relative;
  }

  .p {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .des,
  .reward {
    padding: 0 15px;
    box-sizing: border-box;
    background: #fff;
    font-size: 14px;
  }

  .reward li {
    list-style: none;
    line-height: 2.5rem;
  }

  .des li{
    list-style: none;
    line-height: 2.5rem;
    font-size: 14px;
  }

  .reward .t-l {
    display: inline-block;
    padding-right: 10px;
  }

  .mg {
    width: 90%;
    margin: 10px auto;
  }
</style>
