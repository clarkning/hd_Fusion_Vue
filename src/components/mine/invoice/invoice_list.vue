<template>
  <div class="invoice-box">
    <div class="invoice-head">
      <div class="ui-flex">
        <p>需开金额</p>
        <span>{{invoiceSummary.invoiceAmount}}</span>
      </div>
      <div class="ui-flex">
        <p>待确认金额</p>
        <span>{{invoiceSummary.pendingInvoiceAmount}}</span>
      </div>
    </div>
    <div class="invoice-info">
      <mt-cell title="公司" value="北京大诚保科技有限公司"></mt-cell>
      <mt-cell title="纳税人识别号" value="91120222MA078G000F"></mt-cell>
      <mt-cell title="开票内容" value="维修服务费 或 服务费"></mt-cell>
      <mt-cell class="mt-line-height" title="邮寄地址">
        <span>北京市朝阳区北京像素北区11号楼1325 马女士收 131 2699 8321</span>
      </mt-cell>
    </div>
    <div class="specialInvoice-link" @click="goToPageSpecialInvoice()">
      <mt-cell title="专票信息"></mt-cell>
    </div>
    <div class="invoice-list" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="300">
      <div class="invoice-list-body" v-for="item in invoiceList" :key="item.id" @click="goToPageInvoiceDetail(item.id)">
        <mt-cell class="invoice-number" title="发票号码" :value="item.number"></mt-cell>
        <mt-cell title="发票金额" :value="item.amount"></mt-cell>
        <mt-cell title="提交时间" :value="item.submitTime.slice(0, 10)"></mt-cell>
        <mt-cell title="状态">
          <span
            :class="{database: item.statusStr === '待确认'|| item.statusStr === '审核未通过',star: item.statusStr === '新增',leaf: item.statusStr === '已冲抵',bars: item.statusStr === '确认'}">{{item.statusStr}}</span>
        </mt-cell>
        <mt-cell v-if="item.statusStr === '审核未通过'" title="拒绝原因" :value="item.denialReason"></mt-cell>
      </div>
      <div v-if="invoiceList.length === 0" class="null_data">
        <div class="null"></div>
        <p>暂无发票~~</p>
      </div>
      <div v-else>
        <div class="load noMore" v-show="noMore">已无更多</div>
        <div class="load" v-show="loading">
          <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
          正在加载
        </div>
      </div>
    </div>


    <div class="bottom-button" @click="goToPageSubmitInvoice()">
      <mt-button type="primary" size="large">上传发票</mt-button>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index2'
  import {loadData, defaultPreHandler} from '../../../common/utils'

  export default {
    name: 'InvoiceList',
    data () {
      return {
        page: 1,
        invoiceList: [],
        noMore: true,
        loading: false,
        invoiceSummary: {}
      }
    },
    async created () {
      await loadData(() => {
        return api.getInvoiceSummary()
      }, data => {
        this.invoiceSummary = data
      }, defaultPreHandler, true)
      await loadData(() => {
        return api.getInvoiceList(this.page)
      }, data => {
        this.invoiceList = data.invoiceDtos
      }, defaultPreHandler)
      this.page = Math.ceil(this.invoiceList.length / 5)
      this.noMore = this.invoiceList.length < (5 * this.page)
    },
    methods: {
      goToPageSpecialInvoice: function () {
        this.$router.push({
          path: 'SpecialInvoice',
          query: {}
        })
      },
      goToPageInvoiceDetail: function (invoiceId) {
        this.$router.push({
          path: 'InvoiceDetail',
          query: {
            invoiceId
          }
        })
      },
      goToPageSubmitInvoice: function () {
        this.$router.push({
          path: 'SubmitInvoice',
          query: {}
        })
      },
      async loadMore () {
        if (this.noMore) return
        this.loading = true
        this.page += 1
        let vue = this
        await loadData(() => {
          return api.getInvoiceList(this.page)
        }, data => {
          vue.invoiceList.push(...data.invoiceDtos)
        }, defaultPreHandler, true)
        vue.noMore = vue.invoiceList.length < (5 * this.page)
        this.loading = false
      }
    }
  }
</script>
<style scoped>
  .invoice-number {
    position: relative;

  }

  .invoice-head {
    display: flex;
    text-align: center;
    width: 100%;
    background: #ffffff;
    position: fixed;
    top: 0;
    z-index: 99;
    border-bottom: 1px solid #e5e5e5;
  }

  .invoice-head .ui-flex {
    flex: 1;
    padding: 8px 0;
  }

  .invoice-head .ui-flex:first-child {
    border-right: 1px solid #e5e5e5;
  }

  .invoice-head .ui-flex p {
    color: #888;
    font-size: 12px;
    line-height: 2;
  }

  .invoice-head .ui-flex span {
    line-height: 1.5;
  }

  .invoice-info {
    margin-top: 75px;
  }

  .specialInvoice-link {
    text-align: center;
    color: #26a2ff;
  }

  .invoice-list {
    padding-bottom: 25px;
  }

  .invoice-list .invoice-list-body {
    margin-top: 10px;

  }
</style>
