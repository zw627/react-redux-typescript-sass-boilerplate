import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import { remove, select } from "Store/scoreboard/player/actions";
import Player from "Components/Scoreboard/PlayerList/Player/index";
import { PlayerProps } from "Containers/Scoreboard/PlayerList/Player";
import { setupStore, matchMultiLength } from "Utils/testUtils";
import { playerListSelector } from "Utils/selectors";

jest.mock("Store/scoreboard/player/actions");

// Pass down the props from mock store to wrapper
function setupProps(state = setupStore().getState()): PlayerProps {
  const { id, name, isSelected } = playerListSelector(state)[0];
  return {
    index: 0,
    id,
    name,
    isSelected,
    remove,
    select,
  };
}

function setupWrapper(
  mockStore = setupStore(),
  props = setupProps(mockStore.getState())
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Player {...props} />
    </Provider>
  );
}

describe("Scoreboard/Player", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  // test("compare to the last snapshot", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it("should display player name", () => {
    // Name of the player at index 0, because we passed 0 to setupWrapper
    expect(wrapper.find("span").at(0).text()).toEqual("Alpha");
  });

  it("should update related classes if a player is selected", () => {
    // Change `isSelected` of player at index 0 to true
    mockStore = setupStore({
      playerList: [
        {
          id: "1654A",
          name: "Alpha",
          score: 10,
          created: "11/21/2016",
          updated: "06/12/2018",
          isSelected: true,
        },
        {
          id: "1654B",
          name: "Beta",
          score: 4,
          created: "11/8/2016",
          updated: "11/9/2017",
          isSelected: false,
        },
      ],
    });
    wrapper = setupWrapper(mockStore);
    matchMultiLength(wrapper, [
      ["div.player.player-selected", 1],
      ["a.remove-player.remove-player-selected", 1],
    ]);
  });

  it("should handle removePlayer() dispatch", () => {
    wrapper.find("a.remove-player").simulate("click");
    expect(remove).toHaveBeenCalledWith("1654A");
    expect(remove).toHaveBeenCalledTimes(1);
  });

  it("should handle selectPlayer() dispatch", () => {
    wrapper.find("span").simulate("click");
    expect(select).toHaveBeenCalledWith("1654A");
    expect(select).toHaveBeenCalledTimes(1);
  });
});
