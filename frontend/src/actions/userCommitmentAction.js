import generalFetch from '../utilities/generalFetch';
import {
  LOADING_STARTED,
  COMMITMENT_FETCH_FAIL,
  COMMITMENT_FETCH_SUCCESS,
} from './types';

export const loadingStartedAction = () => ({
  type: LOADING_STARTED,
});

export const setCommitmentFetchSuccessAction = (data) => ({
  type: COMMITMENT_FETCH_SUCCESS,
  payload: data,
});

export const setCommitmentFetchFailAction = (errorMessage) => ({
  type: COMMITMENT_FETCH_FAIL,
  payload: errorMessage,
});

export const getCommitments = () => (dispatch) => {
  try {
    dispatch(loadingStartedAction());
    return generalFetch('challenge-commitment', 'GET').then((data) => dispatch(setCommitmentFetchSuccessAction(data.response.results)));
  } catch (error) {
    dispatch(setCommitmentFetchFailAction({ error: `There was an error: ${error.message}. Please try again!` }));
    return null;
  }
};
