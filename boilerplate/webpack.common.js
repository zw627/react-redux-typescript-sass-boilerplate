const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Centralize all paths for easy inspection, used by all `webpack.*.js`
const path = require("path");
const paths = {
  nodeModules: path.resolve(__dirname, "node_modules"),
  output: path.resolve(__dirname, "dist"),
  coverage: path.resolve(__dirname, "coverage"),
  public: path.resolve(__dirname, "public"),
  template: path.resolve(__dirname, "public/index.html"),
  entry: path.resolve(__dirname, "src/index.tsx"),
};

module.exports = {
  // Export paths for other `webpack.*.js` to use
  paths,

  // Webpack config
  config: {
    // Entry point (e.g. `src/index.tsx`)
    entry: {
      index: paths.entry,
    },

    resolve: {
      // Path aliases (e.g. `../../node_modules/jest` can be imported as `NodeModules/jest`)
      alias: {
        NodeModules: paths.nodeModules,
      },
      // Required, otherwise compiler returns module not found and cannot resolve
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
    ],

    optimization: {
      // Code splitting
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor", // Place all codes from 3rd-party inside `vendor.js`
            chunks: "all", // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
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
                "@babel/preset-typescript", // https://babeljs.io/docs/en/babel-preset-typescript
                "@babel/preset-react", // https://babeljs.io/docs/en/babel-preset-react
              ],

              // `react-hot-loader` is expected to be replaced by `react-fast-refresh`
              // https://github.com/gaearon/react-hot-loader#moving-towards-next-step
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
