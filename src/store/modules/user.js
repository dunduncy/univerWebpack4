// 这里是引用接口 暂时只有登录的接口 就只用登录即可
import { login } from '@/api/system/login'
import formatRoutes from '@/utils/formatRoutes.js'
import getDefaultRoute from '@/utils/getDefaultRoute.js'
import { asyncRoutes, constantRoutes,highPermissionRoutes } from '@/router'
// 引用鉴权方法 获取token ，设置token 和 移除token的三个方法
import {
  getToken,
  setToken,
  removeToken,

  getUsername,
  setUsername,

  getUserId,
  setUserId,

  getRoleType,
  setRoleType,
  removeRoleType,

  getRoleName,
  setRoleName,
  removeRoleName

} from "@/utils/auth";
// 这里是路由方法，一个是resetRouter是用来重置路由跳转的 应该是在router里面挂载过了
import router, { resetRouter } from "@/router";
import Cookies from "js-cookie";
// 这里是状态设置 state的初始化  可以理解为状态对象 一个实例
// 这里的Token由于存在两个 所以需要 拿鉴权方法 判断
const state = {
  token() {
    return getToken();
  },
  username() {
    return getUsername();
  },
  userId() {
    return getUserId();
  },
  roleType: '',// 角色Id
  roleName: '',// 角色名
  //    当我们想要动态绑定img的src的时候，Vue数据绑图片的相对路径或者绝对路径的时候，必须要require
  asyncRoutes: [],
  isSetRoutes: false,
};

// 这里是 mutation  可以理解为实例对应的方法
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    sessionStorage.setItem("token", token);
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
    sessionStorage.setItem(`username`, username);
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
    sessionStorage.setItem(`userId`, userId);
  },
  SET_ROLETYPE: (state, roleType) => { //角色Type
    state.roleType = roleType;
    sessionStorage.setItem(`roleType`, roleType);
  },
  SET_ROLENAME: (state, roleName) => {//角色名
    state.roleName = roleName;
    sessionStorage.setItem(`roleName`, roleName);
  },
  setAsyncRoutes(state, data) {
    console.log(data)
    state.asyncRoutes = []
    state.isSetRoutes = true
    state.asyncRoutes = constantRoutes.concat(data);
  },
  setIsSetRoutes(state, data){
    state.isSetRoutes = data
  }
};

// 如果是异步改变状态 就是操作action
const actions = {
  // user login
  // 这里的commit是简略写法，就是为了省去context这个直接进行commit调用
  // 第一个login是vueX中定义的方法，第二个login是api中定义的方法
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    console.log(6)
    //  将用户名和密码存到本地缓存中 后续使用
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    // 这里返回的是一个promise对象
    return new Promise((resolve, reject) => {
      login(username.trim(), password)
        .then(response => {
          if (response.code == 1) {
            //   如果登录成功，就把接口中获取到的Token存储
            //   这里一定是要有token的 如果不设置token 是会报错的 无法登录成功的
            let token = 'I am a token'; // token
            let username = response.data.displayName;// 用户名
            let userId = response.data.id;// 用户ID
            let roleType = response.data.roleType;// 用户ID
            let roleName = response.data.roleName;// 用户ID
            //  commit是在调用mutations里面的方法
            commit("SET_TOKEN", token); // 这里是同步操作  将token存入sessionstorage中和vuex的state全局变量中
            commit("SET_USERNAME", username);// 将username存入sessionstorage中和vuex的state全局变量中
            commit("SET_USERID", userId);// 将username存入sessionstorage中和vuex的state全局变量中
            commit("SET_ROLETYPE", roleType);
            commit("SET_ROLENAME", roleName);
            commit("setIsSetRoutes",false)

            setToken(token); //   在更新store的同时 将token存入cookie中
            setUsername(username); //   在更新store的同时 将username存入cookie中
            setUserId(userId); //   在更新store的同时 将userId存入cookie中
            setRoleType(roleType)
            setRoleName(roleName)

            resolve(response);
          } else {
            reject(response.msg);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      resolve(getRoleType())
    })
  },
  // user logout 没有接口就先只清除token
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      //  将store中的token清空
      //  将角色也清空
      commit("SET_TOKEN", "");
      commit("SET_ROLETYPE", "");
      commit("SET_ROLENAME", "");
      commit("setIsSetRoutes",false)
      Cookies.remove('highPermission')
      removeRoleType()
      removeRoleName()
      //  移除浏览器中的token
      removeToken();
      //  这里是路由重置 将路由重置为没有角色权限的路由 就是login
      resetRouter();

      dispatch("tagsView/delAllViews", null, { root: true });

      resolve();
    });
  },

  // 清空重置Token的方法
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("setIsSetRoutes",false)
      removeToken();
      commit("SET_ROLETYPE", "");
      removeRoleType()
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  },

  generateRoutes({ commit, state }) {
    return new Promise((resolve, reject) => {
      let route = []
      if (getRoleType() == 1) {
        route = asyncRoutes
      }
      if(Cookies.get('highPermission')){
        route = highPermissionRoutes
      }
      commit("setAsyncRoutes", route);
      resolve(state.asyncRoutes)
    })

  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
