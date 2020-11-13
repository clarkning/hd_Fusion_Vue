<template>
  <div class="taskList bg_img_none">
    <mt-navbar v-model="selected" :fixed="true" class="navbar_box" v-show="!home">
      <mt-tab-item id="acceptable">可接任务</mt-tab-item>
      <mt-tab-item id="personTask">已接任务</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" :class="{task_tab_box: !home}">
      <mt-tab-container-item id="acceptable">
        <div class="table" v-for="n in acceptable" @click="goToPageTaskDetail(n.taskId)">
          <mt-cell :title="n.taskName"></mt-cell>
          <div class="min_height_30 color999">
            <mt-cell v-if="n.acceptEndTime && !n.acceptStartTime" title="接受时间截止至" :value="n.acceptEndTime"></mt-cell>
            <mt-cell v-if="n.acceptEndTime && n.acceptStartTime"
                     :title="n.acceptStartTime+' ~ '+n.acceptEndTime"></mt-cell>
            <mt-cell v-if="!n.acceptEndTime && n.acceptStartTime" title="接受时间开始于" :value="n.acceptStartTime"></mt-cell>
          </div>
          <mt-cell>
            <div class="label" slot="title">
              <span class="t-l" v-for="reward in n.reward">
                <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }} 元</span>
                <span v-else-if="reward.taskIncomeObject === '任务'" class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i> +1 个</span>
                <span v-else class="color_1"><i class="iconfont icon-jingyan" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }}</span>
              </span>
            </div>
          </mt-cell>
        </div>
        <div v-if="acceptable.length === 0" class="null_data">
          <div class="null"></div>
          <p>亲，暂无可接任务哦~~</p>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="personTask">
        <div v-if="personTask.list.length > 0" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="personTask.loading"
             infinite-scroll-distance="300">
          <div class="table" v-for="n in personTask.list" @click="goToPageTaskSchedule(n.personTaskId)">
            <mt-cell :title="n.task.taskName"></mt-cell>
            <div class="min_height_30 color999">
              <mt-cell v-if="n.finishDate && !n.startDate" title="结束时间" :value="n.finishDate"></mt-cell>
              <mt-cell v-if="n.finishDate && n.startDate" :title="n.startDate+' ~ '+n.finishDate"></mt-cell>
              <mt-cell v-if="!n.finishDate && n.startDate" title="开始时间" :value="n.startDate"></mt-cell>
            </div>
            <div class="min_height_30">
              <mt-cell>
                <div slot="title">
                  <mt-progress :value="n.task.finishRate" :bar-height="5"></mt-progress>
                </div>
                <div>进度: {{ n.task.finishRate}}%</div>
              </mt-cell>
            </div>
            <div class="reward">
              <mt-cell>
                <div class="label" slot="title">
                  <span class="t-l" v-for="reward in n.task.reward">
                <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }} 元</span>
                <span v-else-if="reward.taskIncomeObject === '任务'" class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i> +1 个</span>
                <span v-else class="color_1"><i class="iconfont icon-jingyan" aria-hidden="true" slot="icon"></i> +{{ reward.incomeValue }}</span>
                  </span>
                </div>
                <mt-button v-if="n.personTaskStatus === '进行中' && n.task.taskType === '分解任务'"
                           @click.stop="goToPageDecompositionTask(n.partnerId,n.personTaskId)" type="primary"
                           size="small" plain>分解任务
                </mt-button>
                <mt-button v-if="n.personTaskStatus === '达成'" @click.stop="taskIncome(n.personTaskId)" type="primary"
                           size="small">领取奖励
                </mt-button>
                <mt-button v-if="n.personTaskStatus === '进行中' && n.task.taskType === '普通任务'" type="default" size="small"
                           :disabled="true">领取奖励
                </mt-button>
              </mt-cell>
            </div>
            <div class="Receive" v-if="n.personTaskStatus==='已领取奖励'"></div>
            <div class="over" v-if="n.personTaskStatus==='失败'"></div>
          </div>
          <div v-if="!home">
            <div class="load noMore" v-show="personTask.noMore && !personTask.loading">已无更多</div>
            <div class="load" v-show="personTask.loading">
              <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
              正在加载
            </div>
          </div>
        </div>
        <div v-else class="null_data">
          <div class="null"></div>
          <p>亲，尚未接受任务哦~~</p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import api from '../../api/index2'
  import moment from 'moment'
  import _ from 'lodash'
  import { Toast } from 'mint-ui'
  import { createNamespacedHelpers } from 'vuex'
  import { loadData, boolPreHandler } from '../../common/utils'

  const {mapState, mapMutations, mapActions} = createNamespacedHelpers('task')

  export default {
    name: 'TaskList',
    data () {
      return {
        selected: 'acceptable',
        home: true,
        acceptable: [],
        personTask: {
          list: [],
          loading: false,
          noMore: true,
          page: 1
        }
      }
    },
    async created () {
      await this.initSelected()
      this.acceptableSort()
      this.acceptableDisplay()
    },
    methods: {
      ...mapMutations(['setTaskListNav']),
      ...mapActions(['afterTaskIncome', 'getTaskListAcceptable', 'getPersonTaskList', 'getDetail', 'getHomePersonTaskList']),
      async getPersonTask () {
        await this.getPersonTaskList(this.personTask.page)
        this.personTask.loading = true
        let list = []
        if (this.home && this.storePersonTask.length > 5) {
          list = JSON.parse(JSON.stringify(this.storePersonTask.slice(0, 5)))
        } else {
          list = JSON.parse(JSON.stringify(this.storePersonTask.slice(10 * (this.personTask.page - 1), 10 * this.personTask.page)))
        }
        for (let item of list) {
          item.finishDate = item.finishDate ? moment(item.finishDate).format('YYYY-MM-DD HH:mm') : ''
          item.startDate = item.startDate ? moment(item.startDate).format('YYYY-MM-DD HH:mm') : ''
          if (!_.find(this.personTask.list, {personTaskId: item.personTaskId})) {
            if (!_.find(this.storePersonTaskDetail, {taskId: item.taskId})) {
              let params = {
                taskId: item.taskId,
                personTaskId: item.personTaskId
              }
              await this.getDetail(params)
            }
            let detail = JSON.parse(JSON.stringify(_.find(this.storePersonTaskDetail, {taskId: item.taskId})))
            detail.taskItems = _.filter(detail.taskItems, taskItem => {
              return taskItem.target > 0
            })
            let finishRate = 0
            let weight = 1 / detail.taskItems.length
            for (let taskItem of detail.taskItems) {
              let progressItem = _.find(item.progress, {taskItemId: taskItem.taskItemId})
              let number = progressItem ? progressItem.progress : 0
              let rate = number / taskItem.target
              if (rate > 1) {
                rate = 1
              }
              finishRate += (weight * rate * 100)
            }
            let notComplete = _.find(item.progress, (p) => {
              return p.status !== '达成'
            })
            if (finishRate > 100 || !notComplete) {
              finishRate = 100
            } else if (finishRate > 0 && finishRate < 1) {
              finishRate = 1
            } else {
              finishRate = parseInt(finishRate.toString())
            }
            _.assign(detail, {finishRate})
            item.task = detail
          }
        }
        this.personTask.list.push(...list)
        this.personTask.loading = false
        this.personTask.noMore = list < 10
      },
      async initSelected () {
        this.home = window.location.hash === '#/home'
        if (this.home) {
          this.selected = 'personTask'
        } else {
          this.selected = this.storeTaskListNav
        }
        if (this.selected === 'acceptable' && this.storeAcceptable.length === 0) {
          await loadData(() => { return this.getTaskListAcceptable() })
        }
      },
      toastMsg (msg) {
        Toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
      },
      acceptableSort () {
        this.acceptable = JSON.parse(JSON.stringify(this.storeAcceptable))
        this.acceptable.sort(function (x, y) {
          return y.taskId - x.taskId
        })
      },
      acceptableDisplay () {
        let arr = []
        _.forEach(this.acceptable, (item) => {
          if (!item.acceptEndTime && !item.acceptStartTime) {
            arr.push(item)
          } else {
            let more = true
            let less = true
            if (item.acceptEndTime) {
              item.acceptEndTime = moment(item.acceptEndTime).format('YYYY-MM-DD HH:mm')
              less = moment().isBefore(item.acceptEndTime)
            }
            if (item.acceptStartTime) {
              item.acceptStartTime = moment(item.acceptStartTime).format('YYYY-MM-DD HH:mm')
              more = moment().isAfter(item.acceptStartTime)
            }
            if (less && more) {
              arr.push(item)
            }
          }
        })
        this.acceptable = JSON.parse(JSON.stringify(arr))
      },
      async loadMore () {
        if ((this.personTask.loading || this.personTask.noMore) || (this.selected !== 'personTask' || this.home)) return
        this.personTask.loading = true
        this.personTask.page += 1
        await this.getPersonTask()
      },
      goToPageTaskSchedule (personTaskId) {
        this.$router.push({
          name: 'TaskSchedule',
          query: {
            personTaskId,
            content: 'schedule'
          }
        })
      },
      goToPageTaskDetail (taskId) {
        this.$router.push({
          name: 'TaskSchedule',
          query: {
            taskId,
            content: 'detail'
          }
        })
      },
      async taskIncome (personTaskId) {
        let res
        await loadData(
          () => { return api.taskIncome(personTaskId) },
          v => { res = v },
          boolPreHandler,
          true
        )
        if (res) {
          await loadData(() => { return this.afterTaskIncome(personTaskId) })
          await this.rewardTask(personTaskId)
          this.toastMsg('领取成功')
          let find = _.find(this.personTask.list, {personTaskId})
          let task = _.find(this.storePersonTask, {personTaskId})
          task.finishDate = task.finishDate ? moment(task.finishDate).format('YYYY-MM-DD HH:mm') : ''
          task.startDate = task.startDate ? moment(task.startDate).format('YYYY-MM-DD HH:mm') : ''
          Object.assign(find, task)
        }
      },
      async rewardTask (personTaskId) {
        let task = _.find(this.personTask.list, {personTaskId})
        let find = _.find(task.task.reward, {taskIncomeObject: '任务'})
        if (find) {
          this.personTask.page = 1
          await loadData(() => { return this.getHomePersonTaskList(1) })
          this.personTask.list = []
          this.getPersonTask()
        }
      },
      goToPageDecompositionTask (partnerId, personTaskId) {
        this.$router.push({
          name: 'DecompositionTask',
          query: {
            partnerId,
            personTaskId
          }
        })
      }
    },
    computed: {
      ...mapState({
        storePersonTask: state => state.taskList.personTask,
        storeAcceptable: state => state.taskList.acceptable,
        storeTaskListNav: state => state.taskListNav,
        storePersonTaskDetail: state => state.taskList.details
      })
    },
    watch: {
      'selected': async function (status) {
        this.setTaskListNav(status)
        if (status === 'acceptable') {
          if (this.storeAcceptable.length === 0) {
            await loadData(() => { return this.getTaskListAcceptable() })
          }
          this.acceptableSort()
          this.acceptableDisplay()
        }
        if (status === 'personTask') {
          if (_.isEmpty(this.personTask.list)) {
            await loadData(() => { return this.getPersonTask() })
          }
        }
        if (this.home && this.storePersonTask.length > 5) {
          this.personTask.list = this.personTask.list.slice(0, 5)
        }
      }
    }
  }
</script>
<style scoped>
  .label .t-l {
    display: inline-block;
    padding-right: 7px;
    line-height: 1.5;
    font-size: 12px;
  }

  .img {
    position: absolute;
    bottom: 10px;
    right: 2%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .table {
    position: relative;
    margin-top: 10px;
  }

  .connected span {
    display: inline-block;
    width: 100%;
  }

  .task_tab_box {
    margin-top: 50px;
  }
</style>
