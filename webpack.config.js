const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const entry = {
  "calc": ["./src/assets/calc/calc.js", "./src/assets/calc/calc.scss"],
  "test": ["./src/test/calc.test.js"]
}

const optimization = {
  minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
}

const output = {
  filename: "[name].min.js",
  path: __dirname+ "/dist"
}

const resolve:{
      alias: {
      config$: './configs/app-config.js',
      react: './vendor/react-master',
      }
}
const _module = {
  rules: [{
    test: /\.s?css$/,
    use: [
       MiniCssExtractPlugin.loader,
       'css-loader',
       'sass-loader'
     ]
  }]
}

const plugins = [
    new MiniCssExtractPlugin({
      filename: "calc.min.css"
    })
]

module.exports = {
  entry,
  mode: 'production',
  module: _module,
  output,
  plugins,
  optimization
}
