import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "Store/index";
import formatTime from "Utils/formatTime";
import { isRunningSelector, elaspedTimeSelector } from "Store/selectors";

const Stopwatch: React.FC = () => {
  // State (redux)
  const isRunning = useSelector((state: AppState) => isRunningSelector(state));
  const elapsedTime = useSelector((state: AppState) =>
    elaspedTimeSelector(state)
  );

  // Actions (redux)
  const dispatch = useDispatch();
  const tick = useCallback(
    () => dispatch({ type: "stopwatch/tick", payload: { date: Date.now() } }),
    [dispatch]
  );
  const toggle = useCallback(
    () => dispatch({ type: "stopwatch/toggle", payload: { date: Date.now() } }),
    [dispatch]
  );
  const reset = useCallback(
    () => dispatch({ type: "stopwatch/reset", payload: { date: Date.now() } }),
    [dispatch]
  );

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning) intervalId = window.setInterval(() => tick(), 1);
    else clearInterval(intervalId);
    return (): void => clearInterval(intervalId);
  });

  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <div className="stopwatch-time">{formatTime(elapsedTime)}</div>
      <button onClick={toggle}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
