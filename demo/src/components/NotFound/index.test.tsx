import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount, ReactWrapper } from "enzyme";

import Home from "Components/Home";
import Scoreboard from "Components/Scoreboard";
import NotFound from "Components/NotFound";

describe("NotFound", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/random"]}>
        <NotFound />
      </MemoryRouter>
    ) as ReactWrapper;
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(NotFound)).toMatchSnapshot();
  });

  it("should render NotFound if the path is invalid", () => {
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(Scoreboard)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });
});
