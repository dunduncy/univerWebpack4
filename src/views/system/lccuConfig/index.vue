<template>
  <div class="container bg_white">
        <div class="container_add content_outer" style="height: 100%">
            <TableTitle title="LCCU配置"> </TableTitle>
            <el-row style="height: 100%">
                <el-col :span="4" style="height: 100%">
                    <div class="menu">
                        <el-tree ref="treeOut" :data="treeList" :props="defaultProps" node-key="id" accordion
                            :highlight-current="true" @node-click="handleNodeClick">
                            <template slot-scope="{ node, data }">
                                <div class="nodeOutter">
                                    <img class="nodeIcon" v-if="node.level == 3" :src="handleNode(node)" />
                                    <span class="nodeLabel">{{ data.displayName }}</span>
                                </div>
                            </template>
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="20" style="height: 100%">
                    <el-table :data="list" stripe height="100%" style="width: 100%">
                        <el-table-column :label="$t('system$miniProgramConfig$index_vue.Variabledescription')"
                            align="center" prop="des" />
                        <el-table-column :label="$t('system$miniProgramConfig$index_vue.Relatedquantity')" align="center"
                            prop="dataDesListStr" />

                        <el-table-column :label="$t('commonNotify.Operation')" align="center" width="300"
                            class-name="small-padding fixed-width">
                            <template slot-scope="{ row }">
                                <a class="operateA" @click="bindValue(row)">
                                    {{ $t('system$miniProgramConfig$index_vue.Association') }}
                                </a>
                                <a class="operateA" @click="unbindValue(row)">
                                    {{ $t('system$miniProgramConfig$index_vue.Unbind') }}
                                </a>
                            </template>
                        </el-table-column>
                        <template slot="empty">
                            <img src="@/assets/image/noData.png" style="width: 300px" />
                        </template>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <el-dialog
            :title="$t('system$miniProgramConfig$index_vue.Association')" :visible.sync="dialogBindVisible"
            :close-on-click-modal="false">
            <el-row>
                <el-col :span="6">
                    <div v-if="currentRow && currentRow.statisticsType == 23" style="width:100%;margin-bottom:5px">
                        <el-select v-model="logic" style="width:100%;">
                            <el-option label="正逻辑" :value="1">
                            </el-option>
                            <el-option label="反逻辑" :value="0">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="small-menu">
                        <el-tree ref="tree" :highlight-current="true" :data="bindTreeList" :default-expand-all="true"
                            node-key="treeId" :props="treeProps" @node-click="handleCheckChange">
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="16" :offset="1">
                    <div>
                        <el-table border :data="treeData" ref="multipleTable" tooltip-effect="dark" max-height="480"
                            @selection-change="handleSelectionChangeBind">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column align="center" prop="displayName"
                                :label="$t('system$miniProgramConfig$index_vue.DataName')">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
            <el-row> </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmBindUser">
                    {{ $t("commonNotify.Confirm") }}
                </el-button>
                <el-button @click="dialogBindVisible = false">
                    {{ $t("commonNotify.Cancel") }}
                </el-button>
            </div>
        </el-dialog>

        <el-dialog :title="$t('system$miniProgramConfig$index_vue.Association')" :visible.sync="dialogBindVisible_special"
            :close-on-click-modal="false">
            <el-row>
                <el-col :span="23">
                    <div class="small-menu">
                        <el-tree ref="tree" :highlight-current="true" :data="bindTreeList" :default-expand-all="true"
                            node-key="treeId" :props="treeProps" @node-click="handleCheckChange_special">
                        </el-tree>
                    </div>
                </el-col>
            </el-row>
            <el-row> </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmBindUser_special">
                    {{ $t("commonNotify.Confirm") }}
                </el-button>
                <el-button @click="dialogBindVisible_special = false">
                    {{ $t("commonNotify.Cancel") }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import TableTitle from "@/components/system/TableTitle";
import { getData } from './data.js'
export default {
    data() {
        return {
            list: [],
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
            currentDeviceNode_special: null
        };
    },
    components: {
        TableTitle,
    },
    methods: {
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
                this.currentLccuNode = data;
                this.lccuId = data.id;
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
            } else if (level == 2) {
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
        },
        getTree() {
            initOrgTree().then((res) => {
                this.treeList = res.data;
            });
        },
        getList() {
            queryEnergyCabinet({
                lccuId: this.currentLccuNode
                    ? this.currentLccuNode.id
                    : null,
            }).then((res) => {
                this.list = getData()
                if (res.code == 1 && res.data && res.data.length > 0) {
                    res.data.forEach((item) => {
                        this.list.forEach((element) => {
                            if (element.statisticsType == item.statisticsType) {
                                element.orgId = item.orgId
                                element.projectId = item.projectId
                                element.lccuId = item.lccuId
                                element.deviceId = item.deviceId
                                element.deviceName = item.deviceName
                                element.dataVOList = item.dataVOList
                                if (element.statisticsType == 13 || element.statisticsType == 32) {
                                    element.dataDesListStr = item.deviceName
                                } else {
                                    if (item.dataVOList && item.dataVOList.length > 0) {
                                        element.dataDesListStr = item.dataVOList.map(v => v.dataName).join(',')
                                    } else {
                                        element.dataDesListStr = ''
                                    }
                                }
                            }
                        });
                    });
                }
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
            this.logic = 1
            this.bindTreeList = [];
            this.treeData = []
            this.bindIdData = []
            this.bindPropertyListMap = {}
            this.currentRow = row;
            //this.tableRadio = row.relationId
            this.getBindTree(row);

        },
        //解绑
        unbindValue(row) {
            this.currentRow = row;
            this.confirmUnbindUser()
        },

        confirmUnbindUser() {
            if (!this.currentRow.dataDesListStr) {
                this.$message({
                    message: this.$t('system$miniProgramConfig$index_vue.Pleasemakesuretocheckthedataitem'),
                    type: "warning",
                    duration: 5 * 1000,
                });
                return
            } else {
                this.$confirm(
                    this.$t('system$miniProgramConfig$index_vue.ThisoperationwillunbindthedataDoyouwanttocontinue'),
                    this.$t("commonNotify.Prompt"),
                    {
                        confirmButtonText: this.$t("commonNotify.Confirm"),
                        cancelButtonText: this.$t("commonNotify.Cancel"),
                        type: "warning",
                    }
                )
                    .then(() => {
                        let data = {
                            orgId: this.orgId,
                            projectId: this.proId,
                            lccuId: this.lccuId,
                            statisticsType: this.currentRow.statisticsType,
                        }
                        unbindEnergyCabinet(data).then(
                            (res) => {
                                if (res.code == 1) {
                                    this.$notify({
                                        title: this.$t("commonNotify.Success"),
                                        message: this.$t('system$miniProgramConfig$index_vue.Unbindsuccessful'),
                                        type: "success",
                                        duration: 2000,
                                    });
                                    this.getList();
                                } else {
                                    this.$notify({
                                        title: this.$t(
                                            "commonNotify.OperateFailed"
                                        ),
                                        message: res.msg,
                                        type: "error",
                                        duration: 2000,
                                    });
                                }
                            }
                        );
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: this.$t('system$miniProgramConfig$index_vue.Unbound'),
                        });
                    });
            }
        },
        confirmBindUser() {
            this.bindIdData = Object.values(this.bindPropertyListMap).flat(2)
            if (!this.bindIdData.length) {
                this.$message({
                    message: this.$t('system$miniProgramConfig$index_vue.Pleasemakesuretocheckthedataitem'),
                    type: "warning",
                    duration: 5 * 1000,
                });
                return;
            } else {
                if (this.currentRow.statisticsType == 23 && this.logic == 0) {
                    this.currentRow.statisticsType = 36
                }
                let data = {
                    orgId: this.orgId,
                    projectId: this.proId,
                    lccuId: this.lccuId,
                    deviceId: this.currentRow.deviceId,
                    statisticsType: this.currentRow.statisticsType,
                    dataType: this.bindIdData[0].type,
                    dataIdList: this.bindIdData.map(val => val.treeId)
                }
                let fun = addEnergyCabinet
                fun(data).then((res) => {
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
                });
            }
        },
        confirmBindUser_special() {
            if (!this.currentDeviceNode_special || this.currentDeviceNode_special.level != 2) {
                this.$message({
                    message: '请选择设备',
                    type: "warning",
                    duration: 5 * 1000,
                });
                return;
            } else {
                let data = {
                    orgId: this.orgId,
                    projectId: this.proId,
                    lccuId: this.lccuId,
                    deviceId: this.currentDeviceNode_special.data.treeId,
                    statisticsType: this.currentRow.statisticsType,
                    dataType: 1,
                    dataIdList: []
                }
                let fun = addEnergyCabinet
                fun(data).then((res) => {
                    if (res.code == 1) {
                        this.$notify({
                            title: this.$t("commonNotify.Success"),
                            message: this.$t('system$miniProgramConfig$index_vue.Bindingsuccessful'),
                            type: "success",
                            duration: 2000,
                        });
                        this.getList();
                        this.dialogBindVisible_special = false;
                    } else {
                        this.$notify({
                            title: this.$t("commonNotify.OperateFailed"),
                            message: res.msg,
                            type: "error",
                            duration: 2000,
                        });
                    }
                });
            }
        }
    },
    created() { },
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
