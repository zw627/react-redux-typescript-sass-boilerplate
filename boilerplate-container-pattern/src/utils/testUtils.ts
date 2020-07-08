// Helper functions for Jest and Enzyme

import { ReactWrapper, ShallowWrapper } from "enzyme";
import { createStore, Store } from "redux";

import { rootReducer } from "Store/index";

// Type for parameters of setupStore()
type setupStorePars = {
  playerList?: {
    id: string;
    name: string;
    score: number;
    created: string;
    updated: string;
    isSelected: boolean;
  }[];
  selectedPlayerId?: string;
  isRunning?: boolean;
  previousTime?: number;
  elapsedTime?: number;
  isLightMode?: boolean;
  visibility?: boolean;
};

// Setup a store with some fake states for testing
export function setupStore({
  playerList = [
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
      isSelected: false,
    },
  ],
  isRunning = false,
  previousTime = 0,
  elapsedTime = 0,
  isLightMode = false,
  visibility = false,
}: setupStorePars = {}): Store {
  return createStore(rootReducer, {
    notification: {
      storage: {
        visibility,
      },
    },
    scoreboard: {
      player: {
        playerList,
      },
      stopwatch: {
        isRunning,
        previousTime,
        elapsedTime,
      },
      theme: {
        isLightMode,
      },
    },
  });
}

// Multiple toEqual, useful when testing a table
export function multiToEqual([...args]: Array<string[] | number[]>): void {
  // [[a, b], [a, b], [a, b]]
  [...args].map((arg) => {
    // [a, b] (expect a equals to b)
    expect(arg[0]).toEqual(arg[1]);
  });
}

export function matchLength(
  wrapper: ReactWrapper | ShallowWrapper,
  [element, number]: [string, number]
): void {
  expect(wrapper.find(element).length).toEqual(number);
}

// Multiple matchLength
export function matchMultiLength(
  wrapper: ReactWrapper | ShallowWrapper,
  [...args]: [string, number][]
): void {
  // [[a, b], [a, b], [a, b]]
  [...args].map((arg) => {
    // [a, b] (expect a equals to b)
    matchLength(wrapper, [arg[0], arg[1]]);
  });
}

// export const matchText = (
//   wrapper: ReactWrapper | ShallowWrapper,
//   [element, index]: [string, number],
//   text: string
// ): void => {
//   expect(
//     wrapper
//       .find(element)
//       .at(index)
//       .text()
//   ).toEqual(text);
// };

// export const matchMultiText = (
//   wrapper: ReactWrapper | ShallowWrapper,
//   [...args]
// ): void => {
//   if ([...args].length > 0)
//     [...args].map(arg => {
//       matchText(wrapper, [arg[0], arg[1]], arg[2]);
//     });
// };
