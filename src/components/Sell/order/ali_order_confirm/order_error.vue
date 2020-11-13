<template>
  <div class="order-error">
    <i class="iconfont icon-gantanhao" aria-hidden="true"></i>
    <div class="box"><span class="fail">{{ title }}</span></div>
    <div class="err">错误代码：{{code}}</div>
    <div class="err">{{returnMessage}}</div>
  </div>
</template>

<script>
  export default {
    name: 'OrderError',
    data () {
      return {
        returnMessage: '',
        code: null,
        title: ''
      }
    },
    created () {
      let title = ''
      if (this.$route.query.type === 1) {
        title = '获取支付表单失败'
      } else {
        title = '获取订单失败'
      }
      this.title = title
      let message = this.$route.query.message
      this.returnMessage = decodeURI(message)
      this.code = this.$route.query.code
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fa-exclamation-circle:before {
    content: "\f06a";
    color: #de3834;
    font-size: 5rem;
  }
  .order-error{
    width: 100%;
    display:inline-block;
    margin-top: 100px;
    text-align: center;
  }
  .box{
    display: inline-block;
    height: 90px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .fail{
    font-size: 30px;
    color: #de3834;
  }
  .err{
    width: 80%;
    font-size: 18px;
    font-family: STHeiti;
    margin: 20px auto 0;
  }
</style>
