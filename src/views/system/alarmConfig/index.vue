<template>
  <div class="content_box">
    <div class="box_left">
      <div class="box_outter">
        <div class="table_title">
        </div>
        <div class="table_Container">
          <el-table :data="tableData" stripe style="width: 100%;" height="100%" row-key="id"
            @cell-dblclick="handleCellDBClick">
            <el-table-column prop="id" label="alarm id" align="center">
            </el-table-column>
            <el-table-column prop="name" label="alarm des" align="center" v-if="currentLang == 'en'">
            </el-table-column>
            <el-table-column prop="chinese" label="alarm des" align="center" v-else>
            </el-table-column>
            <el-table-column prop="level" label="alarm level" align="center">
              <template slot-scope="scope">
                <!-- 双击时展示input，save实现数据保存-->
                <el-input size="small" :id="scope.row.id" type="number" v-if="scope.row.isEdit === 'level'"
                  v-model="scope.row.level" @keyup.enter.native="save(scope)" @blur="blurfun(scope)" />
                <span v-else data-id="level">{{ scope.row.level }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="enable" label="alarm enable" align="center">
              <template v-slot="{ row, $index }">
                <el-switch v-model="row.enable" :active-value="true" :inactive-value="false" active-text="true"
                  inactive-text="false" @change="handleAlarmEnableChange(row)">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="pageContainer">
          <el-pagination background layout="total, sizes, prev, pager, next, jumper" :pager-count="5"
            :page-sizes="[50, 100, 150, 200]" :current-page="currentPage" :page-size="pageSize" :total="total"
            @size-change="handleSizeChange" @current-change="currentPageChange">
          </el-pagination>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getAllLccuAlarm, updateLCCUAlarmCfg } from '@/api/system/alarmConfig'
import Cookies from 'js-cookie'
import { toFixedNoRounding, getCurrentTimefromOffset } from '@/utils'

export default {
  data() {
    return {
      timer: null,
      currentLang: Cookies.get('language'),
      currentPage: 1,
      pageSize: 50,
      total: 0,
      tableData: [],
    }
  },
  methods: {
    handleCellDBClick(row, column, cell, event) {
      this.oldinfo = row[column.property]
      const columnName = column.property
      //如果点击的是地区这一列，则提示不可编辑
      if (columnName != 'level') {
        return
      }
      //设置isEdit属性
      this.$set(row, 'isEdit', columnName)
      this.$nextTick(() => {
        //input标签获取焦点
        document.getElementById(row.id).focus()
      })
    },
    save({ row, column }, val, eventStr) {
      this.oldinfo = row[column.property]
      //数据复位，此时input隐藏，展示span
      this.$set(row, 'isEdit', null)
      //调用后台接口保存数据
      let data = {
        id: row.id,
        level: row.level,
        enable: row.enable
      }
      this.updateLCCUAlarmCfg(data)
    },
    blurfun({ row, column }, val, eventStr) {
      //  失去焦点事件
      row[column.property] = this.oldinfo
      this.oldinfo = ''
      this.$set(row, 'isEdit', null)
      this.getList()
    },
    formatValue(row, column, cellValue, index) {
      return this.handleValue(cellValue)
    },
    handleValue(value) {
      if (!isNaN(value * 1) && typeof (value * 1) == 'number') {
        return toFixedNoRounding(value * 1, 2)
      } else {
        return value
      }
    },
    currentPageChange(val) {
      this.currentPage = val;
      this.getList()
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getList();
    },
    handleAlarmEnableChange(row) {
      let data = {
        id: row.id,
        level: row.level,
        enable: row.enable
      }
      this.updateLCCUAlarmCfg(data)
    },
    async updateLCCUAlarmCfg(data) {
      const res = await updateLCCUAlarmCfg(data)
      if (res.code==1) {
        this.$notify({
          title: 'success',
          message: res.data,
          type: 'success',
          duration: 2000
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    },
    async getList() {
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      const res = await getAllLccuAlarm()
      this.tableData = res.data
      //this.total = total
    }
  },
  mounted() {
    this.getList()

  }

}
</script>

<style lang="scss" scoped>
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';

.content_box {
  width: 100%;
  height: 100%;
  display: flex;

  .box_left {
    flex: 1;
    overflow: hidden;

  }

  .box_right {
    flex: 1;
    overflow: hidden;
  }

  .box_outter {
    width: 80%;
    margin: auto;
    height: 100%;
  }

  .table_title {
    height: 40px;
    font-size: 20px;
    font-weight: 400;
  }

  .table_Container {
    height: calc(100% - 100px);
  }
}
</style>