import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import { toggle } from "Store/scoreboard/theme/actions";
import ThemeSwitch from "Components/Scoreboard/PlayerDetail/ThemeSwitch";
import { ThemeSwitchProps } from "Containers/Scoreboard/PlayerDetail/ThemeSwitch";
import { setupStore } from "Utils/testUtils";
import { isLightModeSelector } from "Utils/selectors";

jest.mock("Store/scoreboard/theme/actions");

// Pass down the props from mock store to wrapper
function setupProps(state = setupStore().getState()): ThemeSwitchProps {
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
  );
}

describe("Scoreboard/ThemeSwitch", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
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
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
