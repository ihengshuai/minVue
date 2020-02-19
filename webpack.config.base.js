/**
 *  基础配置
 */

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  entry: path.resolve(__dirname, './src/app'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/app.[hash:8].js'
  },
  module:{
    rules:[
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins:[
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html')
    }),
    new CleanWebpackPlugin()
  ]
}

module.exports = config