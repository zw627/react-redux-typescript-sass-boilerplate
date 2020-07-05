import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import Scoreboard from "Components/Scoreboard/index";
import { setupStore } from "Utils/testUtils";
import watchForHover from "Utils/watchForHover";

jest.mock("Utils/watchForHover");

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Scoreboard {...props} />
    </Provider>
  );
}

describe("Scoreboard", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call watchForHover()", () => {
    expect(watchForHover).toHaveBeenCalledTimes(1);
  });
});
