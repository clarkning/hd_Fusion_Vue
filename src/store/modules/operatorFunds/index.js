import api from '../../../api/index2'
import { loadData, defaultPreHandler } from '../../../common/utils'
import _ from 'lodash'
const state = {
  operatorsBonusList: [],
  issuedBonusList: []
}

const mutations = {
  // 活动运营资金列表
  setOperatorsFundList (state, param) {
    let data = param
    state.operatorsBonusList = _.filter(data, item => {
      return item.bonusEvent.queryBonusEventStatus !== 3
    })
  },
  // 活动运营资金详情
  setOperatorBonusList (state, param) {
    state.issuedBonusList = param
  }
}

const actions = {
  'getPersonBonusOperators': async ({commit}, personId) => {
    await loadData(() => { return api.getPersonBonusOperators(personId) },
      (data) => { commit('setOperatorsFundList', data) },
      defaultPreHandler,
      true
    )
  },
  'getOperatorBonusList': async ({commit}, params) => {
    await loadData(() => { return api.getOperatorBonusList(params) },
      (data) => { commit('setOperatorBonusList', data) },
      defaultPreHandler,
      true
    )
  }
}

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
}
