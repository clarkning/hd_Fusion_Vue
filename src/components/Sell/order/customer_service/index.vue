<template>
  <div>
    <div @click="goToPageContractApply" class="applyBtn">
      <mt-button type="primary" size="large">代用户申请合同发票</mt-button>
    </div>
    <div @click="goToPageContractEdit" class="applyBtn">
      <mt-button type="primary" size="large">申请合同信息修改</mt-button>
    </div>
    <applicationRecord></applicationRecord>
  </div>
</template>

<script>
  import applicationRecord from './application_record'
  export default {
    name: 'customerService',
    components: {applicationRecord},
    methods: {
      goToPageContractApply () {
        this.$router.push({
          name: 'contractApply',
          query: {
            serviceContractId: this.$route.query.serviceContractId
          }
        })
      },
      goToPageContractEdit () {
        this.$router.push({
          name: 'contractEdit',
          query: {
            serviceContractId: this.$route.query.serviceContractId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .applyBtn {
    width: 90%;
    margin: 10px auto;
  }
</style>
