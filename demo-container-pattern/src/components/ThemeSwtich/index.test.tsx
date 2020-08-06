import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import { toggle } from "Store/theme/actions";
import ThemeSwitch from "Components/ThemeSwtich";
import { setupStore } from "Utils/testUtils";
import { isLightModeSelector } from "Store/selectors";

import { AppState } from "Store/index";
import { ThemeSwitchProps } from "Containers/ThemeSwitch";

jest.mock("Store/theme/actions");

// Pass down the props from mock store to wrapper
function setupProps(
  state = setupStore().getState() as AppState
): ThemeSwitchProps {
  return {
    isLightMode: isLightModeSelector(state),
    toggle,
  };
}

function setupWrapper(
  mockStore = setupStore(),
  props = setupProps(mockStore.getState())
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <ThemeSwitch {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/ThemeSwitch", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
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
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
