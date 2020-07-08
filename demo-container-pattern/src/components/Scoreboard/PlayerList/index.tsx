import React from "react";

import Player from "Containers/Scoreboard/PlayerList/Player";
import { PlayerListProps } from "Containers/Scoreboard/PlayerList";

const PlayerList: React.FC<PlayerListProps> = ({
  playerList,
}: PlayerListProps) => {
  // JSX elements
  const playerDivs = playerList.map((player, index) => {
    return <Player key={player.id} index={index} />;
  });

  return <div className="players">{playerDivs}</div>;
};

export default PlayerList;
