// Selector functions (using Reselect) for Redux

import { createSelector } from "reselect";

import { AppState } from "Store/index";

// ------------------------------------------------------ //
// Notification/Storage
const notificationStorageState = (
  state: AppState
): AppState["notification"]["storage"] => state.notification.storage;

export const notiStorageVisibilitySelector = createSelector(
  notificationStorageState,
  (notificationStorage) => notificationStorage.visibility
);

// ------------------------------------------------------ //
// Scoreboard/Player

const playerListState = (
  state: AppState
): AppState["scoreboard"]["player"]["playerList"] =>
  state.scoreboard.player.playerList;

export const playerListSelector = createSelector(
  playerListState,
  (playerList) => playerList
);

export const scoreListSelector = createSelector(playerListState, (playerList) =>
  playerList.map((player) => player.score)
);

export const scoreCountSelector = createSelector(
  playerListState,
  (playerList) => playerList.reduce((total, player) => total + player.score, 0)
);

export const playerCountSelector = createSelector(
  playerListState,
  (playerList) => playerList.length
);

export const playerDetailSelector = createSelector(
  playerListState,
  (playerList) => playerList.filter((player) => player.isSelected === true)[0]
);

// ------------------------------------------------------ //
// Scoreboard/Stopwatch

const stopwatchState = (state: AppState): AppState["scoreboard"]["stopwatch"] =>
  state.scoreboard.stopwatch;

export const isRunningSelector = createSelector(
  stopwatchState,
  (stopwatch) => stopwatch.isRunning
);

export const elaspedTimeSelector = createSelector(
  stopwatchState,
  (stopwatch) => stopwatch.elapsedTime
);

// ------------------------------------------------------ //
// Scoreboard/Theme

const themeState = (state: AppState): AppState["theme"] => state.theme;

export const isLightModeSelector = createSelector(
  themeState,
  (theme) => theme.isLightMode
);
