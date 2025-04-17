<template>
    <div class="tableContainer">
        <el-dialog title="参数列表" width="60%" :visible.sync="dialogTableVisible" :close-on-click-modal="false"
            :close-on-press-escape="false" :append-to-body="true" @close="closeDialog">
            <div class="btns">
                <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="handleCreate">新增</el-button>
            </div>
            <el-table :data="list" stripe height="500px">
                <el-table-column property="" label="所属模板" :formatter="formatTemplate"></el-table-column>
                <el-table-column property="profileName" label="参数名称"></el-table-column>
                <el-table-column property="profileDes" label="参数描述"></el-table-column>
                <el-table-column :label="$t('commonNotify.Operation')" align="center" width="200"
                    class-name="small-padding fixed-width">
                    <template slot-scope="{ row, $index }">
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
            <div class="pageContainer">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[50, 100, 150, 200]"
                    :pager-count="5" :current-page="currentPage" :page-size="pageSize" :total="total" @size-change="handleSizeChange"
                    @current-change="currentPageChange">
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto"
                style="width: 500px; margin-left:50px;">
                <el-form-item label="参数名称" prop="profileName">
                    <el-input v-model="temp.profileName" />
                </el-form-item>
                <el-form-item label="参数描述" prop="profileDes">
                    <el-input v-model="temp.profileDes" />
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
import {
    addMqttTemplateProfile,
    updateMqttTemplateProfile,
    deleteMqttTemplateProfile,
    listMqttTemplateProfile
} from '@/api/system/templateConfiguration.js'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        mqttTemplateId: {
            type: String
        },
        mqttTemplateName: {
            type: String
        }
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 50,
            total: 0,
            list: [],
            dialogTableVisible: false,


            temp: {
                profileName: null,
                profileDes: null,
            },
            rules: {
                profileName: [
                    { required: true, message: this.$t('system$user$index_vue.Usernamecannotbeempty'), trigger: 'blur' }
                ],
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
        }
    },
    watch: {
        dialogVisible: {
            handler(newVal, oldVal) {
                this.dialogTableVisible = newVal
                if (newVal) {
                    this.getList()
                }
            },
            immediate: true
        }
    },
    methods: {
        formatTemplate(row, column, cellValue, index){
            return this.mqttTemplateName
        },
        closeDialog() {
            this.$emit('closeDialog')
        },
        getList() {
            var data = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                mqttTemplateId: this.mqttTemplateId
            }
            listMqttTemplateProfile(data).then(res => {
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
        currentPageChange(val) {
            this.currentPage = val;
            this.getList()
        },
        handleSizeChange(val) {
            this.currentPage = 1
            this.pageSize = val
            this.getList();
        },
        // 重置表单
        resetTemp() {
            this.temp = {
                mqttTemplateId:this.mqttTemplateId,
                profileName:null,
                profileDes:null,
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
                id: row.id,
                mqttTemplateId:row.mqttTemplateId,
                profileName:row.profileName,
                profileDes:row.profileDes,
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
                        const res = await deleteMqttTemplateProfile({ profileId: row.id })
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
                    const fun = (this.dialogStatus == 'create' ? addMqttTemplateProfile : updateMqttTemplateProfile)
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
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';

.btns {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
}
</style>