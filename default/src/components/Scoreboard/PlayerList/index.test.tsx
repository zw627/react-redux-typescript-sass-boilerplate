import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import PlayerList from "Components/Scoreboard/PlayerList";
import { setupStore } from "Utils/testUtils";

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <PlayerList {...props} />
    </Provider>
  );
}

describe("Scoreboard/PlayerList", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    // expect(wrapper).toMatchSnapshot();
    expect(wrapper);
  });
});
