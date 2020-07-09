import mockdate from "mockdate";

import { add, remove, update, select } from "Store/scoreboard/player/actions";

mockdate.set(1576071902);
const fakeDate = "1/19/1970";

describe("scoreboard/player actions", () => {
  const fakeId = "7e5b5ed0-8022-4147-a34e-3afdbae2d631";
  const fakeName = "W.";

  it("should add a player", () => {
    const action = {
      type: "player/add",
      payload: {
        id: fakeId,
        name: fakeName,
        date: fakeDate,
      },
    };
    expect(add(fakeId, fakeName, fakeDate)).toEqual(action);
  });

  it("should remove a player", () => {
    const action = {
      type: "player/remove",
      payload: {
        id: fakeId,
      },
    };
    expect(remove(fakeId)).toEqual(action);
  });

  it("should update a player's score", () => {
    const delta = 1;
    const action = {
      type: "player/update",
      payload: {
        id: fakeId,
        delta,
        date: fakeDate,
      },
    };
    expect(update(fakeId, delta, fakeDate)).toEqual(action);
  });

  it("should select a player", () => {
    const action = {
      type: "player/select",
      payload: {
        id: fakeId,
      },
    };
    expect(select(fakeId)).toEqual(action);
  });
});
