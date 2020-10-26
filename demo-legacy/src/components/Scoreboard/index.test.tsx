import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mount, ReactWrapper } from "enzyme";

import Home from "Components/Home";
import Scoreboard from "Components/Scoreboard";
import NotFound from "Components/NotFound";
import { setupStore } from "Utils/testUtils";
import watchForHover from "Utils/watchForHover";

jest.mock("Utils/watchForHover");

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <MemoryRouter initialEntries={["/scoreboard"]}>
        <Scoreboard {...props} />
      </MemoryRouter>
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(Scoreboard)).toMatchSnapshot();
  });

  it("should call watchForHover()", () => {
    expect(watchForHover).toHaveBeenCalledTimes(1);
  });

  it("should render Scoreboard if the path is /scoreboard", () => {
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(Scoreboard)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });
});
