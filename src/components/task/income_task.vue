<template>
  <div class="TaskSchedule">
    <p class="p">任务名称</p>
    <ul class="des">
      <li>{{ task.taskName }}</li>
    </ul>
    <p class="p" v-if="task.taskDescription">任务描述</p>
    <ul class="des">
      <li v-if="task.taskDescription" v-html="task.taskDescription" class="description"></li>
    </ul>
    <p class="p" v-if="task.taskItems.length>0">
      <span>任务要求</span>
    </p>
    <div class="container" v-for="item in task.taskItems" :key="item.id">
      <mt-cell :title="item.name">
        <div>
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
    <p v-if="rewards.length > 0" class="p">任务成功</p>
    <ul class="reward">
      <li class="taskList">
        <span class="t-l f-s-10" v-for="reward in incomeRewards">
         <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }} 元</span>
          <span v-else class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }}/{{ reward.taskIncomeObject}}</span>
        </span>
      </li>
      <li v-for="task in incomeTask">
        <span @click="newTaskDetail(task.incomeValue)">
           <i class="iconfont icon-hongbao color_3" aria-hidden="true" slot="icon"></i>
          <span>{{task.taskName}}</span>
          <span>点击查看详情</span>
        </span>
      </li>
    </ul>
    <p v-if="amerce.length > 0" class="p">任务失败</p>
    <ul class="reward">
      <li class="taskList">
        <span class="t-l f-s-10" v-for="reward in amerceRewards">
          <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> -{{ reward.incomeValue }} 元</span>
          <span v-else class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i> -{{ reward.incomeValue }}/{{ reward.taskIncomeObject}}</span>
        </span>
      </li>
      <li v-for="task in amerceTask">
        <span @click="newTaskDetail(task.incomeValue)">
          <i class="iconfont icon-hongbao color_3" aria-hidden="true" slot="icon"></i>
          <span>{{task.taskName}}</span>
          <span>点击查看详情</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
  import _ from 'lodash'
  import { createNamespacedHelpers } from 'vuex'
  import {loadData} from '../../common/utils'

  const {mapState, mapActions} = createNamespacedHelpers('task')
  export default {
    name: 'IncomeTask',
    data () {
      return {
        taskId: null,
        task: {
          taskItems: [],
          taskName: ''
        },
        incomeRewards: [],
        incomeTask: [],
        rewards: [],
        amerce: [],
        amerceRewards: [],
        amerceTask: []
      }
    },
    async created () {
      this.taskId = this.$route.query.taskId
      await this.getTaskDetail(this.taskId)
      await this.rewardType()
      await this.amerceType()
    },
    methods: {
      ...mapActions(['rewardTask']),
      async getTaskDetail (id) {
        id = Number(id)
        if (!_.find(this.storeRewardTask, {taskId: id})) {
          await loadData(() => { return this.rewardTask(id) })
        }
        this.task = _.find(this.storeRewardTask, {taskId: id})
        this.rewards = this.task.reward
        this.amerce = this.task.amerce
      },
      async rewardType () {
        if (this.rewards) {
          this.incomeRewards = this.rewards.filter(function (arr) {
            return arr.taskIncomeObject !== '任务'
          })
          this.incomeTask = _.filter(this.rewards, {taskIncomeObject: '任务'})
          if (this.incomeTask.length > 0) {
            _.forEach(this.incomeTask, async (incomeTaskItem) => {
              let num = Number(incomeTaskItem.incomeValue)
              let find = _.find(this.storeRewardTask, {taskId: num})
              let task
              if (!find) {
                task = await this.rewardTask(incomeTaskItem.incomeValue)
              } else {
                task = find
              }
              _.assign(incomeTaskItem, {taskName: task.taskName})
            })
          }
        }
      },
      async amerceType () {
        if (this.amerce) {
          this.amerceRewards = this.amerce.filter(function (arr) {
            return arr.taskIncomeObject !== '任务'
          })
          this.amerceTask = _.filter(this.amerce, {taskIncomeObject: '任务'})
          if (this.amerceTask.length > 0) {
            _.forEach(this.amerceTask, async (amerceTaskItem) => {
              let num = Number(amerceTaskItem.incomeValue)
              let find = _.find(this.storeRewardTask, {taskId: num})
              let task
              if (!find) {
                task = await this.rewardTask(amerceTaskItem.incomeValue)
              } else {
                task = find
              }
              _.assign(amerceTaskItem, {taskName: task.taskName})
            })
          }
        }
      },
      async newTaskDetail (id) {
        await this.getTaskDetail(id)
        await this.rewardType()
        await this.amerceType()
      }
    },
    computed: {
      ...mapState({
        storeRewardTask: state => state.rewardTask
      })
    }
  }
</script>
<style scoped>
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
    margin: 50px auto 20px;
  }
</style>
