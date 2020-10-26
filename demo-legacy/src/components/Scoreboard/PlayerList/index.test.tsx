import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import PlayerList from "Components/Scoreboard/PlayerList/";
import { setupStore } from "Utils/testUtils";
import { playerListSelector } from "Store/selectors";

import { AppState } from "Store/index";
import { PlayerListProps } from "Containers/Scoreboard/PlayerList";

// Pass down the props from mock store to wrapper
function setupProps(
  state = setupStore().getState() as AppState
): PlayerListProps {
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
  ) as ReactWrapper;
}

describe("Scoreboard/PlayerList", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(PlayerList)).toMatchSnapshot();
  });
});
