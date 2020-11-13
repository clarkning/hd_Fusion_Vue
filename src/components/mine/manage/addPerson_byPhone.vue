<template>
  <div>
    <div class="field_wrap">
      <mt-field class="required-white" label="手机号" placeholder="请输入手机号" type="tel" :attr="{ maxlength: 11 }"
                v-model="phoneNumber"></mt-field>
    </div>
    <div class="button_wrap" @click="goToPageAddPerson">
      <mt-button class="button bg_blue" type="default" size="large">下 一 步</mt-button>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/index2'
  import { loadData, defaultPreHandler } from '../../../common/utils'
  import _ from 'lodash'
  import { Toast } from 'mint-ui'

  export default {
    name: 'addPerson_byPhone',
    data () {
      return {
        organizationId: this.$route.query.organizationId,
        partnerId: this.$route.query.partnerId,
        phoneNumber: null,
        organizationName: null,
        results: true,
        assumInfo: []
      }
    },
    methods: {
      showMessage (message) {
        Toast({
          message,
          position: 'bottom',
          duration: 2000
        })
      },
      async getAssumeInfo () {
        await loadData(() => {
          let param = {
            phone: this.phoneNumber
          }
          return api.getAssumeInfoByPhone(param)
        }, (data) => {
          console.log(data)
          this.assumInfo = data
        }, defaultPreHandler)
        if (this.assumInfo.length) {
          console.log(this.assumInfo[0].id)
          this.personId = this.assumInfo[0].id
          _.forEach(this.assumInfo[0].organizations, item => {
            if (item.organizationReturnModel.id === Number(this.organizationId)) {
              this.organizationName = item.organizationReturnModel.name
              this.results = false
            } else if (item.organizationReturnModel.parentId === Number(this.partnerId)) {
              this.organizationName = ''
              this.results = false
            }
          })
        }
      },
      async goToPageAddPerson () {
        let re = /^(86)*0*1\d{10}$/
        if (!this.phoneNumber) {
          this.showMessage('请输入手机号')
          return
        } else if (!re.test(this.phoneNumber)) {
          this.showMessage('手机号不正确')
          return
        }
        await this.getAssumeInfo()
        console.log(this.assumInfo)
        let name = this.assumInfo.length ? this.assumInfo[0].name : ''
        if (!this.results) {
          this.$router.push({
            path: 'addPerson_result',
            query: {
              phoneNumber: this.assumInfo[0].phoneNumber,
              name,
              organizationName: this.organizationName,
              results: this.results
            }
          })
        } else {
          this.$router.push({
            path: 'addPerson_bySelectPosition',
            query: {
              phoneNumber: this.phoneNumber,
              name,
              personId: this.personId,
              organizationId: this.organizationId
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .required-white >>> .mint-cell-text::before {
    content: '*';
    font-size: 14px;
    color: red
  }

  .button_wrap {
    margin-top: 50px;
    /*position: fixed;*/
    /*top: 300px;*/
    /*width: 100%;*/
  }

  .field_wrap {
    /*margin-top: 200px;*/
  }

  .bg_blue {
    border-radius: 0;
    color: #26a2ff;
    background: #fff;
  }
</style>
