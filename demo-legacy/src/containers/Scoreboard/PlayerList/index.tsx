import { connect } from "react-redux";

// Component
import PlayerList from "Components/Scoreboard/PlayerList";

// Store
import { AppState } from "Store/index";
import { PlayerState } from "Store/scoreboard/player/actions";
import { playerListSelector } from "Store/selectors";

export type PlayerListProps = PlayerState;

const mapStateToProps = (state: AppState): PlayerState => ({
  playerList: playerListSelector(state),
});

export default connect(mapStateToProps)(PlayerList);
