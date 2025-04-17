<template>
  <div class="content_box">
    <div class="box_left">
      <div class="deviceCard">
        <div
          class="deviceTitle"
          :class="{ active: !deviceCollapse }"
          @click="handleCollapse"
        >
          <span>{{
            $t("system$systemView$hisData$Measurements$index_vue.Device")
          }}</span>
          <i class="el-icon-arrow-down" v-if="deviceCollapse"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </div>
        <div class="deviceListContainer" v-show="!deviceCollapse">
          <div
            :key="item.name"
            class="deviceItem"
            v-for="item in deviceList"
            @click="checkDevice(item)"
          >
            <span>{{ item.name }}</span>
            <i class="el-icon-check" v-show="isChecked(item.name) > -1"></i>
          </div>
        </div>
      </div>
      <div class="timeContainer">
        <div class="timeSelector">
          <span
            >{{
              $t("system$systemView$hisData$Measurements$index_vue.starttime")
            }}：</span
          >
          <el-date-picker v-model="startTime" type="datetime"> </el-date-picker>
        </div>
        <div class="timeSelector">
          <span
            >{{
              $t("system$systemView$hisData$Measurements$index_vue.stoptime")
            }}：</span
          >
          <el-date-picker v-model="endTime" type="datetime"> </el-date-picker>
        </div>
      </div>
      <div class="btnContainer">
        <el-button size="small" type="primary" @click="search">{{
          $t("system$systemView$hisData$Measurements$index_vue.query")
        }}</el-button>
      </div>
    </div>
    <div class="box_right">
      <div
        :class="spreadFlag ? 'dataNameContainer_spread' : 'dataNameContainer'"
      >
        <div
          class="dataNameItem"
          :key="item.deviceKey + '-' + item.id"
          v-for="item in dataNameList"
          @click="checkDataName(item)"
        >
          {{ item.name }}
          <i
            class="el-icon-check"
            v-show="isCheckedDataName(item.deviceKey + '-' + item.id) > -1"
          ></i>
        </div>
        <div class="spread_div" @click="collapseContainer">
          <i class="el-icon-arrow-down" v-if="!spreadFlag"></i>
          <i class="el-icon-arrow-up" v-else></i>
        </div>
      </div>
      <div class="iconContainer">
        <!-- <img src="@/assets/image/hisData/export.png" @click="exportExcel" /> -->
        <img
          src="@/assets/image/hisData/list.png"
          :class="{ iconActive: currentTab == 'table' }"
          @click="searchTable()"
        />
        <img
          src="@/assets/image/hisData/chart.png"
          :class="{ iconActive: currentTab == 'chart' }"
          @click="searchChart()"
        />
      </div>
      <div class="tableContainer" v-if="currentTab == 'table'">
        <div style="flex: 1; overflow: hidden">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            height="100%"
            row-key="id"
          >
            <el-table-column
              :label="
                $t('system$systemView$hisData$Measurements$index_vue.time')
              "
              align="center"
              prop="time"
              :formatter="formatTime"
            >
            </el-table-column>
            <el-table-column
              :label="child.label"
              align="center"
              :prop="child.prop"
              :key="child.key"
              v-for="child in list1"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="pageContainer">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[50, 100, 150, 200]"
            :pager-count="5"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="currentPageChange"
          >
          </el-pagination>
        </div>
      </div>
      <div class="chartContainer"  v-else>
        <img class="exportEx" v-if="currentTab == 'chart'" src="@/assets/image/hisData/export.png" @click="exportExcel" />
        <div class="chartContainerInner" v-if="currentTab == 'chart'" ref="lineChart"></div>
      </div>
      
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  listDeviceData,
  listPoint,
  listHistoryData,
  pageHistoryData,
} from "@/api/system/hisData";
import XLSX from "xlsx";
import moment from "moment";
import { getCurrentTimefromOffset, getMillisecondsfromOffset } from "@/utils";
import Cookies from "js-cookie";
import { toFixedNoRounding } from "@/utils/index.js";
import { Collapse } from "element-ui";

export default {
  data() {
    return {
      currentLang: Cookies.get("language"),

      currentTab: "table" /* chart */,
      deviceCollapse: false,
      deviceList: [],
      checkedDeviceList: [],
      startTime: null,
      endTime: null,

      spreadFlag: false,
      dataNameList: [],
      checkedDataNameList: [],

      currentPage: 1,
      pageSize: 200,
      total: 0,
      tableData: [],

      exportList: [], // 导出的数据组合

      list1: [],
      chartSeries:[],
      options: {
        dataZoom: {
          type: "inside",
          start: 0,
        },
        title: {
          text: "",
          left: "left",
          top: 10,
          textStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          padding: [20, 0, 0, 0],
        },
        grid: {
          left: "0%",
          right: "0%",
          top: 60,
          bottom: 20,
          containLabel: true,
        },
        xAxis: [
          {
            type: "time",
            boundaryGap: true,
            data: [],
          },
        ],
        yAxis: [
          {
            name: "",
            nameTextStyle: {
              padding: [0, 0, 0, 60],
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            type: "value",
          },
        ],
        series: [],
      },
    };
  },
  methods: {
    formatValue(row, column, cellValue, index) {
      return this.handleValue(cellValue);
    },
    handleValue(value) {
      if (!isNaN(value * 1) && typeof (value * 1) == "number") {
        return toFixedNoRounding(value * 1, 2);
      } else {
        return value;
      }
    },
    formatTime(row, column, cellValue, index) {
      return getCurrentTimefromOffset(cellValue);
    },
    async listDeviceData() {
      this.deviceList = [];
      const { code, data } = await listDeviceData();
      if (code == 1) {
        Object.keys(data).forEach((v) => {
          this.deviceList.push({
            name: v,
            propertyList: data[v],
          });
        });
      }
    },
    async listPoint(deviceKey) {
      let data = {
        deviceKey,
      };
      const { code, data: res } = await listPoint(data);
      if (res && res.length > 0) {
        let arr = res.map((v) => {
          return {
            id: v.key,
            name: this.currentLang == "en" ? v.englishName : v.name,
            deviceKey,
          };
        });
        this.dataNameList.push(...arr);
      }
    },
    currentPageChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getList();
    },
    search() {
      if (this.currentTab == "table") {
        this.currentPage = 1;
        this.getList();
      } else {
        this.myChart && this.myChart.dispose();
        this.getChartData();
      }
    },
    handleExportList(result) {
      this.exportList = []
      if(!result||!result.length||!result[0].length){
        return
      }
      let length = result[0][0].length;
      let head = [];
      let table = [];
      result.forEach((re) => {
        if (re[0] && re[0].length && re[0].length > 0) {
          let item = re[0][0];
          let name = this.currentLang == "en" ? item.name : item.chinese;
          head.push(item.device + "/" + name);
        }
      });
      let header = ['time', ...head];
        for (let index = 0; index < length; index++) {
          let time = getCurrentTimefromOffset(result[0][0][index].time);
          let arr = [time];
          head.forEach((item, j) => {
            let value = this.handleValue(result[j][0][index].value);
            arr.push(value);
          });
          table.push(arr);
        }
      this.exportList = [header,...table];
    },
    searchTable() {
      this.myChart && this.myChart.dispose();
      this.currentTab = "table";
      if(!this.list1||!this.list1.length||this.list1.length==0){
        this.getList();
      }
    },
    searchChart() {
      this.myChart && this.myChart.dispose();
      this.currentTab = "chart";
      if(this.chartSeries.length&&this.chartSeries.length>0){
        this.initChart()
      }else{
        this.getChartData();
      }
    },
    formatQueryDatas() {
      if (!this.checkedDataNameList || this.checkedDataNameList.length == 0) {
        return [];
      }

      let arr = this.checkedDataNameList.map((v) => {
        let array = v.split("-");
        return {
          device: array[0],
          point: array[1],
        };
      });

      return arr;
    },
    async getList() {
      let start = getMillisecondsfromOffset(
        moment(this.startTime).valueOf(),
        moment().utcOffset()
      );
      let end = getMillisecondsfromOffset(
        moment(this.endTime).valueOf(),
        moment().utcOffset()
      );
      if (start && end) {
        if (start >= end) {
          this.$message({
            type: "warning",
            message: this.$t(
              "system$systemView$hisData$Measurements$index_vue.Thestarttimemustbelessthantheendtime"
            ),
          });
          return;
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t(
            "system$systemView$hisData$Measurements$index_vue.Pleaseenterthecompletequerytime"
          ),
        });
        return;
      }
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: start,
        endTime: end,
        queryDatas: this.formatQueryDatas(),
      };
      let { data: data1 } = await pageHistoryData(data);
      const { records, total, timeDatas } = data1;
      this.total = total;
      this.list1 = [];
      this.tableData = [];
      // 处理数据
      if (records && records.length > 0) {
        let timeArr = timeDatas;
        if (!timeArr || timeArr.length == 0) {
          this.list1 = [];
          this.tableData = [];
          this.total = 0;
        } else {
          records.forEach((item, i) => {
            if (item.historyDatas && item.historyDatas.length > 0) {
              let obj = {
                label: "",
                prop: item.key,
                key: "",
              };
              item.historyDatas.forEach((v, index) => {
                if (index == 0) {
                  let name =
                    this.currentLang == "en" ? item.name : item.chinese;
                  obj.label = v.device + "/" + name;
                  obj.key = v.device + "/" + name + "/" + v.point;
                }
              });
              this.list1.push(obj);
            }
          });

          timeArr.forEach((v, i) => {
            let obj = {
              time: v,
            };
            records.forEach((re) => {
              re.historyDatas.forEach((item, index) => {
                if (i == index) {
                  obj[re.key] = this.handleValue(item.value);
                }
              });
            });
            this.tableData.push(obj);
          });
        }
      } else {
        this.list1 = [];
        this.tableData = [];
        this.total = 0;
      }
    },
    async getChartData() {
      let start = getMillisecondsfromOffset(
        moment(this.startTime).valueOf(),
        moment().utcOffset()
      );
      let end = getMillisecondsfromOffset(
        moment(this.endTime).valueOf(),
        moment().utcOffset()
      );
      let data = {
        startTime: start,
        endTime: end,
        queryDatas: this.formatQueryDatas(),
      };
      const { data: data1 } = await listHistoryData(data);
      let series = [];
      let result = data1.result ? data1.result : [];
      this.handleExportList(result);
      result.forEach((ele) => {
        ele.forEach((item) => {
          let obj = {
            name: "",
            type: "line",
            data: [],
          };
          let sortItem = item.sort((a, b) => {
            return a.time - b.time;
          });
          let arr = sortItem.map((v, index) => {
            obj.name = this.currentLang == "en" ? v.name : v.chinese;
            let vv = this.handleValue(v.value);
            let time = getCurrentTimefromOffset(parseInt(v.time));
            return {
              name: time,
              value: [time, vv],
            };
          });
          obj.data = arr;
          series.push(obj);
        });
      });
      this.chartSeries = series
      this.initChart();
    },
    handleCollapse() {
      this.deviceCollapse = !this.deviceCollapse;
    },
    checkDevice(item) {
      let index = this.isChecked(item.name);
      if (index > -1) {
        this.checkedDeviceList.splice(index, 1);
        this.dataNameList = this.dataNameList.filter(
          (v) => v.deviceKey !== item.name
        );
        this.checkedDataNameList = this.checkedDataNameList.filter((v) => {
          let arr = v.split("-");
          return arr[0] !== item.name;
        });
      } else {
        this.checkedDeviceList.push(item.name);
        this.listPoint(item.name);
      }
    },
    isChecked(name) {
      return this.checkedDeviceList.indexOf(name);
    },

    checkDataName(item) {
      let index = this.isCheckedDataName(item.deviceKey + "-" + item.id);
      if (index > -1) {
        this.checkedDataNameList.splice(index, 1);
      } else {
        this.checkedDataNameList.push(item.deviceKey + "-" + item.id);
      }
    },
    isCheckedDataName(id) {
      return this.checkedDataNameList.indexOf(id);
    },
    initChart() {
      this.$nextTick(()=>{
        let series = this.chartSeries
        this.options.series = series;
        this.myChart = echarts.init(this.$refs.lineChart);
        this.myChart.clear();
        this.myChart.setOption(this.options);
      })
    },
    async exportExcel() {
      // if (this.list1.length == 0 || this.tableData == 0) {
      //   return;
      // }
      // let header = this.list1.map((v) => v.label);
      // let items = this.tableData.map((item) => {
      //   let arr = [];
      //   for (const key in item) {
      //     let element = item[key];
      //     if (key == "time") {
      //       element = getCurrentTimefromOffset(element);
      //     }
      //     arr.push(element);
      //   }
      //   return arr;
      // });
      // const data = [["time", ...header], ...items];
      if (this.exportList.length == 0) {
        return;
      }
      const data = this.exportList
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "data.xlsx");
    },
    collapseContainer() {
      this.spreadFlag = !this.spreadFlag;
    },
  },
  mounted() {
    this.listDeviceData();
    //this.initChart()
    window.onresize = () => {
      if (this.myChart && this.$refs.lineChart) {
        this.myChart.resize();
      }
    };
    this.bus.$on("changeLanguage", (params) => {
      this.currentLang = Cookies.get("language");
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/layout_common.scss";
@import "@/styles/table_scrollbar.scss";

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
      color: #1f61ff;
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
      color: #1f61ff;
      background-color: #e5efff;
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
  position: relative;
  .spread_div {
    position: absolute;
    right: 10px;
    top: 0px;
  }

  .dataNameContainer {
    height: 30px;
    padding-right: 30px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }
  .dataNameContainer_spread {
    height: 100px;
    padding-right: 30px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }
  .dataNameItem {
    height: 30px;
    line-height: 1.5;
    border-radius: 15px;
    font-size: 12px;
    border: 1px solid #447bff;
    color: #447bff;
    position: relative;
    padding: 5px;
    margin-right: 10px;
    margin-bottom: 5px;
    cursor: pointer;

    i {
      position: absolute;
      color: rgb(14, 170, 118);
      right: 1px;
      bottom: -7px;
      font-size: 24px;
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

    .iconActive {
      background-color: rgb(130, 205, 228, 0.5);
    }
  }

  .tableContainer {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .chartContainer {
    flex: 1;
    overflow: hidden;
    position: relative;
    .chartContainerInner{
      width: 100%;
      height: 100%;
    }
    .exportEx{
      position: absolute;
      left: 20px;
      top: 10px;
      z-index: 1000000;
      cursor: pointer;
    }
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

::v-deep .el-table__body-wrapper.is-scrolling-none {
  height: 100% !important;
}
</style>