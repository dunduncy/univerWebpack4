const viewGenerator = require("./plop-templates/view/prompt");
const componentGenerator = require("./plop-templates/component/prompt");
const storeGenerator = require("./plop-templates/store/prompt.js");

module.exports = function(plop) {
  plop.setGenerator("view", viewGenerator);
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("store", storeGenerator);
};
// view页面，component组件，store vuex文件。
// 下载模板页面，放到根目录下面
// 去packjson中配置
// npm run new 就会生成新的页面
