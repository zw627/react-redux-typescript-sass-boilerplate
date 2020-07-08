const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// Centralize all paths for easy inspection and modification
// Used by all webpack.*.js
const path = require("path");
const paths = {
  output: path.resolve(__dirname, "dist"),
  nodeModules: path.resolve(__dirname, "node_modules"),
  public: path.resolve(__dirname, "public"),
  template: path.resolve(__dirname, "public/index.html"),
  entry: path.resolve(__dirname, "src/index.tsx"),
  components: path.resolve(__dirname, "src/components"),
  store: path.resolve(__dirname, "src/store"),
  styles: path.resolve(__dirname, "src/styles"),
  utils: path.resolve(__dirname, "src/utils"),
};

module.exports = {
  paths,
  config: {
    entry: {
      index: paths.entry,
    },

    resolve: {
      // Path aliases, e.g. `../../store/index` => `Store/index`
      alias: {
        NodeModules: paths.nodeModules,
        Components: paths.components,
        Store: paths.store,
        Styles: paths.styles,
        Utils: paths.utils,
      },
      // Required, otherwise compiler returns module not found, cannot resolve
      extensions: [".tsx", ".ts", ".js", "jsx"],
    },

    plugins: [
      // Clean the output folder on every run
      new CleanWebpackPlugin(),

      // Generate a html file based on the `template`
      new HtmlWebpackPlugin({
        template: paths.template,
        filename: "index.html",
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

      // Analyze project structure and size of each chunk
      new BundleAnalyzerPlugin({
        // Static mode
        analyzerMode: "static", // Generate a HTML file with bundle report
        reportFilename: path.resolve(
          __dirname,
          "coverage/webpack-bundle-analyzer/report.html"
        ),

        // Server mode
        // analyzerMode: "server",     // Start a HTTP server to show bundle report
        // analyzerHost: "127.0.0.1",  // http://localhost
        // analyzerPort: 8888,         // http://localhost:8888
        // openAnalyzer: true,         // Open automatically on every run
      }),
    ],

    optimization: {
      // Code splitting
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            // Place all codes from 3rd-party inside `vendor.js`
            name: "vendor",
            // `all`, `async`, or `initial`, see https://webpack.js.org/plugins/split-chunks-plugin/
            chunks: "all",
          },
        },
      },
    },

    module: {
      rules: [
        {
          // .ts .js .tsx .jsx (ignore case)
          test: /\.[tj]s(x)?$/i,
          // Ignore folders
          exclude: /(node_modules|bower_components)/,
          // Specify loaders
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  // https://babeljs.io/docs/en/babel-preset-env
                  "@babel/preset-env",
                  {
                    debug: false,
                    useBuiltIns: "entry",
                    corejs: { version: 3, proposals: true },
                  },
                ],
                // https://babeljs.io/docs/en/babel-preset-typescript
                "@babel/preset-typescript",
                // https://babeljs.io/docs/en/babel-preset-react
                "@babel/preset-react",
              ],
              // Hot Module Replacement (HMR) allows modules to be updated at runtime without a full refresh
              // Warning: `react-hot-loader` is expected to be replaced by `React Fast Refresh`, but currently Webpack only support the former (2019-12-24)
              // https://github.com/gaearon/react-hot-loader
              plugins: ["react-hot-loader/babel"],
            },
          },
        },

        {
          // .sass .scss .css (ignore case)
          test: /\.(s[ac]|c)ss$/i,
          // Ignore folders
          exclude: /(node_modules|bower_components)/,
          // Specify loaders
          use: [
            // Extracts into separate files
            { loader: MiniCssExtractPlugin.loader, options: {} },
            // Compile
            { loader: "css-loader", options: { sourceMap: true } },
            // Polyfill
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                ident: "postcss",
                plugins: [
                  require("postcss-normalize")(), // Normalize
                  require("postcss-preset-env")(),
                  require("autoprefixer")(), // Add `-ms`, `-moz`, `-webkit` automatically
                  require("cssnano")({ preset: "default" }), // Minify
                ],
              },
            },
            // Compile SCSS to CSS
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },

        {
          // .png .svg .jpg .jpeg .gif .woff .woff2 .eot .ttf .otf (ignore case; add more formats if needed)
          test: /\.(png|svg|jp(e)?g|gif|woff(2)?|eot|ttf|otf)$/i,
          use: ["file-loader"],
        },
      ],
    },
  },
};
