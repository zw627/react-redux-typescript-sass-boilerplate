import React from "react";
import { useSelector } from "react-redux";

import { AppState } from "Store/index";
import Player from "./Player";
import { playerListSelector } from "Utils/selectors";

const PlayerList: React.FC<{}> = () => {
  // State (redux)
  const playerList = useSelector((state: AppState) =>
    playerListSelector(state)
  );

  // JSX elements
  const playerDivs = playerList.map((player, index) => {
    return <Player key={player.id} index={index} />;
  });

  return <div className="players">{playerDivs}</div>;
};

export default PlayerList;
