const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module:{
    rules:[
      {
        test: /\.html$/,
        use: [
          {
             loader : "html-loader",
             options : {
                removeComments: true,
                collapseWhitespace: true,
                minimize: true
            }
          }
        ]
      },
      {
      test: /\.svg$/,
        use: [
          {
             loader : "svg-inline-loader",
          }
        ]
      },
      {
       test: /\.scss$/,
        use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]},






  ]},
  plugins:[
    new HtmlWebPackPlugin({
      template: "./src/main-en.html",
      filename:"./dist/main-en.html"
    }),
  ]
}

