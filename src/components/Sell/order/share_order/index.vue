<template>
  <div>
    <orderDetail :orderDetail="orderDetail"></orderDetail>
    <redPacket class="page" :redPacket="redPacket" :personName="orderDetail.personName" @success="initData"></redPacket>
  </div>
</template>

<script>
import orderDetail from './order_detail'
import redPacket from './red_packet'
import {PersonInfo} from 'enum/enums'
import api from '../../../../api/index2'
import _ from 'lodash'
import { loadData, defaultPreHandler } from '../../../../common/utils'

export default {
  name: 'share_index',
  components: {orderDetail, redPacket},
  data () {
    return {
      orderId: this.$route.query.orderId,
      bonusId: null,
      personId: null,
      bonusDetail: {},
      orderDetail: {
        personName: '',
        orderCode: null,
        payAmount: null,
        title: null,
        hideSurname: false,
        hiddenBrandIds: null,
        brandName: null,
        productCategoriesName: null,
        releaseTime: null,
        monthlyOrderSort: null,
        monthlyCumulativeAmount: null,
        shareTime: null,
        shareFinishTime: null
      },
      redPacket: {
        status: null,
        personInfo: null
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      await this.getOrderDetail()
      await this.getBonus()
    },
    async getBonus () {
      let currentPersonId = Number(this.$store.state.person.personId)
      await loadData(() => {
        return api.getBonus(this.bonusId)
      }, (data) => {
        this.orderDetail.releaseTime = data.releaseTime
        this.orderDetail.monthlyOrderSort = data.monthlyOrderSort
        this.orderDetail.monthlyCumulativeAmount = data.monthlyCumulativeAmount
        this.orderDetail.shareTime = data.shareTime
        this.orderDetail.personName = data.bonusReceiverPerson.name
        this.personId = data.bonusReceiverPerson.id
        this.orderDetail.lastOrderFinishTime = data.lastOrderFinishTime
        this.orderDetail.title = data.project.name
        this.orderDetail.hideSurname = data.hideSurname
        this.orderDetail.hiddenBrandIds = data.hiddenBrandIds
        this.redPacket.bonusType = data.bonusType
        this.redPacket.shareFinishTime = data.shareFinishTime
        this.redPacket.receiveFinishTime = data.receiveFinishTime
        this.redPacket.projectId = data.project.id
        this.redPacket.partnerId = data.partner.id
        this.redPacket.status = data.status
        this.redPacket.boundEventId = data.boundEventId
        this.redPacket.releaseTime = data.releaseTime
        let personIds = _.pull(data.releaseableBonusOperatorPersonIds, this.personId)
        if (this.personId === currentPersonId) {
          this.redPacket.personInfo = PersonInfo.销售员
        } else if (data.bonusOperatorPersonId === currentPersonId) {
          this.redPacket.personInfo = PersonInfo.已对订单发红包
        } else if (personIds.includes(currentPersonId)) {
          this.redPacket.personInfo = PersonInfo.有发红包权限
        } else {
          this.redPacket.personInfo = PersonInfo.其他人
        }
      }, defaultPreHandler)
    },
    async getOrderDetail () {
      this.redPacket.orderId = this.orderId
      await loadData(() => {
        return api.getOrderDetail(this.orderId)
      }, (data) => {
        this.bonusId = data.orderBonus.id
        this.redPacket.bonusId = this.bonusId
        this.orderDetail.orderCode = data.orderCode
        this.orderDetail.finishTime = data.finishTime
        this.redPacket.finishTime = data.finishTime
        this.orderDetail.payAmount = data.paymentDto.payAmount
        this.orderDetail.brandName = data.orderItemDtos[0].customerDeviceDto.brandName
        this.orderDetail.brandId = data.orderItemDtos[0].customerDeviceDto.brandId
        this.orderDetail.productCategoriesName = data.orderItemDtos[0].customerDeviceDto.productCategoriesName
      }, defaultPreHandler)
    }
  }
}
</script>

<style scoped>

</style>
