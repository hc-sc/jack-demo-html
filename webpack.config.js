const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: 'index.js',
  output: {
    path: __dirname + '/public',
    filename: 'index_bundle.js'
  },
   module:{
     rules:[
             {
                 test:/\.scss$/,
                 use:['sass-loader']
              }
      ]
   },
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
