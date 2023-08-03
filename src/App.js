import React, { useState } from 'react';
import './teamGenerator.css'; 
const App = () => {
  const [names, setNames] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addName = () => {
    if (newName.trim() !== '') {
      setNames([...names, newName]);
      setNewName('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addName();
    }
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
      <div className="names-container">
        {names.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          onKeyPress={handleKeyPress} // Add the onKeyPress event handler
          placeholder="Enter a name"
        />
        <button onClick={addName}>Add Name</button>
      </div>
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
