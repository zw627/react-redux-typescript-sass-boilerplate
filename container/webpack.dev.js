const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const paths = require("./webpack.common.js").paths;
const common = require("./webpack.common.js").config;

module.exports = merge(common, {
  // "development" will enable debug and etc.
  // "production" will enable minifier and etc.
  mode: "development",

  // "source-map" for "production"
  // "inline-source-map" for "development"
  devtool: "inline-source-map",

  // host: 0.0.0.0 allows external devices to access
  // public: The specified url will be opened automatically on every run (if `open` is true)
  // hot: Hot Module Replacement (HMR) allows modules to be updated at runtime without a full refresh
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    public: "localhost:3000",
    hot: true,
    open: true,
  },

  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
      // Enable/diable ignoring warnings about conflicting order
      ignoreOrder: false,
    }),
  ],

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: paths.output,
  },
});
