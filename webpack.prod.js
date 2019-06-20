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
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: [
				'babel-loader',
				'eslint-loader'
			],
		},
		{
			test: /\.html$/,
			use: ["html-loader"]
		},
		{
			test: /\.(svg|png|jpg|gif)$/,
			use: {
				loader: "file-loader",
				options: {
					name: "[name].[hash].[ext]",
					outputPath: "imgs"
				}
			}
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
		filename: 'index-en.html',
		template: "./src/calc/main-en.html"
	}),
	/**
	new HtmlWebpackPlugin({
		filename: 'index-fr.html',
		template: "./src/calc/main-fr.html"
	})
	**/
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