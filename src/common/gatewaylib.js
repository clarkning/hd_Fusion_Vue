import {AuthorizedApp, ApiStage} from '../api/config'
const Client = require('../aligateway/client')

var client = new Client(AuthorizedApp.key, AuthorizedApp.secret, ApiStage)
const AliGateway = {
  get: async function (url, query = null, timeout = 30000) {
    let data
    if (query) {
      data = await client.get(url, {
        query: query,
        headers: {
          accept: 'application/json'
        },
        timeout: timeout
      })
    } else {
      data = await client.get(url, {
        timeout: timeout
      })
    }
    return data
  },
  post: async function (url, data = {}, timeout = 30000) {
    let res = await client.post(url, {
      data: data,
      headers: {
        'content-type': 'application/json'
      },
      timeout: timeout
    })
    return res
  },
  delete: async function (url, data, timeout = 30000) {
    let res = await client.delete(url, {
      headers: {
        accept: 'application/json'
      },
      query: data,
      timeout: timeout
    })
    return res
  }
}

export {AliGateway}
