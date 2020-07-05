import { connect } from "react-redux";

// Component
import PlayerDetail from "Components/Scoreboard/PlayerDetail";

// Store
import { AppState } from "Store/index";
import { playerDetailSelector } from "Utils/selectors";
import { PlayerObject } from "Store/scoreboard/player/actions";

export interface PlayerDetaiProps {
  player: PlayerObject | null;
}

const mapStateToProps = (state: AppState): PlayerDetaiProps => ({
  player: playerDetailSelector(state),
});

export default connect(mapStateToProps)(PlayerDetail);
