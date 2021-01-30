import generalFetch from '../utilities/generalFetch';
import {
  LOADING_STARTED,
  FETCH_FAIL,
  FETCH_SUCCESS,
} from './types';

export const loadingStartedAction = () => ({
  type: LOADING_STARTED,
});

export const setFetchSuccessAction = (data) => ({
  type: FETCH_SUCCESS,
  payload: data,
});

export const setFetchFailAction = (errorMessage) => ({
  type: FETCH_FAIL,
  payload: errorMessage,
});

export const getChallenge = () => (dispatch) => {
  try {
    dispatch(loadingStartedAction());
    return generalFetch('challenge', 'GET').then((data) => dispatch(setFetchSuccessAction(data.results)));
  } catch (error) {
    dispatch(setFetchFailAction({ error: `There was an error: ${error.message}. Please try again!` }));
    return null;
  }
};
