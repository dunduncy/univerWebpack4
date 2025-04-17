
<template>
    <div class="box_container">
        <Title :title="currentTab"></Title>
        <div class="content">
            <div class="topo">
                <div class="title">拓扑图</div>
                <div class="cardContent bgcW"></div>
            </div>
            <div class="device">
                <div class="title">设备列表</div>
                <div class="cardContent bgcW"></div>
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
            currentTab: "拓扑配置"
        }
    }
}
</script>

<style lang="scss" scoped>
$titleHeight: 38px;

.box_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.bgcW {
    background: white;
}

.content {
    flex: 1;
    overflow: hidden;
    background-color: #F1F4F9;
    padding: 10px 20px;
    display: flex;
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
    height:calc(100% - #{$titleHeight});
    border: 1px solid rgba(187,187,187,1);
}
.topo{
    flex:12;
}
.device{
    flex:5;
}
</style>