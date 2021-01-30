import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import './LandingPage.css';

function LandingPage() {
  const loginData = useSelector((state) => state.login);
  const history = useHistory();

  useEffect(() => {
    if (loginData.userType === 'admin') {
      history.push('/challenge');
    }
  });

  return (
    <div>
      {!loginData.username ? (
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
      )
        : <div>Current challenge:</div>}
    </div>
  );
}

export default LandingPage;
