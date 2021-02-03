/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import './challengePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getChallenge } from '../../actions/challengeAction';
import { getCommitments } from '../../actions/commitmentAction';
import { getUsers } from '../../actions/userAction';
import generalFetch from '../../utilities/generalFetch';

function ChallengePage() {
  const [challengeName, setChallengeName] = useState('');
  const [commitments, setCommitments] = useState([]);
  const [commitmentName, setCommitmentName] = useState('');
  const [commitmentXp, setCommitmentXp] = useState('');
  // const [showChallengeAdded, setShowChallengeAdded] = useState(false);
  const [startingDate, setStartingDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [minXp, setMinXp] = useState('');
  const [formError, setFormError] = useState('');
  const [addCounter, setAddCounter] = useState(0);
  const [showChallengers, setShowChallengers] = useState(false);
  const [showChallengersButton, setShowChallengersButton] = useState('Show challengers');
  const loginData = useSelector((state) => state.login);
  const challengeData = useSelector((state) => state.challenge.challenge[0]);
  const commitmentList = useSelector((state) => state.commitments);
  const usersList = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const history = useHistory();

  function getCurrChallenge() {
    dispatch(getChallenge(dispatch));
  }

  function getCommitmentList() {
    dispatch(getCommitments(dispatch));
  }

  function getCurrUsers() {
    dispatch(getUsers());
  }

  useEffect(() => {
    getCurrChallenge();
    getCurrUsers();
  }, [dispatch]);

  useEffect(() => {
    getCommitmentList();
  }, [addCounter]);

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
      history.push('/');
      setFormError('You have submitted your challenge');
    }
  }

  function handleShowChallengersClick() {
    if (!showChallengers) {
      setShowChallengers(true);
      setShowChallengersButton('Hide challengers');
    } else {
      setShowChallengers(false);
      setShowChallengersButton('Show challengers');
    }
  }

  async function saveCommitmentClick(event) {
    event.preventDefault();
    if (!commitmentName || !commitmentXp) {
      setFormError('Missing field in add commitment form');
    } else {
      await generalFetch('commitment', 'PUT', {
        commitmentName,
        xp: commitmentXp,
        challengeId: challengeData.id,
      });
      setCommitmentName('');
      setCommitmentXp('');
      setAddCounter(addCounter + 1);
    }
  }

  async function handleDeleteChallengeClick(event) {
    event.preventDefault();
    const bodyData = {
      challengeName: challengeData.challengeName,
    };
    const { token } = loginData;
    await generalFetch('challenge', 'DELETE', bodyData, token);
  }

  return (
    challengeData === undefined ? (
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
            <label htmlFor="commitmentName" className="challenge-name-form">
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
            <label htmlFor="commitmentXp" className="challenge-name-form">
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
            <label htmlFor="startingDate" className="challenge-name-form">
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
            <label htmlFor="closingDate" className="challenge-name-form">
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
            <label htmlFor="minXp" className="challenge-name-form">
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
        {/* showChallengeAdded && (<p className="add-challenge-completed">You have submitted your challenge</p>) */}
      </div>
    )
      : (
        <div className="existing-challenge">
          <div className="challenge-card">
            <h1 className="challenge-title">{challengeData.challengeName}</h1>
            <p>{challengeData.startingDate.slice(0, 10)}</p>
            <p>-</p>
            <p>{challengeData.closingDate.slice(0, 10)}</p>
            <p>Challengers: 97</p>
          </div>
          <div className="commitments">
            <div className="commitment-list">
              <h2>Commitments</h2>
              <ul>
                {commitmentList.commitments
                && commitmentList.commitments.map((commitment, index) => (
                  <li key={index}>
                    {commitment.commitmentName}
                    ,
                    {' '}
                    {commitment.xp}
                    {' XP'}
                  </li>
                ))}
              </ul>
            </div>
            <form className="add-commit-form">
              <label htmlFor="commitmentName">
                <input
                  type="text"
                  name="commitmentName"
                  id="commitmentName"
                  value={commitmentName}
                  onChange={onCommitmentNameChange}
                  placeholder="Name of Commitment"
                />
              </label>
              <br />
              <label htmlFor="commitmentXp">
                <input
                  type="number"
                  name="commitmentXp"
                  id="commitmentXp"
                  value={commitmentXp}
                  onChange={onCommitmentXpChange}
                  placeholder="XP value"
                />
              </label>
              <br />
              <button type="button" className="challenge-button add-commit-button" onClick={saveCommitmentClick}>Add</button>
            </form>
          </div>
          <button type="button" className="challenge-button" onClick={handleShowChallengersClick}>{showChallengersButton}</button>
          {
            showChallengers && (
              <div className="challengers">
                <h1>Challengers</h1>
                <ul>
                  {usersList.users
                  && usersList.users.map((user, index) => (
                    <li key={index}>
                      {user.username}
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
          <button type="button" className="challenge-button delete-button" onClick={handleDeleteChallengeClick}>Delete Challenge</button>
        </div>
      )
  );
}

export default ChallengePage;
