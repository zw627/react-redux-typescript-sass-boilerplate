import theme, { initialState, initializeState } from "Store/theme/slice";

describe("scoreboard/theme", () => {
  it("should handle the initial state", () => {
    expect(theme(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle toggle", () => {
    const action = {
      type: "theme/toggle",
    };
    expect(theme(initializeState(false), action)).toEqual(
      initializeState(true)
    );
  });
});
