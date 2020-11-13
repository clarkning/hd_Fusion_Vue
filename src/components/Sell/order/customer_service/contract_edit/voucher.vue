<template>
  <div v-if="voucherInfo.length > 0">
    <div class="content">
      <div v-for="(item, index) in voucherInfo" :key="index" class="box">
        <div class="header required">{{item.title}}</div>
        <div v-if="item.tips" class="tips">{{item.tips}}</div>
        <div class="img" @click="chooseImage(index)">
          <img v-show="item.newValue" :src="item.src">
        </div>
      </div>
    </div>
    <mt-button class="btn" type="primary" size="large" @click="submit">提交修改申请</mt-button>
  </div>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
import wechatlib from 'weixin-js-sdk'
import { Indicator, MessageBox, Toast } from 'mint-ui'
import api from '../../../../../api/index2'
import { loadData, defaultPreHandler } from '../../../../../common/utils'
import { createNamespacedHelpers } from 'vuex'
import { CustomerServiceType } from '../../../../../common/enum/zwsResource'

const {mapState, mapMutations} = createNamespacedHelpers('customerService')

export default {
  name: 'uploadVoucher',
  data () {
    return {
      purchaseTime: 0, // 购机日期未修改
      voucherInfo: []
    }
  },
  activated () {
    this.voucherInfo = []
    if (!this.storeChangeContractInfo || this.storeChangeContractInfo.length === 0) {
      this.$router.go(-1)
    } else {
      this.timeCompare()
      this.add14()
      this.add15()
      this.add16()
      this.add17()
      if (this.voucherInfo.length === 0) {
        this.submit()
      }
    }
  },
  mounted () {
    this.config()
  },
  methods: {
    ...mapMutations(['setSubmitCustomerService']),
    async config () {
      let url = location.href.split('#')[0]
      await this.$initWxConfig(url, ['chooseImage', 'getLocalImgData', 'uploadImage'])
    },
    chooseImage (index) {
      let vue = this
      wechatlib.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success: async function (res) {
          vue.$set(vue.voucherInfo[index], 'src', res.localIds[0])
          vue.uploadImage(index, res.localIds[0])
        },
        fail: function () {
        },
        cancel: function () {
        }
      })
    },
    toast (msg) {
      Toast({
        message: msg,
        position: 'middle',
        duration: 2000
      })
    },
    indicator (message) {
      Indicator.open({
        text: message,
        spinnerType: 'fading-circle'
      })
    },
    getLocalImageDate (index, localID) {
      let vue = this
      wechatlib.getLocalImgData({
        localId: localID,
        success: function (res) {
          let localData = res.localData
          vue.$set(vue.voucherInfo[index], 'src', localData)
        }
      })
    },
    uploadImage (index, localId) {
      let vue = this
      vue.indicator('上传中')
      wechatlib.uploadImage({
        localId: localId,
        isShowProgressTips: 0,
        success: async function (res) {
          await loadData(() => {
            return api.getImage(res.serverId, 20)
          }, (image) => {
            vue.$set(vue.voucherInfo[index], 'newValue', image.fileUrl)
          }, defaultPreHandler, true)
          let u = navigator.userAgent
          let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          if (isIOS) {
            vue.getLocalImageDate(index, localId)
          }
          Indicator.close()
        },
        fail: function () {
          Indicator.close()
          this.toast('图片上传失败，请重试')
        }
      })
    },
    timeCompare (params = this.storeChangeContractInfo) {
      let purchaseTime = _.find(params, item => {
        return item.name === '13'
      })
      if (purchaseTime) {
        let newValue = moment(purchaseTime.newValue).unix()
        if (purchaseTime.oldValue) {
          let oldValue = moment(purchaseTime.oldValue).unix()
          if (newValue < oldValue) {
            this.purchaseTime = 1 // 购机日期 新日期小于原日期
          } else {
            this.purchaseTime = 2 // 购机日期 新日期大于原日期
          }
        } else {
          this.purchaseTime = 1 // 之前没有购机日期
        }
      }
    },
    // 添加购机凭证图片
    add14 (params = this.storeChangeContractInfo) {
      let param = {
        name: '14',
        title: '购机凭证图片',
        tips: '购机发票、购机订单或其他凭证图片',
        newValue: ''
      }
      if (this.purchaseTime === 1) {
        this.voucherInfo.push(param)
      } else {
        let devicePurchaseCertificateImage = _.find(params, item => {
          return item.name === '7' || item.name === '8' || item.name === '9' || item.name === '12'
        })
        if (devicePurchaseCertificateImage) {
          this.voucherInfo.push(param)
        }
      }
    },
    // 产品机编图片
    add15 (params = this.storeChangeContractInfo) {
      let devicePurchaseCertificateImage = _.find(params, item => {
        return item.name === '10'
      })
      if (devicePurchaseCertificateImage) {
        this.voucherInfo.push({
          name: '15',
          title: '产品机编图片',
          newValue: ''
        })
      }
    },
    // 延期凭证图片
    add16 () {
      if (this.purchaseTime === 2) {
        this.voucherInfo.push({
          name: '16',
          title: '延期凭证图片',
          tips: '提货单、安装单或换货凭证',
          newValue: ''
        })
      }
    },
    // 延保发票/工单图片
    add17 (params = this.storeChangeContractInfo) {
      let devicePurchaseCertificateImage = _.find(params, item => {
        return item.name === '11'
      })
      if (devicePurchaseCertificateImage) {
        this.voucherInfo.push({
          name: '17',
          title: '延保发票/工单图片',
          newValue: ''
        })
      }
    },
    async setParams () {
      await this.$store.dispatch('getPersonInfo', this.$store.state.person.personId)
      let arr = _.cloneDeep([...this.storeChangeContractInfo, ...this.voucherInfo])
      let requestObject = []
      _.forEach(arr, item => {
        requestObject.push({
          Name: item.name,
          NewValue: item.newValue,
          OldValue: item.oldValue
        })
      })
      return {
        personId: this.$store.state.person.personId,
        agentId: window.localStorage.getItem('agentId') || 1000034,
        customerService: {
          requestObject: JSON.stringify(requestObject),
          applicantName: this.$store.state.person.name,
          customerServiceTypes: [CustomerServiceType.信息变更]
        }
      }
    },
    validate () {
      let msg = ''
      _.forEach(this.voucherInfo, item => {
        if (!item.newValue) {
          msg = `${item.title}不能为空，请填写后重新提交。`
        }
      })
      return msg
    },
    showErrors (message) {
      MessageBox({
        title: '',
        message,
        confirmText: '确认'
      })
    },
    async submit () {
      let msg = this.validate()
      if (msg) {
        this.showErrors(msg)
      } else {
        let params = await this.setParams()
        await loadData(() => {
          return api.postCustomerService(this.$route.query.serviceContractId, params)
        }, data => {
          if (data) {
            this.setSubmitCustomerService(data.customerServiceResults)
            this.$router.replace({
              name: 'submitComplete'
            })
          }
        }, defaultPreHandler)
      }
    }
  },
  computed: {
    ...mapState({
      storeChangeContractInfo: state => state.changeContractInfo
    })
  }
}
</script>


<style scoped>
  .content {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }

  .required::before {
    content: '*';
    font-size: 14px;
    color: red;
    margin-right: 3px;
  }

  .box {
    background: #fff;
    padding: 10px 0;
  }

  .header {
    background-color: transparent;
    color: #000;
    font-size: 14px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }

  .tips {
    background-color: transparent;
    color: #888;
    font-size: 14px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }

  .img {
    margin-left: 15px;
    width: 28vw;
    height: 28vw;
    box-sizing: border-box;
    background: url('/static/img-bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    border: 1px solid #f4f3f3;
  }

  .img img {
    width: 100%;
    height: 100%;
  }

  .btn {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>
