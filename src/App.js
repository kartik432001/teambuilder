import React, { useState } from "react";
import "./teamGenerator.css";
import { Modal, Button, notification , message } from 'antd';

const App = () => {
  const [players, setPlayers] = useState([]); // New state for players
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [newName, setNewName] = useState("");
  const [newSkill, setNewSkill] = useState(""); // New state for entering skill
  const [editedPlayers, setEditedPlayers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    if (players.length < 2) {
      notification.warning({
        message: "Insufficient Players",
        description: "You need at least 2 players to generate teams.",
      });
      return;
    }

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSkillChange = (event) => {
    setNewSkill(event.target.value);
  };

  const addName = () => {
    if (newName.trim() !== "" && newSkill.trim() !== "") {
      setPlayers([...players, { name: newName, skill: newSkill }]);
      setNewName("");
      setNewSkill("");
    } else {
      notification.error({
        message: "Invalid Input",
        description: "Please enter a valid name and skill for the player.",
      });
    }
  };

  const startEdit = (index) => {
    const updatedEditedPlayers = [...editedPlayers];
    updatedEditedPlayers[index] = true;
    setEditedPlayers(updatedEditedPlayers);
  };

  const savePlayer = (index) => {
    if (players[index].name.trim() !== "") {
      const updatedEditedPlayers = [...editedPlayers];
      updatedEditedPlayers[index] = false;
      setEditedPlayers(updatedEditedPlayers);
    } else {
      notification.error({
        message: "Invalid Name",
        description: "Player name cannot be empty.",
      });
    }
  };

  const removePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);

    const updatedEditedPlayers = [...editedPlayers];
    updatedEditedPlayers.splice(index, 1);
    setEditedPlayers(updatedEditedPlayers);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const generateTeams = () => {
    // Separate players into skill groups
    const playersBySkill = {
      Batsman: [],
      Bowler: [],
      "All-Rounder": [],
    };
  
    players.forEach((player) => {
      playersBySkill[player.skill].push(player);
    });
  
    // Create an array of team skill values
    const teamSkillValues = Object.values(playersBySkill).map((skillGroup) =>
      skillGroup.reduce((total, player) => total + player.skillValue, 0)
    );
  
    // Sort the skill groups by total skill value
    const sortedSkillGroups = Object.keys(playersBySkill).sort(
      (skillA, skillB) =>
        teamSkillValues[skillB] - teamSkillValues[skillA]
    );
  
    const teamAPlayers = [];
    const teamBPlayers = [];
  
    // Distribute players evenly between teams based on skill groups
    sortedSkillGroups.forEach((skillGroup) => {
      const skillGroupPlayers = shuffleArray(playersBySkill[skillGroup]);
  
      while (skillGroupPlayers.length > 0) {
        if (teamAPlayers.length <= teamBPlayers.length) {
          teamAPlayers.push(skillGroupPlayers.pop());
        } else {
          teamBPlayers.push(skillGroupPlayers.pop());
        }
      }
    });
  
    setTeamA(teamAPlayers);
    setTeamB(teamBPlayers);
    showModal();
  };
  
  
  return (
    <div className="team-generator-container">
      <h1>Team Generator</h1>
      <div className="names-container">
        {players.map((player, index) => (
          <div key={index} className="player-item">
            {editedPlayers[index] ? (
              <div className="edit-text">
                <input
                  type="text"
                  value={player.name}
                  onChange={(event) => {
                    const updatedPlayers = [...players];
                    updatedPlayers[index].name = event.target.value;
                    setPlayers(updatedPlayers);
                  }}
                />
                <select
                  value={player.skill}
                  onChange={(event) => {
                    const updatedPlayers = [...players];
                    updatedPlayers[index].skill = event.target.value;
                    setPlayers(updatedPlayers);
                  }}
                >
                  <option value="">Select Skill</option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-Rounder">All-Rounder</option>
                </select>
                <button className="edit-icon" onClick={() => savePlayer(index)}>
                  Save
                </button>
                <button
                  className="remove-icon"
                  onClick={() => removePlayer(index)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="player-text">
                <span className="player-name">{player.name}</span>
                <span className="player-skill">{player.skill}</span>
                <button className="edit-icon" onClick={() => startEdit(index)}>
                  Edit
                </button>
                <button
                  className="remove-icon"
                  onClick={() => removePlayer(index)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="player-item">
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            className="player-input"
            placeholder="Enter a name"
          />
          <select
            value={newSkill}
            onChange={handleSkillChange}
            className="player-select"
          >
            <option value="">Select Skill</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
          </select>
          <button className="add-player-button" onClick={addName}>
            Add Player
              
          </button>
        </div>
      </div>
      <button onClick={generateTeams} disabled={players.length < 2}>
        Generate Teams
      </button>
      <Modal
        title="Generated Teams"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        <div className="teams-container">
          <div className="team">
            <h2>Team A:</h2>
            <ul>
              {teamA.map((player, index) => (
                <li key={index}>
                  {player.name} - {player.skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="team">
            <h2>Team B:</h2>
            <ul>
              {teamB.map((player, index) => (
                <li key={index}>
                  {player.name} - {player.skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
