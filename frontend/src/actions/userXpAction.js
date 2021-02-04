import generalFetch from '../utilities/generalFetch';
import {
  XP_LOADING_STARTED,
  XP_FETCH_FAIL,
  XP_FETCH_SUCCESS,
} from './types';

export const loadingStartedAction = () => ({
  type: XP_LOADING_STARTED,
});

export const setFetchSuccessAction = (data) => ({
  type: XP_FETCH_SUCCESS,
  payload: data,
});

export const setFetchFailAction = (errorMessage) => ({
  type: XP_FETCH_FAIL,
  payload: errorMessage,
});

export const getUserXp = (username) => (dispatch) => {
  try {
    dispatch(loadingStartedAction());
    return generalFetch(`experience/${username}`, 'GET').then((data) => dispatch(setFetchSuccessAction(data.response.results[0].user_xp)));
  } catch (error) {
    dispatch(setFetchFailAction({ error: `There was an error: ${error.message}. Please try again!` }));
    return null;
  }
};
