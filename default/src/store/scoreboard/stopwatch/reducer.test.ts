import { AnyAction } from "redux";
import mockdate from "mockdate";

import stopwatchReducer, {
  initializeState,
  initialState,
} from "Store/scoreboard/stopwatch/reducer";
import { StopwatchActions } from "Store/scoreboard/stopwatch/actions";

mockdate.set(1574086940640);

describe("scoreboard/stopwatch reducers", () => {
  const handleStopwatchTest = (
    action: AnyAction,
    [isRunning, previousTime, elapsedTime]: [boolean, number, number],
    [isRunningNew, previousTimeNew, elapsedTimeNew]: [boolean, number, number]
  ): void => {
    const oldState = initializeState(isRunning, previousTime, elapsedTime);
    const newState = initializeState(
      isRunningNew,
      previousTimeNew,
      elapsedTimeNew
    );
    expect(stopwatchReducer(oldState, action)).toEqual(newState);
  };

  it("should return the initial state", () => {
    expect(stopwatchReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle stopwatch/tick", () => {
    const action: StopwatchActions = {
      type: "stopwatch/tick",
      payload: { date: Date.now() },
    };
    // Running
    handleStopwatchTest(action, [true, 0, 0], [true, Date.now(), Date.now()]);
    // Not running
    handleStopwatchTest(action, [false, 0, 0], [false, 0, 0]);
  });

  it("should handle stopwatch/toggle", () => {
    const action: StopwatchActions = {
      type: "stopwatch/toggle",
      payload: { date: Date.now() },
    };
    // Start
    handleStopwatchTest(action, [false, 0, 0], [true, Date.now(), 0]);
    // Stop
    handleStopwatchTest(action, [true, 0, 0], [false, 0, 0]);
  });

  it("should handle stopwatch/reset", () => {
    const action: StopwatchActions = {
      type: "stopwatch/reset",
      payload: { date: Date.now() },
    };
    // Running
    handleStopwatchTest(action, [true, 0, Date.now()], [true, Date.now(), 0]);
    // Not running
    handleStopwatchTest(action, [false, 0, Date.now()], [false, Date.now(), 0]);
  });
});
