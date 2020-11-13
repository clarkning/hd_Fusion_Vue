import api from '../api/index2'
import wx from 'weixin-js-sdk'
import { wechatAppId } from '../api/config'
import {loadData, defaultPreHandler} from './utils'

async function initWxConfig (url, apiList, appId = wechatAppId) {
  await loadData(() => {
    return api.getSignature(encodeURIComponent(url))
  }, res => {
    wx.config({
      beta: true,
      debug: false,
      appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名
      jsApiList: apiList // 必填，需要使用的JS接口列表
    })
  }, defaultPreHandler, true)
}

export { initWxConfig }
