import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import mockdate from "mockdate";

import { add } from "Store/scoreboard/player/actions";
import AddPlayerForm from "Components/Scoreboard/AddPlayerForm/";
import { setupStore } from "Utils/testUtils";

jest.mock("Store/scoreboard/player/actions");
mockdate.set(1576071902);
const fakeDate = "1/19/1970";
jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => "43802ca3-f4e1-4233-a101-eea29eeaf388"),
  };
});

function setupWrapper(mockStore = setupStore(), props = { add }): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <AddPlayerForm {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/AddPlayerForm", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle <input> onChange", () => {
    wrapper
      .find("input")
      .simulate("change", { target: { value: "Hello!    W+" } });
    expect(wrapper.find("input").at(0).prop("value")).toEqual("Hello W");
  });

  it("should handle add() dispatch", () => {
    wrapper
      .find("input")
      .simulate("change", { target: { value: "Hello!    W+" } });
    wrapper.find("button").simulate("submit", {
      preventDefault: () => {
        // do nothing.
      },
    });
    expect(add).toHaveBeenCalledWith(
      "43802ca3-f4e1-4233-a101-eea29eeaf388",
      "Hello W",
      fakeDate
    );
    expect(add).toHaveBeenCalledTimes(1);
  });
});
