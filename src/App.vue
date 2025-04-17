<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { removeTokens, removeToken } from "@/utils/auth";
import { getVUELanguageDataList, getLanguageList } from "@/api/system/lang.js";
import en from "element-ui/lib/locale/lang/en"; // element-ui lang
import zh from "element-ui/lib/locale/lang/zh-CN"; // element-ui lang
import es from "element-ui/lib/locale/lang/es"; // element-ui lang
import js from "element-ui/lib/locale/lang/ja"; // element-ui lang
export default {
    name: "App",
    //   这里一定要是false  保证重开页面进来的时候 都是false
    // data: {
    //   refreshTag: false
    // },
    data() {
        return {
            eleLangObj: {
                zh: zh,
                en: en,
                es: es,
                js: js,
            },
        };
    },
    mounted() {
        //? 这里是为了保证关闭页面后将Token清除
        //? 如果不清除token 下次直接输入地址还是可以进入页面 但是token已经失效了

        // ! 首先我们需要知道
        // ! 页面加载时只执行onload
        // ! 页面关闭时只执行onunload
        // ! 页面刷新时先执行onbeforeunload，然后onunload，最后onload。
        // * 这样我们可以在onbeforeunload中加一个标记，在onunload中判断该标记，即可达到判断页面是否真的关闭了。
        // window.onbeforeunload = function () {
        //     if (!window.sessionStorage.getItem("token")) {
        //         removeToken();
        //     } else {
        //         this.refreshTag = true;
        //     }
        // };
        window.onunload = function () {
            if (this.refreshTag == true) {
                console.log("刷新页面");
            } else {
                removeTokens();
                removeToken();
                window.sessionStorage.removeItem("token");
            }
        };
        window.onload = function () {
            console.log("加载页面");
        };
    },
    methods: {
        async getVUELanguageDataList() {
            const { data } = await getVUELanguageDataList();
            Object.keys(data).forEach((key) => {
                this.$i18n.mergeLocaleMessage(key, data[key]); //添加英文
                this.$i18n.mergeLocaleMessage(key, this.eleLangObj[key]);
            });
            console.log(this.$i18n.messages);
        },
        getLanguageList() {
            getLanguageList().then((res) => {
                console.log();
            });
        },
        localSocket() {
            let that = this;
            if ('WebSocket' in window) {
                // console.log('您的浏览器支持 WebSocket!');
                that.ws = new WebSocket('ws:127.0.0.1:8999');
                that.$ws.setWs(that.ws);
                that.ws.onopen = function () {
                    console.log('websocket连接成功');
                };
                that.ws.onclose = function () {
                    // 关闭 websocket
                    console.log('连接已关闭…');
                    //断线重新连接
                    setTimeout(() => {
                        that.localSocket();
                    }, 2000);
                };
            } else {
                // 浏览器不支持 WebSocket

                console.log('您的浏览器不支持 WebSocket!');

                this.openNotificationWithIcon('error', '浏览器', '您的浏览器不支持显示消息请更换', 1, 1)
            }
        },
    },
    created() {
        // this.getVUELanguageDataList()
        // this.getLanguageList()
        //this.localSocket()
    },
};
</script>
<style lang="scss">
#nprogress .bar {
    background: #12b76a !important; //自定义颜色
}
</style>
