import React, { useState } from "react";
import "./teamGenerator.css";

const App = () => {
  const [names, setNames] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [newName, setNewName] = useState("");

  // New state for tracking edited names
  const [editedNames, setEditedNames] = useState([]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addName = () => {
    if (newName.trim() !== "") {
      setNames([...names, newName]);
      setNewName("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addName();
    }
  };

  const startEdit = (index) => {
    const updatedEditedNames = [...editedNames];
    updatedEditedNames[index] = true;
    setEditedNames(updatedEditedNames);
  };

  const saveName = (index) => {
    const updatedEditedNames = [...editedNames];
    updatedEditedNames[index] = false;
    setEditedNames(updatedEditedNames);
  };

  const removeName = (index) => {
    const updatedNames = [...names];
    updatedNames.splice(index, 1);
    setNames(updatedNames);

    // Remove the edited status for the removed name
    const updatedEditedNames = [...editedNames];
    updatedEditedNames.splice(index, 1);
    setEditedNames(updatedEditedNames);
  };

  const generateTeams = () => {
    const shuffledNames = [...names].sort(() => 0.5 - Math.random());

    if (shuffledNames.length % 2 === 0) {
      const halfLength = shuffledNames.length / 2;
      setTeamA(shuffledNames.slice(0, halfLength));
      setTeamB(shuffledNames.slice(halfLength));
    } else {
      const halfLengthA = Math.ceil(shuffledNames.length / 2);
      setTeamA(shuffledNames.slice(0, halfLengthA));
      setTeamB(shuffledNames.slice(halfLengthA));
    }
  };

  return (
    <div className="team-generator-container">
      <h1>Team Generator</h1>
      {names?.length > 0 &&
      <div className="names-container">
        {names.map((name, index) => (
          <div key={index} className="name-item">
            {editedNames[index] ? (
              <div>
                <input
                  type="text"
                  value={names[index]}
                  onChange={(event) => {
                    const updatedNames = [...names];
                    updatedNames[index] = event.target.value;
                    setNames(updatedNames);
                  }}
                />
                <button onClick={() => saveName(index)}>Save</button>&nbsp;&nbsp;
                <button onClick={() => removeName(index)}>Remove</button>
              </div>
            ) : (
              <div className="name-text">
                {name} &nbsp;&nbsp;
                <button className="edit-icon" onClick={() => startEdit(index)}>
                  Edit
                </button>&nbsp;&nbsp;
                <button className="remove-icon" onClick={() => removeName(index)}>
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
}
      <input
        type="text"
        value={newName}
        onChange={handleNameChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter a name"
      />
      <button onClick={addName}>Add Name</button>
      <br />
      <br />
      <button onClick={generateTeams}>Generate Teams</button>
      <div className="teams-container">
        <div className="team">
          <h2>Team A:</h2>
          <ul>
            {teamA.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
        <div className="team">
          <h2>Team B:</h2>
          <ul>
            {teamB.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
