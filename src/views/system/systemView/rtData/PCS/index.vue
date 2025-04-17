<template>
  <div class="content_box">
    <div class="box_left">
      <div class="box_outter">
        <div class="table_title">{{ $t('system$systemView$rtData$PCS$index_vue.realtimedata') }}</div>
        <div class="table_Container">
          <el-table :data="tableData1" stripe style="width: 100%;" height="100%" row-key="key">
            <el-table-column prop="name" :label="$t('system$systemView$rtData$PCS$index_vue.name')" align="center" v-if="currentLang=='en'">
            </el-table-column>
            <el-table-column prop="chinese" :label="$t('system$systemView$rtData$PCS$index_vue.name')" align="center" v-else>
            </el-table-column>
            <el-table-column prop="value" :label="$t('system$systemView$rtData$PCS$index_vue.value')" width="180" align="center"  :formatter="formatValue">
            </el-table-column>
            <el-table-column prop="unit" :label="$t('system$systemView$rtData$PCS$index_vue.unit')" width="80" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="pageContainer">
          <el-pagination background layout="total, sizes, prev, pager, next, jumper" :pager-count="5"
            :page-sizes="[50, 100, 150, 200]" :current-page="currentPage" :page-size="pageSize" :total="total"
            @size-change="handleSizeChange" @current-change="currentPageChange">
          </el-pagination>
        </div>
      </div>

    </div>
    <div class="box_right">
      <div class="box_outter">
        <div class="table_title">{{ $t('system$systemView$rtData$PCS$index_vue.realtimealarm') }}</div>
        <div class="table_Container">
          <el-table :data="tableData2" stripe style="width: 100%;" height="100%" row-key="id">
            <el-table-column prop="time" :label="$t('system$systemView$rtData$PCS$index_vue.alarmtriggertime')" width="180" align="center" :formatter="formatTime">
            </el-table-column>
            <el-table-column prop="name" :label="$t('system$systemView$rtData$PCS$index_vue.alarmname')" v-if="currentLang=='en'">
            </el-table-column>
            <el-table-column prop="chinese" :label="$t('system$systemView$rtData$PCS$index_vue.alarmname')" v-else>
            </el-table-column>
            <el-table-column prop="value" :label="$t('system$systemView$rtData$PCS$index_vue.alarmvalue')">
            </el-table-column>
          </el-table>
        </div>
        <div class="pageContainer">
          <el-pagination background layout="total, sizes, prev, pager, next, jumper" :pager-count="5"
            :page-sizes="[50, 100, 150, 200]" :current-page="currentPage2" :page-size="pageSize2" :total="total2"
            @size-change="handleSizeChange2" @current-change="currentPageChange2">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listPCSRealTimeData, listPCSRealTimeAlarm } from '@/api/system/rtData'
import { getCurrentTimefromOffset } from '@/utils'
import Cookies from 'js-cookie'
import { toFixedNoRounding } from '@/utils/index.js'

export default {
  data() {
    return {
      timer: null,
      currentPage: 1,
      pageSize: 50,
      total: 0,
      tableData1: [],

      currentPage2: 1,
      pageSize2: 50,
      total2: 0,
      tableData2: [],

      currentLang:Cookies.get('language')
    }
  },
  methods: {
    formatValue(row, column, cellValue, index){
      return this.handleValue(cellValue)
    },
    handleValue(value){
      if(!isNaN(value*1) && typeof (value*1) == 'number'){
        return toFixedNoRounding(value*1,2)
      }else{
        return value
      }
    },
    formatTime(row, column, cellValue, index) {
      return getCurrentTimefromOffset(cellValue)
    },
    currentPageChange(val) {
      this.currentPage = val;
      this.getList1(true)
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getList1(true);
    },
    async getList1(isloading=false) {
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      const { data:data1 } = await listPCSRealTimeData(data,isloading)
      let  { records, total } = data1
      this.tableData1 = records
      this.total = total
    },
    currentPageChange2(val) {
      this.currentPage2 = val;
      this.getList2(true)
    },
    handleSizeChange2(val) {
      this.currentPage2 = 1
      this.pageSize2 = val
      this.getList2(true);
    },
    async getList2(isloading=false) {
      let data = {
        pageNum: this.currentPage2,
        pageSize: this.pageSize2
      }
      const { data:data1 } = await listPCSRealTimeAlarm(data,isloading)
      let  { records, total } = data1
      this.tableData2 = records
      this.total2 = total
    },
  },
  mounted() {
    this.getList1(true)
    this.getList2(true)
    this.timer = setInterval(() => {
      this.getList1()
      this.getList2()
    },2000)

    this.bus.$on('changeLanguage', (params) => {
     this.currentLang =  Cookies.get('language')
    })
  },
  beforeDestroy() {
    console.log('销毁pcs-beforeDestroy');
    clearInterval(this.timer)
  },
  beforeRouteLeave(to, from, next) {
    console.log('销毁pcs-beforeRouteLeave');
    clearInterval(this.timer)
    next()
  },
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