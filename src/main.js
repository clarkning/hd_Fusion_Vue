// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import App from './app'
import router from './router'
import store from './store'
import WechatAuth from './plugins/vue-wechat-auth'
import api from './api/index2'
import MintUI from 'mint-ui'
import { initWxConfig } from './common/wechatlib'
import { wechatAppId } from './api/config'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
import ElTable from 'element-table'
import 'element-theme-chalk'
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider'
import '../static/fonts/iconfont.css'

Vue.use(ElTable)
const config = {
  dictionary: {
    zh_CN: {
      messages: {
        required: (name) => `${name}不能为空！`
      }
    }
  },
  events: 'input|blur',
  locale: 'zh_CN'
}

Validator.localize('zh_CN', zh)
Vue.use(VeeValidate, config)

Vue.config.productionTip = false
Vue.prototype.$initWxConfig = initWxConfig
Vue.use(MintUI)

Vue.component(Slider.name, Slider)
Vue.component(SliderItem.name, SliderItem)

/* eslint-disable no-new */

// 微信授权插件初始化
Vue.use(WechatAuth, {
  router, // 路由实例对象
  appid: 'ww0cc00c4a6f64c09b', // 您的微信appid      wx8476f326ca3ed962
  responseType: 'code',  // 返回类型，请填写code
  scope: 'snsapi_base', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
  state: '',
  getCodeCallback (code, next) {
    // 用户同意授权后回调方法
    // code：用户同意授权后，获得code值
    // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
    // next： 无论access_token是否获取成功,一定要调用该方法
    // next说明：next方法接收两个参数
    // 参数1为通过code值请求后端获取到的access_token值，如果获取失败请填入空字符串''
    // 参数2(非必填，默认获取access_token切换到当前路由对象)，指定切换对象 next('/') 或者 next({ path: '/' })
    api.getWxPerson({
      code,
      state: ''
    }).then(response => {
      let personId = response.content
      if (personId) {
        store.commit('setPersonId', personId)
        next(personId, {
          path: '/'
        }) // 获取access_toeken成功
      } else {
        next() // 获取access_token失败
      }
    }).catch(() => {
      next() // ajax出现错误
    })
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

/* eslint-disable */
if (!Array.prototype.filter) {
  Array.prototype.filter = function (func, thisArg) {
    'use strict'
    if (!((typeof func === 'Function' || typeof func === 'function') && this)) {
      throw new TypeError()
    }
    var len = this.length >>> 0,
      res = new Array(len),
      t = this, c = 0, i = -1
    if (thisArg === undefined) {
      while (++i !== len) {
        if (i in this) {
          if (func(t[i], i, t)) {
            res[c++] = t[i]
          } else {
            while (++i !== len) {
              if (i in this) {
                if (func.call(thisArg, t[i], i, t)) {
                  res[c++] = t[i]
                }
              }
            }
          }
        }
      }
    }
    res.length = c
    return res
  }
}
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }
      var o = Object(this)
      var len = o.length >>> 0
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var thisArg = arguments[1]
      var k = 0
      while (k < len) {
        var kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue
        }
        k++
      }
      return undefined
    }
  })
}
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function (predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }
      var o = Object(this)
      var len = o.length >>> 0
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var thisArg = arguments[1]
      var k = 0
      while (k < len) {
        var kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return k
        }
        k++
      }
      return -1
    }
  })
}
