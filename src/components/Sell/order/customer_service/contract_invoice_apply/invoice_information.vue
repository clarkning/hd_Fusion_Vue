<template>
  <div class="invoice">
    <div class="title invoiceInformation">
      <mt-cell title="发票信息">
        <span @click="goToPageIntroduction" v-if="electronicInvoice">什么是电子发票?</span>
      </mt-cell>
    </div>
    <div class="content">
      <mt-cell title="发票抬头" value="个人"></mt-cell>
      <mt-cell title="发票内容" value="服务费"></mt-cell>
    </div>
  </div>

</template>

<script>
  import { Cell } from 'mint-ui'

  export default {
    name: 'index',
    components: {
      [Cell.name]: Cell
    },
    props: {
      information: Boolean
    },
    data () {
      return {
        electronicInvoice: ''
      }
    },
    created () {
      this.electronicInvoice = this.information
    },
    methods: {
      goToPageIntroduction () {
        this.$router.push({
          name: 'introductionElectronicInvoice'
        })
      }
    }
  }
</script>

<style scoped>
  .title p {
    font-size: 14px;
    color: #888;
  }

  .invoiceInformation, .mint-cell-text {
    color: #888;
  }

  .content {
    font-size: 14px;
  }
</style>
