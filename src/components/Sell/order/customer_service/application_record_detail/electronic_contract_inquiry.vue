<template>
  <div>
    <div id="viewerContainer">
      <div id="viewer" class="pdfViewer"></div>
    </div>
    <pdfView v-if="pdfUrl" :PdfUrl="pdfUrl"></pdfView>
    <div class="download_invoice">
      <mt-button size="large" type="primary" @click="downloadPdf()">免费下载电子合同</mt-button>
    </div>
  </div>
</template>

<script>
  import pdfView from '../PdfView'
  import { FS_API_ROOT } from '../../../../../api/config'

  export default {
    name: 'electronic_contract',
    async created () {
      this.getContractPdf()
    },
    data () {
      return {
        pdfUrl: null,
        contractId: this.$route.query.contractId
      }
    },
    methods: {
      async getContractPdf () {
        this.pdfUrl = `${FS_API_ROOT}/serviceContract/${this.contractId}/contractPdf`
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
    top: 1rem;
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
