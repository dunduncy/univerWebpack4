<template>
    <div class="subView">
        <div class="breadIcon" v-if="showBread">
            <img :src="path" :key="key"/>
            <Breadcrumb></Breadcrumb>
        </div>
        <div :class="{'content':showBread,'h100':!showBread}">
            <keep-alive :include="cachedViews">
                <router-view :key="key" />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import { watch } from 'fs'
export default {
    name:'subView',
    components: {
        Breadcrumb
    },
    data() {
        return {
            path: ''
        }
    },
    computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews
        },
        key() {
            return this.$route.path
        },
        showBread(){
            console.log(this.$route.matched)
            let flag = true
            let item = this.$route.matched.find(v=>v.name=='rtData'||v.name=='hisData'||v.name=='param'||v.name=='historyAlarm'||v.name=='timeZone'||v.name=='updatePassword')
            if(item){
                flag = false
            }
            return flag
        },
    },
    watch: {
        $route() {
            this.path = require(`@/assets/image/menuIcon/${this.$route.matched[0].meta.icon.split('-')[1]}`)
        } 
    },
    mounted() {
        this.path = require(`@/assets/image/menuIcon/${this.$route.matched[0].meta.icon.split('-')[1]}`)
    }
}
</script>

<style lang="scss" scoped>
.subView {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 20px;
}

.breadIcon {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.content {
    height: calc(100% - 30px - 30px); // 图片高度24px
}
.h100{
    height:100%;
}
</style>