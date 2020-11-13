<template>
  <div class="scan">
    <div class="qrCode">
      <h3 class="title">录单成功</h3>
      <p>请用户微信扫描下方二维码，绑定手机即刻领取电子合同凭证。</p>
      <div class="img">
        <img :src="qrCode"/>
      </div>
    </div>
    <div class="mt_15 btn-width" >
      <mt-button size="normal" class="flex" type="danger" v-if="shareBtn" @click="createdImage(orderId)">24小时内晒单</mt-button>
      <span style="width: 10px" v-if="shareBtn && isDraw"></span>
      <mt-button size="normal" class="flex" @click="goToPageDraw(orderId)" v-if="isDraw" type="primary">抽奖</mt-button>
    </div>
    <div class="mt_15 btn-width">
      <router-link class="popup_title_x flex" :to="{ name: pushName}">
        <mt-button size="large" type="primary">完成</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import api from '../../api/index2'
import {loadData, defaultPreHandler} from '../../common/utils'
import moment from 'moment'
export default {
  name: 'Scan',
  data () {
    return {
      shareBtn: false,
      pushName: this.$route.meta.pushName,
      qrCode: null,
      orderId: null,
      isDraw: false,
      partnerId: null,
      bonusId: false,
      shareFinishTime: '',
      queryBonusEventStatus: null
    }
  },
  async created () {
    this.orderId = this.$route.query.orderId
    await this.getOrderDetail(this.orderId)
  },
  beforeRouteLeave (to, from, next) {
    window.history.pushState({}, 'title', '#/login')
    if (to.name === 'Draw') {
      window.history.pushState({}, 'title', '#/MyOrder')
      next()
    } else if (to.name !== 'Draw' && to.name !== 'MyOrder' && to.name !== 'created_image') {
      next('/MyOrder')
    } else {
      next()
    }
  },
  methods: {
    createdImage (orderId) {
      this.$router.push({
        path: '/created_image',
        query: {
          orderId,
          bonusShow: false
        }
      })
    },
    bonusShowBtn (id, time, queryBonusEventStatus) {
      let now = moment().format('YYYY-MM-DD HH:mm:ss')
      let finishTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
      if ((id && now < finishTime) && queryBonusEventStatus === 2) {
        this.shareBtn = true
      } else {
        this.shareBtn = false
      }
    },
    async getQrCode () {
      await loadData(() => {
        return api.getPartner(this.partnerId)
      }, scan => {
        this.qrCode = scan.qrCode
      }, defaultPreHandler, true)
    },
    async getOrderDetail (orderId) {
      await loadData(
        () => {
          return api.getOrderDetail(orderId)
        },
        async (orderDetail) => {
          this.partnerId = orderDetail.partnerId
          this.isDraw = orderDetail.awardStatus === 1
          this.bonusId = orderDetail.orderBonus.id
          this.shareFinishTime = orderDetail.orderBonus.shareFinishTime
          this.queryBonusEventStatus = orderDetail.orderBonus.queryBonusEventStatus
          this.bonusShowBtn(this.bonusId, this.shareFinishTime, this.queryBonusEventStatus)
          await this.getQrCode()
        }, defaultPreHandler)
    },
    goToPageDraw (orderId) {
      this.$router.push({
        name: 'Draw',
        query: {
          orderId
        }
      })
    }
  }
}
</script>
<style scoped>
  .scan {
    background: #fff;
    position: absolute;
    top: 0;
    height: 100vh;
  }

  .btn-width {
    padding: 0 15px;
    margin: auto;
    display: flex;
  }

  .mt_15 {
    margin-top: 15px;
  }
  .flex{
    flex: 1;
  }
  .qrCode {
    background: #fff;
  }

  .qrCode p {
    color: #888;
    font-size: 14px;
    line-height: 1.5rem;
    padding: 15px 15px 0;
    text-indent: 28px;
  }

  .qrCode .img {
    width: 50%;
    margin: auto;
    padding: 10px 0;
  }

  .qrCode .img img {
    width: 100%;
    text-align: center;
  }

  .popup_title_x {
    text-decoration: none;
  }

  .title {
    width: 100%;
    text-align: center;
    margin-top: 40px;
  }
</style>
