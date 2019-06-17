var webpack = require('webpack')
module.exports = {
    entry: {
        entry: __dirname + [
    './src/assets/calc/calc.js',
    './src/assets/wet-boew/js/wet-boew.min.js',
    './src/assets/GCWeb/js/theme.min.js'
  ],
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
