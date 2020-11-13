<template>
  <div class="pay">
    <div class="header">
      <div class="title">下级业绩</div>
      <div class="w-90">
        <mt-navbar v-model="dimension">
          <mt-tab-item id="today">
            <div :class="[startTime ? 'tab-item-base' : '']">今日</div>
          </mt-tab-item>
          <mt-tab-item id="yesterday">
            <div :class="[startTime ? 'tab-item-base' : '']">昨日</div>
          </mt-tab-item>
          <mt-tab-item id="month">
            <div :class="[startTime ? 'tab-item-base' : '']">本月</div>
          </mt-tab-item>
          <mt-tab-item id="time">
            <div @click="showTimePicker">
              <span v-if="startTime || endTime" class="tab-item">
              <div>{{startTime}}</div>
              <div>{{endTime}}</div>
            </span>
              <span v-else :class="[startTime ? 'tab-item' : '']">自定义</span>
              <i class="iconfont icon-xia tab-item-icon" aria-hidden="true"></i>
            </div>
          </mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <timePicker ref="timePicker" @setTime="setTime"></timePicker>
    <el-table
      size="small"
      :data="table.tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
      empty-text=""
      @header-click="sortTableData"
      header-align="center">
      <el-table-column
        fixed
        prop="organizationName"
        label="组织名称"
        min-width="100"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="positionName"
        label="组织编号"
        min-width="70"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sales"
        label="销售额"
        default-sort="order:descending"
        min-width="70"
        align="right">
      </el-table-column>
      <el-table-column
        prop="order"
        label="订单量"
        min-width="70"
        align="right">
      </el-table-column>
      <el-table-column
        prop="unit"
        label="客单价"
        min-width="60"
        align="right">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import _ from 'lodash'
  import api from '../../api/index2'
  import moment from 'moment'
  import TimePicker from './time_picker'
  import { loadData, defaultPreHandler } from '../../common/utils'

  export default {
    name: 'JuniorAch',
    data () {
      return {
        startTime: '',
        endTime: '',
        col: 0,
        query: {
          startTime: '',
          endTime: '',
          partnerId: 0,
          projectId: 0,
          organizationId: 0,
          personId: 0,
          organizationScopes: '2',
          dimensions: '4,5',
          results: '1,2'
        },
        dimension: 'today',
        sort: {
          organizationName: false,
          positionName: false,
          order: false,
          sales: false,
          unit: false
        },
        table: {
          today: [],
          yesterday: [],
          month: [],
          time: [],
          tableData: []
        },
        summary: {}
      }
    },
    components: {TimePicker},
    async created () {
      this.setQuery()
      await this.setTable()
    },
    methods: {
      async setTime (params) {
        if (params) {
          this.startTime = params.startTime
          this.endTime = params.endTime
          this.query.startTime = this.startTime ? this.startTime : this.endTime
          this.query.endTime = this.endTime
          await this.setTable()
        }
      },
      arraySpanMethod ({row, column, rowIndex, columnIndex}) {
        if (rowIndex === this.col) {
          if (columnIndex === 0) {
            return [1, 2]
          } else if (columnIndex === 1) {
            return [0, 0]
          }
        }
      },
      async setTable () {
        if (this.table[this.dimension].length === 0 || this.dimension === 'time') {
          await this.loadTableData(this.query)
        }
        this.sort = {
          organizationName: false,
          positionName: false,
          order: false,
          sales: true,
          unit: false
        }
        this.getSummaries()
        let data = JSON.parse(JSON.stringify(this.table[this.dimension]))
        data.push(this.summary)
        this.table.tableData = data
      },
      async loadTableData () {
        this.table.tableData = []
        await loadData(() => { return api.getReportForm(this.query) },
          (data) => {
            let tabData = []
            _.forEach(data, (item) => {
              let object = {}
              object.sales = item.resultData.salesAmount ? Math.round(Number(item.resultData.salesAmount)) : 0
              object.order = item.resultData.salesCount ? Math.round(Number(item.resultData.salesCount)) : 0
              object.organizationName = item.resultDimension.organizationName.length > 6 ? item.resultDimension.organizationName.slice(0, 6) + '*' : item.resultDimension.organizationName
              object.positionName = item.resultDimension.organizationCode
              object.unit = object.order ? Math.round(object.sales / object.order) : '/'
              tabData.push(object)
            })
            this.table[this.dimension] = tabData.sort(function (x, y) {
              return y.sales - x.sales
            })
          }, defaultPreHandler)
      },
      getSummaries () {
        this.summary = {}
        let saleCol = []
        let orderCol = []
        _.forEach(this.table[this.dimension], item => {
          saleCol.push(item.sales)
          orderCol.push(item.order)
        })
        this.col = this.table[this.dimension].length
        this.summary.sales = _.sum(saleCol)
        this.summary.order = _.sum(orderCol)
        this.summary.unit = this.summary.order ? Math.round(this.summary.sales / this.summary.order) : '/'
        this.summary.organizationName = '总计'
        this.summary.positionName = '/'
      },
      setQuery () {
        this.query.startTime = moment().format('YYYY-MM-DD')
        this.query.endTime = moment().format('YYYY-MM-DD')
        this.query.partnerId = this.$route.query.partnerId
        this.query.projectId = this.$route.query.projectId
        this.query.organizationId = this.$route.query.organizationId
        this.query.personId = this.$store.state.person.personId
      },
      sortTableData (column) {
        let data = JSON.parse(JSON.stringify(this.table.tableData))
        data = data.slice(0, -1)
        let key = _.findKey(this.sort, function (v) { return v })
        this.sort[key] = key === column.property
        if (this.sort[column.property]) {
          data.reverse()
          data.push(this.summary)
          this.table.tableData = data
        } else {
          this.sort[column.property] = true
          if (column.property === 'positionName' || column.property === 'organizationName') {
            data.sort((a, b) => a[column.property].localeCompare(b[column.property], 'zh-Hans-CN', {sensitivity: 'accent'}))
            data.push(this.summary)
            this.table.tableData = data
          } else {
            data.sort(function (x, y) {
              return y[column.property] - x[column.property]
            })
            data.push(this.summary)
            this.table.tableData = data
          }
        }
      },
      showTimePicker () {
        this.$refs.timePicker.show(this.startTime, this.endTime)
      }
    },
    watch: {
      'dimension': async function (sit) {
        switch (sit) {
          case 'today':
            this.query.startTime = moment().format('YYYY-MM-DD')
            this.query.endTime = moment().format('YYYY-MM-DD')
            await this.setTable()
            break
          case 'yesterday':
            this.query.startTime = moment().subtract(1, 'days').format('YYYY-MM-DD')
            this.query.endTime = moment().subtract(1, 'days').format('YYYY-MM-DD')
            await this.setTable()
            break
          case 'month':
            this.query.startTime = moment().startOf('month').format('YYYY-MM-DD')
            this.query.endTime = moment().endOf('month').format('YYYY-MM-DD')
            await this.setTable()
            break
          case 'time':
            break
        }
      }
    }
  }
</script>
<style scoped>
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
    width: calc(100% - 30px);
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
  .tab-item{
    float: left;
    padding-left: 5px;
  }
  .tab-item-icon{
    vertical-align: middle;
  }
  .tab-item-base{
    line-height: 2;
  }
</style>
