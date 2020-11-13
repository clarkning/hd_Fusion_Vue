<template>
  <div v-if="showVoucherInfo">
    <div v-show="voucherInfo[14]" @click="previewImage(voucherInfo[14])">
      <div class="header">购机凭证图片</div>
      <div class="img">
        <img :src="voucherInfo[14]">
      </div>
    </div>
    <div v-show="voucherInfo[15]" @click="previewImage(voucherInfo[15])">
      <div class="header">产品机编图片</div>
      <div class="img">
        <img :src="voucherInfo[15]">
      </div>
    </div>
    <div v-show="voucherInfo[16]" @click="previewImage(voucherInfo[16])">
      <div class="header">延期凭证图片</div>
      <div class="img">
        <img :src="voucherInfo[16]">
      </div>
    </div>
    <div v-show="voucherInfo[17]" @click="previewImage(voucherInfo[17])">
      <div class="header">延保发票/工单图片</div>
      <div class="img">
        <img :src="voucherInfo[17]">
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import wx from 'weixin-js-sdk'

  export default {
    name: 'voucher',
    props: {
      voucherInfo: {
        type: Object,
        default: () => {
          return {
          }
        }
      }
    },
    methods: {
      previewImage (url) {
        let urls = []
        _.forIn(this.voucherInfo, value => {
          urls.push(value)
        })
        wx.previewImage({
          current: url,
          urls
        })
      }
    },
    computed: {
      showVoucherInfo () {
        return !_.isEmpty(this.voucherInfo)
      }
    }
  }
</script>

<style scoped>

  .img {
    margin-left: 15px;
    width: 28vw;
    height: 28vw;
    box-sizing: border-box;
    background-size: 100%;
    background-repeat: no-repeat;
    border: 1px solid #f4f3f3;
  }
  .img img {
    width: 100%;
    height: 100%;
  }
</style>
