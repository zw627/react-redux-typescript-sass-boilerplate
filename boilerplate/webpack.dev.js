const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const paths = require("./webpack.common.js").paths;
const common = require("./webpack.common.js").config;

module.exports = merge(common, {
  // "development" will enable debug and etc.
  // "production" will enable minifier and etc.
  mode: "development",

  // "source-map" for "production"
  // "inline-source-map" for "development"
  devtool: "inline-source-map",

  devServer: {
    host: "0.0.0.0", // 0.0.0.0 to allow external devices to access
    port: 3000,
    public: "localhost:3000", // The specified url will be opened automatically on every run (if `open` is true)
    hot: true, // Hot Module Replacement (HMR) allows modules to be updated at runtime without a full refresh
    open: true,
  },

  plugins: [
    // Extract CSS codes into separate files
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
      ignoreOrder: false, // Ignore warnings about conflicting order
    }),

    // Analyze project structure and size of each chunk
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // Start a HTTP server to show bundle report
      analyzerHost: "127.0.0.1", // http://localhost
      analyzerPort: 8888, // http://localhost:8888
      openAnalyzer: true, // Open automatically on every run
    }),
  ],

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: paths.output,
  },
});
