const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const paths = require("./webpack.common.js").paths;
const common = require("./webpack.common.js").config;

module.exports = merge(common, {
  mode: "development",

  // "source-map" for "production"
  // "inline-source-map" for "development"
  devtool: "inline-source-map",

  devServer: {
    host: "0.0.0.0", // 0.0.0.0 to allow external devices to access
    hot: true, // Hot Module Replacement (HMR) allows modules to be updated at runtime without a full refresh
    open: true, // Open the browser automatically on start
    useLocalIp: true, // Open ip:port instead of 0.0.0.0:port (Windows does not recognize 0.0.0.0)
    compress: true, // Enable gzip compression for everything served
    historyApiFallback: true, // Enable to support HTML5 History API (e.g. React Router requires this)

    // port: 3000, // Commented to allow dynamic ports for multiple instances
    // public: `localhost:3000`, // The specified url will be opened
  },

  plugins: [
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
      ignoreOrder: false, // Ignore warnings about conflicting order
    }),

    // Analyze project structure and size of each chunk
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // Start a HTTP server to show the bundle report
      analyzerHost: "127.0.0.1", // a.k.a. http://localhost
      analyzerPort: "auto", // Auto to allow dynamic ports for multiple instances
      openAnalyzer: true, // Open automatically on every run
    }),
  ],

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: paths.output,
  },
});
