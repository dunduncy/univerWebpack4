<template>
  <div class="content_box">
    <div class="box_left">
      <div class="box_outter">
        <div class="table_title">{{ $t('system$systemView$rtData$Battery$index_vue.batteryparameter') }}</div>
        <div class="table_Container">
          <el-table :data="tableData" stripe style="width: 100%;" height="100%" row-key="id">
            <el-table-column prop="name" :label="$t('system$systemView$rtData$Battery$index_vue.parametername')" align="center"  v-if="currentLang=='en'">
            </el-table-column>
            <el-table-column prop="chinese" :label="$t('system$systemView$rtData$Battery$index_vue.parametername')" align="center"  v-else>
            </el-table-column>
            <el-table-column prop="value" :label="$t('system$systemView$rtData$Battery$index_vue.parametervalue')" align="center"  :formatter="formatValue">
            </el-table-column>
            <el-table-column prop="operate" :label="$t('system$systemView$rtData$Battery$index_vue.operate')" align="center" width="180">
              <template slot-scope="{ row, $index }">
                <a @click="handleUpdate(row)" class="el-icon-edit operateA">
                  {{ $t('system$systemView$rtData$Battery$index_vue.modify') }}
                </a>
              </template>
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
    <el-dialog title="edit" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto"
        class="selfDefineCenterForm">
        <el-form-item :label="$t('system$systemView$rtData$Battery$index_vue.parametername')" prop="name">
          <el-input v-model="temp.name" disabled />
        </el-form-item>
        <el-form-item :label="$t('system$systemView$rtData$Battery$index_vue.parametervalue')" prop="value">
          <el-input v-model="temp.value" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CUData">
          {{ $t('commonNotify.Confirm') }}
        </el-button>
        <el-button @click="dialogFormVisible = false">
          {{ $t('commonNotify.Cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
    
<script>
import { listBatteryParamData, updateBatteryParam } from '@/api/system/rtData'
import Cookies from 'js-cookie'
import { toFixedNoRounding } from '@/utils/index.js'

export default {
  data() {
    return {
      timer:null,
      currentLang:Cookies.get('language'),
      currentPage: 1,
      pageSize: 50,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      temp: {
        key: null,
        name: null,
        value: 1,
      },
      rules: {
        name: [
          { required: true, message: 'name cannot be empty', trigger: 'blur' }
        ],
        value: [
          { required: true, message: 'value cannot be empty', trigger: 'blur' }
        ]
      },
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
    currentPageChange(val) {
      this.currentPage = val;
      this.getList(true)
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getList(true);
    },
    async getList(isloading=false) {
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      const { data:data1 } = await listBatteryParamData(data,isloading)
      const { records, total } = data1
      this.tableData = records
      this.total = total
    },
    handleUpdate(row) {
      this.temp = {
        deviceKey: 'bms',
        pointKey: row.key,
        value: row.value,
        name:this.currentLang=='en'?row.name:row.chinese
      }
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
      this.dialogFormVisible = true
    },
    CUData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          //  深度复制表单的值 并且赋值给tempData
          const fun = updateBatteryParam
          let temp = {
            deviceKey: this.temp.deviceKey,
            pointKey: this.temp.pointKey,
            value: this.temp.value,
          }
          fun(temp)
            .then(res => {
              if (res.code==1) {
                this.dialogFormVisible = false
                this.$notify({
                  title: 'success',
                  message: this.$t('commonNotify.UpdatedSuccessfully'),
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
              this.getList(true)
            })
            .catch(error => {
              this.$message({
                message: this.$t('commonNotify.UpdateFailed'),
                type: 'error',
                duration: 3 * 1000
              })
            })
        }
      }, error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getList(true)
    this.timer = setInterval(()=>{
      this.getList()
    },2000)
    this.bus.$on('changeLanguage', (params) => {
     this.currentLang =  Cookies.get('language')
    })
  },
  beforeDestroy() {
    console.log('销毁parameter');
    clearInterval(this.timer)
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