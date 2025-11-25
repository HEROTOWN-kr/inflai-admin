const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // changed import

const outputDirectory = 'dist-admin';

module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'], // removed deprecated babel-polyfill
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: '/',
    filename: 'bundle2.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.(css|s[ac]ss)$/i,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
      type: 'asset', // replaced url-loader with webpack 5 asset modules
      parser: {
        dataUrlCondition: {
          maxSize: 100000
        }
      }
    }
    ]
  },
  resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    port: 3001,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(), // updated usage (no args)
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    })
  ]
};
