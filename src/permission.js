import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // 一个进度条的插件
import "nprogress/nprogress.css"; // 进度条对应的css文件
import { getToken, getRoleType } from "@/utils/auth"; // 这是一个鉴权的方法，getToken是其中一个获取token的方法
import getPageTitle from "@/utils/get-page-title"; //这是一个获取页面标题的方法
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    
    // * 开启进度条
    NProgress.start();
    const hasToken = getToken();
  if (true) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const isSetRoutes = store.getters.isSetRoutes
      if (isSetRoutes) {
        const asyncRoutes = await store.dispatch('user/generateRoutes')
        next()
      } else {
        const asyncRoutes = await store.dispatch('user/generateRoutes')
        router.addRoutes(asyncRoutes)
        next({...to,replace:true})
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }


});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
