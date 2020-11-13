<template>
  <keep-alive>
    <div class="contract_inquiry">
      <span class="bar-code" @click="scanQRCode()"><img src="/static/barCode.png" alt=""> </span>
      <mt-search v-model.trim="searchValue" placeholder="合同号\手机号\机器编码" :show="true" cancel-text="" class="offset">
        <div class="a">
          <div class="filter_date">
            <span @click="changeProject">{{organizationName}}</span>
            <span @click="openPicker">{{form.dateValue}}</span>
          </div>

          <div v-infinite-scroll="search"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="300">
            <div class="mt_40">
              <div class="result" v-for="(result, index) in searchResult" :key="index"
                   @click="goToPageClaim(result, result.orderId, searchValue)">
                <div>
                  <mt-cell class="title">
            <span slot="title" class="des title-width">

            <span>{{result.productCategoryName}} <span
              v-if="result.brand"> - {{result.brand}} </span><span v-if="result.model"> - {{result.model}}</span></span>
            </span>
                  </mt-cell>
                  <mt-cell title="合同号">
                    <span>{{result.contractCode}} </span>
                  </mt-cell>
                  <mt-cell title="客户信息">
                    <span>{{result.name}} - {{result.phone}}</span>
                  </mt-cell>
                  <mt-cell title="核销时间" class="device">
                    <span>{{formatDate(result.lastUpdate)}}</span>
                  </mt-cell>
                  <!--<mt-cell v-if="result.device.serialNumber" title="机器编码" :value="result.device.serialNumber"></mt-cell>-->
                  <mt-cell title="核销工程师"> {{result.operator}}</mt-cell>
                </div>
              </div>
              <div v-if="nullData" class="null_data">
                <div class="null"></div>
                <p>没有查询到合同</p>
                <p>请核对信息后重新查询</p>
              </div>
            </div>
          </div>
        </div>
      </mt-search>
      <span class="inquiry-btn"><mt-button type="primary" size="small" @click="onclickSearch()">查询</mt-button></span>
      <mt-popup
        class="popup-width"
        v-model="visible"
        :closeOnClickModal="false"
        position="bottom">
        <div @touchmove.prevent>
          <div class="picker_title">
            <mt-button class="button_no_border" type="primary" size="small" @click="visible = false" plain>取消
            </mt-button>
            <span class="title_text">选择月份</span>
            <mt-button class="button_no_border" type="primary" size="small" @click="confirm()" plain>确定</mt-button>
          </div>
          <mt-picker ref="picker" :slots="picker.slots" @change="onValuesChange"></mt-picker>
        </div>
      </mt-popup>
    </div>
  </keep-alive>
</template>

<script>
  import wechatlib from 'weixin-js-sdk'
  import api from '../../api/index2'
  import { Toast } from 'mint-ui'
  import moment from 'moment'
  import { loadData, defaultPreHandler } from '../../common/utils'

  export default {
    name: 'verificationHistory',
    data () {
      return {
        visible: false,
        searchValue: null,
        searchResult: [],
        showOrHide: true,
        loading: false,
        organizationId: null,
        barCode: null,
        redirect: false,
        form: {
          dateValue: null
        },
        page: 1,
        limit: 10,
        scroll: 0,
        sc: 0,
        projectId: null,
        organizationName: '',
        picker: {
          values: [],
          slots: [
            {
              flex: 1,
              values: [],
              className: 'slot3',
              textAlign: 'center'
            }
          ]
        },
        nullData: false
      }
    },
    async mounted () {
      await this.config()
    },
    created () {
    },
    methods: {
      leavePage () {
        let a = document.getElementsByClassName('mint-search')[0]
        // console.log(window, a.scrollTop, a.offsetTop)
        a.scrollTop = this.sc
        // document.documentElement.scrollTop = this.sc
        window.scrollTop = this.sc
      },
      getProjectId (param) {
        this.organizationId = param.store
        this.projectId = param.project
        this.organizationName = param.projectName
        this.redirect = param.redirect
        this.init()
      },
      formatDate (date) {
        return moment(date).format('YYYY-MM-DD HH:mm')
      },
      async init () {
        this.getTime()
        await this.search()
      },
      changeProject () {
        if (!this.redirect) {
          this.$emit('changeProject')
        }
      },
      getTime () {
        let arr = []
        let i = 0
        while (i < 6) {
          arr.push(moment().subtract(i, 'months').format('YYYY-MM'))
          i++
        }
        this.picker.slots[0].values = arr
        this.$set(this.form, 'dateValue', this.picker.slots[0].values[0])
      },
      openPicker () {
        this.visible = true
        this.$refs.picker.setSlotValue(0, this.form.dateValue)
      },
      onValuesChange (picker, values) {
        this.picker.values = values
      },
      confirm () {
        this.$set(this.form, 'dateValue', this.picker.values[0])
        this.visible = false
      },
      analysisDate (time) {
        let d = moment(time, 'YYYY年MM月')
        let firstDate = d.startOf('month').format()
        let lastDate = d.endOf('month').format()
        return {firstDate, lastDate}
      },
      onclickSearch () {
        this.searchResult = []
        this.noMore = false
        this.page = 1
        this.search()
      },
      async search () {
        // console.log()
        if (this.noMore) return
        this.loading = true
        let dateValue = this.analysisDate(this.form.dateValue)
        let param = {
          storeld: this.organizationId,
          projectld: this.projectId,
          StartTime: dateValue.firstDate,
          EndTime: dateValue.lastDate,
          param: this.searchValue,
          page: this.page,
          limit: this.limit
        }
        await loadData(() => {
          // this.searchResult = []
          return api.getVerifications(param)
        }, (workOrderList) => {
          if (this.page === 1) {
            this.searchResult = workOrderList.data
            // this.$set(this.$data, 'searchResult', workOrderList.data)
            // this.searchResult = workOrderList.data
          } else {
            this.searchResult.push(...workOrderList.data)
          }
          this.noMore = (workOrderList.totalCount === this.searchResult.length) || (workOrderList.data.length < this.limit)
          this.nullData = !this.searchResult.length
          this.page += 1
        }, defaultPreHandler)
        this.loading = false
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
        let a = document.getElementsByClassName('a')[0]
        // console.log(a.scrollHeight)
        this.sc = a.scrollHeight
        // console.log('sc', this.sc)
        this.$router.push({
          name: 'verificationDefault',
          query: {
            orderId,
            searchValue
          },
          params: {
            data: status
          }
        })
      }
    },
    watch: {
      'searchValue': function (v) {
        if (!v) {
          this.nullData = false
          // this.searchResult = []
          this.searchValue = ''
        }
      },
      'barCode': function (v) {
        if (v) {
          this.searchValue = ''
          this.searchResult = []
          this.page = 1
          this.noMore = false
          this.searchValue = this.barCode
          this.search()
        }
      }
    }
  }
</script>

<style scoped>
  .filter_date {
    /*position: fixed;*/
    /*top: 88px;*/
    width: 100%;
    z-index: 999;
    height: 40px;
    line-height: 40px;
    margin-top: 11px;
    background: #fff;
    margin-bottom: -10px;
  }

  .button_no_border {
    border: none;
  }

  .picker_title {
    /*margin-top: 20px;*/
    display: flex;
    justify-content: space-around;
  }

  .title_text {
    color: #888;
    line-height: 2;
    vertical-align: middle;
  }

  .filter_date span {
    margin-left: 15px;
  }

  .filter_date span:after {
    content: '';
    margin: 10px 5px 0;
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    border: 6px solid transparent;
    border-top: 6px solid #ccc;
  }

  .mt_40 {
    margin-top: 20px;
  }

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
