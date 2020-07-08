import React from "react";

import Stats from "./Stats";
import Stopwatch from "./Stopwatch";

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
