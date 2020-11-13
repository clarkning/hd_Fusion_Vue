<template>
  <div class="fund-detail">
    <div class="fund-detail-header">
      <div class="fund-detail-header-content">
        <h2 class="event-name">{{operatorBonus.eventName}}</h2>
        <p>{{operatorBonus.partner}}</p>
        <h1 class="money">{{operatorBonus.balance}}</h1>
        <p>{{operatorBonus.text}}</p>
      </div>
    </div>
    <div class="fund-detail-content">
      <mt-navbar v-model="selected" :fixed="true" class="navbar_box">
        <mt-tab-item id="issueRedPacketRecord" class="bonus-caption">发红包记录</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" :class="{msg_tab_box: home}">
        <div class="loadMoreRedPacketRecord">
          <mt-tab-container-item id="issueRedPacketRecord">
            <div class="table" v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading" infinite-scroll-distance="300">
              <div v-for="item in issuedBonusList" @click="goToPageShareOrder(item.orderId)">
                <mt-cell  :value="item.amount" is-link>
                  <span slot="title">
                    {{item.releaseTime | formatTime}} {{item.receiverName}}
                  </span>
                </mt-cell>
              </div>
            </div>
            <div v-if="issuedBonusList.length > 0">
              <div class="load noMore" v-show="noIssuedBonus && home">已无更多</div>
              <div class="load" v-show="loading && home">
                <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
                正在加载
              </div>
            </div>
            <div v-else class="null_data">
              <div class="null"></div>
              <p>亲，暂无发红包记录哦~~</p>
            </div>
          </mt-tab-container-item>
        </div>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import { createNamespacedHelpers } from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('operatorFunds')

  export default {
    name: 'operator_fund_detail',
    data () {
      return {
        selected: 'issueRedPacketRecord',
        loading: false,
        noMore: true,
        home: false,
        noIssuedBonus: true,
        operatorBonus: {
          operatorId: '',
          partner: '',
          eventName: '',
          balance: '',
          text: ''
        },
        params: {
          bonusEventOperatorId: '',
          limit: 20,
          page: 1
        }
      }
    },
    async created () {
      this.operatorBonus.operatorId = this.$route.query.id
      this.operatorBonus.partner = this.$route.query.partner
      this.operatorBonus.eventName = this.$route.query.eventName
      this.operatorBonus.balance = this.$route.query.balance
      this.operatorBonus.text = this.$route.query.text

      this.params.bonusEventOperatorId = this.operatorBonus.operatorId
      await this.loadOperatorBonusList()
    },
    methods: {
      ...mapActions(['getOperatorBonusList']),
      goToPageShareOrder (orderId) {
        this.$router.push({
          name: 'share_index',
          query: {
            orderId
          }
        })
      },
      async loadOperatorBonusList () {
        await this.getOperatorBonusList(this.params)
      },
      async loadMore () {
        if (this.noMore) return
        this.loading = true
        this.params.page += 1
        await this.loadOperatorBonusList()
        this.loading = false
      }
    },
    computed: mapState([
      'issuedBonusList'
    ]),
    filters: {
      formatTime (time) {
        return moment(time).format('YYYY-MM-DD HH:mm')
      }
    }
  }
</script>

<style scoped>
  .bonus-caption {
    padding-left: 15px;
    text-align: left;
  }

  .fund-detail-header {
    background: #3396E4;
    color: #ffffff;
    width: 100%;
    height: 195px;
    position: fixed;
    top: 0;
    z-index: 99;
  }

  .fund-detail-header-content {
    text-align: center;
    height: 150px;
    padding-top: 20px;
  }

  .fund-detail-header-content p {
    font-size: 14px;
    margin-top: 5px;
  }

  .fund-detail-header-content .money {
    padding: 15px 0 0;
    font-weight: normal;
    font-size: 50px;
  }

  .event-name {
    font-weight: normal;
  }

  .fund-detail-header-content h4 {
    font-weight: normal;
  }

  .navbar_box .mint-tab-ite.m-label {
    font-size: 15px;
  }

  .fund-detail-content {
    position: absolute;
    top: 195px;
    overflow-y: scroll;
    width: 100%;
  }

  .fund-detail-content .mint-navbar.is-fixed {
    right: 0;
    left: 0;
    position: fixed;
    top: 195px
  }

  .loadMoreRedPacketRecord {
    width: 100%;
  }

  .null-data {
    text-align: center;
    padding: 20% 0 5%;
  }

  .null-data img {
    width: 50%
  }

  .null-data p {
    color: #888;
    font-size: 14px
  }

  .table {
    position: relative;
    margin-top: 50px;
  }

  .table-item {
    display: flex;
  }

  .table-item span {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  .msg_tab_box {
    margin-top: 50px;
    margin-bottom: 10px;
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    margin-bottom: 0;
    color: #888;
  }

</style>
