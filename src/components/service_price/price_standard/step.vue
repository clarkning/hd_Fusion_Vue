<template>
  <div
    class="my_steps">
    <van-steps
      :active="active"
      active-color="#409EFF"
      active-icon="arrow"
    >
      <van-step>
        <div>
          <div class="fize14">服务类型</div>
          <div class="placeholder">
            <div v-if="category">{{ category.category + serviceTypeShow[category.serviceType]}}</div>
            <div v-else>请选择</div>
          </div>
        </div>
      </van-step>
      <van-step>
        <div class="fize14">价格标准</div>
        <div v-if="active !== 0" class="placeholder">
          <div v-if="active === 1">请选择</div>
          <div v-else>已报价</div>
        </div>
      </van-step>
      <van-step>
        <div class="fize14">预约服务</div>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
  import {Step, Steps} from "vant";
  import {ServiceTypeShow} from 'enum/zwsResource'
  import _ from 'lodash'

  export default {
    name: "step",
    components: {
      [Step.name]: Step,
      [Steps.name]: Steps,
    },
    data() {
      return {
        serviceTypeShow: _.invert(ServiceTypeShow)
      }
    },
    props: {
      active: {
        type: Number,
        default: 1
      },
      category: Object
    },
  }
</script>

<style scoped>
  .placeholder {
    color: #aaa;
    font-size: 14px;
  }
  .fize14{
    font-size: 14px;
    padding-bottom: 2px;
  }
  .my_steps >>> .van-step--finish .van-step__circle, .van-step--finish .van-step__line{
    background-color: #409EFF !important
  }

</style>
