<template>
    <div class="tableContainer">
        <el-dialog title="数据点列表" width="80%" :visible.sync="dialogTableVisible" :close-on-click-modal="false"
            :close-on-press-escape="false" :append-to-body="true" @close="closeDialog">
            <div class="btns">
                <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="handleCreate">新增</el-button>
            </div>
            <el-table :data="list" stripe height="500px">
                <el-table-column property="" label="所属模板" :formatter="formatTemplate" width="150"></el-table-column>
                <el-table-column property="propName" label="数据点名称" width=""></el-table-column>
                <el-table-column property="propDes" label="数据点描述"></el-table-column>
                <el-table-column property="base" label="量程" width=""></el-table-column>
                <el-table-column property="percentage" label="变化幅度" width=""></el-table-column>
                <el-table-column property="dataType" label="数据点类型" :formatter="formatDataType"></el-table-column>
                <el-table-column property="serviceType" label="数据点业务类型" :formatter="formatServiceType"></el-table-column>
                <el-table-column property="unit" label="单位" width=""></el-table-column>
                <el-table-column property="spon" label="是否自发上传" width="" :formatter="formatSpon"></el-table-column>
                <el-table-column property="perdic" label="是否周期上传" width="" :formatter="formatPerdic"></el-table-column>
                <el-table-column property="specs" label="解析方式" width=""></el-table-column>
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
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto" class="selfDefineCenterForm">
                <el-form-item label="数据点名称" prop="propName">
                    <el-input v-model="temp.propName" />
                </el-form-item>
                <el-form-item label="数据点描述" prop="propDes">
                    <el-input v-model="temp.propDes" />
                </el-form-item>
                <el-form-item label="数据点类型" prop="dataType">
                    <el-select v-model="temp.dataType">
                        <el-option :value="1" label="bitfield"></el-option>
                        <el-option :value="2" label="bool"></el-option>
                        <el-option :value="3" label="enum"></el-option>
                        <el-option :value="4" label="float"></el-option>
                        <el-option :value="5" label="int16"></el-option>
                        <el-option :value="6" label="unit16"></el-option>
                        <el-option :value="7" label="unit32"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据点业务类型" prop="serviceType">
                    <el-select v-model="temp.serviceType">
                        <el-option value="yc" label="遥测"></el-option>
                        <el-option value="yx" label="遥信"></el-option>
                        <el-option value="yt" label="遥调"></el-option>
                        <el-option value="yk" label="遥控"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="temp.unit" />
                </el-form-item>
                <el-form-item label="是否自发上传" prop="spon">
                    <el-select v-model="temp.spon">
                        <el-option :value="1" label="是"></el-option>
                        <el-option :value="0" label="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否周期上传" prop="perdic">
                    <el-select v-model="temp.perdic">
                        <el-option :value="1" label="是"></el-option>
                        <el-option :value="0" label="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="量程" prop="base" v-if="temp.spon == 1">
                    <el-input v-model.number="temp.base" />
                </el-form-item>
                <el-form-item label="变化幅度" prop="percentage" v-if="temp.spon == 1">
                    <el-input v-model.number="temp.percentage" />
                </el-form-item>
                <el-form-item label="正反逻辑" prop="logicFlag" v-if="temp.dataType == 2">
                    <el-radio v-model="temp.logicFlag" :label="1">正逻辑</el-radio>
                    <el-radio v-model="temp.logicFlag" :label="0">反逻辑</el-radio>
                </el-form-item>
                <el-form-item label="k值" prop="switchK" v-if="[4, 5, 6, 7].indexOf(temp.dataType) > -1">
                    <el-input v-model="temp.switchK" />
                </el-form-item>
                <el-form-item label="b值" prop="switchB" v-if="[4, 5, 6, 7].indexOf(temp.dataType) > -1">
                    <el-input v-model="temp.switchB" />
                </el-form-item>
                <el-form-item v-if="temp.dataType == 3">
                    <div class="mapDiv" v-for="( item, index ) in  keyValueList ">
                        <div class="map">
                            <span>key值</span><el-input v-model="item.key" />
                        </div>
                        <div class="map">
                            <span>value值</span><el-input v-model="item.value" />
                        </div>
                        <div style="width:48px">
                            <a class="mapA el-icon-plus" @click="addKeyValue(item, index)"></a>
                            <a class="mapA el-icon-minus" @click="deleteKeyValue(item, index)" v-show="index>0&&keyValueList.length>1"></a>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="位域类型" prop="bitType" v-if="temp.dataType == 1">
                    <el-select v-model="temp.bitType">
                        <el-option :value="2" label="bool"></el-option>
                        <el-option :value="3" label="enum"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="正反逻辑" prop="bitLogicFlag" v-if="temp.dataType == 1 && temp.bitType == 2">
                    <el-radio v-model="temp.bitLogicFlag" :label="1">正逻辑</el-radio>
                    <el-radio v-model="temp.bitLogicFlag" :label="0">反逻辑</el-radio>
                </el-form-item>
                <el-form-item label="位域描述" prop="bitDes" v-if="temp.dataType == 1 && temp.bitType == 2">
                    <el-input v-model="bitDes" />
                </el-form-item>
                <template v-for="( item, index ) in  descriptionList " v-if="temp.dataType == 1 && temp.bitType == 3">
                    <el-form-item label="位域描述" prop="">
                        <div class="mapDiv">
                            <el-input v-model="item.bitDes" style="flex:1" />
                            <div style="width:48px">
                                <a class="mapA el-icon-plus" @click="addDescription(item, index)"></a>
                                <a class="mapA el-icon-minus" @click="deleteDescription(item, index)"></a>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="起始bit位" prop="">
                        <el-input v-model="item.bitStart" />
                    </el-form-item>
                    <el-form-item label="结束bit位" prop="">
                        <el-input v-model="item.bitEnd" />
                    </el-form-item>
                    <el-form-item prop="">
                        <template>
                            <div class="mapDiv" v-for="( enumItem, index ) in  item.enumData ">
                                <div class="map">
                                    <span>key值</span><el-input v-model="enumItem.key" />
                                </div>
                                <div class="map">
                                    <span>value值</span><el-input v-model="enumItem.value" />
                                </div>
                                <div style="width:48px">
                                    <a class="mapA el-icon-plus" @click="addKeyValue(item, index)"></a>
                                    <a class="mapA el-icon-minus" @click="deleteKeyValue(item, index)"></a>
                                </div>
                            </div>
                        </template>
                    </el-form-item>
                </template>
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
    addMqttTemplateProp,
    updateMqttTemplateProp,
    deleteMqttTemplateProp,
    listMqttTemplateProp,
    getMqttTemplatePropSpec
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
            dataType: [
                'bitfield', 'bool', 'enum', 'float', 'int16', 'uint16', 'uint32'
            ],
            serviceType: { yc: '遥测', yx: '遥信', yt: '遥调', yk: '遥控' },
            currentPage: 1,
            pageSize: 50,
            total: 0,
            list: [],
            dialogTableVisible: false,
            temp: {
                mqttTemplateId: null,
                propName: null,
                propDes: null,
                base: null,
                percentage: null,
                dataType: null,
                serviceType: null,
                unit: null,
                spon: null,
                perdic: null,
                logicFlag: null,
                switchK: null,
                switchB: null,
                enumData: null,
                bitDes: null,
                bitType: null,
                bitLogicFlag: null,
                bitLogicData: null,
                bitEnum: null,
            },
            keyValueList: [
                {
                    key: 'a',
                    value: 1
                },
                {
                    key: 'b',
                    value: 2
                }
            ],
            descriptionList: [
                {
                    bitStart: '',
                    bitEnd: '',
                    bitDes: '123123',
                    enumData: [
                        {
                            key: 'a',
                            value: 1
                        },
                        {
                            key: 'b',
                            value: 2
                        }
                    ],
                },
                {
                    bitStart: '',
                    bitEnd: '',
                    des: '456456',
                    enumData: [
                        {
                            key: 'a',
                            value: 1
                        },
                        {
                            key: 'b',
                            value: 2
                        }
                    ],
                },
            ],
            rules: {
                orgId: [
                    { required: true, message: this.$t('system$user$index_vue.Theorganizationcannotbeempty'), trigger: 'change' }
                ],
                username: [
                    { required: true, message: this.$t('system$user$index_vue.Usernamecannotbeempty'), trigger: 'blur' }
                ],
                email: [{
                    validator: (rule, value, callback) => {
                        var reg = new RegExp('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$');
                        if (value && value.trim() !== '') {
                            if (!reg.test(value)) {
                                return callback(new Error(this.$t('system$user$index_vue.Incorrectemailformat')))
                            }
                        }
                        callback()
                    },
                    trigger: 'blur'
                }],
                phone: [{
                    validator: (rule, value, callback) => {
                        var reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
                        if (value && value.trim() !== '') {
                            if (!reg.test(value)) {
                                return callback(new Error(this.$t('system$user$index_vue.Incorrectphonenumberformat')))
                            }
                        }
                        callback()
                    },
                    trigger: 'blur'
                }],
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
    computed: {
        getKeyValueList() {
            return this.temp.keyValueList
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
        formatTemplate(row, column, cellValue, index) {
            return this.mqttTemplateName
        },
        formatDataType(row, column, cellValue, index) {
            return this.dataType[cellValue - 1]
        },
        formatServiceType(row, column, cellValue, index) {
            return this.serviceType[cellValue]
        },
        formatSpon(row, column, cellValue, index) {
            if (cellValue == 1) {
                return '是'
            } else {
                return '否'
            }
        },
        formatPerdic(row, column, cellValue, index) {
            if (cellValue == 1) {
                return '是'
            } else {
                return '否'
            }
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
            listMqttTemplateProp(data).then(res => {
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
                mqttTemplateId: this.mqttTemplateId,
                propName: null,
                propDes: null,
                base: null,
                percentage: null,
                dataType: null,
                serviceType: null,
                unit: null,
                spon: null,
                perdic: null,
                logicFlag: null,
                switchK: null,
                switchB: null,
                enumData: null,
                bitDes: null,
                bitType: null,
                bitLogicFlag: null,
                bitLogicData: null,
                bitEnum: null,
            }
            this.keyValueList = [
                {
                    key: '',
                    value: ''
                },
            ]
            this.descriptionList = [
                {
                    bitStart: '',
                    bitEnd: '',
                    bitDes: '',
                    enumData: [
                        {
                            key: '',
                            value: null
                        },
                        {
                            key: '',
                            value: null
                        }
                    ],
                },
            ]
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
                mqttTemplateId: row.mqttTemplateId,
                propName: row.propName,
                propDes: row.propDes,
                base: row.base,
                percentage: row.percentage,
                dataType: row.dataType,
                serviceType: row.serviceType,
                unit: row.unit,
                spon: row.spon,
                perdic: row.perdic,
                logicFlag: row.logicFlag,
                switchK: row.switchK,
                switchB: row.switchB,
                enumData: row.enumData,
                bitDes: row.bitDes,
                bitType: row.bitType,
                bitLogicFlag: row.bitLogicFlag,
                bitLogicData: row.bitLogicData,
                bitEnum: row.bitEnum,
            }
            if (row.dataType == 1) {
                // 位域
                if (bitType == 3) {
                    // 枚举
                    if (row.bitEnum) {
                        this.descriptionList = JSON.parse(row.bitEnum)
                    } else {
                        this.descriptionList = []
                    }
                }
            } else if (row.dataType == 2) {
                // 布尔
            } else if (row.dataType == 3) {
                // 枚举
                if (row.enumData) {
                    this.keyValueList = JSON.parse(row.enumData)
                } else {
                    this.keyValueList = []
                }
            } else if ([4, 5, 6, 7].indexOf(row.dataType)) {
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
                        const res = await deleteMqttTemplateProp({ propId: row.id })
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
        handleTempData(){
            let flag = true
            if (this.temp.dataType == 1) {
                // 位域
                if (bitType == 3) {
                    // 枚举
                    if (row.bitEnum) {
                        this.descriptionList = JSON.parse(row.bitEnum)
                    } else {
                        this.descriptionList = []
                    }
                }
            } else if (this.temp.dataType == 2) {
                // 布尔
            } else if (this.temp.dataType == 3) {
                // 枚举
                if(this.keyValueList&&this.keyValueList.length>0){
                    for (let index = 0; index < this.keyValueList.length; index++) {
                        const element = this.keyValueList[index];
                        if(!element.value||!element.key){
                            flag = false
                            break;
                        }
                    }
                }else{
                    flag = false
                }
                this.temp.enumData = JSON.stringfy(this.keyValueList)
            }
            return flag
        },
        CUData() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    //  深度复制表单的值 并且赋值给tempData
                    // 校验其他不在表单的数据
                    this.handleTempData()
                    const fun = (this.dialogStatus == 'create' ? addMqttTemplateProp : updateMqttTemplateProp)
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
                                this.getList()
                            } else {
                                this.$message({
                                    message: this.$t('commonNotify.UpdateFailed') + (res.msg ? (`,${this.$t('commonNotify.Reason')}:` + res.msg) : ''),
                                    type: 'error',
                                    duration: 5 * 1000
                                })
                            }
                            
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
        addKeyValue(item, index) {
            this.keyValueList.splice(index + 1, 0, {
                key: "",
                value: ""
            })
        },
        deleteKeyValue(item, index) {
            this.keyValueList.splice(index, 1)
        },
        addDescription(item, index) {
            this.descriptionList.splice(index + 1, 0, { des: '' })
        },
        deleteDescription(item, index) {
            this.descriptionList.splice(index, 1)
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';
@import '@/styles/defineForm.scss';

.btns {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
}

.mapDiv {
    display: flex;
    height: 40px;
    margin-bottom: 10px;

    .map {
        flex: 1;
        display: flex;

        span {
            text-wrap: nowrap;
            margin: 0 10px;
        }

    }

    .mapA {
        margin-left: 10px;
    }
}
</style>