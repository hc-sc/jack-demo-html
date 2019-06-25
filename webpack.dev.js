const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const entry = {
	'main': './src/index.js'
}

const output = {
	filename: 'main-[contentHash].js',
	path: path.resolve(__dirname + '/dist')
}

const _module = {
	rules: [{
			test: /\.s?css$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		}
	]
}

const plugins = [
	new FriendlyErrorsWebpackPlugin(),
	new HtmlWebpackPlugin({
		filename: 'index-en.html',
		template: './src/main-en.html',
	}),
	new HtmlWebpackPlugin({
		filename: 'index-fr.html',
		template: './src/main-fr.html',
	}),
	new MiniCssExtractPlugin({
		filename: '[name]-[contentHash].css'
	}),
	new CleanWebpackPlugin(),
]

module.exports = {
	entry,
	mode: 'development',
	module: _module,
	output,
	plugins,
}