const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/index.js','assets/calc/calc.js', 'assets/wet-boew/js/wet-boew.min.js', 'assets/GCWeb/js/theme.min.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
