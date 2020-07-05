import { combineReducers } from "redux";

import playerReducer from "./player/reducer";
import stopwatchReducer from "./stopwatch/reducer";
import themeReducer from "./theme/reducer";

const scoreboardReducer = combineReducers({
  player: playerReducer,
  stopwatch: stopwatchReducer,
  theme: themeReducer,
});

export default scoreboardReducer;
