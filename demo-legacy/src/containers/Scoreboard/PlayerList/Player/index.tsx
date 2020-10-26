import { connect } from "react-redux";

// Component
import Player from "Components/Scoreboard/PlayerList/Player";

// Store
import { AppState } from "Store/index";
import { playerListSelector } from "Store/selectors";
import { remove, select } from "Store/scoreboard/player/actions";

interface PlayerStateProps {
  index: number;
  id: string;
  name: string;
  isSelected: boolean;
}

export interface PlayerProps extends PlayerStateProps {
  remove: typeof remove;
  select: typeof select;
}

const mapStateToProps = (
  state: AppState,
  ownProps: { index: number }
): PlayerStateProps => {
  const { index } = ownProps;
  const { id, name, isSelected } = playerListSelector(state)[index];
  return {
    index,
    id,
    name,
    isSelected,
  };
};

const actionCreators = { remove, select };

export default connect(mapStateToProps, actionCreators)(Player);
