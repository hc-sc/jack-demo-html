const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
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
    ]
  },
  plugins:[
    new HtmlWebPackPlugin({
      template: "./src/main-en.html",
      filename:"./dist/main-en.html"
    }),
  ]
}
