import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";
import mockdate from "mockdate";

import { tick, toggle, reset } from "Store/scoreboard/stopwatch/actions";
import Stopwatch from "Components/Scoreboard/Header/Stopwatch";
import { StopwatchProps } from "Containers/Scoreboard/Header/Stopwatch";
import { setupStore } from "Utils/testUtils";
import { isRunningSelector, elaspedTimeSelector } from "Utils/selectors";

jest.mock("Store/scoreboard/stopwatch/actions");
jest.useFakeTimers();
mockdate.set(1574086940640);

// Pass down the props from mock store to wrapper
function setupProps(state = setupStore().getState()): StopwatchProps {
  return {
    isRunning: isRunningSelector(state),
    elapsedTime: elaspedTimeSelector(state),
    tick,
    toggle,
    reset,
  };
}

function setupWrapper(
  mockStore = setupStore(),
  props = setupProps(mockStore.getState())
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Stopwatch {...props} />
    </Provider>
  );
}

describe("Scoreboard/Stopwatch", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  // test("compare to the last snapshot", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('should display time in "m:s.ms" format', () => {
    expect(wrapper.find("div.stopwatch-time").length).toEqual(1);
    expect(wrapper.find("div.stopwatch-time").at(0).text()).toEqual("00:00.00");
  });

  it("should handle tick() dispatch", () => {
    mockStore = setupStore({ isRunning: true });
    wrapper = setupWrapper(mockStore);
    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    expect(tick).toHaveBeenCalledWith(Date.now());
    expect(tick).toHaveBeenCalledTimes(3000);
  });

  it("should handle toggle() dispatch", () => {
    wrapper.find("button").at(0).simulate("click");
    expect(toggle).toHaveBeenCalledWith(Date.now());
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  it("should handle reset() dispatch", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(reset).toHaveBeenCalledWith(Date.now());
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("should clear interval on unmount", () => {
    wrapper.unmount();
    // clearInterval is also called if stopwatch stops running, thus 2
    expect(clearInterval).toHaveBeenCalledTimes(2);
  });
});
