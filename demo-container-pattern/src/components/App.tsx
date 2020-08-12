import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "Store/index";
import Home from "Components/Home";
import NotificationStorage from "Components/NotificationStorage";
import ThemeSwtich from "Containers/ThemeSwitch";
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

export default App;
