<template>
  <div class="personInfo">
    <p class="p">个人信息</p>
    <mt-field
      label="姓名"
      placeholder="请输入姓名"
      v-model="personInfo.userName"
      :state="state.userNameState"
      v-validate="'required'"
      name="用户名"
      :disabled="isAccountOpeningStatus" />
    <mt-field
      label="身份证号"
      class="idcard-num"
      placeholder="请输入身份证号"
      v-model="personInfo.idCard.number"
      v-validate="'required|id_card'"
      name="身份证号"
      :state="state.idCardNumberState"
      :disabled="isAccountOpeningStatus" />
    <div class="upload-box">
      <p class="uploadImageDesc">身份证头像面</p>
      <div
        class="uploadImage Abg-img"
        @click="chooseImage(personInfo.idCard.imageA)"
        :style="{
          'background-image': 'url(' + personInfo.idCard.imageA.url + ')',
          'backgroundRepeat':'no-repeat',
          'background-color':'#EBEBEB',
          'backgroundSize':'cover',
          'background-position':'center'
        }">
        <img src="static/CardImageAA.jpg" alt="" v-if="!personInfo.idCard.imageA.url" @click.self.prevent>
        <mt-field
          class="hide"
          label="身份证正面"
          v-model="personInfo.idCard.imageA.url"
          v-validate="{required: personInfo.isServiceFee}"
          name="身份证正面" />
      </div>
      <p class="uploadImageDesc">身份证国徽面</p>
      <div
        class="uploadImage Bbg-img"
        @click="chooseImage(personInfo.idCard.imageB)"
        :style="{
          'background-image': 'url(' + personInfo.idCard.imageB.url + ')',
          'background-repeat':'no-repeat',
          'background-color':'#EBEBEB',
          'background-size':'cover',
          'background-position':'center'
        }">
        <img src="static/CardImageBB.jpg" alt="" v-if="!personInfo.idCard.imageB.url" @click.self.prevent>
        <mt-field
          class="hide"
          label="身份证背面"
          v-model="personInfo.idCard.imageB.url"
          v-validate="{required: personInfo.isServiceFee}"
          name="身份证背面" />
      </div>
    </div>
    <p class="p">银行卡信息</p>
    <mt-field
      label=" 持卡人"
      placeholder="持卡人姓名"
      v-model="personInfo.bankAccount.accountName"
      :state="state.userNameState"
      :disabled="true" />
    <mt-field
      label="卡号"
      placeholder="请输入卡号"
      v-model="bankAccountNumber"
      v-validate="{required: !personInfo.isServiceFee, bank_card: true}"
      :state="state.bankAccountNoState"
      name="卡号" />
    <div @click="bankPicker.show = true">
      <mt-field
        label="开户行"
        placeholder="请选择开户行"
        v-model="personInfo.bankAccount.bankName"
        :state="state.bankNameState"
        v-validate="{required: !personInfo.isServiceFee}"
        name="开户行"
        :readonly='true'
        :disabled="true" />
    </div>
    <mt-popup v-model="bankPicker.show" position="bottom" class="upimg-popup" lock-scroll="true"
              :closeOnClickModal="false">
      <div @touchmove.prevent>
        <div class="popup-top clear">
          <span class="geography-title">请选择开户行</span>
          <mt-button type="primary" size="small" class="popup-button quxiao" @click="bankPicker.show = false">取消
          </mt-button>
          <mt-button type="primary" size="small" class="popup-button" @click="chooseBank()">确定</mt-button>
        </div>
        <mt-picker ref="bankPickerObject" :slots="bankPicker.slot" value-key="name" />
      </div>
    </mt-popup>
    <div @click="provincePicker.show = true">
      <mt-field
        label="开户省"
        placeholder="请选择开户省"
        v-model="personInfo.bankAccount.address.province.name"
        :state="state.provinceNameState"
        :readonly='true'
        :disabled="true"
        v-validate="{required: !personInfo.isServiceFee}"
        name="开户省" />
    </div>
    <mt-popup v-model="provincePicker.show" position="bottom" class="upimg-popup" lock-scroll="true"
              :closeOnClickModal="false">
      <div @touchmove.prevent>
        <div class="popup-top clear">
          <span class="geography-title">请选择开户省</span>
          <mt-button type="primary" size="small" class="popup-button quxiao" @click="provincePicker.show = false">取消
          </mt-button>
          <mt-button type="primary" size="small" class="popup-button" @click="chooseProvince()">确定</mt-button>
        </div>
        <mt-picker ref="provincePickerObject" :slots="provincePicker.slot" value-key="name" />
      </div>
    </mt-popup>
    <div @click="cityPicker.show = true">
      <mt-field
        label="开户市"
        placeholder="请选择开户市"
        v-model="personInfo.bankAccount.address.city.name"
        :state="state.cityNameState"
        :readonly='true'
        :disabled="true"
        v-validate="{required: !personInfo.isServiceFee}"
        name="开户市" />
    </div>
    <mt-popup v-model="cityPicker.show" position="bottom" class="upimg-popup" lock-scroll="true"
              :closeOnClickModal="false">
      <div @touchmove.prevent>
        <div class="popup-top clear">
          <span class="geography-title">请选择开户市</span>
          <mt-button type="primary" size="small" class="popup-button quxiao" @click="cityPicker.show = false">取消
          </mt-button>
          <mt-button type="primary" size="small" class="popup-button" @click="chooseCity()">确定</mt-button>
        </div>
        <mt-picker ref="cityPickerObject" :slots="cityPicker.slot" value-key="name" />
      </div>
    </mt-popup>
    <div @click="countyPicker.show = true">
      <mt-field
        label="开户县"
        placeholder="请选择开户县"
        v-if="personInfo.bankAccount.address.city.name === '省直辖县级行政区划'"
        v-model="personInfo.bankAccount.address.county.name"
        :state="state.cityNameState"
        name="开户县"
        v-validate="{required: !personInfo.isServiceFee && personInfo.bankAccount.address.city.name === '省直辖县级行政区划'}"
        :readonly='true'
        :disabled="true" />
    </div>
    <mt-popup v-model="countyPicker.show" position="bottom" class="upimg-popup" lock-scroll="true"
              :closeOnClickModal="false">
      <div @touchmove.prevent>
        <div class="popup-top clear">
          <span class="geography-title">请选择开户县</span>
          <mt-button type="primary" size="small" class="popup-button quxiao" @click="countyPicker.show = false">取消
          </mt-button>
          <mt-button type="primary" size="small" class="popup-button" @click="chooseCounty()">确定</mt-button>
        </div>
        <mt-picker ref="countyPickerObject" :slots="countyPicker.slot" value-key="name" />
      </div>

    </mt-popup>
    <mt-field class="branch-bank" label="开户分行" placeholder="开户行支行名称(非必填)"
              v-model="personInfo.bankAccount.branchBankName"
              :state="state.bankBranchNameState">
      <mt-button class="wrap-i" @click.native="personInfo.bankBranchAnother = true">
        <i class="iconfont icon-wenhao" aria-hidden="true" />
      </mt-button>
      <mt-popup class="bankBranchAnother-mask" v-model="personInfo.bankBranchAnother" position="center"
                lock-scroll="true" :closeOnClickModal="false">
        <div class="mask-con">
          <p>请正确填写开户行支行名称，否则资金将无法按时到账。如，北京分行中关村支行</p>
        </div>
        <a class="sure" @click="personInfo.bankBranchAnother = false">关闭</a>
      </mt-popup>
    </mt-field>
    <div class="ui-button">
      <mt-button type="primary" size="large" @click="validateData()">提交</mt-button>
    </div>
    <mt-popup
      v-model="popupVisible" position="center" lock-scroll="true" :closeOnClickModal="false" class="tips-popup">
      <h2 class="tips-title">重要提示</h2>
      <p class="tips-p">1、请确保填写的姓名、身份证与上传的身份证图片一致<br>2、请确保上传证件图片清晰</p>
      <a class="sure" @click="popupVisible = false">关闭</a>
    </mt-popup>
  </div>
</template>
<script>
  import api from '../../api/index2'
  import bankList from '../../../static/js/bank-list.js'
  import { MessageBox, Toast, Indicator } from 'mint-ui'
  import wx from 'weixin-js-sdk'
  import { loadData, defaultPreHandler, boolPreHandler } from '../../common/utils'
  import { Validator } from 'vee-validate'
  import _ from 'lodash'
  import { SigningStatus } from '../../common/enum/fusion_resource'

  Validator.extend('id_card', {
    getMessage: field => '请输入正确的' + field,
    validate: value => /^(\d{18,18}|\d{17,17}x|\d{17,17}X)$/.test(value)
  })
  Validator.extend('bank_card', {
    getMessage: field => '请输入正确的' + field,
    validate: value => /^[0-9]*$/.test(_.replace(value, /\s+/g, ''))
  })

  export default {
    name: 'PersonInfo',
    data () {
      return {
        popupVisible: true,
        personInfo: {
          userName: '',
          idCard: {
            number: '',
            imageA: {
              url: '',
              serverId: ''
            },
            imageB: {
              url: '',
              serverId: ''
            }
          },
          bankBranchAnother: false,
          bankAccount: {
            accountNumber: '',
            accountName: '',
            bankCode: '',
            bankName: '',
            branchBankName: '',
            address: {
              desc: '',
              province: {
                geographyType: 0,
                id: null,
                name: ''
              },
              city: {
                geographyType: 1,
                id: null,
                name: ''
              },
              county: {
                geographyType: 2,
                id: null,
                name: ''
              }
            }
          },
          isServiceFee: null,
          signingStatus: null
        },
        bankPicker: {
          value: '',
          slot: [
            {
              flex: 1,
              values: bankList.banks,
              className: 'name',
              textAlign: 'center'
            }
          ],
          show: false
        },
        provincePicker: {
          value: '',
          slot: [
            {
              flex: 1,
              values: [],
              className: 'province',
              textAlign: 'center'
            }
          ],
          show: false
        },
        cityPicker: {
          value: '',
          slot: [
            {
              flex: 1,
              values: [],
              className: 'city',
              textAlign: 'center'
            }
          ],
          show: false
        },
        countyPicker: {
          value: '',
          slot: [
            {
              flex: 1,
              values: [],
              className: 'county',
              textAlign: 'center'
            }
          ],
          show: false
        },
        state: {
          userNameState: 'default',
          idCardNumberState: 'default',
          bankNameState: 'default',
          bankAccountNoState: 'default',
          provinceNameState: 'default',
          cityNameState: 'default',
          bankBranchNameState: 'default'
        }
      }
    },
    async created () {
      this.pathAddress = this.$route.query.pathAddress
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.setPersonInfo()
      this.$nextTick(() => {
        let picker = this.$refs.provincePickerObject
        this.getGeography(picker)
      })
    },
    async mounted () {
      let url = location.href.split('#')[0]
      await this.$initWxConfig(url, ['chooseImage', 'uploadImage'])
    },
    methods: {
      async chooseImage (imageObj) {
        if (this.isAccountOpeningStatus) return
        let vue = this
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'], // 'original', 'compressed'可以指定是原图还是压缩图
          sourceType: ['album', 'camera'],
          success: function (res) {
            imageObj.url = res.localIds[0]
            let u = navigator.userAgent
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            vue.indicator('上传中')
            wx.uploadImage({
              localId: imageObj.url,
              isShowProgressTips: 0,
              success: async function (res) {
                await loadData(() => {
                  return api.getImage(res.serverId, 10)
                }, (value) => {
                  imageObj.serverId = value.id
                  if (isIOS) {
                    wx.getLocalImgData({
                      localId: imageObj.url,
                      success: function (res) {
                        imageObj.url = res.localData
                      }
                    })
                  }
                  Indicator.close()
                }, defaultPreHandler, true)
              },
              fail: function () {
                Indicator.close()
              }
            })
          }
        })
      },
      indicator (message) {
        Indicator.open({
          text: message,
          spinnerType: 'fading-circle'
        })
      },
      chooseBank () {
        let value = this.$refs.bankPickerObject.getValues()[0]
        this.personInfo.bankAccount.bankName = value.name
        this.personInfo.bankAccount.bankCode = value.value
        this.bankPicker.show = false
      },
      async getGeography (picker, parentId = 0, geographyType = 0) {
        let param = {
          geographyType: geographyType,
          parentId: parentId
        }
        await loadData(() => {
          return api.getGeography(param)
        }, (values) => {
          picker.setSlotValues(0, values.geographyDtos)
        }, defaultPreHandler, true)
      },
      async chooseProvince () {
        let picker = this.$refs.provincePickerObject
        this.personInfo.bankAccount.address.province = picker.getValues()[0]
        this.provincePicker.show = false
        this.cityPicker.show = true
      },
      async chooseCity () {
        let picker = this.$refs.cityPickerObject
        this.personInfo.bankAccount.address.city = picker.getValues()[0]
        this.cityPicker.show = false
        if (this.personInfo.bankAccount.address.city.name === '省直辖县级行政区划') {
          this.countyPicker.show = true
        } else {
          this.personInfo.bankAccount.address.county.id = null
          this.personInfo.bankAccount.address.county.name = null
        }
      },
      chooseCounty () {
        let picker = this.$refs.countyPickerObject
        this.personInfo.bankAccount.address.county = picker.getSlotValue(0)
        this.countyPicker.show = false
      },
      showMsgBox (msg) {
        MessageBox({
          title: '提示',
          message: msg
        })
      },
      parseCardNumber (number) {
        if (!number) {
          number = ''
        }
        let card = ''
        for (let i = 0; i < number.length; i += 4) {
          let v = number.substring(i, i + 4) + ' '
          card += v
        }
        return card.trim()
      },
      validateData () {
        this.$validator.validateAll().then((result) => {
          if (this.$validator.errors.items.length > 0) {
            this.showMsgBox(this.$validator.errors.items[0].msg)
          } else if (!this.personInfo.isServiceFee && !this.personInfo.bankAccount.bankName) {
            this.showMsgBox('开户行不能为空！')
          } else if (!this.personInfo.isServiceFee && !this.personInfo.bankAccount.address.province.name) {
            this.showMsgBox('开户省不能为空！')
          } else if (!this.personInfo.isServiceFee && !this.personInfo.bankAccount.address.city.name) {
            this.showMsgBox('开户市不能为空！')
          } else if (!this.personInfo.isServiceFee && this.personInfo.bankAccount.address.city.name === '省直辖县级行政区划' && !this.personInfo.bankAccount.address.county.name) {
            this.showMsgBox('开户县不能为空！')
          } else {
            let currentAge = this.getAgeHandler(this.personInfo.idCard.number)
            if (currentAge >= 65 || currentAge < 18) {
              this.showMsgBox('销售员年龄需介于18-65岁之间')
              return
            }
            this.submitPersonInfo()
          }
        })
      },
      getAgeHandler (identityCard) {
        let len = (identityCard + '').length
        if (len === 0) {
          return 0
        } else {
          if ((len !== 15) && (len !== 18)) {
            return 0
          }
        }
        let strBirthday = ''
        if (len === 18) { // 处理18位的身份证号码从号码中得到生日和性别代码
          strBirthday = identityCard.substr(6, 4) + '/' + identityCard.substr(10, 2) + '/' + identityCard.substr(12, 2)
        }
        if (len === 15) {
          strBirthday = '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(10, 2)
        }
        // 时间字符串里，必须是“/”
        let birthDate = new Date(strBirthday)
        let nowDateTime = new Date()
        let age = nowDateTime.getFullYear() - birthDate.getFullYear()
        // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() ||
            (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())
          ) {
          age--
        }
        return age
      },
      async submitPersonInfo () {
        let params = {
          name: this.personInfo.userName, // 姓名
          idCardNumber: this.personInfo.idCard.number, // 身份证号
          idCardImageId: this.personInfo.idCard.imageA.serverId,  // 图a
          idCardImageBId: this.personInfo.idCard.imageB.serverId, // 图b
          accountName: this.personInfo.userName, // 持卡人姓名
          bankOrganizationName: this.personInfo.bankAccount.bankName, // 开户行
          bankOrganizationCode: this.personInfo.bankAccount.bankCode, // 银行编码
          bankName: this.personInfo.bankAccount.branchBankName, // 开户分行
          bankAccountNo: this.personInfo.bankAccount.accountNumber, // 卡号
          provinceId: this.personInfo.bankAccount.address.province.id,
          cityId: this.personInfo.bankAccount.address.city.id,
          countyId: this.personInfo.bankAccount.address.county.id
        }
        let vue = this
        await loadData(() => api.postPersonBankInfo(params), (res) => {
          if (res) {
            Toast({
              message: '提交成功',
              position: 'middle',
              duration: 1000
            })
            this.personInfo.bankAccount.accountName = this.personInfo.userName // 更正持卡人姓名需和个人信息姓名保持一致
            if (this.pathAddress === 'commission') {
              setTimeout(function () {
                vue.$router.go(-1)
              }, 1000)
            }
          }
        }, boolPreHandler, false)
      },
      async setPersonInfo () {
        await loadData(() => api.getPersonBankInfo(), (personalInfo) => {
          this.personInfo.isServiceFee = personalInfo.isServiceFee
          this.personInfo.userName = personalInfo.name
          this.personInfo.signingStatus = personalInfo.signingStatus
          this.personInfo.idCard.number = personalInfo.idCardNumber
          this.personInfo.idCard.imageA.url = personalInfo.idCardImage
          this.personInfo.idCard.imageA.serverId = personalInfo.idCardImageId
          this.personInfo.idCard.imageB.url = personalInfo.idCardImageB
          this.personInfo.idCard.imageB.serverId = personalInfo.idCardImageBId
          this.personInfo.bankAccount.accountNumber = personalInfo.bankAccountNo
          this.personInfo.bankAccount.accountName = personalInfo.name
          this.personInfo.bankAccount.bankCode = personalInfo.bankOrganizationCode
          this.personInfo.bankAccount.bankName = personalInfo.bankOrganizationName
          this.personInfo.bankAccount.branchBankName = personalInfo.bankName
          this.personInfo.bankAccount.address.province.id = personalInfo.provinceId
          this.personInfo.bankAccount.address.province.name = personalInfo.provinceName
          this.personInfo.bankAccount.address.city.id = personalInfo.cityId
          this.personInfo.bankAccount.address.city.name = personalInfo.cityName
          this.personInfo.bankAccount.address.county.id = personalInfo.countyId
          this.personInfo.bankAccount.address.county.name = personalInfo.countyName
        }, defaultPreHandler, true)
      },
      setPickerDefaultIndex (picker, value, key = 'id') {
        var v = picker.getSlotValues(0).find(s => s[key] === value)
        picker.setSlotValue(0, v)
      },
      validateFieldState (condition) {
        return condition ? 'success' : 'error'
      }
    },
    computed: {
      bankAccountNumber: {
        get: function () {
          return this.parseCardNumber(this.personInfo.bankAccount.accountNumber)
        },
        set: function (newValue) {
          if (newValue) {
            this.personInfo.bankAccount.accountNumber = newValue.split(' ').join('')
          } else {
            this.personInfo.bankAccount.accountNumber = newValue
          }
        }
      },
      // 当前人员和第三方平台的开户状态为【已开户】
      isAccountOpeningStatus () {
        return this.personInfo.signingStatus === SigningStatus.已开户
      }
    },
    watch: {
      'personInfo.userName': function (c) {
        this.state.userNameState = this.validateFieldState(c.length > 1)
      },
      'personInfo.idCard.number': function (c) {
        this.state.idCardNumberState = this.validateFieldState(c.length === 18)
      },
      'personInfo.bankAccount.accountNumber': function (c) {
        this.state.bankAccountNoState = this.validateFieldState(c.length <= 19)
      },
      'cityPicker.show': function (v) {
        if (v) {
          if (!this.personInfo.bankAccount.address.province.id) {
            this.showMsgBox('请先选择开户省')
          }
        }
      },
      'countyPicker.show': function (v) {
        if (v) {
          if (!this.personInfo.bankAccount.address.city.id) {
            this.showMsgBox('请先选择开户省市')
          }
        }
      },
      'personInfo.bankAccount.bankCode': async function (newValue, oldValue) {
        if (newValue) {
          let picker = this.$refs.bankPickerObject
          if (oldValue === '') {
            this.setPickerDefaultIndex(picker, newValue, 'value')
          }
        } else {
          this.personInfo.bankAccount.bankName = ''
          this.personInfo.bankAccount.bankCode = ''
        }
      },
      'personInfo.bankAccount.bankName': function (c) {
        this.state.bankNameState = this.validateFieldState(c.length > 1)
      },
      'personInfo.bankAccount.address.province.id': async function (newValue, oldValue) {
        if (newValue) {
          let picker = this.$refs.provincePickerObject
          if (picker.getSlotValues(0).length === 0 && oldValue === null) {
            await this.getGeography(picker)
            this.setPickerDefaultIndex(picker, newValue, 'id')
          } else {
            await this.getGeography(this.$refs.cityPickerObject, newValue, 1)
          }
        }
        this.state.provinceNameState = this.validateFieldState(newValue)
      },
      'personInfo.bankAccount.address.city.id': async function (newValue, oldValue) {
        if (newValue) {
          let picker = this.$refs.cityPickerObject
          if (picker.getSlotValues(0).length === 0 && oldValue === null) {
            await this.getGeography(picker, this.personInfo.bankAccount.address.province.id, 1)
            this.setPickerDefaultIndex(picker, newValue, 'id')
          } else {
            await this.getGeography(this.$refs.countyPickerObject, newValue, 2)
            this.personInfo.bankAccount.address.county.id = null
            this.personInfo.bankAccount.address.county.name = ''
          }
        }

        this.state.cityNameState = this.validateFieldState(newValue)
      },
      'personInfo.bankAccount.address.county.id': async function (newValue, oldValue) {
        if (newValue) {
          let picker = this.$refs.countyPickerObject
          if (picker.getSlotValues(0).length === 0 && oldValue === null) {
            await this.getGeography(picker, this.personInfo.bankAccount.address.city.id, 2)
            this.setPickerDefaultIndex(picker, newValue, 'id')
          }
        }

        this.state.countyPicker = this.validateFieldState(newValue)
      }
    }
  }
</script>
<style scoped>
  .p {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .hide {
    display: none;
  }

  .upload-box {
    background: #ffffff;
    padding: 2% 0 5%;
  }

  .uploadImageDesc {
    padding: 0 15px;
    font-size: 14px;
    color: #000000;
    margin-bottom: 10px;
  }

  .uploadImage {
    width: 92%;
    height: 220px;
    margin: auto;
  }

  .uploadImage img {
    width: 100%;
  }

  .Abg-img {
    margin-bottom: 10px;
  }

  .upimg-popup {
    width: 100%;
  }

  .popup-button {
    float: right;
    line-height: 40px;
    color: #26a2ff;
    background: none;
  }

  .quxiao {
    float: left;
  }

  .popup-top {
    background: #ffffff;
    width: 100%;
    z-index: 9999;
    padding-bottom: 5px;
  }

  .geography-title {
    text-align: center;
    color: #999999;
    width: 100%;
    position: fixed;
    top: 10px;
    font-size: 14px;
  }

  .mask-con {
    /*width: 100%;*/
    padding: 10px 20px 20px;
  }

  .sure {
    border: none;
    border-top: 1px solid #EBEBEB;
    width: 100%;
    text-align: center;
    height: 40px;
    color: #26a2ff;
    outline: none;
    /*webkit-tap-highlight-color:rgba(0,0,0,0);*/
    line-height: 40px;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    font-size: 14px;
    border-radius: 4px;

  }

  .wrap-i {
    border: 0;
    background: none;
    box-shadow: none;
    text-align: right;
    color: #26a2ff;
    padding: 4px;
  }

  .bankBranchAnother-mask {
    margin: 0 auto;
    width: 80%;
    text-align: left;
    color: #333;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    border-radius: 5px;
  }

  .tips-title {
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    color: #333333;
  }

  .tips-p {
    line-height: 1.5;
    text-align: left;
    color: #888;
    padding: 10px;
    font-size: 14px;
  }

</style>
