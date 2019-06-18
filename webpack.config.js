const mode = process.env.NODE_ENV || "development";

const entry = {
  "calc": ["./src/assets/calc/calc.js", "./src/assets/calc/calc.scss"]
}

const output = {
  filename: "[name].js",
  path: __dirname+ "/dist"
}

const _module = {
   rules: [{
      test: /\.scss$/,
      use: [
         "style-loader", // creates style nodes from JS strings
         "css-loader", // translates CSS into CommonJS
         "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    }]
}

module.exports = {
  entry,
  mode,
  output
}
