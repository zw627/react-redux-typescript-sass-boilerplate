import { combineReducers } from "redux";

import playerReducer from "./player/slice";
import stopwatchReducer from "./stopwatch/reducer";

const scoreboardReducer = combineReducers({
  player: playerReducer,
  stopwatch: stopwatchReducer,
});

export default scoreboardReducer;
