const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');

const entry = {
	"calc": ["./src/assets/calc/calc.js", "./src/assets/calc/calc.scss"]
}

const optimization = {
	minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
}

const output = {
	filename: "[name].min.js",
	path: __dirname + "/dist"
}

const _module = {
	rules: [{
			test: /\.s?css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		},
		{
			test: /(htm|html|xhtml|hbs|handlebars|php|ejs)$/,
			exclude: /(node_modules)/,
			loader: 'htmllint-loader',
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
<<<<<<< HEAD
	new SassLintPlugin(){
		 ignoreFiles: [node_modules]
	}
=======
  new SassLintPlugin(
  )
	
>>>>>>> 4f71689e8101b8f0e5ee1d64c1a81af263ea47be
]

module.exports = {
	entry,
	mode: 'production',
	module: _module,
	output,
	plugins,
	optimization
}