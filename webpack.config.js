module.exports = {
  entry: [
    './src/assets/calc/calc.js',
    './src/assets/wet-boew/js/wet-boew.min.js',
    './src/assets/GCWeb/js/theme.min.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.js'
  ],
	mode:'production',
  output: {
    path: __dirname,
    publicPath: '/',
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
