const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

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

    // Copy files inside `public` to the output folder, useful for static assets like favicon
    // This imitates the similar behavior of create-react-app
    new CopyPlugin({
      patterns: [
        {
          from: paths.public,
          globOptions: {
            ignore: ["*.html"],
          },
        },
      ],
    }),
  ],

  output: {
    // [contenthash] genereates hash based on the content of individual file, expected to be default in Webpack 5
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: paths.output,
  },
});
