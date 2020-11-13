<template>
  <div class="userMessage">
    <mt-cell title="用户信息" class="userMessage_title"/>
    <div class="userMessage_main">

      <van-field
        v-model="form.customer.name"
        label="用户姓名"
        required
        @input="error.name = false"
        :error="error.name"
        placeholder="请填写姓名"
      />
      <van-field
        v-model="form.customer.phone"
        label="手机号码"
        maxlength="11"
        required
        @input="error.phone = false"
        type="number"
        :error="error.phone"
        placeholder="请填写手机号码"
      />
      <van-field
        v-model="address"
        label="所在地区"
        required
        @focus="error.address = false"
        :error="error.address"
        right-icon="arrow"
        readonly
        @click="clickAddressHandle"
        placeholder="请选择"
      />
      <van-field
        v-model="form.address.addressDescription"
        label="详细地址"
        required
        @input="error.addressDescription = false"
        :error="error.addressDescription"
        placeholder="街道，楼牌号等"
      />
      <van-field
        v-model="expectedTime"
        label="上门时间"
        required
        @focus="error.expectedTime = false"
        right-icon="arrow"
        :error="error.expectedTime"
        readonly
        @click="clickTimeHandle"
        placeholder="期望上门时间"
      />
    </div>
    <!--時間選擇-->
    <van-popup
      v-model="showTime"
      position="bottom"
      :style="{ height: '35%' }">
      <van-picker
        show-toolbar
        :columns="timeColumns"
        value-key="date"
        @cancel="showTime = false"
        @confirm="confirmTimeHandler"
      />
    </van-popup>
    <!--地址选择-->
    <van-popup
      v-model="showAddress"
      position="bottom"
      :style="{ height: '35%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="name"
        @change="changeSelectHandler"
        @cancel="showAddress = false"
        @confirm="confirmAddressHandler"
        ref="areaPicker"
      />
    </van-popup>
    <div class="confirmButton">
      <mt-button type="primary" size="large" style="margin-top: 10px;" :disabled="isSubmitDisabled" @click.native="submit()">
        提交订单
      </mt-button>
    </div>
    <getLocationFailWin ref="getLocationFail"></getLocationFailWin>

  </div>
</template>

<script>
  import {Cell, Indicator, Button, Toast,MessageBox } from 'mint-ui'
  import {Field, Popup, Picker} from 'vant'
  import getLocationFailWin from '../../public/get_location_fail_win'
  import {defaultPreHandler,boolPreHandler, loadData} from "../../../common/utils";
  import api from "../../../api/index2";
  import newApi from "../../../api/fusion_api";
  import {ValueAddedOrderSource} from 'enum/fusion_resource'
  import wechatlib from "weixin-js-sdk";
  import _ from 'lodash'
  import moment from 'moment'
  export default {
    components: {
      [Cell.name]: Cell,
      [Button.name]: Button,
      [Field.name]: Field,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      getLocationFailWin
    },
    name: 'userMessageCollect',
    props: {
      stepCategory: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        expectedTime:null,
        add:{
          cityList:null,
          countyList:null,
          provinceName:null,
          cityName:null,
          countyName:null
        },
        error:{
          expectedTime:false,
          addressDescription:false,
          name:false,
          phone:false,
          address:false,
        },
        showTime:false,
        showAddress:false,
        isFirstShowAddress:true,
        columns: [{values: []}, {values: []}, {values: []}],
        timeColumns:[],
        address:null,
        form: {
          customer:{
            name:'',
            phone:null,
          },
          source:null,
          estimatedAmount:null,
          attributes:null,
          productCategoty:null,
          address:{
            provinceId:"",
            cityId:"",
            countyId:"",
            addressDescription:""
          },
          expectedTime:null
        },
        isSubmitDisabled: false
      }
    },
    async mounted() {
      await this.config()
      await this.loadAddressStates()
      wechatlib.ready(async ()=> {
        await this.fixPosition()
      })
      // this.geocode()
    },
    methods: {
      indicator (message) {
        Indicator.open({
          text: message,
          spinnerType: 'fading-circle'
        })
      },
      async config () {
        let url = location.href.split('#')[0]
        await this.$initWxConfig(url, ['getLocation'])
      },
      async submit () {
        //必填校验
        console.log(this.stepCategory);
        let stepCategory = JSON.parse(window.localStorage.getItem('recycleData'))
        this.$set(this.error,'name',!this.form.customer.name)
        this.error.phone = !this.form.customer.phone
        this.error.address = !this.address
        this.error.addressDescription = !this.form.address.addressDescription
        this.error.expectedTime = !this.form.expectedTime
        let zanPersonId = window.localStorage.getItem('zanPersonId')
        this.form.source = ValueAddedOrderSource.销售员
        this.form.productCategoty = this.stepCategory.category
        this.form.estimatedAmount = this.stepCategory.estimatedAmount || stepCategory.estimatedAmount
        console.log(this.stepCategory.bottomPrice);
        this.form.bottomPrice = this.stepCategory.bottomPrice || stepCategory.bottomPrice
        this.form.attributes = JSON.stringify(this.stepCategory.attributes) || JSON.stringify(stepCategory.attributes)
        this.form.personId = Number(zanPersonId)
        if(this.form.address && this.form.customer.name && this.form.customer.phone && this.form.address.addressDescription && this.form.expectedTime){
          this.isSubmitDisabled = true
          console.log(this.form);
          await loadData(() => {
            return newApi.recycleOrder.createRecyleOrder(this.form)
          }, data => {
            if(data.isOk){
              Toast({
                message: '提交成功',
                position: 'bottom',
                duration: 3000
              })
              this.$router.push({
                name: 'submitSuccess',
                query: {
                  recycleOrderId:data.content
                },
              })
            } else {
              MessageBox('提示', data.message)
            }
            this.isSubmitDisabled = false
          })
        }
      },
      async fixPosition (id) {
        this.indicator('地理位置获取中')
        this.indicatorLoading = true
        let vue = this
        let u = navigator.userAgent
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        // if (!isIOS) {
        //   setTimeout(() => {
        //     if (vue.indicatorLoading) {
        //       Indicator.close()
        //       vue.indicatorLoading = false
        //       vue.$refs.getLocationFail.show(true)
        //     }
        //   }, 5000)
        // }
        wechatlib.getLocation({
          type: 'wgs84',
          success: async function (res) {
            await vue.geocode(res)
            Indicator.close()
            vue.indicatorLoading = false
          },
          fail: function () {
            vue.$refs.getLocationFail.show(true)
            Indicator.close()
            vue.indicatorLoading = false
          },
          cancel: function () {
            vue.$refs.getLocationFail.show(false)
            Indicator.close()
            vue.indicatorLoading = false
          }
        })
      },
      async addressNameShow () {
        let province = _.filter(this.columns[0].values,item=>{
          return item.id === this.form.address.provinceId
        })
        let cityList = await this.getGeography(this.form.address.provinceId,1)
        let city = _.filter(cityList,item=>{
          return item.id === this.form.address.cityId
        })
        let countyList = await this.getGeography(this.form.address.cityId,2)
        let county = _.filter(countyList,item=>{
          return item.id === this.form.address.countyId
        })
        this.add.cityList = cityList
        this.add.countyList = countyList
        this.add.provinceName = province[0].name
        this.add.cityName = city[0].name
        this.add.countyName = county[0].name
        this.address = province[0].name+'/'+city[0].name+'/'+county[0].name
      },
      async geocode (res) {
        await loadData(() => {
          return api.geocode(res.latitude, res.longitude, 3)
        }, value => {
          if (value) {
            // alert(JSON.stringify(value))
          this.form.address.provinceId = value.provinceId
          // this.form.address.provinceId = 120240
          this.form.address.cityId = value.cityId
          // this.form.address.cityId = 120253
          this.form.address.countyId = value.districtId
          // this.form.address.countyId = 120262
          // this.form.address.addressDescription = value.address
          // 回显地址名称
          this.addressNameShow()
          }
        }, defaultPreHandler, true)
      },
      clickTimeHandle () {
        this.timeColumns = []
        this.showTime = true
        let arr = []
        _.times(7, i => {
          const new_start_time = moment(new Date);//每次重新初始化开始时间，因为我碰到了深拷贝的问题
          let itemDate = new_start_time.add(i+1, "days").format("YYYY-MM-DD")
          let itemWeekEnglish = new Date(new Date().getTime()+ (i+1)*24*60*60*1000).getDay()
          let itemWeek = ''
          switch (itemWeekEnglish) {
            case 1 :
              itemWeek = '星期一'
              break
            case 2 :
              itemWeek = '星期二'
              break
            case 3:
              itemWeek = '星期三'
              break
            case 4:
              itemWeek = '星期四'
              break
            case 5:
              itemWeek = '星期五'
              break
            case 6:
              itemWeek = '星期六'
              break
            case 0:
              itemWeek = '星期日'
              break
            default:
              itemWeek = '星期一'
          }
          this.timeColumns.push({date:itemDate + '  '+ itemWeek,itemDate:itemDate});//数组下标从０开始，可以用它进行每次的天数递增
        })
      },
      confirmTimeHandler (value) {
        this.expectedTime = value.date
        this.form.expectedTime = value.itemDate
        this.showTime = false
      },
      async clickAddressHandle() {
        this.showAddress = true
        // 第一次点击地址组件
        if (this.isFirstShowAddress && !this.address) {
          let states = this.columns[0].values // 省的第一列
          // 当是第一次点击时，需初始化第一个省对应的市，以及第一个市对应的县
          let cities = await this.getGeography(states[0].id,1)
          this.$refs.areaPicker.setColumnValues(1, cities)

          let local3s = await this.getGeography(cities[0].id,2)
          this.$refs.areaPicker.setColumnValues(2, local3s)
        } else if (this.isFirstShowAddress && !!this.address) {
           this.$nextTick(()=>{
             this.$refs.areaPicker.setColumnValue(0, this.add.provinceName)
             this.$refs.areaPicker.setColumnValues(1, this.add.cityList)
             this.$refs.areaPicker.setColumnValue(1, this.add.cityName)
             this.$refs.areaPicker.setColumnValues(2, this.add.countyList)
             this.$refs.areaPicker.setColumnValue(2, this.add.countyName)
           })
        }
        this.isFirstShowAddress = false // 是否第一次展示地址组件
      },
      // 获取省
      async loadAddressStates () {
        let responseAddressStates = await this.getGeography()
        this.columns[0].values = responseAddressStates
      },
      // 确认选择地址
      confirmAddressHandler (value) {
        this.showAddress = false
        this.address = `${value[0].name}/${value[1].name}/${value[2].name}`
        this.form.address.provinceId = value[0].id
        this.form.address.cityId = value[1].id
        this.form.address.countyId = value[2].id
      },
      async changeSelectHandler (picker, values, index) {
        if (index === 0) {
          // 改变省，获取市
          let cities = await this.getGeography(values[0].id,1)
          picker.setColumnValues(1, cities)
          // 并加载第一个市对应的县
          let local3s = await this.getGeography(cities[0].id,2)
          picker.setColumnValues(2, local3s)
        } else if (index === 1){
          // 改变市，获取县
          let local3s = await this.getGeography(values[1].id,2)
          picker.setColumnValues(2, local3s)
        }
      },
      async getGeography (parentId = 0, geographyType = 0) {
        let param = {
          geographyType,
          parentId
        }
        let responseAddress = defaultPreHandler(await api.getGeography(param))
        return responseAddress.geographyDtos
      },
    },
  }
</script>

<style scoped>
  .userMessage_title {
    font-weight: bold;
  }
  .confirmButton{
    width: 80%;
    margin-left: 10%;
    text-align: center;
    margin-top: 60px;
  }
</style>
