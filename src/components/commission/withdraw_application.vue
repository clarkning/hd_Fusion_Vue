<template>
  <div class="withdraw">
    <div class="logo-img"><img src="./images/money.png" width="95"/></div>
    <p class="title">可提金额</p>
    <p class="money"><em>￥</em>{{amount.gainable}}</p>
    <!--<mt-checklist v-model="value" :options="options"></mt-checklist>-->

    <div class="licence-box" v-for="item in licenceList">
      <input type="checkbox" v-model="item.value">
      <label :for="item.id" @click="goToPageLicenceDetail(item.id)">《{{item.title}}》</label>
    </div>
    <div class="ui-button" v-show="showButton">
      <mt-button type="primary" size="large" @click="goToPageWithdrawApplicationSubmit()"
                 :disabled="commitButtonEnable">提现
      </mt-button>
    </div>
    <div class="tips">提现实时发放, 预计24小时内到账。</div>
  </div>
</template>

<script scoped>
  import api from '../../api/index2'
  import apiNew from '../../api/fusion_api'
  import _ from 'lodash'
  import { loadData, defaultPreHandler, boolPreHandler } from '../../common/utils'

  export default {
    // 提现申请
    name: 'WithdrawApplication',
    data () {
      return {
        amount: {
          gainable: ''
        },
        licenceList: [],
        showButton: false
      }
    },
    async created () {
      await loadData(() => {
        return api.getCommissionAmount()
      }, (amount) => {
        this.amount = amount
      }, defaultPreHandler, true)
      await loadData(() => {
        return api.getLicenceList(this.$store.state.person.personId)
      }, (licenceList) => {
        this.licenceList = licenceList
      }, defaultPreHandler, true)
      this.showButton = true
    },
    methods: {
      async goToPageWithdrawApplicationSubmit () {
        for (let item of this.licenceList) {
          await loadData(() => {
            return api.postLicence(item.id)
          }, null, boolPreHandler, true)
        }
        await loadData(() => {
          return api.getLicenceList(this.$store.state.person.personId)
        }, async (licence) => {
          if (licence.length === 0) {
            await loadData(() => {
              // 新接口使用
              return apiNew.person.applyForCash(this.$store.state.person.personId)
            }, (drawAmount) => {
              if (drawAmount) {
                this.$router.push({
                  path: 'WithdrawApplicationSubmit',
                  query: {
                    amount: drawAmount
                  }
                })
              }
            }, defaultPreHandler)
          }
        }, defaultPreHandler, true)
      },
      goToPageLicenceDetail (licenceId) {
        this.$router.push({
          path: 'LicenceDetail',
          query: {
            licenceId
          }
        })
      }
    },
    computed: {
      commitButtonEnable () {
        let len1 = _.filter(this.licenceList, {value: true}).length
        return len1 !== this.licenceList.length
      }
    }
  }
</script>

<style scoped>
  .protocol span {
    color: #26a2ff;
  }

  .withdraw {
    text-align: center;
  }

  .logo-img {
    margin-top: 12%;
  }

  .title {
    padding: 10px 0;
  }

  .money {
    margin-bottom: 5%;
    font-size: 30px;
  }

  .money em {
    font-style: normal;
    font-size: 18px;
    vertical-align: middle;
  }

  .tips {
    font-size: 12px;
    line-height: 1.8;
    margin: 2% auto;
    background: #ffffff;
    width: 80%;
    padding: 2%;
    color: #888888;
    border-radius: 4px;
  }

  .licence-box {
    color: #3396E4;
    font-size: 14px;
  }

  .licence-box input, .licence-box label {
    vertical-align: middle;
  }

</style>
