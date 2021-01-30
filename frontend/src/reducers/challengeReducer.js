import {
  LOADING_STARTED,
  FETCH_FAIL,
  FETCH_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: '',
  challenge: '',
};

const challengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        challenge: action.payload,
        errorMessage: '',
      };

    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        challenge: null,
        errorMessage: action.payload.error,
      };

    default: return state;
  }
};

export default challengeReducer;
