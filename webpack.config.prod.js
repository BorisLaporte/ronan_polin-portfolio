//require our dependencies
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')


module.exports = {

  entry: [
    './src/dev/js/index'
  ],

  
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name]-[hash].js',
  },

  resolve: {
    modules: ["node_modules"],
    alias: {
      'DATA$': path.resolve(__dirname, 'src/data'),
      'IMG': path.resolve(__dirname, 'src/assets/img'),
      'FONT': path.resolve(__dirname, 'src/assets/font'),
      'SASS$': path.resolve(__dirname, 'src/dev/sass/main'),
      'APP': path.resolve(__dirname, 'src/dev/js/App')
    },
    extensions:['.scss','.json','.js','.jsx']
  },


  plugins: [
    new webpack.ProvidePlugin({ 
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery' 
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
      },
      output: {
          comments: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new CompressionPlugin()
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
        test: /\.(jpe?g|png|svg|gif)$/,
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