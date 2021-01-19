import React, { useState } from 'react';
import './challengePage.css';

const PORT = process.env.REACT_APP_API_URL;

function ChallengePage() {
  const [challengeName, setChallengeName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [showAddCommitment, setShowAddCommitment] = useState(false);
  const [commitments, setCommitments] = useState([]);
  const [commitmentName, setCommitmentName] = useState('');
  const [commitmentXp, setCommitmentXp] = useState('');
  const [showChallengeAdded, setShowChallengeAdded] = useState(false);
  const [startingDate, setStartingDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [minXp, setMinXp] = useState('');

  function handleAcceptButtonClick() {
    setIsNameSet(!isNameSet);
  }

  function onChallengeNameChange(event) {
    setChallengeName(event.target.value);
  }

  function handleDeleteButtonClick(event) {
    event.preventDefault();
    setIsNameSet(false);
    setChallengeName('');
  }

  function handleShowAddClick(event) {
    event.preventDefault();
    setShowAddCommitment(!showAddCommitment);
  }

  function onCommitmentNameChange(event) {
    setCommitmentName(event.target.value);
  }

  function onCommitmentXpChange(event) {
    setCommitmentXp(event.target.value);
  }

  function handleAddCommitment(event) {
    event.preventDefault();
    const data = {
      name: commitmentName,
      xp: commitmentXp,
    };
    setCommitments(commitments.concat(data));
    setCommitmentName('');
    setCommitmentXp('');
    setShowAddCommitment(false);
  }

  function onStartingDateChange(event) {
    setStartingDate(event.target.value);
  }

  function onClosingDateChange(event) {
    setClosingDate(event.target.value);
  }

  function onMinXpChange(event) {
    setMinXp(event.target.value);
  }

  function handleAddChallengeButton(event) {
    event.preventDefault();
    const data = {
      challengeName,
      commitments,
      startingDate,
      closingDate,
      minXp,
    };
    fetch(`${PORT}/challenge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    setShowChallengeAdded(true);
  }

  return (
    <div>
      <h2 className="add-header">Add a new challenge:</h2>
      {!isNameSet && (
        <>
          <div className="form-card">
            <form className="challenge-name-form">
              <label htmlFor="challengeName">
                Challenge Name
                <input
                  type="text"
                  name="challengeName"
                  id="challengeName"
                  value={challengeName}
                  onChange={onChallengeNameChange}
                />
              </label>
              <button type="button" onClick={handleAcceptButtonClick}>Accept</button>
            </form>
          </div>
        </>
      )}
      <div className="challenge-name form-card">
        <h2>{challengeName}</h2>
        <button type="button" onClick={handleDeleteButtonClick}>X</button>
      </div>
      <div className="commitment-list form-card">
        <h2>Commitments</h2>
        <ul>
          { (commitments || [])
            && commitments.map((commitment, index) => (
              <li key={index}>
                {commitment.name}
                ,
                {' '}
                {commitment.xp}
                {' XP'}
              </li>
            ))}
        </ul>
        <button type="button" onClick={handleShowAddClick}>Add more</button>
      </div>
      {
        showAddCommitment
        && (
        <form className="form-card add-commit-form">
          <label htmlFor="commitmentName">
            Name of Commitment:
            <input
              type="text"
              name="commitmentName"
              id="commitmentName"
              value={commitmentName}
              onChange={onCommitmentNameChange}
            />
          </label>
          <br />
          <label htmlFor="commitmentXp">
            XP value:
            {' '}
            <br />
            <input
              type="number"
              name="commitmentXp"
              id="commitmentXp"
              value={commitmentXp}
              onChange={onCommitmentXpChange}
            />
          </label>
          <br />
          <button type="button" className="add-commit-button" onClick={handleAddCommitment}>Add</button>
        </form>
        )
      }
      <form className="form-card">
        <label htmlFor="startingDate">
          Starting Date
          <input
            type="text"
            name="staringDate"
            id="startingDate"
            value={startingDate}
            onChange={onStartingDateChange}
            placeholder="format: 2021.01.01."
          />
        </label>
        <label htmlFor="closingDate">
          Closing Date
          <input
            type="text"
            name="closingDate"
            id="closingDate"
            value={closingDate}
            onChange={onClosingDateChange}
            placeholder="format: 2021.01.01"
          />
        </label>
        <label htmlFor="minXp">
          Minimum XP required
          <input
            type="number"
            name="minXp"
            id="minXp"
            value={minXp}
            onChange={onMinXpChange}
          />
        </label>
      </form>
      <button type="button" id="submit-button" onClick={handleAddChallengeButton}>Submit Challenge</button>
      {showChallengeAdded && (<p className="add-challenge-completed">You have submitted your challenge</p>)}
    </div>
  );
}

export default ChallengePage;
