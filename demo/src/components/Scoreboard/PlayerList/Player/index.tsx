import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "Store/index";
import Counter from "./Counter";
import Crown from "./Crown";
import { playerListSelector } from "Store/selectors";

interface PlayerProps {
  index: number;
}

const Player: React.FC<PlayerProps> = ({ index }: PlayerProps) => {
  // State (redux)
  const id = useSelector(
    (state: AppState) => playerListSelector(state)[index].id
  );
  const name = useSelector(
    (state: AppState) => playerListSelector(state)[index].name
  );
  const isSelected = useSelector(
    (state: AppState) => playerListSelector(state)[index].isSelected
  );

  // Actions (redux)
  const dispatch = useDispatch();
  const removePlayer = useCallback(
    (id: string) => dispatch({ type: "player/remove", payload: { id } }),
    [dispatch]
  );
  const selectPlayer = useCallback(
    (id: string) => dispatch({ type: "player/select", payload: { id } }),
    [dispatch]
  );

  // Handlers
  function handlePlayerRemove(): void {
    removePlayer(id);
  }
  function handlePlayerSelect(): void {
    selectPlayer(id);
  }

  // JSX elements
  const playerRemoveDiv = (
    <div
      className={
        isSelected ? "remove-player remove-player-selected" : "remove-player"
      }
      onClick={handlePlayerRemove}
    >
      ✕
    </div>
  );
  const playerNameDiv = (
    <div className="player-name" onClick={handlePlayerSelect}>
      <Crown index={index} />
      <span>{name}</span>
    </div>
  );

  return (
    <div className={isSelected ? "player player-selected" : "player"}>
      {playerRemoveDiv}
      {playerNameDiv}
      <Counter index={index} />
    </div>
  );
};

export default React.memo(Player);
