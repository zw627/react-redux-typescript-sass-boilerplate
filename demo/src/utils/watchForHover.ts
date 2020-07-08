// Add or remove "hover-enabled" class to <body> tag based on "touchstart" and "mousemove"

export function enableHover(
  element: HTMLElement,
  hasHoverClass: boolean,
  lastTouchTime: number
): boolean {
  // If (touch and hold) does not exceed 10s, do not enable hover
  // Also means 10s timeout if switching from mobile emulator to desktop emulator
  if (new Date().getTime() - lastTouchTime < 10000) return false;
  else if (hasHoverClass) return true;
  element.classList.add("hover-enabled");
  return true;
}

export function disableHover(
  element: HTMLElement,
  hasHoverClass: boolean
): boolean {
  if (!hasHoverClass) return false;
  element.classList.remove("hover-enabled");
  return false;
}

export function updateLastTouchTime(): number {
  return new Date().getTime();
}

export default function watchForHover(): void {
  const element: HTMLElement = document.body;
  let hasHoverClass = false;
  let lastTouchTime = 0;

  document.addEventListener(
    "touchstart",
    () => {
      lastTouchTime = updateLastTouchTime();
    },
    true
  );
  document.addEventListener(
    "touchstart",
    () => {
      hasHoverClass = disableHover(element, hasHoverClass);
    },
    true
  );
  document.addEventListener(
    "mousemove",
    () => {
      hasHoverClass = enableHover(element, hasHoverClass, lastTouchTime);
    },
    true
  );
}
