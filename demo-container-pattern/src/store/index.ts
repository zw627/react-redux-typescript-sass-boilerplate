import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import immutableCheck from "redux-immutable-state-invariant";

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
const persistedState = loadStateFromLocal();

// Middleware redux-immutable-state-invariant should be used only in development
const middleware =
  process.env.NODE_ENV === "production" ? [] : [immutableCheck()];

// Register reducers with Redux and create a store
// Load state
// Apply middleware
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Subscribe to localStorage
store.subscribe(() => {
  saveStateToLocal({
    notification: store.getState().notification,
    scoreboard: store.getState().scoreboard,
  });
});

export default store;
