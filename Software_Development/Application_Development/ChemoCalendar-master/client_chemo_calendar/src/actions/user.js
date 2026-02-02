import client from '../client';
import config from '../config';
import {toastr} from 'react-redux-toastr';

import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const SEND_OTP = 'SEND_OTP';
export const OTP_SEND_SUCCESS = 'OTP_SEND_SUCCESS';
export const OTP_SEND_FAILURE = 'OTP_SEND_FAILURE';

export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const SAVE_PASSWORD_SUCCESS = 'SAVE_PASSWORD_SUCCESS';


export const LOGOUT = 'LOGOUT';

export const login = (payload) => {
  return (dispatch) => {
      dispatch({
          type: LOGIN_USER,
          payload: {}
      });
      dispatch(showLoading());
      client().post(`${config.backendAPI}/user/login`, payload).then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data.data));
          dispatch({
              type: LOGIN_USER_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
      }).catch((error) => {
          dispatch({
              type: LOGIN_USER_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
      });
  };
};

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('user');
        dispatch({
            type: LOGOUT,
            payload: {
                data: null
            }
        })
    }
}

export const fetchAllUsers = (hospitalId) => {
    const payload = {
        hospitalId
    }
    return (dispatch, getState) => {
        if(getState().get('user').toJS().all && getState().get('user').toJS().all.length) {
            return true;
        }
        dispatch({
            type: FETCH_USERS,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/user/all`, payload).then((res) => {
        toastr.success('Successfully loaded all the users');
          dispatch({
              type: FETCH_USERS_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Failed to get the users list');
          dispatch({
              type: FETCH_USERS_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};

export const createUser = (payload) => {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_USER,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/user/create`, payload).then((res) => {
          toastr.success('Successfully created the user');
          dispatch({
              type: CREATE_USER_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Please fill in all the fields');
          dispatch({
              type: CREATE_USER_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
  };
  
export const sendOtp = (payload) => {
    return (dispatch, getState) => {
        dispatch({
            type: SEND_OTP,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/user/sendOtp`, payload).then((res) => {
          toastr.success('Successfully sent OTP');
          dispatch({
              type: OTP_SEND_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Please fill in all the fields');
          dispatch({
              type: CREATE_USER_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
  };
  
export const savePassword = (payload) => {
    return (dispatch, getState) => {
        dispatch({
            type: SAVE_PASSWORD,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/user/savePassword`, payload).then((res) => {
          toastr.success('Successfully Updated');
          dispatch({
              type: SAVE_PASSWORD_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Please fill in all the fields');
          dispatch({
              type: CREATE_USER_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
  };