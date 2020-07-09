import React from "react";
import { mount, ReactWrapper } from "enzyme";

import App from "./App";

function setupWrapper(): ReactWrapper {
  return mount(<App />) as ReactWrapper;
}

describe("App", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
