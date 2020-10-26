const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { paths, config } = require("./webpack.common.js");

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",

  // See https://github.com/webpack/webpack-dev-server/issues/2759#issuecomment-708143185
  // and https://github.com/webpack/webpack-dev-server/issues/2758
  target: "web",

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
    // Extract CSS codes into separate files
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
