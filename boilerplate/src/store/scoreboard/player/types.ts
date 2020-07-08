// ------------------------------------------------------ //
// State

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

// ------------------------------------------------------ //
// Action payloads

export interface PlayerPayloads {
  add: {
    id: string;
    name: string;
    date: string;
  };
  remove: {
    id: string;
  };
  update: {
    id: string;
    delta: number;
    date: string;
  };
  select: {
    id: string;
  };
}
