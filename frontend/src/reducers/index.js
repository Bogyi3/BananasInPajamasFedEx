import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import challengeReducer from './challengeReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  challenge: challengeReducer,
});

export default rootReducer;
