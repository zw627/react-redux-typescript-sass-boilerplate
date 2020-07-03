import produce from "immer";

import { StopwatchState, StopwatchActions } from "./actions";

export const initializeState = (
  isRunning: boolean,
  previousTime: number,
  elapsedTime: number
): StopwatchState => ({
  isRunning,
  previousTime,
  elapsedTime,
});

// 3580200 default, 3594565 to test 60, 5994200 to test 100, 105994200 to test extreme
export const initialState = initializeState(false, 0, 3580200);

const stopwatchReducer = (
  state = initialState,
  action: StopwatchActions
): StopwatchState => {
  switch (action.type) {
    case "stopwatch/tick": {
      const { date } = action.payload;
      // Tick if running
      if (state.isRunning) {
        return {
          ...state,
          previousTime: date,
          elapsedTime: state.elapsedTime + (date - state.previousTime),
        };
      }
      // No action otherwise
      return state;
    }

    case "stopwatch/toggle": {
      const { date } = action.payload;
      return produce(state, (draft) => {
        // Start and stop
        if (!state.isRunning) {
          draft.isRunning = true;
          draft.previousTime = date;
        } else {
          draft.isRunning = false;
        }
        return draft;
      });
    }

    case "stopwatch/reset": {
      const { date } = action.payload;
      return produce(state, (draft) => {
        // Reset
        draft.previousTime = date;
        draft.elapsedTime = 0;
        return draft;
      });
    }

    default: {
      return state;
    }
  }
};

export default stopwatchReducer;
