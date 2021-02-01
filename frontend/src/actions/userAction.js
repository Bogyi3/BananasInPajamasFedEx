import generalFetch from '../utilities/generalFetch';
import {
  LOADING_STARTED,
  USERS_FETCH_FAIL,
  USERS_FETCH_SUCCESS,
} from './types';

export const loadingStartedAction = () => ({
  type: LOADING_STARTED,
});

export const setFetchSuccessAction = (data) => ({
  type: USERS_FETCH_SUCCESS,
  payload: data,
});

export const setFetchFailAction = (errorMessage) => ({
  type: USERS_FETCH_FAIL,
  payload: errorMessage,
});

export const getUsers = () => (dispatch) => {
  try {
    dispatch(loadingStartedAction());
    return generalFetch('allUsers', 'GET').then((data) => dispatch(setFetchSuccessAction(data.response.results)));
  } catch (error) {
    dispatch(setFetchFailAction({ error: `There was an error: ${error.message}. Please try again!` }));
    return null;
  }
};
