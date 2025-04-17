"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "vue Element Admin"; // page title

const port = process.env.port || process.env.npm_config_port || 9527; // dev port


module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称
  outputDir: "dist",
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "static",
  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  //   lintOnSave: process.env.NODE_ENV === "development",
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,
  devServer: {
    // 设置端口
    port: port,
    // 配置自动启动浏览器
    open: true,
    // 配置多个代理
    // proxy: {
    //   // 这里正常前面是要改名字 将域名或者服务器 地址改成短的 比如api一类
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: process.env.VUE_APP_BASE_API, // 要访问的域名接口
    //     // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     changeOrigin: true,
    //     // * 用这个地址，来代替 taget里面的地址，
    //     // ! 比如我要调用'http://10.0.4.42:7888/user'，直接写'[]/user/add'即可
    //     pathRewrite: {
    //       ["^" + process.env.VUE_APP_BASE_API]: ""
    //     }
    //   }
    // }
    proxy: {
      '/myselfApi': {
        //target:`${window.location.protocol}//${window.location.hostname}:8088`,
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: { ["^/myselfApi"]: "/" }
      }
    }
    //   before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    module: {
      rules: [
        {
          test: /.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
      ]
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  }
};
