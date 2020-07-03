import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import Crown from "Components/Scoreboard/PlayerList/Player/Crown";
import { setupStore } from "Utils/testUtils";

function setupWrapper(
  mockStore = setupStore(),
  props = { index: 1 }
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Crown {...props} />
    </Provider>
  );
}

describe("Scoreboard/Crown", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  // test("compare to the last snapshot", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('should have "crown" class by default', () => {
    expect(wrapper.find("svg.crown").length).toEqual(1);
    expect(wrapper.find("svg.crown.has-crown").length).toEqual(0);
  });

  it('should add "has-crown" class if the player has highest score', () => {
    mockStore = setupStore();
    // Pass index 0, because player 0 has the highest score
    wrapper = setupWrapper(mockStore, { index: 0 });
    expect(wrapper.find("svg.crown.has-crown").length).toEqual(1);
  });
});
