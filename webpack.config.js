var HtmlWebpackPlugin = require('html-webpack-plugin');
var PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  entry: ['./src/js/app.js', './src/js/todos.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  watchOptions: {
    poll: 500 // Check for changes every second
  },
  plugins: [
    new PrettierPlugin({extensions: ".js"}),
    new HtmlWebpackPlugin({
      title: 'ToDo App',
      template: './index.html'
    })
  ]
}