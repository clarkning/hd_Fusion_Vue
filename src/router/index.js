import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import store from '../store'

Vue.use(Router)

let needAuth = true

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve),
      meta: {
        auth: needAuth,
        title: '众安保修'
      }
    },
    {
      path: '/login',
      component: resolve => require(['@/components/login'], resolve),
      meta: {
        auth: needAuth,
        title: '众安保修'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve),
      meta: {
        auth: needAuth,
        title: '主页'
      }
    },
    {
      path: '/TaskList',
      name: 'TaskList',
      component: resolve => require(['@/components/task/task_list'], resolve),
      meta: {
        auth: needAuth,
        title: '红包任务'
      }
    },
    {
      path: '/DecompositionTask',
      name: 'DecompositionTask',
      component: resolve => require(['@/components/task/decomposition_task'], resolve),
      meta: {
        auth: needAuth,
        title: '任务分解'
      }
    },
    {
      path: '/TaskSchedule',
      name: 'TaskSchedule',
      component: resolve => require(['@/components/task/task_schedule'], resolve),
      meta: {
        auth: needAuth,
        title: '任务详情'
      }
    },
    {
      path: '/IncomeTask',
      name: 'IncomeTask',
      component: resolve => require(['@/components/task/income_task'], resolve),
      meta: {
        auth: needAuth,
        title: '任务详情'
      }
    },
    {
      path: '/Subtask',
      name: 'Sub',
      component: resolve => require(['@/components/task/sub_task'], resolve),
      meta: {
        auth: needAuth,
        title: '任务分配'
      }
    },
    {
      path: '/SubTaskDetail',
      name: 'SubTaskDetail',
      component: resolve => require(['@/components/task/sub_task_detail'], resolve),
      meta: {
        auth: needAuth,
        title: '下级任务'
      }
    },
    {
      path: '/Message',
      name: 'Message',
      component: resolve => require(['@/components/message/message'], resolve),
      meta: {
        auth: needAuth,
        title: '最新消息'
      }
    },
    {
      path: '/MessageDetails',
      name: 'MessageDetails',
      component: resolve => require(['@/components/message/message_details'], resolve),
      meta: {
        auth: needAuth,
        title: '信息详情'
      }
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: resolve => require(['@/components/mine/mine'], resolve),
      meta: {
        auth: needAuth,
        title: '我的'
      }
    },
    {
      path: '/recycle',
      name: 'recycle',
      component: resolve => require(['@/components/service_price/landing'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/ServiceCatalog',
      name: 'ServiceCatalog',
      component: resolve => require(['@/components/service_price/home/index'], resolve),
      meta: {
        title: '维修回收服务'
      }
    },
    {
      path: '/serviceType',
      name: 'serviceType',
      component: resolve => require(['@/components/service_price/serviceType/index'], resolve),
      meta: {
        title: '服务类型'
      }
    },
    {
      path: '/priceStandard/:category/:serviceType',
      name: 'priceStandard',
      component: resolve => require(['@/components/service_price/price_standard/index'], resolve),
      meta: {
        title: '价格标准'
      }
    },
    {
      path: '/reservationService/:serviceType/:category',
      name: 'reservationService',
      component: resolve => require(['@/components/service_price/reservation_service/index'], resolve),
      meta: {
        title: '预约服务'
      }
    },
    {
      path: '/submitSuccess',
      name: 'submitSuccess',
      component: resolve => require(['@/components/service_price/reservation_service/recycle_success/index'], resolve),
      meta: {
        title: '提交成功'
      }
    },
    {
      path: '/Help',
      name: 'Help',
      component: resolve => require(['@/components/mine/help'], resolve),
      meta: {
        auth: needAuth,
        title: '帮助'
      }
    },
    {
      path: '/PersonInfo',
      name: 'PersonInfo',
      component: resolve => require(['@/components/mine/person_info'], resolve),
      meta: {
        auth: needAuth,
        title: '个人信息'
      }
    },
    {
      path: '/InvoiceList',
      name: 'InvoiceList',
      component: resolve => require(['@/components/mine/invoice/invoice_list'], resolve),
      meta: {
        auth: needAuth,
        title: '发票管理'
      }
    },
    {
      path: '/InvoiceDetail',
      name: 'InvoiceDetail',
      component: resolve => require(['@/components/mine/invoice/invoice_detail'], resolve),
      meta: {
        auth: needAuth,
        title: '发票详情'
      }
    },
    {
      path: '/SpecialInvoice',
      name: 'SpecialInvoice',
      component: resolve => require(['@/components/mine/invoice/special_invoice'], resolve),
      meta: {
        auth: needAuth,
        title: '专票信息'
      }
    },
    {
      path: '/SubmitInvoice',
      name: 'SubmitInvoice',
      component: resolve => require(['@/components/mine/invoice/submit_invoice'], resolve),
      meta: {
        auth: needAuth,
        title: '上传发票'
      }
    },
    {
      path: '/AdPage',
      name: 'AdPage',
      component: resolve => require(['@/components/materials/ad_page/ad_page'], resolve),
      meta: {
        auth: needAuth,
        title: '延保资料'
      }
    },
    {
      path: '/Classroom',
      name: 'Classroom',
      component: resolve => require(['@/components/materials/classroom/classroom'], resolve),
      meta: {
        auth: needAuth,
        title: '在线学习'
      }
    },
    {
      path: '/FaqList',
      name: 'FaqList',
      component: resolve => require(['@/components/materials/faq_list/faq_list'], resolve),
      meta: {
        auth: needAuth,
        title: '常见问题'
      }
    },
    {
      path: '/SalesSkills',
      name: 'SalesSkills',
      component: resolve => require(['@/components/materials/sales_skills/sales_skills'], resolve),
      meta: {
        auth: needAuth,
        title: '培训'
      }
    },
    {
      path: '/AdPageDetails',
      name: 'AdPageDetails',
      component: resolve => require(['@/components/materials/ad_page/ad_page_details'], resolve),
      meta: {
        auth: needAuth,
        title: '延保资料'
      }
    },
    {
      path: '/BannerDetails',
      name: 'BannerDetails',
      component: resolve => require(['@/components/materials/banner_details'], resolve),
      meta: {
        auth: needAuth,
        title: '众安保修'
      }
    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: resolve => require(['@/components/sell/order/ali_order_confirm/order_confirm'], resolve)
    },
    {
      path: '/OrderError',
      name: 'OrderError',
      component: resolve => require(['@/components/sell/order/ali_order_confirm/order_error'], resolve)
    },
    {
      path: '/PayResult',
      name: 'PayResult',
      component: resolve => require(['@/components/sell/payment/pay_result'], resolve)
    },
    {
      path: '/ChooseReportProject',
      name: 'ChooseReportProject',
      component: resolve => require(['@/components/public/choose_project'], resolve),
      meta: {
        auth: needAuth,
        title: '项目选择'
      }
    },
    {
      path: '/JuniorAch',
      name: 'JuniorAch',
      component: resolve => require(['@/components/report/junior_ach'], resolve),
      meta: {
        auth: needAuth,
        title: '下级业绩'
      }
    },
    {
      path: '/MyAch',
      name: 'MyAch',
      component: resolve => require(['@/components/report/my_ach'], resolve),
      meta: {
        auth: needAuth,
        title: '我的业绩'
      }
    },
    {
      path: '/Team',
      name: 'Team',
      component: resolve => require(['@/components/report/team'], resolve),
      meta: {
        auth: needAuth,
        title: '团队业绩'
      }
    },
    {
      path: '/Overview',
      name: 'Overview',
      component: resolve => require(['@/components/report/overview'], resolve),
      meta: {
        auth: needAuth,
        title: '销售总览'
      }
    },
    {
      path: '/ChooseRankingProject',
      name: 'ChooseRankingProject',
      component: resolve => require(['@/components/public/choose_project'], resolve),
      meta: {
        auth: needAuth,
        title: '项目选择'
      }
    },
    {
      path: '/insuranceClaim',
      name: 'insuranceClaim',
      component: resolve => require(['@/components/insurance_claim/verificationIndex'], resolve),
      meta: {
        auth: needAuth,
        keepAlive: true,
        title: '出险核销'
      }
    },
    // {
    //   path: '/verificationHistory',
    //   name: 'verificationHistory',
    //   component: resolve => require(['@/components/insurance_claim/verificationHistory'], resolve),
    //   meta: {
    //     auth: needAuth,
    //     title: '历史核销',
    //   }
    // },
    {
      path: '/verificationDefault',
      name: 'verificationDefault',
      component: resolve => require(['@/components/insurance_claim/verificationDefault'], resolve),
      meta: {
        auth: needAuth,
        title: '核销详情'
      }
    },
    {
      path: '/Ranking',
      name: 'Ranking',
      component: resolve => require(['@/components/ranking/ranking'], resolve),
      meta: {
        auth: needAuth,
        title: '销售排名'
      }
    },
    {
      path: '/PersonRanking',
      name: 'PersonRanking',
      component: resolve => require(['@/components/ranking/person_ranking'], resolve),
      meta: {
        auth: needAuth,
        title: '销售排名'
      }
    },
    {
      path: '/Commission',
      name: 'Commission',
      component: resolve => require(['@/components/commission/commission'], resolve),
      meta: {
        auth: needAuth,
        title: '佣金'
      }
    },
    {
      path: '/CommissionDetail',
      name: 'CommissionDetail',
      component: resolve => require(['@/components/commission/commission_detail'], resolve),
      meta: {
        auth: needAuth,
        title: '佣金详情'
      }
    },
    {
      path: '/CommissionList',
      name: 'CommissionList',
      component: resolve => require(['@/components/commission/commission_list'], resolve),
      meta: {
        auth: needAuth,
        title: '佣金列表'
      }
    },
    {
      path: '/LicenceDetail',
      name: 'LicenceDetail',
      component: resolve => require(['@/components/commission/licence'], resolve),
      meta: {
        auth: needAuth,
        title: '协议'
      }
    },
    {
      path: '/WithdrawApplication',
      name: 'WithdrawApplication',
      component: resolve => require(['@/components/commission/withdraw_application'], resolve),
      meta: {
        auth: needAuth,
        title: '提现申请'
      }
    },
    {
      path: '/WithdrawApplicationSubmit',
      name: 'WithdrawApplicationSubmit',
      component: resolve => require(['@/components/commission/withdraw_application_submit'], resolve),
      meta: {
        auth: needAuth,
        title: '提现申请提交'
      }
    },
    {
      path: '/WithdrawDetailList',
      name: 'WithdrawDetailList',
      component: resolve => require(['@/components/commission/withdraw_detail_list'], resolve),
      meta: {
        auth: needAuth,
        title: '提现详情列表'
      }
    },
    {
      path: '/MyOrder',
      name: 'MyOrder',
      component: resolve => require(['@/components/sell/order/my_order/index'], resolve),
      meta: {
        auth: needAuth,
        title: '历史订单'
      }
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: resolve => require(['@/components/sell/order/order_detail/index'], resolve),
      meta: {
        auth: needAuth,
        title: '订单详情'
      }
    },
    {
      path: '/OrderDetailRecycle',
      name: 'OrderDetailRecycle',
      component: resolve => require(['@/components/sell/order/my_order/recycle/detail'], resolve),
      meta: {
        auth: needAuth,
        title: '订单详情'
      }
    },
    {
      path: '/ProductInfo',
      name: 'ProductInfo',
      component: resolve => require(['@/components/sell/order/product_info'], resolve),
      meta: {
        auth: needAuth,
        title: '产品信息'
      }
    },
    {
      path: '/ChooseProject',
      name: 'ChooseProject',
      component: resolve => require(['@/components/public/choose_project'], resolve),
      meta: {
        auth: needAuth,
        title: '项目选择',
        pushName: 'ProductCategory'
      }
    },
    {
      path: '/ProductCategory',
      name: 'ProductCategory',
      component: resolve => require(['@/components/sell/product_category'], resolve),
      meta: {
        auth: needAuth,
        title: '产品类别',
        pushName: 'SellProduct'
      }
    },
    {
      path: '/SellProduct',
      name: 'SellProduct',
      component: resolve => require(['@/components/sell/sell_product'], resolve),
      meta: {
        auth: needAuth,
        title: '匹配可售产品',
        pushName: 'PayList'
      }
    },
    {
      path: '/PayList',
      name: 'PayList',
      component: resolve => require(['@/components/sell/payment/pay_list'], resolve),
      meta: {
        auth: needAuth,
        title: '支付方式',
        pushName: { // key = payType + payerType
          '020': 'OrderFilling',
          '140': 'Cashier',
          '230': 'OrderFilling',
          '220': 'WeChatPay'
        }
      }
    },
    {
      path: '/Cashier',
      name: 'Cashier',
      component: resolve => require(['@/components/sell/payment/cashier'], resolve),
      meta: {
        auth: needAuth,
        title: '收银台支付',
        pushName: 'OrderFilling'
      }
    },
    {
      path: '/WeChatPay',
      name: 'WeChatPay',
      component: resolve => require(['@/components/sell/payment/we_chat_pay'], resolve),
      meta: {
        auth: needAuth,
        title: '微信支付',
        pushName: 'OrderFilling'
      }
    },
    {
      path: '/OrderFilling',
      name: 'OrderFilling',
      component: resolve => require(['@/components/sell/order_filling'], resolve),
      meta: {
        auth: needAuth,
        title: '订单填写',
        pushName: { // key = payType + payerType
          '020': 'MyOrder',
          '140': 'Scan',
          '230': 'Scan',
          '220': 'Scan'
        }
      }
    },
    {
      path: '/Category',
      name: 'Category',
      component: resolve => require(['@/components/sell/category'], resolve),
      meta: {
        auth: needAuth,
        title: '品类选择'
      }
    },
    {
      path: '/Brand',
      name: 'Brand',
      component: resolve => require(['@/components/sell/brand'], resolve),
      meta: {
        auth: needAuth,
        title: '品牌选择'
      }
    },
    {
      path: '/hbBrand',
      name: 'hbBrand',
      component: resolve => require(['@/components/sell/114/114_brand'], resolve),
      meta: {
        auth: needAuth,
        title: '品牌选择'
      }
    },
    {
      path: '/hbSelectBrand',
      name: 'hbSelectBrand',
      component: resolve => require(['@/components/sell/brand'], resolve),
      meta: {
        auth: needAuth,
        title: '品牌选择'
      }
    },
    {
      path: '/Scan',
      name: 'Scan',
      component: resolve => require(['@/components/sell/scan'], resolve),
      meta: {
        auth: needAuth,
        title: '微信关注',
        pushName: 'MyOrder'
      }
    },
    {
      path: '/Draw',
      name: 'Draw',
      component: resolve => require(['@/components/sell/draw/draw'], resolve),
      meta: {
        auth: needAuth,
        title: '抽奖'
      }
    },
    {
      path: '/BaiPay',
      name: 'BaiPay',
      component: resolve => require(['@/components/sell/114/bai_pay'], resolve),
      meta: {
        auth: needAuth,
        title: '号百支付'
      }
    },
    {
      path: '/Licence',
      name: 'Licence',
      component: resolve => require(['@/components/sell/114/licence'], resolve),
      meta: {
        auth: needAuth,
        title: '产品服务条款'
      }
    },
    {
      path: '/hbCategory',
      name: 'hbCategory',
      component: resolve => require(['@/components/sell/114/114_category'], resolve),
      meta: {
        auth: needAuth,
        title: '品类选择'
      }
    },
    {
      path: '/114CustomerPurchase',
      name: 'haoBaiCustomerPurchase',
      component: resolve => require(['@/components/sell/114/114_customer_purchase'], resolve),
      meta: {
        auth: !needAuth,
        title: '产品类别'
      }
    },
    {
      path: '/haoBaiSellProduct',
      name: 'haoBaiSellProduct',
      component: resolve => require(['@/components/sell/114/114_sell_product'], resolve),
      meta: {
        auth: needAuth,
        title: '订单填写'
      }
    },
    {
      path: '/114ProductCategory',
      name: 'hbProductCategory',
      component: resolve => require(['@/components/sell/114/114_product_category'], resolve),
      meta: {
        auth: needAuth,
        title: '产品类别'
      }
    },
    {
      path: '/activateOrderFilling',
      name: 'activateOrderFilling',
      component: resolve => require(['@/components/sell/114/114_activation_order_filling'], resolve),
      meta: {
        auth: needAuth,
        title: '订单填写'
      }
    },
    {
      path: '/activation_service',
      name: 'activation_service',
      component: resolve => require(['@/components/sell/114/activation_service'], resolve),
      meta: {
        auth: !needAuth,
        title: '激活服务'
      }
    },
    {
      path: '/activation_order_fill',
      name: 'activation_order_fill',
      component: resolve => require(['@/components/sell/114/activation_order_fill'], resolve),
      meta: {
        auth: needAuth,
        title: '订单填写'
      }
    },
    {
      path: '/haoBai_product_description',
      name: 'haoBai_product_description',
      component: resolve => require(['@/components/sell/114/114_product_description'], resolve),
      meta: {
        auth: needAuth,
        title: '产品介绍'
      }
    },
    {
      path: '/activation_success',
      name: 'activation_success',
      component: resolve => require(['@/components/sell/114/activation_success'], resolve),
      meta: {
        auth: needAuth,
        title: '提交成功'
      }
    },
    {
      path: '/OrderBai',
      name: 'OrderBai',
      component: resolve => require(['@/components/sell/114/order_bai'], resolve),
      meta: {
        auth: needAuth,
        title: '号百支付'
      }
    },
    // {
    //   path: '/contract_inquiry',
    //   name: 'contract_inquiry',
    //   component: resolve => require(['@/components/insurance_claim/contract_inquiry'], resolve),
    //   meta: {
    //     auth: needAuth,
    //     title: '合同查询'
    //   }
    // },
    {
      path: '/insurance_claim',
      name: 'insurance_claim',
      component: resolve => require(['@/components/insurance_claim/insurance_claim'], resolve),
      meta: {
        auth: needAuth,
        title: '出险核销'
      }
    },
    {
      path: '/she',
      name: 'index',
      component: resolve => require(['@/components/she/index'], resolve),
      meta: {
        auth: needAuth,
        title: '售后逸'
      }
    },
    {
      path: '/contractApply',
      name: 'contractApply',
      component: resolve => require(['@/components/sell/order/customer_service/contract_invoice_apply/index'], resolve),
      meta: {
        auth: needAuth,
        title: '合同发票申请',
        keepAlive: true
      }
    },
    {
      path: '/elInvoiceIntroduction',
      name: 'introductionElectronicInvoice',
      component: () => import('@/components/sell/order/customer_service/introduction_electronic_invoice/index'),
      meta: {
        auth: needAuth,
        title: '什么是电子发票',
        keepAlive: true
      }
    },
    {
      path: '/submitComplete',
      name: 'submitComplete',
      component: resolve => require(['@/components/sell/order/customer_service/contract_invoice_apply/submit_complete'], resolve),
      meta: {
        auth: needAuth,
        title: '提交完成'
      }
    },
    {
      path: '/logisticsOrderTrack',
      name: 'logisticsOrderTrack',
      component: resolve => require(['@/components/sell/order/customer_service/application_record_detail/logistics/index'], resolve),
      meta: {
        auth: needAuth,
        title: '物流信息'
      }
    },
    {
      path: '/elInvoice',
      name: 'elInvoice',
      component: resolve => require(['@/components/sell/order/customer_service/application_record_detail/electronic_invoice_inquiry'], resolve),
      meta: {
        auth: needAuth,
        title: '电子发票'
      }
    },
    {
      path: '/elContract',
      name: 'elContract',
      component: resolve => require(['@/components/sell/order/customer_service/application_record_detail/electronic_contract_inquiry'], resolve),
      meta: {
        auth: needAuth,
        title: '电子合同'
      }
    },
    {
      path: '/customerService',
      name: 'customerService',
      component: resolve => require(['@/components/sell/order/customer_service/index'], resolve),
      meta: {
        auth: needAuth,
        title: '服务申请'
      }
    },
    {
      path: '/contractEdit',
      name: 'contractEdit',
      component: resolve => require(['@/components/sell/order/customer_service/contract_edit/index'], resolve),
      meta: {
        auth: needAuth,
        title: '合同信息修改',
        keepAlive: true
      }
    },
    {
      path: '/contractEditInfo',
      name: 'contractEditInfo',
      component: resolve => require(['@/components/sell/order/customer_service/application_record_detail/contract_edit_info/index'], resolve),
      meta: {
        auth: needAuth,
        title: '合同信息修改申请'
      }
    },
    {
      path: '/personManage',
      name: 'personManage',
      component: resolve => require(['@/components/mine/manage/personManage'], resolve),
      meta: {
        auth: needAuth,
        title: '人员管理'
      }
    },
    {
      path: '/addPerson_byPhone',
      name: 'addPerson_byPhone',
      component: resolve => require(['@/components/mine/manage/addPerson_byPhone'], resolve),
      meta: {
        auth: needAuth,
        title: '添加人员'
      }
    },
    {
      path: '/addPerson_bySelectPosition',
      name: 'addPerson_bySelectPosition',
      component: resolve => require(['@/components/mine/manage/addPerson_bySelectPosition'], resolve),
      meta: {
        auth: needAuth,
        title: '添加人员'
      }
    },
    {
      path: '/addPerson_result',
      name: 'addPerson_result',
      component: resolve => require(['@/components/mine/manage/addPerson_result'], resolve),
      meta: {
        auth: needAuth,
        title: '添加人员'
      }
    },
    {
      path: '/csSelectBrand',
      name: 'customerServiceSelectBrand',
      component: resolve => require(['@/components/Sell/order/customer_service/contract_edit/select_brand'], resolve),
      meta: {
        auth: needAuth,
        title: '选择品牌',
        keepAlive: true
      }
    },
    {
      path: '/csSelectCategory',
      name: 'customerServiceSelectCategory',
      component: resolve => require(['@/components/Sell/order/customer_service/contract_edit/select_category'], resolve),
      meta: {
        auth: needAuth,
        title: '选择品类',
        keepAlive: true
      }
    },
    {
      path: '/uploadVoucher',
      name: 'uploadVoucher',
      component: resolve => require(['@/components/Sell/order/customer_service/contract_edit/voucher'], resolve),
      meta: {
        auth: needAuth,
        title: '上传图片凭证',
        keepAlive: true
      }
    },
    {
      path: '/contractEditInfoDetail',
      name: 'contractEditInfoDetail',
      component: resolve => require(['@/components/Sell/order/customer_service/application_record_detail/contract_edit_info/index'], resolve),
      meta: {
        auth: needAuth,
        title: '合同信息修改申请'
      }
    },
    {
      path: '/shareOrder',
      name: 'share_index',
      component: resolve => require(['@/components/Sell/order/share_order/index'], resolve),
      meta: {
        auth: needAuth,
        title: '订单详情'
      }
    },
    {
      path: '/created_image',
      name: 'created_image',
      component: resolve => require(['@/components/Sell/order/share_order/created_image'], resolve),
      meta: {
        auth: needAuth,
        title: '晒单'
      }
    },
    {
      path: '/operatorFundList',
      name: 'operator_fund_list',
      component: resolve => require(['@/components/mine/operator_funds/operator_fund_list'], resolve),
      meta: {
        auth: needAuth,
        title: '活动运营资金'
      }
    },
    {
      path: '/operatorFundDetail',
      name: 'operator_fund_detail',
      component: resolve => require(['@/components/mine/operator_funds/operator_fund_detail'], resolve),
      meta: {
        auth: needAuth,
        title: '运营资金详情'
      }
    }
  ]
})

router.afterEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

router.beforeEach((to, from, next) => {
  // 在路由全局钩子beforeEach中，根据keepAlive属性，统一设置页面的缓存性
  // 作用是每次进入该组件，就将它缓存
  if (to.meta.keepAlive) {
    store.commit('keepAlive', to.name)
  }
  let indexArr = ['home', 'Mine', 'ChooseProject', 'Commission', 'ProductCategory']
  let find = indexArr.find((item) => {
    return item === from.name
  })
  if ((to.name === 'login' || to.path === '/login') && find) {
    next(false)
    // eslint-disable-next-line
    WeixinJSBridge.invoke('closeWindow', {}, (res) => {})
  } else {
    next()
  }
})

let userId = window.localStorage.getItem('zanPersonId')
let dimension2 = window.localStorage.getItem('dimension2')
let dimension1 = window.localStorage.getItem('dimension1')

Vue.use(VueAnalytics, {
  id: 'UA-106318723-2',
  set: [
    {field: 'userId', value: userId},
    {field: 'dimension2', value: dimension2},
    {field: 'dimension1', value: dimension1}
  ],
  router
})

export default router
