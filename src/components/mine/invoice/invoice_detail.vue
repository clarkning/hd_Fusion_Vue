<template>
  <div class="invoice-list">
    <div class="invoice-list-body">
      <mt-cell class="invoice-number" title="发票代码" :value="invoiceDetail.code"></mt-cell>
      <mt-cell title="发票号码" :value="invoiceDetail.number"></mt-cell>
      <mt-cell title="发票金额" :value="invoiceDetail.amount"></mt-cell>
      <mt-cell title="状态">
        <span
          :class="{database: invoiceDetail.statusStr === '待确认' || invoiceDetail.statusStr === '审核未通过',star: invoiceDetail.statusStr === '新增',leaf: invoiceDetail.statusStr === '已冲抵',bars: invoiceDetail.statusStr === '确认'}">{{invoiceDetail.statusStr}}</span>
      </mt-cell>
      <div class="ui-button" v-if="invoiceDetail.statusStr === '新增' || invoiceDetail.statusStr === '待确认'">
        <mt-button type="primary" size="large" @click="deleteInvoice(invoiceDetail.id)">删除</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {MessageBox, Toast} from 'mint-ui'
  import api from '../../../api/index2'
  import {loadData, defaultPreHandler, boolPreHandler} from '../../../common/utils'

  export default {
    name: 'InvoiceDetail',
    data () {
      return {
        invoiceId: null,
        invoiceDetail: {},
        page: 1
      }
    },
    async created () {
      this.invoiceId = Number(this.$route.query.invoiceId)
      await this.getDetail()
    },
    methods: {
      async getDetail () {
        let vue = this
        await loadData(() => {
          return api.getInvoiceDetail(vue.invoiceId)
        }, data => {
          this.invoiceDetail = data
        }, defaultPreHandler)
      },
      deleteInvoice (id) {
        let vue = this
        MessageBox.confirm('您确定要删除该发票吗？').then(async action => {
          await loadData(() => {
            return api.getDeleteInvoice(id)
          }, res => {
            if (res) {
              Toast({
                message: '发票删除成功',
                position: 'middle',
                duration: 1000
              })
              setTimeout(function () {
                vue.$router.go(-1)
              }, 1000)
            }
          }, boolPreHandler, false, '正在删除')
        })
      }
    }
  }
</script>
<style scoped>

</style>
