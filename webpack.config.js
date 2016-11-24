var webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './app/src/main'
  ],

  output: {
    path: path.join(__dirname, 'index'),
    filename: '[name].js',
    publicPath: ''
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        // loaders: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!postcss-loader!sass-loader?sourceMap')
        loaders: ['style-loader', 'css?{"modules":true,"sourceMap":true,"localIdentName":"[name]_[local]_[hash:base64:3]"}','sass' ]
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'index'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      }
      // {
      //   test: /\.css$/,
      //   include: path.join(__dirname, 'app'),
      //   loader: 'raw'
      // },

    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main']
    }),

    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),

    new ExtractTextPlugin('./[name].css')

  ]
};