import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import NotificationStorage from "Components/NotificationStorage";
import { setupStore } from "Utils/testUtils";

jest.useFakeTimers();

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <NotificationStorage {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("NotificationStorage", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(NotificationStorage)).toMatchSnapshot();
  });

  it("should not render if visibility is false", () => {
    expect(wrapper.find("div").length).toEqual(0);
    expect(setTimeout).toHaveBeenCalledTimes(0);
  });

  it("should handle all timers", () => {
    // Start slide-out and unmount timers
    wrapper = setupWrapper(setupStore({ visibility: true }));
    expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 6000);
    expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 6600);
    expect(setTimeout).toHaveBeenCalledTimes(2);

    // Click div should trigger slide-out animation immediately, then unmount after 600ms
    wrapper.find("div").simulate("click");
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 600);
    expect(setTimeout).toHaveBeenCalledTimes(3);
  });

  it("should clear timers on unmount", () => {
    wrapper.unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(2);
  });
});
