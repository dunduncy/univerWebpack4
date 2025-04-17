<template>
    <div class="container bg_white">
        <div class="container_add content_outer" style="height: 100%">
            <TableTitle title="电池配置"> </TableTitle>
            <el-row style="height: calc(100% - 47px)">
                <el-col :span="4" style="height:100%">
                    <div class="menu">
                        <el-tree ref="treeOut" :data="treeList" :props="defaultProps" node-key="id" accordion
                            :highlight-current="true" @node-click="handleNodeClick" :expand-on-click-node="false">
                            <!-- <template slot-scope="{ node, data }">
                                <div class="nodeOutter">
                                    <img class="nodeIcon" v-if="node.level >= 4" :src="handleNode(node)" />
                                    <span class="nodeLabel">{{ data.displayName }}</span>
                                </div>
                            </template> -->
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="20" style="height:100%">
                    <div style="text-align:right"><el-button type="primary" size="small" @click="handleAdd">新增</el-button>
                    </div>
                    <div style="width:100%;height:calc(100% - 42px);margin-top:10px">
                        <el-table :data="list" stripe height="100%" style="width: 100%">
                            <el-table-column label="所属项目" align="center" prop="projectName" />
                            <el-table-column label="所属LCCU" align="center" prop="lccuName" />
                            <el-table-column label="所属设备" align="center" prop="deviceName" />
                            <el-table-column label="电池pack名称" align="center" prop="packName" />
                            <el-table-column label="序号" align="center" prop="orderNum" />

                            <el-table-column :label="$t('commonNotify.Operation')" align="center" width="300"
                                class-name="small-padding fixed-width">
                                <template slot-scope="{ row }">
                                    <a class="operateA" @click="bindValue(row)">
                                        绑定数据点
                                    </a>
                                    <a class="operateA" @click="handleDetail(row)">
                                        查看
                                    </a>
                                    <a class="operateA" @click="handleEdit(row)">
                                        修改
                                    </a>
                                    <a class="operateA" @click="handleDelete(row)">
                                        删除
                                    </a>
                                </template>
                            </el-table-column>
                            <template slot="empty">
                                <img src="@/assets/image/noData.png" style="width: 300px" />
                            </template>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--绑定数据点-->
        <el-dialog :title="$t('system$miniProgramConfig$index_vue.Association')" :visible.sync="dialogBindVisible"
            :close-on-click-modal="false">
            <el-row>
                <el-form ref="form" :model="bindForm" label-width="auto" :rules="rules">
                    <el-form-item label="pack名称" prop="packName">
                        <el-input v-model="bindForm.packName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="统计类型" prop="statisticsType">
                        <el-select v-model="bindForm.statisticsType">
                            <el-option label="温度" :value="1"></el-option>
                            <el-option label="电压" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="序号" prop="orderNum">
                        <el-input v-model="bindForm.orderNum"></el-input>
                    </el-form-item>
                    <el-form-item label="数据点" prop="dataId">
                        <el-select v-model="bindForm.dataId">
                            <el-option :label="item.displayName" :value="item.treeId" :key="item.treeId"
                                v-for="item in propertyList"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row> </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmBindData">
                    {{ $t("commonNotify.Confirm") }}
                </el-button>
                <el-button @click="dialogBindVisible = false">
                    {{ $t("commonNotify.Cancel") }}
                </el-button>
            </div>
        </el-dialog>
        <!--查看-->

        <el-dialog title="详情" :visible.sync="detailVisible" :close-on-click-modal="false">
            <el-table :data="detailList" stripe ref="multipleTable" tooltip-effect="dark" max-height="480">
                <el-table-column label="所属电池PACK" align="center" prop="packName" />
                <el-table-column label="统计类型" align="center" prop="statisticsType" :formatter="formatStatisticsType" />
                <el-table-column label="数据点名称" align="center" prop="dataName" />
                <el-table-column label="序号" align="center" prop="orderNum" />

                <el-table-column :label="$t('commonNotify.Operation')" align="center" width="300"
                    class-name="small-padding fixed-width">
                    <template slot-scope="{ row }">
                        <a class="operateA" @click="handleEditDetail(row)">
                            修改
                        </a>
                        <a class="operateA" @click="handleDeleteDetail(row)">
                            删除
                        </a>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <img src="@/assets/image/noData.png" style="width: 300px" />
                </template>
            </el-table>
        </el-dialog>

        <!--新增/修改-->
        <el-dialog :title="textMap[dialogStatus]" :rules="rules" :visible.sync="dialogBindVisible_special"
            :close-on-click-modal="false">
            <el-row>
                <el-form ref="form1" :model="form" label-width="80px">
                    <el-form-item label="pack名称" prop="packName">
                        <el-input v-model="form.packName"></el-input>
                    </el-form-item>
                    <el-form-item label="序号" prop="orderNum">
                        <el-input v-model.number="form.orderNum"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row> </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="CUData">
                    {{ $t("commonNotify.Confirm") }}
                </el-button>
                <el-button @click="dialogBindVisible_special = false">
                    {{ $t("commonNotify.Cancel") }}
                </el-button>
            </div>
        </el-dialog>

        <!--修改详情-->
        <el-dialog title="修改" :visible.sync="dialogDetailEditVisible" :close-on-click-modal="false">
            <el-row>
                <el-form ref="form2" :model="detailForm" label-width="80px" :rules="rules">
                    <el-form-item label="数据点" prop="dataId">
                        <el-select v-model="detailForm.dataId">
                            <el-option :label="item.displayName" :value="item.treeId" :key="item.treeId"
                                v-for="item in propertyList">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="序号" prop="orderNum">
                        <el-input v-model="detailForm.orderNum"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row> </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmEditDetail">
                    {{ $t("commonNotify.Confirm") }}
                </el-button>
                <el-button @click="dialogDetailEditVisible = false">
                    {{ $t("commonNotify.Cancel") }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import TableTitle from "@/components/system/TableTitle";
export default {
    data() {
        return {
            list: [],
            detailList: [],
            currentProjectNode: "",
            currentLccuNode: "",
            lccuId: "",
            currentTreeNode: null,
            treeList: [],
            bindTreeList: [],
            defaultProps: {
                children: "children",
                label: "displayName",
            },
            treeProps: {
                children: "treeVOList",
                label: "displayName",
            },
            dialogBindVisible: false,
            dialogBindVisible_special: false,
            detailVisible: false,
            dialogDetailEditVisible: false,

            tableData: [],
            treeData: [],
            orgId: null,
            proId: null,
            currentRow: null,
            bindIdData: [],
            bindPropertyListMap: {},
            tableRadio: null,

            logic: 1,
            currentDeviceNode: null,
            currentDeviceNode_special: null,

            form: {
                id: '',
                projectId: '',
                lccuId: '',
                deviceId: '',
                orderNum: '',
                packName: '',
            },
            bindForm: {
                packName: '',
                packId: '',
                statisticsType: '',
                orderNum: '',
                dataId: '',
            },
            detailForm: {
                id:'',
                dataId: '',
                orderNum: '',
            },
            rules: {
                packName: [
                    { required: true, message: '请输入pack名称', trigger: 'blur' },
                ],
                orderNum: [
                    { required: true, message: '请输入序号', trigger: 'change' }
                ],
                statisticsType: [
                    { required: true, message: '请选择统计类型', trigger: 'change' }
                ],
                dataId: [
                    { required: true, message: '请选择数据点', trigger: 'change' }
                ],
            },
            propertyList: [],
            dialogStatus: '',
            //   用来存储两种状态
            textMap: {
                update: this.$t('commonNotify.Edit'),
                create: this.$t('commonNotify.Add')
            },
        };
    },
    components: {
        TableTitle,
    },
    methods: {
        formatStatisticsType(row, column, cellValue, index) {
            if (cellValue == 0) {
                return '电压'
            } else {
                return '温度'
            }
        },
        getList() {
            listBatteryPack({
                deviceId: this.currentTreeNode.id
            }).then((res) => {
                if (res.code == 1 && res.data && res.data.length > 0) {
                    this.list = res.data
                } else {
                    this.list = []
                }
            });
        },
        handleAdd() {
            if (!this.currentTreeNodeNew || this.currentTreeNodeNew.level < 4) {
                this.$message({
                    type: 'warning',
                    message: "请选择设备"
                })
                return
            }
            this.form = {
                projectId: this.currentProjectNode.id,
                lccuId: this.currentLccuNode.id,
                deviceId: this.currentTreeNode.id,
                orderNum: '',
                packName: '',
            }
            this.dialogStatus = 'create'
            this.dialogBindVisible_special = true
        },
        handleEdit(row) {
            this.form = {
                id: row.id,
                deviceId: row.deviceId,
                orderNum: row.orderNum,
                packName: row.packName,
            }
            this.dialogStatus = 'update'
            this.dialogBindVisible_special = true
        },
        async handleDetail(row) {
            this.currentRow = row
            await this.getDetailList()
            this.detailVisible = true
        },
        async getDetailList(){
            const res = await listBatteryPackConfig({ batteryPackId: this.currentRow.id })
            this.detailList = res.data
        },
        handleDelete(row) {
            this.$confirm(this.$t('commonNotify.DeleteInfoMessage'), this.$t('commonNotify.Prompt'), {
                confirmButtonText: this.$t('commonNotify.Confirm'),
                cancelButtonText: this.$t('commonNotify.Cancel'),
                type: 'warning'
            })
            .then(async () => {
                try {
                    const res = await deleteBatteryPack({ batteryPackId: row.id })
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
        handleEditDetail(row) {
            this.detailForm={
                id:row.id,
                dataId: row.dataId,
                orderNum: row.orderNum,
            },
            this.dialogDetailEditVisible = true
        },
        handleDeleteDetail(row) {
            this.$confirm(this.$t('commonNotify.DeleteInfoMessage'), this.$t('commonNotify.Prompt'), {
                confirmButtonText: this.$t('commonNotify.Confirm'),
                cancelButtonText: this.$t('commonNotify.Cancel'),
                type: 'warning'
            })
            .then(async () => {
                try {
                    const res = await deletePackConfig({ packConfigId: row.id })
                    if (res.code == 1) {
                        this.$notify({
                            title: this.$t('commonNotify.Success'),
                            message: this.$t('commonNotify.SuccessfullyDeleted'),
                            type: 'success',
                            duration: 2000
                        })
                        this.getDetailList()
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
        confirmEditDetail() {
            this.$refs['form2'].validate(valid => {
                if (valid) {
                    let fun = updatePackConfig
                    fun(this.detailForm).then((res) => {
                        if (res.code == 1) {
                            this.$notify({
                                title: this.$t('commonNotify.Success'),
                                message: (this.dialogStatus == 'create' ? this.$t('commonNotify.CreatedSuccessfully') : this.$t('commonNotify.UpdatedSuccessfully')),
                                type: 'success',
                                duration: 2000
                            })
                            this.getDetailList();
                            this.dialogDetailEditVisible = false
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
        handleNode(node) {
            let img = null
            img = require('@/assets/image/tree/lastLevelIcon1.png')
            return img
        },
        handleSelectionChangeBind(val) {
            this.bindPropertyListMap[this.currentDeviceNode.treeId] = val
        },
        handleNodeClick(data, node) {
            this.currentTreeNode = data;
            this.currentTreeNodeNew = node;
            if (node.level === 1) {
                // 一级组织
                this.getExpandNode(node.level);
                this.orgId = data.id;
                this.currentProjectNode = null;
                this.currentLccuNode = null
                this.lccuId = null
                this.proId = null;
                this.list = [];
            } else if (node.level === 2) {
                // 二级项目
                this.getExpandNode(node.level);
                this.currentProjectNode = data;
                this.proId = data.id;
                this.currentLccuNode = null
                this.lccuId = null
            } else if (node.level === 3) {
                // 三级LCCU
                this.getExpandNode(node.level);
                this.currentLccuNode = data;
                this.lccuId = data.id;
            } else {
                if (this.currentTreeNode.treeVOList && this.currentTreeNode.treeVOList.length > 0) {
                    this.$nextTick(() => {
                        this.$refs.treeOut.updateKeyChildren(
                            this.currentTreeNode.id,
                            this.currentTreeNode.treeVOList.map(v => { v.id = v.treeId; return v })
                        );
                    });
                }
                if (this.currentTreeNode.propertyList && this.currentTreeNode.propertyList.length > 0) {
                    this.propertyList = this.currentTreeNode.propertyList
                }
                this.getList();
            }
        },
        getExpandNode(level) {
            if (level == 1) {
                // 查询项目
                getOrgProject({ orgId: this.currentTreeNode.id }).then((res) => {
                    this.$nextTick(() => {
                        this.$refs.treeOut.updateKeyChildren(
                            this.currentTreeNode.id,
                            res.data
                        );
                    });
                });
            }
            else if (level == 2) {
                // 查询Lccu
                getLccuByProject({ projectId: this.currentTreeNode.id }).then((res) => {
                    this.$nextTick(() => {
                        this.$refs.treeOut.updateKeyChildren(
                            this.currentTreeNode.id,
                            res.data
                        );
                    });
                });
            }
            else if (level == 3) {
                // 查询设备
                getProjectDeviceTreeByProjectId({
                    projectId: this.currentTreeNodeNew.parent.data.id
                }).then((res) => {
                    let bindTreeList = res.data.treeVOList.filter(v => v.treeId == this.lccuId);
                    let a = []
                    if (bindTreeList && bindTreeList.length > 0) {
                        if (bindTreeList[0].treeVOList && bindTreeList[0].treeVOList.length > 0) {
                            bindTreeList[0].treeVOList.forEach(v => {
                                v.id = v.treeId
                            })
                            a = bindTreeList[0].treeVOList
                        }
                    }
                    this.$nextTick(() => {
                        this.$refs.treeOut.updateKeyChildren(
                            this.currentTreeNode.id,
                            a
                        );
                    });
                });
            }

        },
        getTree() {
            initOrgTree().then((res) => {
                this.treeList = res.data;
            });
        },
        
        getBindTree(row) {
            getProjectDeviceTreeByProjectId({
                projectId: this.currentProjectNode
                    ? this.currentProjectNode.id
                    : null,
            }).then((res) => {
                this.bindTreeList = res.data.treeVOList.filter(v => v.treeId == this.lccuId);
                console.log(this.bindTreeList)
                if (row.statisticsType == 13 || row.statisticsType == 32) {
                    this.dialogBindVisible_special = true;
                } else {
                    this.dialogBindVisible = true;
                }
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
        handleCheckChange_special(data, node) {
            this.currentDeviceNode_special = node
        },
        // 递归生成设备树级联id
        getTreeId(node, idPath = '') {
            if (idPath == '') {
                idPath = node.data.treeId
            } else {
                idPath = node.data.treeId + ',' + idPath
            }
            if (node.level > 1) {
                return this.getTreeId(node.parent, idPath)
            } else {
                return idPath
            }
        },
        //绑定
        bindValue(row) {
            this.bindForm = {
                packName: row.packName,
                packId: row.id,
                statisticsType: 1,
                orderNum: row.orderNum,
                dataId: '',
            }
            this.dialogBindVisible = true;
        },
        
        confirmBindData() {

            this.$refs['form'].validate(valid => {
                if (valid) {
                    let fun = bindBatteryPackConfig
                    let a = {
                        packId: this.bindForm.packId,
                        statisticsType: this.bindForm.statisticsType,
                        orderNum: this.bindForm.orderNum,
                        dataId: this.bindForm.dataId,
                    }
                    fun(a).then((res) => {
                        if (res.code == 1) {
                            this.$notify({
                                title: this.$t("commonNotify.Success"),
                                message: this.$t('system$miniProgramConfig$index_vue.Bindingsuccessful'),
                                type: "success",
                                duration: 2000,
                            });
                            this.getList();
                            this.dialogBindVisible = false;
                        } else {
                            this.$notify({
                                title: this.$t("commonNotify.OperateFailed"),
                                message: res.msg,
                                type: "error",
                                duration: 2000,
                            });
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
        CUData() {
            this.$refs['form1'].validate(valid => {
                if (valid) {
                    let fun = this.dialogStatus == 'create' ? addBatteryPack : updateBatteryPack
                    fun(this.form).then((res) => {
                        if (res.code == 1) {
                            this.$notify({
                                title: this.$t('commonNotify.Success'),
                                message: (this.dialogStatus == 'create' ? this.$t('commonNotify.CreatedSuccessfully') : this.$t('commonNotify.UpdatedSuccessfully')),
                                type: 'success',
                                duration: 2000
                            })
                            this.getList();
                            this.dialogBindVisible_special = false;
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
        sendSocketData(msg){
            if (this.$ws.ws && this.$ws.ws.readyState == 1) {
                console.log('发送信息', msg);
                this.$ws.ws.send(msg);
            }
        },
        getSocketData(){
            this.$ws.ws.onmessage = function (res) {
                console.log('收到服务器内容', res);
            };
        }
    },
    created() {
        this.getSocketData()
     },
    mounted() {
        this.getTree();
        let index=1
        // setInterval(()=>{
        //     index++
        //     this.sendSocketData(index)
        // },2000)
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
