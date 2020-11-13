<template>
  <div class="mine">
    <div class="inf">
      <div class="word">
        <div class="personal">
          <span class="name">{{$store.state.person.name}}</span>
        </div>
        <div v-for="item in person.orgInfo">
          <div class="job_position">{{item.namePath || ''}}{{item.organizationName}} - {{item.position}}</div>
        </div>
      </div>
    </div>
    <div class="link first_img">
      <div @click="goToPageInvoiceList()">
        <mt-cell title="发票" is-link></mt-cell>
      </div>
      <div @click="goToPagePersonInfo()">
        <mt-cell title="个人信息" is-link></mt-cell>
      </div>
    </div>
    <div @click="goToPageActivityFund()" class="mine_help first_img" v-if="hasBonusList">
      <mt-cell title="运营活动资金" is-link></mt-cell>
    </div>
    <div @click="goToPageHelp()" class="mine_help first_img">
      <mt-cell title="帮助" is-link></mt-cell>
    </div>
    <div class="mb_60" v-show="organizationList.length">
      <span class="person_title fv_title">人员管理</span>
      <div v-for="(item, index) in organizationList" :key="index"
           @click="goToPagePersonManage(item.organizationId, item.partnerId, item.organizationName)">
        <mt-cell :title="(item.namePath  || '') + item.organizationName" is-link></mt-cell>
      </div>
    </div>
    <BottomNav :select="selected"></BottomNav>
  </div>
</template>
<script>
  import BottomNav from '../public/bottom_nav.vue'
  import { mapState, mapActions } from 'vuex'
  import { loadData } from '../../common/utils'
  import _ from 'lodash'

  export default {
    name: 'Mine',
    components: {
      BottomNav
    },
    data () {
      return {
        organizationList: [],
        selected: 'user',
        person: {},
        subLevel: '',
        personList: [],
        progress: null,
        subExp: null,
        operatorsFundList: []
      }
    },
    async created () {
      await this.initData()
      await this.getPersonBonusOperators(this.$store.state.person.personId)
    },
    methods: {
      ...mapActions(['getPersonInfo', 'getOrganizationInfo']),
      ...mapActions('operatorFunds', ['getPersonBonusOperators']),
      goToPageHelp: function () {
        this.$router.push({
          name: 'Help',
          query: {}
        })
      },
      goToPagePersonManage (organizationId, partnerId, organizationName) {
        this.$router.push({
          path: 'personManage',
          query: {
            partnerId,
            organizationId,
            organizationName
          }
        })
      },
      goToPagePersonInfo: function () {
        this.$router.push({
          path: 'PersonInfo',
          query: {}
        })
      },
      goToPageInvoiceList: function () {
        this.$router.push({
          path: 'InvoiceList',
          query: {}
        })
      },
      goToPageActivityFund () {
        this.$router.push({
          name: 'operator_fund_list',
          query: {}
        })
      },
      filterSaleManage () {
        let person = _.cloneDeep(this.person.orgInfo)
        let data = _.filter(person, item => {
          let personList = item.positionType.split(' ').join('').split(',')
          return personList.includes('销售管理')
        })
        return data
      },
      async initData () {
        await loadData(() => { return this.getPersonInfo(this.$store.state.person.personId) })
        await this.getOrganizationInfo(this.$store.state.person.personId)
        let person = JSON.parse(JSON.stringify(this.$store.state.person))
        _.forEach(person.orgInfo, function (value) {
          if (value.organizationNamePath) {
            let index = _.indexOf(value.organizationNamePath, '/')
            if (index !== -1) {
              value.namePath = value.organizationNamePath.slice(0, index) + ' - '
            }
          }
        })
        this.person = person
        this.organizationList = this.filterSaleManage()
      }
    },
    computed: {
      ...mapState('operatorFunds', {
        hasBonusList: state => state.operatorsBonusList.length > 0
      })
    }
  }
</script>
<style scoped>
  .org, .job_position {
    line-height: 1.8;
  }

  .inf {
    padding: 4%;
    background: #fff;
    color: #333;
    box-sizing: border-box;
  }

  .inf::after {
    content: '';
    display: block;
    clear: both;
  }

  .portrait img {
    border-radius: 50%;
    width: 100%;
    border: 2px solid #ffffff;
    box-sizing: border-box;
  }

  .word {
    float: right;
    width: 100%;
    box-sizing: content-box;
  }

  .mb_60 {
    margin-bottom: 60px;
  }

  .person_title {
    display: inline-block;
    margin-bottom: 10px;
  }

  .name {
    display: inline-block;
    line-height: 2.5rem;
    font-size: 20px;
    vertical-align: middle;
  }

  .level {
    display: inline-block;
    background: #26a2ff;
    color: #fff;
    font-size: 12px;
    padding: 1px 5px;
    border-radius: 4px;
    margin-left: 4px;
  }

  .progress_level {
    font-size: 14px;
    display: block;
    height: auto;
    overflow: hidden;
    color: #999999;
  }

  .job_position {
    color: #999;
    font-size: 14px;
  }

  .upgrade {
    color: #999;
    font-size: 14px;
    line-height: 1.8;
  }

  .mt-progress {
    height: 15px;
    line-height: 15px;
  }

  @media screen and (width: 320px) {
    .name {
      font-size: 16px;
      line-height: 2rem;
    }

    .upgrade {
      font-size: 12px;
    }
  }

  @media screen and (width: 768px) {
    .name {
      font-size: 25px;
      line-height: 5rem;
    }

    .upgrade {
      font-size: 18px;
      line-height: 2rem;
    }

    .level {
      font-size: 16px;
      padding: 0 6px;
    }
  }

  @media screen and (width: 1024px) {
    .name {
      font-size: 40px;
      line-height: 5rem;
    }

    .upgrade {
      font-size: 30px;
      line-height: 5rem;
    }

    .level {
      font-size: 18px;
      padding: 2px 8px;
    }
  }

  .link {
    margin-top: 10px;
  }

  .progress {
    background: #26a2ff;
    height: 6px;
    width: 80%;
    font-size: 12px;
    border-radius: 5px;
  }

  .bg {
    width: 100%;
    display: inline-block;
    background: #e2e2e2;
    height: 6px;
    line-height: 1rem;
    border-radius: 5px;
  }

  .mine_help {
    /*margin-bottom: 60px;*/
    margin-top: 10px
  }
</style>
