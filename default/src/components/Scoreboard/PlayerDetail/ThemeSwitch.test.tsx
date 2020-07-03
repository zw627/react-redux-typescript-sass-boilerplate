import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import ThemeSwitch from "Components/Scoreboard/PlayerDetail/ThemeSwitch";
import { setupStore } from "Utils/testUtils";

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <ThemeSwitch {...props} />
    </Provider>
  );
}

describe("Scoreboard/ThemeSwitch", () => {
  let wrapper: ReactWrapper;
  let mockStore: Store;

  // Setup store and wrapper, mock dispatch
  beforeEach(() => {
    mockStore = setupStore();
    mockStore.dispatch = jest.fn();
    wrapper = setupWrapper(mockStore);
  });

  // test("compare to the last snapshot", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('should display "Dark" by default', () => {
    expect(wrapper.find("button").at(0).text()).toEqual("Dark");
  });

  it('should display "Light" if light theme', () => {
    mockStore = setupStore({ isLightMode: true });
    wrapper = setupWrapper(mockStore);
    expect(wrapper.find("button").at(0).text()).toEqual("Light");
  });

  it("should handle switchTheme() dispatch", () => {
    wrapper.find("button").simulate("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: "theme/toggle",
    });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
