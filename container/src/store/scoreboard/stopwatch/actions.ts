// ------------------------------------------------------ //
// Actions

export const TICK = "stopwatch/tick";
export const TOGGLE = "stopwatch/toggle";
export const RESET = "stopwatch/reset";

// ------------------------------------------------------ //
// Action Creators

export const tick = (date: number): StopwatchActions => ({
  type: "stopwatch/tick",
  payload: {
    date,
  },
});

export const toggle = (date: number): StopwatchActions => ({
  type: "stopwatch/toggle",
  payload: {
    date,
  },
});

export const reset = (date: number): StopwatchActions => ({
  type: "stopwatch/reset",
  payload: {
    date,
  },
});

// ------------------------------------------------------ //
// Types - action

interface Tick {
  type: typeof TICK;
  payload: {
    date: number;
  };
}

interface Toggle {
  type: typeof TOGGLE;
  payload: {
    date: number;
  };
}

interface Reset {
  type: typeof RESET;
  payload: {
    date: number;
  };
}

export type StopwatchActions = Tick | Toggle | Reset | { type: undefined };

// ------------------------------------------------------ //
// Types - state

export interface StopwatchState {
  isRunning: boolean;
  previousTime: number;
  elapsedTime: number;
}
