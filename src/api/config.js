let config = (function (env) {
  // let apiSite = {
  //   prod: 'fusion-api.trustinsure.cn/api/v1',
  //   dev1: 'fusion-api.trustinsure.cn/api/v1',
  //   // dev1: '192.168.31.11/fusion-api/api/v1',
  //   dev2: 'fusion-api.trustinsure.cn/api/v1',
  //   dev3: 'fusion-api.trustinsure.cn/api/v1'
  // }

  let apiSite = {
    prod: 'fusion-api.trustinsure.cn/api/v1',
    dev1: 'fusion-api.trustinsure.cn/api/v1',
    // dev1: '192.168.31.11/fusion-api/api/v1',
    dev2: 'fusion-api.trustinsure.cn/api/v1',
    dev3: 'fusion-api.trustinsure.cn/api/v1'
  }
  // let apiSite = {
  //   prod: '192.168.31.11/fusion-api/api/v1',
  //   dev1: '192.168.31.11/fusion-api/api/v1',
  //   dev2: '192.168.31.11/fusion-api/api/v1',
  //   dev3: '192.168.31.11/fusion-api/api/v1'
  // }

  let webSite = {
    prod: 'fusion-vue.trustinsure.cn',
    prerls: 'fusion-vue.trustinsure.cn',
    rls: 'fusion-vue.trustinsure.cn',
    dev1: 'fusion-vue.trustinsure.cn',
    dev2: 'fusion-vue.trustinsure.cn',
    dev3: 'fusion-vue.trustinsure.cn'
  }
  let fsApiSite = {
    prod: 'api.fusion.zanservice.com/api/v1',
    prerls: 'api.fusion.prerls.zanservice.com/api/v1',
    rls: 'api.fusion.rls.zanservice.com/api/v1',
    dev1: 'api.fusion.dev1.zanservice.com/api/v1',
    dev2: 'api.fusion.dev2.zanservice.com/api/v1',
    dev3: 'api.fusion.dev3.zanservice.com/api/v1'
  }
  let servicePlatformSite = {
    prod: 'svspltfm.fusion.zanservice.com',
    prerls: 'svspltfm.fusion.prerls.zanservice.com',
    rls: 'svspltfm.fusion.rls.zanservice.com',
    dev1: 'svspltfm.fusion.dev1.zanservice.com',
    dev2: 'svspltfm.fusion.dev2.zanservice.com',
    dev3: 'svspltfm.fusion.dev3.zanservice.com'
  }

  let apiStage = {
    release: 'RELEASE',
    pre: 'PRE',
    test: 'TEST'
  }

  let wechatAppId = {
    prod: 'ww0cc00c4a6f64c09b',
    nonProd: 'ww0cc00c4a6f64c09b'
  }

  let configProd = {
    wechatAppId: wechatAppId.prod,
    fsApiSite: fsApiSite.prod,
    apiSite: apiSite.prod,
    apiStage: apiStage.release,
    webSite: webSite.prod,
    spApiSite: servicePlatformSite.prod
  }

  let configPrerls = {
    wechatAppId: wechatAppId.prod,
    fsApiSite: fsApiSite.prerls,
    apiSite: apiSite.prod,
    apiStage: apiStage.pre,
    webSite: webSite.prerls,
    spApiSite: servicePlatformSite.prerls
  }

  let configRls = {
    wechatAppId: wechatAppId.nonProd,
    fsApiSite: fsApiSite.rls,
    apiSite: apiSite.prod,
    webSite: webSite.rls,
    apiStage: apiStage.test,
    spApiSite: servicePlatformSite.rls
  }

  let configDev = {
    wechatAppId: wechatAppId.nonProd,
    fsApiSite: fsApiSite.dev2,
    apiSite: apiSite.dev2,
    webSite: webSite.dev,
    apiStage: apiStage.test
  }

  let configDev1 = {
    wechatAppId: wechatAppId.nonProd,
    fsApiSite: fsApiSite.dev1,
    apiSite: apiSite.dev1,
    webSite: webSite.dev1,
    apiStage: apiStage.test,
    spApiSite: servicePlatformSite.dev1
  }

  let configDev2 = {
    wechatAppId: wechatAppId.nonProd,
    fsApiSite: fsApiSite.dev2,
    apiSite: apiSite.dev2,
    webSite: webSite.dev2,
    apiStage: apiStage.test,
    spApiSite: servicePlatformSite.dev2
  }

  let configDev3 = {
    wechatAppId: wechatAppId.nonProd,
    fsApiSite: fsApiSite.dev3,
    apiSite: apiSite.dev3,
    apiStage: apiStage.test,
    webSite: webSite.dev3,
    spApiSite: servicePlatformSite.dev3
  }

  switch (env) {
    case 'production':
      return configProd
    case 'prerls':
      return configPrerls
    case 'release':
      return configRls
    case 'dev1':
      return configDev1
    case 'dev2':
      return configDev2
    case 'dev3':
      return configDev3
    default:
      return configDev
  }
}(window.env))

export const AuthorizedApp = {
  key: '24827041',
  secret: 'f07fef5fff817d4dccc89a8db4ef150c'
}

export const wechatAppId = config.wechatAppId
export const ApiStage = config.apiStage
export const API_ROOT = 'http://'.concat(config.apiSite)
export const ApiBaseUrl = `http://${config.apiSite.split('/')[0]}/`
export const FS_API_ROOT = 'http://'.concat(config.fsApiSite)
export const domain = 'http://'.concat(config.webSite)
export const HelpPage = `http://${config.apiSite}/#/Help`
export const SP_API_ROOT = 'http://'.concat(config.spApiSite)
