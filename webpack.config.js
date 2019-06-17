module.exports = {
 entry: [
    './src/assets/calc/calc.js',
    './src/assets/wet-boew/js/wet-boew.min.js',
    './src/assets/GCWeb/js/theme.min.js',
    './src/assets/jquery.js'
  ],
<<<<<<< HEAD
 output: {
   filename: "bundle.js"
 },
 module: {
   loaders: [
     {
       test: /\.es6$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015']
       }
     }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.es6']
 },
}
=======
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
          loader: "babel-loader"
        }
      }
    ]
  }
};
>>>>>>> 56aee6183a1a534d2a3bb0fe3424272cc3f64ef5
