import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// TODO import NavBar from './components/NavBar/NavBar'; navbar component between Router & Switch
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CommitmentPage from './pages/CommitmentPage/CommitmentPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/commitments" render={() => <CommitmentPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
