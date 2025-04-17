<template>
    <div class="box_container pd">
        <div class="tablefilterContainer">
            <div class="common_con_div">
                <span class="conditionName">所属北向总线：</span>
                <el-select v-model="busId" @change="changeBus">
                    <el-option :label="item.displayName" :value="item.id" :key="item.id"
                        v-for="item in listBusOptions"></el-option>
                </el-select>
            </div>
            <div class="common_con_div">
                <el-button type="primary" @click="search">
                    {{ $t('commonNotify.Query') }}
                </el-button>
            </div>
        </div>
        <div class="tableBtnsContainer">
            <el-button type="primary" size="mini" icon="el-icon-plus" plain @click="handleCreate" :disabled="isAddBtnDisabled">
                {{ $t('commonNotify.Add') }}
            </el-button>
        </div>
        <div class="content">
            <div class="table_container">
                <el-table :data="list" stripe style="width: 100%;" height="100%" row-key="id">
                    <el-table-column label="从站展示名称" align="center" prop="displayName" />
                    <el-table-column label="设备id号" align="center" prop="deviceId" />
                    <el-table-column label="所属总线" align="center" prop="busName" />
                    <el-table-column label="协议类型" align="center" prop="protocolType" :formatter="formatProtocolType" />
                    <el-table-column label="超时时间" align="center" prop="timeout" />
                    <el-table-column label="重试次数" align="center" prop="retryCount" />
                    <el-table-column label="读取周期" align="center" prop="readCycle" v-if="protocolType !== 4" />
                    <el-table-column label="读取寄存器个数上限" align="center" prop="registerLimit" v-if="protocolType !== 4" />
                    <el-table-column label="读取布尔量个数上限" align="center" prop="booleanLimit" v-if="protocolType !== 4" />
                    <el-table-column label="总召唤周期" align="center" prop="callCycle" v-if="protocolType === 4" />
                    <el-table-column label="连接后立即总召唤" align="center" prop="callFlag" :formatter="formatCallFlag"
                        v-if="protocolType === 4" />
                    <el-table-column :label="$t('commonNotify.Operation')" align="center" width="400"
                        class-name="small-padding fixed-width">
                        <template slot-scope="{ row, $index }">
                            <a class="operateA" @click="handleUpdate(row)">
                                {{ $t('commonNotify.Edit') }}
                            </a>
                            <a class="operateA" @click="handleToData(row)">
                                查看数据点
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
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false"  width="40%">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto" class="selfDefineCenterForm">
                <el-form-item label="从站展示名称" prop="displayName">
                    <el-input v-model="temp.displayName" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="从站英文名称" prop="deviceName">
                    <el-input v-model="temp.deviceName" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="设备id号" prop="deviceId">
                    <el-input v-model="temp.deviceId" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="所属总线" prop="busId">
                    <el-select v-model="temp.busId" :disabled="true" @change="changeFormBus">
                        <el-option :label="item.displayName" :value="item.id" :key="item.id"
                            v-for="item in listBusOptions"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="超时时间" prop="timeout">
                    <el-input v-model.number="temp.timeout" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="重试次数" prop="retryCount">
                    <el-input v-model.number="temp.retryCount" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="读取周期" prop="readCycle" v-if="protocolType !== 4">
                    <el-input v-model.number="temp.readCycle" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="读取寄存器个数上限" prop="registerLimit" v-if="protocolType !== 4">
                    <el-input v-model.number="temp.registerLimit" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="读取布尔量个数上限" prop="booleanLimit" v-if="protocolType !== 4">
                    <el-input v-model.number="temp.booleanLimit" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="总召唤周期" prop="callCycle" v-if="protocolType === 4">
                    <el-input v-model.number="temp.callCycle" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="连接后立即总召唤" prop="callFlag" v-if="protocolType === 4">
                    <el-select v-model="temp.callFlag" :disabled="isDisabled">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
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
import {
    listBusSelect, add104Device, update104Device, delete104Device, list104Device,
    addModbusDevice, updateModbusDevice, deleteModbusDevice, listModbusDevice

} from '@/api/system/slave.js'
export default {
    data() {
        var validateNumber = (rule, value, callback) => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字整数'));
            }else{
                callback()
            }
        }
        return {
            protocolTypeArr: [
                'ModbusTCP', 'ModbusRTU', 'Modbus RTU OVER TCP', 'IEC104'
            ],
            transType: 2,// 南向
            protocolType: null,
            busId: null,
            busName: null,
            listBusOptions: [],// 总线列表下拉框
            list: [],
            temp: {
                busId: null,
                deviceId: null,
                deviceName: null,
                displayName: null,
                timeout: null,
                retryCount: null,
                callCycle: null,
                callFlag: 0,

                readCycle: null,
                registerLimit: null,
                booleanLimit: null,
                protocolType: null,
            },


            rules: {
                busId: [
                    { required: true, message: '请选择总线', trigger: 'change' }
                ],
                deviceId: [
                    { required: true, message: '设备ID不能为空', trigger: 'blur' },
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
                deviceName: [
                    { required: true, message: '设备英文名不能为空', trigger: 'blur' }
                ],
                displayName: [
                    { required: true, message: '从站展示名不能为空', trigger: 'blur' }
                ],
                timeout: [
                    { required: true, message: '超时时间不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur'}
                ],
                retryCount: [
                    { required: true, message: '重试次数不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur'}
                ],
                callCycle: [
                    { required: true, message: '总召唤周期不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur'}
                ],
                callFlag: [
                    { required: true, message: '请选择连接成功后是否立即总召唤', trigger: 'change' }
                ],
                readCycle: [
                    { required: true, message: '读取周期不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur'}
                ],
                registerLimit: [
                    { required: true, message: '读取寄存器个数上限不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur'}
                ],
                booleanLimit: [
                    { required: true, message: '读取布尔量个数上限不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur'}
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
        },
        isAddBtnDisabled(){
            return !this.busId
        }
    },
    methods: {
        formatProtocolType(row, column, cellValue, index) {
            return this.protocolTypeArr[cellValue - 1]
        },
        formatCallFlag(row, column, cellValue, index) {
            if (cellValue === 0) {
                return '否'
            } else {
                return '是'
            }
        },
        changeBus(value) {
            let item = this.listBusOptions.find(v => v.id == value)
            this.protocolType = item.protocolType
            this.search()
        },
        changeFormBus(value) {
            let item = this.listBusOptions.find(v => v.id == value)
            this.temp.protocolType = item.protocolType
        },
        async listBusSelect() {
            const { code, msg, data } = await listBusSelect({ transType: this.transType })
            if (code == 1) {
                this.listBusOptions = data
                
            }
        },
        search() {
            this.getList()
        },
        getList() {
            if(!this.busId){
                return;
            }
            var data = {
                busId: this.busId
            }
            let item = this.listBusOptions.find(v => v.id == this.busId)
            let busName = item.displayName

            let fn = this.protocolType == 4 ? list104Device : listModbusDevice
            fn(data).then(res => {
                this.list = res.data.map(v => {
                    if (v.protocolType) {
                        return {
                            ...v,
                            busName
                        }
                    } else {
                        return {
                            ...v,
                            protocolType: this.protocolType,
                            busName
                        }
                    }
                })
            })
        },
        // 重置表单
        resetTemp() {
            this.temp = {
                busId: null,
                deviceId: null,
                deviceName: null,
                displayName: null,
                timeout: null,
                retryCount: null,
                callCycle: null,
                callFlag: 0,

                readCycle: null,
                registerLimit: null,
                booleanLimit: null,
                protocolType: null,
            }
        },
        handleCreate() {
            this.resetTemp()
            this.temp.busId = this.busId
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        handleUpdate(row) {
            this.temp = {
                id:row.id,
                busId: row.busId,
                deviceId: row.deviceId,
                deviceName: row.deviceName,
                displayName: row.displayName,
                timeout: row.timeout,
                retryCount: row.retryCount,
                callCycle: row.callCycle,
                callFlag: row.callFlag,

                readCycle: row.readCycle,
                registerLimit: row.registerLimit,
                booleanLimit: row.booleanLimit,
                protocolType: row.protocolType,
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
                        let fun = this.protocolType==4?delete104Device:deleteModbusDevice
                        const res = await fun({ modbusDeviceId: row.id })
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
                    let fun = null;
                    if (this.dialogStatus == 'create') {
                        if (this.protocolType == 4) {
                            fun = add104Device
                        } else {
                            fun = addModbusDevice
                        }
                    } else {
                        if (this.protocolType == 4) {
                            fun = update104Device
                        } else {
                            fun = updateModbusDevice
                        }
                    }
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
        handleToData(row) {
            this.$router.push({ path: '/configView/northComm/DataManagement', query: { busId: row.busId, slaveId: row.id } })
        }
    },
    async mounted() {
        this.protocolType = this.$route.query.type
        this.busId = this.$route.query.id
        await this.listBusSelect()
        await this.getList()
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