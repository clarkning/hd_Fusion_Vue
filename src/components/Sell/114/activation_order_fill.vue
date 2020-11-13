<template>
  <div>
    <div class="header">待激活产品</div>
    <div class="item_container">
      <div class="item_p">
        <div class="item_img"><img src="/static/iphone.png"></div>
        <div class="item_content">
          <p class="productName">好几十块的</p>
          <p><span class="item_font12 item_color">100元</span></p>
        </div>
      </div>
    </div>
    <div class="remarks">
      <div class="header">用户及设备信息</div>
      <div class="container">
        <mt-field label="姓名" placeholder="请输入客户姓名" :disableClear="true"></mt-field>
        <mt-field label="手机" placeholder="请输入客户手机号码" type="tel" :disableClear="true"></mt-field>
        <mt-field label="购机价格" placeholder="请输入购机价格" :disableClear="true"></mt-field>
        <mt-field label="购机时间" placeholder="请输入购机时间" type="tel" :disableClear="true"></mt-field>
        <mt-field label="品类" placeholder="请输入品类" :disableClear="true"></mt-field>
        <div class="activation-order-fill container_c" @click="goToPageBrand()">
          <div class="content">
            <mt-field label="品牌" placeholder="请选择品类" :disabled="true" :disableClear="true"></mt-field>
          </div>
          <span class="link"></span>
        </div>
        <mt-field label="手机型号" placeholder="请输入手机型号" type="tel" :disableClear="true"></mt-field>
        <mt-field label="IMEI" placeholder="拨打*#06#" type="tel" :disableClear="true"></mt-field>
        <mt-field label="发票编码" placeholder="手机相关发票编码" type="tel" :disableClear="true"></mt-field>
      </div>
      <div class="img_container">
        <div class="pic">
          <div class="img">
            <img src="" alt="">
          </div>
          <p class="title">显示IMEI屏幕照片</p>
        </div>
        <div class="pic">
          <div class="img">
            <img src="" alt="">
          </div>
          <p class="title">购机发票照片</p>
        </div>
      </div>
    </div>
    <div class="fixButton">
      <div class="p_r15 clear">
        <label class="f-l">
          <input class="pay-radio" type="radio" name="licence" value="true">
          <span class="pay-radioInput m-0"></span>
        </label>
        <span class="agreeClause">本人承诺上述信息的真实性，理解并同意<span class="item_button item_color_02">《服务条款》</span>的全部内容</span>
      </div>
      <div class="w_90 mt10">
        <span class="price_buy">￥199</span>
        <mt-button class="buttonBuy" size="normal" type="primary" @click="goToPageAcitvationSuccess()">立即激活</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activation_order_fill',
    methods: {
      goToPageBrand () {
        this.$router.push({
          name: 'hbSelectBrand'
        })
      },
      goToPageAcitvationSuccess () {
        this.$router.push({
          name: 'activation_success'
        })
      }
    }
  }
</script>

<style scoped>

  .activation-tips embed {
    vertical-align: middle;
  }

  .header {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .img_container {
    padding: 10px 0 0 15px;
    font-size: 0;
  }

  .pic {
    width: 29%;
    display: inline-block;
    text-align: center;
    margin-right: calc((13% - 15px) / 3);
  }

  .pic .img {
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 27.8vw;
    background: url('/static/img-bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    border: 1px solid #f4f3f3;
  }

  .pic .title {
    font-size: 12px;
    padding: 10px 0;
    color: #888;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .item_container {
    background: #fff;
    font-size: 12px;
  }

  .container {
    background: #fff;
  }

  .container_c {
    position: relative;
  }

  .item_container:not(:last-child)::after {
    content: " ";
    display: block;
    width: calc(100% - 15px);
    margin-left: 15px;
    height: 1px;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    background: #e5e5e5;
  }

  .item_p {
    padding: 10px 15px;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
  }

  .item_color {
    color: #F15151;
  }

  .item_color_02 {
    color: #3396E4;
  }

  .item_img {
    display: table-cell;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    text-align: center;
    width: 62px;
    height: 62px;
  }

  .item_img img {
    width: 100%;
    height: 100%;
  }

  .item_content {
    line-height: 2;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
    width: 82%;
  }

  .link {
    display: table-cell;
    position: absolute;
    width: 25px;
    right: 0;
    top: 20px;
  }

  .link::after {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 50%;
    position: absolute;
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(45deg);
  }

  .remarks {
    margin-bottom: 110px;
  }

  .fixButton {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    z-index: 1;
    padding-left: 15px;
    padding-top: 10px;
    border-top: 1px solid #d9d9d9;
  }

  .pt_8 {
    padding-top: 8px;
  }

  .buttonBuy {
    width: 60%;
    float: right;
    border-radius: 0
  }

  .f-l {
    float: left;
  }

  .agreeClause {
    font-size: 14px;
    margin-left: 5px;
    line-height: 1.5;
    width: calc(100% - 24px);
    float: right;
    color: #666;
  }

  .m-0 {
    margin-right: 0;
    margin-top: 0;
  }

  .pay-radioInput {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 100%;
    display: inline-block;
    height: 16px;
    margin-top: -1px;
    vertical-align: middle;
    width: 16px;
    line-height: 1;
  }

  .pay-radio {
    display: none;
  }

  .pay-radio:checked + .pay-radioInput:after {
    background-color: #3396E4;
    border-radius: 100%;
    content: "";
    display: inline-block;
    height: 12px;
    margin: 2px;
    width: 12px
  }

  .price_buy {
    margin-left: 29px;
    font-size: 18px;
    vertical-align: middle;
    margin-top: 5px;
    display: inline-block;
    color: #F15151;
  }

  .item_button {
    font-size: 14px;
    padding: 0;
    background: #fff;
    border: none;
    outline: none;
    word-break: normal;
    width: auto;
    word-wrap: break-word;
    overflow: hidden;
  }

  .mt10 {
    margin-top: 10px;
  }

  .p_r15 {
    padding-right: 15px;
  }
</style>
