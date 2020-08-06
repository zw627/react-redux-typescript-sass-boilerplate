import React from "react";

import { ThemeSwitchProps } from "Containers/ThemeSwitch";
import toggleBodyClass from "Utils/toggleBodyClass";

import sunIconPath from "Assets/sun.svg";
import moonIconPath from "Assets/moon.svg";

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  isLightMode,
  toggle,
}: ThemeSwitchProps) => {
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

export default ThemeSwitch;
