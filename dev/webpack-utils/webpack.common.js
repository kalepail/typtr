const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const commonPaths = require('./common-paths');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: commonPaths.outputPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.s?css$/,
      exclude: /(node_modules)/,
      loader: 'import-glob'
    },{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'import-glob'
    },{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    },{
      test: /\.(woff2?|ttf|eot|txt)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }]
    },{
      test: /\.(jpe?g|png|gif)$/i,
      use: [{
        loader:'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }, {
        loader: 'image-webpack-loader'
      }]
    },{
      test: /\.(svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './index.html'}),
    new HtmlWebpackHarddiskPlugin()
  ]
}
