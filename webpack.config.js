module.exports = {
  entry: 'app.js',
  output: {
    path: __dirname + '',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader'
      ]
    }]
  }
}
