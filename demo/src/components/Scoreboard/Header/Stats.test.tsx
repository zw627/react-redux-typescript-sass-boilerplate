import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import Stats from "Components/Scoreboard/Header/Stats";
import { setupStore, multiToEqual } from "Utils/testUtils";

function setupWrapper(mockStore = setupStore(), props = {}): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Stats {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/Stats", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup store and wrapper
  beforeEach(() => {
    mockStore = setupStore();
    wrapper = setupWrapper(mockStore, {});
  });

  test("compare to the last snapshot", () => {
    expect(wrapper.find(Stats)).toMatchSnapshot();
  });

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
    /* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "multiToEqual"] }] */
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
