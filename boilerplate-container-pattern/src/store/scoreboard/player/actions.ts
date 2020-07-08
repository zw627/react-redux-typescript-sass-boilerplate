// ------------------------------------------------------ //
// Actions

export const ADD = "player/add";
export const REMOVE = "player/remove";
export const UPDATE_SCORE = "player/update";
export const SELECT = "player/select";

// ------------------------------------------------------ //
// Action creators

export const add = (id: string, name: string, date: string): PlayerActions => ({
  type: "player/add",
  payload: {
    id,
    name,
    date,
  },
});

export const remove = (id: string): PlayerActions => ({
  type: "player/remove",
  payload: {
    id,
  },
});

export const update = (
  id: string,
  delta: number,
  date: string
): PlayerActions => ({
  type: "player/update",
  payload: {
    id,
    delta,
    date,
  },
});

export const select = (id: string): PlayerActions => ({
  type: "player/select",
  payload: {
    id,
  },
});

// ------------------------------------------------------ //
// Types - action

interface Add {
  type: typeof ADD;
  payload: {
    id: string;
    name: string;
    date: string;
  };
}

interface Remove {
  type: typeof REMOVE;
  payload: {
    id: string;
  };
}

interface Update {
  type: typeof UPDATE_SCORE;
  payload: {
    id: string;
    delta: number;
    date: string;
  };
}

interface Select {
  type: typeof SELECT;
  payload: {
    id: string;
  };
}

export type PlayerActions =
  | Add
  | Remove
  | Update
  | Select
  | { type: undefined };

// ------------------------------------------------------ //
// Types - state

export interface PlayerObject {
  id: string;
  name: string;
  score: number;
  created: string;
  updated: string;
  isSelected: boolean;
}

export interface PlayerState {
  playerList: PlayerObject[];
}
