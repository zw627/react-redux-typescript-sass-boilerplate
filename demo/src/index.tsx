// Replacement for babel polyfill, see https://babeljs.io/docs/en/babel-polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";
// Enable ES5 support and etc. for Immer, see https://immerjs.github.io/immer/docs/installation#pick-your-immer-version
import { enableAllPlugins } from "immer";
import { render } from "react-dom";

import App from "Components/App";
import "Styles/index.scss";

enableAllPlugins();
render(App, document.getElementById("root"));
