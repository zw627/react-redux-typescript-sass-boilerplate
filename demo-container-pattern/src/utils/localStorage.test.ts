import "jest-localstorage-mock";

import { loadStateFromLocal, saveStateToLocal } from "Utils/localStorage";
import store, { AppState } from "Store/index";

describe("store/localStorage", () => {
  let state: AppState;
  let stringifiedState: string;

  beforeEach(() => {
    localStorage.clear();
    state = {
      notification: store.getState().notification,
      scoreboard: store.getState().scoreboard,
      theme: store.getState().theme,
    };
    stringifiedState = JSON.stringify(state);
  });

  it("should get undefined from localStorage by default", () => {
    loadStateFromLocal();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(loadStateFromLocal()).toEqual(undefined);
  });

  it("should save to localStorage", () => {
    saveStateToLocal(state);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "boilerplate-demo-container",
      stringifiedState
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(localStorage.__STORE__["boilerplate-demo-container"]).toEqual(
      stringifiedState
    );

    expect(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      localStorage.__STORE__["boilerplate-demo-container-version"]
    ).toEqual("0.1");
    expect(Object.keys(localStorage.__STORE__).length).toEqual(2);
  });

  it("should get from localStorage", () => {
    saveStateToLocal(state);
    loadStateFromLocal();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(loadStateFromLocal()).toEqual(state);
  });

  it("should clear localStorage if version does not match", () => {
    localStorage.setItem("boilerplate-demo-container", stringifiedState);
    localStorage.setItem("boilerplate-demo-container-version", "0.0.1");
    loadStateFromLocal();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.clear).toHaveBeenCalledTimes(2);
    expect(loadStateFromLocal()).toEqual(undefined);
  });
});
