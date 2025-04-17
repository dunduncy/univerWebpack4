import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { hideLoading } from '@/utils/loading';
import Cookies from "js-cookie";
// 创建axios服务
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  timeout: 20000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      if(config.url.indexOf('/api')>-1){
        if (getToken()) {
          config.headers["Authorization"] = getToken();
        }
      }
    }
    config.headers["language"] = Cookies.get('language')?Cookies.get('language'):'zh';
    config.headers["Utcoffset"] = 0-new Date().getTimezoneOffset();
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    if(response.config.headers.isloading){
      hideLoading()
    }
    const res = response.data;
    // 这里打印输出  看接口返回数据是否正常

    // 判断状态码  这里正常应该判断 是404 401 400 等情况
    // 而数据成功 失败的  0或者1  应该放到页面去判断  如果有数据就是1 无数据就是0
    //  因为我们的后台 没有 400 401 404 500的返回值 所以 就在这里简化判断了
    // if (res.code !== 1) {
    if (response.status !== 200) {
      //   Message({
      //     message: res.msg,
      //     type: "error",
      //     duration: 3 * 1000
      //   });
      // !  如果页面用try catch捕获异常就      不能用   return new Error
      // !  如果使用.then .catch捕获异常就     返不返回New Error都可以
      // if (res.code === 400 || res.code === 403 || res.code === 500 ||  res.code === 401 || res.code==503 || res.code==404) {
        MessageBox.confirm(
          "登录已经过期或网络不通，您可以取消以停留在此页面，或重新登录",
          "确认注销当前登录",
          {
            confirmButtonText: "重新登陆",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          // store.dispatch("user/resetToken").then(() => {
          //   location.reload();
          // });
            this.$store.dispatch("user/logout").then(()=>{
              this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            })
            
        });
      // }
      return Promise.reject(res.msg);
    } else {
      return res;
    }
  },
  error => {
    hideLoading()
    if(error.message.includes('timeout')) {
      return Promise.reject('网络超时');// reject这个错误信息
    }else{
      if(error.msg){
        return Promise.reject(error.msg)
      }else{
        return Promise.reject('网络连接失败，请稍后再试!')
      }
    }
   
  }
);

export default service;
