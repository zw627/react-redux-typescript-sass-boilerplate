import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

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

// Register reducers with Redux and create a store
// Load state
// Apply middleware
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware(),
});

// Subscribe to localStorage
store.subscribe(() => {
  saveStateToLocal({
    notification: store.getState().notification,
    scoreboard: store.getState().scoreboard,
  });
});

export default store;
