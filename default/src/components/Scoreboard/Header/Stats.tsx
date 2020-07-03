import React from "react";
import { useSelector } from "react-redux";

import { AppState } from "Store/index";
import { scoreCountSelector, playerCountSelector } from "Utils/selectors";

const Stats: React.FC<{}> = () => {
  // State (redux)
  const scoreCount = useSelector((state: AppState) =>
    scoreCountSelector(state)
  );
  const playerCount = useSelector((state: AppState) =>
    playerCountSelector(state)
  );

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
