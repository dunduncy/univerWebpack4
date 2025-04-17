const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token, //VueX 中token的值
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  roleType: state => state.user.roleType,
  permission_routes: state => state.permission.routes,
  asyncRoutes: state => state.user.asyncRoutes,
  errorLogs: state => state.errorLog.logs,
  isSetRoutes: state => state.user.isSetRoutes,
};
export default getters;
