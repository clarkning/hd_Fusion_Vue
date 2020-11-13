<template>
  <div>
    <div class="title">合同信息修改申请</div>
    <div>
      <mt-cell title="提交时间" :value="handleDate(applyInfo.createTime)"></mt-cell>
      <mt-cell title="提交人" :value="applyInfo.contractEditModel.applicantName"></mt-cell>
      <mt-cell title="处理状态" :value="handleInfoStatus(applyInfo.customerServiceStatus)"></mt-cell>
      <mt-cell v-if="applyInfo.contractEditModel.contractEditRejectDescription" title="审核说明" :value="applyInfo.contractEditModel.contractEditRejectDescription"></mt-cell>
    </div>
    <div v-if="applyInfo.customerServiceStatus === customerServiceStatus.受理" class="tips">我们将在3个工作日内完成审核。</div>
    <div v-else-if="applyInfo.customerServiceStatus === customerServiceStatus.失败" class="tips">审核未通过，请重新提交修改信息申请。</div>
    <customer-info :customer-info="customerInfo"></customer-info>
    <device-info :device-info="deviceInfo"></device-info>
    <order-info :order-info="orderInfo"></order-info>
    <voucher-info :voucher-info="voucherInfo"></voucher-info>
  </div>
</template>

<script>
  import {CustomerServiceStatus} from '../../../../../../common/enum/zwsResource'
  import customerInfo from './customer'
  import deviceInfo from './device'
  import orderInfo from './order'
  import voucherInfo from './voucher'
  import moment from 'moment'
  import _ from 'lodash'
  import api from '../../../../../../api/index2'
  import {loadData, defaultPreHandler} from '../../../../../../common/utils'

  export default {
    name: 'contractEditInfo',
    components: {
      customerInfo,
      deviceInfo,
      orderInfo,
      voucherInfo
    },
    data () {
      return {
        applyInfo: {
          contractEditModel: {}
        },
        detail: {},
        customerInfo: {},
        deviceInfo: {},
        orderInfo: {},
        voucherInfo: {},
        customerServiceStatus: CustomerServiceStatus
      }
    },
    async created () {
      await this.loadDetail()
      this.setInfo()
    },
    methods: {
      async loadDetail () {
        await loadData(() => {
          return api.getCustomerServiceDetail(this.$route.query.customerServiceId)
        }, res => {
          this.applyInfo = res
          let data = JSON.parse(res.contractEditModel.requestObject)
          _.forEach(data, item => {
            this.detail[item.Name] = item.NewValue
          })
        }, defaultPreHandler)
      },
      checkBe (obj) {
        if (!(typeof obj === 'object')) {
          return
        }
        for (var key in obj) {
          if (obj.hasOwnProperty(key) &&
          (obj[key] == null || obj[key] === undefined || obj[key] === '')) {
            delete obj[key]
          }
        }
        return obj
      },
      setInfo () {
        let customerInfo = {
          1: this.detail[1],
          2: this.detail[2],
          3: this.detail[3],
          4: this.detail[4],
          5: this.detail[5],
          6: this.detail[6]
        }
        this.customerInfo = this.checkBe(customerInfo)
        let deviceInfo = {
          7: this.detail[7],
          8: this.detail[8],
          9: this.detail[9],
          10: this.detail[10]
        }
        this.deviceInfo = this.checkBe(deviceInfo)
        let orderInfo = {
          11: this.detail[11],
          12: this.detail[12],
          13: this.detail[13]
        }
        this.orderInfo = this.checkBe(orderInfo)
        let voucherInfo = {
          14: this.detail[14],
          15: this.detail[15],
          16: this.detail[16],
          17: this.detail[17]
        }
        this.voucherInfo = this.checkBe(voucherInfo)
      },
      handleDate (date) {
        if (date) {
          return moment(date).format('YYYY-MM-DD')
        } else {
          return ''
        }
      },
      handleInfoStatus (status) {
        switch (status) {
          case CustomerServiceStatus.受理:
            return '待审核'
          case CustomerServiceStatus.完成:
            return '已完成'
          case CustomerServiceStatus.失败:
            return '未通过'
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    background-color: #fff;
    font-size: 18px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }
  >>> .header {
    background-color: transparent;
    color: #888;
    font-size: 14px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }
  .tips {
    background-color: #fff;
    font-size: 14px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }
</style>
