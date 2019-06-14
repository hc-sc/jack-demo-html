const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: 'index.js',
  output: {
    path: __dirname + '/public',
    filename: 'index_bundle.js'
  },
  module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    },
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
