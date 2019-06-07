const path = require('path')

module.exports = {
  entry: ['/assets/calc/calc.js','/assets/wet-boew/js/wet-boew.min.js','/assets/GCWeb/js/theme.min.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
