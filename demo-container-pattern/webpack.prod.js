const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { merge } = require("webpack-merge");

const paths = require("./webpack.common.js").paths;
const common = require("./webpack.common.js").config;

module.exports = merge(common, {
  // "development" will enable debug and etc.
  // "production" will enable minifier and etc.
  mode: "production",

  // "source-map" for "production"
  // "inline-source-map" for "development"
  devtool: "source-map",

  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      // [contenthash] genereates hash based on the content of individual file, expected to be default in Webpack 5
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
      // Enable/diable ignoring warnings about conflicting order
      ignoreOrder: false,
    }),

    // Gzip
    new CompressionPlugin(),
  ],

  output: {
    // [contenthash] genereates hash based on the content of individual file, expected to be default in Webpack 5
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: paths.output,
  },
});
