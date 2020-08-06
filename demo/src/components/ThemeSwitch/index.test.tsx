import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import ThemeSwitch from "Components/ThemeSwitch";
import { setupStore } from "Utils/testUtils";

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <ThemeSwitch {...props} />
    </Provider>
  ) as ReactWrapper;
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

  test("compare to the last snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display the slider on the left side if light mode", () => {
    mockStore = setupStore({ isLightMode: true });
    wrapper = setupWrapper(mockStore);
    expect(wrapper.find(".theme-switch-slider.left").length).toEqual(1);
  });

  it("should display the slider on the right side if dark mode", () => {
    expect(wrapper.find(".theme-switch-slider.right").length).toEqual(1);
  });

  it("should handle switchTheme() dispatch", () => {
    wrapper.find("button").simulate("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: "theme/toggle",
    });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
