const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const path = require("path");

const entry = {
	"calc": ["./src/assets/calc/calc.js", "./src/assets/calc/calc.scss"]
}
///Optimization happens when the mode is set to production
const optimization = {
	minimizer: [
		new TerserJSPlugin(),
		new OptimizeCSSAssetsPlugin()
	],
}

const output = {
	filename: "main.js",
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
			test: /(htm|html|xhtml|hbs|handlebars|php|ejs)$/,
			exclude: [
				/(node_modules)/,
				/(GCWeb)/,
				/(wet-boew)/,
			],
			loader: [
				'file-loader?name=[name].min.html',
				'extract-loader',
				'html-loader',
				'htmllint-loader'
			],
		},
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
		filename: "calc.min.css"
	}),
	new SassLintPlugin(),
	new HtmlMinifierPlugin()
]

module.exports = {
	entry,
	mode: 'production',
	module: _module,
	output,
	plugins,
	optimization
}