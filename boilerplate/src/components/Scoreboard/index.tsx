import React from "react";

import Header from "./Header";
import PlayerList from "./PlayerList";
import AddPlayerForm from "./AddPlayerForm";
import PlayerDetail from "./PlayerDetail";

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
