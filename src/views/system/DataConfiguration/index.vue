<template>
    <div class="box_container">
        <Title title="云端通信"></Title>
        <div class="content">

            <div class="commState bgcW">
                <div class="title">通讯状态</div>
                <div class="cardContent commContent">
                    <el-steps direction="vertical">
                        <el-step class="mySuccessStep">
                            <template #icon>
                                <div class="stepCommon">
                                    <i class="el-icon-check" style="font-weight:bold"></i>
                                </div>
                            </template>
                            <template #title>
                                <div class="stepCommon">
                                    注册
                                </div>
                            </template>
                            <template #description>
                                <div class="stepCommon">
                                    已发送注册请求等待响应
                                </div>
                            </template>
                        </el-step>
                        <el-step class="myWaitStep">
                            <template #icon>
                                <div class="stepCommon">

                                </div>
                            </template>
                            <template #title>
                                <div class="stepCommon">
                                    模板同步
                                </div>
                            </template>
                            <template #description>
                                <div class="stepCommon">
                                    已发送模型同步请求，等待响应
                                </div>
                            </template>
                        </el-step>
                        <el-step title="步骤 3"></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="server_connect_record">
                <div class="server_connect">
                    <div class="server bgcW">
                        <div class="title">服务状态</div>
                        <div class="cardContent serverContent">
                            <div class="icon">
                                <img src="@/assets/image/cloudComm/server.png" />
                            </div>
                            <div class="form">
                                <el-form ref="form" :model="serverForm" label-width="auto">
                                    <el-form-item label="LCCU自身ID">
                                        <span>{{ serverForm.lccuId }}</span>
                                    </el-form-item>
                                    <el-form-item label="当前状态">
                                        <el-switch v-model="serverForm.currentState" active-text="开" inactive-text="关"
                                            :active-value="1" :inactive-value="0">
                                        </el-switch>
                                    </el-form-item>
                                    <el-form-item label="云服务地址">
                                        <el-input v-model="serverForm.serverAddress">
                                            <div class="saveBtnIcon" slot="suffix" @click="handleSaveAddressClick">
                                                <img src="@/assets/image/cloudComm/saveIcon.png" />
                                            </div>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="连接状态">
                                        <span>{{ serverForm.connectState }}</span>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                    <div class="connect bgcW">
                        <div class="title">连接参数</div>
                        <div class="cardContent serverContent">
                            <div class="icon">
                                <img src="@/assets/image/cloudComm/conn.png" />
                            </div>
                            <div class="form">
                                <el-form ref="form" :model="connForm" label-width="auto">
                                    <el-form-item label="连接ID">
                                        <el-input v-model="connForm.connId">
                                            <div class="saveBtnIcon" slot="suffix" @click="handleSaveAddressClick">
                                                <img src="@/assets/image/cloudComm/saveIcon.png" />
                                            </div>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="连接用户名">
                                        <el-input v-model="connForm.username">
                                            <div class="saveBtnIcon" slot="suffix" @click="handleSaveAddressClick">
                                                <img src="@/assets/image/cloudComm/saveIcon.png" />
                                            </div>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="连接密码">
                                        <el-input v-model="connForm.password">
                                            <div class="saveBtnIcon" slot="suffix" @click="handleSaveAddressClick">
                                                <img src="@/assets/image/cloudComm/saveIcon.png" />
                                            </div>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="record bgcW">
                    <div class="title">流程记录</div>
                    <div class="cardContent recordContent">
                        <div class="tableContainer">
                            <table width="100%" cellspacing="0">
                                <tbody>
                                    <tr v-for="item in recordList">
                                        <td style="text-indent:40px">{{ item.name }}</td>
                                        <td>{{ item.date }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/views/components/Title/index.vue'
import { listRenInfo,listMqttInfo,listRenOperate } from '@/api/system/dataConfiguration.js'
export default {
    components: {
        Title
    },
    data() {
        return {

            currentTab: "云端通信",
            serverForm: {
                lccuId: '45768575645',
                currentState: 0,
                serverAddress: 'mg.relectric.cn:4120',
                connectState: "成功"
            },
            connForm: {
                connId: '123456',
                username: '123456',
                password: '123456',
            },
            recordList: [{
                date: '2016-05-02',
                name: '王小虎',
            }, {
                date: '2016-05-04',
                name: '王小虎',
            }, {
                date: '2016-05-01',
                name: '王小虎',
            }, {
                date: '2016-05-03',
                name: '王小虎',
            }, {
                date: '2016-05-02',
                name: '王小虎',
            }, {
                date: '2016-05-04',
                name: '王小虎',
            }, {
                date: '2016-05-01',
                name: '王小虎',
            }, {
                date: '2016-05-03',
                name: '王小虎',
            }, {
                date: '2016-05-02',
                name: '王小虎',
            }, {
                date: '2016-05-04',
                name: '王小虎',
            }, {
                date: '2016-05-01',
                name: '王小虎',
            }, {
                date: '2016-05-03',
                name: '王小虎',
            }]
        }
    },
    methods: {
        async listRenInfo(){
            const {code,msg,data} = await listRenInfo()
            if(code==1){
                
            }
        },
        async listMqttInfo(){
            const {code,msg,data} = await listMqttInfo()
            if(code==1){
                
            }
        },
        async listRenOperate(){
            const {code,msg,data} = await listRenOperate()
            if(code==1){
                
            }
        },
        handleSaveAddressClick() {

        }
    },
    mounted(){
        this.listRenInfo()
        this.listMqttInfo()
        this.listRenOperate()
    }
}
</script>

<style lang="scss" scoped>
$titleHeight: 38px;

.box_container {
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column ;
}

.bgcW {
    background: white;
}

.content {
    flex:1;
    overflow:hidden;
    background-color: #F1F4F9;
    padding: 10px 20px;
    display: flex;

    .commState {
        flex: 5;
        height: 100%;
        margin-right: 10px;

        .commContent {
            display: flex;
            padding: 40px 0;
            justify-content: center;
            align-items: center;
        }
    }

    .server_connect_record {
        flex: 12;
        height: 100%;
        display: flex;
        flex-direction: column;

        .server_connect {
            flex: 5;
            display: flex;
            margin-bottom: 10px;

            .server {
                flex: 1;
                margin-right: 10px;


            }

            .connect {
                flex: 1;
            }

            .serverContent {
                display: flex;
                justify-content: center;

                .icon {
                    display: flex;
                    align-items: center;
                    margin-right: 40px;
                }

                .form {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                }
            }
        }

        .record {
            flex: 6;
            overflow: hidden;

            .recordContent {
                padding: 10px;

                .tableContainer {
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                }

                table {
                    tr {
                        height: 37px;
                        font-size: 14px;
                    }

                    tr:nth-of-type(2n+1) {
                        background: #F2F2F2;
                    }
                }
            }
        }
    }

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

.saveBtnIcon {
    display: inline-block;

    img {
        vertical-align: middle;
        cursor: pointer;
    }
}

::v-deep.mySuccessStep .el-step__head.is-wait {
    color: #588DF9;
    border-color: #588DF9;
    font-weight: bold;
}

::v-deep.myWaitStep .el-step__icon.is-text {
    background-color: #588DF9;
    border-color: #588DF9;
}

::v-deep .el-step.is-vertical .el-step__line {
    width: 2px;
    top: 40px;
    bottom: 20px;
    left: 11px;
}

::v-deep .form .el-form-item {
    margin-bottom: 10px;
}

</style>