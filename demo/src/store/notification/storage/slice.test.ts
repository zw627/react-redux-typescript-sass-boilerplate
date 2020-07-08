import storageReducer, {
  initialState,
  initializeState,
} from "Store/notification/storage/slice";

describe("notificationStorage", () => {
  it("should handle the initial state", () => {
    expect(storageReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle set", () => {
    const action = {
      type: "notificationStorage/set",
      payload: { visibility: true },
    };
    expect(storageReducer(initializeState(false), action)).toEqual(
      initializeState(true)
    );
  });
});
