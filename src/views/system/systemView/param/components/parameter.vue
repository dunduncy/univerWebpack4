<template>
  <div class="content_box">
    <div class="box_left">
      <div class="box_outter">
        <!-- <div class="table_title">
          <el-button type="primary" size="small" @click="handleAdd" style="float: right;">新增</el-button>
        </div> -->
        <div class="table_Container">
          <el-table :data="tableData" stripe style="width: 100%;" height="100%" row-key="id">
            <el-table-column prop="paramNameEn" :label="$t('system$systemView$rtData$Battery$index_vue.parametername')" align="center"  v-if="currentLang=='en'">
            </el-table-column>
            <el-table-column prop="paramNameCh" :label="$t('system$systemView$rtData$Battery$index_vue.parametername')" align="center"  v-else>
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
      </div>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto"
        class="selfDefineCenterForm">
        <el-form-item :label="$t('system$systemView$rtData$Battery$index_vue.parametername')" prop="name" >
          <el-input v-model="temp.name" disabled/>
        </el-form-item>
        <el-form-item :label="$t('system$systemView$rtData$Battery$index_vue.parametervalue')" prop="value" 
        :rules="[
          { validator: validateNumber, trigger: 'blur' }
        ]"
        v-if="currentRow.dataType == 'number'">
          <el-input v-model="temp.value" type="number"/>
        </el-form-item>
        <el-form-item :label="$t('system$systemView$rtData$Battery$index_vue.parametervalue')" prop="value" v-else-if="currentRow.dataType == 'string'">
          <el-input v-model="temp.value" type="string"/>
        </el-form-item>
        <el-form-item :label="$t('system$systemView$rtData$Battery$index_vue.parametervalue')" prop="value" v-if="currentRow.dataType == 'bool'">
          <el-switch v-model="temp.value" active-text="true" inactive-text="false"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('system$systemView$rtData$Battery$index_vue.parametervalue')" prop="value" v-if="currentRow.dataType == 'boolEnum' || currentRow.dataType == 'numberEnum'">
          <el-select v-model="temp.value">
            <el-option
              v-for="item in currentRow.enumRule"
              :key="item.value"
              :label="currentLang == 'en'? item.labelEn : item.labelCh"
              :value="item.value">
            </el-option>
          </el-select>
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
import { getParam, setParam } from '@/api/system/param'
import Cookies from 'js-cookie'
import { toFixedNoRounding } from '@/utils/index.js'

export default {
  data() {
    return {
      timer:null,
      currentLang:Cookies.get('language'),
      tableData: [],
      dialogFormVisible: false,
      currentRow:{dataType:null},
      temp: {
        id: null,
        name: null,
        value: null,
      },
      //   用来判断是新增 还是编辑
      dialogStatus: '',
      textMap: {
        update: this.$t('commonNotify.Edit'),
        create: this.$t('commonNotify.Add'),
      },
      rules: {
        name: [
          { required: true, message: 'name cannot be empty', trigger: 'blur' }
        ],
        value: [
          { required: true, message: this.$t('system$systemView$param$index_vue.Parametervaluecannotbeempty'), trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    validateNumber(rule, value, callback) {
      if (value > this.currentRow.max || value < this.currentRow.min) {
        callback(new Error(`${this.$t('system$systemView$param$index_vue.Pleaseenteranumberbetween')}${this.currentRow.min?this.currentRow.min:'-∞'}-${this.currentRow.max?this.currentRow.max:'∞'}${this.$t('system$systemView$param$index_vue.zhijian')}`));
      } else {
        callback();
      }
    },
    formatValue(row, column, cellValue, index){
      if(row.dataType == 'number'){
        return this.handleValue(cellValue,row.precesion)
      }else if(row.dataType == 'numberEnum' || row.dataType =='boolEnum'){
        let item = row.enumRule.find(v=>{
          return v.value==row.value
        })
        let str = ''
        if(item){
          if(this.currentLang == 'en'){
            str = item.labelEn
          }else{
            str = item.labelCh
          }
        }
        return str
      }else{
        return cellValue+''
      }
    },
    handleValue(value,precesion){
      if(!isNaN(value*1) && typeof (value*1) == 'number'){
        return toFixedNoRounding(value*1,precesion)
      }else{
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
      const res = await getParam()
      this.tableData = res.data
    },
    handleAdd(){
      this.dialogStatus = 'create'
      this.temp = {
        id: null,
        name: null,
        value: null,
      }
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.currentRow = row
      this.temp = {
        id: row.id,
        value: row.value,
        name:this.currentLang=='en'?row.paramNameEn:row.paramNameCh
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
          const fun = setParam
          if(this.currentRow.dataType=='number'){
            this.temp.value = this.temp.value*1
          }
          let temp = {
            id: this.temp.id,
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
                  message: this.$t('commonNotify.UpdateFailed'),
                  type: 'error',
                  duration: 5 * 1000
                })
              }
              this.getList()
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
    this.getList()
    this.bus.$on('changeLanguage', (params) => {
     this.currentLang =  Cookies.get('language')
     this.getList()
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