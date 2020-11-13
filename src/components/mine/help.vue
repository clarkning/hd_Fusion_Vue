<template>
  <div class="help_box">
    <div class="bg">
      <h4>提示</h4>
      <ul class="color-888">
        <li>1、佣金计算延保销售、活动奖励、下级贡献、销售退单的所有金额，销售退单会产生负的佣金记录。</li>
        <li>2、【可提】是系统已经审核通过的订单佣金金额，【待审】是还未进行审核的订单佣金金额，每周一审核。</li>
        <li>3、点击【可提】【累计】【本月】【待审】均可查看明细。</li>
        <li>4、其他问题可企业号后台咨询我们的客服人员。</li>
      </ul>
    </div>

    <div class="bg">
      <h4>为何要绑定银行卡?</h4>
      <p class="color-888">根据微信官方要求，微信用户需要绑定银行卡完成实名认证，佣金才能通过微信付款到您的账户。</p>
    </div>

    <div class="bg">
      <h4>如何绑定银行卡?</h4>
      <div class="link_color" @click="goToPageWeChatBind()">微信如何绑定银行卡</div>
    </div>

    <div class="bg">
      <h4>为何要上传身份证信息及照片？</h4>
      <p class="color-888">众安保修代您缴纳个人所得税，证件信息是报税必备资料。</p>
      <div class="t-c link_color" @click="goToPagePersonInfo()">现在就去维护</div>
    </div>

    <div class="bg" id="geo">
      <h4>如何开启手机定位服务？</h4>
      <p class="letter">Android版本：</p>
      <ul class="color-888">
        <li>1、在手机【设置】中开启定位服务；</li>
        <li>2、在手机设置中的【应用管理】或【授权管理】页面找到微信；</li>
        <li>3、将微信获取位置权限设置为【允许】或【始终允许】。</li>
      </ul>
      <p class="letter">iOS版本：</p>
      <ul class="color-888">
        <li>1、前往“设置”>“隐私”>“定位服务”。</li>
        <li>2、确保“定位服务”已打开。</li>
        <li>3、向下滚动并找到“微信”。</li>
        <li>4、将微信获取位置权限设置为【始终】。</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Help',
    data () {
      return {
        flag: true
      }
    },
    beforeRouteEnter (to, from, next) {
      if (from.name === 'OrderFilling' || from.name === 'insurance_claim') {
        next(vm => {
          let jump = document.querySelector('#geo')
          let total = jump.offsetTop
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
          window.pageYOffset = total
          // 通过 `vm` 访问组件实例
        })
      } else {
        next()
      }
    },
    methods: {
      goToPageWeChatBind () {
        window.location.href = 'https://jingyan.baidu.com/article/215817f7e842a21edb142344.html'
      },
      goToPagePersonInfo () {
        this.$router.push({
          name: 'PersonInfo'
        })
      }
    }
  }
</script>
<style scoped>
  .bg{
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    width: 90%;
    margin: 10px auto;
    font-size: 14px;
    line-height: 2;
  }
  .link_color{
    color: #26a2ff;
  }
  .color-888{
    color: #888888;
  }
  .help_box h4{
    font-weight: normal;
  }
  .letter{
    letter-spacing: 1px;
  }
  li {
    list-style-type: none;
  }
</style>
