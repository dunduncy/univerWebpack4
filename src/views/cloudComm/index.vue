<template>
    <div class="box_container">
        <div class="route_header">
            <tabMenu :menuList="menuList" :currentTab="handleCurrentTab"></tabMenu>
        </div>
        <div class="content_body">
            <router-view :key="key"></router-view>
        </div>
    </div>
</template>

<script>
import tabMenu from '@/views/tabMenu/index.vue'
import Title from '@/views/components/Title/index.vue'

export default {
    components: {
        tabMenu,
        Title
    },
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            menuList: [
                {
                    name: '云端通信',
                    path: '/configView/cloudComm/DataConfiguration'
                },
                {
                    name: '模板配置',
                    path: '/configView/cloudComm/TemplateConfiguration'
                },
                {
                    name: '拓扑配置',
                    path: '/configView/cloudComm/TopologyConfig'
                },
                {
                    name: '通信日志',
                    path: '/configView/cloudComm/CommunicationLog'
                }
            ],
            currentTab: "云端通信"
        }
    },
    computed: {
        key() {
            return this.$route.path
        },
        handleCurrentTab(){
            return this.$route.meta.title
        }
    }
}
</script>

<style lang="scss" scoped>
.box_container {
    width: 100%;
    height: 100%;
}

.content_body {
    height: calc(100% - 30px);
    padding: 73px 56px 34px 56px;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
</style>