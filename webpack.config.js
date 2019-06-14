const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module:{
    rules:[
      {
        test: "main-en.html",
        use: [
          {
             loader : "html-loader",
             options : {minimize: true}

          }
        ]
      },
    ]
  },
  plugins:[
    new HtmlWebPackPlugin({
      template: "./src/main-en.html",
      filename:"./index.html"
    }),
  ]
}
