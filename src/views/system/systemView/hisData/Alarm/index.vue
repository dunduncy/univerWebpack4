<template>
  <div class="content_box">
    <div class="box_left">
      <div class="deviceCard">
        <div class="deviceTitle" :class="{ 'active': !deviceCollapse }" @click="handleCollapse">
          <span>{{ $t('system$systemView$hisData$Alarm$index_vue.time') }}</span>
          <i class="el-icon-arrow-down" v-if="deviceCollapse"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </div>
        <div class="deviceListContainer" v-show="!deviceCollapse">
          <div class="deviceItem" v-for="item in deviceList" @click="checkDevice(item)">
            <span>{{ item.name }}</span>
            <i class="el-icon-check" v-show="isChecked(item.name) > -1"></i>
          </div>
        </div>
      </div>
      <div class="timeContainer">
        <div class="timeSelector">
          <span>{{ $t('system$systemView$hisData$Alarm$index_vue.starttime') }}：</span>
          <el-date-picker v-model="startTime" type="datetime">
          </el-date-picker>
        </div>
        <div class="timeSelector">
          <span>{{ $t('system$systemView$hisData$Alarm$index_vue.stoptime') }}：</span>
          <el-date-picker v-model="endTime" type="datetime">
          </el-date-picker>
        </div>
      </div>
      <div class="btnContainer">
        <el-button size="small" type="primary" @click="search">{{ $t('system$systemView$hisData$Alarm$index_vue.query') }}</el-button>
        <el-button size="small" type="primary" plain @click="exportExcel">{{ $t('commonNotify.Export') }}</el-button>
      </div>
    </div>
    <div class="box_right">
      <div class="tableContainer">
        <el-table :data="tableData" stripe style="width: 100%;" height="100%" row-key="id">
          <el-table-column prop="time" :label="$t('system$systemView$hisData$Alarm$index_vue.time')" width="180" :formatter="formatTime">
          </el-table-column>
          <el-table-column prop="device" :label="$t('system$systemView$hisData$Alarm$index_vue.device')" width="180">
          </el-table-column>
          <el-table-column prop="yxName" :label="$t('system$systemView$hisData$Alarm$index_vue.name')"  v-if="currentLang == 'en'">
          </el-table-column>
          <el-table-column prop="chinese" :label="$t('system$systemView$hisData$Alarm$index_vue.name')"  v-else>
          </el-table-column>
          <el-table-column prop="value" :label="$t('system$systemView$hisData$Alarm$index_vue.value')">
          </el-table-column>
        </el-table>
      </div>
      <div class="pageContainer">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[50, 100, 150, 200]" :pager-count="5"
          :current-page="currentPage" :page-size="pageSize" :total="total" @size-change="handleSizeChange"
          @current-change="currentPageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { listDeviceData, pageHistoryYXData } from '@/api/system/hisData'
import moment from 'moment'
import { getCurrentTimefromOffset,getMillisecondsfromOffset } from '@/utils'
import Cookies from 'js-cookie'
import XLSX from "xlsx";
export default {
  data() {
    return {
      currentLang:Cookies.get('language'),
      deviceCollapse: false,
      deviceList: [],
      checkedDeviceList: [],
      startTime: null,
      endTime: null,
      currentPage: 1,
      pageSize: 200,
      total: 0,
      tableData: [],
    }
  },
  methods: {
    formatTime(row, column, cellValue, index) {
      return getCurrentTimefromOffset(cellValue)
    },
    async listDeviceData() {
      this.deviceList = []
      const {data:res} = await listDeviceData()
      if (res) {
        Object.keys(res).forEach(v => {
          this.deviceList.push({
            name: v,
            propertyList: res[v],
          })
        })
      }
    },
    handleCollapse() {
      this.deviceCollapse = !this.deviceCollapse
    },
    checkDevice(item) {
      let index = this.isChecked(item.name)
      if (index > -1) {
        this.checkedDeviceList.splice(index, 1)
      } else {
        this.checkedDeviceList.push(item.name)
      }
    },
    isChecked(name) {
      return this.checkedDeviceList.indexOf(name)
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
    search(){
      this.currentPage = 1
      this.getList()
    },
    async getList() {
      let start = getMillisecondsfromOffset(moment(this.startTime).valueOf(),moment().utcOffset())
      let end = getMillisecondsfromOffset(moment(this.endTime).valueOf(),moment().utcOffset())
      if (start && end) {
        if (start >= end) {
          this.$message({
            type: 'warning',
            message: this.$t('system$systemView$hisData$Measurements$index_vue.Thestarttimemustbelessthantheendtime')
          })
          return
        }
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('system$systemView$hisData$Measurements$index_vue.Pleaseenterthecompletequerytime')
        })
        return;
      }
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: start,
        endTime: end,
        devices: this.checkedDeviceList
      }
      const { data:data1 } = await pageHistoryYXData(data)
      const {records,total} = data1
      if (records && records.length > 0) {
        this.tableData = records
        this.total = total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    async exportExcel(){
      let start = getMillisecondsfromOffset(moment(this.startTime).valueOf(),moment().utcOffset())
        let end = getMillisecondsfromOffset(moment(this.endTime).valueOf(),moment().utcOffset())
        if (start && end) {
          if (start >= end) {
            this.$message({
              type: 'warning',
              message: this.$t('system$systemView$hisData$Measurements$index_vue.Thestarttimemustbelessthantheendtime')
            })
            return
          }
        } else {
          this.$message({
            type: 'warning',
            message: this.$t('system$systemView$hisData$Measurements$index_vue.Pleaseenterthecompletequerytime')
          })
          return;
        }
        let data = {
          pageNum: 1,
          pageSize: 1000000,
          startTime: start,
          endTime: end,
          devices: this.checkedDeviceList
        }
        const { data:data1 } = await pageHistoryYXData(data)
        const {records,total} = data1
        let header = [
          this.$t('system$systemView$hisData$Alarm$index_vue.time'),
          this.$t('system$systemView$hisData$Alarm$index_vue.device'),
          this.$t('system$systemView$hisData$Alarm$index_vue.name'),
          this.$t('system$systemView$hisData$Alarm$index_vue.value')
        ]
        let tableData = []
        if (records && records.length > 0) {
          tableData = records.map(item=>{
            let time = getCurrentTimefromOffset(item.time)
            let name = this.currentLang == 'en'?item.yxName:item.chinese
            return [time,item.device,name,item.value]
          })
        }
        let exportList = [
          header,
          ...tableData
        ]
        const ws = XLSX.utils.aoa_to_sheet(exportList);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "data.xlsx");
    },
  },
  mounted() {
    this.listDeviceData()
    this.bus.$on('changeLanguage', (params) => {
     this.currentLang =  Cookies.get('language')
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
}

.box_left {
  flex: 2;
  overflow: hidden;

  .deviceCard {
    margin: 10px 10px 10px 0;
    padding: 10px 5px;
    border: 1px solid rgba(219, 218, 218, 0.5);
    box-shadow: 3px 3px 6px rgb(219, 218, 218);
  }

  .deviceTitle {
    display: flex;
    justify-content: space-between;
    height: 30px;

    &.active {
      color: #1F61FF;
    }
  }

  .deviceListContainer {
    .deviceItem {
      height: 30px;
      line-height: 30px;
      padding-right: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      cursor: pointer;

      i {
        font-size: 20px;
      }
    }

    .deviceItem:hover {
      color: #1F61FF;
      background-color: #E5EFFF;
    }
  }

  .timeContainer {
    .timeSelector {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .btnContainer {
    display: flex;
    justify-content: center;
  }

}

.box_right {
  flex: 7;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .dataNameContainer {
    height: 30px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;

    .dataNameItem {
      height: 30px;
      line-height: 1.5;
      border-radius: 15px;
      font-size: 12px;
      border: 1px solid #447BFF;
      color: #447BFF;
      position: relative;
      padding: 5px;
      margin-right: 10px;
      cursor: pointer;

      i {
        position: absolute;
        color: rgb(14, 170, 118);
        right: 1px;
        bottom: -7px;
        font-size: 24px;
      }
    }

  }

  .iconContainer {
    height: 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    img {
      margin-right: 2px;
      cursor: pointer;
    }
  }

  .tableContainer {
    flex: 1;
    overflow: hidden;
  }

  .chartContainer {
    flex: 1;
    overflow: hidden;
  }

}

/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 5px;
  /* 对应横向滚动条的宽度 */
  height: 5px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #dbdbdb;
  // border-radius: 32px;
}
</style>