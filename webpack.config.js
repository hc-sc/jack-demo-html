module.exports = {
  entry: [
    './src/assets/calc/calc.js',
    './src/assets/wet-boew/js/wet-boew.min.js',
    './src/assets/GCWeb/js/theme.min.js',
    './src/assets/jquery.js'
  ],
	mode:'production',
  output: {
    path: __dirname,
    publicPath: '/src',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "script-loader"
        }
      }
    ]
  }
};
