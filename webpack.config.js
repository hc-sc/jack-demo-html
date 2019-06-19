const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entry = {
  "calc": ["./src/assets/calc/calc.js", "./src/assets/calc/calc.scss"]
}

const output = {
  filename: "[name].new.js",
  path: __dirname+ "/dist"
}

const _module = {
   rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
         "style-loader",
         "css-loader",
         "sass-loader"
       ]
    }]
}

const plugins = [
  new MiniCssExtractPlugin({
      filename: "../new.css"
    })
]

module.exports = {
  entry,
  mode: 'production',
  module: _module,
  output,
  plugins
}
