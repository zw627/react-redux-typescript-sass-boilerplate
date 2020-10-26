// ------------------------------------------------------ //
// Actions

export const SET = "notificationStorage/set";

// ------------------------------------------------------ //
// Action creators

export const set = (visibility: boolean): NotificationStorageActions => ({
  type: "notificationStorage/set",
  payload: {
    visibility,
  },
});

// ------------------------------------------------------ //
// Types - action

interface Set {
  type: typeof SET;
  payload: {
    visibility: boolean;
  };
}

export type NotificationStorageActions = Set | { type: undefined };

// ------------------------------------------------------ //
// Types - state

export interface NotificationStorageState {
  visibility: boolean;
}
