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
