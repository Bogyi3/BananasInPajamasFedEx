import {
  XP_LOADING_STARTED,
  XP_FETCH_FAIL,
  XP_FETCH_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: '',
  userXp: 0,
};

const userXpReducer = (state = initialState, action) => {
  switch (action.type) {
    case XP_LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };

    case XP_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        userXp: action.payload,
        errorMessage: '',
      };

    case XP_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        userXp: 0,
        errorMessage: action.payload.error,
      };

    default: return state;
  }
};

export default userXpReducer;
