import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import PlayerDetail from "Components/Scoreboard/PlayerDetail/";
import { PlayerDetaiProps } from "Containers/Scoreboard/PlayerDetail";
import { setupStore, matchMultiLength, multiToEqual } from "Utils/testUtils";
import { playerDetailSelector } from "Utils/selectors";

// Pass down the props from mock store to wrapper
function setupProps(state = setupStore().getState()): PlayerDetaiProps {
  return {
    player: playerDetailSelector(state),
  };
}

function setupWrapper(
  mockStore = setupStore(),
  props = setupProps(mockStore.getState())
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <PlayerDetail {...props} />
    </Provider>
  );
}

describe("Scoreboard/PlayerDetail", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  // test("compare to the last snapshot", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it("should display tips by default", () => {
    expect(wrapper.find("p").at(0).text()).toEqual(
      "*Click on a player to see more details."
    );
  });

  it("should display details if a player is selected", () => {
    mockStore = setupStore({
      playerList: [
        {
          id: "1654A",
          name: "Alpha",
          score: 10,
          created: "11/21/2016",
          updated: "06/12/2018",
          isSelected: false,
        },
        {
          id: "1654B",
          name: "Beta",
          score: 4,
          created: "11/8/2016",
          updated: "11/9/2017",
          isSelected: true,
        },
      ],
    });
    wrapper = setupWrapper(mockStore);

    // h3 for player name
    expect(wrapper.find("h3").at(0).text()).toEqual("Beta");

    // Table structure
    matchMultiLength(wrapper, [
      ["table", 1],
      ["tbody", 1],
      ["tr", 3],
    ]);

    // Table columns
    function mapRowColumns(index: number): string[] {
      return wrapper
        .find("tr")
        .at(index)
        .find("td")
        .map((column) => column.text());
    }
    const firstRowColumns = mapRowColumns(0);
    const secondRowColumns = mapRowColumns(1);
    const thirdRowColumns = mapRowColumns(2);
    multiToEqual([
      [firstRowColumns.length, 2],
      [firstRowColumns[0], "Score:"],
      [firstRowColumns[1], "4"],
      [secondRowColumns.length, 2],
      [secondRowColumns[0], "Created:"],
      [secondRowColumns[1], "11/8/2016"],
      [thirdRowColumns.length, 2],
      [thirdRowColumns[0], "Updated:"],
      [thirdRowColumns[1], "11/9/2017"],
    ]);
  });
});
