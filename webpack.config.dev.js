/**
 * 开发阶段配置
 */

const path = require('path')
const Merge = require('webpack-merge')
const commonConfig = require('./webpack.config.base')
 
const devConfig = Merge(commonConfig, {
  mode: 'development',
  devServer: {
    port: 2222,
    contentBase: './dist',
    hot: true,
    open: true,
    compress: true
  },
  devtool: 'cheap-module-eval-source-map'
})

module.exports = devConfig