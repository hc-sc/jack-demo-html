const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


const entry = {
	"main": "./src/index.js"
}

const optimization = {
	minimizer: [
		new TerserJSPlugin(),
		new OptimizeCSSAssetsPlugin()
	]
}

const output = {
	filename: "main-[contentHash].js",
	path: path.resolve(__dirname + "/dist")
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
		},
		/**
		{
			test: /(htm|html|xhtml|hbs|handlebars|php|ejs)$/,
			exclude: /(node_modules)/,
			loader: [
				'file-loader?name=[name].min.html',
				'extract-loader',
				'html-loader',
				'htmllint-loader'
			],
		},
		**/
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: [
				'babel-loader',
				'eslint-loader'
			],
		}
	]
}

const plugins = [
	new MiniCssExtractPlugin({
		filename: "[name]-[contentHash].css"
	}),
	new SassLintPlugin(),
	///new HtmlMinifierPlugin(),
	new HtmlWebpackPlugin({
		template: "./src/calc/main-en.html"
	})
]

module.exports = {
	entry,
	devtool: 'none',
	mode: 'production',
	module: _module,
	output,
	plugins,
	optimization
}