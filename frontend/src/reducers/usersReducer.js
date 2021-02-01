import {
  LOADING_STARTED,
  USERS_FETCH_FAIL,
  USERS_FETCH_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: '',
  users: '',
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };

    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        errorMessage: '',
      };

    case USERS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        users: null,
        errorMessage: action.payload.error,
      };

    default: return state;
  }
};

export default usersReducer;
