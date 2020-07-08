import mockdate from "mockdate";

import { tick, toggle, reset } from "Store/scoreboard/stopwatch/actions";

mockdate.set(1574086940640);

describe("scoreboard/stopwatch actions", () => {
  it("should tick", () => {
    const action = {
      type: "stopwatch/tick",
      payload: {
        date: Date.now(),
      },
    };
    expect(tick(Date.now())).toEqual(action);
  });

  it("should toggle", () => {
    const action = {
      type: "stopwatch/toggle",
      payload: {
        date: Date.now(),
      },
    };
    expect(toggle(Date.now())).toEqual(action);
  });

  it("should reset", () => {
    const action = {
      type: "stopwatch/reset",
      payload: {
        date: Date.now(),
      },
    };
    expect(reset(Date.now())).toEqual(action);
  });
});
