import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import Header from "Components/Scoreboard/Header/";
import { setupStore } from "Utils/testUtils";

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Header {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/Header", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(Header)).toMatchSnapshot();
  });
});
