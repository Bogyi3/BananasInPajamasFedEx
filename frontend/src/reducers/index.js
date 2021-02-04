import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import challengeReducer from './challengeReducer';
import commitmentReducer from './commitmentReducer';
import usersReducer from './usersReducer';
import userXpReducer from './userXpReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  challenge: challengeReducer,
  commitments: commitmentReducer,
  users: usersReducer,
  userXp: userXpReducer,
});

export default rootReducer;
