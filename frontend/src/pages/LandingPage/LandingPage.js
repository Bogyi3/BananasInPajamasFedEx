import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { getChallenge } from '../../actions/challengeAction';
import './LandingPage.css';

function LandingPage() {
  const loginData = useSelector((state) => state.login);
  const challengeData = useSelector((state) => state.challenge.challenge[0]);
  const history = useHistory();

  const dispatch = useDispatch();

  function getCurrChallenge() {
    dispatch(getChallenge(dispatch));
  }

  useEffect(() => {
    getCurrChallenge();
  }, [dispatch]);

  useEffect(() => {
    if (loginData.userType === 'admin') {
      history.push('/challenge');
    }
  });

  return (
    <div>
      {!loginData.username && (
        <div className="landingPage page">
          <Typography color="secondary" variant="h1">Welcome to Resolute!</Typography>
          <div className="instruction">
            <Typography color="secondary" variant="h3">Please, </Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" size="small">
                SIGN IN
              </Button>
            </Link>
            <Typography color="secondary" variant="h3">or</Typography>
            <Link to="/registration" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" size="medium">
                REGISTER
              </Button>
            </Link>
            <Typography color="secondary" variant="h3">to continue.</Typography>
          </div>
        </div>
      )}
      {challengeData === undefined || !loginData.username
        ? ''
        : (
          <div className="current-challenge">
            <h1 className="challenge-name">
              {challengeData.challengeName}
            </h1>
            <p className="starting-date">
              Start:
              {' '}
              {challengeData.startingDate.slice(0, 10)}
            </p>
            <p className="closing-date">
              End:
              {' '}
              {challengeData.closingDate.slice(0, 10)}
            </p>
            <p className="current-xp">
              {loginData.userData.userXp}
              {' '}
              /
              {' '}
              {challengeData.minXp}
              {' '}
              XP
            </p>
            <button type="button" onClick={() => history.push('/commitments')} className="hover-image">
              <h1>Enter Challenge!</h1>
            </button>
          </div>
        )}
    </div>
  );
}

export default LandingPage;
