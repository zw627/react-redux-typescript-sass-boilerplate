import { combineReducers } from "redux";

import storageReducer from "./storage/reducer";

const notificationReducer = combineReducers({
  storage: storageReducer,
});

export default notificationReducer;
