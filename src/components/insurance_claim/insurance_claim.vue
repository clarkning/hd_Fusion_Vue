<template>
  <div class="contract_inquiry">
    <div class="top">
      <mt-cell><span slot="title" class="title">{{detail.skuName}}</span></mt-cell>
      <mt-cell title="合同号">
        <span>{{detail.contractCode}} <span class="bold" :class="[detail.enabled === true ? 'green' : 'red']">({{status(detail.enabled)}})</span></span>
      </mt-cell>
      <mt-cell title="客户信息">
        <span>{{detail.customer.name}} - {{detail.customer.phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')}}</span>
      </mt-cell>
      <mt-cell title="品类" :value="detail.device.productCategoryName"></mt-cell>
      <mt-cell title="品牌" :value="detail.device.brand"></mt-cell>
      <mt-cell title="型号" :value="detail.device.model"></mt-cell>
      <mt-cell title="机器编码" :value="detail.device.serialNumber"></mt-cell>
      <mt-cell title="有效期"><span>{{detail.effectTime.slice(0, 10)}} ~ {{momentTime(detail.expireTime)}}</span>
      </mt-cell>
    </div>
    <div class="mb-55">
      <div class="machine" v-for="(item, index) in imageList">
        <div class="label" :class="{require:item.require}">
          <mt-cell :title="item.title"></mt-cell>
        </div>
        <div class="content">
          <div class="bg-img" @click="getLocation(index)"
               :class="[index === 0 ? 'bg-img1' : index === 1 ?'bg-img2':'bg-img3']">
            <img v-show="item.src" :src="item.src">
          </div>
        </div>

      </div>
    </div>
    <mt-button class="btn" type="primary" @click="submit()" :disabled="disabled">提交核销</mt-button>
    <getLocationFailWin ref="getLocationFail"></getLocationFailWin>
  </div>
</template>

<script>
import wechatlib from 'weixin-js-sdk'
import { MessageBox, Indicator, Toast } from 'mint-ui'
import getLocationFailWin from '../public/get_location_fail_win'
import { mapActions } from 'vuex'
import _ from 'lodash'
import { loadData, defaultPreHandler, boolPreHandler } from '../../common/utils'
import api from '../../api/index2'
import moment from 'moment'

export default {
  name: 'insurance_claim',
  components: {
    getLocationFailWin
  },
  data () {
    return {
      imageList: [
        {
          require: true,
          title: '机器编码图片',
          src: '',
          serviceId: null,
          imageId: null,
          address: {
            latitude: null,
            longitude: null,
            provinceId: null,
            cityId: null,
            countyId: null,
            desc: ''
          }
        },
        {
          require: true,
          title: '使用环境照片',
          src: '',
          serviceId: null,
          imageId: null,
          address: {
            latitude: null,
            longitude: null,
            provinceId: null,
            cityId: null,
            countyId: null,
            desc: ''
          }
        },
        {
          require: false,
          title: '故障备件照片',
          src: '',
          serviceId: null,
          imageId: null,
          address: {
            latitude: null,
            longitude: null,
            provinceId: null,
            cityId: null,
            countyId: null,
            desc: ''
          }
        }
      ],
      detail: {},
      disabled: false
    }
  },
  created () {
    this.getDetail()
  },
  async mounted () {
    await this.config()
  },
  methods: {
    ...mapActions(['getContractList']),
    async getDetail () {
      let orderId = Number(this.$route.query.orderId)
      let searchValue = this.$route.query.searchValue
      if (this.$store.state.contract.length) {
        this.detail = _.find(this.$store.state.contract, item => {
          return item.orderId === orderId
        })
      } else {
        await loadData(() => {
          return this.getContractList(searchValue)
        }, () => {
          let contract = this.$store.state.contract
          this.detail = _.find(contract, item => {
            return item.orderId === orderId
          })
        })
      }
    },
    momentTime (time) {
      return moment(time).add(-1, 'd').format('YYYY-MM-DD')
    },
    status (status) {
      if (status === true) {
        return '有效'
      } else {
        return '无效'
      }
    },
    verify () {
      for (let index in this.imageList) {
        if (index !== 2) {
          if ((!this.imageList[index].serviceId) && (!this.imageList[index].src)) {
            return '请上传' + this.imageList[index].title
          }
        }
      }
    },
    async submit () {
      if (!this.imageList[0].src && !this.imageList[0].serviceId) {
        MessageBox('提示', '请上传' + this.imageList[0].title)
      } else if (!this.imageList[1].src && !this.imageList[1].serviceId) {
        MessageBox('提示', '请上传' + this.imageList[1].title)
      } else {
        this.indicator('正在提交...')
        this.disabled = true
        await this.geocode()
        if (this.imageList[0].imageId && this.imageList[0].address.desc) {
          await loadData(() => {
            let imgIds = []
            _.forEach(this.imageList, item => {
              if (item.imageId) {
                imgIds.push(item.imageId)
              }
            })
            // if (this.imageList[2].imageId) {
            //   imgIds = [this.imageList[0].imageId, this.imageList[1].imageId, this.imageList[2].imageId]
            // } else {
            //   imgIds = [this.imageList[0].imageId, this.imageList[1].imageId]
            // }
            let params = {
              personId: this.$store.state.person.personId,
              orderId: this.detail.orderId,
              imageids: imgIds,
              coord: {
                lat: this.imageList[0].address.latitude,
                lon: this.imageList[0].address.longitude,
                provinceId: this.imageList[0].address.provinceId,
                cityId: this.imageList[0].address.cityId,
                countyId: this.imageList[0].address.countyId,
                addressDescription: this.imageList[0].address.desc
              }
            }
            return api.postClaim(params)
          }, (res) => {
            if (res) {
              Indicator.close()
              MessageBox({
                title: '提示',
                message: '出险核销提交成功',
                confirmButtonText: '返回首页'
              }).then(action => {
                localStorage.removeItem('param')
                this.$router.push({
                  path: 'home'
                })
              })
              this.disabled = false
            } else {
              Indicator.close()
              MessageBox('提示', '出险核销提交失败，请重新提交')
              this.disabled = false
            }
          }, boolPreHandler, true)
        }
      }
    },
    async config () {
      let url = location.href.split('#')[0]
      await this.$initWxConfig(url, ['chooseImage', 'uploadImage', 'getLocation', 'getLocalImgData'])
    },
    indicator (message) {
      Indicator.open({
        text: message,
        spinnerType: 'fading-circle'
      })
    },
    async geocode () {
      await loadData(() => {
        return api.geocode(this.imageList[0].address.latitude, this.imageList[0].address.longitude, 3)
      }, value => {
        if (value) {
          this.imageList[0].address.provinceId = value.provinceId
          this.imageList[0].address.cityId = value.cityId
          this.imageList[0].address.countyId = value.districtId
          this.imageList[0].address.desc = value.address
        } else {
          Indicator.close()
          this.disabled = false
        }
      }, defaultPreHandler, true)
    },
    getLocation (index) {
      let vue = this
      vue.imageList[index].address.latitude = null
      vue.imageList[index].address.longitude = null
      this.indicator('地理位置获取中')
      let indicator = true
      let u = navigator.userAgent
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (!isIOS) {
        setTimeout(() => {
          if (indicator) {
            Indicator.close()
            vue.$refs.getLocationFail.show(true)
          }
        }, 5000)
      }
      wechatlib.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02' 注释可以消除
        success: function (res) {
          Indicator.close()
          indicator = false
          vue.imageList[index].address.latitude = res.latitude  // 纬度，浮点数，范围为90 ~ -90
          vue.imageList[index].address.longitude = res.longitude  // 经度，浮点数，范围为180 ~ -180。
          if (res.latitude && res.longitude) {
            setTimeout(() => {
              vue.chooseImage(index)
            }, 300)
          }
        },
        cancel: function () {
          Indicator.close()
          indicator = false
          vue.$refs.getLocationFail.show(false)
        },
        fail: function () {
          Indicator.close()
          indicator = false
          vue.$refs.getLocationFail.show(true)
        },
        error: function (res) {
          Indicator.close()
          indicator = false
        }
      })
    },
    chooseImage (index) {
      let vue = this
      wechatlib.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          vue.imageList[index].src = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          vue.uploadImage(index, res.localIds[0])
        },
        fail: function () {
          vue.toast('图片上传失败，请重试')
        }
      })
    },
    uploadImage (index, localId) {
      if (index === this.imageList.length - 1) {
        this.imageList.push(
          {
            require: false,
            title: '',
            src: '',
            serviceId: null,
            imageId: null,
            address: {
              latitude: null,
              longitude: null,
              provinceId: null,
              cityId: null,
              countyId: null,
              desc: ''
            }
          })
      }
      let vue = this
      wechatlib.uploadImage({
        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: async function (res) {
          vue.imageList[index].serviceId = res.serverId // 返回图片的服务器端ID
          await loadData(() => {
            return api.getImage(res.serverId, 20)
          }, (image) => {
            vue.imageList[index].imageId = image.id
          }, defaultPreHandler, true)
          let u = navigator.userAgent
          let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          if (isIOS) {
            vue.getLocalImageDate(index, localId)
          }
        }
      })
    },
    getLocalImageDate (index, localId) {
      let vue = this
      wechatlib.getLocalImgData({
        localId: localId,
        success: function (res) {
          let localData = res.localData
          vue.imageList[index].src = localData
        }
      })
    },
    toast (message) {
      Toast({
        message,
        position: 'middle',
        duration: 2000
      })
    }
  }
}
</script>

<style scoped>
  .top {
    background: #fff;
    padding-bottom: 2px;
  }

  .title {
    line-height: 1.5;
  }

  .require {
    position: relative;
  }

  .require:after {
    content: '*';
    color: red;
    position: absolute;
    top: 30%;
    left: 5px;
  }

  .t_l {
    text-align: left
  }

  .green {
    color: #17B794
  }

  .red {
    color: #FE633F;
  }

  .blue a {
    color: #3396E4;
  }

  .blue a:active, .blue a:visited {
    color: #3396E4;
  }

  .bold {
    font-weight: bold;
  }

  .tips {
    color: #888;
    padding: 0 15px;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
  }

  .mb-55 {
    background: #ffffff;
    padding-bottom: 55px;
  }

  .machine {
    overflow: hidden;
    padding-top: 15px;
  }

  .machine .bg-img {
    overflow: hidden;
    margin: auto;
  }

  .machine .label {
    width: 120px;
    float: left;
  }

  .machine .content {
    width: calc(100vw - 135px);
    float: right;
    margin-right: 5px;
  }

  .machine img {
    width: 100%;
    height: 100%;
  }

  .bg-img {
    width: calc(100vw - 160px);
    height: calc(100vw - 160px);
    border: 1px solid #ddd;
    margin: auto;

  }

  .bg-img1 {
    background: url("/static/machine.png");
    background-size: 100%;
  }

  .bg-img2 {
    background: url("/static/machine2.png");
    background-size: 100%;
  }

  .bg-img3 {
    background: url("/static/machine3.png");
    background-size: 100%;
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
  }

</style>
