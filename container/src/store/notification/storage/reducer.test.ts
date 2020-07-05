import notificationStorageReducer, {
  initialState,
  initializeState,
} from "./reducer";
import { NotificationStorageActions } from "./actions";

describe("notification/storage", () => {
  it("should return the initial state", () => {
    expect(notificationStorageReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle notificationStorage/set", () => {
    const action: NotificationStorageActions = {
      type: "notificationStorage/set",
      payload: {
        visibility: false,
      },
    };
    expect(notificationStorageReducer(initializeState(true), action)).toEqual(
      initializeState(false)
    );
    expect(notificationStorageReducer(initializeState(false), action)).toEqual(
      initializeState(false)
    );
  });
});
