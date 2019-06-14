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
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    },
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
