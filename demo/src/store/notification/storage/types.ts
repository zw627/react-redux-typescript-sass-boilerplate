// ------------------------------------------------------ //
// State

export interface NotificationStorageState {
  visibility: boolean;
}

// ------------------------------------------------------ //
// Action payloads

export interface NotificationStoragePayloads {
  set: { visibility: boolean };
}
