const state = {
  brandName: '',
  categoryName: '',
  changeContractInfo: [],
  submitCustomerService: []
}

const mutations = {
  setBrandName (state, brandName) {
    state.brandName = brandName
  },
  setProductCategoryName (state, categoryName) {
    state.categoryName = categoryName
  },
  setChangeContractInfo (state, changeContractInfo) {
    state.changeContractInfo = changeContractInfo
  },
  setSubmitCustomerService (state, submitCustomerService) {
    state.submitCustomerService = submitCustomerService
  }
}

const actions = {}

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
}
