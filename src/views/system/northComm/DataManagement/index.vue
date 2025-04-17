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
                <span class="conditionName">所属从站：</span>
                <el-select v-model="slaveId" @change="changeSlave" clearable>
                    <el-option :label="item.displayName" :value="item.id" :key="item.id"
                        v-for="item in listSlaveOptions"></el-option>
                </el-select>
            </div>
            <div class="common_con_div">
                <el-button type="primary" @click="search">
                    {{ $t('commonNotify.Query') }}
                </el-button>
            </div>
        </div>
        <div class="tableBtnsContainer">
            <el-button type="primary" size="mini" plain @click="handleCopy" :disabled="isCopyBtnDisabled">
                数据点复制
            </el-button>
            <el-button type="primary" size="mini" icon="el-icon-plus" plain @click="handleCreate" :disabled="isAddBtnDisabled">
                {{ $t('commonNotify.Add') }}
            </el-button>
        </div>
        <div class="content">
            <div class="table_container">
                <el-table :data="list" ref="multipleTable" stripe style="width: 100%;" height="100%" row-key="id" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" :reserve-selection="true"/>
                    <el-table-column label="数据点展示名称" align="center" prop="displayName" />
                    <el-table-column label="所属总线" align="center" prop="busName" />
                    <el-table-column label="所属从站" align="center" prop="slaveDisplayName" />
                    <el-table-column label="协议类型" align="center" prop="protocolType" :formatter="formatProtocolType" v-if="protocolType !== 4"/>
                    <el-table-column label="字节序" align="center" prop="endian" :formatter="formatEndian" />
                    <el-table-column label="寄存器地址" align="center" prop="registerAddress" />
                    <el-table-column label="数据点类型" align="center" prop="dataType" :formatter="formatDataType" />
                    <el-table-column label="k值" align="center" prop="switchK" />
                    <el-table-column label="b值" align="center" prop="switchB" />
                    <el-table-column label="功能码" align="center" prop="functionCode" :formatter="formatFunctionCode" />
                    <el-table-column label="描述" align="center" prop="des" />

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
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false"  width="40%">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto" class="selfDefineCenterForm">
                <el-form-item label="数据点展示名称" prop="displayName">
                    <el-input v-model="temp.displayName" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="数据点英文名称" prop="dataName">
                    <el-input v-model="temp.dataName" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="所属从站" prop="slaveDeviceId" >
                    <el-select v-model="temp.slaveDeviceId" :disabled="isDisabled">
                        <el-option :label="item.displayName" :value="item.id" :key="item.id"
                            v-for="item in listSlaveOptions"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字节序" prop="endian" v-if="protocolType!==4">
                    <el-select v-model="temp.endian" :disabled="isDisabled">
                        <el-option label="大端" :value="1"></el-option>
                        <el-option label="小端" :value="2"></el-option>
                        <el-option label="大端交换" :value="3"></el-option>
                        <el-option label="小端交换" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="寄存器地址" prop="registerAddress">
                    <el-input v-model.number="temp.registerAddress" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="数据点类型" prop="dataType" v-if="protocolType == 4">
                    <el-select v-model="temp.dataType" :disabled="isDisabled">
                        <el-option label="32位整数" :value="5"></el-option>
                        <el-option label="32位无符号整数" :value="6"></el-option>
                        <el-option label="64位整数" :value="7"></el-option>
                        <el-option label="64位无符号整数" :value="8"></el-option>
                        <el-option label="32位浮点数" :value="9"></el-option>
                        <el-option label="64位浮点数" :value="10"></el-option>
                        <el-option label="布尔" :value="11"></el-option>
                        <el-option label="字符串" :value="12"></el-option>
                        <el-option label="位域" :value="13"></el-option>
                        <el-option label="枚举" :value="14"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据点类型" prop="dataType" v-if="protocolType !== 4">
                    <el-select v-model="temp.dataType" :disabled="isDisabled">
                        <el-option label="8位整数" :value="1"></el-option>
                        <el-option label="8位无符号整数" :value="2"></el-option>
                        <el-option label="16位整数" :value="3"></el-option>
                        <el-option label="16位无符号整数" :value="4"></el-option>
                        <el-option label="32位整数" :value="5"></el-option>
                        <el-option label="32位无符号整数" :value="6"></el-option>
                        <el-option label="64位整数" :value="7"></el-option>
                        <el-option label="64位无符号整数" :value="8"></el-option>
                        <el-option label="32位浮点数" :value="9"></el-option>
                        <el-option label="64位浮点数" :value="10"></el-option>
                        <el-option label="布尔" :value="11"></el-option>
                        <el-option label="字符串" :value="12"></el-option>
                        <el-option label="位域" :value="13"></el-option>
                        <el-option label="枚举" :value="14"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="k值" prop="switchK">
                    <el-input v-model.number="temp.switchK" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="b值" prop="switchB">
                    <el-input v-model.number="temp.switchB" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="功能码" prop="functionCode">
                    <el-select v-model="temp.functionCode" :disabled="isDisabled">
                        <el-option label="浮点" :value="1"></el-option>
                        <el-option label="单点" :value="2"></el-option>
                        <el-option label="遥控" :value="3"></el-option>
                        <el-option label="遥调" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="des">
                    <el-input v-model="temp.des" :disabled="isDisabled" />
                </el-form-item>
                <el-form-item label="序列串" prop="seriesName">
                    <el-input v-model="temp.seriesName" :disabled="isDisabled" />
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

        <el-dialog title="数据点复制" :visible.sync="dialogCopyFormVisible" :close-on-click-modal="false" width="30%" @open="openCopyDialog">
            <el-form ref="dataCopyForm" :rules="rules" :model="copyTemp" label-position="left" label-width="auto"
                style="width: 300px; margin-left:50px;">
                <el-form-item label="目标从站" prop="email">
                    <el-select v-model="copyTemp.toSlaveDeviceIds" multiple collapse-tags >
                        <el-option :label="item.displayName" :value="item.id" :key="item.id"
                        v-for="item in aimSlaveStationOptions"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="CUCopyData">
                    {{ $t('commonNotify.Confirm') }}
                </el-button>
                <el-button @click="dialogCopyFormVisible = false">
                    {{ $t('commonNotify.Cancel') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import {
    listBusSelect, listDevice104Select, listDevice104SelectByDataCopy, listDeviceModbusSelect, listDeviceModbusSelectByDataCopy,
    add104NorthData, update104NorthData, delete104NorthData, list104NorthData, dataCopy104,
    addModbusNorthData, updateModbusNorthData, deleteModbusNorthData, listModbusNorthData, dataCopyModbus
} from '@/api/system/northData.js'
export default {
    data() {
        var validateNumber = (rule, value, callback) => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字整数'));
            } else {
                callback()
            }
        }
        return {
            protocolTypeArr: [
                'ModbusTCP', 'ModbusRTU', 'Modbus RTU OVER TCP', 'IEC104'
            ],
            endianArr: [
                '大端', '小端', '大端交换', '小端交换'
            ],
            dataTypeArr: [
                '8位整数', '8位无符号整数', '16位整数', '16位无符号整数',
                '32位整数', '32位无符号整数', '64位整数', '64位无符号整数',
                '32位浮点数', '64位浮点数', '布尔', '字符串', '位域', '枚举'
            ],
            functionCodeArr: [
                '浮点', '单点', '遥控', '遥调'
            ],
            transType: 2,// 北向
            protocolType: null,

            busId: null,
            listBusOptions: [],// 总线列表下拉框

            slaveId: null,
            listSlaveOptions: [],// 从站下拉列表

            currentPage: 1,
            pageSize: 50,
            total: 0,
            list: [],
            temp: {
                slaveDeviceId: null,
                endian: null,
                dataName: null,
                displayName: null,
                registerAddress: null,
                dataType: null,
                functionCode: null,
                switchK: null,
                switchB: null,
                des: null,
                seriesName: null,
            },
            rules: {
                slaveDeviceId: [
                    { required: true, message: '所属从站不能为空', trigger: 'change' }
                ],
                endian: [
                    { required: true, message: '字节序不能为空', trigger: 'change' }
                ],
                dataName: [
                    { required: true, message: '数据点英文名称不能为空', trigger: 'blur' }
                ],
                displayName: [
                    { required: true, message: '数据点展示名称不能为空', trigger: 'blur' }
                ],
                registerAddress: [
                    { required: true, message: '寄存器地址不能为空', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur' }
                ],
                dataType: [
                    { required: true, message: '数据点类型不能为空', trigger: 'change' }
                ],
                functionCode: [
                    { required: true, message: '功能码不能为空', trigger: 'change' }
                ],
                switchK: [
                    //{ required: true, message: 'k值不能为空', trigger: 'blur' },
                    {
                        required: false, validator: (rule, value, callback) => {
                            if (Number.isInteger(value)||!value) {
                                callback()
                            } else {
                                callback(new Error('请输入数字整数'));
                            }
                        }, trigger: 'blur'
                    }
                ],
                switchB: [
                    //{ required: true, message: 'b值不能为空', trigger: 'blur' },
                    {
                        required: false, validator: (rule, value, callback) => {
                            if (Number.isInteger(value)||!value) {
                                callback()
                            } else {
                                callback(new Error('请输入数字整数'));
                            }
                        }, trigger: 'blur'
                    }
                ],
                // seriesName: [
                //     { required: true, message: '序列串不能为空', trigger: 'blur' }
                // ],
                aimSlaveStation:[
                    { required: true, message: '目标从站不能为空', trigger: 'change' },
                ]
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

            dialogCopyFormVisible: false,

            aimSlaveStationOptions:[],
            copyTemp:{
                toSlaveDeviceIds:[],
                transType:2,
                dataIds:[]
            }
            
        }
    },
    computed: {
        isDisabled() {
            return this.dialogStatus === 'detail'
        },
        isCopyBtnDisabled(){
            return this.copyTemp.dataIds.length==0
        },
        isAddBtnDisabled(){
            return !this.busId
        }
    },
    methods: {
        formatProtocolType(row, column, cellValue, index) {
            return this.protocolTypeArr[cellValue - 1]
        },
        formatEndian(row, column, cellValue, index) {
            return this.endianArr[cellValue - 1]
        },
        formatDataType(row, column, cellValue, index) {
            return this.dataTypeArr[cellValue - 1]
        },
        formatFunctionCode(row, column, cellValue, index) {
            return this.functionCodeArr[cellValue - 1]
        },
        changeBus(value) {
            let item = this.listBusOptions.find(v => v.id == value)
            this.protocolType = item.protocolType
            this.slaveId = null
            this.copyTemp.dataIds = []
            this.$refs.multipleTable.clearSelection()
            this.listDeviceSelect()
            this.getList()
        },
        changeSlave() {
            this.getList()
        },
        async listBusSelect() {
            const { code, msg, data } = await listBusSelect({ transType: this.transType })
            if (code == 1) {
                this.listBusOptions = data
                if(this.busId){
                    let item = this.listBusOptions.find(v => v.id == this.busId)
                    this.protocolType = item.protocolType
                }
            }
        },
        async listDeviceSelect() {
            if(!this.busId){
                return;
            }
            let fun = this.protocolType == 4 ? listDevice104Select : listDeviceModbusSelect
            const { code, msg, data } = await fun({ busId: this.busId })
            if (code == 1) {
                this.listSlaveOptions = data
            }
        },
        async listDeviceSelectByDataCopy(){
            let fun = this.protocolType==4?listDevice104SelectByDataCopy:listDeviceModbusSelectByDataCopy
            let data1 = {transType:this.transType}
            if(this.protocolType!==4){
                data1.protocolType = this.protocolType
            }
            const {data,code,msg} = await fun(data1)
            if(code==1&&data){
                this.aimSlaveStationOptions = data
                this.copyTemp.toSlaveDeviceIds=[]
            }else{
                this.aimSlaveStationOptions = []
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
            if(!this.busId){
                return;
            }
            var data = {
                busId: this.busId,
                slaveDeviceId: this.slaveId,
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }
            let item = this.listBusOptions.find(v => v.id == this.busId)
            let busName = item.displayName

            let fun = this.protocolType == 4 ? list104NorthData : listModbusNorthData
            fun(data).then(res => {
                if (res.code == 1 && res.data) {
                    this.list = res.data.records.map(v => {
                        return {
                            ...v,
                            protocolType: this.protocolType,
                            busName
                        }
                    })
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
                slaveDeviceId: null,
                endian: null,
                dataName: null,
                displayName: null,
                registerAddress: null,
                dataType: null,
                functionCode: null,
                switchK: null,
                switchB: null,
                des: null,
                seriesName: null,
            }
        },
        handleCopy() {
            this.dialogCopyFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataCopyForm'].clearValidate()
            })
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
                slaveDeviceId: row.slaveDeviceId,
                endian: row.endian,
                dataName: row.dataName,
                displayName: row.displayName,
                registerAddress: row.registerAddress,
                dataType: row.dataType,
                functionCode: row.functionCode,
                switchK: row.switchK,
                switchB: row.switchB,
                des: row.des,
                seriesName: row.seriesName,
            }
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        handleDetail(row) {
            this.temp = {
                slaveDeviceId: row.slaveDeviceId,
                endian: row.endian,
                dataName: row.dataName,
                displayName: row.displayName,
                registerAddress: row.registerAddress,
                dataType: row.dataType,
                functionCode: row.functionCode,
                switchK: row.switchK,
                switchB: row.switchB,
                des: row.des,
                seriesName: row.seriesName,
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
                        let fun = this.protocolType==4?delete104NorthData:deleteModbusNorthData
                        const res = await fun({ northDataId: row.id })
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
            this.$router.push({ path: '/configView/southComm/SlaveStationManagement', query: { id: 1, type: 1 } })
        },
        CUData() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    //  深度复制表单的值 并且赋值给tempData
                    let fun = null;
                    if (this.dialogStatus == 'create') {
                        if (this.protocolType == 4) {
                            fun = add104NorthData
                        } else {
                            fun = addModbusNorthData
                        }
                    } else {
                        if (this.protocolType == 4) {
                            fun = update104NorthData
                        } else {
                            fun = updateModbusNorthData
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
        handleSelectionChange(selection){
            this.copyTemp.dataIds = selection.map(v=>v.id)
        },
        openCopyDialog(){
            this.listDeviceSelectByDataCopy()
        },
        CUCopyData(){
            this.$refs['dataCopyForm'].validate(valid => {
                if (valid) {
                    //  深度复制表单的值 并且赋值给tempData
                    let fun = null;
                    if (this.protocolType == 4) {
                            fun = dataCopy104
                        } else {
                            fun = dataCopyModbus
                        }
                        console.log(this.copyTemp)
                    fun(this.copyTemp)
                        .then(res => {
                            if (res.code == 1) {
                                this.dialogCopyFormVisible = false
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
        }
    },
    async mounted() {
        this.slaveId = this.$route.query.slaveId
        this.busId = this.$route.query.busId
        await this.listBusSelect()
        await this.listDeviceSelect()
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
}</style>