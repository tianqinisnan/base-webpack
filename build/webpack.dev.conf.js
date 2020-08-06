'use strict'
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.conf.js')
const config = require('../config').dev

module.exports = merge(base, {
  mode: 'development',
  devtool: config.devtool,
  module: {
    rules: [],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),  // 配置 DevServer HTTP 服务器的文件根目录
    port: config.port,
    host: config.host,
    compress: false,  // 是否开启 gzip 压缩
		disableHostCheck: config.disableHostCheck,
    proxy: config.proxyTable,
    hot: true, // 是否开启模块热替换功能
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
