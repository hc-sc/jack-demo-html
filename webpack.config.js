const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/index.js','./src/assets/calc/calc.js', './src/assets/wet-boew/js/wet-boew.min.js', './src/assets/GCWeb/js/theme.min.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },npm
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
