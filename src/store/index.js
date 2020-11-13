import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import order from './modules/order/index'
import task from './modules/task/index'
import customerService from './modules/customerService/index'
import operatorFunds from './modules/operatorFunds/index'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    keepAliveComponents: [],
    person: {
      personId: null,
      orgInfo: []
    },
    project: [],
    messages: [],
    messageTotal: 0,
    msgListNav: 'unread',
    materials: [],
    invoice: {
      list: []
    },
    contract: [],
    authorityList: []
  },
  mutations,
  actions,
  modules: {
    order,
    task,
    customerService,
    operatorFunds
  }
})
