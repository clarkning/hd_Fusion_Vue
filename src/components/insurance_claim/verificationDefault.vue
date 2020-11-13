<template>
  <div class="contract_inquiry verification_default">
    <div class="top">
      <mt-cell><span slot="title" class="title default_title">{{detail.sku}}</span></mt-cell>
      <mt-cell title="合同号">
        <!--<span class="bold" :class="[detail.enabled === true ? 'green' : 'red']">({{status(detail.enabled)}})</span>-->
        <span>{{detail.contractCode}}</span>
      </mt-cell>
      <mt-cell title="客户信息">
        <span>{{detail.name}} - {{detail.phone}}</span>
      </mt-cell>
      <mt-cell title="品类" :value="detail.productCategoryName"></mt-cell>
      <mt-cell title="品牌" :value="detail.brand"></mt-cell>
      <mt-cell title="型号" :value="detail.model"></mt-cell>
      <mt-cell title="机器编码" :value="detail.serialNumber"></mt-cell>
      <!--<mt-cell title="有效期"><span>{{detail.slice(0, 10)}} ~ {{detail.expireTime.slice(0, 10)}}</span></mt-cell>-->
      <mt-cell title="核销时间" :value="formatDate(detail.lastUpdate)"></mt-cell>
      <mt-cell title="核销工程师" :value="detail.operator"></mt-cell>
    </div>
    <div class="machine">
      <div class="pic" v-for="(item, index) in imageList" v-show="detail.imageUrls[index]">
        <p class="title">{{item.title || ''}}</p>
        <div class="img" @click="previewImage(detail.imageUrls[index])">
          <img :src="detail.imageUrls[index]">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import wechatlib from 'weixin-js-sdk'
import { Indicator, Toast } from 'mint-ui'
import { mapActions } from 'vuex'
import _ from 'lodash'
// import {loadData, defaultPreHandler, boolPreHandler} from '../../common/utils'
// import api from '../../api/index2'
import moment from 'moment'

export default {
  name: 'verificationDefault',
  data () {
    return {
      imageList: [],
      detail: {},
      searchValue: null,
      orderId: null,
      disabled: false
    }
  },
  created () {
    this.getDetail()
  },
  async mounted () {
    // await this.config()
  },
  methods: {
    ...mapActions(['getContractList']),
    async getDetail () {
      this.detail = this.$route.params.data
      _.forEach(this.detail.imageUrls, (item, index) => {
        if (index === 0) {
          this.imageList.push(
            {
              title: '机器编码图片',
              src: '',
              serviceId: null,
              imageId: null
            })
        } else if (index === 1) {
          this.imageList.push(
            {
              title: '使用环境照片',
              src: '',
              serviceId: null,
              imageId: null
            })
        } else if (index === 2) {
          this.imageList.push(
            {
              title: '故障备件照片',
              src: '',
              serviceId: null,
              imageId: null
            })
        } else {
          this.imageList.push(
            {
              title: '',
              src: '',
              serviceId: null,
              imageId: null
            })
        }
      })
    },
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD HH:mm')
    },
    previewImage (url) {
      let vue = this
      wechatlib.previewImage({
        current: url,
        urls: vue.detail.imageUrls
      })
    },
    indicator (message) {
      Indicator.open({
        text: message,
        spinnerType: 'fading-circle'
      })
    },
    toast (message) {
      Toast({
        message,
        position: 'middle',
        duration: 2000
      })
    }
  },
  computed: {}
}
</script>

<style scoped>
  .pic {
    text-align: center;
  }

  .pic .title {
    font-size: 12px;
    padding: 10px 0;
    color: #888;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .pic .img {
    width: 100%;
    box-sizing: border-box;
    height: 70vw;
  }

  .pic .img img {
    width: 70vw;
    height: 100%
  }

  .top {
    background: #fff;
    padding-bottom: 2px;
  }

  .default_title {
    font-weight: bold;
    font-size: 14px;
    display: inline-block;
    margin: 13px;
  }

  .title {
    line-height: 1.5;
  }

  /*.bold{*/
  /*font-weight: bold;*/
  /*}*/
  .machine {
    padding-bottom: 30px;
    background: #ffffff
  }

</style>

