import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import Player from "Components/Scoreboard/PlayerList/Player";
import { setupStore, matchMultiLength } from "Utils/testUtils";

function setupWrapper(
  mockStore = setupStore(),
  props = { index: 0 }
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Player {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/Player", () => {
  let wrapper: ReactWrapper;
  let mockStore: Store;

  // Setup store and wrapper, mock dispatch
  beforeEach(() => {
    mockStore = setupStore();
    mockStore.dispatch = jest.fn();
    wrapper = setupWrapper(mockStore);
  });

  test("compare to the last snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

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
    /* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "matchMultiLength"] }] */
    matchMultiLength(wrapper, [
      ["div.player.player-selected", 1],
      ["a.remove-player.remove-player-selected", 1],
    ]);
  });

  it("should handle removePlayer() dispatch", () => {
    wrapper.find("a.remove-player").simulate("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: "player/remove",
      payload: {
        id: "1654A",
      },
    });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it("should handle selectPlayer() dispatch", () => {
    wrapper.find("span").simulate("click");
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: "player/select",
      payload: {
        id: "1654A",
      },
    });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
