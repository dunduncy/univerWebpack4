import Cookies from 'js-cookie'

const TokenKey = 'Token'// 用户token 键名
const UsernameKey = "userName";// 用户名 键名
const UserIdKey = "userId"// 用户Id 键名
const RoleTypeKey = "roleType"// 角色类型 键名
const RoleNameKey = "roleName"// 角色名称 键名

// 获取Token的方法
export function getToken() {
  return Cookies.get(TokenKey)
}

// 装载Token的方法
export function setToken(token) {
  return Cookies.set(TokenKey, token,{ expires: 7 })
}

// 删除Token的方法
export function removeToken() {
  return Cookies.remove(TokenKey)
}



// 获取userName的方法
export function getUsername() {
  return Cookies.get(UsernameKey)
}

// 装载userName的方法
export function setUsername(userName) {
  return Cookies.set(UsernameKey, userName)
}

// 删除userName的方法
export function removeUsername() {
  return Cookies.remove(UsernameKey)
}



// 获取UserId的方法
export function getUserId() {
  return Cookies.get(UserIdKey)
}

// 装载UserId的方法
export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId)
}

// 删除UserId的方法
export function removeUserId() {
  return Cookies.remove(UserIdKey)
}


// 获取roleType的方法
export function getRoleType() {
  return Cookies.get(RoleTypeKey)
}

// 装载roleType的方法
export function setRoleType(roleType) {
  return Cookies.set(RoleTypeKey, roleType)
}

// 删除roleType的方法
export function removeRoleType() {
  return Cookies.remove(RoleTypeKey)
}


// 获取roleName的方法
export function getRoleName() {
  return Cookies.get(RoleNameKey)
}

// 装载roleName的方法
export function setRoleName(roleName) {
  return Cookies.set(RoleNameKey, roleName)
}

// 删除roleName的方法
export function removeRoleName() {
  return Cookies.remove(RoleNameKey)
}