// localStorage functions for Redux store

import { AppState } from "Store/index";

export function checkLocalStorage(): boolean {
  const test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export function loadStateFromLocal(): Record<string, unknown> | undefined {
  try {
    const serializedState = localStorage.getItem("boilerplate-demo");
    const stateVersion = localStorage.getItem("boilerplate-demo-version");
    // return undefined if no state or the state is legacy
    if (serializedState === null || stateVersion !== "0.1") {
      localStorage.clear();
      return undefined;
    }
    // Add `as Record<string, unknown>` to avoid ESLint from complaining
    return JSON.parse(serializedState) as Record<string, unknown>;
  } catch (err) {
    return undefined;
  }
}

export function saveStateToLocal(state: AppState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("boilerplate-demo", serializedState);
    localStorage.setItem("boilerplate-demo-version", "0.1");
  } catch (err) {
    return undefined;
  }
}
