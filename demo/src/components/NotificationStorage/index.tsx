import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Notification from "Components/common/Notification";
import { AppState } from "Store/index";
import { notiStorageVisibilitySelector } from "Store/selectors";
import { checkLocalStorage } from "Utils/localStorage";

const NotificationStorage: React.FC = () => {
  // State (local)
  const [slideOut, setSlideOut] = useState(false);

  // State (redux)
  const visibility = useSelector((state: AppState) =>
    notiStorageVisibilitySelector(state)
  );

  // Actions (redux)
  const dispatch = useDispatch();
  const setVisibility = useCallback(
    (visibility: AppState["notification"]["storage"]["visibility"]) => {
      dispatch({
        type: "notificationStorage/set",
        payload: { visibility },
      });
    },
    [dispatch]
  );

  const slideOutTimer = useRef(0);
  const unmountTimer = useRef(0);

  function clearTimers(): void {
    clearTimeout(slideOutTimer.current);
    clearTimeout(unmountTimer.current);
  }

  useEffect(() => {
    if (visibility) {
      // Start the slide out animation after 6s
      slideOutTimer.current = window.setTimeout(() => {
        setSlideOut(true);
      }, 6000);
      // After the animation (600) is finished, unmount this component
      unmountTimer.current = window.setTimeout(() => {
        setVisibility(false);
      }, 6600);
    }
    return (): void => {
      clearTimers();
    };
  }, [setVisibility, visibility]);

  function handleNotificationClose(): void {
    // Execute slide-out animation and clear previous timers
    setSlideOut(true);
    clearTimers();
    // After animation is finished, unmount this component
    setTimeout(() => {
      setVisibility(false);
    }, 600);
  }

  // JSX elements
  const icon = checkLocalStorage() ? "tick" : "exclamation";
  const text = checkLocalStorage()
    ? "Local storage supported. All data will be stored locally in your browser."
    : "Local storage disabled or not supported. All data will be lost on page refresh.";
  const notificationElement = (
    <Notification
      icon={icon}
      text={text}
      slideOut={slideOut}
      onClick={handleNotificationClose}
    />
  );

  return visibility ? notificationElement : null;
};

export default NotificationStorage;
