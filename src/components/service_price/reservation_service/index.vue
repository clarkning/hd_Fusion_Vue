<template>
  <div class="reservation_service">
    <!--步骤条-->
    <step :active="3" :category="stepCategory"/>
    <!--服务流程-->
    <process :serviceType="stepCategory.serviceType"/>
    <div>
      <!--用户信息-->
      <userMessageCollect :stepCategory="stepCategory" v-if="stepCategory.serviceType === serviceType.电器回收" ref="userMessageCollect"></userMessageCollect>
      <div  v-else class="image">
        <img src="../../../../static/zwserwei.jpg" alt="">
        <p class="tip">请用户关注服务号在线申请服务</p>
        <div class="confirmButton">
          <mt-button type="primary" size="large" style="margin-top: 10px;" @click.native="redirectHome">
            返回首页
          </mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {Button, Indicator} from 'mint-ui'
import step from "../price_standard/step"
import process from "./process"
import commitment from "./commitment"
import userMessageCollect from './user_message_ collect'
import wechatlib from "weixin-js-sdk";
import {defaultPreHandler, loadData} from "../../../common/utils";
import api from "../../../api/index2";
import {ServiceType} from 'enum/zwsResource'

export default {
  name: 'reservation_service',
  components: {
    step,
    process,
    commitment,
    userMessageCollect,
    [Button.name]: Button
  },
  data() {
    return {
      indicatorLoading: false,
      serviceType:ServiceType,
      stepCategory: {
        category: this.$route.params.category,
        serviceType: _.toNumber(this.$route.params.serviceType),
        attributes:this.$route.params.attributes,
        bottomPrice: this.$route.params.bottomPrice,
        estimatedAmount:this.$route.params.estimatedAmount,
      },
      serviceInfo: {
        tel: '4000810819',
        online: 'https://chat.sobot.com/chat/pc/v2/index.html?sysnum=0c2a44a2c29d44e69aec539563080f7e&channelid=2'
      }
    }
  },
  methods: {
    redirectHome () {
      this.$router.push({
        name: 'home'
      })
    },
  }
}
</script>

<style scoped>
  .reservation_service {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    font-size: 12px;
    position: relative;
  }
  .btn_wrap {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 10px 20px 30px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .tip{
    margin-top: 10px;
    color:#bbb;
  }
  .confirmButton{
    width: 80%;
    margin-left: 10%;
    text-align: center;
    margin-top: 60px;
  }
  .image{
    text-align: center;
  }
  .bottom_box {
    width: 100%;
    height: 132px;
  }
</style>
