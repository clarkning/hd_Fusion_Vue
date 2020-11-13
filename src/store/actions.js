import api from '../api/index2'
import { loadData, defaultPreHandler } from '../common/utils'
import _ from 'lodash'
import moment from 'moment'

const actions = {
  'getPersonInfo': async ({commit, state}, personId) => {
    if (!state.person.name) {
      await loadData(() => {
        return api.getPersonInfo(personId)
      }, response => {
        commit('setPersonInfo', response)
      }, defaultPreHandler, true)
    }
  },
  'getProject': async ({state, commit, dispatch}) => {
    await dispatch('getOrganizationInfo', state.person.personId)
    for (let item of state.person.orgInfo) {
      let find = _.find(state.project, {organizationId: item.organizationId})
      if (!find) {
        await loadData(() => {
          return api.getProjects(item.organizationId)
        }, response => {
          let param = {
            partnerId: item.partnerId,
            organizationId: item.organizationId,
            response,
            organizationNamePath: item.organizationNamePath,
            positionType: item.positionType,
            organizationName: item.organizationName
          }
          commit('setProject', param)
        }, defaultPreHandler, true)
      }
    }
  },
  'getSubOrganizations': async ({commit, state, dispatch}, orgId) => {
    await dispatch('getOrganizationInfo', state.person.personId)
    let find = _.find(state.person.orgInfo, {organizationId: orgId})
    if (!find) return
    if (!find.subOrganizations) {
      await loadData(() => {
        return api.getSubOrganizations(orgId)
      }, response => {
        let params = {
          orgId,
          response
        }
        commit('setSubOrganizations', params)
      }, defaultPreHandler, true)
    }
  },
  'getOrganizationInfo': async ({commit, state}, personId) => {
    if (state.person.orgInfo.length === 0) {
      await loadData(() => {
        return api.getOrgInfo(personId)
      }, response => {
        commit('setOrgInfo', response)
      }, defaultPreHandler, true)
    }
  },
  'getSameInfo': async ({commit, state, dispatch}, orgId) => {
    await loadData(() => { return api.sameInfo(orgId) },
      (response) => {
        let res = {
          orgId,
          response: response[0]
        }
        commit('setSame', res)
      }, defaultPreHandler, true)
  },
  'getSubInfo': async ({commit, state, dispatch}, orgId) => {
    let find = state.person.orgInfo.find((item) => {
      return item.organizationId === orgId
    })
    if (find.subLevel) return
    await loadData(() => {
      return api.subInfo(orgId)
    }, (response) => {
      let res = {
        orgId,
        response: response[0]
      }
      commit('setSub', res)
    }, defaultPreHandler, true)
  },
  'getMessageList': async ({commit}, param) => {
    await loadData(() => {
      return api.getMessageList(param)
    }, response => {
      let toDay = moment().startOf('day')
      _.forEach(response.personMessages, (item) => {
        if (toDay.isAfter(item.publishTime)) {
          item.publishTime = item.publishTime.slice(0, 10)
        } else {
          item.publishTime = item.publishTime.slice(11, 16)
        }
      })
      if (param.read) {
        _.forEach(response.personMessages, (item) => {
          Object.assign(item, {status: true})
        })
      } else {
        _.forEach(response.personMessages, (item) => {
          Object.assign(item, {status: false})
        })
        commit('serMessageTotal', response.total)
      }
      let object = {
        messages: response.personMessages,
        read: param.read,
        page: param.page
      }
      commit('setMessages', object)
      return response.personMessages.length < 10
    }, defaultPreHandler, true)
  },
  'getMaterials': async ({commit, dispatch}, param) => {
    let response = []
    await loadData(() => {
      return api.getMaterials(param)
    }, async (data) => {
      response = data
    }, defaultPreHandler, true)
    for (let i = 0; i < response.length; i++) {
      if (response[i].materialTypeCode === 2 || response[i].materialTypeCode === 4) {
        await loadData(() => {
          return api.getMaterialsDetails(response[i].id)
        }, v => {
          response[i] = v
        }, defaultPreHandler, true)
      }
    }
    commit('setMaterials', response)
  },
  'getMaterialsDetails': async ({commit, dispatch}, param) => {
    await loadData(() => {
      return api.getMaterialsDetails(param)
    }, response => {
      let params = {
        id: param,
        res: response
      }
      commit('setMaterialsDetails', params)
    }, defaultPreHandler, true)
  },
  'getContractList': async ({commit}, param) => {
    await loadData(() => {
      return api.getContractList(param)
    }, response => {
      if (response.isOk) {
        commit('setContractList', response)
      }
    })
  },
  'getAuthorityList': async ({state, commit}) => {
    if (state.authorityList.length === 0) {
      await loadData(() => {
        return api.getAuthority()
      }, response => {
        commit('setAuthorityList', response)
      })
    }
  }
}

export default actions
