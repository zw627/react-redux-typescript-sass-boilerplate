import { combineReducers } from "redux";

import playerReducer from "./player/slice";
import stopwatchReducer from "./stopwatch/reducer";
import themeReducer from "./theme/slice";

const scoreboardReducer = combineReducers({
  player: playerReducer,
  stopwatch: stopwatchReducer,
  theme: themeReducer,
});

export default scoreboardReducer;
