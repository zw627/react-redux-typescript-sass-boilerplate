import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "Store/index";
import getCurrentDate from "Utils/getCurrentDate";
import { playerListSelector } from "Store/selectors";

interface CounterProps {
  index: number;
}

const Counter: React.FC<CounterProps> = ({ index }: CounterProps) => {
  // State (redux)
  const id = useSelector(
    (state: AppState) => playerListSelector(state)[index].id
  );
  const score = useSelector(
    (state: AppState) => playerListSelector(state)[index].score
  );

  // Actions (redux)
  const dispatch = useDispatch();
  const updatePlayerScore = useCallback(
    (id: string, delta: number, date: string) =>
      dispatch({ type: "player/update", payload: { id, delta, date } }),
    [dispatch]
  );

  // Handlers
  function handleScoreIncrement(): void {
    updatePlayerScore(id, 1, getCurrentDate());
  }
  function handleScoreDecrement(): void {
    updatePlayerScore(id, -1, getCurrentDate());
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

export default React.memo(Counter);
