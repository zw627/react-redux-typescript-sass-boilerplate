import { connect } from "react-redux";

// Component
import ThemeSwitch from "Components/Scoreboard/PlayerDetail/ThemeSwitch";

// Store
import { AppState } from "Store/index";
import { isLightModeSelector } from "Utils/selectors";
import { toggle, ThemeState } from "Store/scoreboard/theme/actions";

export interface ThemeSwitchProps extends ThemeState {
  toggle: typeof toggle;
}

const mapStateToProps = (state: AppState): ThemeState => ({
  isLightMode: isLightModeSelector(state),
});

const actionCreators = {
  toggle,
};

export default connect(mapStateToProps, actionCreators)(ThemeSwitch);
