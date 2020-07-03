import React from "react";

import { ThemeSwitchProps } from "Containers/Scoreboard/PlayerDetail/ThemeSwitch";
import toggleBodyClass from "Utils/toggleBodyClass";

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  isLightMode,
  toggle,
}: ThemeSwitchProps) => {
  // Theme is switched before mounted, thus no useEffect()
  toggleBodyClass(isLightMode);

  return (
    <button className="mode-switch" onClick={toggle}>
      {isLightMode ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeSwitch;
