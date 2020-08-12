import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import mockdate from "mockdate";

import { update } from "Store/scoreboard/player/actions";
import Counter from "Components/Scoreboard/PlayerList/Player/Counter";
import { setupStore } from "Utils/testUtils";
import { playerListSelector } from "Store/selectors";

import { AppState } from "Store/index";
import { CounterProps } from "Containers/Scoreboard/PlayerList/Player/Counter";

jest.mock("Store/scoreboard/player/actions");
mockdate.set(1576071902);
const fakeDate = "1/19/1970";

// Pass down the props from mock store to wrapper
function setupProps(state = setupStore().getState() as AppState): CounterProps {
  const { id, score } = playerListSelector(state)[0];
  return { id, score, update };
}

function setupWrapper(
  mockStore = setupStore(),
  props = setupProps(mockStore.getState())
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Counter {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/Counter", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(Counter)).toMatchSnapshot();
  });

  it("should display score", () => {
    // The player at index 0 from setupStore() has a score of 10
    expect(wrapper.find("div.counter-score").at(0).text()).toEqual("10");
  });

  it("should handle updatePlayerScore() dispatch", () => {
    wrapper.find("button.counter-action.increment").simulate("click");
    expect(update).toHaveBeenCalledWith("1654A", 1, fakeDate);
    wrapper.find("button.counter-action.decrement").simulate("click");
    expect(update).toHaveBeenCalledWith("1654A", -1, fakeDate);
    expect(update).toHaveBeenCalledTimes(2);
  });
});
