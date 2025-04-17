<template>
  <div class="content_box">
    <div class="box_left">
      <div class="box_outter">
        <div class="table_title">
          <span class="demonstration">{{ $t('system$hisData$index_vue.Timeselection') }}：</span>
          <el-date-picker v-model="time" type="datetimerange" range-separator="-" :start-placeholder="$t('system$hisData$index_vue.StartTime')" :end-placeholder="$t('system$hisData$index_vue.EndTime')">
          </el-date-picker>
          <div class="btns">
            <el-button type="primary" size="small" @click="getList" :disabled="!this.time||this.time.length<2">{{ $t('commonNotify.Query') }}</el-button>
            <el-button type="primary" size="small" @click="exportExcel" :disabled="!this.time||this.time.length<2">{{ $t('commonNotify.Export') }}</el-button>
          </div>
        </div>
        <div class="table_Container">
          <el-table :data="tableData" stripe style="width: 100%;" height="100%" row-key="id">
            <el-table-column prop="timestamp" :label="$t('system$systemView$historyAlarm$index_vue.triggertime')" :formatter="formatTime" align="center">
            </el-table-column>
            <el-table-column prop="name" :label="$t('system$systemView$historyAlarm$index_vue.alarmname')" align="center" v-if="currentLang == 'en'">
            </el-table-column>
            <el-table-column prop="chinese" :label="$t('system$systemView$historyAlarm$index_vue.alarmname')" align="center" v-else>
            </el-table-column>
            <el-table-column prop="eventType" :label="$t('system$systemView$historyAlarm$index_vue.alarmtype')" align="center" :formatter="formatType">
            </el-table-column>
            <el-table-column prop="level" :label="$t('system$systemView$historyAlarm$index_vue.alarmlevel')" align="center">
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
  </div>
</template>

<script>
import { pageLccuAlarmData, listLccuAlarmData } from '@/api/system/historyAlarm'
import Cookies from 'js-cookie'
import { toFixedNoRounding,getCurrentTimefromOffset, formatTime, getMillisecondsfromOffset } from '@/utils/index.js'
import XLSX from 'xlsx'
import moment from 'moment'
export default {
  data() {
    return {
      time:[],
      currentLang: Cookies.get('language'),
      currentPage: 1,
      pageSize: 50,
      total: 0,
      tableData: [],
      excelListData: [],
    }
  },
  methods: {
    formatTime(row, column, cellValue, index) {
      return getCurrentTimefromOffset(cellValue)
    },
    formatValue(row, column, cellValue, index) {
      return this.handleValue(cellValue)
    },
    formatType(row, column, cellValue, index){
      let str = ''
      if(cellValue==1){
        str = this.$t('system$systemView$historyAlarm$index_vue.trigger')
      }else if(cellValue==0){
        str = this.$t('system$systemView$historyAlarm$index_vue.reset')
      }
      return str
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
    async getList() {
      let start = getMillisecondsfromOffset(
        moment(this.time[0]).valueOf(),
        moment().utcOffset()
      );
      let end = getMillisecondsfromOffset(
        moment(this.time[1]).valueOf(),
        moment().utcOffset()
      );
      let data = {
        startTime:start,
        endTime:end,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      const { data: data1 } = await pageLccuAlarmData(data)
      const { records, total } = data1
      this.tableData = records
      this.total = total
    },
    async listLccuAlarmData(){
      let data = {
        startTime:moment(this.time[0]).valueOf(),
        endTime:moment(this.time[1]).valueOf(),
      }
      const res = await listLccuAlarmData(data)
      if(res.code == 1 && res.data && res.data.length > 0){
        this.excelListData = res.data
      }else{
        this.excelListData = []
      }

    },
    async exportExcel(){
     await this.listLccuAlarmData()
      if (this.excelListData.length == 0) {
        return;
      }
      let header = [
        this.$t('system$systemView$historyAlarm$index_vue.triggertime'),
        this.$t('system$systemView$historyAlarm$index_vue.alarmname'),
        this.$t('system$systemView$historyAlarm$index_vue.alarmtype'),
        this.$t('system$systemView$historyAlarm$index_vue.alarmlevel')
      ]
      let excelData = this.excelListData.map(item => {
        let time = this.formatTime(null,null,item.timestamp,null)
        let name = this.currentLang=='en'?item.name:item.chinese
        let type = this.formatType(null,null,item.eventType,null)
        let arr = [time,name,type,item.level]
        return arr
      })

      const data = [
        header,
        ...excelData
      ]
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'LCCUHistoryAlarm.xlsx')
    }
  },
  mounted() {
    this.bus.$on('changeLanguage', (params) => {
      this.currentLang = Cookies.get('language')
    })
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
    width: 100%;
    margin: auto;
    height: 100%;
  }

  .table_title {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 16px;
    font-weight: 400;
    .btns{
      margin-left: 20px;
    }
  }

  .table_Container {
    height: calc(100% - 120px);
  }
}
</style>