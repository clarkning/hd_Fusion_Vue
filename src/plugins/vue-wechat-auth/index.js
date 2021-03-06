/**
 * ------------------------------------------------------------------
 * 微信授权主入口文件
 * @author SongJinDa <310676645@qq.com>
 * @date 2017/3/26
 * ------------------------------------------------------------------
 */

import WeChatAuth from './wechat-auth'
import url from 'url'
import querystring from 'querystring'

let n = 1

export default {
  install (Vue, options) {
    let weChatAuth = new WeChatAuth(options)
    let router = options.router
    if (!router) return false

    function urlCodeQueryFilter (code) {
      if (code) {
        weChatAuth.setAuthCode(code)
        weChatAuth.removeUrlCodeQuery()
      }
    }

    function checkRouterAuth (to, from, next) {
      let authCode = weChatAuth.getAuthCode()
      if ((!to.meta || !to.meta.auth) && !authCode) return true
      if (!authCode && !weChatAuth.getPersonId()) {
        let href = window.location.origin
        weChatAuth.openAuthPage(encodeURIComponent(href))
        // let protocol = window.location.protocol
        // let host = window.location.host
        // let port = window.location.port
        // if (port) {
        //   port = ':' + port
        // }
        // weChatAuth.openAuthPage(encodeURIComponent(`${protocol}//${host}${port}/`))
        return false
      } else if (authCode && !weChatAuth.getPersonId()) {
        weChatAuth.getCodeCallback(next)
        return false
      }
      return true
    }

    function beforeEach (to, from, next) {
      if (!from.name && to.name === 'login' && n === 1) {
        let agentId = 1000002
        if (agentId) {
          localStorage.setItem('agentId', agentId)
        }
        n = 2
        localStorage.removeItem('zanPersonId')
        localStorage.removeItem('dimension2')
        localStorage.removeItem('dimension1')
      }

      // let personId = 2
      // weChatAuth.setPersonId(personId)
      let query = querystring.parse(url.parse(window.location.href).query)
      let code = query.code
      urlCodeQueryFilter(code)
      if (!code && !checkRouterAuth(to, from, next)) {
        return false
      }
      next()
    }

    router.beforeEach((to, from, next) => {
      beforeEach(to, from, next)
    })
  }
}
