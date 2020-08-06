import { createSlice } from "@reduxjs/toolkit";

import { ThemeState } from "./types";

export const initializeState = (isLightMode: boolean): ThemeState => ({
  isLightMode,
});

export const initialState = initializeState(true);

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle(state): void {
      state.isLightMode = !state.isLightMode;
    },
  },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
