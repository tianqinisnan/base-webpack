'use strict'
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {}
})

module.exports = {
  // Webpack 在寻找相对路径的文件时会以 context 为根目录
  context: path.resolve(__dirname, '../'),
  entry: {
    // 入口文件是src目录下的main.js
    app: './src/main.js'
  },
  output: {
    path: resolve('output'),
    // 文件名称这里使用默认的name也就是main
    filename: '[name].[hash:8].js',
    // 上线地址，也就是真正的文件引用路径，如果是production生产环境，其实这里都是 '/'
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      '@': resolve('src'),
      // 后面的$符号指精确匹配，
      // 也就是说只能使用 import vuejs from "vue"
      // 这样的方式导入vue.esm.js文件，不能在后面跟上 vue/vue.js
      // 'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        // 对vue文件使用vue-loader，该loader是vue单文件组件的实现核心，专门用来解析.vue文件的
        loader: 'vue-loader',
        // 将vueLoaderConfig当做参数传递给vue-loader,就可以解析文件中的css相关文件
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // 对js文件使用babel-loader转码,该插件是用来解析es6等代码
        loader: 'babel-loader',
        // 指明src和test目录下的js文件要使用该loader
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 限制 8KB 以下的图片才使用DataURL
          limit: 8 * 1024,
          name: utils.assetsPath('img/[name].[contenthash:8].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: utils.assetsPath('media/[name].[contenthash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: utils.assetsPath('fonts/[name].[contenthash:8].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',//指定模板文件
      filename: 'index.html',//产出后的文件名
      inject: true //插入body底部
    }),
    new MiniCssExtractPlugin({
      // filename: '[name].css',
      // chunkFilename:'[id].css'
      filename: 'css/[name].[contenthash:8].css', //name是代码chunk的名字
      chunkFilename: 'css/[id].css' //在异步加载的时候用的
    }),
    new VueLoaderPlugin()
    // new HtmlWebpackExternalsPlugin({
    //   externals:[
    //     {
    //       module:'jquery',//模块名
    //       entry:'https://cdn.bootcss.com/jquery/3.4.1/jquery.js',//CDN的脚本路径
    //       global:'jQuery'//从全局对象的哪个属性上获取导出的值
    //     }
    //   ]
    // }),
    // new CopyWebpackPlugin([{
    //   from: path.resolve(__dirname,'src/assets'),//静态资源目录源地址
    //   to: path.resolve(__dirname,'dist/assets') //目标地址，相对于output的path目录
    // }])
  ]
}
