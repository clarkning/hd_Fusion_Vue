let AccountType = {
  ZanAccount: 10,
  Sns: 20
}

let CustomerServiceSource = {
  服务号: 10,
  Sw: 20,
  Base: 30
}

let CustomerServiceStatus = {
  受理: 10,
  完成: 100,
  失败: 500
}

let ServiceType = {
  电器回收:0,
  故障维修:1,
  拆卸安装:2,
  清洗保养:3,
}

let ServiceTypeShow = {
  回收:0,
  维修:1,
  安装:2,
  清洗:3
}

let CustomerServiceType = {
  信息变更: 20,
  邮寄纸质发票: 30,
  邮寄纸质合同: 40,
  邮寄纸质发票及纸质合同: 50,
  电子发票: 60,
  电子合同: 70
}

let PositionType = {
  销售: 1,
  销售管理: 2
}

let GeographyType = {
  Country: 5,
  Province: 10,
  City: 20,
  County: 30
}

let LogisticsOrderPayment = {
  寄方付: 10,
  收方付: 20,
  月结: 30
}

let LogisticsOrderStatus = {
  已签收: 10,
  配送终止: 20,
  待发货: 30,
  已发货: 40,
  已揽收: 50,
  在途: 60,
  同城派送中: 70,
  退签: 80,
  退回: 90,
  疑难: 100,
  转单: 110
}

let SnsType = {
  Qq: 0,
  Weibo: 1,
  Weixin: 2
}

export {
  AccountType,
  CustomerServiceSource,
  CustomerServiceStatus,
  CustomerServiceType,
  ServiceType,
  ServiceTypeShow,
  GeographyType,
  PositionType,
  LogisticsOrderPayment,
  LogisticsOrderStatus,
  SnsType
}
