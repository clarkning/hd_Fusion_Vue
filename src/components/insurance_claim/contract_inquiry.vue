<template>
  <div class="contract_inquiry">
    <span class="bar-code" @click="scanQRCode()"><img src="/static/barCode.png" alt=""> </span>
    <mt-search v-model.trim="searchValue" placeholder="合同号\手机号\机器编码" :show="true">
      <div class="result" v-for="(result, index) in searchResult" :key="index">
        <div @click="goToPageClaim(result.enabled, result.orderId, searchValue)">
          <mt-cell class="title">
            <span slot="title" class="des title-width">{{result.skuName}}</span>
          </mt-cell>
          <mt-cell title="合同号">
            <span>{{result.contractCode}} <span class="bold" :class="[result.enabled === true ? 'green' : 'red']">({{status(result.enabled)}})</span></span>
          </mt-cell>
          <mt-cell title="客户信息">
            <span>{{result.customer.name}} - {{result.customer.phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')}}</span>
          </mt-cell>
          <mt-cell title="产品信息" class="device">
            <span>{{result.device.productCategoryName}} <span
              v-if="result.device.brand"> - {{result.device.brand}} </span><span v-if="result.device.model"> - {{result.device.model}}</span></span>
          </mt-cell>
          <mt-cell v-if="result.device.serialNumber" title="机器编码" :value="result.device.serialNumber"></mt-cell>
          <mt-cell title="有效期"> {{result.effectTime.slice(0, 10)}} ~ {{momentTime(result.expireTime)}}</mt-cell>
        </div>
        <mt-button v-if="result.enabled" @click="goToPageClaim(result.enabled, result.orderId, searchValue)"
                   type="primary" size="small">核销
        </mt-button>
      </div>
      <div v-if="nullData" class="null_data">
        <div class="null"></div>
        <p>没有查询到合同</p>
        <p>请核对信息后重新查询</p>
      </div>
    </mt-search>
    <span class="inquiry-btn"><mt-button type="primary" size="small" @click="search()">查询</mt-button></span>
  </div>
</template>

<script>
  import wechatlib from 'weixin-js-sdk'
  import {MessageBox, Toast} from 'mint-ui'
  import {loadData} from '../../common/utils'
  import {mapActions} from 'vuex'
  import moment from 'moment'

  export default {
    name: 'contract_inquiry',
    data () {
      return {
        searchValue: null,
        searchResult: [],
        barCode: '',
        nullData: false
      }
    },
    async mounted () {
      await this.config()
    },
    beforeRouteEnter (to, from, next) {
      if (from.path === '/home') {
        localStorage.removeItem('param')
      }
      if (from.path === '/insurance_claim') {
        next(vm => {
          let param = localStorage.getItem('param')
          if (param) {
            vm.searchValue = param
            if (vm.$store.state.contract.length) {
              vm.searchResult = vm.$store.state.contract
            }
          }
        })
      } else {
        next()
      }
    },
    created () {

    },
    methods: {
      ...mapActions(['getContractList']),
      setSerachValue () {
        this.searchValue = ''
      },
      momentTime (time) {
        return moment(time).add(-1, 'd').format('YYYY-MM-DD')
      },
      async search () {
        if (this.searchValue) {
          localStorage.setItem('param', this.searchValue)
          await loadData(() => {
            return this.getContractList(this.searchValue)
          }, () => {
            this.searchResult = []
            if (this.$store.state.contract) {
              this.searchResult = this.$store.state.contract
            }
            // vue.searchResult.splice(0, 0, ...data)
            if (this.searchResult.length) {
              this.nullData = false
            } else {
              this.nullData = true
            }
          })
        } else {
          this.toast('请输入查询信息')
        }
      },
      status (status) {
        if (status === true) {
          return '有效'
        } else {
          return '无效'
        }
      },
      async config () {
        let url = location.href.split('#')[0]
        await this.$initWxConfig(url, ['scanQRCode'])
      },
      scanQRCode () {
        let vue = this
        vue.searchValue = ''
        vue.barCode = ''
        wechatlib.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            let result = res.resultStr
            let resIndex = res.resultStr.indexOf(',') + 1
            vue.barCode = result.slice(resIndex)
          },
          fail: function () {
            this.toast('扫码失败，请重新扫码')
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        })
      },
      toast (message) {
        Toast({
          message: message,
          position: 'middle',
          duration: 1000
        })
      },
      goToPageClaim (status, orderId, searchValue) {
        if (status === false) {
          MessageBox('合同无效', '该合同无效，无法提交出险核销。请按厂保政策执行。如有疑问，可联系众安客服【4000-810-819】')
        } else {
          this.$router.push({
            name: 'insurance_claim',
            query: {
              orderId,
              searchValue
            }
          })
        }
      }
    },
    watch: {
      'searchValue': function (v) {
        if (!v) {
          this.nullData = false
          this.searchResult = []
          this.searchValue = ''
          this.barCode = ''
        }
      },
      'barCode': function (v) {
        if (v) {
          this.searchValue = ''
          this.searchResult = []
          this.searchValue = this.barCode
          this.search()
        }
      }
    }
  }
</script>

<style scoped>
  .fa-barcode:before {
    content: "\f02a";
    font-size: 1.5em;
  }

  .bar-code {
    width: 35px;
    height: 35px;
    overflow: hidden;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 9.5px 0 9.5px 9.5px;
    background: #fff;
    z-index: 999;
  }

  .bar-code img {
    width: 90%;
  }

  .inquiry-btn {
    display: inline-block;
    background: #fff;
    position: absolute;
    top: 0;
    right: 0;
    width: 55px;
    padding: 10.5px 8px 10px 5px;
    z-index: 99;
    text-align: center;
  }

  .inquiry-btn button {
    float: right;
  }

  .result {
    margin-top: 10px;
  }

  .result button {
    width: 100%;
    border-radius: 0;
  }

  .green {
    color: #17B794
  }

  .red {
    color: #FE633F;
  }

  .bold {
    font-weight: bold;
  }

  .des {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    height: 35px;
    line-height: 35px;
  }

  .title-width {
    width: calc(100% - 1px);
  }

  .des-width {
    width: calc(100% - 200px);
  }
</style>
