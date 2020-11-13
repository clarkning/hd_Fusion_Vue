import api from '../../../api/index2'
import { loadData, defaultPreHandler } from '../../../common/utils'
import _ from 'lodash'

// 任务奖励和任务惩罚的分类
function incomeData (object) {
  let amerce = _.filter(object.taskIncomes, {taskImcomeCondition: '任务失败后'})
  let reward = _.filter(object.taskIncomes, item => {
    return item.taskImcomeCondition === '任务达成后' && item.incomeValue > 0
  })
  Object.assign(object, {reward, amerce})
}

// 完成率的计算
function fishRate (object, task) {
  task.taskItems = _.filter(task.taskItems, item => {
    return item.target > 0
  })
  let finishRate = 0
  let weight = 1 / task.taskItems.length
  _.forEach(task.taskItems, (item) => {
    let number = _.find(object.progress, {taskItemId: item.taskItemId}).progress || 0
    let rate = number / item.target
    if (rate > 1) {
      rate = 1
    }
    finishRate += weight * rate * 100
  })
  let notComplete = _.find(object.progress, item => {
    return item.status !== '达成'
  })
  if (finishRate > 100 || !notComplete) {
    finishRate = 100
  } else if (finishRate > 0 && finishRate < 1) {
    finishRate = 1
  } else {
    finishRate = _.floor(finishRate)
  }
  _.assign(task, {finishRate})
}
export default {
  namespaced: true,
  state: {
    taskList: {
      acceptable: [],
      personTask: [],
      details: []
    },
    taskListNav: 'acceptable',
    rewardTask: [],
    storageDecomposition: []
  },
  mutations: {
    setTaskDetail (state, detail) {
      if (_.find(state.taskList.details, {taskId: detail.taskId})) return
      state.taskList.details.push(detail)
    },
    setPersonTaskDetail (state, params) {
      let item = _.find(state.taskList.personTask, {personTaskId: params.personTaskId})
      if (item) {
        item.task = params.detail
      }
    },
    setTaskListAcceptable (state, acceptable) {
      state.taskList.acceptable = acceptable
    },
    setTaskListPersonTask (state, param) {
      if (param.page === 1) {
        state.taskList.personTask = param.personTask
      } else {
        state.taskList.personTask.push(...param.personTask)
      }
    },
    setSubTask (state, params) {
      let item = _.find(state.taskList.personTask, {taskId: params.taskId})
      _.assign(item, params.subTask)
    },
    setAddedSubPersonTaskId (state, params) {
      let personTaskItem = _.find(state.taskList.personTask, {personTaskId: params.personTaskId})
      let personId = params.addedSubPersonTask.personId
      if (params.same === 1) {
        _.forEach(personTaskItem.sameLevelSubTask, (item) => {
          if (personId === item.personId) {
            _.assign(item, params.addedSubPersonTask)
          }
        })
      } else {
        _.forEach(personTaskItem.subLevelSubTask, (item) => {
          if (personId === item.personId) {
            _.assign(item, params.addedSubPersonTask)
          }
        })
      }
    },
    setPersonTask (state, params) {
      _.forEach(state.taskList.personTask, (item) => {
        if (item.personTaskId === params.personTaskId) {
          item.progress = params.progress
          item.personTaskStatus = params.personTaskStatus
          item.subPersonTaskIds = params.subPersonTaskIds
        }
      })
    },
    setTaskListNav (state, taskListNav) {
      state.taskListNav = taskListNav
    },
    resetSubTask (state, params) {
      let detail = _.find(state.taskList.personTask, {personTaskId: params.personTaskId})
      let itemIndex
      let item
      if (_.some(detail.sameLevelSubTask, {personTaskId: params.subPersonTaskId})) {
        itemIndex = _.findIndex(detail.sameLevelSubTask, {personTaskId: params.subPersonTaskId})
        item = _.find(detail.sameLevelSubTask, {personTaskId: params.subPersonTaskId})
        detail.sameLevelSubTask[itemIndex] = _.pick(item, ['personName', 'organizationNamePath', 'personId', 'positionName'])
      } else {
        itemIndex = _.findIndex(detail.subLevelSubTask, {personTaskId: params.subPersonTaskId})
        item = _.find(detail.subLevelSubTask, {personTaskId: params.subPersonTaskId})
        detail.subLevelSubTask[itemIndex] = _.pick(item, ['personName', 'organizationNamePath', 'personId', 'positionName'])
      }
    },
    resetPersonTask (state, params) {
      _.forEach(state.taskList.personTask, (item) => {
        if (item.personTaskId === params.personTaskId) {
          item.progress = params.progress
          item.subPersonTaskIds = params.subPersonTaskIds
        }
      })
    },
    setRewardTask (state, param) {
      state.rewardTask.push(param)
    },
    setTaskIncome (state, param) {
      _.forEach(state.taskList.personTask, (item) => {
        if (item.personTaskId === param.personTaskId) {
          _.assign(item, param)
        }
      })
    },
    setStorageDecomposition (state, param) {
      state.storageDecomposition = param
    },
    removeStorageDecomposition (state) {
      state.storageDecomposition = []
    }
  },
  actions: {
    'getTaskListAcceptable': async ({commit}) => {
      await loadData(
        () => { return api.getAcceptable() },
        acceptable => {
          for (let acceptableItem of acceptable) {
            incomeData(acceptableItem)
          }
          commit('setTaskListAcceptable', acceptable)
          _.forEach(acceptable, item => {
            commit('setTaskDetail', item)
          })
        },
        defaultPreHandler,
        true
      )
    },
    'getTaskDetail': async ({commit}, taskId) => {
      let t = {}
      await loadData(
        () => { return api.getTaskDetail(taskId) },
        task => {
          incomeData(task)
          t = task
        },
        defaultPreHandler,
        true
      )
      return t
    },
    'getTaskSchedule': async ({state}, personTaskId) => {
      let t = {}
      await loadData(
        () => { return api.getTaskSchedule(personTaskId) },
        task => { t = task },
        defaultPreHandler,
        true
      )
      return t
    },
    'getDetail': async ({state, commit, rootState, dispatch}, params) => {
      let detail = {}
      await loadData(
        () => { return api.getTaskDetail(params.taskId) },
        task => {
          incomeData(task)
          detail = task
        },
        defaultPreHandler,
        true
      )
      if (detail.taskType === '分解任务') {
        let personTaskItem = _.find(state.taskList.personTask, {personTaskId: params.personTaskId})
        if (personTaskItem.parentPersonTaskId && personTaskItem.personTaskStatus === '进行中') {
          await dispatch('getOrganizationInfo', rootState.person.personId, {root: true})
          let parentPersonTask = await dispatch('getTaskSchedule', personTaskItem.parentPersonTaskId)
          let org = _.find(rootState.person.orgInfo, {partnerId: personTaskItem.partnerId})
          if (org) {
            if (!org.sameLevel) {
              await dispatch('getSameInfo', org.organizationId, {root: true})
              org = _.find(rootState.person.orgInfo, {partnerId: personTaskItem.partnerId})
            }
            if (_.some(org.sameLevel, {personId: parentPersonTask.personId})) {
              detail.taskType = '普通任务'
            }
          } else {
            detail.taskType = '普通任务'
          }
        }
      }
      commit('setTaskDetail', detail)
      commit('setPersonTaskDetail', {personTaskId: params.personTaskId, detail})
    },
    'getPersonTaskList': async ({state, commit}, page) => {
      let personTaskPage = Math.ceil(state.taskList.personTask.length / 10)
      if (personTaskPage < page) {
        await loadData(
          () => { return api.getPersonTask(page) },
          personTask => {
            let params = {
              personTask,
              page
            }
            commit('setTaskListPersonTask', params)
          },
          defaultPreHandler,
          true
        )
      }
    },
    'getHomePersonTaskList': async ({state, commit}) => {
      await loadData(
        () => { return api.getPersonTask(1) },
        personTask => {
          let params = {
            personTask,
            page: 1
          }
          commit('setTaskListPersonTask', params)
        },
        defaultPreHandler,
        true
      )
    },
    'getTaskListPersonTask': async ({commit, rootState, dispatch}, param) => {
      let personTask = []
      await loadData(
        () => { return api.getPersonTask(param) },
        v => { personTask = v },
        defaultPreHandler,
        true
      )
      for (let personTaskItem of personTask) {
        let task = await dispatch('getTaskDetail', personTaskItem.taskId)
        if (personTaskItem.parentPersonTaskId && task.taskType === '分解任务' && personTaskItem.personTaskStatus === '进行中') {
          await dispatch('getOrganizationInfo', rootState.person.personId, {root: true})
          let parentPersonTask = await dispatch('getTaskSchedule', personTaskItem.parentPersonTaskId)
          let org = _.find(rootState.person.orgInfo, {partnerId: personTaskItem.partnerId})
          if (!org.sameLevel) {
            await dispatch('getSameInfo', org.organizationId, {root: true})
            org = _.find(rootState.person.orgInfo, {partnerId: personTaskItem.partnerId})
          }
          if (_.some(org.sameLevel, {personId: parentPersonTask.personId})) {
            task.taskType = '普通任务'
          }
        }
        _.assign(personTaskItem, {task})
      }
      let params = {
        personTask,
        page: param
      }
      commit('setTaskListPersonTask', params)
    },
    'getSubTask': async ({commit, rootState, dispatch}, params) => {
      let subTask = {
        sameLevelSubTask: [],
        subLevelSubTask: []
      }
      let orgInfo = _.find(rootState.person.orgInfo, {partnerId: params.partnerId})
      let same = orgInfo.sameLevel
      let organizationNamePath = orgInfo.organizationNamePath
      _.forEach(same, (item) => {
        _.assign(item, {organizationNamePath}
        )
      })
      let sub = orgInfo.subLevel
      subTask.sameLevelSubTask.push(...same)
      subTask.subLevelSubTask.push(...sub)
      if (params.subPersonTaskIds.length > 0) {
        for (let idsItem of params.subPersonTaskIds) {
          let item = await dispatch('getTaskSchedule', idsItem)
          let task = await dispatch('getTaskDetail', item.taskId)
          fishRate(item, task)
          _.assign(item, {decomposition: true}, {task})
          _.forEach(subTask.sameLevelSubTask, (subTaskItem) => {
            if (item.personId === subTaskItem.personId) {
              _.assign(subTaskItem, item)
            }
          })
          _.forEach(subTask.subLevelSubTask, (subTaskItem) => {
            if (item.personId === subTaskItem.personId) {
              _.assign(subTaskItem, item)
            }
          })
        }
      }
      let param = {
        taskId: params.taskId,
        subTask: subTask
      }
      commit('setSubTask', param)
    },
    'afterDistribute': async ({commit, dispatch}, params) => {
      let personTaskProgress = {}
      await loadData(
        () => { return api.getTaskSchedule(params.personTaskId) },
        v => { personTaskProgress = v },
        defaultPreHandler,
        true
      )
      let p = {
        personTaskId: params.personTaskId,
        progress: personTaskProgress.progress,
        personTaskStatus: personTaskProgress.personTaskStatus,
        subPersonTaskIds: personTaskProgress.subPersonTaskIds
      }
      commit('setPersonTask', p)
      let num = personTaskProgress.subPersonTaskIds.length - 1
      let addedSubPersonTaskId = personTaskProgress.subPersonTaskIds[num]
      let addedSubPersonTask = await dispatch('getTaskSchedule', addedSubPersonTaskId)
      let task = await dispatch('getTaskDetail', addedSubPersonTask.taskId)
      incomeData(task)
      fishRate(addedSubPersonTask, task)
      _.assign(addedSubPersonTask, {decomposition: true}, {task})
      let param = {
        personTaskId: params.personTaskId,
        addedSubPersonTask,
        same: params.same
      }
      commit('setAddedSubPersonTaskId', param)
    },
    'afterSubmit': async ({commit, dispatch}, params) => {
      let personTaskProgress = await dispatch('getTaskSchedule', params.personTaskId)
      let p = {
        personTaskId: params.personTaskId,
        progress: personTaskProgress.progress,
        personTaskStatus: personTaskProgress.personTaskStatus,
        subPersonTaskIds: personTaskProgress.subPersonTaskIds
      }
      commit('setPersonTask', p)
      let addedSubPersonTaskId = params.subPersonTaskId
      let addedSubPersonTask = await dispatch('getTaskSchedule', addedSubPersonTaskId)
      let task = await dispatch('getTaskDetail', addedSubPersonTask.taskId)
      incomeData(task)
      fishRate(addedSubPersonTask, task)
      _.assign(addedSubPersonTask, {decomposition: true}, {task})
      let param = {
        personTaskId: params.personTaskId,
        addedSubPersonTask,
        same: params.same
      }
      commit('setAddedSubPersonTaskId', param)
    },
    'resetSubPersonTask': async ({commit, dispatch}, personTaskId) => {
      let personTask = await dispatch('getTaskSchedule', personTaskId)
      let params = {
        personTaskId,
        progress: personTask.progress,
        subPersonTaskIds: personTask.subPersonTaskIds
      }
      commit('resetPersonTask', params)
    },
    'rewardTask': async ({commit, dispatch}, taskId) => {
      let response = await dispatch('getTaskDetail', taskId)
      incomeData(response)
      commit('setRewardTask', response)
      return response
    },
    'afterTaskIncome': async ({commit, dispatch}, personTaskId) => {
      let task = await dispatch('getTaskSchedule', personTaskId)
      commit('setTaskIncome', task)
    }
  }
}
