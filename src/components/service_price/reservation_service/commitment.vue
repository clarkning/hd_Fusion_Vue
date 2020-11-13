<template>
  <div class="commitment_wrap">
    <mt-cell title="服务承诺" class="commitment_title"/>
    <div class="commitment_item_wrap">
      <p
        class="commitment_item"
        v-for="(item, index) in terms"
        :key="index"
      >
        {{item}}
      </p>
    </div>
    <!--权益保障-->
    <div class="interests">
      <h6 class="interests_title interests_common">{{interests.title}}</h6>
      <div class="interests_content interests_common">
        {{interests.content}}
      </div>
    </div>
  </div>
</template>

<script>
import { Cell } from 'mint-ui'

export default {
  name: "commitment",
  components: {
    [Cell.name]: Cell
  },
  computed: {
    terms () {
      return [
        '1. 预约后，2小时内联系，24小时上门',
        '2. 工程师携专业设备，上门提供检测维修服务',
        '3. 维修后保修90天，更换辅件（机器正常）不保修',
        '4. 如有疑问，请咨询客服。电话：400-0810-819'
      ]
    },
    interests () {
      return {
        title: '权益保障',
        content: '为了保障您的合法权益和服务质量，避免不必要的损失，请您切勿与工程师私下交易（否则将丧失平台提供的安全和质量保障）'
      }
    }
  }
}
</script>

<style scoped>
  .commitment_item_wrap {
    padding: 0 10px;
  }
  .commitment_title {
    font-weight: bold;
  }
  .commitment_item {
    padding: 2px 0;
    margin: 0;
    line-height: 1.5;
    color: #646566;
    font-size: 12px;
  }
  .interests {
    background-color: #EA9999;
    margin: 20px 10px 0;
    border-radius: 8px;
  }
  .interests_common {
    padding: 0 15px;
    color: #ffffff;
  }
  .interests_title {
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    color: #ffffff;
    padding-top: 12px;
    padding-bottom: 8px;
  }
  .interests_content {
    padding-bottom: 15px;
  }
</style>
<style>
  .commitment_wrap .mint-cell-wrapper {
    font-size: 12px;
  }
</style>
