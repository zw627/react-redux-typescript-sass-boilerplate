import produce from "immer";

import { ThemeState, ThemeActions } from "./actions";

export const initializeState = (isLightMode: boolean): ThemeState => ({
  isLightMode,
});

export const initialState = initializeState(false);

const themeReducer = (
  state = initialState,
  action: ThemeActions
): ThemeState => {
  switch (action.type) {
    case "theme/toggle": {
      return produce(state, (draft) => {
        draft.isLightMode = !draft.isLightMode;
        return draft;
      });
    }

    default: {
      return state;
    }
  }
};

export default themeReducer;
