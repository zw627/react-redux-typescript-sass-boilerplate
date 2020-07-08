import { ThemeActions } from "Store/scoreboard/theme/actions";
import themeReducer, {
  initializeState,
  initialState,
} from "Store/scoreboard/theme/reducer";

describe("scoreboard/themeReducer", () => {
  it("should return the initial state", () => {
    expect(themeReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle theme/toggle", () => {
    const action: ThemeActions = {
      type: "theme/toggle",
    };
    expect(themeReducer(initializeState(false), action)).toEqual(
      initializeState(true)
    );
  });
});
