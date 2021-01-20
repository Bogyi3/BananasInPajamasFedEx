/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { logOutAction } from '../../actions/loginActions';
import './NavBar.css';

function NavBar() {
  const loginData = useSelector((state) => state.login);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logOutAction());
  }

  return (
    <>
      <div className="navBar">
        <div className="navBarTitle">
          <h1>ChallengeAcceptApp</h1>
        </div>
        {!loginData.username && (
        <div className="navBarButtons">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              SIGN IN
            </Button>
          </Link>
          <Link to="/registration" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              REGISTER
            </Button>
          </Link>
        </div>
        )}
        {loginData.username && (
        <div className="navBarLogos">
          <Link to="/" style={{ textDecoration: 'none' }}><i onClick={() => logout()} className="fas fa-sign-out-alt fa-lg" /></Link>
        </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
