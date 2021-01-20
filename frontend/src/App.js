import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CommitmentPage from './pages/CommitmentPage/CommitmentPage';
import ChallengePage from './pages/ChallengePage/ChallengePage';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/commitments" render={() => <CommitmentPage />} />
          <Route exact path="/challenge" render={() => <ChallengePage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
