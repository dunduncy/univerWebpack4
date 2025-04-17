<template>
    <div class="container bg_white">
        <div class="container_add content_outer" style="height: 100%">
            <el-row style="height: 100%">
                <el-col :span="4" style="height:100%">
                    <div class="menu">
                        <el-tree ref="treeOut" :data="treeList" :props="defaultProps" node-key="treeId" accordion
                            :highlight-current="true" @node-click="handleNodeClick" :expand-on-click-node="false">
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="20" style="height:100%">
                    <div style="width:100%;height:calc(100% - 62px);margin-top:10px">
                        <el-table :data="list" stripe height="100%" style="width: 100%">
                            <el-table-column label="北向数据点名称" align="center" prop="displayName" />
                            <el-table-column label="回调名称" align="center" prop="callbackName" />
                            <el-table-column label="回调函数" align="center" prop="callbackFunc" />
                            <el-table-column :label="$t('commonNotify.Operation')" align="center" width="300"
                                class-name="small-padding fixed-width">
                                <template slot-scope="{ row }">
                                    <a class="operateA" @click="handleAdd(row)" v-if="!row.callbackName">
                                        {{ $t('commonNotify.Add') }}
                                    </a>
                                    <a class="operateA" @click="handleEdit(row)" v-if="row.callbackName">
                                        {{ $t('commonNotify.Edit') }}
                                    </a>
                                    <a class="operateA" @click="handleDelete(row)" v-if="row.callbackName">
                                        删除回调
                                    </a>
                                </template>
                            </el-table-column>
                            <template slot="empty">
                                <img src="@/assets/image/noData.png" style="width: 300px" />
                            </template>
                        </el-table>
                    </div>
                    <div class="pageContainer">
                        <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                            :pager-count="5" :page-sizes="[50, 100, 150, 200]" :current-page="currentPage" :page-size="pageSize"
                            :total="total" @size-change="handleSizeChange" @current-change="currentPageChange">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--新增/修改-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form ref="dataForm" :model="form" label-width="auto" :rules="rules">
                <el-form-item label="回调名称" prop="displayName">
                    <el-input v-model="form.displayName"></el-input>
                </el-form-item>
                <el-form-item label="回调函数" prop="callbackFunc">
                    <el-input type="textarea" v-model="form.callbackFunc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="CUData">
                    {{ $t("commonNotify.Confirm") }}
                </el-button>
                <el-button @click="dialogFormVisible = false">
                    {{ $t("commonNotify.Cancel") }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listNorthBusTree } from '@/api/system/southNorthForward'
import { addDataCallback, updateDataCallback, deleteDataCallback, listNorthDataCallback } from '@/api/system/southNorthCallback'


export default {
    data() {
        var checkformular = (rule, value, callback) => {
            let results = this.form.formular.match(/[a-zA-Z]{1,}/g)
            if (results && results.length > 0) {
                let a = results.map((v, index) => {
                    return {
                        value: '',
                        label: v
                    }
                })
                this.$set(this.form, 'dataList', a)
                callback();
            } else {
                callback(new Error('输入格式错误'));
            }
        }
        return {
            currentPage: 1,
            pageSize: 50,
            total: 0,
            list: [],
            currentTreeNode: null,
            treeList: [],
            defaultProps: {
                children: "childList",
                label: "displayName",
            },

            dialogFormVisible: false,

            tableData: [],
            currentRow: null,
            form: {
                displayName: null,
                des: null,
                protocolType: null,
                dataId: null,
                callbackFunc: null,
            },
            rules: {
                displayName: [
                    { required: true, message: '回调名称不能为空', trigger: 'blur' },
                ],
                callbackFunc: [
                    { required: true, message: '回调函数不能为空', trigger: 'blur' },
                ],
            },
            dialogStatus: '',
            //   用来存储两种状态
            textMap: {
                update: this.$t('commonNotify.Edit'),
                create: this.$t('commonNotify.Add')
            },

        };
    },
    methods: {
        formatSourceType(row, column, cellValue, index) {
            if (cellValue == 1) {
                return '单数据点'
            } else {
                return '计算公式'
            }
        },
        async listSouthBusSelect() {
            const { code, data, msg } = await listSouthBusSelect()
            if (code == 1 && data) {
                this.dataNameOptions = data
            }
        },
        handleChange(e) {
            console.log(this.$refs.cascader)
            console.log(e)
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
            let data = {
                deviceId: this.currentTreeNode.treeId,
                protocolTyp: this.currentTreeNode.protocolType,
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }
            listNorthDataCallback(data).then((res) => {
                if (res.code == 1 && res.data && res.data.records && res.data.records.length > 0) {
                    this.list = res.data.records
                    this.total = res.data.total
                    this.currentPage = res.data.current
                } else {
                    this.list = []
                    this.total = 0
                    this.currentPage = 1
                }
            });
        },
        handleAdd(row) {
            this.dialogStatus = 'create'
            this.currentRow = row
            this.form = {
                displayName: null,
                des: row.des,
                protocolType: this.currentTreeNode.protocolType,
                dataId: row.northDataId,
                callbackFunc: null,
            }
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        handleEdit(row) {
            this.form = {
                id: row.northDataId,
                displayName: row.callbackName,
                des: row.des,
                protocolType: this.currentTreeNode.protocolType,
                dataId: row.northDataId,
                callbackFunc: row.callbackFunc,
            }
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
        },
        handleDelete(row) {
            this.$confirm(this.$t('commonNotify.DeleteInfoMessage'), this.$t('commonNotify.Prompt'), {
                confirmButtonText: this.$t('commonNotify.Confirm'),
                cancelButtonText: this.$t('commonNotify.Cancel'),
                type: 'warning'
            })
                .then(async () => {
                    try {
                        console.log(row)
                        const res = await deleteDataCallback({ northDataId: row.northDataId })
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
        handleNodeClick(data, node) {
            this.currentTreeNode = data;
            if (this.currentTreeNode.treeType == 2) {
                this.getList();
            }
        },
        getTree() {
            listNorthBusTree().then((res) => {
                this.treeList = res.data;
            });
        },
        handleCheckChange(data, node) {
            this.currentDeviceNode = data
            if (data.propertyList) {
                this.treeData = data.propertyList;
                let arr = this.bindPropertyListMap[data.treeId]
                if (arr && arr.length > 0) {
                    arr.forEach(v => {
                        this.$nextTick(() => {
                            this.$refs.multipleTable.toggleRowSelection(v, true)
                        })
                    })
                }
            } else {
                this.treeData = [];
            }
        },
        CUData() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let fun = this.dialogStatus == 'create' ? addDataCallback : updateDataCallback
                    fun(this.form).then((res) => {
                        if (res.code == 1) {
                            this.$notify({
                                title: this.$t('commonNotify.Success'),
                                message: (this.dialogStatus == 'create' ? this.$t('commonNotify.CreatedSuccessfully') : this.$t('commonNotify.UpdatedSuccessfully')),
                                type: 'success',
                                duration: 2000
                            })
                            this.getList();
                            this.dialogFormVisible = false;
                        } else {
                            this.$message({
                                message: this.$t('commonNotify.UpdateFailed') + (res.msg ? (`,${this.$t('commonNotify.Reason')}:` + res.msg) : ''),
                                type: 'error',
                                duration: 5 * 1000
                            })
                        }
                    }).catch(error => {
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
        sendSocketData(msg) {
            if (this.$ws.ws && this.$ws.ws.readyState == 1) {
                console.log('发送信息', msg);
                this.$ws.ws.send(msg);
            }
        },
        getSocketData() {
            this.$ws.ws.onmessage = function (res) {
                console.log('收到服务器内容', res);
            };
        },
        changeCalcType(v) {
            if (v == 1) {
                // 数据点
                this.form.sourceData = null
            } else {
                // 计算公式
                this.form.sourceData = null
            }
        }
    },
    created() {
        this.getSocketData()
    },
    mounted() {
        this.getTree();
    },
};
</script>

<style scoped lang="scss">
@import "@/styles/layout_common.scss";
@import "@/styles/table_scrollbar.scss";

.menu {
    width: calc(100% - 20px);
    overflow: auto;
    height: 100%;
    padding: 10px;
    border: 1px solid #e9e9e9;
}

.small-menu {
    // width: calc(100% - 20px);
    height: 100%;
    padding: 10px;
    border: 1px solid #e9e9e9;
}

::v-deep .el-tree .el-icon-caret-right.el-tree-node__expand-icon.is-leaf::before {
    background: none;
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    font-size: 16px;
    background-size: 16px;
}
</style>
