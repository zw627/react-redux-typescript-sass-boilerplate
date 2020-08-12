import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, ReactWrapper } from "enzyme";

import NotFound from "Components/NotFound";

describe("NotFound", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    ) as ReactWrapper;
  });

  test("compare to the last snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
