<template>
    <div class="box_container">
        <div class="content">
            <Title title="TCP代理"></Title>
            <div class="card">
                <div class="cardBg">
                    <div class="table_container1">
                        <el-table :data="list1" stripe style="width: 100%;" height="100%" row-key="id">
                            <el-table-column label="Id" align="center" prop="displayName" />
                            <el-table-column label="源Ip" align="center" prop="description" />
                            <el-table-column label="源端口" align="center" prop="displayName" />
                            <el-table-column label="监听Ip" align="center" prop="description" />
                            <el-table-column label="监听端口" align="center" prop="displayName" />
                            <el-table-column label="当前连接数" align="center" prop="displayName" />
                            <el-table-column :label="$t('commonNotify.Operation')" align="center" width="400"
                                class-name="small-padding fixed-width">
                                <template slot-scope="{ row, $index }">
                                    <a class="operateA" @click="handleUpdate(row)">
                                        {{ $t('commonNotify.Save') }}
                                    </a>
                                    <a class="operateA danger" @click="handleDelete(row, $index)">
                                        {{ $t('commonNotify.Delete') }}
                                    </a>
                                    <a class="operateA danger" @click="handleLog(row, $index)">
                                        日志
                                    </a>
                                </template>
                            </el-table-column>
                            <template slot="empty">
                                <img src="@/assets/image/noData.png" style="width:300px;" />
                            </template>
                        </el-table>
                    </div>
                    <div class="table_container2">
                        <div class="tree">
                            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" show-checkbox
                                node-key="label" :default-expand-all="true">
                            </el-tree>
                        </div>
                        <div class="tableContainer_right">
                            <el-table :data="list2" stripe style="width: 100%;" height="100%" row-key="id"
                                header-cell-class-name="tableHeader">
                                <el-table-column label="日志信息" align="left" prop="displayName" />
                                <template slot="empty">
                                    <img src="@/assets/image/noData.png" style="width:300px;" />
                                </template>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/views/components/Title/index.vue'
export default {
    name:"TCPProxy",
    components: {
        Title
    },
    data() {
        return {
            list1: [
                {
                    displayName: '名称1',
                    description: '描述1'
                },
                {
                    displayName: '名称1',
                    description: '描述1'
                },
            ],
            list2: [
                {
                    displayName: '名称1',
                    description: '描述1'
                },
                {
                    displayName: '名称1',
                    description: '描述1'
                },
            ],
            formInline: {
                serverAddress: ''
            },
            treeData: [
                {
                    label: '代理',
                    children: [
                        {
                            label: '代理1'
                        },
                        {
                            label: '代理2'
                        },
                        {
                            label: '代理3'
                        },

                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        handleSaveAddressClick() {

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
                orgName: this.orgName
            }
            getOrgList(data).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.currentPage = res.data.current
            })
        },
        // 重置表单
        resetTemp() {
            this.temp = {
                username: null,
                phone: null,
                email: null,
                enableFlag: 1
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
                userId: row.id,
                username: row.username,
                phone: row.phone,
                email: row.email,
                enableFlag: row.enableFlag
            }
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        handleLog(row, index) {

        },
        handleDelete(row, index) {
            this.$confirm(this.$t('commonNotify.DeleteInfoMessage'), this.$t('commonNotify.Prompt'), {
                confirmButtonText: this.$t('commonNotify.Confirm'),
                cancelButtonText: this.$t('commonNotify.Cancel'),
                type: 'warning'
            })
                .then(async () => {
                    try {
                        const res = await deleteOrg({ orgId: row.id })
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
                    const fun = (this.dialogStatus == 'create' ? addUserInfo : updateUserInfo)
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

.box_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.pd {
    padding: 40px 80px;
    background-color: #F1F4F9;
}



.content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.card {
    flex: 1;
    overflow: hidden;
    padding: 20px 60px;
}

.cardBg {
    width: 100%;
    height: 100%;
    background: #F1F4F9;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.table_container1 {
    flex: 1;
    overflow: hidden;
    margin-bottom: 10px;
    border: 1px solid rgba(190,193,200,1);

    .saveContainer {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
}

.table_container2 {
    flex: 4;
    overflow: hidden;
    display: flex;

    .tree {
        flex: 5;
        height: 100%;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(190,193,200,1);
    }

    .tableContainer_right {
        flex: 32;
        overflow: hidden;
        border: 1px solid rgba(190,193,200,1);
    }
}

.saveBtnIcon {
    display: inline-block;

    img {
        vertical-align: middle;
        cursor: pointer;
    }
}

::v-deep th.tableHeader {
    text-align: center;
}
</style>