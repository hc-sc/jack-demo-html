const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
 entry: './src/assets/calc/calc.js',
 output: {
  filename: 'main.js'
 },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js/
      },
      {
        test: /\.s?css/,
        use:[
            "style-loader",
            "css-loader",
            "sass-loader"
        ]
      }
    ],
  },
};
