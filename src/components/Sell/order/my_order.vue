<template>
  <div class="MyOrder" v-show="showList">
    <div v-if="orderList.length === 0" class="null_data">
      <div class="null"></div>
      <p>暂无历史订单</p>
    </div>
    <div v-else>
      <div v-infinite-scroll="LoadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="300">
        <div class="bg_img_none" v-for="(item, index) in orderList" :key="index" @click="goToPageOrderDetail(item.orderId)">
          <mt-cell :title="'产品：' + item.orderItemDtos[0].serviceOptionItem.name">
            <span :class="color(item.status)">{{ item.status }}</span>
          </mt-cell>
          <div class="content">
            <mt-cell title="订单编号" :value="item.orderCode"></mt-cell>
            <mt-cell title="品牌品类">
              <span>{{item.orderItemDtos[0].customerDeviceDto.brandName || ''}}</span>
              <span class="m-l5">{{item.orderItemDtos[0].customerDeviceDto.productCategoriesName || ''}}</span>
            </mt-cell>
            <mt-cell title="客户姓名" :value="item.customerDto.customerName"></mt-cell>
            <mt-cell title="订单金额" :value="'￥' + item.paymentDto.payAmount"></mt-cell>
            <mt-cell title="下单时间" :value="item.submitTime"></mt-cell>
            <div v-if="item.status === '已完成' && item.awardStatus && item.awardStatus !== 1">
              <mt-cell title="抽奖结果">
                <span v-if="item.awardStatus === 3">{{item.award}}</span>
                <span v-if="item.awardStatus === 2">未中奖</span>
              </mt-cell>
            </div>
          </div>
          <div v-if="item.status === '未支付'">
            <mt-button type="primary" size="large"
                       @click.stop="goToPageOrderFilling(item.orderId)">去提交
            </mt-button>
          </div>
          <div v-if="item.status === '已支付,待录入' && item.paymentDto.payType === 1" class="btn-width">
            <mt-button type="primary" class="flex cancel" @click.stop="goToCancel(item.orderId)">取消订单</mt-button>
            <span style="width: 10px"></span>
            <mt-button type="primary" class="flex" @click.stop="goToPageOrderFilling(item.orderId)">去录单,领佣金</mt-button>
          </div>
          <div v-else-if="item.status === '已支付,待录入'">
            <mt-button type="primary" size="large" @click.stop="goToPageOrderFilling(item.orderId)">去录单,领佣金</mt-button>
          </div>
          <div v-if="item.status === '已完成'" class="btn-width">
            <mt-button class="flex pd10" v-if="item.awardStatus === 1" type="primary" size="large"
                       @click.stop="goToPageDraw(item.orderId)">去抽奖
            </mt-button>
            <span style="width: 10px" v-if="item.awardStatus === 1 && bonusShow(item.orderBonus.id, item.orderBonus.shareFinishTime, item.orderBonus.queryBonusEventStatus)"></span>
            <mt-button size="normal" class="flex" type="danger"
                       v-if="bonusShow(item.orderBonus.id, item.orderBonus.shareFinishTime, item.orderBonus.queryBonusEventStatus)"
                       @click.stop="createdImage(item.orderId)">24小时内晒单
            </mt-button>
          </div>
        </div>
      </div>
      <div class="load noMore" v-show="noMore">已无更多</div>
      <div class="load" v-show="loading">
        <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
        正在加载
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../../api/index2'
import { loadData, defaultPreHandler, boolPreHandler } from '../../../common/utils'
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
import { MessageBox } from 'mint-ui'
import _ from 'lodash'

const {mapMutations} = createNamespacedHelpers('order')
export default {
  name: 'MyOrder',
  data () {
    return {
      orderList: [],
      page: 1,
      noMore: true,
      loading: false,
      showList: false
    }
  },
  methods: {
    async createdLoadMyOrderList () {
      await this.getList()
      this.showList = true
      window.scrollTo(0, 1)
    },
    ...mapMutations(['removeOrderFilling']),
    color (status) {
      switch (status) {
        case '未支付':
          return 'color_1'
        case '已支付,待录入':
          return 'color_2'
        case '已完成':
          return 'color_0'
        case '待录入':
          return 'color_4'
        default:
          return 'color_3'
      }
    },
    createdImage (orderId) {
      this.$router.push({
        path: '/created_image',
        query: {
          orderId,
          bonusShow: false
        }
      })
    },
    bonusShow (id, time, queryBonusEventStatus) {
      let now = moment().format('YYYY-MM-DD HH:mm:ss')
      let finishTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
      if (id && now < finishTime && queryBonusEventStatus === 2) {
        return true
      }
      return false
    },
    async getList () {
      this.loading = true
      await loadData(() => {
        return api.getOrders(this.page)
      }, async (orderList) => {
        await this.setDraw(orderList)
      }, defaultPreHandler)

      this.loading = false
    },
    async setDraw (orderList) {
      for (let item of orderList) {
        item.submitTime = moment(item.submitTime).format('YYYY-MM-DD HH:mm:ss')
        item.status = this.orderStatusStr(item.orderStatus, item.paymentDto.paymentStatus, item.paymentDto.payType)
        if (item.awardStatus === 3) {
          await loadData(() => {
            return api.getIsDraw(item.orderId)
          }, data => {
            let award = data
            this.$set(item, 'award', award.awardName.slice(0, 16))
          }, defaultPreHandler, true)
        }
      }
      this.orderList.push(...orderList)
      this.noMore = this.orderList.length < (5 * this.page)
    },
    async LoadMore () {
      if (this.noMore) return
      this.loading = true
      this.page += 1
      await loadData(() => {
        return api.getOrders(this.page)
      }, async (data) => {
        let orderList = data
        await loadData(() => {
          this.setDraw(orderList)
        }, null, null, true)
      }, defaultPreHandler, true)
      this.loading = false
    },
    goToPageOrderDetail (orderId) {
      this.$router.push({
        name: 'OrderDetail',
        query: {
          orderId
        }
      })
    },
    goToPagePayList (orderId, paymentId) {
      this.$router.push({
        name: 'PayList',
        query: {
          orderId,
          paymentId
        }
      })
    },
    goToPageOrderFilling (orderId) {
      this.removeOrderFilling()
      this.$router.push({
        name: 'OrderFilling',
        query: {
          orderId
        }
      })
    },
    goToPageDraw (orderId) {
      this.$router.push({
        name: 'Draw',
        query: {
          orderId
        }
      })
    },

    orderStatusStr (orderCode, payCode, payMethod) {
      if (payCode === 30 || orderCode === 100) {
        return '已退款'
      } else if (payCode === 50 || orderCode === 40) {
        return '已取消'
      } else {
        let arr = [orderCode, payCode, payMethod]
        let status = arr.join('')
        switch (status) {
          case '110200':
            return '已完成'
          case '60200':
            return '已完成'
          case '110201':
            return '已完成'
          case '60201':
            return '已完成'
          case '60202':
            return '已完成'
          case '110202':
            return '已完成'
          case '20100':
            return '已支付,待录入'
          case '20202':
            return '已支付,待录入'
          case '20201':
            return '已支付,待录入'
          case '21100':
            return '未支付'
          // case '20102':
          //   return '未支付'
          // case '20101':
          //   return '未支付'
          // case '2010':
          //   return '未支付'
          default:
            return ''
        }
      }
    },
    async goToCancel (orderId) {
      MessageBox.confirm('您确认取消这条订单么？').then(async action => {
        await loadData(() => {
          return api.getOrderCancel(orderId)
        }, res => {
          if (res) {
            let find = _.find(this.orderList, {orderId})
            // find.orderStatus = 40
            find.status = '已取消'
          }
        }, boolPreHandler, true)
      })
    }
  }
}
</script>
<style scoped>
  .m-l5 {
    margin-left: 5px;
  }

  .bg_img_none {
    background: #fff;
    padding-bottom: 5px;
  }

  .pd10 {
    padding: 0 12px;
  }

  .bg_img_none:not(:last-child) {
    margin-bottom: 10px;
  }

  .btn-width {
    padding: 0 15px;
    display: flex;
  }

  .flex {
    flex: 1;
  }

  .content:before {
    content: " ";
    display: block;
    width: calc(100% - 15px);
    margin-left: 15px;
    height: 1px;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    background: #e5e5e5;
  }

  .color_0 {
    color: #26a2ff;
  }

  .color_1 {
    color: #ef4f4f;
  }

  .color_2 {
    color: #ffc107;
  }

  .color_3 {
    color: #888;
  }

  .color_4 {
    color: #e6a23c;
  }

  .cancel {
    background: #888;
  }

  .orderFilling {
    width: 40%;
    display: inline-block;
  }
</style>
