import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenge } from '../../actions/challengeAction';

function ChallengeData({ handleAddCommitment, challengeData }) {
  return (
    <div>
      <div className="challenge-card">
        <h1>{challengeData.challengeName}</h1>
        <p>{challengeData.startingDate.slice(0, 10)}</p>
        <p>-</p>
        <p>{challengeData.closingDate.slice(0, 10)}</p>
        <p>Challengers: 97</p>
      </div>
      <div className="commitments">

        <button type="button" onClick={handleAddCommitment}>Add commitments</button>
      </div>
      <button type="button">Show Challengers</button>
      <button type="button">Delete Challenge</button>
    </div>
  );
}

export default ChallengeData;
