<template>
  <div class="Decomposition">
    <div class="form">
      <div class="title bg_img_none">
        <mt-cell><p slot="title">任务名称</p></mt-cell>
      </div>
      <div class="box">
        <div class="container">
          <div class="bg_img_none">
            <mt-cell :title="detail.task.taskName"></mt-cell>
          </div>
        </div>
      </div>

      <div class="title bg_img_none">
        <mt-cell><p slot="title">任务概览</p></mt-cell>
      </div>
      <div class="box">
        <div class="container" v-for="task in detail.task.taskItems" :key="task.id">
          <div class="bg_img_none">
            <mt-cell :title="task.name">
              <span class="fontfamily">{{task.target}}</span>
              <span class="fontfamily" v-if="task.targetType === '销售量'">单</span>
              <span class="fontfamily" v-else>元</span>
            </mt-cell>
          </div>
          <div class="bg_img_none computed">
            <mt-cell title="已分配">
              <div class="flex t-l">{{task.taskAllocateRate}}%</div>
              <div class="flex t-r">{{task.distribute}}</div>
            </mt-cell>
            <mt-cell title="已完成">
              <div class="flex t-l">{{task.progressRate}}%</div>
              <div class="flex t-r">{{task.progress}}</div>
            </mt-cell>
          </div>
        </div>
      </div>

      <div class="title bg_img_none" v-if="detail.task.reward.length > 0">
        <mt-cell><p slot="title">奖励概览</p></mt-cell>
      </div>
      <div class="first_img">
        <mt-cell v-for="reward in detail.task.reward"
                 :key="reward.id"
                 :title="reward.taskIncomeObject + '：'+ reward.incomeAllocate + '/' + reward.incomeValue"
                 :value="'已分配：'+ reward.incomeAllocateRate +'%'"></mt-cell>
      </div>
    </div>

    <div class="form title bg_img_none">
      <mt-cell>
        <p slot="title">人员筛选</p>
      </mt-cell>
    </div>
    <div class="popup bg_img_none" @click="filterPickerObject.popupVisible = true">
      <mt-cell class="filter" is-link>
        <span slot="title">当前显示</span>
        <span>{{filterPickerObject.filterOrg}}</span>
        <span class="mar-l-r">—</span>
        <span>{{filterPickerObject.filterPosition}}</span>
      </mt-cell>
    </div>
    <mt-popup
      v-model="filterPickerObject.popupVisible"
      position="middle">
      <mt-picker ref="filterPicker" :slots="filterPickerObject.slots" value-key="name" @change="onValuesChange" :visibleItemCount="3"
                 :showToolbar="true"></mt-picker>
      <button class="button" @click="setFilter()">确定</button>
    </mt-popup>

    <div class="form title bg_img_none">
      <mt-cell>
        <p slot="title">下级任务</p>
      </mt-cell>
    </div>
    <transition-group name="list" tag="div">
      <div class="case" v-for="(subTask, index) in showSameLevelSubTask" :key="index">
        <div class="subTask bg_img_none">
          <mt-cell>
            <span slot="title">{{subTask.personName}}<mt-badge size="normal" type="warning" v-if="subTask.taskStatus">{{ subTask.taskStatus }}</mt-badge></span>
            <span v-if="subTask.task && subTask.taskStatus !== '新建'" class="subTaskSpan">完成进度: {{ subTask.task.finishRate }}%</span>
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
        <div class="form" :class="{pb_10: subTask.taskStatus === '新建'}" v-if="subTask.task">
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
          <div @touchstart="btnStart()" @touchend="btnEnd()" class="btn submit" v-if="subTask.taskStatus === '新建'">
            <mt-button @click="resetTask(subTask.personTaskId)" type="primary" size="large">重置</mt-button>
            <mt-button @click="submit(subTask.personTaskId, 1)" type="primary" size="large">提交</mt-button>
          </div>
        </div>
        <div class="form" :class="{pb_10: income}" v-else>
          <div class="bg_img_none">
            <div v-for="task in detail.task.taskItems" :key="task.id">
              <mt-cell :title="task.name" value="未分配"></mt-cell>
            </div>
          </div>
          <div class="bg_img_none" v-if="detail.task.reward.length > 0">
            <mt-cell>
              <p slot="title">
              <span v-for="reward in detail.task.reward" class="t-l w-3 f-s-10">
                <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> +0 元</span>
                <span v-else class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i> +0/{{ reward.taskIncomeObject }}</span>
              </span>
              </p>
            </mt-cell>
          </div>
          <div @touchstart="btnStart()" @touchend="btnEnd()" class="btn" v-if="income">
            <mt-button @click="goToPageSub(subTask.personId, 1, detail.taskId)" type="primary" size="large">分配
            </mt-button>
          </div>
        </div>
      </div>
    </transition-group>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="300">
      <transition-group name="list" tag="div">
        <div class="case" v-for="(subTask, index) in showSubLevelSubTask" :key="index">
          <div class="subTask bg_img_none">
            <mt-cell>
              <span slot="title">{{subTask.personName}}<mt-badge size="normal" type="warning" v-if="subTask.taskStatus">{{ subTask.taskStatus }}</mt-badge></span>
              <span v-if="subTask.task && subTask.taskStatus !== '新建'" class="subTaskSpan">完成进度: {{ subTask.task.finishRate }}%</span>
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
          <div class="form" :class="{pb_10: subTask.taskStatus === '新建'}" v-if="subTask.task">
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
                    <div class="flex t-l">{{task.taskAllocateRate}}%</div>
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
            <div @touchstart="btnStart()" @touchend="btnEnd()" class="btn submit" v-if="subTask.taskStatus === '新建'">
              <mt-button @click="resetTask(subTask.personTaskId)" type="primary" size="large">重置</mt-button>
              <mt-button @click="submit(subTask.personTaskId, 0)" type="primary" size="large">提交</mt-button>
            </div>
          </div>
          <div class="form" :class="{pb_10: subTask.decomposition && income}" v-else>
            <div class="bg_img_none">
              <div v-for="task in detail.task.taskItems" :key="task.id">
                <mt-cell :title="task.name" value="未分配"></mt-cell>
              </div>
            </div>
            <div class="bg_img_none" v-if="detail.task.reward.length > 0">
              <mt-cell>
                <p slot="title">
                <span v-for="reward in detail.task.reward" class="t-l w-3 f-s-10">
                   <span v-if="reward.taskIncomeObject === '佣金'" class="color_2"><i class="iconfont icon-qiandai" aria-hidden="true" slot="icon"></i> +0 元</span>
                <span v-else class="color_3"><i class="iconfont icon-hongbao" aria-hidden="true" slot="icon"></i> +0/{{ reward.taskIncomeObject }}</span>
                </span>
                </p>
              </mt-cell>
            </div>
            <div @touchstart="btnStart()" @touchend="btnEnd()" class="btn" v-if="subTask.decomposition && income">
              <mt-button @click="goToPageSub(subTask.personId, 0, detail.taskId)" type="primary" size="large">分配
              </mt-button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="load" v-show="loading">
      <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
      正在加载
    </div>
    <div v-show="filterPickerObject.onFilterNone" class="null_data">
      <div class="null"></div>
      <p>该筛选条件下人员已分配完任务</p>
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import api from '../../api/index2'
  import _ from 'lodash'
  import { loadData, boolPreHandler } from '../../common/utils'

  export default {
    name: 'DecompositionTask',
    data () {
      return {
        filterPickerObject: {
          popupVisible: false,
          onFilterNone: false,
          filterOrg: '',
          filterPosition: '',
          slots: [
            {
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: [],
              className: 'slot3',
              textAlign: 'center'
            }
          ]
        },
        personTaskId: null,
        partnerId: null,
        loading: false,
        detail: {
          task: {
            reward: []
          },
          subPersonTaskIds: []
        },
        sameLevelSubTask: [],
        subLevelSubTask: [],
        showSubLevelSubTask: [],
        showSameLevelSubTask: [],
        filterSubLevelSubTask: [],
        noMore: true
      }
    },
    async created () {
      this.partnerId = Number(this.$route.query.partnerId)
      this.personTaskId = Number(this.$route.query.personTaskId)
      await this.getTaskList()
      await loadData(() => { return this.initSubTask() })
      this.getSubTasksDetail()
      this.setPositionName()
      this.setStorageFilter()
      this.noMore = this.filterSubLevelSubTask.length < 10
    },
    beforeRouteLeave (to, from, next) {
      if (to.name !== 'Sub') {
        this.removeStorageDecomposition()
      }
      next()
    },
    methods: {
      ...mapMutations('task', ['removeStorageDecomposition', 'setStorageDecomposition', 'resetSubTask']),
      ...mapActions(['getOrganizationInfo', 'getSameInfo', 'getSubInfo']),
      ...mapActions('task', [
        'afterSubmit',
        'resetSubPersonTask',
        'getSubTask',
        'getPersonTaskList',
        'getDetail'
      ]),
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
      },
      async initSubTask () {
        let detail = _.find(this.storePersonTask, {personTaskId: this.personTaskId})
        if (!detail.sameLevelSubTask) {
          await this.initSubTaskPerson()
          let params = {
            subPersonTaskIds: detail.subPersonTaskIds,
            partnerId: this.partnerId,
            taskId: detail.taskId
          }
          await this.getSubTask(params)
        }
      },
      async initSubTaskPerson () {
        await this.getOrganizationInfo(this.$store.state.person.personId)
        let organizationId = _.find(this.$store.state.person.orgInfo, {partnerId: this.partnerId}).organizationId
        await this.getSameInfo(organizationId)
        await this.getSubInfo(organizationId)
      },
      getSubTasksDetail () {
        let arr = _.find(this.storePersonTask, {personTaskId: this.personTaskId})
        let detail = JSON.parse(JSON.stringify(arr))
        this.sameLevelSubTask = detail.sameLevelSubTask
        this.subLevelSubTask = detail.subLevelSubTask
        this.setTaskProgress(detail)
        detail.task.reward = _.filter(detail.task.reward, (income) => {
          return income.taskIncomeObject !== '任务'
        })
        _.forEach(detail.task.reward, (item) => {
          let sameRewardAllocateValue = this.incomeRewardAllocateValue(this.sameLevelSubTask, item.taskIncomeObject)
          let subRewardAllocateValue = this.incomeRewardAllocateValue(this.subLevelSubTask, item.taskIncomeObject)
          let incomeAllocate = sameRewardAllocateValue + subRewardAllocateValue
          let incomeAllocateRate = (incomeAllocate / item.incomeValue) * 100
          if (incomeAllocateRate > 0 && incomeAllocateRate < 1) {
            incomeAllocateRate = 1
          } else {
            incomeAllocateRate = Math.floor(incomeAllocateRate)
          }
          let object = {
            incomeAllocate,
            incomeAllocateRate
          }
          _.assign(item, object)
        })
        this.detail = detail
        this.canDecomposeAndProgress()
        this.setIncome()
      },
      setTaskProgress (detail) {
        detail.task.taskItems.map((taskItem) => {
          let progressItem = _.find(detail.progress, {taskItemId: taskItem.taskItemId})
          let distribute = parseInt(progressItem.distribute || 0)
          let taskAllocateRate = (distribute / taskItem.target) * 100
          let progress = progressItem.progress || 0
          let progressRate = (progress / taskItem.target) * 100
          if (taskAllocateRate > 0 && taskAllocateRate < 1) {
            taskAllocateRate = 1
          } else {
            taskAllocateRate = Math.floor(taskAllocateRate)
          }
          if (progressRate > 0 && progressRate < 1) {
            progressRate = 1
          } else {
            progressRate = Math.floor(progressRate)
          }
          let object = {
            status: progress.status,
            progress,
            progressRate,
            distribute,
            taskAllocateRate
          }
          _.assign(taskItem, object)
        })
      },
      incomeRewardAllocateValue (array, incomeObject) {
        let rewardAllocateValue = 0
        for (let item of array) {
          if (item.task) {
            let reward = item.task.reward
            let num
            let incomeValue = _.find(reward, {taskIncomeObject: incomeObject})
            if (incomeValue) {
              num = Number(incomeValue.incomeValue)
            } else {
              num = 0
            }
            rewardAllocateValue += num
          }
        }
        return rewardAllocateValue
      },
      canDecomposeAndProgress () {
        _.forEach(this.sameLevelSubTask, (subTaskItem) => {
          if (!subTaskItem.decomposition) {
            _.assign(subTaskItem, {decomposition: false})
          } else {
            this.setTaskProgress(subTaskItem)
          }
        })
        this.sameLevelSubTask = _.filter(this.sameLevelSubTask, (item) => {
          return item.taskStatus !== '生效'
        })
        _.forEach(this.subLevelSubTask, (item) => {
          item.decomposition = true
        })
        _.forEach(this.subLevelSubTask, (subTaskItem) => {
          if (subTaskItem.task) {
            this.setTaskProgress(subTaskItem)
            let organizationName = subTaskItem.organizationNamePath
            let sub = _.filter(this.subLevelSubTask, {organizationNamePath: organizationName})
            for (let item of sub) {
              _.assign(item, {decomposition: false})
            }
            subTaskItem.decomposition = true
          }
        })
        this.subLevelSubTask = _.filter(this.subLevelSubTask, (item) => {
          return item.decomposition === true && item.taskStatus !== '生效'
        })

        this.showSameLevelSubTask = this.sameLevelSubTask
        this.filterSubLevelSubTask = this.subLevelSubTask
        this.showSubLevelSubTask = this.filterSubLevelSubTask.slice(0, 10)
      },
      setPositionName () {
        let arr = _.find(this.storePersonTask, {personTaskId: this.personTaskId})
        let detail = JSON.parse(JSON.stringify(arr))
        let sameLevelSubTask = detail.sameLevelSubTask
        let subLevelSubTask = detail.subLevelSubTask
        this.setPositionNameItem('下级人员', subLevelSubTask)
        this.setPositionNameItem('同级人员', sameLevelSubTask)
      },
      setPositionNameItem (name, subTasks) {
        if (subTasks.length > 0) {
          let item = {
            name,
            children: ['全部显示']
          }
          _.forEach(subTasks, subTaskItem => {
            let find = _.find(item.children, (item) => {
              return item === subTaskItem.positionName
            })
            if (!find) {
              item.children.push(subTaskItem.positionName)
            }
          })
          this.filterPickerObject.slots[0].values.push(item)
        }
      },
      setIncome () {
        if (this.detail.task.reward.length > 0) {
          this.income = _.find(this.detail.task.reward, (item) => {
            return item.incomeAllocateRate < 100
          })
        } else {
          this.income = true
        }
      },
      setPickerDefaultIndex (value) {
        this.$nextTick(async () => {
          let picker = this.$refs.filterPicker
          let v = picker.getSlotValues(0).find(s => s.name === value[0])
          if (v) {
            picker.setSlotValue(0, v)
            picker.setSlotValues(1, v.children)
            picker.setSlotValue(1, value[1])
          }
        })
      },
      onValuesChange (picker, values) {
        if (!values[0]) {
          this.$nextTick(() => {
            picker.setSlotValue(0, this.storeStorageDecomposition[0])
            picker.setSlotValues(1, values[0].children)
            picker.setSlotValue(1, this.storeStorageDecomposition[1])
          })
        } else {
          picker.setSlotValues(1, values[0].children)
        }
      },
      setStorageFilter () {
        let find = false
        if (this.storeStorageDecomposition.length > 0) {
          find = _.find(this.filterPickerObject.slots[0].values, {name: this.storeStorageDecomposition[0]})
        }
        if (find) {
          this.filterPickerObject.filterOrg = this.storeStorageDecomposition[0]
          this.filterPickerObject.filterPosition = this.storeStorageDecomposition[1]
          this.filterOrgAndPosition(this.filterPickerObject.filterOrg, this.filterPickerObject.filterPosition)
        } else {
          this.filterPickerObject.filterOrg = this.filterPickerObject.slots[0].values[0].name
          this.filterPickerObject.filterPosition = this.filterPickerObject.slots[0].values[0].children[0]
          this.setStorageDecomposition([this.filterPickerObject.filterOrg, this.filterPickerObject.filterPosition])
        }
        this.setPickerDefaultIndex(this.storeStorageDecomposition)
      },
      filterOrgAndPosition (filterOrg, filterPosition) {
        if (filterOrg === '同级人员') {
          if (filterPosition === '全部显示') {
            this.showSameLevelSubTask = this.sameLevelSubTask
          } else {
            this.showSameLevelSubTask = _.filter(this.sameLevelSubTask, {positionName: filterPosition})
          }
          this.filterSubLevelSubTask = []
          this.showSubLevelSubTask = []
          this.noMore = true
          this.filterPickerObject.onFilterNone = this.showSameLevelSubTask.length === 0
        } else if (filterOrg === '下级人员') {
          if (filterPosition === '全部显示') {
            this.filterSubLevelSubTask = this.subLevelSubTask
          } else {
            this.filterSubLevelSubTask = _.filter(this.subLevelSubTask, {positionName: filterPosition})
          }
          this.noMore = this.filterSubLevelSubTask.length < 10
          this.showSubLevelSubTask = this.filterSubLevelSubTask.slice(0, 10)
          this.showSameLevelSubTask = []
          this.filterPickerObject.onFilterNone = this.filterSubLevelSubTask.length === 0
        }
      },

      setFilter () {
        this.filterPickerObject.popupVisible = false
        let picker = this.$refs.filterPicker
        this.filterPickerObject.filterOrg = picker.getValues()[0].name
        this.filterPickerObject.filterPosition = picker.getValues()[1]
        this.setStorageDecomposition([this.filterPickerObject.filterOrg, this.filterPickerObject.filterPosition])
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
      goToPageSub (personId, same, taskId) {
        this.$router.push({
          name: 'Sub',
          query: {
            personId,
            same,
            taskId
          }
        })
      },
      async resetTask (personTaskId) {
        let params = {
          subPersonTaskId: personTaskId,
          personTaskId: this.detail.personTaskId
        }
        await loadData(() => {
          return api.deleteSubTask(personTaskId)
        }, async (res) => {
          if (res) {
            this.resetSubTask(params)
            await loadData(() => { return this.resetSubPersonTask(this.detail.personTaskId) })
            this.getSubTasksDetail()
            this.filterOrgAndPosition(this.filterPickerObject.filterOrg, this.filterPickerObject.filterPosition)
          }
        }, boolPreHandler)
      },
      submit (personTaskId, same) {
        let vue = this
        let message = '提交后任务不可修改，确定要提交吗？'
        MessageBox.confirm(message).then(async () => {
          await loadData(() => { return api.submitSubTask(personTaskId) },
            async (res) => {
              if (res) {
                let param = {
                  personTaskId: vue.detail.personTaskId,
                  same,
                  subPersonTaskId: personTaskId
                }
                await vue.afterSubmit(param)
                vue.getSubTasksDetail()
                vue.setStorageFilter()
              }
            }, boolPreHandler)
        })
      },
      loadMore () {
        if (this.noMore) return
        this.loading = true
        setTimeout(() => {
          let last = this.showSubLevelSubTask.length
          let end = last + 10
          this.noMore = this.filterSubLevelSubTask.slice(last, end).length < 10
          this.showSubLevelSubTask.push(...this.filterSubLevelSubTask.slice(last, end))
          this.loading = false
        }, 1000)
      }
    },
    computed: {
      ...mapState('task', {
        storeStorageDecomposition: state => state.storageDecomposition,
        storePersonTask: state => state.taskList.personTask
      })
    },
    watch: {
      'filterPickerObject.filterPosition': function (status) {
        this.filterOrgAndPosition(this.filterPickerObject.filterOrg, status)
      },
      'filterPickerObject.filterOrg': function (status) {
        this.filterOrgAndPosition(status, this.filterPickerObject.filterPosition)
      }
    }
  }
</script>
<style scoped>
  .button {
    color: #26a2ff;
    width: 100%;
    font-size: 1rem;
    line-height: 35px;
    display: block;
    background-color: #fff;
    margin: 10px 0 0 0;
    border: 0;
    border-top: 1px solid #ddd;
    border-radius: 0 0 3px 3px;
    outline: none;
  }

  .popup {
    background: #fff;
    width: 95%;
    margin: auto;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
  }

  .mar-l-r {
    margin-left: 5px;
    margin-right: 5px;
  }

  .list-enter-active, .list-leave-active {
    transition: all .35s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

  .organizeTitle {
    width: 5rem;
    display: inline-block;
  }

  .organizeValue {
    line-height: 1.7rem;
    text-align: right;
  }

  .w-3 {
    display: inline-block;
    padding-right: 10px;
    line-height: 1.5;
  }

  .box {
    background: #fff;
  }

  .Decomposition {
    padding: 1px 0;
    line-height: 0;
    box-sizing: border-box;
  }

  .case {
    width: 95%;
    padding: 5px;
    border-radius: 5px;
    background: #fff;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .case {
    margin-bottom: 10px;
  }

  .content span {
    font-size: 14px;
  }

  i {
    margin: 0 3px;
  }

  .title p {
    font-size: 14px;
    color: #888;
  }

  .subTaskSpan {
    color: #26a2ff;
    min-width: 5rem;
    text-align: right;
  }

  .link {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(135deg);
    transition: all 0.35s
  }

  .display {
    display: none;
  }

  .btn {
    margin: 0 10px;
  }

  .pb_10 {
    padding-bottom: 10px;
  }

  .flex {
    flex: 1;
    color: #888;
  }

  .fontfamily {
    font-weight: bold;
  }
</style>
