import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";
import mockdate from "mockdate";

import Counter from "Components/Scoreboard/PlayerList/Player/Counter";
import { setupStore } from "Utils/testUtils";

mockdate.set(1576071902);
const fakeDate = "1/19/1970";

function setupWrapper(
  mockStore = setupStore(),
  props = { index: 0 }
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Counter {...props} />
    </Provider>
  );
}

describe("Scoreboard/Counter", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup store and wrapper, mock dispatch
  beforeEach(() => {
    mockStore = setupStore();
    mockStore.dispatch = jest.fn();
    wrapper = setupWrapper(mockStore);
  });

  // test("compare to the last snapshot", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it("should display score", () => {
    // The player at index 0 from setupStore() has a score of 10
    expect(wrapper.find("div.counter-score").at(0).text()).toEqual("10");
  });

  it("should handle updatePlayerScore() dispatch", () => {
    wrapper.find("button.counter-action.increment").simulate("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: "player/update",
      payload: {
        id: "1654A",
        delta: 1,
        date: fakeDate,
      },
    });
    wrapper.find("button.counter-action.decrement").simulate("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: "player/update",
      payload: {
        id: "1654A",
        delta: -1,
        date: fakeDate,
      },
    });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
  });
});
