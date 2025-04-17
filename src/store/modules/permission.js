import { asyncRoutes, constantRoutes } from "@/router";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  // 异步方法 生成角色对应的路由
  // 如果是admin就可以查看所有动态路由
  // 如果不是admin就要走filter过滤方法，过滤角色所对应的路由
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      accessedRoutes = asyncRoutes || [];
      // if (roles.includes("admin")) {
      //   accessedRoutes = asyncRoutes || [];
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      // }
      //   执行这个commit就是将固定路由与动态路由拼接到一起了
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
