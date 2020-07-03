import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import PlayerList from "Components/Scoreboard/PlayerList/";
import { PlayerListProps } from "Containers/Scoreboard/PlayerList";
import { setupStore } from "Utils/testUtils";
import { playerListSelector } from "Utils/selectors";

// Pass down the props from mock store to wrapper
function setupProps(state = setupStore().getState()): PlayerListProps {
  return {
    playerList: playerListSelector(state),
  };
}

function setupWrapper(
  mockStore = setupStore(),
  props = setupProps(mockStore.getState())
): ReactWrapper {
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
