import { AliGateway } from '../common/gatewaylib'
import wxApiUrl from './resource'
import store from '../store'

export default {
  async getCompanyList (id) {
    let data = await AliGateway.get(wxApiUrl.getCompanyList + id)

    return data
  },
  async createCompany (company) {
    let data = await AliGateway.post(wxApiUrl.createCompany, company)
    return data
  },
  // 消息列表
  async getMessageList (param) {
    let query = {
      personId: store.state.person.personId,
      read: param.read.toString(),
      page: param.page,
      limit: 10
    }
    let data = await AliGateway.get(wxApiUrl.getMessage, query)
    return data
  },
  // 消息已读回执
  async putMessage (messageId) {
    let data = await AliGateway.post(wxApiUrl.putMessage, messageId)
    return data
  },
  // 个人信息
  async getPersonInfo (personId) {
    let data = await AliGateway.get(wxApiUrl.getPerson + personId)
    return data
  },
  // 人员组织信息
  async getOrgInfo (personId) {
    let data = await AliGateway.get(wxApiUrl.getPerson + personId + '/organizations')
    return data
  },
  // 组织-授权项目接口
  async getProjects (organizationId) {
    let data = await AliGateway.get(wxApiUrl.getProjects + organizationId + '/projects')
    return data
  },
  // 组织-获取下级组织列表
  async getSubOrganizations (organizationId) {
    let data = await AliGateway.get(wxApiUrl.getProjects + organizationId + '/suborganizations')
    return data
  },
  // 获取合作伙伴信息
  async getPartner (partnerId) {
    let data = await AliGateway.get(wxApiUrl.getPartner + partnerId)
    return data
  },
  // 同级列表
  async sameInfo (organizationId) {
    let data = await AliGateway.get(wxApiUrl.getPerson + store.state.person.personId + '/' + organizationId + '/same_level_persons')
    return data
  },
  // 下级列表
  async subInfo (organizationId) {
    let data = await AliGateway.get(wxApiUrl.getPerson + store.state.person.personId + '/' + organizationId + '/sub_level_persons')
    return data
  },
  // 任务列表
  async getAcceptable () {
    let query = {
      personId: store.state.person.personId
    }
    let data = await AliGateway.get(wxApiUrl.getAcceptable, query)
    return data
  },
  async getPersonTask (page) {
    let query = {
      personId: store.state.person.personId,
      page,
      limit: 10
    }
    let data = await AliGateway.get(wxApiUrl.getPersonTasks, query)
    return data
  },
  // 任务进度
  async getTaskSchedule (personTaskId) {
    let data = await AliGateway.get(wxApiUrl.getPersonTask + personTaskId)
    return data
  },
  // 任务详情
  async getTaskDetail (taskId) {
    let data = await AliGateway.get(wxApiUrl.getTask + taskId)
    return data
  },
  // 接受任务
  async postTask (taskId) {
    let param = {
      taskId,
      personId: store.state.person.personId
    }
    let res = await AliGateway.post(wxApiUrl.postTasks, param)
    return res
  },
  // 重置任务
  async deleteSubTask (personTaskId) {
    let data = await AliGateway.delete(wxApiUrl.getPersonTask + personTaskId)
    return data
  },
  // 完成任务
  async taskIncome (personTaskId) {
    let data = await AliGateway.post(wxApiUrl.taskIncome, personTaskId)
    return data
  },
  // 任务分配
  async postSubTask (params) {
    function a (data) {
      data = JSON.stringify(data)
      return data
    }

    a(params.taskItems)
    a(params.taskIncomes)
    params = a(params)
    let param = {
      json: params
    }
    let data = await AliGateway.post(wxApiUrl.postSubTasks, param)
    return data
  },
  //  子任务提交 新建->有效
  async submitSubTask (personTaskId) {
    let data = await AliGateway.post(wxApiUrl.submitSubTask, personTaskId)
    return data
  },
  // 单页列表
  async getMaterials (param) {
    let query = {
      title: '',
      materialType: param.materialType.toString(),
      personId: store.state.person.personId,
      page: param.page,
      limit: 20
    }
    let data = await AliGateway.get(wxApiUrl.getMaterials, query)
    return data
  },
  // 单页详情
  async getMaterialsDetails (id) {
    let data = await AliGateway.get(wxApiUrl.getMaterialsDetails + id)
    return data
  },
  // Faq
  // 订单确认页面
  async getOrderConfirm (id) {
    let data = await AliGateway.get(wxApiUrl.getOrder + id)
    return data
  },
  // 获取支付宝支付
  async getAlipayForm (paymentId) {
    let data = await AliGateway.get(wxApiUrl.pay + paymentId + '/pay/ali_web')
    return data
  },
  // 号百支付确认
  async postBaiPayConfirm (paymentId, param) {
    let postData = {
      PayType: param.PayType,
      PayerType: param.PayerType
    }
    let data = await AliGateway.post(wxApiUrl.pay + paymentId + '/pay_type', postData)
    return data
  },
  // 获取排名列表
  async getRankings (param) {
    let query = {
      storeId: param.storeId,
      projectId: param.projectId
    }
    let data = await AliGateway.get(wxApiUrl.getRankings, query)
    return data
  },
  // 获取排名详情
  async getRankingDetail (param) {
    let query = {
      personId: store.state.person.personId,
      storeId: param.storeId,
      projectId: param.projectId
    }
    let data = await AliGateway.get(wxApiUrl.getRankingDetail + param.reportConfigId, query)
    return data
  },
  // 获取需开金额,待确认金额
  async getInvoiceSummary () {
    let data = await AliGateway.get(wxApiUrl.getPerson + store.state.person.personId + '/invoice_summary')
    return data
  },
  // 获取发票列表
  async getInvoiceList (param) {
    let query = {
      personId: store.state.person.personId,
      page: param,
      limit: 5
    }
    let data = await AliGateway.get(wxApiUrl.getInvoiceList, query)
    return data
  },
  // 获取发票详情
  async getInvoiceDetail (invoiceId) {
    let data = await AliGateway.get(wxApiUrl.getInvoice + invoiceId)
    return data
  },
  // 提交发票
  async postInvoice (params) {
    let data = await AliGateway.post(wxApiUrl.postInvoice, {
      personId: store.state.person.personId,
      code: params.code,
      number: params.number,
      amount: params.amount
    })
    return data
  },
  // 删除发票
  async getDeleteInvoice (invoiceId) {
    let data = await AliGateway.delete(wxApiUrl.getInvoice + invoiceId)
    return data
  },
  // 获取订单列表
  async getOrders (page) {
    let query = {
      personId: store.state.person.personId,
      page: page,
      limit: 5
    }
    let data = await AliGateway.get(wxApiUrl.getOrders, query)
    return data
  },
  // 下单--服务包列表
  async getServicePacks (params) {
    let query = {
      storeId: params.storeId,
      projectId: params.projectId
    }
    let data = await AliGateway.get(wxApiUrl.getServicePacks, query)
    return data
  },
  // 下单--服务产品
  async getServiceOptionItems (params) {
    if (params.purchaseTime) {
      params.purchaseTime = params.purchaseTime.toString()
    }
    let query = {
      purchasePrice: params.purchasePrice,
      purchaseTime: params.purchaseTime,
      personId: store.state.person.personId
    }
    let data = await AliGateway.get(wxApiUrl.getServicePack + params.servicePackId + '/service_option_items', query)
    return data
  },
  // 获取订单详情
  async getOrderDetail (orderId) {
    let data = await AliGateway.get(wxApiUrl.getOrder + orderId)
    return data
  },
  // 获取客户产品扩展数据
  async getDeviceExpands (param) {
    let data = await AliGateway.get(wxApiUrl.getOrder + param.orderId + '/device/' + param.deviceId + '/expands')
    return data
  },
  // 获取服务产品详情
  async getServicePack (servicePackId) {
    let data = await AliGateway.get(wxApiUrl.getServicePack + servicePackId)
    return data
  },
  // 获取服务条款
  async getLicenceBySku (licenceId) {
    let data = await AliGateway.get(wxApiUrl.getLicenceBySku + licenceId)
    return data
  },
  // 下单--保存订单
  async getSaveOrder (params) {
    let data = await AliGateway.post(wxApiUrl.getSaveOrder, params)
    return data
  },
  // 下单--获取支付方法
  async getPaymentMethod (id) {
    let data = await AliGateway.get(wxApiUrl.pay + id + '/pay/methods')
    return data
  },
  // 下单--订单支付方式确认接口
  async postPayConfirm (params) {
    let postData = {
      payType: params.payType.toString(),
      payerType: params.payerType.toString()
    }
    let data = await AliGateway.post(wxApiUrl.pay + params.paymentId + '/pay_type', postData)
    return data
  },
  // 收银台支付
  async cashier_pay (param) {
    let postData = {
      no: param.no.toString()
    }
    let data = await AliGateway.post(wxApiUrl.pay + param.paymentId + '/pay/cash', postData)
    return data
  },
  // 微信扫码
  async scan (paymentId) {
    let data = await AliGateway.get(wxApiUrl.pay + paymentId + '/pay/weixin_qrcode')
    return data
  },
  // 微信扫码长轮询
  async payment (paymentId) {
    let query = {
      paymentId
    }
    let data = await AliGateway.get(wxApiUrl.payment, query)
    return data
  },
  // 微信源生
  async sales (paymentId) {
    let agentId = window.localStorage.getItem('agentId')
    let query = {
      agentId
    }
    let data = await AliGateway.get(wxApiUrl.pay + paymentId + '/pay/weixin_native', query)
    return data
  },
  // 下单--获取品类
  async getCategories (orderId) {
    let query = {
      orderId
    }
    let data = await AliGateway.get(wxApiUrl.getCategories, query)
    return data
  },
  // 下单--获取品牌
  async getBrands (params) {
    let query = {
      orderId: params.orderId,
      categoryId: params.categoryId,
      name: params.name,
      page: params.page,
      limit: params.limit || 50
    }
    let data = await AliGateway.get(wxApiUrl.getBrands, query)
    return data
  },
  // 下单--获取热门品牌
  async getPopularBrand (params) {
    let query = {
      orderId: params.orderId,
      projectId: params.projectId,
      categoryId: params.categoryId,
      top: 10
    }
    let data = await AliGateway.get(wxApiUrl.getPopularBrand, query)
    return data
  },
  // 下单--获取扩展字段
  async getObjectExpands (params) {
    let query = {
      categoryId: params.categoryId
    }
    let data = await AliGateway.get(wxApiUrl.getServicePack + params.servicePackId + '/expands', query)
    return data
  },
  // 订单提交
  async postOrder (param) {
    let postData = {
      personId: store.state.person.personId,
      brandId: param.brandId,
      categoryId: param.categoryId,
      customerName: param.customerName,
      customerPhone: param.customerPhone,
      expandData: JSON.stringify(param.expandData),
      purchasePrice: param.purchasePrice.toString(),
      remark: param.remark || '',
      serviceOptionItemId: param.serviceOptionItemId
    }
    let data = await AliGateway.post(wxApiUrl.getOrder + param.orderId + '/detail', postData)
    return data
  },
  // 抽奖--是否可抽奖及中奖结果
  async getIsDraw (orderId) {
    let data = await AliGateway.get(wxApiUrl.getOrder + orderId + '/draw')
    return data
  },
  // 订单修改
  async reviseOrder (orderId, param) {
    let reviseOrder = {
      purchasePrice: param.purchasePrice,
      purchaseTime: param.purchaseTime,
      serviceOptionItemId: param.serviceOptionItemId
    }
    let data = await AliGateway.post(wxApiUrl.getOrder + orderId, reviseOrder)
    return data
  },
  // 获取佣金金额
  async getCommissionAmount () {
    let data = await AliGateway.get(wxApiUrl.getPerson + store.state.person.personId + '/commission_summary')
    return data
  },
  //  获取提现列表
  async getAccountPayments (param) {
    let query = {
      personId: store.state.person.personId,
      page: param,
      limit: 10
    }
    let data = await AliGateway.get(wxApiUrl.getAccountPayments, query)
    return data
  },
  // 提现申请
  async postCash () {
    let data = await AliGateway.post(wxApiUrl.postCash, store.state.person.personId)
    return data
  },
  //  获取提现详情_佣金列表
  async getWithdrawDetailList (p) {
    let query = {
      divideType: p.divideType,
      startTime: p.startTime,
      endTime: p.endTime,
      page: p.page,
      limit: 5
    }
    let data = await AliGateway.get(wxApiUrl.getAccountPayment + p.paymentId + '/account_settles', query)
    return data
  },
  //  获取佣金列表
  async getCommissionList (params) {
    let query = {
      personId: store.state.person.personId,
      divideType: params.divideType,
      startTime: params.startTime,
      endTime: params.endTime,
      audited: params.audited,
      paid: params.paid,
      page: params.page,
      limit: 5
    }
    let data = await AliGateway.get(wxApiUrl.getCommissionList, query)
    return data
  },
  // 获取佣金详情
  async getCommissionDetail (accountSettleId) {
    let data = await AliGateway.get(wxApiUrl.getCommissionDetail + accountSettleId)
    return data
  },
  // 提现信息汇总
  async getAccountPayment (paymentId) {
    let data = await AliGateway.get(wxApiUrl.getAccountPayment + paymentId)
    return data
  },
  // 佣金类型
  async getDivideType () {
    let data = await AliGateway.get(wxApiUrl.getDivideType)
    return data
  },
  // 协议列表
  async getLicenceList () {
    let query = {
      personId: store.state.person.personId
    }
    let data = await AliGateway.get(wxApiUrl.getLicenceList, query)
    return data
  },
  // 协议详情
  async getLicenceDetail (licenceId) {
    let data = await AliGateway.get(wxApiUrl.getLicenceDetail + licenceId)
    return data
  },
  // 提交协议
  async postLicence (LicenceId) {
    let poseData = {
      personId: store.state.person.personId,
      LicenceId
    }
    let data = await AliGateway.post(wxApiUrl.postLicence, poseData)
    return data
  },
  // 地理信息
  async getGeography (params) {
    let query = {
      geographyType: params.geographyType.toString(),
      parentId: params.parentId.toString()
    }
    let data = await AliGateway.get(wxApiUrl.getGeography, query)
    return data
  },
  // 地理信息
  async geocode (lat, lng, coordType) {
    let query = {
      lat: lat.toString(),
      lng: lng.toString(),
      coordType
    }
    let data = await AliGateway.get(wxApiUrl.geocode, query)
    return data
  },
  // 个人银行信息提交
  async postPersonBankInfo (params) {
    let postData = {
      personId: store.state.person.personId,
      name: params.name,
      idCardNumber: params.idCardNumber,
      idCardImage: params.idCardImage, // 身份证正面
      idCardImageB: params.idCardImageB, // 身份证反面
      idCardImageId: params.idCardImageId,
      idCardImageBId: params.idCardImageBId,
      bankOrganizationName: params.bankOrganizationName, // 开户行
      bankOrganizationCode: params.bankOrganizationCode.toString(), // 银行编码
      bankName: params.bankName, // 开户分行
      bankAccountNo: params.bankAccountNo, // 卡号
      accountName: params.accountName, // 持卡人姓名
      provinceId: params.provinceId,
      cityId: params.cityId,
      countyId: params.countyId,
      provinceName: params.provinceName,
      cityName: params.cityName,
      countyName: params.countyName
    }
    let data = await AliGateway.post(wxApiUrl.postPersonBankInfo, postData)
    return data
  },
  // 获取个人银行信息
  async getPersonBankInfo () {
    let data = await AliGateway.get(wxApiUrl.getPersonBankInfo + store.state.person.personId + '/bank')
    return data
  },
  // 获取中奖名单
  async getDrawHistory (excitationId) {
    let data = await AliGateway.get(wxApiUrl.getDrawHistory + excitationId + '/draw_history')
    return data
  },
  // 获取奖品列表
  async getExcitation (orderId) {
    let data = await AliGateway.get(wxApiUrl.getDrawHistory + orderId)
    return data
  },
  // 获取奖品
  async postDraw (params) {
    let data = await AliGateway.post(wxApiUrl.getOrder + params.orderId + '/draw', params.excitationId, 10000)
    return data
  },
  // 获取抽奖单状态
  async getDraw (orderId) {
    let data = await AliGateway.get(wxApiUrl.getOrder + orderId + '/draw')
    return data
  },

  // 微信登陆授权获取PersonId
  async getWxPerson (param) {
    let agentId = window.localStorage.getItem('agentId')
    if (!agentId) {
      agentId = 1000002
    }
    let query = {
      code: param.code,
      state: param.state,
      agentId
    }
    let data = await AliGateway.get(wxApiUrl.getWxPerson, query).catch((error) => {
      alert(error.message)
    })
    return data
  },
  // 微信Token
  async getToken () {
    let agentId = window.localStorage.getItem('agentId')
    let query = {
      agentId
    }
    let data = await AliGateway.get(wxApiUrl.getToken, query)
    return data
  },
  // 微信Ticket
  async getTicket (param) {
    let agentId = window.localStorage.getItem('agentId')
    let query = {
      code: param.code,
      state: param.state,
      agentId
    }
    let data = await AliGateway.get(wxApiUrl.getTicket, query)
    return data
  },
  // 微信Signature
  async getSignature (url) {
    let agentId = window.localStorage.getItem('agentId')
    let query = {
      url,
      agentId
    }
    let data = await AliGateway.get(wxApiUrl.getSignature, query)
    return data
  },
//  报表
  async getReportForm (param) {
    let data = await AliGateway.get(wxApiUrl.getReportForm, param)
    return data
  },

  // 订单创建（号百）
  async submitOrders (orderId) {
    let data = await AliGateway.get(wxApiUrl.submitOrders + orderId)
    return data
  },
//  获取图片
  async getImage (mediaId, type) {
    let agentId = window.localStorage.getItem('agentId')
    let query = {
      mediaId,
      type,
      agentId
    }
    let data = await AliGateway.get(wxApiUrl.getImage, query)
    return data
  },
  // 验证卡密
  async getCarmal (cardId, cardpwd) {
    let postData = {
      cardId,
      cardpwd
    }
    let data = await AliGateway.get(wxApiUrl.postCarmal, postData)
    return data
  },
  // 激活品类
  async activateCategories (sku) {
    let query = {
      sku
    }
    let data = await AliGateway.get(wxApiUrl.activationCategories, query)
    return data
  },
  // 激活品牌
  async activationBrands (param) {
    let query = {
      sku: param.sku,
      categoryId: param.categoryId,
      name: param.name,
      page: param.page || 1,
      limit: param.limit || 10
    }
    let data = await AliGateway.get(wxApiUrl.activationBrands, query)
    return data
  },
  // 热门品牌
  async popular (param) {
    let query = {
      serviceOptionItemId: param.serviceOptionItemId,
      storeId: param.storeId,
      projectId: param.projectId,
      categoryId: param.categoryId,
      top: param.top || 10
    }
    let data = await AliGateway.get(wxApiUrl.popular, query)
    return data
  },
  // 激活订单保存
  async activateSavingOrder (param) {
    let postData = {
      cardId: param.order.cardId,
      sku: param.order.sku,
      storeId: param.order.storeId,
      projectId: param.order.projectId,
      brandId: param.order.brandId,
      categoryId: param.order.categoryId,
      customerName: param.order.customerName,
      customerPhone: param.order.customerPhone,
      purchasePrice: param.order.purchasePrice,
      purchaseTime: param.order.purchaseTime,
      personId: store.state.person.personId,
      expandData: JSON.stringify(param.order.expandData),
      remark: param.order.remark || ''
    }
    let data = await AliGateway.post(wxApiUrl.activationOrder, postData)
    return data
  },
  // 合同查询 （出险核销）
  async getContractList (value) {
    let query = {
      personId: store.state.person.personId,
      param: value
    }
    let data = await AliGateway.get(wxApiUrl.getContractList, query)
    return data
  },
  // 延保核销权限管理(出险核销)
  async getAuthority () {
    let personId = store.state.person.personId
    let data = await AliGateway.get(wxApiUrl.getPersonBankInfo + personId + '/menu')
    return data
  },
  // 提交核销
  async postClaim (params) {
    let data = await AliGateway.post(wxApiUrl.postClaim, params)
    return data
  },
  // 小程序二维码生成
  async getQrCode () {
    let personId = store.state.person.personId
    let data = await AliGateway.get(wxApiUrl.getQrCode + personId + '/qrcode')
    return data
  },
  // 微信登陆授权获取PersonId
  async getVerifications (param) {
    let personId = store.state.person.personId
    param.personId = personId
    let data = await AliGateway.get(wxApiUrl.getVerifications, param)
    return data
  },
  // 取消订单
  async getOrderCancel (orderId) {
    let param = {
      cancelReason: ''
    }
    let data = await AliGateway.get(wxApiUrl.getOrderCancel + '/' + orderId + '/cancel', param)
    return data
  },
  // 获取合同的客户请求(已申请列表)
  async getCustomerServices (serviceContractId) {
    let data = await AliGateway.get(wxApiUrl.serviceContract.getCustomerServices(serviceContractId))
    return data
  },
  // 获取合同的客户请求(已申请详情)
  async getCustomerServiceDetail (customerServiceId) {
    let data = await AliGateway.get(wxApiUrl.customerService.getCustomerServiceDetail(customerServiceId))
    return data
  },
  // 获取电子合同接口
  async getContractPdf (serviceContractId) {
    let data = await AliGateway.get(wxApiUrl.serviceContract.getContractPdf(serviceContractId))
    return data
  },
  // 合同的可申请服务请求类型列表
  async getCustomerServiceTypeAppliable (serviceContractId) {
    let data = await AliGateway.get(wxApiUrl.serviceContract.getCustomerServiceTypeAppliable(serviceContractId))
    return data
  },
  // 获取发票详情接口
  async getInvoice (serviceContractId) {
    let data = await AliGateway.get(wxApiUrl.serviceContract.getInvoice(serviceContractId))
    return data
  },
  // 申请服务请求
  async postCustomerService (serviceContractId, params) {
    let data = await AliGateway.post(wxApiUrl.serviceContract.postCustomerService(serviceContractId), params)
    return data
  },
  // 获取合同详情
  async getContractDetail (serviceContractId) {
    let data = await AliGateway.get(wxApiUrl.serviceContract.getContractDetail(serviceContractId))
    return data
  },
  // 人员从组织离职
  async disabledPerson (organizationId, personId) {
    let data = await AliGateway.post(wxApiUrl.organization.disabledPerson(organizationId, personId))
    return data
  },
  // 人员从组织新增
  async newPerson (organizationId, params) {
    let data = await AliGateway.post(wxApiUrl.organization.newPerson(organizationId), params)
    return data
  },
  // 获取组织的就职人员列表
  async getPersonList (organizationId, params) {
    let data = await AliGateway.get(wxApiUrl.organization.getPersonList(organizationId), params)
    return data
  },
  // 当前组织的职位列表
  async getPositionList (organizationId, params) {
    let data = await AliGateway.get(wxApiUrl.organization.getPositionList(organizationId), params)
    return data
  },
  // 当前组织的职位列表
  async getAssumeInfoByPhone (params) {
    let data = await AliGateway.get(wxApiUrl.persons.getAssumeInfoByPhone(), params)
    return data
  },
  // SKU授权的品类列表
  async getCSProductCategories (serviceContractId) {
    let data = await AliGateway.get(wxApiUrl.serviceContract.getProductCategories(serviceContractId))
    return data
  },
  // 获取品牌列表
  async getCSBrands (params) {
    let data = await AliGateway.get(wxApiUrl.serviceContract.getBrands(), params)
    return data
  },
  // 获取红包详情
  async getBonus (bonusId, params) {
    let data = await AliGateway.get(wxApiUrl.bonus.getBonus(bonusId), params)
    return data
  },
  // 红包发放接口
  async sendBonus (bonusId, params) {
    let data = await AliGateway.post(wxApiUrl.bonus.sendBonus(bonusId), params)
    return data
  },
  // 红包领取接口
  async getBonu (bonusId, params) {
    let data = await AliGateway.post(wxApiUrl.bonus.getBonu(bonusId), params)
    return data
  },
  // 获取订单详情
  async getOrder (orderId, params) {
    let data = await AliGateway.get(wxApiUrl.order.getOrder(orderId), params)
    return data
  },
  // 获取红包活动
  async getBonusEvent (bonusEventId, params) {
    let data = await AliGateway.get(wxApiUrl.BounsEvent.getBonusEvent(bonusEventId), params)
    return data
  },
  // 红包活动操作人的发红包列表
  async getOperatorBonusList (params) {
    let data = await AliGateway.get(wxApiUrl.bonus.getOperatorBonusList(), params)
    return data
  },
  // 人员的红包活动操作人列表
  async getPersonBonusOperators (personId) {
    let data = await AliGateway.get(wxApiUrl.bonus.getPersonBonusOperators(personId))
    return data
  }
}
