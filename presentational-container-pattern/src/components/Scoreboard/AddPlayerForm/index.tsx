import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import getCurrentDate from "Utils/getCurrentDate";
import { AddPlayerFormProps } from "Containers/Scoreboard/AddPlayerForm";

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({
  add,
}: AddPlayerFormProps) => {
  // State (local)
  const [value, setValue] = useState("");

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
    add(uuidv4(), value, getCurrentDate());
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
