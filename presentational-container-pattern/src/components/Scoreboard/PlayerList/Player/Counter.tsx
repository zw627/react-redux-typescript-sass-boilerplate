import React from "react";

import getCurrentDate from "Utils/getCurrentDate";
import { CounterProps } from "Containers/Scoreboard/PlayerList/Player/Counter";

const Counter: React.FC<CounterProps> = ({
  id,
  score,
  update,
}: CounterProps) => {
  // Handlers
  function handleScoreIncrement(): void {
    update(id, 1, getCurrentDate());
  }
  function handleScoreDecrement(): void {
    update(id, -1, getCurrentDate());
  }

  // JSX elemetns
  const decrementButton = (
    <button className="counter-action decrement" onClick={handleScoreDecrement}>
      -
    </button>
  );
  const incrementButton = (
    <button className="counter-action increment" onClick={handleScoreIncrement}>
      +
    </button>
  );

  return (
    <div className="counter">
      {decrementButton}
      <div className="counter-score">{score}</div>
      {incrementButton}
    </div>
  );
};

export default Counter;
