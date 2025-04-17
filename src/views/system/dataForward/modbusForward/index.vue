<template>
    <div class="box_container pd">
        <div class="tableBtnsContainer">
            <el-button type="primary" size="mini" icon="el-icon-plus" plain @click="handleCreate">
                {{ $t('commonNotify.Add') }}
            </el-button>
        </div>
        <div class="content">
            <div class="table_container">
                <el-table :data="list" stripe style="width: 100%;" height="100%" row-key="id">
                    <el-table-column label="协议类型" align="center" prop="protocolType" :formatter="formatProtocolType" />
                    <el-table-column label="北向从站名称" align="center" prop="northDeviceDisplayName" />
                    <el-table-column label="北向数据点功能码" align="center" prop="northFunctionCode"
                        :formatter="formatFunctionCode" />
                    <el-table-column label="北向寄存器起始地址" align="center" prop="northStartAddr" />
                    <el-table-column label="北向寄存器读取个数" align="center" prop="northReadCount" />
                    <el-table-column label="南向从站名称" align="center" prop="southDeviceDisplayName" />
                    <el-table-column label="南向数据点功能码" align="center" prop="southFunctionCode"
                        :formatter="formatFunctionCode" />
                    <el-table-column label="南向寄存器起始地址" align="center" prop="southStartAddr" />
                    <el-table-column :label="$t('commonNotify.Operation')" align="center" width="400"
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
            </div>
            <div class="pageContainer">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[50, 100, 150, 200]"
                    :pager-count="5" :current-page="currentPage" :page-size="pageSize" :total="total" @size-change="handleSizeChange"
                    @current-change="currentPageChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
            width="40%">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto"
                class="selfDefineCenterForm">
                <el-form-item label="协议类型" prop="protocolType">
                    <el-select v-model="temp.protocolType" :disabled="isDisabled">
                        <el-option label="ModbusTCP" :value="1"></el-option>
                        <el-option label="ModbusRTU" :value="2"></el-option>
                        <el-option label="Modbus RTU OVER TCP" :value="3"></el-option>
                        <!-- <el-option label="IEC104" :value="4"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="北向从站" prop="northDeviceId">
                    <el-select v-model="temp.northDeviceId" :disabled="isDisabled">
                        <el-option :label="item.displayName" :value="item.id" :key="item.id"
                            v-for="item in listDeviceModbusOptions_north"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="北向数据点功能码" prop="northFunctionCode">
                    <el-input v-model="temp.northFunctionCode" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="北向寄存器起始地址" prop="northStartAddr">
                    <el-input v-model.number="temp.northStartAddr" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="北向寄存器读取个数" prop="northReadCount">
                    <el-input v-model.number="temp.northReadCount" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="南向从站" prop="southDeviceId">
                    <el-select v-model="temp.southDeviceId" :disabled="isDisabled">
                        <el-option :label="item.displayName" :value="item.id" :key="item.id"
                            v-for="item in listDeviceModbusOptions_south"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="南向寄存器起始地址" prop="southStartAddr">
                    <el-input v-model.number="temp.southStartAddr" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="南向数据点功能码" prop="southFunctionCode">
                    <el-input v-model="temp.southFunctionCode" :disabled="isDisabled" />
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
import { listDeviceModbusSelectByDataForward, addMemoryForwardData, updateMemoryForwardData, deleteMemoryForwardData, listMemoryForwardData } from '@/api/system/modbusForward.js'
export default {
    data() {
        var validateNumber = (rule, value, callback) => {
            let num = parseInt(value)
            if (!Number.isInteger(num)) {
                callback(new Error('请输入数字整数'));
            } else {
                callback()
            }
        }
        return {
            protocolType: [
                'ModbusTCP', 'ModbusRTU', 'Modbus RTU OVER TCP', 'IEC104'
            ],
            functionCodeArr: [
                '浮点', '单点', '遥控', '遥调'
            ],
            listDeviceModbusOptions_south: [],
            listDeviceModbusOptions_north: [],
            currentPage: 1,
            pageSize: 50,
            total: 0,
            list: [],
            temp: {
                protocolType: null,
                northFunctionCode: null,
                northDeviceId: null,
                northStartAddr: null,
                northReadCount: null,
                southDeviceId: null,
                southStartAddr: null,
                southFunctionCode: null,
            },
            rules: {
                protocolType: [
                    { required: true, message: '协议类型不能为空', trigger: 'change' },
                    { validator: validateNumber, trigger: 'blur' },
                ],
                northDeviceId: [
                    { required: true, message: '北向从站不能为空', trigger: 'change' },
                ],
                northFunctionCode: [
                    { required: true, message: '北向数据点功能码不能为空', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            let reg = /[0-9]+/
                            if (reg.test(value)) {
                                callback()
                            } else {
                                callback(new Error('只能输入数字'));
                            }
                        }, trigger: 'blur'
                    }
                ],
                northStartAddr: [
                    { required: true, message: '北向寄存器起始地址不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur' }
                ],
                northReadCount: [
                    { required: true, message: '北向寄存器读取个数不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur' }
                ],

                southDeviceId: [
                    { required: true, message: '南向从站不能为空', trigger: 'change' },
                ],
                southFunctionCode: [
                    { required: true, message: '南向数据点功能码不能为空', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            let reg = /[0-9]+/
                            if (reg.test(value)) {
                                callback()
                            } else {
                                callback(new Error('只能输入数字'));
                            }
                        }, trigger: 'blur'
                    }
                ],
                southStartAddr: [
                    { required: true, message: '南向寄存器起始地址不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur' }
                ],
            },
            //   控制弹出框的隐藏出现
            dialogFormVisible: false,
            //   用来判断是新增 还是编辑
            dialogStatus: '',
            //   用来存储两种状态
            textMap: {
                update: this.$t('commonNotify.Edit'),
                create: this.$t('commonNotify.Add'),
                detail: this.$t('commonNotify.Detail'),
            },
        }
    },
    computed: {
        isDisabled() {
            return this.dialogStatus === 'detail'
        }
    },
    methods: {
        formatProtocolType(row, column, cellValue, index) {
            return this.protocolType[cellValue - 1]
        },
        formatFunctionCode(row, column, cellValue, index) {
            return this.functionCodeArr[cellValue - 1]
        },
        async listDeviceModbusSelectByDataForward(transType) {
            let data1 = {
                transType
            }
            const { code, data, msg } = await listDeviceModbusSelectByDataForward(data1)
            if (code == 1) {
                if (transType == 1) {
                    // 南向
                    this.listDeviceModbusOptions_south = data
                } else {
                    // 北向
                    this.listDeviceModbusOptions_north = data
                }
            } else {
                if (transType == 1) {
                    // 南向
                    this.listDeviceModbusOptions_south = []
                } else {
                    // 北向
                    this.listDeviceModbusOptions_north = []
                }
            }
        },
        search() {
            this.currentPage = 1;
            this.getList()
        },
        reset() {// 清空搜索条件
            this.currentPage = 1;
            this.orgName = ''
            this.getList();
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
                pageSize: this.pageSize
            }
            listMemoryForwardData(data).then(res => {
                if (res.code == 1 && res.data && res.data.records && res.data.records.length > 0) {
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
                protocolType: null,
                northFunctionCode: null,
                northDeviceId: null,
                northStartAddr: null,
                northReadCount: null,
                southDeviceId: null,
                southStartAddr: null,
                southFunctionCode: null,
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
                protocolType: row.protocolType,
                northFunctionCode: row.northFunctionCode,
                northDeviceId: row.northDeviceId,
                northStartAddr: row.northStartAddr,
                northReadCount: row.northReadCount,
                southDeviceId: row.southDeviceId,
                southStartAddr: row.southStartAddr,
                southFunctionCode: row.southFunctionCode,
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
                        const res = await deleteMemoryForwardData({ memoryForwardId: row.id })
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
                    const fun = (this.dialogStatus == 'create' ? addMemoryForwardData : updateMemoryForwardData)
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
    },
    mounted() {
        this.listDeviceModbusSelectByDataForward(1)
        this.listDeviceModbusSelectByDataForward(2)
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

.pd {
    padding: 0 20px;
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

.tableBtnsContainer {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
}</style>