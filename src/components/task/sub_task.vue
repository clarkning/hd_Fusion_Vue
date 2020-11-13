<template>
  <div class="Subtask">
    <div class="bg_img_none">
      <mt-cell>
        <span class="organizeTitle" slot="title">{{ personName }}</span>
        <span class="organizeValue">{{ organizationName }}</span>
      </mt-cell>
    </div>
    <div class="title bg_img_none">
      <mt-cell>
        <p slot="title">任务</p>
      </mt-cell>
    </div>
    <div class="bg_img_none">
      <div class="form mb" v-for="task in taskItems">
        <mt-cell :title="task.name">
          <span>{{ task.distribute + (Number(task.inputValue) || 0) }}/ {{task.target}}</span>
          <span v-if="task.targetType === '销售量'">单</span>
          <span v-else>元</span>
        </mt-cell>
        <mt-field placeholder="请输入任务分配量，分配百分比可大于100%" type="number" v-model="task.inputValue"
                  :state="task.state"></mt-field>
      </div>
    </div>
    <div class="title bg_img_none" v-if="rewards.length > 0">
      <mt-cell>
        <p slot="title">奖励</p>
      </mt-cell>
    </div>
    <div class="bg_img_none inputReward clear">
      <div class="form mb" v-for="reward in rewards">
        <mt-field :label="reward.taskIncomeObject" :placeholder="'最多分配 ' + reward.rest" type="number"
                  v-model="reward.inputValue" :state="reward.state"></mt-field>
        <div class="displayNum">
          <mt-cell
            :value="(reward.rewardAllotValue + (Number(reward.inputValue) || 0)) + '/' + reward.incomeValue"></mt-cell>
        </div>
      </div>
    </div>
    <div class="mg" @touchstart="btnStart()" @touchend="btnEnd()">
      <mt-button type="primary" size="large" @click="noNull()">保存</mt-button>
    </div>
  </div>
</template>
<script>
  import api from '../../api/index2'
  import { mapState, mapActions } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import _ from 'lodash'
  import { loadData, boolPreHandler } from '../../common/utils'

  export default {
    name: 'Subtask',
    data () {
      return {
        taskId: null,
        same: false,
        personTaskId: null,
        personName: '',
        personId: null,
        organizationName: '',
        taskItems: [],
        rewards: [],
        btn: true
      }
    },
    async created () {
      this.same = Number(this.$route.query.same)
      this.taskId = Number(this.$route.query.taskId)
      this.personId = Number(this.$route.query.personId)
      await loadData(() => {
        return this.initData()
      })
      this.getTaskDetail()
    },
    methods: {
      ...mapActions(['getOrganizationInfo', 'getSameInfo', 'getSubInfo']),
      ...mapActions('task', [
        'afterDistribute',
        'getSubTask',
        'getPersonTaskList',
        'getDetail'
      ]),
      taskProgress (detail) {
        _.forEach(detail.task.taskItems, (item) => {
          let progress = _.find(detail.progress, {taskItemId: item.taskItemId})
          let distribute = parseInt(progress.distribute || 0)
          _.assign(item, {distribute})
        })
      },
      btnStart () {
        let eve = window.event
        eve.target.style.background = '#265C98'
        eve.target.style.color = '#6B8D9B'
      },
      btnEnd () {
        let eve = window.event
        eve.target.style.background = '#3396E4'
        eve.target.style.color = '#fff'
      },
      incomeRewardAllotValue (array, incomeObject) {
        let rewardAllotValue = 0
        _.forEach(array, item => {
          if (item.task) {
            let reward = item.task.reward
            let num
            let incomeValue = _.find(reward, {taskIncomeObject: incomeObject})
            if (incomeValue) {
              num = Number(incomeValue.incomeValue)
            } else {
              num = 0
            }
            rewardAllotValue += num
          }
        })
        return rewardAllotValue
      },
      getTaskDetail () {
        let arr = _.find(this.storePersonTask, {taskId: this.taskId})
        let detail = JSON.parse(JSON.stringify(arr))
        this.taskProgress(detail)
        this.personTaskId = detail.personTaskId
        this.taskItems = this.copyArr(detail.task.taskItems)
        let rewards = this.copyArr(detail.task.reward)
        this.rewards = _.filter(rewards, (income) => {
          return income.taskIncomeObject !== '任务'
        })
        _.forEach(this.rewards, item => {
          let sameRewardAllotValue = this.incomeRewardAllotValue(detail.sameLevelSubTask, item.taskIncomeObject)
          let subRewardAllotValue = this.incomeRewardAllotValue(detail.subLevelSubTask, item.taskIncomeObject)
          let rewardAllotValue = sameRewardAllotValue + subRewardAllotValue
          let rest = item.incomeValue - rewardAllotValue
          let obj = {
            rewardAllotValue,
            rest
          }
          _.assign(item, obj)
        })
        if (this.same === 1) {
          let subTask = _.find(detail.sameLevelSubTask, {personId: this.personId})
          this.personName = subTask.personName
          this.organizationName = subTask.organizationNamePath
          this.personId = subTask.personId
        } else {
          let subTask = _.find(detail.subLevelSubTask, {personId: this.personId})
          this.personName = subTask.personName
          this.organizationName = subTask.organizationNamePath
          this.personId = subTask.personId
        }
      },
      async initData () {
        await this.getOrganizationInfo(this.$store.state.person.personId)
        if (_.isEmpty(this.storePersonTask)) {
          let page = 1
          let vue = this
          const list = async function () {
            await vue.getPersonTaskList(page)
            let detail = _.find(vue.storePersonTask, {taskId: vue.taskId})
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
          let detail = _.find(this.storePersonTask, {taskId: this.taskId})
          let organizationId = _.find(this.$store.state.person.orgInfo, {partnerId: detail.partnerId}).organizationId
          await this.getSameInfo(organizationId)
          await this.getSubInfo(organizationId)
          let params = {
            subPersonTaskIds: detail.subPersonTaskIds,
            partnerId: detail.partnerId,
            taskId: this.taskId
          }
          await this.getSubTask(params)
        }
      },
      copyArr (arr) {
        return arr.map((e) => {
          if (typeof e === 'object') {
            return Object.assign({
              inputValue: '',
              state: ''
            }, e)
          } else {
            return e
          }
        })
      },
      noNull () {
        function s (single) {
          return Number(single.inputValue) === 0
        }

        let result
        if (this.rewards.length > 0) {
          result = this.taskItems.every(s) || this.rewards.every(s)
        } else {
          result = this.taskItems.every(s)
        }
        if (result) {
          MessageBox({
            title: '提示',
            message: '请分配至少一项任务（或奖励）'
          })
        } else {
          this.verification()
        }
      },
      verification () {
        _.forEach(this.rewards, item => {
          if (item.inputValue === '') {
            item.inputValue = '0'
          }
          item.inputValue = item.inputValue.replace(/\D/g, '')
          if ((Number(item.inputValue) > Number(item.rest) || Number(item.inputValue) < 0)) {
            item.state = 'error'
          } else {
            item.state = 'success'
          }
        })
        _.forEach(this.taskItems, item => {
          if (item.inputValue === '') {
            item.inputValue = '0'
          }
          item.inputValue = item.inputValue.replace(/\D/g, '')
          if (Number(item.inputValue) < 0) {
            item.state = 'error'
          } else {
            item.state = 'success'
          }
        })

        function s (single) {
          return single.state === 'error'
        }

        let result = !this.taskItems.find(s) && !this.rewards.find(s)
        if (result) {
          this.prompt()
        }
      },
      prompt () {
        let vue = this
        let personName = '<div class="t-l">将为 ' + this.personName + ' 分配以下任务</div>'
        let task = '<div class="t-l weight">任务分配</div>'
        let reward = '<div class="t-l weight">奖励分配</div>'
        _.forEach(this.taskItems, taskItem => {
          let item = '<div class="t-l mg-left">' + taskItem.name + '：' + Number(taskItem.inputValue) + '</div>'
          task += item
        })
        _.forEach(this.rewards, rewardItem => {
          let item = '<div class="t-l mg-left">' + rewardItem.taskIncomeObject + '：' + Number(rewardItem.inputValue) + '</div>'
          reward += item
        })
        let message
        if (this.rewards.length > 0) {
          message = personName + task + reward
        } else {
          message = personName + task
        }
        MessageBox.confirm(message).then(() => {
          vue.submit()
        })
      },
      async submit () {
        if (!this.btn) return
        this.btn = false
        let vue = this
        let rewards = []
        let taskItems = []
        _.forEach(this.rewards, rewardItem => {
          let item = {
            taskIncomeObject: rewardItem.taskIncomeObject,
            incomeValue: Number(rewardItem.inputValue),
            taskImcomeCondition: rewardItem.taskImcomeCondition
          }
          rewards.push(item)
        })
        _.forEach(this.taskItems, taskItem => {
          let item = {
            taskItemId: taskItem.taskItemId,
            targetType: taskItem.targetType,
            target: Number(taskItem.inputValue),
            rowNumber: taskItem.rowNumber
          }
          taskItems.push(item)
        })
        let params = {
          personTaskId: this.personTaskId,
          personId: this.personId,
          taskIncomes: rewards,
          taskItems: taskItems
        }
        await loadData(() => {
          return api.postSubTask(params)
        }, async (res) => {
          if (res) {
            let afterDistributeParams = {
              personTaskId: vue.personTaskId,
              same: vue.same
            }
            await vue.afterDistribute(afterDistributeParams)
            vue.$router.go(-1)
          }
        }, boolPreHandler)
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
  .displayNum {
    float: right;
    display: inline-block;
    text-align: right;
  }

  .organizeTitle {
    width: 7rem;
    display: inline-block;
  }

  .organizeValue {
    line-height: 1.7rem;
    text-align: right;
  }

  .mb:not(:last-child) {
    margin-bottom: 10px;
  }

  .mb {
    line-height: 0;
  }

  .Subtask {
    box-sizing: border-box;
  }

  .form {
    background: #fff;
  }

  .mg {
    width: 95%;
    margin: 50px auto 20px;
  }

  p {
    font-size: 14px;
    color: #888;
  }
</style>
