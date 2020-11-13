import _ from 'lodash'

const mutations = {
  setPersonInfo (state, PersonInfo) {
    Object.assign(state.person, PersonInfo)
  },
  setOrgInfo (state, info) {
    state.person.orgInfo = [...info[0]]
  },
  setSubOrganizations (state, param) {
    state.person.orgInfo.find((item) => {
      return item.organizationId === param.orgId
    }).subOrganizations = [...param.response]
  },
  setProject (state, param) {
    let find = _.find(state.project, {organizationId: param.organizationId})
    if (!find) {
      let obj = {
        partnerId: param.partnerId,
        organizationId: param.organizationId,
        projectList: param.response,
        organizationNamePath: param.organizationNamePath,
        positionType: param.positionType,
        organizationName: param.organizationName
      }
      state.project.push(obj)
    }
  },
  setSame (state, param) {
    state.person.orgInfo.find((item) => {
      return item.organizationId === param.orgId
    }).sameLevel = [...param.response]
  },
  setSub (state, param) {
    state.person.orgInfo.find((item) => {
      return item.organizationId === param.orgId
    }).subLevel = [...param.response]
  },
  setPersonId (state, personId) {
    state.person.personId = personId
  },
  setMessages (state, params) {
    if (params.page === 1) {
      state.messages = _.filter(state.messages, item => {
        return item.status !== params.read
      })
    }
    state.messages.push(...params.messages)
  },
  serMessageTotal (state, total) {
    state.messageTotal = total
  },
  setMessageStatus (state, id) {
    _.forEach(state.messages, (item) => {
      if (item.personMessageId === id) {
        item.status = true
      }
    })
  },
  deleteMessage (state, id) {
    let index = _.findIndex(state.messages, {personMessageId: id})
    state.messages.splice(index, 1)
  },
  setMessageTotal (state, total) {
    state.messageTotal = total
  },
  declineMessageTotal (state) {
    state.messageTotal--
  },
  setMsgListNav (state, msgListNav) {
    state.msgListNav = msgListNav
  },
  setMaterials (state, materials) {
    state.materials.push(...materials)
  },
  setMaterialsDetails (state, params) {
    _.forEach(state.materials, (item) => {
      if (item.id === params.id) {
        item.content = params.res.content
      }
    })
  },
  setLicenceList (state, params) {
    state.commission.licenceList = params
  },
  setContractList (state, params) {
    state.contract = params.content
  },
  setAuthorityList (state, params) {
    state.authorityList = params
  },
  keepAlive (state, component) {
    // 注：防止重复添加（当然也可以使用Set）
    !state.keepAliveComponents.includes(component) && state.keepAliveComponents.push(component)
  },
  noKeepAlive (state, component) {
    const index = state.keepAliveComponents.indexOf(component)
    index !== -1 && state.keepAliveComponents.splice(index, 1)
  }
}

export default mutations
