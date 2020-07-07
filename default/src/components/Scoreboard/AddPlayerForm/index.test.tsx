import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";
import mockdate from "mockdate";

import AddPlayerForm from "Components/Scoreboard/AddPlayerForm";
import { setupStore } from "Utils/testUtils";

mockdate.set(1576071902);
const fakeDate = "1/19/1970";
jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => "43802ca3-f4e1-4233-a101-eea29eeaf388"),
  };
});

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <AddPlayerForm {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/AddPlayerForm", () => {
  let wrapper: ReactWrapper;
  let mockStore: Store;

  // Setup store and wrapper, mock dispatch
  beforeEach(() => {
    mockStore = setupStore();
    mockStore.dispatch = jest.fn();
    wrapper = setupWrapper(mockStore, {});
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

  it("should handle addPlayer() dispatch", () => {
    wrapper
      .find("input")
      .simulate("change", { target: { value: "Hello!    W+" } });
    wrapper.find("button").simulate("submit", {
      preventDefault: () => {
        // do nothing.
      },
    });
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: "player/add",
      payload: {
        id: "43802ca3-f4e1-4233-a101-eea29eeaf388",
        name: "Hello W",
        date: fakeDate,
      },
    });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
