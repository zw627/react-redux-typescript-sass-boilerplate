import produce from "immer";

import {
  NotificationStorageState,
  NotificationStorageActions,
} from "./actions";

export const initializeState = (
  visibility: boolean
): NotificationStorageState => ({
  visibility,
});

export const initialState = initializeState(true);

const notificationStorageReducer = (
  state = initialState,
  action: NotificationStorageActions
): NotificationStorageState => {
  switch (action.type) {
    case "notificationStorage/set": {
      const { visibility } = action.payload;
      return produce(state, (draft) => {
        draft.visibility = visibility;
        return draft;
      });
    }

    default: {
      return state;
    }
  }
};

export default notificationStorageReducer;
