import { combineReducers } from "redux";

import playerReducer from "./player/reducer";
import stopwatchReducer from "./stopwatch/reducer";

const scoreboardReducer = combineReducers({
  player: playerReducer,
  stopwatch: stopwatchReducer,
});

export default scoreboardReducer;
