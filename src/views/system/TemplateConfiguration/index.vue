
<template>
  <div class="box_container">
    <Title :title="currentTab">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate" size="mini" plain>
        {{ $t('commonNotify.Add') }}
      </el-button>
    </Title>
    <div class="content">
      <div class="table_container">
        <el-table :data="list" stripe style="width: 100%;" height="100%" row-key="id">
          <el-table-column label="模板名称" align="center" prop="templateName" />
          <el-table-column label="模板描述" align="center" prop="templateDes" />
          <el-table-column :label="$t('commonNotify.Operation')" align="center" width="400"
            class-name="small-padding fixed-width">
            <template slot-scope="{ row, $index }">
              <a class="operateA" @click="openParam(row)">
                查看参数
              </a>
              <a class="operateA" @click="openDataPoint(row)">
                查看数据点
              </a>
              <a class="operateA" @click="handleUpdate(row)">
                {{ $t('commonNotify.Edit') }}
              </a>
              <a class="operateA danger" @click="handleDelete(row, $index)">
                {{ $t('commonNotify.Delete') }}
              </a>
            </template>
          </el-table-column>
          <template slot="empty">
            <img src="@/assets/image/noData.png" style="width:300px;" />
          </template>
        </el-table>
      </div>

      <div class="pageContainer">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[50, 100, 150, 200]"
          :pager-count="5" :current-page="currentPage" :page-size="pageSize" :total="total" @size-change="handleSizeChange"
          @current-change="currentPageChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto"  class="selfDefineCenterForm">
        <el-form-item label="模板名称" prop="templateName">
          <el-input v-model="temp.templateName" />
        </el-form-item>
        <el-form-item label="模板描述" prop="templateDes">
          <el-input v-model="temp.templateDes" />
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
    <!--查看参数列表-->
    <paramTable :dialogVisible="paramData.dialogVisible" @closeDialog="closeParamDialog" :mqttTemplateId="paramData.mqttTemplateId" :mqttTemplateName="paramData.mqttTemplateName"></paramTable>
    <!--查看数据点列表-->
    <dataPoint :dialogVisible="pointData.dialogVisible" @closeDialog="closePointDialog"  :mqttTemplateId="pointData.mqttTemplateId" :mqttTemplateName="pointData.mqttTemplateName"></dataPoint>

  </div>
</template>

<script>
import Title from '@/views/components/Title/index.vue'
import paramTable from './paramTable.vue'
import dataPoint from './dataPoint.vue'
import {
  addMqttTemplate,
  updateMqttTemplate,
  deleteMqttTemplate,
  listMqttTemplate
} from '@/api/system/templateConfiguration.js'
export default {
  components: {
    Title,
    paramTable,
    dataPoint
  },
  data() {
    return {
      currentTab: "模板配置",
      currentPage: 1,
      pageSize: 50,
      total: 0,
      list: [],
      temp: {
        templateName: null,
        templateDes: null,
      },
      rules: {
        templateName: [
          { required: true, message: "模板名称不能为空", trigger: 'blur' }
        ]
      },
      //   控制弹出框的隐藏出现
      dialogFormVisible: false,
      //   用来判断是新增 还是编辑
      dialogStatus: '',
      //   用来存储两种状态
      textMap: {
        update: this.$t('commonNotify.Edit'),
        create: this.$t('commonNotify.Add')
      },
      paramData: {
        dialogVisible: false,
        mqttTemplateId:null,
        mqttTemplateName:null,
      },
      pointData: {
        dialogVisible: false,
        mqttTemplateId:null,
        mqttTemplateName:null,
      }
    }
  },
  methods: {
    formatColumn(row, column, cellValue, index) {
      if (cellValue === 0) {
        return this.$t('system$org$index_vue.Disabled')
      } else {
        return this.$t('system$org$index_vue.Enable')
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
    getList() {
      var data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }
      listMqttTemplate(data).then(res => {
        if (res.code == 1 && res.data) {
          this.list = res.data.records
          this.total = res.data.total
          this.currentPage = res.data.current
        } else {
          this.list = []
          this.total = 0
          this.currentPage = 1
        }
      })
    },
    // 重置表单
    resetTemp() {
      this.temp = {
        templateName: null,
        templateDes: null,
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = {
        id:row.id,
        templateName: row.templateName,
        templateDes: row.templateDes,
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row, index) {
      this.$confirm(this.$t('commonNotify.DeleteInfoMessage'), this.$t('commonNotify.Prompt'), {
        confirmButtonText: this.$t('commonNotify.Confirm'),
        cancelButtonText: this.$t('commonNotify.Cancel'),
        type: 'warning'
      })
        .then(async () => {
          try {
            const res = await deleteMqttTemplate({ templateId: row.id })
            if (res.code == 1) {
              this.$notify({
                title: this.$t('commonNotify.Success'),
                message: this.$t('commonNotify.SuccessfullyDeleted'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$message({
                message: this.$t('commonNotify.DeleteFailed') + (res.msg ? (`,${this.$t('commonNotify.Reason')}:` + res.msg) : ''),
                type: 'error',
                duration: 5 * 1000
              })
            }
          } catch (error) {
            this.$message({
              message: error,
              type: 'error',
              duration: 3 * 1000
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('commonNotify.CancelledDeletion')
          })
        })
    },
    CUData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          //  深度复制表单的值 并且赋值给tempData
          const fun = (this.dialogStatus == 'create' ? addMqttTemplate : updateMqttTemplate)
          fun(this.temp)
            .then(res => {
              if (res.code == 1) {
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$t('commonNotify.Success'),
                  message: (this.dialogStatus == 'create' ? this.$t('commonNotify.CreatedSuccessfully') : this.$t('commonNotify.UpdatedSuccessfully')),
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message({
                  message: this.$t('commonNotify.UpdateFailed') + (res.msg ? (`,${this.$t('commonNotify.Reason')}:` + res.msg) : ''),
                  type: 'error',
                  duration: 5 * 1000
                })
              }
              this.getList()
            })
            .catch(error => {
              this.$message({
                message: error,
                type: 'error',
                duration: 3 * 1000
              })
            })
        }
      }, error => {
        console.log(error)
      })
    },
    // 打开查看参数窗口
    openParam(row) {
      this.$set(this.paramData, 'mqttTemplateId', row.id)
      this.$set(this.paramData, 'mqttTemplateName', row.templateName)
      this.$set(this.paramData, 'dialogVisible', true)
    },
    closeParamDialog() {
      this.paramData.dialogVisible = false
    },
    // 打开查看数据点窗口
    openDataPoint(row) {
      this.$set(this.pointData, 'mqttTemplateId', row.id)
      this.$set(this.pointData, 'mqttTemplateName', row.templateName)
      this.$set(this.pointData, 'dialogVisible', true)
    },
    closePointDialog() {
      this.pointData.dialogVisible = false
    },
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';
@import '@/styles/defineForm.scss';
.box_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table_container {
  flex: 1;
  overflow: hidden;
}
</style>