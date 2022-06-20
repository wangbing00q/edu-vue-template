const { defineConfig } = require("@vue/cli-service");
const TerserPlugin = require("terser-webpack-plugin")
const apiMocker = require('webpack-api-mocker')
const path = require("path");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const isMock = Boolean(process.env.VUE_APP_ISMOCK)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const resolve = dir => path.join(__dirname, dir);

module.exports = defineConfig({
  publicPath: '/',
  assetsDir: 'static',
  outputDir: './dist',
  filenameHashing: true,
  pages: {
    index: {
      entry: './src/main.js',
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      output: {
        chunkFilename: '[name]-[chunkhash].js',
        filename: '[name]-[chunkhash].js'
      },
      title: '智研教育',
    }
  },
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.symlinks(true);
    config.module
      .rule('')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
    config.resolve.alias.set("@", resolve("src"));
    config.resolve.alias.set("Api", resolve("src/service/api"));
    config.resolve.alias.set("components", resolve("src/components"));
    config.resolve.alias.set("views", resolve("src/views"));
  },


  configureWebpack: config => {

    config.optimization = {
      splitChunks: {
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 1,
            chunks: "initial"
          },
          elementUI: {
            name: "chunk-elementUI",
            priority: 2,
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: "all"
          },
          vue: {
            name: "chunk-vue",
            priority: 3,
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            chunks: "all"
          },
          // lodash: {
          //   name: "chunk-lodash",
          //   test: /[\\/]node_modules[\\/]lodash[\\/]/,
          //   priority: 10,
          //   chunks: "all"
          // }
        }

      },
      minimizer: [
        new TerserPlugin({
          extractComments: false
        }),
        new UglifyJsPlugin({
          uglifyOptions: {
            output: { // 删除注释
              comments: false
            },
            //生产环境自动删除console
            compress: {
              //warnings: false, // 若打包错误，则注释这行
              drop_debugger: true,  //清除 debugger 语句
              drop_console: true,   //清除console语句
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      ],
      minimize: true,

    }
  },
  lintOnSave: false,
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // https: false,
    port: "8088", // 代理
    host: "localhost",
    hot: true, // 热更新
    open: true, // 是否打开浏览器
    proxy: {
      "/": {
        target:
          "http://10.10.11.180:8090/", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: false, // 是否启用websockets
        // pathRewrite: {
        //   "^/api": "/"
        // }
      },
    },
    onBeforeSetupMiddleware(devServer) {
      if (Boolean(isMock)) {
        apiMocker(devServer.app, path.resolve('./mock/index.js'), {
          changeHost: true,
        })
      }
    }
  }
});
