const mode = process.env.NODE_ENV || "development";

const entry = {
  "calc": "./src/assets/calc/calc.js"

}

const output = {
  filename: "[name].js",
  path: __dirname+ "/dist"
}


module.exports = {
  entry,
  mode,
  output
}
