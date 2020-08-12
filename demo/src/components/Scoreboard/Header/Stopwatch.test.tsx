import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";
import mockdate from "mockdate";

import Stopwatch from "Components/Scoreboard/Header/Stopwatch";
import { setupStore } from "Utils/testUtils";

jest.useFakeTimers();
mockdate.set(1574086940640);

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Stopwatch {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/Stopwatch", () => {
  let wrapper: ReactWrapper;
  let mockStore: Store;

  // Setup store and wrapper, mock dispatch
  beforeEach(() => {
    mockStore = setupStore();
    mockStore.dispatch = jest.fn();
    wrapper = setupWrapper(mockStore, {});
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(Stopwatch)).toMatchSnapshot();
  });

  it('should display time in "m:s.ms" format', () => {
    expect(wrapper.find("div.stopwatch-time").length).toEqual(1);
    expect(wrapper.find("div.stopwatch-time").at(0).text()).toEqual("00:00.00");
  });

  it("should handle tick() dispatch", () => {
    const mockStore = setupStore({ isRunning: true });
    mockStore.dispatch = jest.fn();
    wrapper = setupWrapper(mockStore, {});
    const action = {
      type: "stopwatch/tick",
      payload: {
        date: Date.now(),
      },
    };
    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(3000);
  });

  it("should handle toggle() dispatch", () => {
    const action = {
      type: "stopwatch/toggle",
      payload: {
        date: Date.now(),
      },
    };
    wrapper.find("button").at(0).simulate("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it("should handle reset() dispatch", () => {
    const action = {
      type: "stopwatch/reset",
      payload: {
        date: Date.now(),
      },
    };
    wrapper.find("button").at(1).simulate("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it("should clear interval on unmount", () => {
    wrapper.unmount();
    // clearInterval is also called if stopwatch stops running, thus 2
    expect(clearInterval).toHaveBeenCalledTimes(2);
  });
});
