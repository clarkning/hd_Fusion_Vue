<template>
  <div>
    <el-table
      size="small"
      :data="tableData"
      border
      style="width: 100%"
      :span-method="objectSpanMethod"
      header-align="center">
      <el-table-column
        fixed
        prop="ServiceLevel"
        label="费用类型"
        width="70"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="Name"
        label="服务措施"
        min-width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="Price"
        label="维修费(含人工费)"
        min-width="100"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "price_list",
    props: {
      tableData: Array
    },
    data() {
      return {}
    },
    methods: {
      objectSpanMethod({row, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          let index = _.findIndex(this.tableData, {ServiceLevel: row.ServiceLevel})
          if (rowIndex === index) {
            let len = _.filter(this.tableData, {ServiceLevel: row.ServiceLevel}).length
            return [len, 1]
          } else {
            return [0, 1]
          }
        } else {
          return [1, 1]
        }
      }
    }

  }
</script>

<style scoped>

</style>
