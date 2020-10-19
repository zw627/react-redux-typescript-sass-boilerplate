const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const paths = {
  nodeModules: path.resolve(__dirname, "node_modules"),
  output: path.resolve(__dirname, "dist"),
  coverage: path.resolve(__dirname, "coverage"),
  public: path.resolve(__dirname, "public"),
  template: path.resolve(__dirname, "public/index.html"),
  entry: path.resolve(__dirname, "src/index.tsx"),

  assets: path.resolve(__dirname, "src/assets"),
  components: path.resolve(__dirname, "src/components"),
  containers: path.resolve(__dirname, "src/containers"),
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
      alias: {
        NodeModules: paths.nodeModules,
        Assets: paths.assets,
        Components: paths.components,
        Containers: paths.containers,
        Store: paths.store,
        Styles: paths.styles,
        Utils: paths.utils,
      },
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
              ignore: ["**/*.html"],
            },
          },
        ],
      }),
    ],

    optimization: {
      // Code splitting
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
          },
        },
      },
    },

    module: {
      rules: [
        // TS, TSX, JS, JSX
        {
          test: /\.[tj]s(x)?$/i,
          exclude: /(node_modules|bower_components)/,
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

        // SASS, SCSS, CSS
        {
          test: /\.(s[ac]|c)ss$/i,
          exclude: /(node_modules|bower_components)/,
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
                postcssOptions: {
                  plugins: [
                    require("postcss-normalize")(), // Normalize
                    require("postcss-preset-env")(),
                    require("autoprefixer")(), // Add `-ms`, `-moz`, `-webkit` automatically
                    require("cssnano")({ preset: "default" }), // Minify
                  ],
                },
              },
            },
            // Compile SCSS to CSS
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },

        // Assets
        {
          test: /\.(png|svg|jp(e)?g|gif|woff(2)?|eot|ttf|otf)$/i,
          use: ["file-loader"],
        },
      ],
    },
  },
};
