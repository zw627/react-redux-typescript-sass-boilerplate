import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { mount, ReactWrapper } from "enzyme";

import Crown from "Components/Scoreboard/PlayerList/Player/Crown";
import { setupStore } from "Utils/testUtils";
import { playerListSelector, scoreListSelector } from "Store/selectors";

import { AppState } from "Store/index";
import { CrownProps } from "Containers/Scoreboard/PlayerList/Player/Crown";

// Pass down the props from mock store to wrapper
function setupProps(
  state = setupStore().getState() as AppState,
  index: number
): CrownProps {
  const score = playerListSelector(state)[index].score;
  const scoreList = scoreListSelector(state);
  return {
    hasCrown: score >= Math.max(...scoreList) && score > 0,
  };
}

function setupWrapper(
  mockStore = setupStore(),
  props = setupProps(mockStore.getState(), 1)
): ReactWrapper {
  return mount(
    <Provider store={mockStore}>
      <Crown {...props} />
    </Provider>
  ) as ReactWrapper;
}

describe("Scoreboard/Crown", () => {
  let mockStore: Store;
  let wrapper: ReactWrapper;

  // Setup wrapper
  beforeEach(() => {
    wrapper = setupWrapper();
  });

  test("compare to the last snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have "crown" class by default', () => {
    expect(wrapper.find("svg.crown").length).toEqual(1);
    expect(wrapper.find("svg.crown.has-crown").length).toEqual(0);
  });

  it('should add "has-crown" class if the player has highest score', () => {
    mockStore = setupStore();
    // Pass index 0, because player 0 has the highest score
    wrapper = setupWrapper(mockStore, setupProps(mockStore.getState(), 0));
    expect(wrapper.find("svg.crown.has-crown").length).toEqual(1);
  });
});
