<template>
  <div>
    <div id="viewerContainer">
      <div id="viewer" class="pdfViewer"></div>
    </div>
    <pdfView v-if="pdfUrl" :PdfUrl="pdfUrl"></pdfView>
    <div class="download_invoice mt container">
      <mt-button size="large" type="primary" @click="downloadPdf()">下载电子发票</mt-button>
    </div>
  </div>
</template>

<script>
  import api from '../../../../../api/index2'
  import { loadData, defaultPreHandler } from '../../../../../common/utils'
  import pdfView from '../PdfView'

  export default {
    name: 'InvoiceInquiry',
    data () {
      return {
        pdfUrl: null,
        contractId: this.$route.query.contractId
      }
    },
    created () {
      this.getContractPdf()
    },
    methods: {
      async getContractPdf () {
        await loadData(() => {
          return api.getInvoice(this.contractId)
        }, (res) => {
          this.pdfUrl = res.url
        }, defaultPreHandler)
      },
      downloadPdf () {
        window.location.href = this.pdfUrl
      }
    }
  }
</script>

<style scoped>
  @import "https://cdn.jsdelivr.net/npm/pdfjs-dist@1.9.646/web/pdf_viewer.css";

  .eleInvoice img {
    width: 100%;
  }

  #viewerContainer {
    margin: auto;
    position: absolute;
    overflow: auto;
    width: 100%;
    top: 0;
    bottom: 4rem;
    left: 0;
    right: 0;
  }

  .download_invoice {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    position: fixed;
    bottom: 10px;
  }

</style>
