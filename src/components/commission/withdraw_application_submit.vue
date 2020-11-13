<template>
  <div class="withdraw">
    <div class="logo-img"><img src="./images/tikuan-pic.png"  width="100"/></div>
    <p class="title">提现申请已提交</p>
    <p class="money">提现金额：￥{{amount}}</p>
    <div class="ui-button">
      <mt-button type="primary" size="large" @click="goToPageCommission()">完成</mt-button>
    </div>
    <div class="tips">提现实时发放, 预计24小时内到账。</div>
  </div>
</template>

<script scoped>
  export default {
    // 提现申请提交
    name: 'WithdrawApplicationSubmit',
    data () {
      return {
        amount: null
      }
    },
    async created () {
      this.amount = Number(this.$route.query.amount)
    },
    methods: {
      goToPageCommission: function () {
        window.history.pushState({}, 'title', '#/login')
        this.$router.push({
          path: 'Commission'
        })
      }
    }
  }
</script>

<style scoped>
  .withdraw{
    text-align: center;
  }
  .logo-img{
    margin-top: 12%;
  }
  .title{
    padding: 10px 0;
    color: #888888;
  }
  .money{
    margin-bottom: 5%;
    font-size: 20px;
  }
  .tips{
    font-size: 12px;
    line-height: 1.8;
    margin:2% auto;
    background: #ffffff;
    width: 80%;
    padding: 2%;
    color: #888888;
    border-radius: 4px;
  }
</style>
