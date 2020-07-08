import React from "react";

import Counter from "Containers/Scoreboard/PlayerList/Player/Counter";
import Crown from "Containers/Scoreboard/PlayerList/Player/Crown";
import { PlayerProps } from "Containers/Scoreboard/PlayerList/Player";

const Player: React.FC<PlayerProps> = ({
  index,
  id,
  name,
  isSelected,
  remove,
  select,
}: PlayerProps) => {
  // Handlers
  function handlePlayerRemove(): void {
    remove(id);
  }
  function handlePlayerSelect(): void {
    select(id);
  }

  // JSX elements
  const playerRemoveAnchor = (
    <a
      className={
        isSelected ? "remove-player remove-player-selected" : "remove-player"
      }
      onClick={handlePlayerRemove}
    >
      ✕
    </a>
  );
  const playerNameDiv = (
    <div className="player-name">
      {playerRemoveAnchor}
      <Crown index={index} />
      <span onClick={handlePlayerSelect}>{name}</span>
    </div>
  );

  return (
    <div className={isSelected ? "player player-selected" : "player"}>
      {playerNameDiv}
      <Counter index={index} />
    </div>
  );
};

export default Player;
