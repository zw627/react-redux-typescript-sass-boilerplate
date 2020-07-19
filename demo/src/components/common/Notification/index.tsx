import React from "react";

import tickIcon from "Assets/tick.svg";
import exclamationIcon from "Assets/exclamation.svg";

type propTypes = {
  icon: string;
  text: string;
  slideOut: boolean;
  onClick?: () => void;
};

const Notification: React.FC<propTypes> = ({
  icon,
  text,
  slideOut,
  onClick,
}: propTypes) => {
  // JSX elements
  let iconElement = <span></span>;
  if (icon === "exclamation") {
    iconElement = <img className="circle-exclamation" src={exclamationIcon} />;
  } else if (icon === "tick") {
    iconElement = <img className="circle-tick" src={tickIcon} />;
  }

  return (
    <div
      className={slideOut ? "notification slide-out" : "notification slide-in"}
      onClick={onClick}
    >
      {iconElement}
      <span>{text}</span>
    </div>
  );
};

export default Notification;
