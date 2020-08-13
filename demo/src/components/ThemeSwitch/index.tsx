import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "Store/index";
import toggleBodyClass from "Utils/toggleBodyClass";
import { isLightModeSelector } from "Store/selectors";

import sunIconPath from "Assets/sun.svg";
import moonIconPath from "Assets/moon.svg";

const ThemeSwitch: React.FC = () => {
  // State (redux)
  const isLightMode = useSelector((state: AppState) =>
    isLightModeSelector(state)
  );

  // Actions (redux)
  const dispatch = useDispatch();
  const toggle = useCallback(() => dispatch({ type: "theme/toggle" }), [
    dispatch,
  ]);

  // Theme is switched before mounted, thus no useEffect()
  toggleBodyClass(isLightMode);

  return (
    <button className="theme-switch" onClick={toggle}>
      <img className="theme-switch-icon-sun" src={sunIconPath} alt="Sun" />
      <img className="theme-switch-icon-moon" src={moonIconPath} alt="Moon" />
      <span
        className={`theme-switch-slider ${isLightMode ? "left" : "right"}`}
      ></span>
    </button>
  );
};

export default React.memo(ThemeSwitch);
