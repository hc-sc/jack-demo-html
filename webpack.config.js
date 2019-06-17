module.exports = {
  entry:[ './src/assets/calc/calc.js',
	'./src/assets/GCWeb/js/theme.js'],
mode:'production',
  output: {
    path: __dirname,
    publicPath: './src/assets/GCWeb/js',
    filename: 'bundle.js'
  }
};
