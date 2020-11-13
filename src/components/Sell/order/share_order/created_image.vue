<template>
  <div class="share-image">
    <div id="down" v-if="showDom">
      <orderDetail ref="orderDetail" class="share-image" :orderDetail="orderDetail">
        <div class="qr-style">
          <div id="qrcode" class="qrcode"></div>
        </div>
      </orderDetail>
      <div class="red-packet" v-if="bonusShow === true">
        <div class="padding">
          <p class="title">{{bonusTypes.name}}</p>
          <p class="money">{{bonusTypes.amount}}<i>元</i></p>
          <button class="btn">长按二维码领取</button>
        </div>
      </div>
    </div>
    <img v-if="imgUrl" :src="imgUrl" alt="" width="100%">
    <p v-if="imgUrl && !personName" class="tips">长按图片，分享至微信群</p>
    <div v-if="personName" class="tips fenx-tips">
      <i class="iconfont icon-fenxiang fenx-icon"></i>
      <div>请长按上方图片，将图片发送至群中，<br>并提醒“{{personName}}”领取红包。</div>
    </div>
  </div>
</template>

<script>
  import orderDetail from './order_detail'
  import html2canvas from 'html2canvas'
  import redPacket from './red_packet'
  import {domain} from '../../../../api/config'
  import QRCode from 'qrcodejs2'
  import shareIndex from './index'
  import api from '../../../../api/index2'
  import { loadData, defaultPreHandler } from '../../../../common/utils'

  export default {
    name: 'created_image',
    components: {
      orderDetail, redPacket, shareIndex
    },
    data () {
      return {
        imgUrl: '',
        showDom: true,
        orderId: this.$route.query.orderId,
        bonusId: null,
        qrUrl: `${domain}/#/shareOrder?orderId=${this.$route.query.orderId}`,
        orderDetail: {
          personName: '',
          orderCode: null,
          payAmount: null,
          hideSurname: false,
          hiddenBrandIds: null,
          title: null,
          brandName: null,
          productCategoriesName: null,
          releaseTime: null,
          monthlyOrderSort: null,
          monthlyCumulativeAmount: null,
          shareTime: null,
          shareFinishTime: null
        },
        bonusTypes: {
          name: '',
          amount: null
        },
        bonusShow: this.$route.query.bonusShow,
        personName: this.$route.query.personName
      }
    },
    async created () {
      await this.getOrderDetail()
      await this.getBonus()
    },
    methods: {
      creatQrCode () {
        let ele = document.getElementById('qrcode')
        let qrCode = new QRCode(ele, {
          width: 110,
          height: 110,
          text: this.qrUrl,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      },
      clickGeneratePicture () {
        let element = document.getElementById('down')
        html2canvas(element, {
          backgroundColor: null,
          useCORS: true,
          logging: false,
          scale: 3
        }).then((canvas) => {
          this.showDom = false
          this.imgUrl = canvas.toDataURL('image/png', 1.0)
        })
      },
      async getBonus () {
        await loadData(() => {
          return api.getBonus(this.bonusId)
        }, (data) => {
          this.orderDetail.releaseTime = data.releaseTime
          this.orderDetail.monthlyOrderSort = data.monthlyOrderSort
          this.orderDetail.monthlyCumulativeAmount = data.monthlyCumulativeAmount
          this.orderDetail.shareTime = data.shareTime
          this.orderDetail.lastOrderFinishTime = data.lastOrderFinishTime
          this.orderDetail.personName = data.bonusReceiverPerson.name
          this.orderDetail.hideSurname = data.hideSurname
          this.orderDetail.hiddenBrandIds = data.hiddenBrandIds
          this.personId = data.bonusReceiverPerson.id
          this.orderDetail.title = data.project.name
          this.$set(this.bonusTypes, 'name', data.bonusType.name)
          this.$set(this.bonusTypes, 'amount', data.bonusType.amount)
        }, defaultPreHandler)
        // 生成二维码
        this.creatQrCode()
        // 生成图片
        this.clickGeneratePicture()
      },
      async getOrderDetail () {
        await loadData(() => {
          return api.getOrderDetail(this.orderId)
        }, (data) => {
          this.bonusId = data.orderBonus.id
          this.orderDetail.orderCode = data.orderCode
          this.orderDetail.finishTime = data.finishTime
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

  #down {
    padding: 10px;
    background: #FDFBEC;
  }

  .red-packet {
    margin: 0 15px;
    background-image: linear-gradient(to bottom, #F1464C, #F3002A);
    color: #fff;
    border-radius: 10px;
    text-align: center;
    display: block;
    overflow: hidden;
  }

  .title {
    font-size: 26px;
    margin-top: 25px;
    padding: 0 10px;
  }

  .money {
    font-size: 48px;
    margin:15px 0 0;
  }

  .money i {
    font-size: 20px;
    font-style: normal;
  }
  .tips{
    text-align: center;
    padding: 15px;
    color: #999;
  }
  .btn {
    background: #F9D81A;
    border-radius: 20px;
    border: none;
    height: 35px;
    font-size: 16px;
    width: 60%;
    margin: 20px auto;
    color: #333;
  }
  .qr-style{
    float: right;
  }
  .fenx-icon{
    font-size: 38px;
    margin-right: 10px;
  }
  .fenx-tips{
    display: flex;
    width: 100%;
    justify-content: center;
    margin: auto;
  }
</style>
