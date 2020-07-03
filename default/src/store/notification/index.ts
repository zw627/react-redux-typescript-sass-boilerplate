import { combineReducers } from "redux";

import storageReducer from "./storage/slice";

const notificationReducer = combineReducers({
  storage: storageReducer,
});

export default notificationReducer;
