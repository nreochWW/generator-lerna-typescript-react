const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    package: path.join(__dirname, "index.tsx")
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};
