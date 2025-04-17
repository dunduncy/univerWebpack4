# 瑞能后台管理系统

## 基础

### 介绍

​		本项目是一个后台前端的解决方案，其主要是服务于瑞能电气现有的数据库内容，对其进行管理。项目的核心框架是`Vue.js`（2.6.0），后台数据库是`mysql`。项目的开发使用了很多`webpack`的插件以及官方的`api`，具体见：https://webpack.docschina.org/concepts/

### 功能

- 登录 / 注销
- 权限验证

- ------

  多环境发布

  - dev sit stage prod

- ------

  全局功能

  - 动态侧边栏（支持多级路由嵌套使用）
  - 动态面包屑导航
  - 快捷导航（标签页）
  - Screenfull 全屏
  - 自适应收缩侧边栏

- ------

  具体功能

  - 用户管理
  - 项目管理

### 系统环境以及项目准备

​		首先需要在本地安装`node.js`和`vue-cli`。本项目技术栈基于，`ES5+`、`vue全家桶`、`axios`以及`element UI`,所有的数据请求都使用`mysql`服务器接口来获取。

### 项目目录结构

```bash
├── build                      # 构建相关
├── plop-templates             # 基本模板，可以搭配webpack,用来快速构建页面
├── public                     # 静态资源
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 图片 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令 具体见Vue.js官方
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目用到的所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── .env.developemnt           # 开发环境变量配置
├── .env.production            # 生产环境变量配置
├── .env.staging               # 其余环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .eslintignore              # eslint 语法忽略配置
├── .babelrc                   # babel-loader 配置
├── jsconfig.json              # 根目录和路径的一些配置
├── vue.config.js              # vue-cli 配置
├── plopfile.js                # plop模板 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

### Vue生态圈

  		1. [Vue Router](https://router.vuejs.org/ ) 是`Vue`官方的路由，它可以快速的构建一个单页面或者多页面的项目
  		2. [Vuex](https://vuex.vuejs.org/) 是一个专门为`Vue.js`应用程序开发的状态管理模式。主要是用来解决全局状态和组件之间通信的问题。
  		3. Vue loader 是为`Vue`文件定制的一个webpack的loader。它可以在开发的过程中使用热重载来保持状态，为每个组件模拟出scoped CSS等等功能。不过大部分情况下你不需要对它进行配置，因为`Vue-cli`已经处理好了。
  		4. Vue CLI 是官方提供的一个`vue`项目脚手架，本项目就是基于它构建完成的。它封装了大量的 `webpack`、`babel `等其它配置，让我们可以轻松地上手写代码，而不用关心配置。
  		5. Vetur 是一个`VS Code`的插件，开发Vue这个插件必不可少。

## 布局

​		项目的整体布局包括，导航，侧边栏，面包屑导航以及动态页面标签栏。

### layout

​		 layout基本包括了侧边栏，动态面包屑，以及动态标签和中间的`AppMain`组件，每次路由发生变化后，就是对中间的页面进行替换而其他的组件还是固定不变；当然标签和面包屑是动态的，也会跟着发生命名上的变化，但是位置与样式不发生变化。

![image-20211014100014852](C:\Users\Administrator\Desktop\瑞能项目\layout.png)

​		对应的代码

```javascript
@/layout
```

​		`@`是webpack的`alias`，在目录的`jsconfig.json`中有配置，这是webpack的配置文件，主要是配置

```json
/vue.config.js
 configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
},
```

`vue.config.js`文件配置了`webpack`和项目构建的一些配置信息。

------

​		项目中大部分页面都会使用到layout，但是也有一小部分页面不会使用layout，例如登录页面，错误页面等等。

![image-20211014101335948](C:\Users\Administrator\Desktop\瑞能项目\layout-1.png)

​			这个例子中也使用了路由嵌套，所以当你改变页面主体时，并不会改变layout中已经配置好的组件，它们不会随着主页面的变化而变化的原因就是如此。

```bash
/foo                                  /bar
+------------------+                  +-----------------+
| layout           |                  | layout          |
| +--------------+ |                  | +-------------+ |
| | user.vue     | |  +------------>  | | project.vue | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

### app-main

```
@/layout/components/AppMain
```

​		这里在 `app-main` 外部包了一层 `keep-alive` 主要是为了缓存 `<router-view>` 的，配合页面的 `tabs-view` 标签导航使用。

​		其中`transition` 定义了页面之间切换动画，可以自定义动画样式。具体[文档](https://cn.vuejs.org/v2/guide/transitions.html)。默认提供了`fade`和`fade-transform`两个转场动画，具体 css 实现见[transition.scss](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/styles/transition.scss)。如果需要调整可在[AppMain.vue](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/layout/components/AppMain.vue)中调整`transition` 的 `name`。

### router-view

​		这里，由于一个组件可能是一个弹出框，可能你created和edit的组件是同一个，这时候，`router-view`并不会触发对应组件的`mounted`和`created`函数，导致数据无法及时的刷新。

​		官方给的建议是添加一个深度监听`watch`事件，但是这里使用`:key`给router-view一个标记符，这样就可以保证每次调用组件，每次进行生命周期的渲染。

## 路由和侧边栏

### 配置项

首先要知道官方在配置路由时提供了哪些配置项。

```javascript
//当设置 true 的时候该路由不会在侧边栏出现
hidden: true // (默认 false)

//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noRedirect'

// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
// 只有一个时，会将那个子路由当做根路由显示在侧边栏
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

// 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
name: 'router-name' 
// 这里的属性大多数都会在路由守卫时用到，看个人喜好
meta: {
  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

  // 当路由设置了该属性，则会高亮相对应的侧边栏。
  activeMenu: '/article/list'
}
```

### 路由

​		这里的路由分为两种：`constantRoutes` 和 `asyncRoutes`。

​		**constantRoutes**：代表那些不需要动态判断路由权限的路由，如登录页面，错误页面。

​		**asyncRoutes**:代表那些需要动态判断路由权限并通过addRoutes动态添加的页面。

![image-20211014105831911](C:\Users\Administrator\Desktop\瑞能项目\router.png)

​		这里所有的路由都使用了`路由懒加载`，具体文档还是要看官方。这里简单的介绍一下，就是利用了箭头函数以及`webpack`的`import`导入机制：所有的路由都是通过组件的方式引入的，但是我们的页面如果有五个十个组件是可以手动引入并且进行配置的，但是如果组件页面很多，如果分别手动引入并且进行配置，不仅费时费力，而且会导致项目运行缓慢，所以这里路由的组件，全部使用懒加载的方式，当路由确定跳转使用时，再将组件引入并展示出来。

### 侧边栏

​		本项目的侧边栏主要是利用`element UI`的`el-menu`开发的

​		前面也介绍了，侧边栏是通过读取路由并结合权限判断而动态生成的，而且还需要支持路由无限嵌套，所以这里还使用到了递归组件。具体内容看代码。

```javascript
@/layout/components/Sidebar
```

​		**这里需要注意一下**，一般侧边栏有两种形式即：`submenu` 和 直接 `el-menu-item`。 一个是嵌套子菜单，另一个则是直接一个链接。

![image-20211014110347495](C:\Users\Administrator\Desktop\瑞能项目\Siderbar.png)

​		**前面也介绍过**，如果不想要直接显示根路径，可以将路由配置文件中的，alwaysshow设置为true。

### 多级目录（嵌套路由）

​		如果路由不止于二级路由，那么就会发生嵌套路由的情况，有三级路由的情况下，**不要忘记还要手动在二级目录的根文件下添加一个**`router-view`

原则上，有多少级路由就嵌套多少个`router-view`。二级路由本身在appMain中已经有了，所以三级路由加一个，四级路由需要加两个，以此类推。

`路由和侧边栏就介绍这么多，至于面包屑导航，以及头像工具栏，代码较为简单，看组件即可`

## 权限验证

### 基础

​		本项目权限实现的方式是：获取当前用户的权限去对比路由表，生成当前用户具有的权限可访问的路由表，通过`router.addRoutes`动态挂载到Router上。

​		但是，由于我们的项目本身是服务于内网的，所以我在逻辑判断的的过程中，只设置了admin一个角色，也就是需要后台将逻辑变成只允许admin用户登录，当登陆之后，我会设置登录的`role`是`[admin]`这样，就可以看到所有的路由，那么权限就是最高，所有的动态路由也就都可以被挂载显示出来，这样我们就可以通过手动修改源码中的`hidden：true`来隐藏一些不会使用到的路由。

`ps: 这里我本人觉得，项目服务于内网，服务于公司内部人员，并不存在角色权限管理的问题，并且路由项目也不是很多，所以做一个动态的角色管理和动态侧边栏确实存在 有劲没处使的情况，反而会增加项目运行的负担`

### 逻辑修改

​		这里需要修改逻辑的话，就要用到`@/permission.js`,这里需要仔细的介绍一下这个项目的判断逻辑。

​		首先，我们需要先看`@/views/login/index.vue`来查看登录的源码，会发现其中登录函数是调用了Vuex中的登录方法的。

```javascript
 handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // $store中的方法是action
          // dispatch是调用user.js中的action方法中的login,并且传参
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: "/"
              });
              this.loading = false;
            })
            .catch(error => {
              console.log(error);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
```

​		然后，我们需要找到`@/store/modules/user/login`方法，至于store的工作方法，以及本项目Vuex的一些构造和知识点，后面在Vuex中我们进行介绍。

```javascript
import { login } from "@/api/user";
// 引用鉴权方法 获取token ，设置token 和 移除token的三个方法
import { getToken,setToken,removeToken,getTokens,removeTokens} from "@/utils/auth";
// 这里是路由方法
import router, { resetRouter } from "@/router";
import Cookies from "js-cookie";

// 这里是状态设置 state的初始化  可以理解为实例
const state = {
  token: function() {
    if (getToken()) {
      return getToken();
    } else {
      return getTokens();
    }
  },
  name: "",
// 当我们想要动态绑定img的src的时候，Vue数据绑图片的相对路径或者绝对路径的时候，必须要require
  avatar: require("../../assets/image/header.jpeg"),
  introduction: "",
  roles: []
};

// 这里是 mutation  可以理解为实例对应的方法
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    sessionStorage.setItem("token", token);
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  // 这里的commit是简略写法，就是为了省去context这个直接进行commit调用
  // 第一个login是vueX中定义的方法，第二个login是api中定义的方法
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    //  将用户名和密码存到本地缓存中
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          //   这里一定是要有token的 如果不设置token 是会报错的 无法登录成功的
          let token = response.data.Authorization;
          commit("SET_TOKEN", token); 
          setToken(token); 
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //   这里直接获取本地的存储登录信息
      //   这个方法会在路由守卫页面被调用
      var data = JSON.parse(window.localStorage.getItem("userInfo"));
      if (!data) {
        reject("登陆失败，重新登陆");
      }
      commit("SET_ROLES", ["admin"]);

      resolve(data);
    });
  },

  // user logout 没有接口就先只清除token
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
     
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      removeTokens();
      resetRouter();
      dispatch("tagsView/delAllViews", null, { root: true });

      resolve();
    });
  },
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

```

​		如上图源码，其中很多注释，我给删除了，具体的可以到源码里面去找，看详细的代码解释。这里，具体的意思就是：
​		点击登录调用`action`中的login方法，然后先将用户名和密码存入本地，这里主要是因为没有获取用户信息的接口，所以为了`genInfo`方法可以有一个判断依据，所以加了这么一行代码。
​		当用户接口成功返回信息之后，设置token，并且调用`@/until/auth.js`中的鉴权方法，将`Token`存入`Cookie`中，后面使用。其他的方法，后面会介绍到。
​		接下来就需要看这个鉴权的方法，就是比较简单的几个函数，通过Cookie来进行Token的设置和清除。

```javascript
import Cookies from "js-cookie";

const TokenKey = "Admin-Token"; //直接登录管理系统
const TokenKeys = "Token"; //通过集控页面跳转而拿到的Token

// 获取Token的方法
export function getToken() {
  return Cookies.get(TokenKey);
}
// 获取Token的方法
export function getTokens() {
  return Cookies.get(TokenKeys);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 });
}
// 删除Token的方法
export function removeTokens() {
  return Cookies.remove(TokenKeys);
}
export function removeToken() {
  return Cookies.remove(TokenKey);
}

```

​		这里设置和清除token都写了两个方法，是因为`token`的`key`不同，需要兼容本身项目直接登录和从另一个项目跳转过来的问题，按照李琪的设计逻辑，本项目本身就不需要`login`页面，登录的方式就是从`集控`项目跳转过来即可，所以，只需要判断是否存在Token就够了，如果有Token就按照Token进行分配路由然后进入页面，具体的权限判断见下图：

```javascript
import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 一个进度条的插件
import "nprogress/nprogress.css"; // 进度条对应的css文件
import { getToken, getTokens } from "@/utils/auth"; // 这是一个鉴权的方法，getToken是其中一个获取token的方法
import getPageTitle from "@/utils/get-page-title"; //这是一个获取页面标题的方法

NProgress.configure({ showSpinner: false }); 

const whiteList = ["/login", "/auth-redirect"]; //白名单 可以直接进入

router.beforeEach(async (to, from, next) => {
  // * 开启进度条
  NProgress.start();

  // * 设置页面的标题
  document.title = getPageTitle(to.meta.title);

  // ! 确定用户是否已登录 两次鉴权 确保两种方式登录都是可以的
  const hasToken = getToken();
  const hadToken = getTokens();
  // !如果是从上一个项目跳转过来的 就会有Token 然后就会自动进入首页
  if (hasToken || hadToken) {
    if (to.path === "/login") {
      // * 如果已登录，请重定向到主页
      next({ path: "/" });
      NProgress.done(); // ? 浏览器顶部的进度条 这里如果是去login页面就要结束这个方法
    } else {
      //  * 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        console.log("尝试获取roles");
        try {
          //   ! 调用这个异步方法 来使得commit执行 给role赋值
          await store.dispatch("user/getInfo");
          //   ! 用这个方法来获取roles的值 直接action异步方法 无法直接获取到roles
          //   * 这个属于利用异步方法的执行线程 来获取roles
          var roles = store.getters.roles;

          //  按照权限生成路由列表
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          //   将路由addRoutes添加进去
          //  ! 使用next({ ...to, replace: true })来确保addRoutes()时动态添加的路由已经被完全加载上去。
          //   replace：true，告诉vue不可以通过后退按钮让路由退回
          router.addRoutes(accessRoutes);
          //    next()不可以包含参数，一旦包含参数的next()不是放行 而是中断这次路由守卫的判断 再次进入
          //    这里是在执行新的路由 不是直接跳转到新的路由
          //    所以这里会再次进行前面的判断
          //    这次roles为true了 就直接放行 而放行的方法就是next()
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

```

​		基于，上面的注释，做一个大概的逻辑概述：首先通过鉴权方法判断是否存在Token，存在的情况下，就判断`to`的路径。
​		如果是去登录页面，那么就跳转到登录，登陆之后就进入`path:/`，也就是首页，这里这个路径是在`router/index.js`中设置过，会重定向到`数据看板`界面。
​		如果不是去登录页面，那么就需要判断角色来进行生成路由，后在`try...catch...`中调用getInfo方法，这里需要异步调用，如果不写`await`，就会直接变成返回一个`promise`，反而导致方法并没有执行，具体方法见前面的介绍，因为`getInfo`是返回的是一个`promise`所以可以使用await方法，等待这个方法执行完毕，`role`也被赋值为`['admin']`,这时调用`store.getters`方法获取当前的角色,再按照权限生成路由列表，后通过`addRoutes`挂载固定路由和动态路由，这时就成功进入了页面。
​		具体函数细节的地方，都写到源码的注释里面了，例如：`next()`的正确用法，以及逻辑理解和可能会遇到的问题。

## 快捷导航（标签栏导航）

```javascript
运用 keep-alive 和 router-view 的结合。

代码: @/layout/components/AppMain.vue
```

### visitedViews && cachedViews

目前tag-view中存在两个数组。

- visitedViews : 用户访问过的页面  就是标签栏导航显示的一个个 tag 数组集合
- cachedViews：实际keep-alive的路由。可以在配置路由时通过meta.noCache来设置是否需要缓存这个路由，默认情况下都是缓存的，特殊情况请设置为true，如果没有这个属性，就需要自己在配置中添加属性。

### 注意事项

​		由于目前`keep-alive`和`router-view`是强耦合的，而且查看文档和源码不难发现`keep-alive`的`include`默认是优先匹配name的，所以编写路由`router`和路由对应的`view component`的时候，一定要确保两者的name是一样的，就是`router`中`name`取什么名字，就要保证组件也写一样的名字。**(切记 name 命名时候尽量保证唯一性 切记不要和某些组件的命名重复了，不然会递归引用最后内存溢出等问题)**

```javascript
// user-table.vue
name: "user-table",
    
// router/index.js
{
      path: "user-table",
      component: () => import("@/views/table/user-table"),
      name: "user-table",
      meta: { title: "用户列表" }
 },    
```

### 代码和组件的移除

​		其实，使用`keep-alive`需要对它本身的源码有很深入的了解，标签导航栏，就是利用它实现的，但是，还是不太成熟，如果递归的项目较多，是不建议使用的。组件源码是Vue-element-admin提供的。**（这边官方给的建议是项目如果用不到这个功能，就尽量移除这个功能，防止出现不必要的错误）**

## 与服务端交互

### 前端请求流程

在本项目中，一个完整的前端UI请求流程是这样的：

1. UI 组件交互操作；
2. 调用统一管理的 api service 请求函数；
3. 使用封装的 request.js 发送请求；
4. 获取服务端返回；
5. 更新 data；

​       由此可知，我们的所有请求处理都放在`@/api`文件夹中，并且一般情况下是按照model纬度进行拆分文件。**（就是Vue和webpack的模块思想）**

```text
api/
  login.js
  article.js
  remoteSearch.js
  ...
```

### request.js

​		其中，`@/utils/request.js` 是基于 [axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。 它封装了全局 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置等`。如下代码块：

```javascript
import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken, getTokens } from "@/utils/auth";

//创建一个axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 
});

// request拦截器
// 发送请求需要带上token，这里是获取token并配置到请求头中，api才可以返回数据
service.interceptors.request.use(
  config => {
      
    if (store.getters.token) {
      if (getToken()) {
       config.headers["Authorization"] = getToken();
      } else {
        config.headers["Authorization"] = getTokens();
      }
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response拦截器
// 这里我只写了如果返回的状态不是1，就是登陆失败了。这个状态码只是用来处理登录请求的
// 当然，项目如果返回的是 401，402,404，甚至500都是后台设置好的
// 可以依据后台接口返回的数据而定
service.interceptors.response.use(
  response => {
    const res = response.data;
   
    // 判断状态码  这里正常应该判断 是404 401 400 等情况
    // 而数据成功 失败的  0或者1  应该放到页面去判断  如果有数据就是1 无数据就是0
    //  因为我们的后台 没有 400 401 404 500的返回值 所以 就在这里简化判断了
    if (res.code !== 1) {
      // !  如果页面用try catch捕获异常就      不能用   return new Error
      // !  如果使用.then .catch捕获异常就     可以用   return new Error
      return Promise.reject(res.msg);
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: response.data,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;

```

​		上面的代码就是一个封装好的非常成熟的`axios`插件，其中包含了各种拦截器，对请求进行拦截并加上`Token`，以及对接口返回的拦截，对状态码的判断等等。根据项目接口的实际情况进行灵活的改变，可以大大地提高项目调试的效率。

### api实例

```javascript
@/api/user.js

//请求用户列表
export function fetchList(query) {
  return request({
    url: "/api/user/selectPage",
    method: "post",
    data: query
  });
}

// views/table/user-table.vue
import { fetchList } from '@/api/article'
export default {
  data() {
    list: null,
    listLoading: true
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
```

### 设置多个baseURL

我们可以通过环境变量来设置多个baseURL，从而请求不同的api地址

```ini
# .env.development
VUE_APP_BASE_API = '/dev-api'    #注入本地 api 开发服务器1的根路径
VUE_APP_BASE_API2 = '/dev-api2'  #注入本地 api2 开发服务器2的根路径
```

之后根据环境变量创建`axios`实例，让它具有不同的`baseURL`。

```javascript
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 
})

const service2 = axios.create({
  baseURL: process.env.BASE_API2, // api2 的 base_url
  timeout: 5000 
})
```

​		这时，需要用哪个服务器就用哪个service，具体的方法在前面的示例中已经介绍过了。就只需要进行实例的替换即可。
​		如果，觉得麻烦，也可以直接在api接口中，多传一个参数叫`baseURL`,这样会直接覆盖，本身写在`request`中的`baseURL`。

#### 环境变量

​		在这里稍微解释一下环境变量，由于项目是用`vue-cli`构建的，所以所有的环境变量配置都是基于`vue-cli`来实现和控制的。

```ini
.env                # 在所有的环境中被载入
.env.[mode]         # 只在指定的模式中被载入
#这里最开始的项目目录结构介绍呼应，这就是为什么要那样命名的原因。
```

​		注意：环境变量必须必须以`VUE_APP_`为开头。如:`VUE_APP_API`、`VUE_APP_TITLE`

```javascript
console.log(process.env.VUE_APP_xxxx)
```

- `NODE_ENV` - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式
- `BASE_URL` - 会和 `vue.config.js` 中的 `publicPath` 选项相符，即你的应用会部署到的基础路径

#### 构建相关

​		除了一些写在`.env`的环境变量之外，还有一些构建和部署相关的变量都是需要在`vue.config.js`中配置的。

```javascript
/vue.config.js

module.exports = {
  // 项目部署到的基础路径，这里不设置"./"打包之后会是空白
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 打包构建输出的路径 是根目录的dist文件夹
  outputDir: "dist",
  // 这里指的是 静态文件的文件夹
  assetsDir: "static",
  //   lintOnSave: process.env.NODE_ENV === "development",
  // productionSourceMap: false,
  devServer: {
    // 设置端口
    port: port,
    // 配置自动启动浏览器
    open: true,
    // 配置多个代理
    proxy: {
      // 这里正常前面是要改名字 将域名或者服务器 地址改成短的 比如api一类
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_API, // 要访问的域名接口
        // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        // * 用这个地址，来代替 taget里面的地址，
        // ! 比如我要调用'http://10.0.4.42:7888/user'，直接写'[]/user/add'即可
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    } 
    //   before: require('./mock/mock-server.js')   不使用mock服务器
  }, 
```

其他配置文件的意义:`jsconfig.json`文件指定根文件和[JavaScript语言服务](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FMicrosoft%2FTypeScript%2Fwiki%2FJavaScript-Language-Service-in-Visual-Studio)提供的功能选项。

```json
{ 
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

Visual Studio Code的JavaScript支持可以在两种不同的模式下运行：

- **文件范围 - 没有jsconfig.json**：在此模式下，在Visual Studio Code中打开的JavaScript文件被视为独立单元。 只要文件a.js没有显式引用文件b.ts（使用///引用指令或**CommonJS**模块），两个文件之间就没有共同的项目上下文。
- **显式项目 - 使用jsconfig.json**：`JavaScript`项目是通过`jsconfig.json`文件定义的。 目录中存在此类文件表示该目录是JavaScript项目的根目录。 文件本身可以选择列出属于项目的文件，要从项目中排除的文件，以及编译器选项（见下文）。

**文件位置**：项目的根目录下

**excluede**：

​		exclude属性（[glob模式](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Fxdlysk%2Fp%2F5183604.html)）告诉语言服务哪些文件是什么文件，而不是源代码的一部分。 

**jsconfig的属性**：

|  选项   |                 描述                  |  类型  |  默认  |
| :-----: | :-----------------------------------: | :----: | :----: |
|  noLib  |           不包含默认库文件            | string |   -    |
| target  |      指定要使用的默认库（ES6..）      | string |   -    |
| baseUrl |   用于解析非相对模块名称的基目录。    | string |   -    |
|  paths  | 指定相对于baseUrl选项计算的路径映射。 | object | 见demo |

**使用webpack别名(与alias类似)**

```javascript
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "ClientApp/*": ["src/*"]
    }
  }
}
//项目中 
import Something from 'ClientApp/foo'
// 或 import Something from '@/foo'
```

这样一个import使用的@的路径就配置好了，只要看到@或者`Clientapp/`它代表的就是`src/`

## 详细功能介绍

### 用户管理

**1.user-table.vue**

```vue
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        placeholder="Title"
        style="width: 800px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        style="margin-left: 10px;"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="280"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="280px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="280px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="密码" width="280px" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.password" :disabled="true" show-password>
          </el-input>
        </template>
      </el-table-column> -->
      <el-table-column label="邮箱" width="298px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" width="280px">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
            :disabled="name == row.username"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          v-if="textMap[dialogStatus] == '新增'"
        >
          <el-input v-model="temp.password" show-password />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" type="email" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, singleDel, addUser, updateUser } from "@/api/article";
import store from "../../store";
import waves from "@/directive/waves"; //? 通用的方法
import Pagination from "@/components/Pagination";

export default {
  name: "user-table",
  components: { Pagination },
  //   一些自定义事件 用这个来绑定 是table具有一些自己定义好的功能
  directives: { waves },

  data() {
    const vaildateEmail = (rule, value, callback) => {
      if (
        /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
          value
        ) == false
      ) {
        callback(new Error("请输入邮箱"));
      } else {
        return true;
      }
    };
    const vaildatePhone = (rule, value, callback) => {
      if (
        /^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i.test(
          value
        ) == false
      ) {
        callback(new Error("请输入手机号"));
      } else {
        return true;
      }
    };
    return {
      //* 表单数据 这里必须设置为空数组 不然会报错
      list: [],
      //   数据总数
      total: 0,
      //   是否显示加载的动画
      listLoading: true,
      // ! 分页的参数
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        username: ""
      },
      // ! 给弹出框进行数据初始化
      temp: {
        username: undefined,
        password: undefined,
        email: undefined,
        phone: undefined
      },
      //   控制弹出框的隐藏出现
      dialogFormVisible: false,
      //   用来判断是新增 还是编辑
      dialogStatus: "",
      //   用来存储两种状态
      textMap: {
        update: "编辑",
        create: "新增"
      },
      //   校验规则 保证用户名 密码和电话 是必填的
      rules: {
        username: [
          { required: true, message: "username is required", trigger: "blur" }
        ],
        password: [
          { required: true, message: "password is required", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "email is required",
            trigger: "blur",
            validator: vaildateEmail
          }
        ],
        phone: [
          {
            required: true,
            message: "phone is required",
            trigger: "blur",
            validator: vaildatePhone
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    // ! 获取所有的用户
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data;
        this.name = store.getters.name;

        setTimeout(() => {
          this.listLoading = false;
        }, 1.0 * 1000);
      });
    },
    // ! 搜索的方法
    handleFilter() {
      this.getList();
    },
    // ! 删除数据的方法
    //  这里多一个确认对话框 保证删除数据 不是立刻删除 解决误删问题  因为存在回调地狱问题 所以改成了await 利于代码逻辑修改
    //  因为这里存在 如果用户下面有项目 是无法删除的 所以需要将数据库返回的信息 提示给用户看 那么return返回的信息就很重要
    //  如果request不判断 就要这里判断
    //  个人推荐 页面判断 成功与否 而request用来判断服务器的异常 例如：404 500等等
    //  这里如果用的await 就需要 try catch捕获错误异常 那么request reject的就是res.msg
    //  这里如果用的是.then()回调函数 .catch捕获错误异常 那么request reject就可以返回一个New Error()
    //  解决异步的方式不同 那么返回函数的方式也是不同的 
    //  这里是组件的确认和取消 使用了.then()方式来进行操作 内部再次嵌套.then()可读性很差 而且.catch()也繁琐
    //  所以这里索性使用了await
    handleDelete(row, index) {
      var userID = {
        id: row.id
      };
       this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            let res = await singleDel(userID);
            if (res.code == 1) {
              this.$notify({
                title: "Success",
                message: "Delete Successfully",
                type: "success",
                duration: 2000
              });
              this.getList();
            }
          } catch (error) {
            this.$message({
              message: error,
              type: "error",
              duration: 3 * 1000
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 重置表单
    resetTemp() {
      this.temp = {
        username: undefined,
        email: undefined,
        phone: undefined,
        password: undefined
      };
    },
    // 新增按钮点击之后的反应
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // ! 这里是增加数据的方法
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          addUser(this.temp).then(res => {
            if (res.code == 1) {
              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: "create Successfully",
                type: "success",
                duration: 2000
              });
            } else {
              this.$notify({
                title: "error",
                message: "created failed",
                type: "error",
                duration: 2000
              });
            }
            this.getList();
          });
        }
      });
    },
    // 更新数据的弹出框打开
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        username: row.username,
        email: row.email,
        phone: row.phone
      };
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // ! 更新数据的具体方法
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign(this.temp, {});
          //  深度复制表单的值 并且赋值给tempData
          updateUser(tempData).then(res => {
            if (res.code == 1) {
              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: "update Successfully",
                type: "success",
                duration: 2000
              });
            } else {
              this.$notify({
                title: "error",
                message: "update failed",
                type: "error",
                duration: 2000
              });
            }
            this.getList();
          });
        }
      });
    }
  }
};
</script>

```

- 此页面的组件大部分都是来自于`element UI`的`table`和`form`组件的，核心内容就是表单展示数据，用对话框搭配表单来进行数据的增加以及修改，详细的`table`和`form`的属性还是见官方的文档。
- 页面一共由三部分组成，头部div，主体table模块，分页组件，这里引用的分页组件是对`elelement UI `的分页组件的二次开发和封装，原生的分页很好用，但是每次调用都需要复制代码，实在太过于繁琐，所以封装成了组件，参数传递方式和接受方式与官方一致，并无差异。
- 页面的设计结构：
  1. table是公用的部分，但是表单中的每一行数据都需要进行 `编辑和删除 `操作，所以这里使用了Vue中的作用域插槽`solt-scope`的方式，将编辑和删除的按钮遍历到表单的每一行；它的作用就是当点击的时候，拿到每一行对应的数据，方便进行下面的操作。
  2. 项目存在编辑和添加两个功能，所以需要一个弹出框来进行操作，这里我将两个功能统一使用一个对话框；为了防止出错，也减少了代码的编写量，只需要判断是点击哪个按钮打开的弹出框即可完成对应的逻辑操作。
  3. 编辑的对话框打开的时候，需要拿到数据展示，而新增数据的对话框打开，需要将对话框清空，方便操作者进行输入，也确保了数据的安全性。
  4. 这里使用了`Vuex`状态管理，来获取登录之后的用户名称，因为后台数据库不允许删除本人的数据，所以，当`vuex`中存入的用户名称与`table`中某一列的数据是吻合的，就将删除按钮禁用。

- 页面的处理逻辑：CRUD的基本操作，函数调用接口`api`，判断接口返回的状态，进行操作提示。要注意的就是，这里每次操作后，一定要进行再次拉取数据库，也就是每个操作结束后，再执行一次查的操作，保证页面是最新的数据。
- `data`中的大部分数据以及函数方法，基本都写了注释，CRUD方法也基本上是最简答的`.then`链式调用处理`promise`函数的方法，只需要根据接口文档对返回的状态码判断即可。

**2.api/artcle.js**

```javascript
import request from "@/utils/request";
// 查询所有
export function fetchList(query) {
  return request({
    url: "/api/user/readCas4Web",
    method: "post",
    data: query
  });
}
// 删除用户
export function singleDel(query) {
  return request({
    url: "/api/user/singleDel",
    method: "post",
    data: query
  });
}
// 添加用户
export function addUser(query) {
  return request({
    url: "/api/user/create",
    method: "post",
    data: query
  });
}
// 更新用户
export function updateUser(query) {
  return request({
    url: "/api/user/update",
    method: "post",
    data: query
  });
}
//获取所有的用户 不返回层级关系
export function getAllUser() {
  return request({
    url: "/api/user/readAll",
    method: "post"
  });
}
// 获取当前用户的权限
export function getPermission() {
  return request({
    url: "/api/project/enableToSetManager",
    method: "post"
  });
}
// 更换管理员的接口
export function setManager(query) {
  return request({
    url: "/api/project/SetManager",
    method: "post",
    data: query
  });
}
```

​		这里是封装的`axios`模块对服务器进行`http`请求，`request`里面的对象就是axios的基本语法，包括了请求地址、请求方式、以及传参方式，这个js模块就是用户管理中所有`api`

### 项目管理

**1.project-table.vue**

```vue
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="Title"
        style="width: 800px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="orgIds"
        clearable
        placeholder="请选择组织"
        class="select"
        @change="changeOrganiazation"
        @clear="getAgain"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        v-waves
        style="margin-left: 10px;"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        增加
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
      style="width: 100%;"
    >
      <el-table-column
        label="项目ID"
        prop="id"
        sortable="custom"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="项目名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目地址" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经度" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.longitude }}</span>
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.latitude }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目介绍" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="储能容量(MW)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.chargeCapacity }}</span>
        </template>
      </el-table-column>
      <el-table-column label=" 风机容量(MW)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.windCapacity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="光伏容量(MW)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.pvCapacity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="火电容量(MW)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.fossilCapacity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="储能功率(MWh)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.chargeEnergy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目网址" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.browserAddr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目状态" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.state === 1">正常</span>
          <span v-if="row.state !== 1">停机</span>
        </template>
      </el-table-column>
      <el-table-column label="项目类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.projectType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理员" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.creatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
          <el-button
            type="primary"
            size="mini"
            v-if="showAdmin == true"
            @click="handleAdmin(row)"
            >设置管理员</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-form-item
              label="组织"
              prop="organizationId"
              style="width:100%"
            >
              <el-select
                v-model="temp.organizationId"
                clearable
                placeholder="请选择组织"
                style="width:100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
              <el-input
                v-model="temp.longitude"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="项目地址" prop="address">
              <el-input v-model="temp.address" />
            </el-form-item>
            <el-form-item label="储能容量" prop="chargeCapacity">
              <el-input
                v-model="temp.chargeCapacity"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="风机容量" prop="windCapacity">
              <el-input
                v-model="temp.windCapacity"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="火电容量" prop="fossilCapacity">
              <el-input
                v-model="temp.fossilCapacity"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="版本" prop="version">
              <el-input
                v-model="temp.version"
                oninput="value=value.replace(/[^\d]/g,'')"
              />
            </el-form-item>
          </el-col>
          <!-- -------------------------------------------------------------------- -->
          <el-col :span="12">
            <el-form-item label="项目状态" prop="state">
              <el-select
                v-model="temp.state"
                clearable
                placeholder="请选择状态"
                style="width:100%"
              >
                <el-option
                  v-for="item in stateOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目介绍" prop="description">
              <el-input v-model="temp.description" />
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
              <el-input
                v-model="temp.latitude"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="项目网址" prop="browserAddr">
              <el-input
                v-model="temp.browserAddr"
                onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
              />
            </el-form-item>
            <el-form-item label="光伏容量" prop="pvCapacity">
              <el-input
                v-model="temp.pvCapacity"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="储能功率" prop="chargeEnergy">
              <el-input
                v-model="temp.chargeEnergy"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="项目类型" prop="projectType">
              <el-input v-model="temp.projectType" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改管理员"
      :visible.sync="dialogFormAdmin"
      :close-on-click-modal="false"
      width="650px"
    >
      <el-form
        ref="adminForm"
        :model="adminTemp"
        :rules="adminRules"
        label-position="left"
        label-width="160px"
      >
        <el-form-item label="选择新的管理员" prop="creator" style="width:100%">
          <el-select v-model="adminTemp.creator" placeholder="请选择">
            <el-option
              v-for="item in adminOptions"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdmin = false">
          取消
        </el-button>
        <el-button type="primary" @click="changeAdmin">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrigan,
  fetchList,
  createProject,
  updateProject,
  deleteProject
} from "@/api/project";
import { getAllUser, getPermission, setManager } from "@/api/article";
import waves from "@/directive/waves"; //? 通用的方法
import Pagination from "@/components/Pagination";

export default {
  name: "project-table",
  components: { Pagination },
  //   一些自定义事件 用这个来绑定 是table具有一些自己定义好的功能
  directives: { waves },
  data() {
    return {
      //   暂存 组织的id
      orgIds: "",
      //   暂存 组织的结构
      options: [],
      stateOptions: [
        {
          value: 0,
          label: "不能使用"
        },
        {
          value: 1,
          label: "运行"
        },
        {
          value: 2,
          label: "非运行"
        },
        {
          value: 3,
          label: "离线"
        }
      ],
      adminOptions: [],
      //* 表单数据 这里必须设置为空数组 不然会报错
      list: [],
      //   数据总数
      total: 0,
      //   是否显示加载的动画
      listLoading: true,
      // ! 分页的参数
      listQuery: {
        orgIds: [],
        name: "",
        pageNum: 1,
        pageSize: 10
      },
      // ! 给弹出框进行数据初始化
      temp: {
        name: undefined,
        state: undefined,
        address: undefined,
        description: undefined,
        longitude: undefined,
        latitude: undefined,
        organizationId: undefined,
        browserAddr: undefined,
        chargeCapacity: undefined,
        pvCapacity: undefined,
        windCapacity: undefined,
        chargeEnergy: undefined,
        fossilCapacity: undefined,
        projectType: undefined,
        version: undefined
      },
      adminTemp: {
        id: "",
        creator: ""
      },
      showAdmin: false,
      //   控制弹出框的隐藏出现
      dialogFormVisible: false,
      dialogFormAdmin: false,
      //   用来判断是新增 还是编辑
      dialogStatus: "",
      //   用来存储两种状态
      textMap: {
        update: "编辑",
        create: "新增"
      },
      //   校验规则 保证用户名 密码和电话 是必填的
      rules: {
        name: [
          { required: true, message: "name is required", trigger: "blur" }
        ],
        state: [
          { required: true, message: "state is required", trigger: "change" }
        ],
        organizationId: [
          { required: true, message: "orgIds is required", trigger: "change" }
        ],
        description: [
          {
            required: true,
            message: "description is required",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            required: true,
            message: "longitude is required",
            trigger: "blur"
          }
        ],
        latitude: [
          { required: true, message: "latitude is required", trigger: "blur" }
        ],
        projectType: [
          {
            required: true,
            message: "projectType is required",
            trigger: "blur"
          }
        ],
        address: [
          { required: true, message: "address is required", trigger: "blur" }
        ],
        version: [
          { required: true, message: "version is required", trigger: "blur" }
        ]
      },
      adminRules: {
        creator: [
          { required: true, message: "user is required", trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.getList();
    this.handleOrigan();
    this.handlePermission();
  },
  methods: {
    // 判断登录用户是否有设置管理员的权限
    handlePermission() {
      getPermission().then(res => {
        if (res.code == 1) {
          this.showAdmin = res.data;
        } else {
          return false;
        }
      });
    },
    //! 获取所有的组织
    handleOrigan() {
      getOrigan({}).then(res => {
        const retData = res.data;
        let arrList = [];
        for (let i = 0; i < retData.length; i++) {
          let retObj = {};
          retObj.value = retData[i].id;
          retObj.label = retData[i].name;
          arrList[i] = retObj;
        }
        this.options = arrList;
      });
    },
    // ! 获取所有的项目
    getList() {
      fetchList(this.listQuery).then(res => {
        this.list = res.data.records;

        setTimeout(() => {
          this.listLoading = false;
        }, 1.0 * 1000);
      });
    },
    // ! 选中组织后更新数据
    changeOrganiazation(tartget) {
      if (tartget) {
        const arrList = [];
        arrList.push(tartget);
        this.listQuery.orgIds = arrList;
        this.getList();
      } else {
        this.listQuery.orgIds = [];
      }
    },
    // ! 搜索的方法
    handleFilter() {
      this.getList();
    },
    // *  清空选项后的方法
    getAgain() {
      this.getList();
    },
    // ! 删除数据的方法
    handleDelete(row, index) {
      var projectID = {
        ids: [row.id]
      };
      deleteProject(projectID).then(res => {
        if (res.code == 1) {
          this.$notify({
            title: "Success",
            message: "Delete Successfully",
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "error",
            message: "Delete failed",
            type: "error",
            duration: 2000
          });
        }
        this.getList();
      });
    },
    // 重置表单
    resetTemp() {
      this.temp = {
        name: undefined,
        state: undefined,
        address: undefined,
        description: undefined,
        longitude: undefined,
        latitude: undefined,
        organizationId: undefined,
        browserAddr: undefined,
        chargeCapacity: undefined,
        pvCapacity: undefined,
        windCapacity: undefined,
        chargeEnergy: undefined,
        fossilCapacity: undefined,
        projectType: undefined,
        version: undefined
      };
    },
    // 新增按钮点击之后的反应
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // ! 这里是增加数据的方法
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          console.log(this.temp);
          createProject(this.temp).then(res => {
            if (res.code == 1) {
              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: "create Successfully",
                type: "success",
                duration: 2000
              });
            } else {
              this.$message({
                showClose: true,
                message: "新增失败",
                type: "error"
              });
            }
            this.getList();
          });
        }
      });
    },
    // 更新数据的弹出框打开
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        name: row.name,
        state: row.state,
        address: row.address,
        description: row.description,
        longitude: row.longitude,
        latitude: row.latitude,
        organizationId: row.organizationId,
        browserAddr: row.browserAddr,
        chargeCapacity: row.chargeCapacity,
        pvCapacity: row.pvCapacity,
        windCapacity: row.windCapacity,
        chargeEnergy: row.chargeEnergy,
        fossilCapacity: row.fossilCapacity,
        projectType: row.projectType,
        version: row.version
      };
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // ! 更新数据的具体方法
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign(this.temp, {});
          //    深度复制表单的值 并且赋值给tempData
          updateProject(tempData).then(res => {
            if (res.code == 1) {
              this.dialogFormVisible = false;
              this.$notify({
                title: "Success",
                message: "update Successfully",
                type: "success",
                duration: 2000
              });
            } else {
              this.$notify({
                title: "error",
                message: "update failed",
                type: "error",
                duration: 2000
              });
            }
            this.getList();
          });
        }
      });
    },
    // 点击如果是id这一列 就根据order进行排序 
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    // 如果order是升序就 asc 如果是降序就 desc
    sortByID(order) {
      if (order === "ascending") {
        this.list.sort(this.ascending("id"));
      } else {
        this.list.sort(this.descending("id"));
      }
    },
    // 升序方法
    ascending(prop) {
      return function(a, b) {
        var value1 = a[prop];
        var value2 = b[prop];
        return value1 - value2;
      };
    },
    // 降序方法
    descending(prop) {
      return function(a, b) {
        var value1 = a[prop];
        var value2 = b[prop];
        return value2 - value1;
      };
    },
    // 修改管理员的弹出窗口
    handleAdmin(row) {
      this.dialogFormAdmin = true;
      this.adminTemp = {
        id: row.id,
        creator: ""
      };
      getAllUser().then(res => {
        console.log(res.data);
        const allUser = res.data;
        let retData = [];
        for (let i = 0; i < allUser.length; i++) {
          let retObj = {};
          retObj.value = allUser[i].id;
          retObj.label = allUser[i].username;
          retData[i] = retObj;
        }
        this.adminOptions = retData;
      });
    },
    // 具体修改成功
    changeAdmin() {
      console.log(this.adminTemp);
      this.$refs["adminForm"].validate(valid => {
        if (valid) {
          setManager(this.adminTemp).then(res => {
            if (res.code == 1) {
              this.dialogFormAdmin = false;
              this.$notify({
                title: "Success",
                message: "alter Successfully",
                type: "success",
                duration: 2000
              });
            } else {
              this.$message({
                showClose: true,
                message: "alter failed",
                type: "error"
              });
            }
            this.getList();
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.select {
  margin-left: 10px;
  top: -4px;
}
</style>

```

- 此页面的结构和样式基本上与用户管理页面是一样的，只是接口略有不同。
- 页面的设计结构：
  1. 在此页面，与用户管理页面不同之处是，多设计了一个对话框框，用来更换项目的管理员；这里个功能涉及到了三个新的接口，一个是获取所有的用户，（不包含级联关系），用来做下拉框数据；二是获取当前登录用户的权限，只有`admin`有权限来更换项目的管理员，如果是其他的管理员是没有权限将项目转接给别的管理员的；最后就是设置项目的管理员的接口，需要传递`项目ID和管理员ID`。
  2. 此页面，用了两个弹出框，所以要设置不同的标记符来区分弹出框，防止重复弹出的`bug`;
  3. 本页面，用到了大量的正则表达式来限制输入框输入的内容，这是因为数据库要求，很多输入框必须是数字或者汉字或者是字母等等
  4. 本页面，上方有两个筛选框，是同一个接口，但是如果传递了组织就会展示组织下对应的项目，如果没有传组织就会展示全部；搜索也是一样的，接口允许将两个值传入或者两个值都为空值！
  5. 在本页面，`table`新添加了一个排序的方法，会按照ID来进行升序或者降序排列，核心就是利用sort方法对每一个数组对象中的key进行大小对比，之后再次返回数组对象达到排序的目的。
- 页面的处理逻辑（与用户管理一样）：CRUD的基本操作，函数调用接口`api`，判断接口返回的状态，进行操作提示。要注意的就是，这里每次操作后，一定要进行再次拉取数据库，也就是每个操作结束后，再执行一次查的操作，保证页面是最新的数据。
- `data`中的大部分数据以及函数方法，基本都写了注释，CRUD方法也基本上是最简答的`.then`链式调用处理`promise`函数的方法，只需要根据接口文档对返回的状态码判断即可。

**2.@/api/project.js**

```javascript
import request from "@/utils/request";

// 获取组织
export function getOrigan(query) {
  return request({
    url: "/api/org/readAll",
    method: "post",
    data: query
  });
}
// 查询所有的项目列表
export function fetchList(query) {
  return request({
    url: "/api/project/read4Web",
    method: "post",
    data: query
  });
}
// 创建项目
export function createProject(query) {
  return request({
    url: "/api/project/create",
    method: "post",
    data: query
  });
}
// 更新项目信息
export function updateProject(query) {
  return request({
    url: "/api/project/update",
    method: "post",
    data: query
  });
}
// 删除项目
export function deleteProject(query) {
  return request({
    url: "/api/project/delete",
    method: "post",
    data: query
  });
}

```

## Vuex介绍与使用

​		本项目也使用到了Vuex，全局状态管理机制，当然这个插件的使用，不仅仅是为了全局状态的管理，它里面还集成了很多的异步方法，可以用来控制全局变量，以及整个项目中不同组件的通信，也就是说它可以完成组件间的通信，通过改变某些全局变量的值和获取他们来达到目的。

### 目录结构

```bash
|--store								#存放vuex的文件夹
│   └── modules             			# model文件夹
│   	├── app.js                      # model_app
│   	├── errorLog.js             	# model_errorLog
│   	├── permission.js             	# model_permission
│   	├── settings.js             	# model_settings
│   	├── tagsView.js             	# model_tagView
│   	├── user.js             		# model_user
│   └── getters.js          			# 获取状态的方法
│   └── index.js            			# vuex入口文件
```

​		以上是本项目的`Vuex`，当然，因为项目是`Vue2.6.+`版本,所以还是沿用之前的`vuex`的项目结构，最新版本的`vuex`将其不放在`src`的根目录下，而是选择性的放在每一个`modules components`里面，或者也可以理解为给每一个组件文件夹的根目录创建一个`store`。

### 用法示例

​		需要先介绍，`index.js`和`getters.js`，见下方代码块：

```javascript
//	getters对象的定义
//	通过箭头函数来引入每一个状态
//	全局调用时 只需要 this.$store.getters.XXX即可获取状态
//	state只是一个变量 具体的内容还是要看这个状态变量 属于哪个modules 然后再用state.modules.属性来获取值
//  将每一个modules的状态，通过这个对象来打包到一起，保证后续全局使用的方便。
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token, //VueX 中token的值
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
};
export default getters;

```



```javascript
源码路径：@/store/index.js

import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

// 定义modules的文件夹
// 一个webpack的api,通过执行require.context函数获取一个特定的上下文,主要用来实现自动化导入模块,
// 在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块

// 语法：require.context(directory, useSubdirectories = false, regExp = /^.//);
// 这里返回的是一个函数
// 1.directory 读取文件的路径
// 2.useSubdirectories 是否遍历文件的子目录
// 3.regExp 是匹配文件的正则
const modulesFiles = require.context("./modules", true, /\.js$/);

// 这里会自动引用所有VueX 需要的state action mutation模块
// .keys() 这个方法就是拿到一个数组 是有文件夹下面所有的.js模块构成的字符串数组
// reduce() 为数组中的每一个元素依次执行回调函数
// 这个函数的就是获取文件夹下面所有的 模块 根据名称和路径 将其内部的函数进行加载 重构
// 每一个js文件里面的东西 都会被这个函数方法加载
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 这一步 就是将 './app.js'变成了'app'  为下面modules对象中key的使用做准备
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");

  // 遍历数组每一项,调用modulesFiles函数传入遍历的元素返回一个Modules模块
  const value = modulesFiles(modulePath);

  // 因为路径是用export default导出的,所以在Module模块的default属性中获取到我导出的内容(即路由的结构),类似这种样子
  // 给modules数组赋值并且返回去 至此所有的模块以及对应的Vuex函数模块都被加载完成
  modules[moduleName] = value.default;
  return modules;
}, {});

// 这里将所有的modules和getters 挂载在store上
// 不挂载Vuex什么读取不到
const store = new Vuex.Store({
  modules,
  getters
});

export default store;

```

​		这里巧妙地使用了`webpack`的`import`特性以及原生的`api`,通过`require`函数实现了批量导入文件夹下面的多个模块以及模块里的内容,具体的代码含义见上方代码块注释，当有了getters和module后，Vuex就可以正常进行工作了，这里是必备的两个条件。具体文档见官方。

### 用户模块的管理（示例）

​		这里就是一个`modules`的示例，具体的它的执行逻辑和方法，都在上面权限管理里面讲述过了它的执行逻辑，以及是如何配合`permission.js`进行权限控制的,其他的`模块`大同小异，都是在控制其组件对应的状态和方法.
​		总结一下：同步方法多写于`api`回调函数之中，用来设置状态标记符;而异步方法多用于`api`回调结束之后，完成某个业务逻辑之后，对状态的异步改变；在使用方法的时候一定要明白什么什么方法应该写成同步函数，而什么方法又应该写成异步函数，异步调用的函数中也是可以包含同步函数的，尽量让`commit`写在对应`modules`的异步方法中，这样便于管理也不会很乱，不要将`commit`也写在组件的调用方法中，易读性差且耦合度较高，不移维护。

```javascript
// 这里是引用接口 暂时只有登录的接口 就只用登录即可
import { login } from "@/api/user";
// 引用鉴权方法 获取token ，设置token 和 移除token的三个方法
import { getToken,setToken, removeToken, getTokens,removeTokens } from "@/utils/auth";
// 这里是路由方法，一个是resetRouter是用来重置路由跳转的
import router, { resetRouter } from "@/router";
import Cookies from "js-cookie";

// 这里是状态设置 state的初始化  可以理解为状态对象实例
// 这里的Token由于存在两个 所以需要 拿鉴权方法 判断
const state = {
  token: function() {
    if (getToken()) {
      return getToken();
    } else {
      return getTokens();
    }
  },
  name: "",
  //    当我们想要动态绑定img的src的时候，Vue数据绑图片的相对路径或者绝对路径的时候，必须要require
  avatar: require("../../assets/image/header.jpeg"),
  introduction: "",
  roles: []
};

// 这里是 mutation  可以理解为实例对应的方法
// mutation下面全部都是同步执行的方法(sync)
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    sessionStorage.setItem("token", token);
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

// 如果是异步(async)改变状态 就是操作action
const actions = {
  // user login
  // 这里的commit是简略写法，就是为了省去context这个直接进行commit调用
  // 第一个login是vueX中定义的方法，第二个login是api中定义的方法
  login({ commit }, userInfo) {
    //  解构赋值 将username和password分别赋值
    const { username, password } = userInfo;
    //  将用户名和密码存到本地缓存中
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    // 这里返回的是一个promise对象
    // 如果成功就执行resolve()
    // 失败就reject(error) 将错误返回去
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          //   如果登录成功，就把接口中获取到的Token存储
          //   这里一定是要有token的 如果不设置token 是会报错的 无法登录成功的
          let token = response.data.Authorization;
          //   commit是在调用mutations里面的方法
          commit("SET_TOKEN", token); //   这里是同步操作
          setToken(token); //   在更新store的同时 将token存入cookie中
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //   这里直接获取本地的存储登录信息
      //   这个方法会在路由守卫页面被调用
      var data = JSON.parse(window.localStorage.getItem("userInfo"));
      if (!data) {
        reject("登陆失败，重新登陆");
      }
      //   设置权限为管理员权限
      commit("SET_ROLES", ["admin"]);

      resolve(data);
    });
  },

  // user logout 没有接口就先只清除token
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      //  将store中的token清空
      //  将角色也清空
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      //  移除浏览器中的token
      removeToken();
      removeTokens();
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
      commit("SET_ROLES", []);
      removeToken();
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

```

