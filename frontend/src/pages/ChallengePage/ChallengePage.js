import React, { useState, useEffect } from 'react';
import './challengePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenge } from '../../actions/challengeAction';
import generalFetch from '../../utilities/generalFetch';

function ChallengePage() {
  const [challengeName, setChallengeName] = useState('');
  const [commitments, setCommitments] = useState([]);
  const [commitmentName, setCommitmentName] = useState('');
  const [commitmentXp, setCommitmentXp] = useState('');
  const [showChallengeAdded, setShowChallengeAdded] = useState(false);
  const [startingDate, setStartingDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [minXp, setMinXp] = useState('');
  const [formError, setFormError] = useState('');
  const loginData = useSelector((state) => state.login);
  const challengeData = useSelector((state) => state.challenge.challenge[0]);

  const dispatch = useDispatch();

  function getCurrChallenge() {
    dispatch(getChallenge(dispatch));
  }

  useEffect(() => {
    getCurrChallenge();
  }, [dispatch]);

  function onChallengeNameChange(event) {
    setChallengeName(event.target.value);
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
      commitmentName,
      xp: commitmentXp,
    };
    if (!data.commitmentName || !data.xp) {
      setFormError('Missing field in add commitment form');
    } else {
      setCommitments(commitments.concat(data));
      setCommitmentName('');
      setCommitmentXp('');
    }
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

    const dateRegex = /^\d{4}[/.]\d{1,2}[/.]\d{1,2}$/;

    if (!data.challengeName || !data.commitments || !data.minXp) {
      setFormError('All fields are required');
    } else if (!dateRegex.test(startingDate) || !dateRegex.test(closingDate)) {
      setFormError('Correct date format is: 1970.01.01');
    } else {
      generalFetch('challenge', 'POST', data, loginData.token);
      setShowChallengeAdded(true);
    }
  }

  return (
    challengeData.challengeName === undefined ? (
      <div className="challenge-page">
        <h2 className="add-header">Add a new challenge:</h2>
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
          </form>
          <div className="commitment-list">
            <h2>Commitments</h2>
            <ul>
              { (commitments.length > 0)
                ? commitments.map((commitment, index) => (
                  <li key={index}>
                    {commitment.commitmentName}
                    ,
                    {' '}
                    {commitment.xp}
                    {' XP'}
                  </li>
                ))
                : <li className="no-commitments">Add at least one commitment</li>}
            </ul>
          </div>
          <form className="add-commit-form">
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
            <button type="button" className="challenge-button add-commit-button" onClick={handleAddCommitment}>Add</button>
          </form>
          <form>
            <label htmlFor="startingDate">
              Starting Date
              <input
                type="text"
                name="staringDate"
                id="startingDate"
                value={startingDate}
                onChange={onStartingDateChange}
                placeholder="format: 2021.01.01"
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
        </div>
        {
        formError && (
          <div className="error-message">{formError}</div>
        )
      }
        <button type="button" className="challenge-button" id="submit-button" onClick={handleAddChallengeButton}>Submit Challenge</button>
        {showChallengeAdded && (<p className="add-challenge-completed">You have submitted your challenge</p>)}
      </div>
    )
      : (
        <div>
          <div className="challenge-card">
            <h1>{challengeData.challengeName}</h1>
            <p>{challengeData.startingDate.slice(0, 10)}</p>
            <p>-</p>
            <p>{challengeData.closingDate.slice(0, 10)}</p>
            <p>Challengers: 97</p>
          </div>
          <div className="commitments">
            <form className="add-commit-form">
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
              <button type="button" className="challenge-button add-commit-button" onClick={handleAddCommitment}>Add</button>
            </form>
          </div>
          <button type="button">Show Challengers</button>
          <button type="button">Delete Challenge</button>
        </div>
      )
  );
}

export default ChallengePage;
