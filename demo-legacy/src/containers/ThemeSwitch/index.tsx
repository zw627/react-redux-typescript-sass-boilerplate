import { connect } from "react-redux";

// Component
import ThemeSwitch from "Components/ThemeSwtich";

// Store
import { AppState } from "Store/index";
import { isLightModeSelector } from "Store/selectors";
import { toggle, ThemeState } from "Store/theme/actions";

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
