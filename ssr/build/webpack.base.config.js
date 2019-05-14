const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('../config');

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: `${config.STATIC_PATH || ''}/dist/`,
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'public': path.resolve(__dirname, '../public'),
      '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        exclude: [resolve('node_modules')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: false
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          },
          loaders: {
            scss: ['vue-style-loader', 'sass-loader', {
              loader: 'sass-resources-loader',
              options: { resources: path.resolve(__dirname, '../src/styles/var.scss')}
            }]
          },
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        // use: ['url-loader', 'file-loader'],
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'postcss-loader', 'sass-loader', {
          loader: 'sass-resources-loader',
          options: { resources: path.resolve(__dirname, '../src/styles/var.scss')}
        }]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)$/,
      //   loader: 'file-loader'
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader'
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]
};
