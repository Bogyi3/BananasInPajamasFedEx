/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenge } from '../../actions/challengeAction';
import { getCommitments } from '../../actions/commitmentAction';
import { getUserXp } from '../../actions/userXpAction';
import './commitmentPage.css';
import Arrow from '../../assets/drop-menu-arrow.png';
import generalFetch from '../../utilities/generalFetch';
import deleteImage from '../../assets/delete-x.png';
import completeImage from '../../assets/complete-check.png';
import Modal from '../../components/Modal/Modal';

function CommitmentPage() {
  const [showCompletedMenu, setShowCompletedMenu] = useState(false);
  const [userCommitments, setUserCommitments] = useState('');
  const [challengeDays, setChallengeDays] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const userData = useSelector((state) => state.login);
  const challengeData = useSelector((state) => state.challenge.challenge[0]);
  const commitments = useSelector((state) => state.commitments.commitments);
  const userXp = useSelector((state) => state.userXp.userXp);
  const [modalComponent, setModalComponent] = useState('');
  const [currentModalDay, setCurrentModalDay] = useState(0);
  const [buttonPushes, setButtonPushes] = useState(0);

  const dispatch = useDispatch();

  function getCurrChallenge() {
    dispatch(getChallenge(dispatch));
  }

  function getCommitmentList() {
    dispatch(getCommitments(dispatch));
  }

  function getModalComponents() {
    const modalCommitments = [];
    commitments.forEach((commitment) => {
      modalCommitments.push({
        id: commitment.id,
        name: commitment.commitmentName,
        xp: commitment.xp,
      });
    });
    setModalComponent(modalCommitments);
  }

  function calculateDays() {
    let startingDate = challengeData.startingDate.slice(0, 10).split('-');
    startingDate = `${startingDate[1]}/${startingDate[2]}/${startingDate[0]}`;
    startingDate = new Date(startingDate);
    let closingDate = challengeData.closingDate.slice(0, 10).split('-');
    closingDate = `${closingDate[1]}/${closingDate[2]}/${closingDate[0]}`;
    closingDate = new Date(closingDate);
    const diffTime = Math.abs(closingDate - startingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = [];
    for (let i = 1; i <= diffDays; i += 1) {
      days.push({
        day: i, commitment: 'Set commitment', xp: '', id: 0,
      });
    }
    setChallengeDays(days);
  }

  async function getAllCommitments() {
    const result = await generalFetch('commitment', 'GET', undefined, userData.token);

    setUserCommitments(result.response.results);
  }

  useEffect(() => {
    dispatch(getUserXp(userData.username));
  }, [dispatch, buttonPushes]);

  useEffect(() => {
    getCurrChallenge();
    getCommitmentList();
    getAllCommitments();
    calculateDays();
  }, [dispatch]);

  useEffect(() => {
    if (commitments) {
      getModalComponents();
    }
  }, [commitments, buttonPushes]);

  function toggleCompletedMenu(e) {
    e.preventDefault();
    if (showCompletedMenu) {
      setShowCompletedMenu(false);
    } else {
      setShowCompletedMenu(true);
    }
  }

  async function setDayData(id, commitment, xp) {
    const bodyData = {
      commitmentId: id,
      challengeDay: currentModalDay,
    };
    await generalFetch('commitment', 'POST', bodyData, userData.token);
    await getAllCommitments();
    challengeDays[currentModalDay - 1].commitment = commitment;
    challengeDays[currentModalDay - 1].xp = xp;
    challengeDays[currentModalDay - 1].id = userCommitments[userCommitments.length - 1].id + 1;

    setModalStatus(false);
  }

  function handleSetCommitmentClick(day) {
    if (challengeDays[day - 1].commitment === 'Day completed!') {
      challengeDays[day - 1].commitment = 'You are already Done! :)';
    } else if (challengeDays[day - 1].commitment === 'You are already Done! :)') {
      challengeDays[day - 1].commitment = 'Day completed!';
    } else {
      setCurrentModalDay(day);
      setModalStatus(true);
      console.log(challengeDays);
    }
    setButtonPushes(buttonPushes + 1);
  }

  function handleDeleteCommitmentClick(day) {
    const days = challengeDays;
    days[day - 1].commitment = 'Set commitment';
    days[day - 1].xp = 0;
    setChallengeDays(days);
    setButtonPushes(buttonPushes + 1);
  }

  async function handleCompleteCommitmentClick(day, id) {
    const days = challengeDays;
    if (days[day - 1].commitment !== 'Set commitment') {
      const bodyData = {
        xp: days[day - 1].xp,
        username: userData.username,
      };
      await generalFetch('experience', 'PUT', bodyData, userData.token);
      days[day - 1].commitment = 'Day completed!';
      days[day - 1].xp = 0;
      await generalFetch(`commitment/${id}`, 'PUT', undefined, userData.token);
    } else {
      console.log('this wont work');
    }
    setButtonPushes(buttonPushes + 1);
  }

  return (
    <div id="commitment-page">
      {
        modalStatus
          && (
          <Modal
            closeModal={() => setModalStatus(false)}
            headerText="Choose A Commitment"
            Component={(
              <ul className="modal-list">
                { modalComponent && (
                  modalComponent.map((commitment, index) => (
                    <li key={index} className="modal-list-item">
                      <button
                        type="button"
                        onClick={() => setDayData(commitment.id, commitment.name, commitment.xp)}
                        className="modal-button"
                      >
                        {commitment.name}
                        ,
                        {' '}
                        {commitment.xp}
                        XP
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          />
          )
      }
      <div className="drop-down-item user-commitments">
        <button type="button" onClick={toggleCompletedMenu} onKeyDown={toggleCompletedMenu}>
          <div className="drop-down-header">
            <img className={showCompletedMenu ? 'rotated-arrow arrow-down' : 'arrow-down'} src={Arrow} alt="drop down menu" />
            <h1>Completed commitments</h1>
          </div>
        </button>
        <div className={showCompletedMenu ? 'toggle' : 'hidden'}>
          <div className="commitment-item">
            <div className="completion-date">Date</div>
            <div className="commitment-name header-name">Name of Activity</div>
            <div className="commitment-xp">XP</div>
          </div>
          {
            userCommitments === undefined || userCommitments === ''
              ? <div>Please Sign in again</div>
              : (userCommitments.map((commitment, index) => (
                <div key={index} className="commitment-item">
                  <div className="completion-date">{commitment.challengeDay}</div>
                  <div className="commitment-name header-name">{commitment.commitmentId}</div>
                  <div className="commitment-xp">{commitment.userId}</div>
                </div>
              )))
          }
        </div>

        <div className="ongoing-commitments">
          <h1>Challenge Days</h1>
          <div className="ongoing-items">
            {
              !challengeDays || challengeDays === ''
                ? <div>Loading days</div>
                : challengeDays.map((day, index) => (
                  <div key={index} className="commitment-item">
                    <div className="commitment-date">
                      Day
                      {' '}
                      {day.day}
                      .
                    </div>
                    <button
                      type="button"
                      className="commit-button"
                      onClick={() => handleSetCommitmentClick(day.day)}
                    >
                      {day.commitment}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCommitmentClick(day.day)}
                    >
                      <img
                        src={deleteImage}
                        alt="delete commitment"
                        className="delete-image"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCompleteCommitmentClick(day.day, day.id)}
                    >
                      <img
                        src={completeImage}
                        alt="complete commitment"
                        className="complete-image"
                      />
                    </button>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommitmentPage;
