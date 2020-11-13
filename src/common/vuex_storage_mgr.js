import store from '../store'

/**
 * 管理 Vuex Storage
 */
class VuexStorageMgr {
  static async ensurePerson () {
    return store.state.person
  }
}

export { VuexStorageMgr }
