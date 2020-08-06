import { connect } from "react-redux";

// Component
import Counter from "Components/Scoreboard/PlayerList/Player/Counter";

// Store
import { AppState } from "Store/index";
import { update } from "Store/scoreboard/player/actions";
import { playerListSelector } from "Store/selectors";

interface CounterStateProps {
  id: string;
  score: number;
}

export interface CounterProps extends CounterStateProps {
  update: typeof update;
}

const mapStateToProps = (
  state: AppState,
  ownProps: { index: number }
): CounterStateProps => {
  const { index } = ownProps;
  const { id, score } = playerListSelector(state)[index];
  return { id, score };
};

const actionCreators = { update };

export default connect(mapStateToProps, actionCreators)(Counter);
