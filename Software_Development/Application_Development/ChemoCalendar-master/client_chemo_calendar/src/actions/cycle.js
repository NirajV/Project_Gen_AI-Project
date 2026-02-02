import client from '../client';
import {toastr} from 'react-redux-toastr';
import config from '../config';

import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const CREATE_CYCLE = 'CREATE_CYCLE';
export const CREATE_CYCLE_SUCCESS = 'CREATE_CYCLE_SUCCESS';
export const CREATE_CYCLE_FAILURE = 'CREATE_CYCLE_FAILURE';

export const FETCH_ALL_CYCLES = 'FETCH_ALL_CYCLES';
export const FETCH_ALL_CYCLES_SUCCESS = 'FETCH_ALL_CYCLES_SUCCESS';
export const FETCH_ALL_CYCLES_FAILURE = 'FETCH_ALL_CYCLES_FAILURE';

export const FETCH_ALL_FAVORITE_EVENTS = 'FETCH_ALL_FAVORITE_EVENTS';
export const FETCH_ALL_FAVORITE_EVENTS_SUCCESS = 'FETCH_ALL_FAVORITE_EVENTS_SUCCESS';
export const FETCH_ALL_FAVORITE_EVENTS_FAILURE = 'FETCH_ALL_FAVORITE_EVENTS_FAILURE';

export const createCycle = (payload) => {
  return (dispatch, getState) => {
      const user = getState().getIn(['user', 'data']);
      const newPayload = payload;
      dispatch({
          type: CREATE_CYCLE,
          payload: {}
      });
      dispatch(showLoading());
      client().post(`${config.backendAPI}/cycle/create`, newPayload).then((res) => {
        toastr.success('Successfully created the cycle');
        dispatch({
            type: CREATE_CYCLE_SUCCESS,
            payload: res.data
        });
        dispatch(fetchAllFavoriteEvents(user._id));
        dispatch(hideLoading());
      }).catch((error) => {
        toastr.error('Please fill in all the fields');
        dispatch({
            type: CREATE_CYCLE_FAILURE,
            payload: error
        });
        dispatch(hideLoading());
      });
  };
};

export const fetchAllCycles = (payload) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_ALL_CYCLES,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/cycle/eventName`, payload).then((res) => {
          dispatch({
              type: FETCH_ALL_CYCLES_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          toastr.success('Loaded all favorite cycles');
        }).catch((error) => {
          toastr.error('Failed to get the cycle list');
          dispatch({
              type: FETCH_ALL_CYCLES_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};

export const fetchAllFavoriteEvents = (hospitalId) => {
    const payload = {
        hospitalId
    }
    return (dispatch) => {
        dispatch({
            type: FETCH_ALL_FAVORITE_EVENTS,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/cycle/allFavoriteEvent`, payload).then((res) => {
          dispatch({
              type: FETCH_ALL_FAVORITE_EVENTS_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          toastr.success('Loaded all favorite Regime');
        }).catch((error) => {
          toastr.error('Failed to get the favorite Regime list');
          dispatch({
              type: FETCH_ALL_FAVORITE_EVENTS_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};
