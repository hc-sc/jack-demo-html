const path = require('path');
module.exports = {
  entry: './src/assets/calc/calc.js',
  mode:'production',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: ["./src/assets/calc/calc.scss"]
                }
            }]
        }]
    }
};


