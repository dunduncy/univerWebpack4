import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import Element from "element-ui";
import "./styles/element-variables.scss";

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
// import './mock/index.js'

import i18n from './lang' // internationalization
import "./icons"; // icon
import "./permission"; // permission control
// import "./utils/error-log"; // error log
//import {renderHeader} from '@/utils/myFun.js'

import * as filters from "./filters"; // 全局过滤器
import {isAuth} from "@/utils/permission.js"
import "@/assets/css/publicStyle.css"
// import '@/utils/websocket'
import ws from '@/utils/websocketTest'
Vue.prototype.isAuth = isAuth 
Vue.prototype.bus = new Vue();
Vue.prototype.$ws = ws

//Vue.prototype.$renderHeader = renderHeader
Vue.use(Element, {
  size: Cookies.get("size") || "medium", // 设置element的大小 默认是中等
  i18n: (key, value) => i18n.t(key, value)
});
// element-ui-table-插件，内容列宽自适应

const fontRate = {
  CHAR_RATE: 1.1, // 汉字比率
  NUM_RATE: 0.65, // 数字
  OTHER_RATE:0.8// 除汉字和数字以外的字符的比率
}
const fontSize = 14
import AFTableColumn from 'af-table-column'
Vue.use(AFTableColumn,{fontRate, fontSize})
// 注册全局实用程序过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
});
