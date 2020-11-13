let AmountStatus = {
  未支付: 0,
  已支付: 1,
  已作废: 2,
  支付失败: 3,
  银行处理中: 10,
  分配金额失败: 11
}

let ObjectType = {

}

let AccountSettleStatus = {
  待结算: 10,
  已结算: 20,
  审核中: 30,
  不结算: 40
}

let AccountSettleType = {
  销售提成: 1,
  退订扣款: 2,
  活动奖励: 3,
  结算调差: 4,
  任务奖励: 5,
  红包奖励: 6,
  手续费: 7,
  电器回收佣金: 8
}

let DivideType = {
  本人销售佣金: 1,
  下级贡献佣金: 2,
  提现调差: 5,
  活动奖励: 6,
  红包奖励: 7,
  手续费: 8,
  电器回收佣金: 9
}

let AccountSettleAuditingStatus = {
  新建: 10,
  待审核: 20,
  已审核: 30,
  审核失败: 40,
  作废: 50
}

let ExcitationType = {
  销售激励: 0,
  活动: 1,
  奖项: 2,
  月排行活动: 10,
  周排行活动: 20,
  门店排行活动: 30
}

let ExcitationStatus = {
  上线: 0,
  下线: 1,
  未生效: 10
}

let ExcitationLogStatus = {
  未完成: 0,
  已完成: 1
}

let MoneyValueType = {
  比例: 0,
  固定金额: 1
}

let Gender = {
  男: 0,
  女: 1
}

let RecognizationStatus = {
  无需识别: 0,
  待识别: 1,
  识别成功: 2,
  识别失败: 3,
  已修正: 4
}

let ContractStatusChangeStatus = {
  新增: 10,
  已匹配合同项: 20,
  未匹配合同项: 21,
  已处理: 30,
  处理失败: 31
}

let ContractStatusChangeType = {
  退保: 10,
  作废: 20
}

let JdOrderAuditResult = {
  待审核: 0,
  审核通过: 2,
  拒绝通过: -1
}

let JdOrderType = {
  京东订单: 10,
  非京东订单: 100
}

let AwardStatus = {
  不可抽奖: 0,
  待抽奖: 1,
  未中奖: 2,
  已中奖: 3
}

let OrderStatus = {
  待录入: 20,
  已录入: 21,
  已取消: 40,
  已导入合同库: 60,
  已退款: 100,
  已完成: 110
}

let AudicResult = {
  审核不通过: 0,
  人工审核通过: 1,
  自动审核通过: 2,
  待审核: 3
}

let DbackPayType = {
  支付宝: 0,
  银行卡: 1,
  微信: 2
}

let ServiceItemType = {
  合同: 10,
  工单: 20
}

let PaymentStatus = {
  未支付: 10,
  已支付: 20,
  已退款: 30,
  失效: 50
}

let PayType = {
  支付宝: 0,
  现金: 1,
  微信: 2,
  手动标记: 3,
  商旅付款: 4,
  第三方劳务费平台: 50
}

let PayerType = {
  用户: 20,
  销售: 30,
  合作伙伴: 40
}

let PayMethod = {
  支付宝: 1,
  微信扫码支付: 2,
  微信代付: 3,
  收银台: 4,
  手动标记: 5,
  商旅付款: 6
}

let ConfusionType = {
  无: 0,
  显示前5位: 10
}

let SummaryValue = {
  数量: 10,
  金额: 20
}

let SummaryType = {
  组织独立汇总: 110,
  组织递归汇总: 120,
  人员汇总: 210
}

let ReportType = {
  本周周报: 10,
  本月月报: 20
}

let SigningStatus = {
  未开户: 0,
  已开户: 1,
  已签约: 2
}

let RoleUserStatus = {
  未启用: 10,
  启用: 20
}

let Role = {
  销售: 10,
  后台: 20,
  店长: 30
}

let LoginMethod = {
  Fusion账号: 0,
  个人微信号: 1,
  企业号账号: 2
}

let DivideintoTpye = {
  比例: 0,
  固定金额: 1
}

let AccountType = {
  微信企业号: 1,
  SDM: 2,
  百度直达号: 3
}

let PayeeType = {
  承运商收款: 10,
  合作伙伴收款: 20,
  我方收款: 30,
  服务站收款: 40
}

let ServiceOptionItemStatus = {
  生效: 10,
  失效: 20
}

let SaleMode = {
  零售: 20,
  赠送: 30
}

let PackType = {
  必选: 0,
  可选: 1,
  可添加: 2
}

let ServiceOptionType = {
  售后: 1,
  延保: 2,
  意外: 4,
  以换代修: 8,
  满意度金: 16,
  误时: 32,
  保鲜: 64,
  电池保: 128,
  货运险: 256,
  雷击: 512,
  清洁保养: 1024,
  安装: 2048
}

let ServiceOptionItemAttributes = {
  正式产品: 1,
  测试产品: 2
}

let ServiceOptionItemCategory = {
  服务类: 10,
  整机类: 20,
  选件类: 30
}

let InputType = {
  手动: 10,
  拍照: 20,
  拍摄: 30,
  扫码: 40
}

let ElementType = {
  图片: 10
}

let DivideintoType = {
  项目: 1,
  卖场: 2,
  销售: 3
}

let SettlementType = {
  固定金额: 0,
  比例: 1
}

let ServicePackStatus = {
  上架: 10,
  下架: 20
}

let ServicePackEffectStatus = {
  未生效: 10,
  生效: 20
}

let BankOrganizationName = {
  工商银行: 1804,
  招商银行: 1805,
  中国银行: 1806,
  建设银行: 1807,
  交通银行: 1808,
  农业银行: 1809,
  广东发展银行: 1810,
  深圳发展银行: 1811,
  上海浦东发展银行: 1812,
  浙江泰隆商业银行: 1813,
  中信银行: 1814,
  华夏银行: 1815,
  光大银行: 1816,
  北京银行: 1817,
  上海银行: 1818,
  天津银行: 1819,
  大连银行: 1820,
  杭州银行: 1821,
  宁波银行: 1822,
  厦门银行: 1823,
  广州银行: 1824,
  平安银行: 1825,
  浙商银行: 1826,
  上海农村商业银行: 1827,
  重庆银行: 1828,
  邮政储蓄银行: 1829,
  江苏银行: 1830,
  北京农村商业银行: 1831,
  济宁银行: 1832,
  台州银行: 1833,
  民生银行: 1834,
  兴业银行: 1835,
  成都银行: 4688
}

let ImagePathType = {
  证件: 10,
  设备: 20,
  票据: 30,
  产品: 40,
  品类: 50,
  激励: 60,
  信息: 70,
  Logo: 80
}

let LogType = {
  微信接口: 1,
  系统方法: 2,
  支付宝接口: 3
}

let Rusult = {
  成功: 1,
  失败: 2,
  过程描述: 3
}

let MessageType = {
  提交订单: 5,
  完成订单: 10,
  订单审核通过: 15,
  退款成功: 20,
  步步高: 30,
  导入合同: 40,
  碎屏保审核已通过: 41,
  碎屏保审核未通过: 42,
  短信模版: 50
}

let ObjectExpandContentType = {
  文本: 0,
  时间: 1,
  数字: 2,
  图片: 3,
  文本扫描: 4,
  地址: 5,
  文字识别: 6
}

let ObjectExpandType = {
  自定义: 0,
  系统: 1
}

let SystemExpandObject = {
  购机时间: 0,
  机器编号: 1,
  IMEI: 2,
  工单编号: 3,
  硬件型号: 4,
  备注: 5,
  IMEI图片: 6,
  购机发票照片: 7,
  硬件铭牌照片: 8,
  安装地址: 9,
  其他: 100
}

let ProductCategoryLevel = {
  Level1: 10,
  Level2: 20,
  Level3: 30,
  Level4: 40
}

let BrandCategoryMappingType = {
  常用品牌: 10,
  品牌品类关系: 20
}

let SystemConfigItem = {
  OssConfig: 200,
  AliMqsConfig: 201,
  AliPayConfig: 202,
  BusinessConfig: 203,
  FusionApiConfig: 204,
  SinaConfig: 205,
  ThirdPartyBillingConfig: 206,
  WeixinQyConfig: 207,
  WeixinWorkConfig: 208,
  WeixinWorkVersion: 209,
  BaiduMapConfig: 210,
  BalanceMonitor: 211,
  BesttoneConfig: 212,
  LoginConfig: 213,
  PassportApiConfig: 214,
  JdConfig: 215,
  BaseApiConfig: 216
}

let ConfigType = {
  系统: 0,
  自定义: 1
}

let MaterialStatus = {
  新建: 0,
  生效: 10,
  失效: 20
}

let MaterialContentType = {
  文本: 0,
  富文本: 1,
  Url: 2
}

let MaterialType = {
  延保单页: 0,
  直播视频: 1,
  销售技巧: 2,
  Banner: 3,
  Faq: 4
}

let MessageTypeGenner = {
  自定义消息: 0,
  短信模版: 1,
  已接任务: 10,
  可接任务: 20
}

let MessageStatus = {
  新建: 0,
  待发送: 10,
  已发送: 20,
  发送失败: 30
}

let MessageCategory = {
  Text消息: 0,
  Image消息: 10,
  Voice消息: 20,
  Video消息: 30,
  File消息: 40,
  News消息: 50,
  MpNews消息: 60
}

let MessageToType = {
  人员: 0,
  部门: 10,
  标签: 20
}

let PersonMessageStatus = {
  待发送: 10,
  已发送: 20,
  发送失败: 30,
  已读: 40
}

let MessageSendType = {
  微信企业号: 0,
  邮件: 10,
  短信: 20
}

let LevelType = {
  人员销售类: 0,
  人员服务类: 1
}

let PersonTaskIncomeStatus = {
  未领取: 0,
  已领取: 1
}

let TaskProgressRecordStatus = {
  待处理: 0,
  已处理: 10
}

let TaskIncomeObject = {
  积分: 0,
  经验: 1,
  佣金: 2,
  任务: 3
}

let TaskIncomeCondition = {
  任务达成后: 0,
  任务失败后: 1
}

let TaskType = {
  普通任务: 0,
  分解任务: 1
}

let TaskStatus = {
  新建: 0,
  生效: 1,
  失效: 2,
  到期失效: 3
}

let TargetType = {
  销售额: 0,
  销售量: 1
}

let TaskItemAttributeKeyWords = {
  品类包含: 0,
  品牌包含: 1,
  销售价大于: 2,
  硬件价格大于: 3,
  Sku包含: 4
}

let TaskProcessStatus = {
  进行中: 10,
  达成: 20,
  已领取奖励: 30,
  失败: 40
}

let TaskScopeKeyWords = {
  等级大于等于: 0,
  等级小于等于: 1,
  等级等于: 2,
  项目集合包含: 3,
  组织类型集合包含: 4,
  组织NamePath集合包含: 5,
  组织NamePath下级组织集合: 6,
  职位包含: 7,
  接受人数上限: 8,
  完成人数上限: 9,
  人员包含: 10
}

let TaskObtainTypes = {
  强制: 0,
  领取: 1
}

let RiskLevel = {
  低风险: 10,
  中风险: 20,
  高风险: 30
}

let PartsRegisterStatus = {
  新建: 1,
  待审核: 10,
  审核通过: 20,
  审核未通过: 30,
  已导入合同库: 40
}

let BatchStatus = {
  未生成: 10,
  已生成: 20
}

let SerialNumberStatus = {
  待销售: 10,
  待激活: 20,
  已激活: 30
}

let SyncStatus = {
  待新增: 0,
  待修改: 1,
  待更新: 2,
  待删除: 3,
  已同步: 4,
  待处理: 5
}

let WxAgentCategory = {
  自定义应用: 10,
  通讯录应用: 20,
  支付应用: 30,
  服务号: 40,
  订阅号: 50,
  小程序: 60
}

let WxAgentReportLocationFlag = {
  不上报: 0,
  进入会话上报: 1,
  持续上报: 2
}

let WxAgentIsrepor = {
  不接收: 0,
  接收: 1
}

let WxAgentType = {
  消息型: 1,
  主页型: 2
}

let WxMemberStatus = {
  已关注: 1,
  已冻结: 2,
  未关注: 4
}

let WxMemberEnable = {
  禁用: 0,
  启用: 1
}

let WxGender = {
  男: 1,
  女: 2
}

let PostionType = {
  销售: 1,
  销售管理: 2
}

let PassportSyncStatus = {
  未同步: 0,
  待同步: 1,
  已同步: 2,
  同步失败: 3,
  同步后新增: 4
}

let PassportCorpType = {
  厂商: 20,
  延保商: 30,
  服务商: 40,
  卖场: 50,
  电商: 60
}

let PassportEditionType = {
  标准版: 0,
  专业版: 1,
  旗舰版: 2
}

let CsoStatusCategory = {
  开始: 0,
  过程: 1,
  结束: 2
}

let ServiceOrderStatus = {
  待支付: 0,
  已支付: 1,
  已取消: 2,
  已退款: 3
}

let ServiceOrderType = {
  故障维修: 0,
  清洗保养: 1,
  移机安装: 2
}

let ServiceOrderPaymentStatus = {
  无需支付: 1,
  未支付: 10,
  已支付: 20,
  已退款: 30,
  失效: 50
}

let ServiceOrderPayMethod = {
  支付宝: 1,
  微信: 2
}

let PartnerAuthStatus = {
  启用: 0,
  禁用: 1
}

let CustomerRequestStatus = {
  待服务: 10,
  服务完: 100
}

let TroubleMeasure = {
  维修: 10,
  清洗: 20
}

let OnlineOrderStatus = {
  新建: 10,
  有效: 20,
  待付款: 30,
  完成: 40,
  取消: 200
}

let OnlineOrderSource = {
  百度糯米: 10,
  百度直达号: 20
}

let OnlineOrderItemType = {
  服务定单: 10
}

let ValueAddedOrderSource = {
  销售员: 0,
  用户: 1
}

let Season = {
  第一季度: 10,
  第二季度: 20,
  第三季度: 30,
  第四季度: 40
}

let LicenceType = {
  个人许可: 10,
  企业许可: 20
}

let MessageAccepter = {
  销售: 1,
  客户: 2
}

let Messages = {
  发送消息: 0,
  提交订单: 1,
  订单支付短信: 2,
  订单完成: 3,
  订单审核: 4,
  合同导入: 5,
  提现发放成功: 6,
  提现发放失败: 7,
  回收下单: 100
}

let WithdrawType = {

}

let GeographySource = {
  系统维护: 0,
  百度地图: 1
}

let CommissionType = {
  销售佣金: 10,
  销售分成佣金: 20,
  活动激励佣金: 110
}

let CommissionPayType = {
  代发劳务费: 0,
  服务结费: 1
}

let InvoiceStatus = {
  新增: 10,
  待确认: 20,
  确认: 30,
  已冲抵: 40,
  审核未通过: 50
}

let BonusStatus = {
  未发放: 0,
  未领取: 1,
  已领取: 2
}

let BonusEventStatus = {
  新建: 0,
  生效: 1,
  已取消: 2
}

let QueryBonusEventStatus = {
  新建: 0,
  未开始: 1,
  进行中: 2,
  已结束: 3,
  已取消: 4
}

let BonusPayType = {
  手动领取: 0,
  自动入账: 1
}

let CancelType = {
  销售员: 0,
  回收商: 1
}

let ValueAddedOrderStatus = {
  新建: 10,
  处理中: 30,
  待上门: 50,
  已取消: 90,
  已完成: 100
}

let ValueAddedOrderType = {
  回收: 0
}

let YxypRecycleOrderStatus = {
  新订单: 0,
  已取消: 3,
  已完成: 99,
  已接单: 102
}

let HideSurnameType = {
  开启: 0,
  关闭: 1
}

export { AmountStatus, ObjectType, AccountSettleStatus, AccountSettleType, DivideType, AccountSettleAuditingStatus, ExcitationType, ExcitationStatus, ExcitationLogStatus, MoneyValueType, Gender, RecognizationStatus, ContractStatusChangeStatus, ContractStatusChangeType, JdOrderAuditResult, JdOrderType, AwardStatus, OrderStatus, AudicResult, DbackPayType, ServiceItemType, PaymentStatus, PayType, PayerType, PayMethod, ConfusionType, SummaryValue, SummaryType, ReportType, SigningStatus, RoleUserStatus, Role, LoginMethod, DivideintoTpye, AccountType, PayeeType, ServiceOptionItemStatus, SaleMode, PackType, ServiceOptionType, ServiceOptionItemAttributes, ServiceOptionItemCategory, InputType, ElementType, DivideintoType, SettlementType, ServicePackStatus, ServicePackEffectStatus, BankOrganizationName, ImagePathType, LogType, Rusult, MessageType, ObjectExpandContentType, ObjectExpandType, SystemExpandObject, ProductCategoryLevel, BrandCategoryMappingType, SystemConfigItem, ConfigType, MaterialStatus, MaterialContentType, MaterialType, MessageTypeGenner, MessageStatus, MessageCategory, MessageToType, PersonMessageStatus, MessageSendType, LevelType, PersonTaskIncomeStatus, TaskProgressRecordStatus, TaskIncomeObject, TaskIncomeCondition, TaskType, TaskStatus, TargetType, TaskItemAttributeKeyWords, TaskProcessStatus, TaskScopeKeyWords, TaskObtainTypes, RiskLevel, PartsRegisterStatus, BatchStatus, SerialNumberStatus, SyncStatus, WxAgentCategory, WxAgentReportLocationFlag, WxAgentIsrepor, WxAgentType, WxMemberStatus, WxMemberEnable, WxGender, PostionType, PassportSyncStatus, PassportCorpType, PassportEditionType, CsoStatusCategory, ServiceOrderStatus, ServiceOrderType, ServiceOrderPaymentStatus, ServiceOrderPayMethod, PartnerAuthStatus, CustomerRequestStatus, TroubleMeasure, OnlineOrderStatus, OnlineOrderSource, OnlineOrderItemType, ValueAddedOrderSource, Season, LicenceType, MessageAccepter, Messages, WithdrawType, GeographySource, CommissionType, CommissionPayType, InvoiceStatus, BonusStatus, BonusEventStatus, QueryBonusEventStatus, BonusPayType, CancelType, ValueAddedOrderStatus, ValueAddedOrderType, YxypRecycleOrderStatus, HideSurnameType }
