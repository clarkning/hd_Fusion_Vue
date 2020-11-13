<template>
  <div class="coupon_item">
    <div class="coupon flex">
      <div class="coupon_left">￥{{couponParValue}}</div>
      <div class="coupon_right" :class="{ service_terms_visible: serviceTerms.visible}">
        <div class="coupon_name">{{couponItemData.name}}</div>
        <div class="flex content">
          <div class="coupon_time">下单立送，{{couponItemData.period}}月有效</div>
        </div>
        <div class="explain_border">
          <div class="explain flex"  @click.stop="clickServiceTermsHandler">
            <span>详细信息</span>
            <span class="visible">
              <i v-if="serviceTerms.visible" class="iconfont mint-cell-allow-right icon-size icon_arrow icon_arrow_top"></i>
              <i v-else class="iconfont mint-cell-allow-right icon-size icon_arrow"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="service_terms" :class="{ service_terms_show: serviceTerms.visible}">
      <div class="service_terms_content">
        <span v-if="serviceTerms.content" v-html="serviceTerms.content"></span>
        <span v-else>暂无信息</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../api/fusion_api'
import {loadData, defaultPreHandler} from '../../../../common/utils'

export default {
  name: 'coupon_item',
  props: {
    couponItemData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      serviceTerms: {
        visible: false,
        content: ''
      }
    }
  },
  methods: {
    async clickServiceTermsHandler () {
      if (!this.serviceTerms.content && !this.serviceTerms.visible) {
        this.loadServiceTermsContent()
      }

      this.serviceTerms.visible = !this.serviceTerms.visible
    },
    async loadServiceTermsContent () {
      await loadData(() => {
        return api.serviceProduct.getLicenceById(this.couponItemData.licenceId)
      }, (data) => {
        this.serviceTerms.content = data
      }, defaultPreHandler)
    }
  },
  computed: {
    couponParValue () {
      return this.couponItemData.parValue || '0.00'
    }
  }
}
</script>

<style scoped >
  * {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
  .icon-size{
    color:#fff;
    font-size: 12px;
  }
  .icon_arrow::after {
    right: 50%;
    border-color: #fff;
    transition: .5s;
    transform: translate(40%, -50%) rotate(135deg);
  }
  .icon_arrow_top::after {
    transform: translate(40%, -30%) rotate(-45deg);
  }
  .service_terms{
    max-height: 0;
    word-break: break-all;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    font-size: 12px;
    transition: max-height .35s;
  }
  .service_terms_content {
    padding: 10px 12px 15px;
  }
  .flex{
    display: flex;
  }
  .visible{
    display: inline-block;
    background: #d9d9d9;
    border-radius:10px;
    width: 15px;
    text-align: center;
    height: 15px;
  }
  .coupon_name{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .coupon_time {
    color: rgba(0,0,0,.3);
  }
  .explain_border{
    border-top:1px dotted #d9d9d9;
    margin: 0 -10px;
  }
  .explain{
    margin:5px 10px;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
  .coupon_item{
    min-height: 100px;
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    border:1px solid #d9d9d9;
  }
  .coupon_left{
    width: 105px;
    min-height: 100px;
    background: #F56C6C;
    color:#fff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    line-height: 100px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    position: relative;
  }
  .coupon_left::after{
    content: '赠品';
    position: absolute;
    background: #F2B86F;
    top: 0;
    left: 0;
    font-size: 12px;
    width: 50px;
    height: 20px;
    color:#6F3933;
    line-height: 20px;
    border-radius: 5px;
  }
  .content{
    justify-content: space-between;
    font-size: 12px;
    margin: 5px 0;
  }
  .coupon_right{
    position: relative;
    padding:5px 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .coupon_right:after {
    content: '';
    height: 0;
    display: block;
    border-top: solid 1px transparent;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transform: scaleY(.5);
  }
  .service_terms_show {
    max-height: 100px;
  }
  .service_terms_visible.coupon_right:after {
    border-top-color: #e5e5e5;
  }
</style>
