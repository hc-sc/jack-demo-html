const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry:{
    calc :'./src/assets/calc/calc.js',
    style:'./src/assets/calc/calc.scss',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {

    rules: [
      {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'dist/style.js',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
