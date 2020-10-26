import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount, ReactWrapper } from "enzyme";

import Home from "Components/Home";
import Scoreboard from "Components/Scoreboard";
import NotFound from "Components/NotFound";

describe("Home", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    ) as ReactWrapper;
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(Home)).toMatchSnapshot();
  });

  it("should render Home if the path is /", () => {
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(Scoreboard)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });
});
