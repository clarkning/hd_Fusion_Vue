/**
 * ------------------------------------------------------------------
 * 微信授权
 * @author SongJinDa <310676645@qq.com>
 * @date 17/3/26
 * ------------------------------------------------------------------
 */
import store from '../../store'

class WeChatAuth {
  constructor (config) {
    let defaultConfig = {
      appid: '',
      responseType: 'code',
      scope: 'snsapi_base ',
      state: '',
      // redirectUri: '',
      getCodeCallback: () => {}
    }
    this.config = Object.assign(defaultConfig, config)
  }

  openAuthPage (redirectUri = encodeURIComponent(window.location.href)) {
    this.removePersonId()
    this.removeAuthCode()
    let authPageBaseUri = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    let authParams = `?appid=${this.config.appid}&redirect_uri=${redirectUri}&response_type=${this.config.responseType}&state=${this.config.state}&scope=${this.config.scope}#wechat_redirect`
    window.location.href = authPageBaseUri + authParams
  }

  setAuthCode (code) {
    if (!code) return false
    window.sessionStorage.setItem('auth_code', code)
    return true
  }

  getAuthCode () {
    let codeValue = window.sessionStorage.getItem('auth_code')
    if (!codeValue) return ''
    return codeValue
  }

  removeAuthCode () {
    window.sessionStorage.removeItem('auth_code')
  }

  removeUrlCodeQuery () {
    let location = window.location
    let search = location.search
    if (search) {
      search = search.substr(1)
    }
    let href = location.origin
    let pathName = location.pathname
    if (pathName) {
      href += pathName
    }
    let searchArr = search.split('&').filter(item => {
      if (item.indexOf('code=') !== -1) {
        return false
      }
      if (item.indexOf('state=') !== -1) {
        return false
      }
      return true
    })
    if (searchArr.length > 0) {
      href += '?' + searchArr.join('&')
    }
    let hash = location.hash
    if (hash) {
      href += hash
    }
    window.location.href = href
  }

  setPersonId (personId) {
    if (!personId) return false
    localStorage.setItem('zanPersonId', personId)
    store.commit('setPersonId', personId)
    return true
  }

  getPersonId () {
    // localStorage.setItem('zanPersonId', 4425)
    let personId = window.localStorage.getItem('zanPersonId')
    store.commit('setPersonId', personId)
    return store.state.person.personId
  }

  removePersonId () {
    store.commit('setPersonId', null)
  }

  next (next) {
    let self = this
    return (personId, to) => {
      if (personId) {
        self.setPersonId(personId)
        to
          ? next(to)
          : next()
      } else {
        self.removePersonId()
        to && next(to)
      }
      self.removeAuthCode()
    }
  }

  getCodeCallback (next) {
    return this.config.getCodeCallback(this.getAuthCode(), this.next(next))
  }
}

export default WeChatAuth
