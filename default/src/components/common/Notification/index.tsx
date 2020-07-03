import React from "react";

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
    iconElement = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 152.5 152.5"
        fill="#ffc657"
        id="circle-exclamation"
      >
        <path d="M76.249.0038a76.25,76.25,0,1,0,76.25,76.25A76.3356,76.3356,0,0,0,76.249.0038Zm0,135.5a59.25,59.25,0,1,1,59.25-59.25A59.3178,59.3178,0,0,1,76.249,135.5038Z" />
        <rect x="67.749" y="103.4638" width="17" height="18.8" />
        <rect x="67.749" y="30.2338" width="17" height="67.05" />
      </svg>
    );
  } else if (icon === "tick") {
    iconElement = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 152.5 152.5"
        fill="#66bb6a"
        id="circle-tick"
      >
        <path d="M76.25,0A76.25,76.25,0,1,0,152.5,76.25,76.3292,76.3292,0,0,0,76.25,0Zm0,135.5A59.25,59.25,0,1,1,135.5,76.25,59.3178,59.3178,0,0,1,76.25,135.5Z" />
        <polygon points="116.96 56.65 65.75 107.86 35.54 77.65 47.56 65.63 65.75 83.82 104.93 44.63 116.96 56.65" />
      </svg>
    );
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
