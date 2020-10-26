import { connect } from "react-redux";

// Component
import Stopwatch from "Components/Scoreboard/Header/Stopwatch";

// Store
import { AppState } from "Store/index";
import { isRunningSelector, elaspedTimeSelector } from "Store/selectors";
import { tick, toggle, reset } from "Store/scoreboard/stopwatch/actions";

interface StopwatchStateProps {
  isRunning: boolean;
  elapsedTime: number;
}

export interface StopwatchProps extends StopwatchStateProps {
  tick: typeof tick;
  toggle: typeof toggle;
  reset: typeof reset;
}

const mapStateToProps = (state: AppState): StopwatchStateProps => ({
  isRunning: isRunningSelector(state),
  elapsedTime: elaspedTimeSelector(state),
});

const actionCreators = {
  tick,
  toggle,
  reset,
};

export default connect(mapStateToProps, actionCreators)(Stopwatch);
