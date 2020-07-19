import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import Notification from "Components/common/Notification";
import { setupStore } from "Utils/testUtils";

function setupWrapper(
  mockStore = setupStore(),
  props = {
    icon: "exclamation",
    text: "Test 1.",
    slideOut: false,
  }
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Notification {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Notification", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setupWrapper();
  });

  it("should render based on props", () => {
    // Should slide in with exclamation icon
    expect(wrapper.find("div.notification.slide-in").length).toEqual(1);
    expect(wrapper.find(".circle-exclamation").length).toEqual(1);
    expect(wrapper.find("span").text()).toEqual("Test 1.");

    // Should slide out with tick icon
    wrapper = setupWrapper(setupStore(), {
      icon: "tick",
      text: "Test 2.",
      slideOut: true,
    });
    expect(wrapper.find("div.notification.slide-out").length).toEqual(1);
    expect(wrapper.find(".circle-tick").length).toEqual(1);
    expect(wrapper.find("span").text()).toEqual("Test 2.");
  });
});
