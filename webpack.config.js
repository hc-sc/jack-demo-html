const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: ['./src/assets/calc/calc.js', './src/assets/calc/calc.scss'],
  output: {
    filename: 'dist/bundle.js'
  },
  module: {

    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'dist/bundle.js',
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
      filename: 'dist/[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
