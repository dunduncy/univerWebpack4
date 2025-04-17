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
                    <el-table-column label="总线名称" align="center" prop="displayName" />
                    <el-table-column label="协议类型" align="center" prop="protocolType" :formatter="formatProtocolType"/>
                    <el-table-column label="总线描述" align="center" prop="des" />
                    <el-table-column :label="$t('commonNotify.Operation')" align="center" width="400"
                        class-name="small-padding fixed-width">
                        <template slot-scope="{ row, $index }">
                            <a class="operateA" @click="handleDetail(row)">
                                {{ $t('commonNotify.Detail') }}
                            </a>
                            <a class="operateA" @click="handleUpdate(row)">
                                {{ $t('commonNotify.Edit') }}
                            </a>
                            <a class="operateA" @click="handleToSlaveStation(row)">
                                查看从站
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
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto" class="selfDefineCenterForm">
                <el-form-item label="总线名称" prop="displayName">
                    <el-input v-model="temp.displayName" :disabled="isDisabled"/>
                </el-form-item>
                <el-form-item label="协议类型" prop="protocolType">
                    <el-select v-model="temp.protocolType" :disabled="isDisabled">
                        <el-option label="ModbusTCP" :value="1"></el-option>
                        <el-option label="ModbusRTU" :value="2"></el-option>
                        <el-option label="Modbus RTU OVER TCP" :value="3"></el-option>
                        <el-option label="IEC104" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="ip" prop="busIp">
                    <el-input v-model="temp.busIp" :disabled="isDisabled"/>
                </el-form-item>
                <el-form-item label="端口" prop="busPort">
                    <el-input v-model="temp.busPort" :disabled="isDisabled"/>
                </el-form-item>
                <el-form-item label="波特率" prop="baudRate">
                    <el-input v-model="temp.baudRate" :disabled="isDisabled"/>
                </el-form-item>
                <el-form-item label="数据位" prop="dataPosition">
                    <el-select v-model="temp.dataPosition" :disabled="isDisabled">
                        <el-option label="5" :value="5"></el-option>
                        <el-option label="6" :value="6"></el-option>
                        <el-option label="7" :value="7"></el-option>
                        <el-option label="8" :value="8"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="截止位" prop="endPosition">
                    <el-select v-model="temp.endPosition" :disabled="isDisabled">
                        <el-option label="1" :value="1"></el-option>
                        <el-option label="1.5" :value="2"></el-option>
                        <el-option label="2" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="奇偶校验" prop="parityCheck">
                    <el-select v-model="temp.parityCheck" :disabled="isDisabled">
                        <el-option label="奇校验" :value="1"></el-option>
                        <el-option label="偶校验" :value="2"></el-option>
                        <el-option label="无校验" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="串口名" prop="serialPortName">
                    <el-input v-model="temp.serialPortName" :disabled="isDisabled"/>
                </el-form-item>
                <el-form-item label="描述" prop="des">
                    <el-input v-model="temp.des" :disabled="isDisabled"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="CUData" v-show="!isDisabled">
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
import {addBus,updateBus,deleteBus,listBus} from '@/api/system/bus.js'
export default {
    data() {
        return {
            protocolType:[
            'ModbusTCP','ModbusRTU','Modbus RTU OVER TCP','IEC104'
            ],
            currentPage: 1,
            pageSize: 50,
            total: 0,
            list: [],
            temp: {
                displayName:null,
                protocolType:1,
                busIp:null,
                busPort:null,
                des:null,
                transType:1,
                baudRate:null,
                dataPosition:8,
                endPosition:1,
                parityCheck:3,
                serialPortName:null,
            },
            rules: {
                displayName: [
                    { required: true, message: '总线名称不能为空', trigger: 'blur' }
                ],
                busIp: [
                    { required: true, message: '总线IP不能为空', trigger: 'blur' }
                ],
                busPort: [
                    { required: true, message: '总线端口不能为空', trigger: 'blur' }
                ],
                baudRate: [
                    { required: true, message: '波特率不能为空', trigger: 'blur' }
                ],
                serialPortName: [
                    { required: true, message: '串口名不能为空', trigger: 'blur' }
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
    computed:{
        isDisabled(){
            return this.dialogStatus==='detail'
        }
    },
    methods: {
        formatProtocolType(row, column, cellValue, index){
            return this.protocolType[cellValue-1]
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
                pageSize: this.pageSize,
                transType: 1
            }
            listBus(data).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.currentPage = res.data.current
            })
        },
        // 重置表单
        resetTemp() {
            this.temp = {
                displayName:null,
                protocolType:1,
                busIp:null,
                busPort:null,
                des:null,
                transType:1,
                baudRate:null,
                dataPosition:8,
                endPosition:1,
                parityCheck:3,
                serialPortName:null,
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
                displayName:row.displayName,
                protocolType:row.protocolType,
                busIp:row.busIp,
                busPort:row.busPort,
                des:row.des,
                transType:row.transType,
                baudRate:row.baudRate,
                dataPosition:row.dataPosition,
                endPosition:row.endPosition,
                parityCheck:row.parityCheck,
                serialPortName:row.serialPortName,
            }
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        handleDetail(row) {
            this.temp = {
                displayName:row.displayName,
                protocolType:row.protocolType,
                busIp:row.busIp,
                busPort:row.busPort,
                des:row.des,
                transType:row.transType,
                baudRate:row.baudRate,
                dataPosition:row.dataPosition,
                endPosition:row.endPosition,
                parityCheck:row.parityCheck,
                serialPortName:row.serialPortName,
            }
            this.dialogStatus = 'detail'
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
                        const res = await deleteBus({ busId: row.id })
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
        handleToSlaveStation(row) {
            this.$router.push({ path: '/configView/southComm/SlaveStationManagement', query: { id: row.id, type: row.protocolType } })
        },
        CUData() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    //  深度复制表单的值 并且赋值给tempData
                    const fun = (this.dialogStatus == 'create' ? addBus : updateBus)
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
    mounted(){
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
}

</style>