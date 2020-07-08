import React from "react";

import { StatsProps } from "Containers/Scoreboard/Header/Stats";

const Stats: React.FC<StatsProps> = ({
  playerCount,
  scoreCount,
}: StatsProps) => {
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{playerCount}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{scoreCount}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Stats;
