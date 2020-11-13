import { AliGateway } from 'gatewaylib'
import { ApiBaseUrl } from './config'
import { VuexStorageMgr } from 'vuex_storage_mgr'

let geography = {
  getGeographyInfo: (geographyType, parentId) => `api/v1/geography?geographyType=${geographyType}&parentId=${parentId}`,
  getBaiduGeographyInfo: (lat, lng, coordType) => `api/v1/geography/geocode?lat=${lat}&lng=${lng}&coordType=${coordType}`
}

let serviceProduct = {
  getLicenceById: (licenceId) => `api/v1/service_product/licence/${licenceId}`
}

let enumJs = {
  downloadEnumJsFile: () => `api/v1/enum_js_module/download`
}

let enumType = {
  getDivideType: () => `api/v1/enum/divide_types`
}

let personTask = {
  acceptIncome: () => `api/v1/persontask/income`,
  acceptTask: () => `api/v1/persontask/submit`,
  personTask: (personTaskId) => `api/v1/persontask/${personTaskId}`,
  personTasks: (personId, page, limit) => `api/v1/persontasks?personId=${personId}&page=${page}&limit=${limit}`,
  removePersonTask: (personTaskId) => `api/v1/persontask/${personTaskId}`
}

let userManage = {
  logIn: (userName, passWord) => `api/v1/account/login?userName=${userName}&passWord=${passWord}`,
  getPermission: (userId) => `api/v1/permissions?userId=${userId}`,
  verifyUserConsistency: (agentId, code, userId) => `api/v1/account/consistency?agentId=${agentId}&code=${code}&userId=${userId}`
}

let verification = {
  queryVerificationServiceContract: (personId, param) => `api/v1/verification/contracts?personId=${personId}&param=${param}`,
  submitVerification: () => `api/v1/verification`,
  verificationRecord: (storeld, projectld, personId, StartTime, EndTime, param, page, limit) => `api/v1/verifications?storeld=${storeld}&projectld=${projectld}&personId=${personId}&StartTime=${StartTime}&EndTime=${EndTime}&param=${param}&page=${page}&limit=${limit}`
}

let category = {
  getCategories: (orderId) => `api/v1/categories?orderId=${orderId}`
}

let message = {
  personMessages: (personId, read, page, limit) => `api/v1/messages?personId=${personId}&read=${read}&page=${page}&limit=${limit}`,
  readMessages: () => `api/v1/message/read_receipt`
}

let account = {
  getAccountSettle: (accountSettleId) => `api/v1/account/settle/${accountSettleId}`,
  getAccountSettles: (personId, divideType, startTime, endTime, audited, paid, page, limit) => `api/v1/account/settles?personId=${personId}&divideType=${divideType}&startTime=${startTime}&endTime=${endTime}&audited=${audited}&paid=${paid}&page=${page}&limit=${limit}`,
  getAccountPayments: (personId, page, limit) => `api/v1/account/payments?personId=${personId}&page=${page}&limit=${limit}`,
  getAccountPayment: (paymentId) => `api/v1/account/payment/${paymentId}`,
  getAccountSettlesByPaymentId: (paymentId, divideType, startTime, endTime, page, limit) => `api/v1/account/payment/${paymentId}/account_settles?divideType=${divideType}&startTime=${startTime}&endTime=${endTime}&page=${page}&limit=${limit}`,
  receiveJiaxinSignResult: () => `api/v1/jiaxin/callback/sign_result`,
  receiveJiaxinOrderStatusResult: () => `api/v1/jiaxin/callback/order_status`
}

let contract = {
  getContractAppliedRequest: (serviceContractId) => `api/v1/serviceContract/${serviceContractId}/customerServices`,
  createContractPdf: (serviceContractId) => `api/v1/serviceContract/${serviceContractId}/contractPdf`,
  getCustomerServiceTypeAppliable: (serviceContractId) => `api/v1/serviceContract/${serviceContractId}/customerServiceTypeAppliable`,
  getInvoiceDetail: (serviceContractId) => `api/v1/serviceContract/${serviceContractId}/invoice`,
  createCustomerService: (serviceContractId) => `api/v1/serviceContract/${serviceContractId}/customerService`,
  getContract: (serviceContractId) => `api/v1/serviceContract/${serviceContractId}`,
  getProductCateogries: (serviceContractId) => `api/v1/serviceContract/${serviceContractId}/productCategories`,
  getBrands: (name, page, limit) => `api/v1/brands?name=${name}&page=${page}&limit=${limit}`,
  getCustomerService: (customerServiceId) => `api/v1/customerService/${customerServiceId}`
}

let recycleOrder = {
  createRecyleOrder: () => `api/v1/recycle_order`,
  cancelRecyleOrder: (recycleOrderId) => `api/v1/recycle_order/${recycleOrderId}/cancel`,
  updateRecyleOrder: () => `api/v1/partner/recovery_order/update`,
  getRecyleOrder: (recycleOrderId) => `api/v1/recycle_order/${recycleOrderId}`,
  getRecyleOrders: (personId, customerPhone, page, limit) => `api/v1/recycle_orders?personId=${personId}&customerPhone=${customerPhone}&page=${page}&limit=${limit}`
}

let person = {
  savePersonBankInfo: () => `api/v1/person`,
  getPersonBankInfo: (personId) => `api/v1/person/${personId}/bank`,
  getSameLevelPersonInfos: (personId, organizationId) => `api/v1/person/${personId}/${organizationId}/same_level_persons`,
  getSubLevelPersonInfos: (personId, organizationId) => `api/v1/person/${personId}/${organizationId}/sub_level_persons`,
  personInfo: (personId) => `api/v1/person/${personId}`,
  getOrganizationEmployees: (personId) => `api/v1/person/${personId}/organizations`,
  getCommissionAmount: (personId) => `api/v1/person/${personId}/commission_summary`,
  getInvoiceSummary: (personId) => `api/v1/person/${personId}/invoice_summary`,
  applyForCash: () => `api/v1/person/cash`,
  getQyMenu: (personId) => `api/v1/person/${personId}/menu`,
  getQrCode: (personId) => `api/v1/person/${personId}/qrcode`,
  getPersonOrganizationListByPhone: (phone) => `api/v1/persons?phone=${phone}`,
  createContractSign: () => `api/v1/person/account/create`
}

let order = {
  getOrderList: (personId, page, limit) => `api/v1/orders?personId=${personId}&page=${page}&limit=${limit}`,
  getOrderDetail: (orderId) => `api/v1/order/${orderId}`,
  saveOrder: () => `api/v1/order`,
  modifyOrder: (orderId) => `api/v1/order/${orderId}`,
  orderCancel: (orderId, cancelReason) => `api/v1/order/${orderId}/cancel?cancelReason=${cancelReason}`,
  submitOrder: (orderId) => `api/v1/order/${orderId}/detail`,
  getDrawDetail: (orderId) => `api/v1/order/${orderId}/draw`,
  luckDraw: (orderId) => `api/v1/order/${orderId}/draw`,
  getCustomerDeviceExpand: (orderId, deviceId) => `api/v1/order/${orderId}/device/${deviceId}/expands`,
  saveBesttoneOrder: (orderId) => `api/v1/order/besttone/${orderId}`,
  getMarketMessages: () => `api/v1/orders/by_order_codes`,
  getPartnerOrders: () => `api/v1/partner/orders`
}

let invoice = {
  getInvoiceDetail: (invoiceId) => `api/v1/invoice/${invoiceId}`,
  getInvoiceList: (personId, page, limit) => `api/v1/invoices?personId=${personId}&page=${page}&limit=${limit}`,
  inoviceSubmit: () => `api/v1/invoice`,
  deleteInvoice: (invoiceId) => `api/v1/invoice/${invoiceId}`
}

let payment = {
  getAliPayForm: (paymentId) => `api/v1/payment/${paymentId}/pay/ali_web`,
  cashierPay: (paymentId) => `api/v1/payment/${paymentId}/pay/cash`,
  getWeixinPayNative: (paymentId, agentId) => `api/v1/payment/${paymentId}/pay/weixin_native?agentId=${agentId}`,
  getWeixinPayHtml: () => `api/v1/payment/pay/weixin_html`,
  getAliPayHtml: () => `api/v1/payment/pay/ali_pay_web`,
  getWeixinPayQrcode: (paymentId) => `api/v1/payment/${paymentId}/pay/weixin_qrcode`,
  getPaymentMethod: (paymentId) => `api/v1/payment/${paymentId}/pay/methods`,
  paymentResultBack: (code) => `api/v1/payment/callback?code=${code}`,
  paymentPayMethodConfirm: (paymentId) => `api/v1/payment/${paymentId}/pay_type`,
  getPayment: (paymentId) => `api/v1/payment?paymentId=${paymentId}`
}

let excitation = {
  getLuckDrawDetail: (orderId) => `api/v1/excitation/${orderId}`,
  getLuckDrawHistory: (excitationId) => `api/v1/excitation/${excitationId}/draw_history`
}

let organization = {
  getOrganizationProjects: (organizationId) => `api/v1/organization/${organizationId}/projects`,
  getPartner: (partnerId) => `api/v1/organization/partner/${partnerId}`,
  getSubStores: (organizationId) => `api/v1/organization/${organizationId}/suborganizations`,
  getOrganizationPersonList: (organizationId, enabled) => `api/v1/organization/${organizationId}/persons?enabled=${enabled}`,
  getPositionList: (organizationId) => `api/v1/organization/${organizationId}/positions`,
  disablePerson: (organizationId, personId) => `api/v1/organization/${organizationId}/person/${personId}/disabled`,
  addPerson: (organizationId) => `api/v1/organization/${organizationId}/person`
}

let config = {
  getPartnerConfig: (partnerId) => `api/v1/partner/${partnerId}/config`,
  getPartnerConfigByPartnerId: (partnerId) => `api/v1/partner/config?partnerId=${partnerId}`
}

let material = {
  getMaterialInfo: (materialId) => `api/v1/material/${materialId}`,
  getMaterialList: (title, materialType, personId, page, limit) => `api/v1/materials?title=${title}&materialType=${materialType}&personId=${personId}&page=${page}&limit=${limit}`
}

let bonus = {
  getOperatorBonusList: (bonusEventOperatorId, page, limit) => `api/v1/bonuses?bonusEventOperatorId=${bonusEventOperatorId}&page=${page}&limit=${limit}`,
  getPersonBounsOperators: (personId) => `api/v1/person/${personId}/bonusEventOperators`,
  getBonusEvent: (bonusEventId) => `api/v1/bonusEvent/${bonusEventId}`,
  getBonus: (bonusId) => `api/v1/bonus/${bonusId}`,
  bonusRelease: (bonusId) => `api/v1/bonus/${bonusId}/release`,
  bonusReceive: (bonusId) => `api/v1/bonus/${bonusId}/receive`
}

let report = {
  rankingDetail: (reportConfigId, personId, storeId, projectId) => `api/v1/report/ranking/${reportConfigId}?personId=${personId}&storeId=${storeId}&projectId=${projectId}`,
  rankingList: (storeId, projectId) => `api/v1/report/rankings?storeId=${storeId}&projectId=${projectId}`,
  getSalesOrderReportTest: (startTime, endTime, partnerId, projectId, organizationId, personId, organizationScopes, dimensions, results) => `api/v1/report/sale_orders?startTime=${startTime}&endTime=${endTime}&partnerId=${partnerId}&projectId=${projectId}&organizationId=${organizationId}&personId=${personId}&organizationScopes=${organizationScopes}&dimensions=${dimensions}&results=${results}`
}

let licence = {
  getLicenceDetail: (licenceId) => `api/v1/licence/${licenceId}`,
  getPersonLicences: (personId) => `api/v1/licences?personId=${personId}`,
  agreedLicence: () => `api/v1/licence/agreement`
}

let task = {
  getTaskById: (taskId) => `api/v1/task/${taskId}`,
  taskAccept: () => `api/v1/task/accept`,
  taskDistribute: () => `api/v1/task/distribute`,
  tasks: (personId) => `api/v1/tasks?personId=${personId}`
}

let brand = {
  addSortedTopBrands: () => `api/v1/brands/popular_ranks/init_top_brands`,
  getHotBrands: (orderId, categoryId, name, page, limit) => `api/v1/hotbrands?orderId=${orderId}&categoryId=${categoryId}&name=${name}&page=${page}&limit=${limit}`,
  getPopularBrandList: (orderId, projectId, categoryId, top) => `api/v1/brand/popular_ranks?orderId=${orderId}&projectId=${projectId}&categoryId=${categoryId}&top=${top}`,
  updateCumulativeBrand: (projectId, categoryId, brandId, brandName) => `api/v1/brand/cumulative_brand?projectId=${projectId}&categoryId=${categoryId}&brandId=${brandId}&brandName=${brandName}`
}

let apiJs = {
  generateApiJsModule: () => `api/v1/route_js_module/download`
}

let wxOAuth = {
  getPersonIdByWxCode: (code, state, agentId) => `api/v1/wx_oauth/wx_login?code=${code}&state=${state}&agentId=${agentId}`,
  getTicket: (agentId) => `api/v1/wx_oauth/ticket?agentId=${agentId}`,
  getToken: (agentId) => `api/v1/token?agentId=${agentId}`,
  getSignature: (url, agentId) => `api/v1/wx_oauth/signature?url=${url}&agentId=${agentId}`,
  getWxImage: (agentId, mediaId, type) => `api/v1/wx_image?agentId=${agentId}&mediaId=${mediaId}&type=${type}`
}

let partnerCso = {
  savePartnerCso: () => `api/v1/partner/cso`
}

let servicePack = {
  getServicePacks: (storeId, projectId) => `api/v1/service_packs?storeId=${storeId}&projectId=${projectId}`,
  getServiceOptionItems: (servicePackId, purchasePrice, purchaseTime, personId) => `api/v1/service_pack/${servicePackId}/service_option_items?purchasePrice=${purchasePrice}&purchaseTime=${purchaseTime}&personId=${personId}`,
  getServiceOptionItem: (servicePackId, serviceOptionItemId) => `api/v1/service_pack/${servicePackId}/service_option_item/${serviceOptionItemId}`,
  getServicePackDetail: (servicePackId) => `api/v1/service_pack/${servicePackId}`,
  getObjectExpands: (servicePackId, categoryId) => `api/v1/service_pack/${servicePackId}/expands?categoryId=${categoryId}`
}

let jd = {
  receiveAuditData: () => `api/v1/jd_audit_data/receive`,
  queryAuditData: () => `api/v1/jd_audit_datas`
}

let csoSchedule = {
  getCsoSchedules: () => `api/v1/cso_schedules`,
  getCsoScheduleConfig: () => `api/v1/cso_schedule/config`,
  updateCsoQty: (csoScheduleId) => `api/v1/cso_schedule/${csoScheduleId}/update_cso_qty`
}

let serviceOrder = {
  getServiceOrders: (partnerId, thirdPartyUserId, status, statusCategory, page, limit) => `api/v1/serviceOrders?partnerId=${partnerId}&thirdPartyUserId=${thirdPartyUserId}&status=${status}&statusCategory=${statusCategory}&page=${page}&limit=${limit}`,
  createServiceOrder: () => `api/v1/serviceOrder`,
  getCsoCategory: (partnerId, csoCategoryId) => `api/v1/cso/partner/${partnerId}/category/${csoCategoryId}`,
  getCso: (csoCode) => `api/v1/cso/${csoCode}`,
  getServiceOrder: (serviceOrderId) => `api/v1/serviceOrder/${serviceOrderId}`,
  csoChangeStatusCallback: (code, status, statusCategory) => `api/v1/cso/change_status?code=${code}&status=${status}&statusCategory=${statusCategory}`,
  getAliWebPay: (serviceOrderId, redirectUrl) => `api/v1/serviceOrder/${serviceOrderId}/payment/ali_pay_web?redirectUrl=${redirectUrl}`,
  getWeChatWebPay: (serviceOrderId, redirectUrl) => `api/v1/serviceOrder/${serviceOrderId}/payment/wechat_pay_web?redirectUrl=${redirectUrl}`,
  serviceOrderPayCallback: (code) => `api/v1/serviceOrder/payment/callback?code=${code}`,
  serviceOrderCancel: (serviceOrderId) => `api/v1/serviceOrder/${serviceOrderId}/cancel`,
  getProductCategorySpecifications: (partnerId, productCategory) => `api/v1/partner/${partnerId}/product_category/specifications?productCategory=${productCategory}`,
  getGeographies: (partnerId, parentId) => `api/v1/partner/${partnerId}/geographies?parentId=${parentId}`
}

let besttone = {
  getBesttonePopularBrandList: (serviceOptionItemId, storeId, projectId, categoryId, top) => `api/v1/besttone/brand/popular_ranks?serviceOptionItemId=${serviceOptionItemId}&storeId=${storeId}&projectId=${projectId}&categoryId=${categoryId}&top=${top}`,
  getBrands: (sku, categoryId, name, page, limit) => `api/v1/besttone/brands?sku=${sku}&categoryId=${categoryId}&name=${name}&page=${page}&limit=${limit}`,
  getCategories: (sku) => `api/v1/besttone/categories?sku=${sku}`,
  getVerifyCard: (cardId, cardpwd) => `api/v1/besttone/verify_card?cardId=${cardId}&cardpwd=${cardpwd}`,
  orderBesttonSave: () => `api/v1/besttone/order`
}

let ApiRoutes = {
  geography: geography,
  serviceProduct: serviceProduct,
  enumJs: enumJs,
  enumType: enumType,
  personTask: personTask,
  userManage: userManage,
  verification: verification,
  category: category,
  message: message,
  account: account,
  contract: contract,
  recycleOrder: recycleOrder,
  person: person,
  order: order,
  invoice: invoice,
  payment: payment,
  excitation: excitation,
  organization: organization,
  config: config,
  material: material,
  bonus: bonus,
  report: report,
  licence: licence,
  task: task,
  brand: brand,
  apiJs: apiJs,
  wxOAuth: wxOAuth,
  partnerCso: partnerCso,
  servicePack: servicePack,
  jd: jd,
  csoSchedule: csoSchedule,
  serviceOrder: serviceOrder,
  besttone: besttone
}

class Geography {
  async getGeographyInfo (geographyType, parentId) {
    this.getGeographyInfoResponse = {
      code: '',
      content: {
        geographyDtos: [],
      },
      isOk: false,
      message: '',
    }
    this.getGeographyInfoResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.geography.getGeographyInfo(geographyType, parentId)))
    return this.getGeographyInfoResponse
  }
  async getBaiduGeographyInfo (lat, lng, coordType) {
    this.getBaiduGeographyInfoResponse = {
      code: '',
      content: {
        provinceId: '',
        cityId: '',
        districtId: '',
        street: '',
        address: '',
      },
      isOk: false,
      message: '',
    }
    this.getBaiduGeographyInfoResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.geography.getBaiduGeographyInfo(lat, lng, coordType)))
    return this.getBaiduGeographyInfoResponse
  }
}

class ServiceProduct {
  async getLicenceById (licenceId) {
    this.getLicenceByIdResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.getLicenceByIdResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceProduct.getLicenceById(licenceId)))
    return this.getLicenceByIdResponse
  }
}

class EnumJs {
  async downloadEnumJsFile () {
    this.downloadEnumJsFileResponse = {
      version: null,
      content: null,
      statusCode: '',
      reasonPhrase: '',
      headers: null,
      requestMessage: null,
      isSuccessStatusCode: false,
    }
    this.downloadEnumJsFileResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.enumJs.downloadEnumJsFile()))
    return this.downloadEnumJsFileResponse
  }
}

class EnumType {
  async getDivideType () {
    this.getDivideTypeResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getDivideTypeResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.enumType.getDivideType()))
    return this.getDivideTypeResponse
  }
}

class PersonTask {
  async acceptIncome (params) {
    this.acceptIncomeResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.acceptIncomeResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.personTask.acceptIncome()), params)
    return this.acceptIncomeResponse
  }
  async acceptTask (params) {
    this.acceptTaskResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.acceptTaskResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.personTask.acceptTask()), params)
    return this.acceptTaskResponse
  }
  async personTask (personTaskId) {
    this.personTaskResponse = {
      code: '',
      content: {
        finishDate: '',
        parentPersonTaskId: '',
        partnerId: '',
        personId: '',
        personTaskId: '',
        personTaskStatus: '',
        progress: [],
        startDate: '',
        subPersonTaskIds: [],
        taskId: '',
        taskStatus: '',
      },
      isOk: false,
      message: '',
    }
    this.personTaskResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.personTask.personTask(personTaskId)))
    return this.personTaskResponse
  }
  async personTasks (page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.personTasksResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.personTasksResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.personTask.personTasks(personId, page, limit)))
    return this.personTasksResponse
  }
  async removePersonTask (personTaskId) {
    this.removePersonTaskResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.removePersonTaskResponse = await AliGateway.delete(ApiBaseUrl.concat(ApiRoutes.personTask.removePersonTask(personTaskId)))
    return this.removePersonTaskResponse
  }
}

class UserManage {
  async logIn (userName, passWord) {
    this.logInResponse = {
      code: '',
      content: {
        userId: '',
        twoVerification: false,
        twoVerificationType: '',
      },
      isOk: false,
      message: '',
    }
    this.logInResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.userManage.logIn(userName, passWord)))
    return this.logInResponse
  }
  async getPermission (userId) {
    this.getPermissionResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getPermissionResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.userManage.getPermission(userId)))
    return this.getPermissionResponse
  }
  async verifyUserConsistency (agentId, code, userId) {
    this.verifyUserConsistencyResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.verifyUserConsistencyResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.userManage.verifyUserConsistency(agentId, code, userId)))
    return this.verifyUserConsistencyResponse
  }
}

class Verification {
  async queryVerificationServiceContract (param) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.queryVerificationServiceContractResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.queryVerificationServiceContractResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.verification.queryVerificationServiceContract(personId, param)))
    return this.queryVerificationServiceContractResponse
  }
  async submitVerification (params) {
    this.submitVerificationResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.submitVerificationResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.verification.submitVerification()), params)
    return this.submitVerificationResponse
  }
  async verificationRecord (storeld, projectld, StartTime, EndTime, param, page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.verificationRecordResponse = {
      code: '',
      content: null,
      isOk: false,
      message: '',
    }
    this.verificationRecordResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.verification.verificationRecord(storeld, projectld, personId, StartTime, EndTime, param, page, limit)))
    return this.verificationRecordResponse
  }
}

class Category {
  async getCategories (orderId) {
    this.getCategoriesResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getCategoriesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.category.getCategories(orderId)))
    return this.getCategoriesResponse
  }
}

class Message {
  async personMessages (read, page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.personMessagesResponse = {
      code: '',
      content: {
        personMessages: [],
        total: '',
      },
      isOk: false,
      message: '',
    }
    this.personMessagesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.message.personMessages(personId, read, page, limit)))
    return this.personMessagesResponse
  }
  async readMessages (params) {
    this.readMessagesResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.readMessagesResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.message.readMessages()), params)
    return this.readMessagesResponse
  }
}

class Account {
  async getAccountSettle (accountSettleId) {
    this.getAccountSettleResponse = {
      code: '',
      content: {
        accountSettleId: '',
        accountSettleStatus: '',
        accountSettleStatusCode: '',
        accountSettleType: '',
        accountSettleTypeCode: '',
        created: '',
        dividePrice: '',
        divideType: '',
        divideTypeCode: '',
        isPayment: false,
        orderCode: '',
        projectName: '',
        salesName: '',
        orderFinishTime: '',
        orderAmount: '',
        accountSettleCode: '',
      },
      isOk: false,
      message: '',
    }
    this.getAccountSettleResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.account.getAccountSettle(accountSettleId)))
    return this.getAccountSettleResponse
  }
  async getAccountSettles (divideType, startTime, endTime, audited, paid, page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getAccountSettlesResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getAccountSettlesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.account.getAccountSettles(personId, divideType, startTime, endTime, audited, paid, page, limit)))
    return this.getAccountSettlesResponse
  }
  async getAccountPayments (page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getAccountPaymentsResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getAccountPaymentsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.account.getAccountPayments(personId, page, limit)))
    return this.getAccountPaymentsResponse
  }
  async getAccountPayment (paymentId) {
    this.getAccountPaymentResponse = {
      code: '',
      content: {
        amount: '',
        createTime: '',
        paymentId: '',
        status: '',
        statusCode: '',
        completeTime: '',
        payTypeCode: '',
        payType: '',
        payError: '',
      },
      isOk: false,
      message: '',
    }
    this.getAccountPaymentResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.account.getAccountPayment(paymentId)))
    return this.getAccountPaymentResponse
  }
  async getAccountSettlesByPaymentId (paymentId, divideType, startTime, endTime, page, limit) {
    this.getAccountSettlesByPaymentIdResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getAccountSettlesByPaymentIdResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.account.getAccountSettlesByPaymentId(paymentId, divideType, startTime, endTime, page, limit)))
    return this.getAccountSettlesByPaymentIdResponse
  }
  async receiveJiaxinSignResult () {
    this.receiveJiaxinSignResultResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.receiveJiaxinSignResultResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.account.receiveJiaxinSignResult()))
    return this.receiveJiaxinSignResultResponse
  }
  async receiveJiaxinOrderStatusResult () {
    this.receiveJiaxinOrderStatusResultResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.receiveJiaxinOrderStatusResultResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.account.receiveJiaxinOrderStatusResult()))
    return this.receiveJiaxinOrderStatusResultResponse
  }
}

class Contract {
  async getContractAppliedRequest (serviceContractId) {
    this.getContractAppliedRequestResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getContractAppliedRequestResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.contract.getContractAppliedRequest(serviceContractId)))
    return this.getContractAppliedRequestResponse
  }
  async createContractPdf (serviceContractId) {
    this.createContractPdfResponse = {
      version: null,
      content: null,
      statusCode: '',
      reasonPhrase: '',
      headers: null,
      requestMessage: null,
      isSuccessStatusCode: false,
    }
    this.createContractPdfResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.contract.createContractPdf(serviceContractId)))
    return this.createContractPdfResponse
  }
  async getCustomerServiceTypeAppliable (serviceContractId) {
    this.getCustomerServiceTypeAppliableResponse = {
      code: '',
      content: {
        customerServiceTypes: [],
        needPay: false,
      },
      isOk: false,
      message: '',
    }
    this.getCustomerServiceTypeAppliableResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.contract.getCustomerServiceTypeAppliable(serviceContractId)))
    return this.getCustomerServiceTypeAppliableResponse
  }
  async getInvoiceDetail (serviceContractId) {
    this.getInvoiceDetailResponse = {
      code: '',
      content: {
        invoiceId: '',
        invoceType: '',
        invoiceKind: '',
        code: '',
        title: '',
        hotlineNumber: '',
        url: '',
      },
      isOk: false,
      message: '',
    }
    this.getInvoiceDetailResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.contract.getInvoiceDetail(serviceContractId)))
    return this.getInvoiceDetailResponse
  }
  async createCustomerService (serviceContractId, params) {
    this.createCustomerServiceResponse = {
      code: '',
      content: {
        paymentForm: '',
        customerServiceResults: [],
      },
      isOk: false,
      message: '',
    }
    this.createCustomerServiceResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.contract.createCustomerService(serviceContractId)), params)
    return this.createCustomerServiceResponse
  }
  async getContract (serviceContractId) {
    this.getContractResponse = {
      code: '',
      content: {
        contract: {
          contractId: '',
          contractCode: '',
          serviceHotline: '',
          project: '',
          invoiceCode: '',
          effectDate: '',
          expireDate: '',
          serviceOption: '',
          serviceOptionItemId: '',
          serviceLicence: '',
          serviceLicenceId: '',
          priceRange: '',
          purchaseTime: '',
          serviceContractItemId: '',
          customerDeviceId: '',
          serviceContractItemCustomerDeviceId: '',
          brandId: '',
          brand: '',
          productCateogry: '',
          purchasePrice: '',
          saleDate: '',
          factoryModel: '',
          sciCdStatus: '',
          serialNumber: '',
          addressDescription: '',
          provicneId: '',
          provicneName: '',
          cityId: '',
          cityName: '',
          countyId: '',
          countyName: '',
          amount: '',
        },
        customer: {
          name: '',
          phone: '',
          addressDescription: '',
          provicneId: '',
          cityId: '',
          countyId: '',
        },
      },
      isOk: false,
      message: '',
    }
    this.getContractResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.contract.getContract(serviceContractId)))
    return this.getContractResponse
  }
  async getProductCateogries (serviceContractId) {
    this.getProductCateogriesResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getProductCateogriesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.contract.getProductCateogries(serviceContractId)))
    return this.getProductCateogriesResponse
  }
  async getBrands (name, page, limit) {
    this.getBrandsResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getBrandsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.contract.getBrands(name, page, limit)))
    return this.getBrandsResponse
  }
  async getCustomerService (customerServiceId) {
    this.getCustomerServiceResponse = {
      code: '',
      content: {
        customerServiceId: '',
        customerServiceType: '',
        invoiceUrl: '',
        customerServiceStatus: '',
        createTime: '',
        logisticsOrder: {
          vendor: '',
          code: '',
          status: '',
          logisiticsOrderDynamics: [],
        },
        contractEditModel: {
          applicantName: '',
          contractEditRejectDescription: '',
          requestObject: '',
        },
      },
      isOk: false,
      message: '',
    }
    this.getCustomerServiceResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.contract.getCustomerService(customerServiceId)))
    return this.getCustomerServiceResponse
  }
}

class RecycleOrder {
  async createRecyleOrder (params) {
    this.createRecyleOrderResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.createRecyleOrderResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.recycleOrder.createRecyleOrder()), params)
    return this.createRecyleOrderResponse
  }
  async cancelRecyleOrder (recycleOrderId, params) {
    this.cancelRecyleOrderResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.cancelRecyleOrderResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.recycleOrder.cancelRecyleOrder(recycleOrderId)), params)
    return this.cancelRecyleOrderResponse
  }
  async updateRecyleOrder (params) {
    this.updateRecyleOrderResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.updateRecyleOrderResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.recycleOrder.updateRecyleOrder()), params)
    return this.updateRecyleOrderResponse
  }
  async getRecyleOrder (recycleOrderId) {
    this.getRecyleOrderResponse = {
      code: '',
      content: {
        id: '',
        code: '',
        productCategory: '',
        orderAttributes: '',
        finalAttributes: '',
        status: '',
        estimatedAmount: '',
        finalAmount: '',
        salesCommission: '',
        orderTime: '',
        finishTime: '',
        appointTime: '',
        expectedTime: '',
        customer: {
          name: '',
          phone: '',
        },
        serviceAddress: {
          addressDescription: '',
          provinceId: '',
          provinceName: '',
          cityId: '',
          cityName: '',
          countyId: '',
          countyName: '',
        },
        cancelReason: '',
        source: '',
        bottomPrice: '',
      },
      isOk: false,
      message: '',
    }
    this.getRecyleOrderResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.recycleOrder.getRecyleOrder(recycleOrderId)))
    return this.getRecyleOrderResponse
  }
  async getRecyleOrders (customerPhone, page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getRecyleOrdersResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getRecyleOrdersResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.recycleOrder.getRecyleOrders(personId, customerPhone, page, limit)))
    return this.getRecyleOrdersResponse
  }
}

class Person {
  async savePersonBankInfo (params) {
    this.savePersonBankInfoResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.savePersonBankInfoResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.person.savePersonBankInfo()), params)
    return this.savePersonBankInfoResponse
  }
  async getPersonBankInfo () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getPersonBankInfoResponse = {
      code: '',
      content: {
        personId: '',
        name: '',
        mobile: '',
        idCardNumber: '',
        idCardImage: '',
        idCardImageB: '',
        idCardImageId: '',
        idCardImageBId: '',
        bankOrganizationName: '',
        bankOrganizationCode: '',
        bankName: '',
        bankAccountNo: '',
        accountName: '',
        provinceId: '',
        cityId: '',
        countyId: '',
        provinceName: '',
        cityName: '',
        countyName: '',
        isServiceFee: false,
        signingStatus: '',
        signingUrl: '',
      },
      isOk: false,
      message: '',
    }
    this.getPersonBankInfoResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getPersonBankInfo(personId)))
    return this.getPersonBankInfoResponse
  }
  async getSameLevelPersonInfos (organizationId) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getSameLevelPersonInfosResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getSameLevelPersonInfosResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getSameLevelPersonInfos(personId, organizationId)))
    return this.getSameLevelPersonInfosResponse
  }
  async getSubLevelPersonInfos (organizationId) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getSubLevelPersonInfosResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getSubLevelPersonInfosResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getSubLevelPersonInfos(personId, organizationId)))
    return this.getSubLevelPersonInfosResponse
  }
  async personInfo () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.personInfoResponse = {
      code: '',
      content: null,
      isOk: false,
      message: '',
    }
    this.personInfoResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.personInfo(personId)))
    return this.personInfoResponse
  }
  async getOrganizationEmployees () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getOrganizationEmployeesResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getOrganizationEmployeesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getOrganizationEmployees(personId)))
    return this.getOrganizationEmployeesResponse
  }
  async getCommissionAmount () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getCommissionAmountResponse = {
      code: '',
      content: {
        auditingAmount: '',
        curMonthAmount: '',
        ecourageAmount: '',
        gainable: '',
        totalAmount: '',
        isInputInvoice: false,
        isInputMember: false,
        tips: '',
        signingStatus: '',
        signingUrl: '',
      },
      isOk: false,
      message: '',
    }
    this.getCommissionAmountResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getCommissionAmount(personId)))
    return this.getCommissionAmountResponse
  }
  async getInvoiceSummary () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getInvoiceSummaryResponse = {
      code: '',
      content: {
        personId: '',
        pendingInvoiceAmount: '',
        invoiceAmount: '',
      },
      isOk: false,
      message: '',
    }
    this.getInvoiceSummaryResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getInvoiceSummary(personId)))
    return this.getInvoiceSummaryResponse
  }
  async applyForCash (params) {
    this.applyForCashResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.applyForCashResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.person.applyForCash()), params)
    return this.applyForCashResponse
  }
  async getQyMenu () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getQyMenuResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getQyMenuResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getQyMenu(personId)))
    return this.getQyMenuResponse
  }
  async getQrCode () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getQrCodeResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getQrCodeResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getQrCode(personId)))
    return this.getQrCodeResponse
  }
  async getPersonOrganizationListByPhone (phone) {
    this.getPersonOrganizationListByPhoneResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getPersonOrganizationListByPhoneResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.person.getPersonOrganizationListByPhone(phone)))
    return this.getPersonOrganizationListByPhoneResponse
  }
  async createContractSign (params) {
    this.createContractSignResponse = {
      code: '',
      content: {
        signState: '',
        signingUrl: '',
      },
      isOk: false,
      message: '',
    }
    this.createContractSignResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.person.createContractSign()), params)
    return this.createContractSignResponse
  }
}

class Order {
  async getOrderList (page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getOrderListResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getOrderListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.order.getOrderList(personId, page, limit)))
    return this.getOrderListResponse
  }
  async getOrderDetail (orderId) {
    this.getOrderDetailResponse = {
      code: '',
      content: {
        orderId: '',
        orderCode: '',
        orderStatus: '',
        orderStatusStr: '',
        awardStatus: '',
        createTime: '',
        submitTime: '',
        finishTime: '',
        customerDto: {
          id: '',
          customerName: '',
          phoneNumber: '',
        },
        paymentDto: {
          id: '',
          payAccount: '',
          payAmount: '',
          paymentStatus: '',
          paymentStatusStr: '',
          payTime: '',
          payType: '',
          payerType: '',
        },
        projectId: '',
        orderItemDtos: [],
        storeId: '',
        partnerId: '',
        baseServiceContractdId: '',
        orderBonus: {
          id: '',
          queryBonusEventStatus: '',
          shareFinishTime: '',
        },
      },
      isOk: false,
      message: '',
    }
    this.getOrderDetailResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.order.getOrderDetail(orderId)))
    return this.getOrderDetailResponse
  }
  async saveOrder (params) {
    this.saveOrderResponse = {
      code: '',
      content: {
        orderId: '',
        orderCode: '',
        orderStatus: '',
        orderStatusStr: '',
        awardStatus: '',
        createTime: '',
        submitTime: '',
        finishTime: '',
        customerDto: {
          id: '',
          customerName: '',
          phoneNumber: '',
        },
        paymentDto: {
          id: '',
          payAccount: '',
          payAmount: '',
          paymentStatus: '',
          paymentStatusStr: '',
          payTime: '',
          payType: '',
          payerType: '',
        },
        projectId: '',
        orderItemDtos: [],
        storeId: '',
        partnerId: '',
        baseServiceContractdId: '',
        orderBonus: {
          id: '',
          queryBonusEventStatus: '',
          shareFinishTime: '',
        },
      },
      isOk: false,
      message: '',
    }
    this.saveOrderResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.order.saveOrder()), params)
    return this.saveOrderResponse
  }
  async modifyOrder (orderId, params) {
    this.modifyOrderResponse = {
      code: '',
      content: {
        orderId: '',
        orderCode: '',
        orderStatus: '',
        orderStatusStr: '',
        awardStatus: '',
        createTime: '',
        submitTime: '',
        finishTime: '',
        customerDto: {
          id: '',
          customerName: '',
          phoneNumber: '',
        },
        paymentDto: {
          id: '',
          payAccount: '',
          payAmount: '',
          paymentStatus: '',
          paymentStatusStr: '',
          payTime: '',
          payType: '',
          payerType: '',
        },
        projectId: '',
        orderItemDtos: [],
        storeId: '',
        partnerId: '',
        baseServiceContractdId: '',
        orderBonus: {
          id: '',
          queryBonusEventStatus: '',
          shareFinishTime: '',
        },
      },
      isOk: false,
      message: '',
    }
    this.modifyOrderResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.order.modifyOrder(orderId)), params)
    return this.modifyOrderResponse
  }
  async orderCancel (orderId, cancelReason) {
    this.orderCancelResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.orderCancelResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.order.orderCancel(orderId, cancelReason)))
    return this.orderCancelResponse
  }
  async submitOrder (orderId, params) {
    this.submitOrderResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.submitOrderResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.order.submitOrder(orderId)), params)
    return this.submitOrderResponse
  }
  async getDrawDetail (orderId) {
    this.getDrawDetailResponse = {
      code: '',
      content: {
        award: '',
        awardName: '',
        curAward: '',
        maxAward: '',
        prizeId: '',
        startProbability: '',
        probability: '',
        imageUrl: '',
      },
      isOk: false,
      message: '',
    }
    this.getDrawDetailResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.order.getDrawDetail(orderId)))
    return this.getDrawDetailResponse
  }
  async luckDraw (orderId, params) {
    this.luckDrawResponse = {
      code: '',
      content: {
        award: '',
        awardName: '',
        curAward: '',
        maxAward: '',
        prizeId: '',
        startProbability: '',
        probability: '',
        imageUrl: '',
      },
      isOk: false,
      message: '',
    }
    this.luckDrawResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.order.luckDraw(orderId)), params)
    return this.luckDrawResponse
  }
  async getCustomerDeviceExpand (orderId, deviceId) {
    this.getCustomerDeviceExpandResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getCustomerDeviceExpandResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.order.getCustomerDeviceExpand(orderId, deviceId)))
    return this.getCustomerDeviceExpandResponse
  }
  async saveBesttoneOrder (orderId) {
    this.saveBesttoneOrderResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.saveBesttoneOrderResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.order.saveBesttoneOrder(orderId)))
    return this.saveBesttoneOrderResponse
  }
  async getMarketMessages (params) {
    this.getMarketMessagesResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getMarketMessagesResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.order.getMarketMessages()), params)
    return this.getMarketMessagesResponse
  }
  async getPartnerOrders (params) {
    this.getPartnerOrdersResponse = {
      code: '',
      content: {
        data: null,
        totalItemCount: '',
      },
      isOk: false,
      message: '',
    }
    this.getPartnerOrdersResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.order.getPartnerOrders()), params)
    return this.getPartnerOrdersResponse
  }
}

class Invoice {
  async getInvoiceDetail (invoiceId) {
    this.getInvoiceDetailResponse = {
      code: '',
      content: {
        id: '',
        code: '',
        number: '',
        amount: '',
        submitTime: '',
        statusStr: '',
        status: '',
        detail: '',
        denialReason: '',
        image: '',
        imageId: '',
        personId: '',
      },
      isOk: false,
      message: '',
    }
    this.getInvoiceDetailResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.invoice.getInvoiceDetail(invoiceId)))
    return this.getInvoiceDetailResponse
  }
  async getInvoiceList (page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getInvoiceListResponse = {
      code: '',
      content: {
        invoiceDtos: [],
      },
      isOk: false,
      message: '',
    }
    this.getInvoiceListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.invoice.getInvoiceList(personId, page, limit)))
    return this.getInvoiceListResponse
  }
  async inoviceSubmit (params) {
    this.inoviceSubmitResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.inoviceSubmitResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.invoice.inoviceSubmit()), params)
    return this.inoviceSubmitResponse
  }
  async deleteInvoice (invoiceId) {
    this.deleteInvoiceResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.deleteInvoiceResponse = await AliGateway.delete(ApiBaseUrl.concat(ApiRoutes.invoice.deleteInvoice(invoiceId)))
    return this.deleteInvoiceResponse
  }
}

class Payment {
  async getAliPayForm (paymentId) {
    this.getAliPayFormResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.getAliPayFormResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.payment.getAliPayForm(paymentId)))
    return this.getAliPayFormResponse
  }
  async cashierPay (paymentId, params) {
    this.cashierPayResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.cashierPayResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.payment.cashierPay(paymentId)), params)
    return this.cashierPayResponse
  }
  async getWeixinPayNative (paymentId, agentId) {
    this.getWeixinPayNativeResponse = {
      code: '',
      content: {
        appId: '',
        codeUrl: '',
        mchId: '',
        nonceStr: '',
        package: '',
        paySign: '',
        prepayId: '',
        timeStamp: '',
        tradeType: '',
        webUrl: '',
      },
      isOk: false,
      message: '',
    }
    this.getWeixinPayNativeResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.payment.getWeixinPayNative(paymentId, agentId)))
    return this.getWeixinPayNativeResponse
  }
  async getWeixinPayHtml () {
    this.getWeixinPayHtmlResponse = {
      code: '',
      content: {
        appId: '',
        codeUrl: '',
        mchId: '',
        nonceStr: '',
        package: '',
        paySign: '',
        prepayId: '',
        timeStamp: '',
        tradeType: '',
        webUrl: '',
      },
      isOk: false,
      message: '',
    }
    this.getWeixinPayHtmlResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.payment.getWeixinPayHtml()))
    return this.getWeixinPayHtmlResponse
  }
  async getAliPayHtml () {
    this.getAliPayHtmlResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.getAliPayHtmlResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.payment.getAliPayHtml()))
    return this.getAliPayHtmlResponse
  }
  async getWeixinPayQrcode (paymentId) {
    this.getWeixinPayQrcodeResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getWeixinPayQrcodeResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.payment.getWeixinPayQrcode(paymentId)))
    return this.getWeixinPayQrcodeResponse
  }
  async getPaymentMethod (paymentId) {
    this.getPaymentMethodResponse = {
      code: '',
      content: {
        cashierPay: false,
        smsPay: false,
        weixinPay: false,
      },
      isOk: false,
      message: '',
    }
    this.getPaymentMethodResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.payment.getPaymentMethod(paymentId)))
    return this.getPaymentMethodResponse
  }
  async paymentResultBack (code) {
    this.paymentResultBackResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.paymentResultBackResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.payment.paymentResultBack(code)))
    return this.paymentResultBackResponse
  }
  async paymentPayMethodConfirm (paymentId, params) {
    this.paymentPayMethodConfirmResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.paymentPayMethodConfirmResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.payment.paymentPayMethodConfirm(paymentId)), params)
    return this.paymentPayMethodConfirmResponse
  }
  async getPayment (paymentId) {
    this.getPaymentResponse = {
      code: '',
      content: {
        id: '',
        payAccount: '',
        payAmount: '',
        paymentStatus: '',
        paymentStatusStr: '',
        payTime: '',
        payType: '',
        payerType: '',
      },
      isOk: false,
      message: '',
    }
    this.getPaymentResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.payment.getPayment(paymentId)))
    return this.getPaymentResponse
  }
}

class Excitation {
  async getLuckDrawDetail (orderId) {
    this.getLuckDrawDetailResponse = {
      code: '',
      content: {
        drawBaseValue: '',
        drawTimes: '',
        excitationId: '',
        imageUrl: '',
        prizeDtos: [],
        remark: '',
        title: '',
      },
      isOk: false,
      message: '',
    }
    this.getLuckDrawDetailResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.excitation.getLuckDrawDetail(orderId)))
    return this.getLuckDrawDetailResponse
  }
  async getLuckDrawHistory (excitationId) {
    this.getLuckDrawHistoryResponse = {
      code: '',
      content: {
        historyDtos: [],
        peopleNumber: '',
      },
      isOk: false,
      message: '',
    }
    this.getLuckDrawHistoryResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.excitation.getLuckDrawHistory(excitationId)))
    return this.getLuckDrawHistoryResponse
  }
}

class Organization {
  async getOrganizationProjects (organizationId) {
    this.getOrganizationProjectsResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getOrganizationProjectsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.organization.getOrganizationProjects(organizationId)))
    return this.getOrganizationProjectsResponse
  }
  async getPartner (partnerId) {
    this.getPartnerResponse = {
      code: '',
      content: {
        id: '',
        code: '',
        name: '',
        logo: '',
        qrCode: '',
      },
      isOk: false,
      message: '',
    }
    this.getPartnerResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.organization.getPartner(partnerId)))
    return this.getPartnerResponse
  }
  async getSubStores (organizationId) {
    this.getSubStoresResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getSubStoresResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.organization.getSubStores(organizationId)))
    return this.getSubStoresResponse
  }
  async getOrganizationPersonList (organizationId, enabled) {
    this.getOrganizationPersonListResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getOrganizationPersonListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.organization.getOrganizationPersonList(organizationId, enabled)))
    return this.getOrganizationPersonListResponse
  }
  async getPositionList (organizationId) {
    this.getPositionListResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getPositionListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.organization.getPositionList(organizationId)))
    return this.getPositionListResponse
  }
  async disablePerson (organizationId) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.disablePersonResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.disablePersonResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.organization.disablePerson(organizationId, personId)))
    return this.disablePersonResponse
  }
  async addPerson (organizationId, params) {
    this.addPersonResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.addPersonResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.organization.addPerson(organizationId)), params)
    return this.addPersonResponse
  }
}

class Config {
  async getPartnerConfig (partnerId) {
    this.getPartnerConfigResponse = {
      code: '',
      content: {
        onsiteFee: '',
        csoCategoryId: '',
        serviceCategoryMapping: [],
        payMethod: [],
        banner: [],
      },
      isOk: false,
      message: '',
    }
    this.getPartnerConfigResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.config.getPartnerConfig(partnerId)))
    return this.getPartnerConfigResponse
  }
  async getPartnerConfigByPartnerId (partnerId) {
    this.getPartnerConfigByPartnerIdResponse = {
      code: '',
      content: {
        onsiteFee: '',
        csoCategoryId: '',
        serviceCategoryMapping: [],
        payMethod: [],
        banner: [],
      },
      isOk: false,
      message: '',
    }
    this.getPartnerConfigByPartnerIdResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.config.getPartnerConfigByPartnerId(partnerId)))
    return this.getPartnerConfigByPartnerIdResponse
  }
}

class Material {
  async getMaterialInfo (materialId) {
    this.getMaterialInfoResponse = {
      code: '',
      content: {
        content: '',
        contentType: '',
        contentTypeCode: '',
        createTime: '',
        id: '',
        logoUrl: '',
        materialType: '',
        materialTypeCode: '',
        title: '',
      },
      isOk: false,
      message: '',
    }
    this.getMaterialInfoResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.material.getMaterialInfo(materialId)))
    return this.getMaterialInfoResponse
  }
  async getMaterialList (title, materialType, page, limit) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getMaterialListResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getMaterialListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.material.getMaterialList(title, materialType, personId, page, limit)))
    return this.getMaterialListResponse
  }
}

class Bonus {
  async getOperatorBonusList (bonusEventOperatorId, page, limit) {
    this.getOperatorBonusListResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getOperatorBonusListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.bonus.getOperatorBonusList(bonusEventOperatorId, page, limit)))
    return this.getOperatorBonusListResponse
  }
  async getPersonBounsOperators () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getPersonBounsOperatorsResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getPersonBounsOperatorsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.bonus.getPersonBounsOperators(personId)))
    return this.getPersonBounsOperatorsResponse
  }
  async getBonusEvent (bonusEventId) {
    this.getBonusEventResponse = {
      code: '',
      content: {
        id: '',
        name: '',
        queryBonusEventStatus: '',
        startTime: '',
        bonusEventStatus: '',
        endTime: '',
        bonusTypes: [],
        bonusPayType: '',
      },
      isOk: false,
      message: '',
    }
    this.getBonusEventResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.bonus.getBonusEvent(bonusEventId)))
    return this.getBonusEventResponse
  }
  async getBonus (bonusId) {
    this.getBonusResponse = {
      code: '',
      content: {
        id: '',
        bonusType: {
          id: '',
          name: '',
          amount: '',
        },
        status: '',
        releaseTime: '',
        monthlyOrderSort: '',
        monthlyCumulativeAmount: '',
        shareTime: '',
        shareFinishTime: '',
        lastOrderFinishTime: '',
        receiveFinishTime: '',
        bonusOperatorPersonId: '',
        releaseableBonusOperatorPersonIds: [],
        boundEventId: '',
        bonusReceiverPerson: {
          id: '',
          name: '',
        },
        hideSurname: false,
        hiddenBrandIds: [],
        project: {
          id: '',
          name: '',
        },
        partner: {
          id: '',
          name: '',
        },
      },
      isOk: false,
      message: '',
    }
    this.getBonusResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.bonus.getBonus(bonusId)))
    return this.getBonusResponse
  }
  async bonusRelease (bonusId, params) {
    this.bonusReleaseResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.bonusReleaseResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.bonus.bonusRelease(bonusId)), params)
    return this.bonusReleaseResponse
  }
  async bonusReceive (bonusId, params) {
    this.bonusReceiveResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.bonusReceiveResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.bonus.bonusReceive(bonusId)), params)
    return this.bonusReceiveResponse
  }
}

class Report {
  async rankingDetail (reportConfigId, storeId, projectId) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.rankingDetailResponse = {
      code: '',
      content: {
        currentRanking: {
          key: '',
          name: '',
          rankNumber: '',
          storeName: '',
          storeNames: [],
          value: '',
        },
        isParent: false,
        maxValue: '',
        rankingList: [],
        reportConfig: {
          confusionType: '',
          confusionTypeStr: '',
          description: '',
          lastUpdate: '',
          name: '',
          organizationTypeId: '',
          projectId: '',
          rankingNumber: '',
          reportConfigId: '',
          reportType: '',
          reportTypeStr: '',
          summaryType: '',
          summaryTypeStr: '',
          summaryValue: '',
          summaryValueStr: '',
        },
      },
      isOk: false,
      message: '',
    }
    this.rankingDetailResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.report.rankingDetail(reportConfigId, personId, storeId, projectId)))
    return this.rankingDetailResponse
  }
  async rankingList (storeId, projectId) {
    this.rankingListResponse = {
      code: '',
      content: {
        monthTime: '',
        reportConfigs: [],
        weekTime: '',
      },
      isOk: false,
      message: '',
    }
    this.rankingListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.report.rankingList(storeId, projectId)))
    return this.rankingListResponse
  }
  async getSalesOrderReportTest (startTime, endTime, partnerId, projectId, organizationId, organizationScopes, dimensions, results) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getSalesOrderReportTestResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getSalesOrderReportTestResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.report.getSalesOrderReportTest(startTime, endTime, partnerId, projectId, organizationId, personId, organizationScopes, dimensions, results)))
    return this.getSalesOrderReportTestResponse
  }
}

class Licence {
  async getLicenceDetail (licenceId) {
    this.getLicenceDetailResponse = {
      code: '',
      content: {
        id: '',
        title: '',
        content: '',
      },
      isOk: false,
      message: '',
    }
    this.getLicenceDetailResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.licence.getLicenceDetail(licenceId)))
    return this.getLicenceDetailResponse
  }
  async getPersonLicences () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getPersonLicencesResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getPersonLicencesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.licence.getPersonLicences(personId)))
    return this.getPersonLicencesResponse
  }
  async agreedLicence (params) {
    this.agreedLicenceResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.agreedLicenceResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.licence.agreedLicence()), params)
    return this.agreedLicenceResponse
  }
}

class Task {
  async getTaskById (taskId) {
    this.getTaskByIdResponse = {
      code: '',
      content: {
        acceptEndTime: '',
        acceptStartTime: '',
        parentTaskId: '',
        taskDescription: '',
        taskId: '',
        taskIncomes: [],
        taskItems: [],
        taskName: '',
        taskType: '',
      },
      isOk: false,
      message: '',
    }
    this.getTaskByIdResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.task.getTaskById(taskId)))
    return this.getTaskByIdResponse
  }
  async taskAccept (params) {
    this.taskAcceptResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.taskAcceptResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.task.taskAccept()), params)
    return this.taskAcceptResponse
  }
  async taskDistribute (params) {
    this.taskDistributeResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.taskDistributeResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.task.taskDistribute()), params)
    return this.taskDistributeResponse
  }
  async tasks () {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.tasksResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.tasksResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.task.tasks(personId)))
    return this.tasksResponse
  }
}

class Brand {
  async addSortedTopBrands () {
    this.addSortedTopBrandsResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.addSortedTopBrandsResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.brand.addSortedTopBrands()))
    return this.addSortedTopBrandsResponse
  }
  async getHotBrands (orderId, categoryId, name, page, limit) {
    this.getHotBrandsResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getHotBrandsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.brand.getHotBrands(orderId, categoryId, name, page, limit)))
    return this.getHotBrandsResponse
  }
  async getPopularBrandList (orderId, projectId, categoryId, top) {
    this.getPopularBrandListResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getPopularBrandListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.brand.getPopularBrandList(orderId, projectId, categoryId, top)))
    return this.getPopularBrandListResponse
  }
  async updateCumulativeBrand (projectId, categoryId, brandId, brandName) {
    this.updateCumulativeBrandResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.updateCumulativeBrandResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.brand.updateCumulativeBrand(projectId, categoryId, brandId, brandName)))
    return this.updateCumulativeBrandResponse
  }
}

class ApiJs {
  async generateApiJsModule () {
    this.generateApiJsModuleResponse = {
      version: null,
      content: null,
      statusCode: '',
      reasonPhrase: '',
      headers: null,
      requestMessage: null,
      isSuccessStatusCode: false,
    }
    this.generateApiJsModuleResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.apiJs.generateApiJsModule()))
    return this.generateApiJsModuleResponse
  }
}

class WxOAuth {
  async getPersonIdByWxCode (code, state, agentId) {
    this.getPersonIdByWxCodeResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.getPersonIdByWxCodeResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.wxOAuth.getPersonIdByWxCode(code, state, agentId)))
    return this.getPersonIdByWxCodeResponse
  }
  async getTicket (agentId) {
    this.getTicketResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.getTicketResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.wxOAuth.getTicket(agentId)))
    return this.getTicketResponse
  }
  async getToken (agentId) {
    this.getTokenResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.getTokenResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.wxOAuth.getToken(agentId)))
    return this.getTokenResponse
  }
  async getSignature (url, agentId) {
    this.getSignatureResponse = {
      code: '',
      content: {
        nonceStr: '',
        signature: '',
        ticket: '',
        timestamp: '',
      },
      isOk: false,
      message: '',
    }
    this.getSignatureResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.wxOAuth.getSignature(url, agentId)))
    return this.getSignatureResponse
  }
  async getWxImage (agentId, mediaId, type) {
    this.getWxImageResponse = {
      code: '',
      content: {
        fileUrl: '',
        id: '',
      },
      isOk: false,
      message: '',
    }
    this.getWxImageResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.wxOAuth.getWxImage(agentId, mediaId, type)))
    return this.getWxImageResponse
  }
}

class PartnerCso {
  async savePartnerCso (params) {
    this.savePartnerCsoResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.savePartnerCsoResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.partnerCso.savePartnerCso()), params)
    return this.savePartnerCsoResponse
  }
}

class ServicePack {
  async getServicePacks (storeId, projectId) {
    this.getServicePacksResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getServicePacksResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.servicePack.getServicePacks(storeId, projectId)))
    return this.getServicePacksResponse
  }
  async getServiceOptionItems (servicePackId, purchasePrice, purchaseTime) {
    let {personId} = await VuexStorageMgr.ensurePerson()
    this.getServiceOptionItemsResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getServiceOptionItemsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.servicePack.getServiceOptionItems(servicePackId, purchasePrice, purchaseTime, personId)))
    return this.getServiceOptionItemsResponse
  }
  async getServiceOptionItem (servicePackId, serviceOptionItemId) {
    this.getServiceOptionItemResponse = {
      code: '',
      content: {
        serviceOptionItemId: '',
        description: '',
        imageUrl: '',
        licenceId: '',
        name: '',
        salesBaseValue: '',
        salesCount: '',
        salesTimes: '',
        sort: '',
        unitPrice: '',
        saleMode: '',
        parValue: '',
        freebies: [],
      },
      isOk: false,
      message: '',
    }
    this.getServiceOptionItemResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.servicePack.getServiceOptionItem(servicePackId, serviceOptionItemId)))
    return this.getServiceOptionItemResponse
  }
  async getServicePackDetail (servicePackId) {
    this.getServicePackDetailResponse = {
      code: '',
      content: {
        code: '',
        description: '',
        licenceContent: '',
        mainPicUrl: '',
        servicePackId: '',
        summary: '',
        title: '',
        showPrice: '',
        existPurchaseTime: false,
        isHardwareProducts: false,
      },
      isOk: false,
      message: '',
    }
    this.getServicePackDetailResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.servicePack.getServicePackDetail(servicePackId)))
    return this.getServicePackDetailResponse
  }
  async getObjectExpands (servicePackId, categoryId) {
    this.getObjectExpandsResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getObjectExpandsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.servicePack.getObjectExpands(servicePackId, categoryId)))
    return this.getObjectExpandsResponse
  }
}

class Jd {
  async receiveAuditData () {
    this.receiveAuditDataResponse = {
      version: null,
      content: null,
      statusCode: '',
      reasonPhrase: '',
      headers: null,
      requestMessage: null,
      isSuccessStatusCode: false,
    }
    this.receiveAuditDataResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.jd.receiveAuditData()))
    return this.receiveAuditDataResponse
  }
  async queryAuditData () {
    this.queryAuditDataResponse = {
      version: null,
      content: null,
      statusCode: '',
      reasonPhrase: '',
      headers: null,
      requestMessage: null,
      isSuccessStatusCode: false,
    }
    this.queryAuditDataResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.jd.queryAuditData()))
    return this.queryAuditDataResponse
  }
}

class CsoSchedule {
  async getCsoSchedules () {
    this.getCsoSchedulesResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getCsoSchedulesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.csoSchedule.getCsoSchedules()))
    return this.getCsoSchedulesResponse
  }
  async getCsoScheduleConfig () {
    this.getCsoScheduleConfigResponse = {
      code: '',
      content: {
        csoCategoryId: '',
        days: '',
        scheduleField: '',
      },
      isOk: false,
      message: '',
    }
    this.getCsoScheduleConfigResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.csoSchedule.getCsoScheduleConfig()))
    return this.getCsoScheduleConfigResponse
  }
  async updateCsoQty (csoScheduleId, params) {
    this.updateCsoQtyResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.updateCsoQtyResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.csoSchedule.updateCsoQty(csoScheduleId)), params)
    return this.updateCsoQtyResponse
  }
}

class ServiceOrder {
  async getServiceOrders (partnerId, thirdPartyUserId, status, statusCategory, page, limit) {
    this.getServiceOrdersResponse = {
      code: '',
      content: {
        data: [],
        totalItemCount: '',
      },
      isOk: false,
      message: '',
    }
    this.getServiceOrdersResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.getServiceOrders(partnerId, thirdPartyUserId, status, statusCategory, page, limit)))
    return this.getServiceOrdersResponse
  }
  async createServiceOrder (params) {
    this.createServiceOrderResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.createServiceOrderResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.serviceOrder.createServiceOrder()), params)
    return this.createServiceOrderResponse
  }
  async getCsoCategory (partnerId, csoCategoryId) {
    this.getCsoCategoryResponse = {
      code: '',
      content: null,
      isOk: false,
      message: '',
    }
    this.getCsoCategoryResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.getCsoCategory(partnerId, csoCategoryId)))
    return this.getCsoCategoryResponse
  }
  async getCso (csoCode) {
    this.getCsoResponse = {
      code: '',
      content: null,
      isOk: false,
      message: '',
    }
    this.getCsoResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.getCso(csoCode)))
    return this.getCsoResponse
  }
  async getServiceOrder (serviceOrderId) {
    this.getServiceOrderResponse = {
      code: '',
      content: {
        code: '',
        csoCode: '',
        csoStatus: '',
        id: '',
        productCategory: '',
        serviceOrderType: '',
        status: '',
        submitTime: '',
        ticket: '',
        csoProperties: '',
        payment: {
          id: '',
          payTime: '',
          payAmount: '',
          payMethod: '',
          paymentStatus: '',
        },
        csoStatusCategory: '',
      },
      isOk: false,
      message: '',
    }
    this.getServiceOrderResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.getServiceOrder(serviceOrderId)))
    return this.getServiceOrderResponse
  }
  async csoChangeStatusCallback (code, status, statusCategory) {
    this.csoChangeStatusCallbackResponse = {
      success: false,
      message: '',
    }
    this.csoChangeStatusCallbackResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.csoChangeStatusCallback(code, status, statusCategory)))
    return this.csoChangeStatusCallbackResponse
  }
  async getAliWebPay (serviceOrderId, redirectUrl) {
    this.getAliWebPayResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.getAliWebPayResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.getAliWebPay(serviceOrderId, redirectUrl)))
    return this.getAliWebPayResponse
  }
  async getWeChatWebPay (serviceOrderId, redirectUrl) {
    this.getWeChatWebPayResponse = {
      code: '',
      content: {
        appId: '',
        codeUrl: '',
        mchId: '',
        nonceStr: '',
        package: '',
        paySign: '',
        prepayId: '',
        timeStamp: '',
        tradeType: '',
        webUrl: '',
      },
      isOk: false,
      message: '',
    }
    this.getWeChatWebPayResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.getWeChatWebPay(serviceOrderId, redirectUrl)))
    return this.getWeChatWebPayResponse
  }
  async serviceOrderPayCallback (code) {
    this.serviceOrderPayCallbackResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.serviceOrderPayCallbackResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.serviceOrderPayCallback(code)))
    return this.serviceOrderPayCallbackResponse
  }
  async serviceOrderCancel (serviceOrderId) {
    this.serviceOrderCancelResponse = {
      code: '',
      content: false,
      isOk: false,
      message: '',
    }
    this.serviceOrderCancelResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.serviceOrder.serviceOrderCancel(serviceOrderId)))
    return this.serviceOrderCancelResponse
  }
  async getProductCategorySpecifications (partnerId, productCategory) {
    this.getProductCategorySpecificationsResponse = {
      code: '',
      content: null,
      isOk: false,
      message: '',
    }
    this.getProductCategorySpecificationsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.getProductCategorySpecifications(partnerId, productCategory)))
    return this.getProductCategorySpecificationsResponse
  }
  async getGeographies (partnerId, parentId) {
    this.getGeographiesResponse = {
      code: '',
      content: null,
      isOk: false,
      message: '',
    }
    this.getGeographiesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.serviceOrder.getGeographies(partnerId, parentId)))
    return this.getGeographiesResponse
  }
}

class Besttone {
  async getBesttonePopularBrandList (serviceOptionItemId, storeId, projectId, categoryId, top) {
    this.getBesttonePopularBrandListResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getBesttonePopularBrandListResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.besttone.getBesttonePopularBrandList(serviceOptionItemId, storeId, projectId, categoryId, top)))
    return this.getBesttonePopularBrandListResponse
  }
  async getBrands (sku, categoryId, name, page, limit) {
    this.getBrandsResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getBrandsResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.besttone.getBrands(sku, categoryId, name, page, limit)))
    return this.getBrandsResponse
  }
  async getCategories (sku) {
    this.getCategoriesResponse = {
      code: '',
      content: [],
      isOk: false,
      message: '',
    }
    this.getCategoriesResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.besttone.getCategories(sku)))
    return this.getCategoriesResponse
  }
  async getVerifyCard (cardId, cardpwd) {
    this.getVerifyCardResponse = {
      code: '',
      content: {
        description: '',
        fildUrl: '',
        name: '',
        serviceLensenceId: '',
        servicePackId: '',
        sku: '',
        unitPrice: '',
      },
      isOk: false,
      message: '',
    }
    this.getVerifyCardResponse = await AliGateway.get(ApiBaseUrl.concat(ApiRoutes.besttone.getVerifyCard(cardId, cardpwd)))
    return this.getVerifyCardResponse
  }
  async orderBesttonSave (params) {
    this.orderBesttonSaveResponse = {
      code: '',
      content: '',
      isOk: false,
      message: '',
    }
    this.orderBesttonSaveResponse = await AliGateway.post(ApiBaseUrl.concat(ApiRoutes.besttone.orderBesttonSave()), params)
    return this.orderBesttonSaveResponse
  }
}

export default {
  geography: new Geography(),
  serviceProduct: new ServiceProduct(),
  enumJs: new EnumJs(),
  enumType: new EnumType(),
  personTask: new PersonTask(),
  userManage: new UserManage(),
  verification: new Verification(),
  category: new Category(),
  message: new Message(),
  account: new Account(),
  contract: new Contract(),
  recycleOrder: new RecycleOrder(),
  person: new Person(),
  order: new Order(),
  invoice: new Invoice(),
  payment: new Payment(),
  excitation: new Excitation(),
  organization: new Organization(),
  config: new Config(),
  material: new Material(),
  bonus: new Bonus(),
  report: new Report(),
  licence: new Licence(),
  task: new Task(),
  brand: new Brand(),
  apiJs: new ApiJs(),
  wxOAuth: new WxOAuth(),
  partnerCso: new PartnerCso(),
  servicePack: new ServicePack(),
  jd: new Jd(),
  csoSchedule: new CsoSchedule(),
  serviceOrder: new ServiceOrder(),
  besttone: new Besttone()
}
