import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NotificationStorageState, NotificationStoragePayloads } from "./types";

export const initializeState = (
  visibility: boolean
): NotificationStorageState => ({
  visibility,
});
export const initialState = initializeState(true);

export const notificationStorage = createSlice({
  name: "notificationStorage",
  initialState,
  reducers: {
    set(
      state,
      action: PayloadAction<NotificationStoragePayloads["set"]>
    ): void {
      const { visibility } = action.payload;
      state.visibility = visibility;
    },
  },
});

export const { set } = notificationStorage.actions;
export default notificationStorage.reducer;
