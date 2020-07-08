import React from "react";

import Header from "Components/Scoreboard/Header";
import PlayerList from "Containers/Scoreboard/PlayerList";
import AddPlayerForm from "Containers/Scoreboard/AddPlayerForm";
import PlayerDetail from "Containers/Scoreboard/PlayerDetail";

import watchForHover from "Utils/watchForHover";

const Scoreboard: React.FC = () => {
  watchForHover();
  return (
    <div className="scoreboard">
      <Header />
      <PlayerList />
      <AddPlayerForm />
      <PlayerDetail />
    </div>
  );
};

export default Scoreboard;
