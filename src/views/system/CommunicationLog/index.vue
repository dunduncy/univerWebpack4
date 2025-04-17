
<template>
    <div class="box_container">
        <Title :title="currentTab">
            <el-button type="primary" @click="handleExport" size="mini" plain>
                <img src="@/assets/image/cloudComm/shareBtnIcon.png" class="btnIconImg" />
                {{ $t('commonNotify.Export') }}
            </el-button>
            <el-button type="primary" @click="handlePause" size="mini" plain>
                <img src="@/assets/image/cloudComm/pauseBtnIcon.png" class="btnIconImg" />
                暂停
            </el-button>
            <el-button type="primary" @click="handleClear" size="mini" plain>
                <img src="@/assets/image/cloudComm/clearBtnIcon.png" class="btnIconImg" />
                清除
            </el-button>
        </Title>
        <div class="content">
            <div class="table_container">
                <el-table :data="list" stripe style="width: 100%;" height="100%" row-key="id">
                    <el-table-column label="时间" align="center" prop="displayName" />
                    <el-table-column label="发起方" align="center" prop="description" />
                    <el-table-column label="报文类型" align="center" prop="description" />
                    <el-table-column label="报文内容" align="center" prop="description" />
                    <template slot="empty">
                        <img src="@/assets/image/noData.png" style="width:300px;" />
                    </template>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import cloudComm from '@/views/cloudComm/index.vue'
import Title from '@/views/components/Title/index.vue'

export default {
    components: {
        cloudComm,
        Title
    },
    data() {
        return {
            currentTab: "通信日志",
            list: [
                {
                    displayName: '名称1',
                    description: '描述1'
                },
            ],
        }
    },
    methods: {
        handleExport() {

        },
        handlePause() {

        },
        handleClear() {

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

.btnIconImg {
    vertical-align: sub;
    width: 16px;
}
</style>