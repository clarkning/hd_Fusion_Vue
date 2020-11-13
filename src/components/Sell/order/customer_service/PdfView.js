import Vue from 'vue'
// 注册
Vue.component('pdfView', {
  props: {
    PdfUrl: {type: String, required: true},
    ScaleValue: {default: 'auto'}
  },
  created () {
    var pdfJsHost = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@1.9.646'

    var jsStr = '\'use strict\';\n' +
      'if (!PDFJS.PDFViewer || !PDFJS.getDocument) {\n' +
      '  alert(\'Please build the pdfjs-dist library using\\n\' +\n' +
      '        \'  `gulp dist-install`\');\n' +
      '}\n' +
      'PDFJS.useOnlyCssZoom = true;\n' +
      'PDFJS.disableTextLayer = true;\n' +
      'PDFJS.workerSrc = \'' + pdfJsHost + '/build/pdf.worker.js\';\n' +
      'PDFJS.cMapUrl = \'' + pdfJsHost + '/cmaps/\'; \n' +
      'PDFJS.cMapPacked = true;\n' +
      '\n' +
      'var DEFAULT_URL = \'' +
      this.PdfUrl + '\';\n' +
      'var DEFAULT_SCALE_DELTA = 1.1;\n' +
      'var MIN_SCALE = 0.25;\n' +
      'var MAX_SCALE = 10.0;\n' +
      'var DEFAULT_SCALE_VALUE = \'' + this.ScaleValue + '\';\n' +
      // 'var DEFAULT_SCALE_VALUE = \'auto\';\n' +
      '\n' +
      'var PDFViewerApplication = {\n' +
      '  pdfLoadingTask: null,\n' +
      '  pdfDocument: null,\n' +
      '  pdfViewer: null,\n' +
      '  pdfHistory: null,\n' +
      '  pdfLinkService: null,\n' +
      '  open: function (params) {\n' +
      '  PDFViewerApplication.initUI();' +
      '    if (this.pdfLoadingTask) {\n' +
      '      // We need to destroy already opened document\n' +
      '      return this.close().then(function () {\n' +
      '        // ... and repeat the open() call.\n' +
      '        return this.open(params);\n' +
      '      }.bind(this));\n' +
      '    }\n' +
      '    var url = params.url;\n' +
      '    var self = this;\n' +
      '    // Loading document.\n' +
      '    var loadingTask = PDFJS.getDocument(url);\n' +
      '    this.pdfLoadingTask = loadingTask;\n' +
      '\n' +
      '    loadingTask.onProgress = function (progressData) {\n' +
      '      self.progress(progressData.loaded / progressData.total);\n' +
      '    };\n' +
      '\n' +
      '    return loadingTask.promise.then(function (pdfDocument) {\n' +
      '      // Document loaded, specifying document for the viewer.\n' +
      '      self.pdfDocument = pdfDocument;\n' +
      '      self.pdfViewer.setDocument(pdfDocument);\n' +
      '      self.pdfLinkService.setDocument(pdfDocument);\n' +
      '      self.pdfHistory.initialize(pdfDocument.fingerprint);\n' +
      '    }, function (exception) {\n' +
      '      var message = exception && exception.message;\n' +
      '      var loadingErrorMessage;\n' +
      '\n' +
      '      if (exception instanceof PDFJS.InvalidPDFException) {\n' +
      '        // change error message also for other builds\n' +
      '        loadingErrorMessage = \'Invalid or corrupted PDF file.\';\n' +
      '      } else if (exception instanceof PDFJS.MissingPDFException) {\n' +
      '        // special message for missing PDFs\n' +
      '        loadingErrorMessage = \'Missing PDF file.\';\n' +
      '      } else if (exception instanceof PDFJS.UnexpectedResponseException) {\n' +
      '        loadingErrorMessage = \'Unexpected server response.\';\n' +
      '      } else {\n' +
      '        loadingErrorMessage = \'An error occurred while loading the PDF.\';\n' +
      '      }\n' +
      '\n' +
      '    });\n' +
      '  },\n' +
      '  progress: function pdfViewProgress(level) {\n' +
      '    var percent = Math.round(level * 100);\n' +
      '  },\n' +
      '  initUI: function pdfViewInitUI() {\n' +
      '    var linkService = new PDFJS.PDFLinkService();\n' +
      '    this.pdfLinkService = linkService;\n' +
      '\n' +
      '    var container = document.getElementById(\'viewerContainer\');\n' +
      '    var pdfViewer = new PDFJS.PDFViewer({\n' +
      '      container: container,\n' +
      '      linkService: linkService\n' +
      '    });\n' +
      '    this.pdfViewer = pdfViewer;\n' +
      '    linkService.setViewer(pdfViewer);\n' +
      '    this.pdfHistory = new PDFJS.PDFHistory({\n' +
      '      linkService: linkService\n' +
      '    });\n' +
      '    linkService.setHistory(this.pdfHistory);\n' +
      '    container.addEventListener(\'pagesinit\', function () {\n' +
      '      // We can use pdfViewer now, e.g. let\'s change default scale.\n' +
      '      pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;\n' +
      '    });\n' +
      '  }\n' +
      '};\n' +
      '(function animationStartedClosure() {\n' +
      '  // The offsetParent is not set until the PDF.js iframe or object is visible.\n' +
      '  // Waiting for first animation.\n' +
      '  PDFViewerApplication.animationStartedPromise = new Promise(\n' +
      '    function (resolve) {\n' +
      '      window.requestAnimationFrame(resolve);\n' +
      '    });\n' +
      '})();\n' +
      '// We need to delay opening until all HTML is loaded.\n' +
      'PDFViewerApplication.animationStartedPromise.then(function () {\n' +
      '  PDFViewerApplication.open({\n' +
      '    url: DEFAULT_URL\n' +
      '  });\n' +
      '});'

    const pdf = document.createElement('script')
    pdf.type = 'text/javascript'
    pdf.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@1.9.646/build/pdf.js'
    pdf.onload = function () {
      // console.log('load:pdf.js');
      const pdfViewer = document.createElement('script')
      pdfViewer.type = 'text/javascript'
      pdfViewer.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@1.9.646/web/pdf_viewer.js'
      pdfViewer.onload = function () {
        // console.log('load:pdf_viewer');
        const jsContent = document.createElement('script')
        jsContent.type = 'text/javascript'
        const js = document.createTextNode(jsStr)
        jsContent.appendChild(js)
        document.body.appendChild(jsContent)
      }
      document.body.appendChild(pdfViewer)
    }
    document.body.appendChild(pdf)
  },
  mounted () {
  },
  template:
  '<script type="text/x-template">' +
  '</script>'
})
