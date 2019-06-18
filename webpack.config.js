const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
 entry: ['./src/assets/calc/calc.js',
          './src/assets/calc/calc.scss'
  ],
 output: {
  filename: 'main.js'
 },
 module: {

  rules: [{
   test: /\.scss$/,
   use: MiniCssExtractPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
   })
  }]
 },
 plugins: [
  new HtmlWebpackPlugin({
   title: 'Project Demo',
   // minify: {
   //     collapseWhitespace: true
   // },
   hash: true,
   template: './src/main-en.html',
  }),
  new MiniCssExtractPlugin({
   filename: 'main.css',
   disable: false,
   allChunks: true
  })
 ],
 mode: 'production',
};
