/**
 * 生产阶段配置
 */

const commonConfig = require('./webpack.config.base')
const path = require('path')
const Merge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin') 

const prodConfig = Merge(commonConfig, {
  mode: 'production',
  plugins:[
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
})

module.exports = prodConfig