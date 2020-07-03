import produce from "immer";

import { PlayerObject, PlayerState, PlayerActions } from "./actions";

export const initializeState = (
  playerList: PlayerObject[] | []
): PlayerState => ({
  playerList,
});

export const initialState = initializeState([
  {
    id: "202fc5bc-7c86-435c-8fa6-fcf5a3120b5f",
    name: "Sophie Alpert",
    score: 12,
    created: "11/8/2016",
    updated: "11/9/2017",
    isSelected: false,
  },
  {
    id: "ec18dacf-39eb-483d-9a8b-00349706760c",
    name: "Evan You",
    score: 20,
    created: "11/14/2016",
    updated: "09/10/2018",
    isSelected: false,
  },
  {
    id: "b19eb6c2-96a5-4575-90e0-59c4a0b671f8",
    name: "Dan Abramov",
    score: 16,
    created: "11/21/2016",
    updated: "06/12/2018",
    isSelected: false,
  },
  {
    id: "6791ed0e-9bd0-483c-924c-4783eaf92c0e",
    name: "Suz Hinton",
    score: 8,
    created: "12/14/2016",
    updated: "04/12/2017",
    isSelected: false,
  },
]);

const playerReducer = (
  state = initialState,
  action: PlayerActions
): PlayerState => {
  switch (action.type) {
    case "player/add": {
      const { id, name, date } = action.payload;
      const filteredName = name.trim().substring(0, 64);
      return produce(state, (draft) => {
        // Add if all inputs valid
        if (id && filteredName && date) {
          draft.playerList.push({
            id,
            name: filteredName,
            score: 0,
            created: date,
            updated: date,
            isSelected: false,
          });
        }
        return draft;
      });
    }

    case "player/remove": {
      const { id } = action.payload;
      return produce(state, (draft) => {
        draft.playerList = draft.playerList.filter(
          (player) => player.id !== id
        );
        return draft;
      });
    }

    case "player/update": {
      const { id, delta, date } = action.payload;
      // Min 0, max 9999
      const checkValueCap = (value: number): boolean =>
        (delta === -1 && value > 0) || (delta === 1 && value <= 9998);
      // Update
      return produce(state, (draft) => {
        draft.playerList = draft.playerList.map((player) => {
          // Update if id matched and value limit not exceeded
          if (player.id === id && checkValueCap(player.score)) {
            return {
              ...player,
              score: player.score += delta,
              updated: date,
            };
          }
          // No changes otherwise
          return player;
        });
        return draft;
      });
    }

    case "player/select": {
      const { id } = action.payload;
      return produce(state, (draft) => {
        // True if id exists and not selected
        draft.playerList.forEach((player) => {
          if (player.id === id && player.isSelected === false)
            player.isSelected = true;
          else player.isSelected = false;
        });
        return draft;
      });
    }

    default: {
      return state;
    }
  }
};

export default playerReducer;
