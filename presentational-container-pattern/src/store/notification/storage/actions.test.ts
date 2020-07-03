import { set } from "Store/notification/storage/actions";

describe("notification/storage actions", () => {
  it("should set visibility", () => {
    const expectedAction = {
      type: "notificationStorage/set",
      payload: {
        visibility: false,
      },
    };
    expect(set(false)).toEqual(expectedAction);
  });
});
