const mode = process.env.NODE_ENV || "development";

const entry = {
  "calc": "./index.js"

}

const output = {
  filename: "[name].bundle.js",
  path: __dirname+ "/dist"
}


module.exports = {
  entry,
  mode,
  output
}
