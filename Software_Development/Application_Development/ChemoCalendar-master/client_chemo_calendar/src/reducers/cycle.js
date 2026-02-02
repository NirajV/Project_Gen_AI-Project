import { Map } from 'immutable';
import {
  CREATE_CYCLE,
  CREATE_CYCLE_SUCCESS,
  CREATE_CYCLE_FAILURE,
  FETCH_ALL_CYCLES,
  FETCH_ALL_CYCLES_FAILURE,
  FETCH_ALL_CYCLES_SUCCESS,
  FETCH_ALL_FAVORITE_EVENTS,
  FETCH_ALL_FAVORITE_EVENTS_FAILURE,
  FETCH_ALL_FAVORITE_EVENTS_SUCCESS
} from '../actions/cycle';

const intitalState = Map({
  data: null,
  isLoading: false,
  hasError: false,
  errorCode: null,
  all: null,
  allEvents: null
});

const user = (state = intitalState, action = {}) => {
  switch (action.type) {
    case CREATE_CYCLE: return state.merge({ isLoading: true });
    case CREATE_CYCLE_SUCCESS: return state.merge({ isLoading: false, data: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case CREATE_CYCLE_FAILURE: return state.merge({ isLoading: false, data: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    case FETCH_ALL_CYCLES: return state.merge({ isLoading: true, all: null });
    case FETCH_ALL_CYCLES_SUCCESS: return state.merge({ isLoading: false, all: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case FETCH_ALL_CYCLES_FAILURE: return state.merge({ isLoading: false, all: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    case FETCH_ALL_FAVORITE_EVENTS: return state.merge({ isLoading: true });
    case FETCH_ALL_FAVORITE_EVENTS_SUCCESS: return state.merge({ isLoading: false, allEvents: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case FETCH_ALL_FAVORITE_EVENTS_FAILURE: return state.merge({ isLoading: false, allEvents: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    default: return state;
  }
}

export default user;