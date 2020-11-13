<template>
  <div class="bg">
    <div class="padding">
      <h2 class="center">提交完成</h2>
      <div class="mt_10">
        <div v-for="item in list">
          <div v-if="item.customerServiceType === CustomerServiceType.信息变更 && item.success" class="">
            <p>合同信息修改申请提交成功</p>
            <p>我们将在3个工作日内审核并完成信息修改。</p>
          </div>
          <div v-if="item.customerServiceType === CustomerServiceType.邮寄纸质合同 && item.success" class="">
            <p>纸质合同申请成功</p>
            <p>我们会在3个工作日内发货。可在【合同详情】页面查看物流信息。</p>
          </div>
          <div v-if="item.customerServiceType === CustomerServiceType.电子发票">
            <div v-if="item.success">
              <p>电子发票申请成功</p>
              <p>可在【合同详情】页面查看电子发票。</p>
            </div>
            <div v-else class="redMsg">
              <p>电子发票申请失败</p>
              <p>由于系统繁忙，电子发票申请失败，请重新提交。</p>
            </div>
          </div>
          <div v-if="item.customerServiceType === CustomerServiceType.电子合同 && item.success">
            <p>电子合同申请成功</p>
            <p>可在【合同详情】页面查看和下载电子合同。</p>
          </div>
          <div v-if="item.customerServiceType === CustomerServiceType.邮寄纸质发票 && item.success">
            <p>纸质发票申请成功</p>
            <p>我们会在3个工作日内发货。可在【合同详情】页面查看物流信息。</p>
          </div>
        </div>
      </div>

      <div class="bottom_fixed">
        <mt-button class="back" type="primary" @click="$router.go(-2)">返回</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button } from 'mint-ui'
  import { CustomerServiceType } from '../../../../../common/enum/zwsResource'
  import _ from 'lodash'
  import { createNamespacedHelpers } from 'vuex'

  const {mapState} = createNamespacedHelpers('customerService')

  export default {
    name: 'submitComplete',
    components: {
      [Button.name]: Button
    },
    data () {
      return {
        list: [],
        CustomerServiceType: CustomerServiceType
      }
    },
    created () {
      this.getList()
    },
    mounted () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    methods: {
      getList () {
        let list = _.cloneDeep(this.storeSubmitCustomerService)
        _.forEach(list, item => {
          if (item.customerServiceType === CustomerServiceType.邮寄纸质发票及纸质合同) {
            let option = _.cloneDeep(item)
            option.customerServiceType = CustomerServiceType.邮寄纸质发票
            list.push(_.cloneDeep(option))
            option.customerServiceType = CustomerServiceType.邮寄纸质合同
            list.push(_.cloneDeep(option))
          }
        })
        this.list = list
      }
    },
    computed: {
      ...mapState({
        storeSubmitCustomerService: state => state.submitCustomerService
      })
    }

  }
</script>

<style scoped>
  .bg {
    background-color: transparent;
  }

  .center {
    font-weight: normal;
    margin-top: 20px;
    text-align: center;
    margin-bottom: 40px;
  }

  .back {
    width: 100%;
  }

  .bottom_fixed {
    position: fixed;
    width: 100%;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  .mt_10 {
    margin-top: 20px;
    color: #888;
  }

  .padding {
    padding: 10px 10px 50px;
  }

  p {
    line-height: 30px;
  }

  .redMsg {
    color: #df5000;
  }
</style>
