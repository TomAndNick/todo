var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/app.js', './src/js/todos.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  watchOptions: {
    poll: 500 // Check for changes every second
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ToDo App',
      template: './index.html'
    })
  ]
}