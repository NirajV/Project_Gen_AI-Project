import { Map } from 'immutable';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS
} from '../actions/user';

let persistedUser = localStorage.getItem('user') || null;
persistedUser = typeof persistedUser === 'string' && JSON.parse(persistedUser);

const intitalState = Map({
  data: persistedUser,
  isLoading: false,
  hasError: false,
  errorCode: null,
  all: [],
  userMap: {}
});

const user = (state = intitalState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER: return state.merge({ isLoading: true });
    case LOGIN_USER_SUCCESS: return state.merge({ isLoading: false, data: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case LOGIN_USER_FAILURE: return state.merge({ isLoading: false, data: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case FETCH_USERS: return state.merge({ isLoading: true });
    case FETCH_USERS_SUCCESS: {
      var obj = { isLoading: false, all: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode, userMap:{} }
      obj.all.map((user, userIndex) => {
        obj.userMap[user._id] = user;
      });
      return state.merge(obj);
    }
    case FETCH_USERS_FAILURE: return state.merge({ isLoading: false, all: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case LOGOUT: return state.merge({ data: action.payload.data });
    default: return state;
  }
}

export default user;