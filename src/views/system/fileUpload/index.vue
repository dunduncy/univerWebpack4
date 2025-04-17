<template>
  <div class="container">
    <div class="btns">
      <el-button type="primary" plain>上传文件</el-button>
      <el-button type="primary" plain>重构工程</el-button>
      <el-button type="primary" plain>打包工程</el-button>
    </div>
    <div class="fileContent">
      <el-table
        :data="tableData"
        stripe
        height="100%"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="文件名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="大小"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="md5">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';
.btns{
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #c5c1c1;
}
.fileContent{
  height: calc(100% - 100px);
  padding-top: 40px;
}
</style>