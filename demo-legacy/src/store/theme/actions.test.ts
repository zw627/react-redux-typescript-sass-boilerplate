import { toggle } from "Store/theme/actions";

describe("scoreboard/theme actions", () => {
  it("should switch theme", () => {
    const expectedAction = {
      type: "theme/toggle",
    };
    expect(toggle()).toEqual(expectedAction);
  });
});
