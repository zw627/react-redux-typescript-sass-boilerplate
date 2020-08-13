import React from "react";
import { useSelector } from "react-redux";

import { AppState } from "Store/index";
import { playerDetailSelector } from "Store/selectors";

const PlayerDetail: React.FC = () => {
  // State (redux)
  const player = useSelector((state: AppState) => playerDetailSelector(state));

  // JSX elements
  let playerDetailElements = <p>*Click on a player to see more details.</p>;
  if (player) {
    playerDetailElements = (
      <React.Fragment>
        <h3>{player.name}</h3>
        <table>
          <tbody>
            <tr>
              <td>Score:</td>
              <td>{player.score}</td>
            </tr>
            <tr>
              <td>Created:</td>
              <td>{player.created}</td>
            </tr>
            <tr>
              <td>Updated:</td>
              <td>{player.updated}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  return <div className="player-detail">{playerDetailElements}</div>;
};

export default PlayerDetail;
