const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { paths, config } = require("./webpack.common.js");

module.exports = merge(config, {
  mode: "production",
  devtool: "source-map",

  plugins: [
    // Extract CSS codes into separate files
    new MiniCssExtractPlugin({
      // [contenthash] genereates hash based on the content of individual file, expected to be default in Webpack 5
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
      ignoreOrder: false, // Ignore warnings about conflicting order
    }),

    // Gzip
    new CompressionPlugin(),

    // Analyze project structure and size of each chunk
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // Generate a HTML file with bundle report
      reportFilename: `${paths.coverage}/webpack-bundle-analyzer/report.html`,
      openAnalyzer: true, // Open automatically on every run
    }),
  ],

  output: {
    // [contenthash] genereates hash based on the content of individual file, expected to be default in Webpack 5
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: paths.output,
  },
});
