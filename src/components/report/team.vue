<template>
  <div class="pay">
    <div class="header">
      <div class="title">团队业绩</div>
      <div class="w-90">
        <mt-navbar v-model="dimension">
          <mt-tab-item id="sales">销售额</mt-tab-item>
          <mt-tab-item id="order">订单量</mt-tab-item>
          <mt-tab-item id="unit">客单价</mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <div v-show="chart.data.length > 0">
      <div class="clear" :class="{tooltip: chart.date}">
        <p class="f-l">{{chart.date}}</p>
        <p class="f-r">
          {{chart.value}}
          <span v-show="dimension === 'order' && chart.value">个</span>
          <span v-show="dimension !== 'order' && chart.value">元</span>
        </p>
      </div>
      <div></div>
      <canvas id="chart"></canvas>
      <div class="tab">
        <button class="btn" :class="{ active: chart.active.day }" @click="timeDimension = 'day'">日统计</button>
        <button class="btn" :class="{ active: chart.active.month }" @click="timeDimension = 'month'">月度</button>
      </div>
    </div>
  </div>
</template>

<script>
  import F2 from '@antv/f2'
  import api from '../../api/index2'
  import moment from 'moment'
  import { loadData, defaultPreHandler } from '../../common/utils'
  import _ from 'lodash'

  let chart
  export default {
    name: 'Team',
    data () {
      return {
        screenWidth: document.body.clientWidth,
        timer: false,
        dimension: 'sales',
        timeDimension: 'day',
        chart: {
          alias: '销售额',
          active: {
            day: true,
            month: false
          },
          dayData: [],
          monthData: [],
          data: [],
          date: '',
          value: ''
        },
        query: {
          startTime: '',
          endTime: '',
          partnerId: 0,
          projectId: 0,
          organizationId: 0,
          personId: 0,
          organizationScopes: '1,2',
          dimensions: '1,2,3,4,5',
          results: '1,2'
        }
      }
    },
    created () {
      this.setQuery()
    },
    async mounted () {
      await this.loadChartData(this.query)
      this.initChart()
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    methods: {
      resizeListener () {
        chart.clear()
        this.initChart()
      },
      setQuery () {
        this.query.startTime = moment().subtract(29, 'days').format('YYYY-MM-DD')
        this.query.endTime = moment().add(1, 'days').format('YYYY-MM-DD')
        this.query.partnerId = this.$route.query.partnerId
        this.query.projectId = this.$route.query.projectId
        this.query.organizationId = this.$route.query.organizationId
        this.query.personId = this.$store.state.person.personId
      },
      async loadChartData () {
        await loadData(() => { return api.getReportForm(this.query) },
          (data) => {
            let chartData = []
            _.forEach(data, (item) => {
              let object = {}
              let year = item.resultDimension.year ? item.resultDimension.year : '2018'
              let month = item.resultDimension.month ? item.resultDimension.month : '01'
              let day = item.resultDimension.day ? item.resultDimension.day : '01'
              object.reportDate = year + '-' + month + '-' + day
              object.sales = item.resultData.salesAmount ? Number(item.resultData.salesAmount) : 0
              object.order = item.resultData.salesCount ? Number(item.resultData.salesCount) : 0
              object.unit = object.order ? Math.round(object.sales / object.order) : 0
              let find = _.find(chartData, {reportDate: object.reportDate})
              if (find) {
                find.sales = Math.round(object.sales + find.sales)
                find.order = Math.round(object.order + find.order)
                find.unit = find.order ? Math.round(find.sales / find.order) : 0
              } else {
                chartData.push(object)
              }
            })
            _.forEach(chartData, data => {
              data.sales = Math.round(data.sales)
              data.order = Math.round(data.order)
            })
            if (this.timeDimension === 'day') {
              this.chart.dayData = chartData
            } else {
              this.chart.monthData = chartData
            }
          }, defaultPreHandler)
      },
      getChartData () {
        if (this.timeDimension === 'day') {
          this.chart.data = this.chart.dayData
        } else {
          this.chart.data = this.chart.monthData
        }
        _.forEach(this.chart.data, item => {
          item.value = item[this.dimension]
        })
      },
      animate () {
        F2.Animate.registerAnimation('lineUpdate', function (updateShape, animateCfg) {
          let cacheShape = updateShape.get('cacheShape')
          let cacheAttrs = cacheShape.attrs
          let newPoints = updateShape.attr('points')
          updateShape.attr(cacheAttrs)
          updateShape.animate().to({
            attrs: {
              points: newPoints
            },
            duration: 800,
            easing: animateCfg.easing
          })
        })
      },
      initChart () {
        this.getChartData()
        let vue = this
        chart = new F2.Chart({
          id: 'chart',
          width: window.innerWidth,
          height: window.innerWidth > window.innerHeight ? window.innerHeight - 54 : window.innerWidth * 0.707,
          pixelRatio: window.devicePixelRatio
        })
        chart.source(this.chart.data, {
          reportDate: {
            type: 'timeCat',
            tickCount: 3,
            range: [0, 1],
            formatter: function formatter (val) {
              if (vue.timeDimension === 'day') {
                return moment(val).format('YYYY-MM-DD')
              } else {
                return moment(val).format('YYYY-MM')
              }
            }
          },
          value: {
            type: 'linear',
            min: 0
          }
        })

        chart.tooltip({
          custom: true,
          onShow (obj) {
            vue.chart.date = obj.items[0].title
            vue.chart.value = vue.chart.alias + '：' + obj.items[0].value
          },
          onHide () {
            vue.chart.date = ''
            vue.chart.value = ''
          }
        })
        chart.axis('reportDate', {
          label (text, index, total) {
            let cfg = {
              textAlign: 'center'
            }
            if (index === 0) {
              cfg.textAlign = 'start'
            }
            if (index > 0 && index === total - 1) {
              cfg.textAlign = 'end'
            }
            return cfg
          }
        })
        chart.line({
          sortable: false
        }).position('reportDate*value').animate({
          update: {
            animation: 'lineUpdate'
          }
        }).shape('smooth')
        chart.render()
      }
    },
    watch: {
      'dimension': function (v) {
        switch (v) {
          case 'sales':
            this.chart.alias = '销售额'
            break
          case 'order':
            this.chart.alias = '订单量'
            break
          case 'unit':
            this.chart.alias = '客单价'
            break
        }
        chart.clear()
        this.initChart()
      },
      'timeDimension': async function (n) {
        this.chart.active = {
          day: false,
          month: false
        }
        this.chart.active[n] = true
        if (n === 'day' && this.chart.dayData.length === 0) {
          this.query.startTime = moment().subtract(29, 'days').format('YYYY-MM-DD')
          this.query.dimensions = '1,2,3,4,5'
          await this.loadChartData(this.query)
        } else if (n === 'month' && this.chart.monthData.length === 0) {
          this.query.startTime = moment().subtract(11, 'months').format('YYYY-MM-01')
          this.query.dimensions = '1,2,4,5'
          await this.loadChartData(this.query)
        }
        this.getChartData()
        chart.changeData(this.chart.data)
      },
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.resizeListener()
            that.timer = false
          }, 400)
        }
      }
    }
  }
</script>
<style scoped>
  .pay {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .tab {
    width: 100%;
    height: 40px;
  }

  .btn {
    float: left;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: none;
    font-size: 12px;
    width: 50%;
    height: 40px;
    line-height: 40px;
    color: #808080;
    background-color: #F2F2F2;
    padding: 0;
    margin: 0;
  }

  .btn.focus, .btn:focus {
    outline: 0;
  }

  .btn:focus, .btn:hover {
    text-decoration: none;
  }

  .btn.active {
    background: #fff;
    color: #2E2E2E;
  }

  canvas {
    display: inherit;
    background: #fff;
  }

  .header {
    padding-top: 10px;
    background: #fff;
  }

  .title {
    border-left: 2px solid #26a2ff;
    font-size: 14px;
    margin-left: 15px;
    padding-left: 10px;
  }

  .w-90 {
    background: transparent;
    padding: 10px 15px 0;
    box-sizing: border-box;
    overflow-x: scroll;
  }

  .mint-navbar .mint-tab-item {
    padding: 8px 0;
    min-width: 5rem;
    background: #fff;
  }

  .mint-navbar .mint-tab-item.is-selected {
    color: #26a2ff;
    margin-bottom: 0;
    border-bottom: 1px solid #26a2ff;
  }

  .mint-navbar {
    background: transparent;
  }

  .clear {
    height: 30px;
    background: transparent;
    transition: all .35s;
  }

  .tooltip {
    height: 30px;
    background: rgb(233, 241, 255);
    font-size: 12px;
    transition: all .35s;
  }

  .f-l, .f-r {
    line-height: 30px;
    padding: 0 15px;
  }
</style>

