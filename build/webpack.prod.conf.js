const { merge } = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const base = require('./webpack.base.conf.js')

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      //mode为production 默认会开启js压缩
      new TerserWebpackPlugin({
        parallel: true,   //多进程压缩
        cache: true       //缓存
      }),
      //压缩css资源的
      new OptimizeCSSAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        //cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
        cssProcessor: require('cssnano')
      })
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vender',
          test: /node_modules/,
          // maxSize: 200 * 1024,
          priority: -10
        },
        commons: {
          chunks: 'initial',
          name: 'common',
          minSize: 0,
          minChunks: 2,
          priority: -20
        }
      }
    }
  }
})