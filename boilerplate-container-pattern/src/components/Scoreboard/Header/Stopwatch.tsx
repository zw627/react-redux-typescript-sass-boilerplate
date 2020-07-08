import React, { useEffect } from "react";

import { StopwatchProps } from "Containers/Scoreboard/Header/Stopwatch";
import formatTime from "Utils/formatTime";

const Stopwatch: React.FC<StopwatchProps> = ({
  isRunning,
  elapsedTime,
  tick,
  toggle,
  reset,
}: StopwatchProps) => {
  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning) intervalId = window.setInterval(() => tick(Date.now()), 1);
    else clearInterval(intervalId);
    return (): void => clearInterval(intervalId);
  });

  // Handlers
  function handleToggle(): void {
    toggle(Date.now());
  }
  function hanldeReset(): void {
    reset(Date.now());
  }

  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <div className="stopwatch-time">{formatTime(elapsedTime)}</div>
      <button onClick={handleToggle}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={hanldeReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
