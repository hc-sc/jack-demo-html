const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');

const entry = {
	'main': './src/index.js'
}

const optimization = {
	minimizer: [
		new TerserJSPlugin(),
		new OptimizeCSSAssetsPlugin()
	]
}
const output = {
	filename: 'main-[contentHash].js',
	path: path.resolve(__dirname + '/dist'),
	chunkFilename: '[name]-chunk-[contentHash].js',
    publicPath: config.get('publicPath')
}

const _module = {
	rules: [
		{
			test: /\.s?css$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				'babel-loader',
				'eslint-loader'
			],
		},
		{
          test: /\.html$/,
          loader: 'htmllint-loader',
          include: [
				'/src/main-en.html',
				'/src/main-fr.html',
			],
		  exclude: /node_modules/,
		},
	]
}

const plugins = [
	new FriendlyErrorsWebpackPlugin(),
	new webpack.optimize.ModuleConcatenationPlugin(),
	new HtmlWebpackPlugin({
		filename: 'index-en.html',
		template: './src/main-en.html',
		minify: {
			removeAttributeQuotes: true,
			collapseWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true,
			useShrotDoctype: true,
			removeEmptyAttributes: true,
			removeStyleLinkTypeAttributes: true,
			keepClosingSlash: true,
			minifyJS: true,
			minifyCSS: true,
			minifyURLs: true
		}
	}),
	new HtmlWebpackPlugin({
		filename: 'index-fr.html',
		template: './src/main-fr.html',
		minify: {
			removeAttributeQuotes: true,
			collapseWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true,
			useShrotDoctype: true,
			removeEmptyAttributes: true,
			removeStyleLinkTypeAttributes: true,
			keepClosingSlash: true,
			minifyJS: true,
			minifyCSS: true,
			minifyURLs: true
		}
	}),
	new MiniCssExtractPlugin({
		filename: '[name]-[contentHash].css'
	}),
	new CleanWebpackPlugin(),
	new SassLintPlugin(),
]

module.exports = {
	entry,
	mode: 'production',
	module: _module,
	output,
	plugins,
	optimization,
	devServer: {
		quiet: true,
	},
}