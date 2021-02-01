import {
  LOADING_STARTED,
  COMMITMENT_FETCH_FAIL,
  COMMITMENT_FETCH_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: '',
  commitments: '',
};

const commitmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };

    case COMMITMENT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        commitments: action.payload,
        errorMessage: '',
      };

    case COMMITMENT_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        commitments: null,
        errorMessage: action.payload.error,
      };

    default: return state;
  }
};

export default commitmentReducer;
