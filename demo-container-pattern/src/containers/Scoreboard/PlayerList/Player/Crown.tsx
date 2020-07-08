import { connect } from "react-redux";

// Component
import Crown from "Components/Scoreboard/PlayerList/Player/Crown";

// Store
import { AppState } from "Store/index";
import { scoreListSelector, playerListSelector } from "Utils/selectors";

export interface CrownProps {
  hasCrown: boolean;
}

const mapStateToProps = (
  state: AppState,
  ownProps: { index: number }
): CrownProps => {
  const { index } = ownProps;
  const score = playerListSelector(state)[index].score;
  const scoreList = scoreListSelector(state);
  return {
    hasCrown: score >= Math.max(...scoreList) && score > 0,
  };
};

export default connect(mapStateToProps)(Crown);
