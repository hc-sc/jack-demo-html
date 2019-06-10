const path = require('path')
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');


module.exports = {
 mode: "production"
 entry: ['../src/calc/calc.js', '../src/wet-boew/js/wet-boew.min.js', '../src/GCWeb/js/theme.min.js'],

 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '../bundle.js'
 },

 module: {
      loaders: [
      {
          test: /\(htm|html|xhtml|hbs|handlebars|php|ejs)$/,
          loader: "htmllint-loader",
          include: '_src/markup/',
      },
    ],
  },
};
