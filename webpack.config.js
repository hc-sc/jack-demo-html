module.exports = {
 entry: [
    './src/assets/calc/calc.js',
    './src/assets/wet-boew/js/wet-boew.min.js',
    './src/assets/GCWeb/js/theme.min.js',
    './src/assets/jquery.js'
  ],
 output: {
   filename: "bundle.js"
 },
 module: {
   preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'

      }
   ],
   loaders: [
     {
       test: /\.es6$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
       }
      }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.es6']
 }
};
