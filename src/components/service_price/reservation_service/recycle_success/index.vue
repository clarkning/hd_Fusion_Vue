<template>
  <div class="image">
    <h3 class="title">提交成功</h3>
    <div class="mb_10">
      <p>回收员将在30分钟内联系</p>
      <p>并在24小时内上门</p>
    </div>
    <img src="../../../../../static/zwserwei.jpg" alt="">
    <p class="tip">请用户扫码关注服务号，随时查看回收进度</p>
    <div class="confirmButton">
      <mt-button class="button" type="primary" size="large" style="margin-top: 10px;" @click.native="redirectHome">返回首页</mt-button>
      <mt-button class="button" type="primary" size="large" style="margin-top: 10px;" @click.native="redirectMyOrder">查看订单</mt-button>
    </div>
  </div>
</template>

<script>
  import {Button} from 'mint-ui'

  export default {
    name: "index",
    components: {
      [Button.name]: Button,
    },
    data() {
      return {
        recycleOrderId: this.$route.query.recycleOrderId,
      }
    },
    methods: {
      redirectMyOrder () {
        this.$router.replace({
          name: 'OrderDetailRecycle',
          query: {
            recycleOrderId:this.recycleOrderId
          }
        })
        window.localStorage.removeItem('recycleData')
      },
      redirectHome () {
        this.$router.push({
          name: 'home'
        })
        window.localStorage.removeItem('recycleData')
      },
    },
  }
</script>

<style scoped>
  .image {
    text-align: center;
  }

  .confirmButton{
    display: flex;
    margin-top: 20%;
    justify-content: space-around;
  }
  .button{
    width: 40%;
  }
  .title {
    margin-top: 50px;
    color:#3396E4;
    margin-bottom: 30px;
  }
.mb_10{
  margin-bottom: 20px;
}
  .tip {
    margin-top: 10px;
    color: #bbb;
  }
</style>
