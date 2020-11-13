import { API_ROOT } from './config.js'

function account (url) {
  return API_ROOT.concat('/account' + url)
}

function brand (url) {
  return API_ROOT.concat('/brand' + url)
}

function hotbrands (url) {
  return API_ROOT.concat('/hotbrands' + url)
}

function categories (url) {
  return API_ROOT.concat('/categories' + url)
}

function Enum (url) {
  return API_ROOT.concat('/enum' + url)
}

function invoice (url) {
  return API_ROOT.concat('/invoice' + url)
}

function licence (url) {
  return API_ROOT.concat('/licence' + url)
}

function material (url) {
  return API_ROOT.concat('/material' + url)
}

function message (url) {
  return API_ROOT.concat('/message' + url)
}

function order (url) {
  return API_ROOT.concat('/order' + url)
}

function org (url) {
  return API_ROOT.concat('/organization' + url)
}

function pay (url) {
  return API_ROOT.concat('/payment' + url)
}

function person (url) {
  return API_ROOT.concat('/person' + url)
}

function personTask (url) {
  return API_ROOT.concat('/persontask' + url)
}

function report (url) {
  return API_ROOT.concat('/report' + url)
}

function servicePack (url) {
  return API_ROOT.concat('/service_pack' + url)
}

function serviceProduct (url) {
  return API_ROOT.concat('/service_product' + url)
}

function task (url) {
  return API_ROOT.concat('/task' + url)
}

function wxOauth (url) {
  return API_ROOT.concat('/wx_oauth' + url)
}

function getCompanyListUrl (url) {
  return API_ROOT.concat('/company' + url)
}

function createCompanyUrl (url) {
  return API_ROOT.concat('/company' + url)
}

function excitation (url) {
  return API_ROOT.concat('/excitation' + url)
}

function wxImage (url) {
  return API_ROOT.concat('/wx_image' + url)
}

function besttone (url) {
  return API_ROOT.concat('/besttone' + url)
}

function contract (url) {
  return API_ROOT.concat('/verification' + url)
}

function qrCode (url) {
  return API_ROOT.concat('/person' + url)
}

function verifications (url) {
  return API_ROOT.concat('/verifications' + url)
}
function cancel (url) {
  return API_ROOT.concat('/order' + url)
}
let wxApiUrl = {}

wxApiUrl.getVerifications = verifications('') // 登陆授权获取PersonId

wxApiUrl.getWxPerson = wxOauth('/wx_login') // 登陆授权获取PersonId
wxApiUrl.getTicket = wxOauth('/ticket') // 获取JSSDK可用的Ticket
wxApiUrl.getToken = API_ROOT.concat('/token') // 获取Token
wxApiUrl.getSignature = wxOauth('/signature') // 获取签名

wxApiUrl.getCompanyList = getCompanyListUrl('/list?entId=')
wxApiUrl.createCompany = createCompanyUrl('/create')

wxApiUrl.getMessage = message('s') // 已读，未读消息
wxApiUrl.putMessage = message('/read_receipt') // 消息已读回执

wxApiUrl.getAcceptable = task('s') // 未接任务列表
wxApiUrl.getTask = task('/') // 获取任务详情
wxApiUrl.postTasks = task('/accept') // 任务接受
wxApiUrl.postSubTasks = task('/distribute') // 任务分配

wxApiUrl.submitSubTask = personTask('/submit') // 新建->有效
wxApiUrl.taskIncome = personTask('/income') // 领取奖励
wxApiUrl.getPersonTask = personTask('/') // 获取人员任务详情 // 清空子任务
wxApiUrl.getPersonTasks = personTask('s') // 已接任务列表

wxApiUrl.getPerson = person('/') // 获取人员信息 // 获取佣金金额 // 获取需开票金额，待确认金额
wxApiUrl.getProjects = org('/') // 获取组织-授权项目 // 获取下级组织列表
wxApiUrl.getPartner = org('/partner/') // 获取组织-授权项目

wxApiUrl.getMaterials = material('s') // 获取素材列表
wxApiUrl.getMaterialsDetails = material('/') // 获取素材信息

wxApiUrl.getOrders = order('s') // 获取订单列表
wxApiUrl.submitOrders = order('/besttone/') // 获取订单列表
wxApiUrl.getOrder = order('/') // 获取订单详情 // 获取订单信息 // 提交订单 // 获取抽奖状态接口
wxApiUrl.getBrands = hotbrands('') // 获取品牌
wxApiUrl.getPopularBrand = brand('/popular_ranks') // 获取热门品牌
wxApiUrl.getCategories = categories('') // 获取品类
wxApiUrl.getSaveOrder = order('') // 保存订单

wxApiUrl.getLicenceBySku = serviceProduct('/licence/') // 获取服务产品项_条款

wxApiUrl.getServicePacks = servicePack('s') // 服务包列表
wxApiUrl.getServicePack = servicePack('/') // 获取服务产品 // 服务产品详情 // 获取品类扩展

wxApiUrl.getRankingDetail = report('/ranking/') // 排名详情
wxApiUrl.getRankings = report('/rankings') // 排名列表
wxApiUrl.getReportForm = report('/sale_orders') // 团队业绩

wxApiUrl.getInvoice = invoice('/') // 获取发票详情 // 删除发票
wxApiUrl.getInvoiceList = invoice('s') // 获取发票列表
wxApiUrl.postInvoice = invoice('') // 提交发票

wxApiUrl.pay = pay('/') // 支付方式
wxApiUrl.payment = pay('') // 长轮询

wxApiUrl.getCommissionDetail = account('/settle/')  // 获取佣金详情
wxApiUrl.getCommissionList = account('/settles') // 获取佣金列表
wxApiUrl.getAccountPayments = account('/payments') // 提现列表
wxApiUrl.getAccountPayment = account('/payment/') // 提现详情 // 提现详情_佣金列表
wxApiUrl.postCash = person('/cash') // 提现申请
wxApiUrl.getDivideType = Enum('/divide_types')  // 佣金类型_Combo

wxApiUrl.postLicence = licence('/agreement') // 同意协议
wxApiUrl.getLicenceList = licence('s') // 协议列表
wxApiUrl.getLicenceDetail = licence('/') // 协议详情

wxApiUrl.postPersonBankInfo = API_ROOT.concat('/person') // 保存个人银行信息
wxApiUrl.getPersonBankInfo = person('/') // 获取个人银行信息

wxApiUrl.getGeography = API_ROOT.concat('/geography') // 地理信息
wxApiUrl.geocode = API_ROOT.concat('/geography/geocode') // 地理信息

wxApiUrl.getDrawHistory = excitation('/') // 获奖名单 // 奖品列表

wxApiUrl.getImage = wxImage('') // 获取图片

wxApiUrl.postCarmal = besttone('/verify_card') // 验证卡密
wxApiUrl.activationCategories = besttone('/categories') // 激活品类
wxApiUrl.activationBrands = besttone('/brands') // 激活品牌
wxApiUrl.activationOrder = besttone('/order') // 激活订单保存
wxApiUrl.popular = besttone('/brand/popular_ranks') // 热门品牌

wxApiUrl.getContractList = contract('/contracts') // 获取合同查询列表
wxApiUrl.postClaim = contract('')  // 提交核销

wxApiUrl.getQrCode = qrCode('/')

wxApiUrl.customerService = {
  getCustomerServiceDetail: (customerServiceId) => `${API_ROOT}/customerService/${customerServiceId}`  // 获取合同的客户请求详情
}
wxApiUrl.serviceContract = {
  getProductCategories: (serviceContractId) => `${API_ROOT}/serviceContract/${serviceContractId}/productCategories`,
  getBrands: () => `${API_ROOT}/brands`,
  getCustomerServices: (serviceContractId) => `${API_ROOT}/serviceContract/${serviceContractId}/customerServices`,  // 获取合同的客户请求列表
  getContractPdf: (serviceContractId) => `${API_ROOT}/serviceContract/${serviceContractId}/contractPdf`, // 获取电子合同接口
  getCustomerServiceTypeAppliable: (serviceContractId) => `${API_ROOT}/serviceContract/${serviceContractId}/customerServiceTypeAppliable`, // 合同的可申请服务请求类型列表
  getInvoice: (serviceContractId) => `${API_ROOT}/serviceContract/${serviceContractId}/invoice`, // 获取发票详情接口
  postCustomerService: (serviceContractId) => `${API_ROOT}/serviceContract/${serviceContractId}/customerService`, // 申请服务请求
  getContractDetail: (serviceContractId) => `${API_ROOT}/serviceContract/${serviceContractId}`
}
wxApiUrl.organization = {
  disabledPerson: (organizationId, personId) => `${API_ROOT}/organization/${organizationId}/person/${personId}/disabled`,  // 人员从组织离职
  newPerson: (organizationId) => `${API_ROOT}/organization/${organizationId}/person`,  // 人员新增
  getPersonList: (organizationId) => `${API_ROOT}/organization/${organizationId}/persons`,  // 获取组织的就职人员列表
  getPositionList: (organizationId) => `${API_ROOT}/organization/${organizationId}/positions`  // 当前组织的职位列表

}
wxApiUrl.persons = {
  getAssumeInfoByPhone: () => `${API_ROOT}/persons`,  // 获取指定电话在指定合作伙伴内的就职信息
  bounsEventOperators: (personId) => `${API_ROOT}/persons/${personId}/bonusEventOperators`  // 获取指定电话在指定合作伙伴内的就职信息
}
wxApiUrl.bonus = {
  getBonus: (bonusId) => `${API_ROOT}/bonus/${bonusId}`,  // 获取红包详情
  sendBonus: (bonusId) => `${API_ROOT}/bonus/${bonusId}/release`,  // 红包发放接口
  getBonu: (bonusId) => `${API_ROOT}/bonus/${bonusId}/receive`,  // 红包领取接口
  getOperatorBonusList: () => `${API_ROOT}/bonuses`,
  getPersonBonusOperators: (personId) => `${API_ROOT}/person/${personId}/bonusEventOperators`
}
wxApiUrl.order = {
  getOrder: (orderId) => `${API_ROOT}/order/${orderId}`  // 获取订单详情
}
wxApiUrl.BounsEvent = {
  getBonusEvent: (bonusEventId) => `${API_ROOT}/bonusEvent/${bonusEventId}`  // 获取获取红包活动
}
wxApiUrl.getOrderCancel = cancel('')  // 取消订单的接口

export default wxApiUrl
