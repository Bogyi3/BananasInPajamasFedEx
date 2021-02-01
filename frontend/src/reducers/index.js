import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import challengeReducer from './challengeReducer';
import commitmentReducer from './commitmentReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  challenge: challengeReducer,
  commitments: commitmentReducer,
  users: usersReducer,
});

export default rootReducer;
