<template>
    <div class="activation_success">
      <embed src="/static/activation_success_icon.svg" type="">
      <p>您购买的欢乐保服务激活成功，<br/>订单详情请见“合同查询”</p>
    </div>
</template>

<script>
  export default {
    name: 'activation_success'
  }
</script>

<style scoped>
  .activation_success{
    text-align: center;
    font-size: 14px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .activation_success embed{
    width: 20% ;
    margin-top: 30%;
  }
  .activation_success p{
    margin-top: 20px;
    color: #666;
    padding: 0 20px;
    line-height: 1.8;
  }
</style>
