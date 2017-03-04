//require our dependencies
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-eval-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/dev/js/index'
  ],

  
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name]-[hash].js',
  },

  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
  },

  resolve: {
    modules: ["node_modules"],
    alias: {
      IMG: path.join(__dirname, 'src/assets/img'),
      FONT: path.join(__dirname, 'src/assets/font'),
      SASS: path.join(__dirname, 'src/dev/sass'),
      PRELOAD: path.join(__dirname, 'src/dev/js/Preload'),
      STORE: path.join(__dirname, 'src/dev/js/Store'),
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({ 
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery' 
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, 
        include: path.join(__dirname, './src/dev'),
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        loader: 'file-loader?name=./img/[name]-[hash:6].[ext]',
        include: path.join(__dirname, './src/assets/img')
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]',
        include: path.join(__dirname, './src/assets/font')
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
}