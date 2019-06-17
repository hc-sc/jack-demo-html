const MinifyPlugin = require("babel-minify-webpack-plugin");
module.exports = {
  entry: [
    './src/assets/calc/calc.js',
    './src/assets/wet-boew/js/wet-boew.min.js',
    './src/assets/GCWeb/js/theme.min.js'
  ],
  output:{
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new MinifyPlugin(minifyOpts, pluginOpts)
  ]
}
