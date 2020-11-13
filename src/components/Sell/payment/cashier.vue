<template>
  <div class="Cashier">
    <div class="item_container_top">
      <div class="item_p">
        <div class="item_img"><img :src="imageUrl"></div>
        <div class="item_content">
          <p class="item_over popup_color3 font-size16">{{name}}</p>
        </div>
      </div>
    </div>
    <div class="bg_img_none mt-10">
      <mt-cell title="产品价格">
        <span class="pay-amount">￥{{payAmount}} 元</span>
      </mt-cell>
    </div>
    <p class="title">收银台支付</p>
    <div id="CashierPay" class="bg_img_none">
      <mt-field placeholder="请输入发票号(或流水号/提单号)" type="text" v-model="param.no"></mt-field>
    </div>

    <div @touchstart="btnStartStyle()" @touchend="btnEndStyle()" class="button m_t60" @click="goToPageOrderFilling()">
      <mt-button size="large" type="primary"><span class="space">确定</span></mt-button>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index2'
  import { loadData, defaultPreHandler } from '../../../common/utils'
  import { MessageBox } from 'mint-ui'

  export default {
    name: 'Cashier',
    data () {
      return {
        pushName: this.$route.meta.pushName,
        orderCode: '',
        payAmount: '',
        imageUrl: '',
        name: '',
        param: {
          orderId: null,
          paymentId: null,
          no: null
        }
      }
    },
    async created () {
      this.param.orderId = this.$route.query.orderId
      await this.getData()
    },
    methods: {
      btnStartStyle () {
        let eve = window.event
        eve.target.style.background = '#265C98'
        eve.target.style.color = '#6B8D9B'
      },
      btnEndStyle () {
        let eve = window.event
        eve.target.style.background = '#3396E4'
        eve.target.style.color = '#fff'
      },
      async goToPageOrderFilling () {
        let re = /^([A-Za-z0-9]{6,20})$/
        if (re.test(this.param.no)) {
          await loadData(() => {
            return api.cashier_pay(this.param)
          }, (response) => {
            if (response.isOk) {
              window.history.pushState({}, 'title', '#/login')
              window.history.pushState({}, 'title', '#/MyOrder')
              this.$router.push({
                name: this.pushName,
                query: {
                  orderId: this.param.orderId
                }
              })
            } else {
              MessageBox({
                title: '提示',
                message: response.message
              })
            }
          }, null)
        } else {
          MessageBox({
            title: '提示',
            message: '请输入6到20位发票号(或流水号/提单号)'
          })
        }
      },
      async getData () {
        await loadData(() => {
          return api.getOrderDetail(this.param.orderId)
        }, (data) => {
          this.payAmount = data.paymentDto.payAmount
          this.imageUrl = data.orderItemDtos[0].servicePackDto.fileUrl
          this.name = data.orderItemDtos[0].serviceOptionItem.name
          this.param.paymentId = data.paymentDto.id
        }, defaultPreHandler)
      }
    }
  }
</script>
<style scoped>
  .item_container_top{
    background: #fff;
  }
  .item_container_top .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
    width: 60px;
    height: 60px;
  }

  .item_container_top .item_img img {
    width: 100%;
    height: 100%;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .item_container_top .item_p {
    padding: 10px 15px;
    display: table;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
  }
  .m_r5 {
    margin-right: 5px;
  }

  .color {
    color: #f44336;
  }
  .pay-amount {
    font-size: 18px;
    color: #FE633F;
  }
  .item_content {
    line-height: 1.8;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
    width: 80%;
  }
  .bg_img_none {
    border-top: 1px solid #f4f3f3;
    border-bottom: 1px solid #f4f3f3;
  }

  .title {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .button {
    width: 90%;
    margin: auto;
  }

  .space {
    letter-spacing: 10px;
  }

  .m_t15 {
    margin-top: 15px;
  }

  .m_t60 {
    margin-top: 60px;
  }

  .tip {
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.8;
    margin: 2% auto;
    background: #ffffff;
    width: 90%;
    padding: 2%;
    color: #888;
    border-radius: 4px;
  }
</style>
