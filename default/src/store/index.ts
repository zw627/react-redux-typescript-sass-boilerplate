import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notification";
import scoreboardReducer from "./scoreboard/";
import { loadStateFromLocal, saveStateToLocal } from "Utils/localStorage";

// Combine all reducers
export const rootReducer = combineReducers({
  notification: notificationReducer,
  scoreboard: scoreboardReducer,
});

// Type for the combined reducer
export type AppState = ReturnType<typeof rootReducer>;

// Load state from localStorage
const preloadedState = loadStateFromLocal();

// Registers reducers with Redux, creates a Redux store that holds state
const store = configureStore({ reducer: rootReducer, preloadedState });

// Subscribe to localStorage
store.subscribe(() => {
  saveStateToLocal({
    notification: store.getState().notification,
    scoreboard: store.getState().scoreboard,
  });
});

export default store;
