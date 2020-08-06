import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, ReactWrapper } from "enzyme";

import Home from "Components/Home";

describe("Home", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    ) as ReactWrapper;
  });

  test("compare to the last snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
