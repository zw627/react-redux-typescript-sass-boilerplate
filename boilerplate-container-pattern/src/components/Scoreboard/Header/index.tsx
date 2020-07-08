import React from "react";

import Stats from "Containers/Scoreboard/Header/Stats";
import Stopwatch from "Containers/Scoreboard/Header/Stopwatch";

const Header: React.FC = () => {
  return (
    <div className="header">
      <Stats />
      <h1>Scoreboard</h1>
      <Stopwatch />
    </div>
  );
};

export default Header;
