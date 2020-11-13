<template>
  <div class="operator-fund">
    <div class="mine_find_list">
      <div v-for="item in operatorsBonusList" :key="item.id"
           @click="goToPageOperatorBonusDetail(item.id, item.partner.name, item.bonusEvent.name, item.balance)">
        <div>
          <mt-cell :title="item.bonusEvent.name" :value="`￥${item.balance}`" is-link>
          </mt-cell>
          <p class="partner">{{item.partner.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {mapState, mapActions} = createNamespacedHelpers('operatorFunds')

export default {
  name: 'operator_fund_list',
  async created () {
    await this.getPersonBonusOperators(this.$store.state.person.personId)
  },
  methods: {
    ...mapActions(['getPersonBonusOperators']),
    goToPageOperatorBonusDetail (id, partner, eventName, balance) {
      this.$router.push({
        name: 'operator_fund_detail',
        query: {
          id: id,
          partner: partner,
          eventName: eventName,
          balance: balance,
          text: '运营资金余额'
        }
      })
    }
  },
  computed: mapState([
    'operatorsBonusList'
  ])
}
</script>

<style scoped>
  .partner {
    width: 100%;
    background: #fff;
    text-indent: 1.2em;
    font-size: 13px;
    color: #888;
    line-height: 20px;
  }

  .mine_find_list {
    margin-top: 10px
  }

  .operator-fund >>> .mint-cell-text {
    font-size: 16px;
  }
</style>
