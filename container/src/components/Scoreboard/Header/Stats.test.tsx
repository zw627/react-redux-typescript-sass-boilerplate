import React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import Stats from "Components/Scoreboard/Header/Stats";
import { setupStore, multiToEqual } from "Utils/testUtils";
import { playerCountSelector, scoreCountSelector } from "Utils/selectors";
import { StatsProps } from "Containers/Scoreboard/Header/Stats";

// Pass down the props from mock store to wrapper
function setupProps(state = setupStore().getState()): StatsProps {
  return {
    playerCount: playerCountSelector(state),
    scoreCount: scoreCountSelector(state),
  };
}

function setupWrapper(
  mockStore = setupStore(),
  props = setupProps(mockStore.getState())
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Stats {...props} />
    </Provider>
  );
}

describe("Scoreboard/Stats", () => {
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  // test("compare to the last snapshot", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it("should display player and point count", () => {
    function mapRowColumns(index: number): string[] {
      return wrapper
        .find("tr")
        .at(index)
        .find("td")
        .map((column) => column.text());
    }
    const firstRowColumns = mapRowColumns(0);
    const secondRowColumns = mapRowColumns(1);
    multiToEqual([
      [firstRowColumns.length, 2],
      [firstRowColumns[0], "Players:"],
      [firstRowColumns[1], "2"],
      [secondRowColumns.length, 2],
      [secondRowColumns[0], "Total Points:"],
      [secondRowColumns[1], "14"],
    ]);
  });
});
