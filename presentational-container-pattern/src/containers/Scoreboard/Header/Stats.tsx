import { connect } from "react-redux";

// Component
import Stats from "Components/Scoreboard/Header/Stats";

// Store
import { playerCountSelector, scoreCountSelector } from "Utils/selectors";
import { AppState } from "Store/index";

export interface StatsProps {
  playerCount: number;
  scoreCount: number;
}

const mapStateToProps = (state: AppState): StatsProps => ({
  playerCount: playerCountSelector(state),
  scoreCount: scoreCountSelector(state),
});

export default connect(mapStateToProps)(Stats);
