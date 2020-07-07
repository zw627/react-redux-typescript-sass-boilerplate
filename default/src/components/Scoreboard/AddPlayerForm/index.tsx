import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import getCurrentDate from "Utils/getCurrentDate";

const AddPlayerForm: React.FC<Record<string, unknown>> = () => {
  // State (local)
  const [value, setValue] = useState("");

  // Actions (redux)
  const dispatch = useDispatch();
  const addPlayer = useCallback(
    (id: string, name: string, date: string) =>
      dispatch({
        type: "player/add",
        payload: { id, name, date },
      }),
    [dispatch]
  );

  // Handlers
  function onNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // Only letters, ",.'’-", single space allowed
    const name = e.target.value
      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s,.'’-]/g, "")
      .replace(/\s\s+/g, " ");
    setValue(name);
  }
  function handleAddPlayer(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    addPlayer(uuidv4(), value, getCurrentDate());
    setValue("");
  }

  return (
    <div className="add-player-form">
      <form onSubmit={handleAddPlayer}>
        <input
          type="text"
          value={value}
          onChange={onNameChange}
          placeholder="Enter a player's name"
          maxLength={64}
        />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayerForm;
