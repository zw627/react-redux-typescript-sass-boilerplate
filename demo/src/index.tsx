// Replacement for babel polyfill, see https://babeljs.io/docs/en/babel-polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

// Enable ES5 support and etc. for Immer, see https://immerjs.github.io/immer/docs/installation#pick-your-immer-version
import { enableAllPlugins } from "immer";
enableAllPlugins();

import React, { Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "Store/index";
import Home from "Components/Home";
import NotificationStorage from "Components/NotificationStorage";
import ThemeSwtich from "Components/ThemeSwitch";
import NotFound from "Components/NotFound";
import "Styles/index.scss";

const Scoreboard = React.lazy(() => import("Components/Scoreboard"));
const App = (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/scoreboard" component={Scoreboard} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>

    <NotificationStorage />
    <ThemeSwtich />
  </Provider>
);

render(App, document.getElementById("root"));
