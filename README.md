# boilerplate-react-redux-ts-scss

[![builds](https://github.com/zw627/boilerplate-react-redux-ts-scss/workflows/builds/badge.svg)](https://github.com/zw627/boilerplate-react-redux-ts-scss/actions?query=workflow%3Abuilds)
[![codecov](https://codecov.io/gh/zw627/boilerplate-react-redux-ts-scss/branch/master/graph/badge.svg?token=OsVLx0rz4f)](https://codecov.io/gh/zw627/boilerplate-react-redux-ts-scss)

[![Maintainability](https://api.codeclimate.com/v1/badges/e355774e2727848b3246/maintainability)](https://codeclimate.com/github/zw627/boilerplate-react-redux-ts-scss/maintainability)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/42690844b68e4670b6ae018ec3fa4264)](https://www.codacy.com/gh/zw627/boilerplate-react-redux-ts-scss/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zw627/boilerplate-react-redux-ts-scss&amp;utm_campaign=Badge_Grade)
[![CodeFactor](https://www.codefactor.io/repository/github/zw627/boilerplate-react-redux-ts-scss/badge)](https://www.codefactor.io/repository/github/zw627/boilerplate-react-redux-ts-scss)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![known vulnerabilities](https://snyk.io/test/github/zw627/boilerplate-react-redux-ts-scss/badge.svg?targetFile=demo/package.json)](https://snyk.io/test/github/zw627/boilerplate-react-redux-ts-scss?targetFile=demo/package.json)
[![dependencies](https://david-dm.org/zw627/boilerplate-react-redux-ts-scss/status.svg?path=demo)](https://david-dm.org/zw627/boilerplate-react-redux-ts-scss?path=demo)
[![devDependencies](https://david-dm.org/zw627/boilerplate-react-redux-ts-scss/dev-status.svg?path=demo)](https://david-dm.org/zw627/boilerplate-react-redux-ts-scss?path=demo&type=dev)

## Description

A boilerplate with 2 demos for React-Redux-TypeScript-Sass projects.

Folder structure:

  - [`demo`](https://boilerplate-demo.netlify.app) is the demo that follows the natural flow of the brand new [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) and [React-Redux Hooks](https://react-redux.js.org/api/hooks).
  - [`demo-legacy`](https://boilerplate-demo-container.netlify.app) is the demo that uses the most traditional "[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)" pattern proposed by Dan Abramov.

[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools) and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools) are recommended when comparing how `demo` and `demo-legacy` differs in their behaviors.

[![Deploys by Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com/)

## Technology stack

**Core:** React, Redux, TypeScript, Sass.

**Testing:** Jest, Enzyme, (Codecov).

**DevOps:** Webpack, ESLint, stylelint, lint-staged, Husky, Prettier, (Code Climate, Codacy, CodeFactor, GitHub Actions, Snyke, David-DM).

**Transpilation/Polyfill:** Babel, core-js, regenerator-runtime, PostCSS, browserslist.

**Others:** react-router-dom, Redux Toolkit, Immer, UUID, Reselect, etc.

## Highlights

| Feature                      | Support | Detail                                                       | Note                                                                                                                                                                                                                                                                   |
|------------------------------|:-------:|--------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Path aliases                 |    ✅    | Webpack (built-in), TypeScript (compiler), Jest              | Must be configued in two files: `webpack.common.js` and `tsconfig.json`. Path aliases from `tsconfig.json` will be exported to `jest.config.js` automatically.                                                                                 |
| Compression                  |    ✅    | Webpack (compression-webpack-plugin)                         | Gzip. Configurable in Webpack configuration files.                                                                                                                                                                                                                     |
| Code splitting               |    ✅    | Webpack (built-in), mini-css-extract-plugin                  | Configurable in Webpack configuration files. By default, all third party JavaScript dependencies are moved to a `vendor.js`, and CSS file is created per JS file if contains CSS.                                                                                      |
| Bundle size analytics        |    ✅    | Webpack (webpack-bundle-analyzer)                            | Run as dev server in development, export to `coverage/webpack-bundler-analyzer` in production.                                                                                                                                                                         |
| Browser cache optimization   |    ✅    | Webpack (built-in)                                           | Add `contenthash` to the filenames in production which allows browsers to download new files if they are updated and load from cache if they are unchanged. `contenthash` genereates hash based on the content of individual file, expected to be default in Webpack 5. |
| Polyfill JavaScript          |    ✅    | Babel, core-js, regenerator-runtime, browserslist            | `browserslist` can be configured in `package.json`, and Babel in Webpack configuration files. `core-js` and `regenerator-runtime` must be imported in the entry file (e.g. `index.tsx`).                                                                               |
| Polyfill CSS                 |    ✅    | PostCSS, browserslist                                        | `browserslist` can be configured in `package.json`, and PostCSS in Webpack configuration files.                                                                                                                                                                        |
| Auto Staged Files Linting    |    ✅    | Husky, lint-staged, ESLint, stylelint, TypeScript (compiler) | Configurable in `lint-staged.config.js`.                                                                                                                                                                                                                               |
| Auto Staged Files Testing    |    ✅    | Husky, lint-staged, Jest, Enzyme                             | Configurable in `lint-staged.config.js`.                                                                                                                                                                                                                               |
| Auto Staged Files Formatting |    ✅    | Husky, lint-staged, Prettier                                 | Configurable in `lint-staged.config.js`.                                                                                                                                                                                                                               |
| Auto Static Assets Copying   |    ✅    | Webpack (copy-webpack-plugin)                                | Similar to the behavior of Create React App, all files excpet for HTML inside the `Public` folder wll be moved to your default build folder automatically.                                                                                                             |
