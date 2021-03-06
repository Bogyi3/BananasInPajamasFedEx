/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { logOutAction } from '../../actions/loginActions';
import { getChallenge } from '../../actions/challengeAction';
import { getUserXp } from '../../actions/userXpAction';
import './NavBar.css';

function NavBar() {
  const loginData = useSelector((state) => state.login);
  const challengeData = useSelector((state) => state.challenge.challenge[0]);
  const userXp = useSelector((state) => state.userXp.userXp);
  const [xpWidth, setXpWidth] = useState(0);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  function logout() {
    dispatch(logOutAction());
  }

  function getChallengeData() {
    dispatch(getChallenge());
  }

  function getLoggedUserXp() {
    if (loginData.username) {
      dispatch(getUserXp(loginData.username));
    }
  }

  useEffect(() => {
    getLoggedUserXp();
    getChallengeData();
  }, [dispatch, loginData.username]);

  useEffect(() => {
    if (userXp && loginData.userType !== 'admin') {
      setXpWidth(Math.min(100, ((userXp / challengeData.minXp) * 100)));
    } else {
      setXpWidth(0);
    }
  }, [dispatch, userXp]);

  return (
    <>
      <div className="navBar">
        <div className="navBarTitle">
          <Link to="/"><h1>Resolute</h1></Link>
        </div>
        {
          loginData.username && (
            <div className="user-data">
              <h3>{loginData.username}</h3>
              {challengeData && (
                <>
                  <p className="xp-text">
                    {userXp}
                    /
                    {challengeData.minXp}
                  </p>
                  <div className="overall-xp">
                    <div className="user-xp" style={{ width: `${xpWidth / 3}vw` }} />
                  </div>
                </>
              )}
            </div>
          )
        }
        {!loginData.username && (
        <div className="navBarButtons">
          <Link to="/login" styles={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              SIGN IN
            </Button>
          </Link>
          <Link to="/registration" styles={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              REGISTER
            </Button>
          </Link>
        </div>
        )}
        {loginData.username && (
        <div className="navBarLogos">
          <Link to="/" styles={{ textDecoration: 'none' }}><i onClick={() => logout()} className="fas fa-sign-out-alt fa-lg" /></Link>
        </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
