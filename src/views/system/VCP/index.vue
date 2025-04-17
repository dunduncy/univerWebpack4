<template>
    <div class="box_container">
        <div class="content">
            <Title title="虚拟串口"></Title>
            <div class="cardsContainer pd">
                <div class="leftCard">
                    <div class="title">详情</div>
                    <div class="cardContent" style="padding-top:10px">
                        <div class="leftCardDevide border pd10">
                            <div class="topTable border">
                                <el-table :data="list" stripe style="width: 100%;" height="100%" row-key="id">
                                    <el-table-column label="Id" align="center" prop="displayName" />
                                    <el-table-column label="串口号" align="center" prop="description" />
                                    <el-table-column label="波特率" align="center" prop="displayName" />
                                    <el-table-column label="数据位" align="center" prop="displayName" />
                                    <el-table-column label="校验位" align="center" prop="displayName" />
                                    <el-table-column label="停止位" align="center" prop="displayName" />
                                    <el-table-column label="监听IP" align="center" prop="displayName" />
                                    <el-table-column label="监听端口" align="center" prop="displayName" />
                                    <el-table-column :label="$t('commonNotify.Operation')" align="center" width="400"
                                        class-name="small-padding fixed-width">
                                        <template slot-scope="{ row, $index }">
                                            <a class="operateA" @click="handleUpdate(row)">
                                                {{ $t('commonNotify.Save') }}
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
                            <div class="bottomTable">
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
                <div class="rightCard">
                    <div class="title">串口号</div>
                    <div class="cardContent border">
                        <ul class="serialListContainer">
                            <li @click="changePort(item,index)" v-for="(item,index) in serialPortList" :key="'a'+index" :class="{'active':currentActive==index}">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
</template>

<script>
import Title from '@/views/components/Title/index.vue'
export default {
    components: {
        Title
    },
    data() {
        return {
            list: [
                {
                    displayName: '名称1',
                    description: '描述1'
                }
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
            serialPortList:[
                {name:'串口1'},
                {name:'串口2'}
            ],
            currentActive:0
        }
    },
    methods: {
        changePort(item,index){
            this.currentActive = index
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
        handleDetail(row) {
            this.temp = {
                userId: row.id,
                username: row.username,
                phone: row.phone,
                email: row.email,
                enableFlag: row.enableFlag
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
$titleHeight: 38px;

.box_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.pd {
    padding: 40px 80px;
}



.content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.cardsContainer {
    flex: 1;
    overflow: hidden;
    display: flex;

    .leftCard {
        flex: 22;
        margin-right:10px;
        .pd10 {
            padding: 10px;
        }

        .leftCardDevide {
            width: 100%;
            height: 100%;

            .topTable {
                height:98x;
                margin-bottom:10px;
            }

            .bottomTable {
                height:calc(100% - 108px);
                overflow:hidden;
            }
        }
    }

    .rightCard {
        flex: 5;
        ul.serialListContainer{
            height:100%;
            overflow:auto;
            list-style:none;
            font-size:14px;
            margin:0;
            padding:0;
            li{
                width:100%;
                height:45px;
                line-height:45px;
                cursor:pointer;
            }
            li.active{
                background:#F1F4F9
            }
        }
    }
}

.border{
    border:1px solid #bbbbbb
}

.title {
    height: $titleHeight;
    line-height: 34px;
    background-color: rgba(100, 115, 140, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    border: 1px solid rgba(187, 187, 187, 1);
    text-indent: 14px;
}

.cardContent {
    width: 100%;
    height:calc(100% - #{$titleHeight})
}
/**
    解决el-table宽度无限拉伸的问题
*/
::v-deep .el-table{
    width:100%;
    .el-table__header-wrapper table,.el-table__body-wraper table{
        width:100% !important;
    }
    .el-table__body, .el-table__footer, .el-table__header{
        table-layout:auto;
    }
}
</style>