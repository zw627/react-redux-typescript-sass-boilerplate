import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "Store/index";
import toggleBodyClass from "Utils/toggleBodyClass";
import { isLightModeSelector } from "Utils/selectors";

const ThemeSwitch: React.FC<{}> = () => {
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
    <button className="mode-switch" onClick={toggle}>
      {isLightMode ? "Light" : "Dark"}
    </button>
  );
};

export default React.memo(ThemeSwitch);
