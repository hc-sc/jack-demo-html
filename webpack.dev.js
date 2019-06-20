const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');

const entry = {
	"calc": ["./src/assets/calc/calc.js", "./src/assets/calc/calc.scss"]
}

const output = {
	filename: "[name].min.js",
	path: __dirname + "/dist"
}

const _module = {
	rules: [{
			test: /\.s?css$/,
			exclude: /node_modules/,
			use: [
				'css-loader',
				'sass-loader'
			]
		}
	]
}

const plugins = [
	new MiniCssExtractPlugin({
		filename: "calc.min.css"
	})
]

module.exports = {
	entry,
	devtool: 'none',
	mode: 'development',
	module: _module,
	output,
	plugins
}