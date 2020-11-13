<template>
  <div>
    <div class="item_p" @click="goToPageSellProduct(servicePackId)">
      <div class="item_img item_img72"><img :src="logo"></div>
      <div class="item_content">
        <p class="">{{title}}</p>
        <p class="item_over item_font12 item_color" v-html="summary"></p>
        <button class="item_button item_font12 item_color" @click.stop="showPrice(servicePackId)">产品价格</button>
      </div>
      <div class="item_link"></div>
    </div>
    <mt-popup v-model="serviceOptionItems.visiblePopup" position="bottom" :closeOnClickModal="false">
      <div class="popup_title">
        <div class="popup_title_content">服务价目表</div>
        <div class="popup_title_x" @click="hidePopup()">x</div>
      </div>
      <div class="popup_content">
        <div class="item_container" v-for="item in serviceOptionItems.serviceOptionItemsList">
          <div class="item_p">
            <div class="item_img item_img62"><img :src="item.imageUrl"></div>
            <div class="item_content">
              <p class="item_over popup_color3">{{item.name}}</p>
              <p class="popup_color8">累计销售 {{item.sale}} 份</p>
            </div>
            <div class="item_price">{{item.unitPrice}} 元</div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>

</template>
<script>
  import api from '../../api/index2'
  import {loadData, defaultPreHandler} from '../../common/utils'
  import _ from 'lodash'

  export default {
    props: {
      logo: String,
      title: String,
      summary: String,
      servicePackId: Number,
      visible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        serviceOptionItems: {
          visiblePopup: this.visible,
          serviceOptionItemsList: []
        }
      }
    },
    methods: {
      hidePopup () {
        this.serviceOptionItems.visiblePopup = false
      },
      async showPrice (servicePackId) {
        await loadData(() => {
          return api.getServiceOptionItems({servicePackId})
        }, (data) => {
          _.forEach(data, (item) => {
            if (item.salesTimes === 0) {
              item.salesTimes = 1
            }
            let sale = item.salesBaseValue + (item.salesCount * item.salesTimes)
            item.sale = _.padStart(sale.toString(), 6, '0')
          })
          this.serviceOptionItems.serviceOptionItemsList = data
          this.serviceOptionItems.visiblePopup = true
        }, defaultPreHandler)
      },
      goToPageSellProduct (servicePackId) {
        this.$emit('goToPageSellProduct', servicePackId)
      }

    },
    watch: {
      'serviceOptionItems.visiblePopup': function (v) {
        this.$emit('child-say', v)
      },
      'visible': function (v) {
        if (!v) {
          this.serviceOptionItems.visiblePopup = v
        }
      }
    }
  }
</script>
<style scoped>
  .item_container {
    background: #fff;
    font-size: 14px;
  }

  .item_container:not(:last-child)::after {
    content: " ";
    display: block;
    width: calc(100% - 15px);
    margin-left: 15px;
    height: 1px;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    background: #e5e5e5;
  }

  .item_p {
    padding: 10px 15px;
    display: table;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
  }

  .item_color {
    color: #888;
  }

  .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
  }

  .item_img72 {
    width: 72px;
    height: 72px;
  }

  .item_img img {
    width: 100%;
    height: 100%;
  }

  .item_price {
    display: table-cell;
    vertical-align: middle;
    text-align: right;
    width: 25%;
  }

  .item_content {
    line-height: 1.8;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
  }

  .item_over {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item_button {
    background: #fff;
    padding: 2px 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
  }

  .item_link {
    display: table-cell;
    position: relative;
    width: 25px;
  }

  .item_link::after {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 50%;
    position: absolute;
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(45deg);
  }

  .item_font12 {
    font-size: 12px;
  }

  .item_p {
    padding: 10px 15px;
    display: table;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
  }

  .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
  }

  .item_img62 {
    width: 62px;
    height: 62px;
  }

  .item_img img {
    width: 100%;
    height: 100%;
  }

  .popup_title {
    font-size: 14px;
    color: #333;
    width: 100%;
    height: 50px;
    border: 1px solid #f4f3f3;
    display: table;
    box-sizing: border-box;
    table-layout: auto;
    position: relative;
  }

  .popup_title_content {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-size: 16px;
  }

  .popup_title_x {
    position: absolute;
    top: 14px;
    right: 20px;
  }

  .popup_content {
    overflow-y: scroll;
    height: calc(100% - 50px);
  }

  .popup_color3 {
    color: #333;
  }

  .popup_color8 {
    color: #888;
  }
</style>

