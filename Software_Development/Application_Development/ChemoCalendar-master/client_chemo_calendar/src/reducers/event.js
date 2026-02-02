import { Map } from 'immutable';
import {
  CREATE_EVENT,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  FETCH_EVENT,
  FETCH_EVENT_FAILURE,
  FETCH_EVENT_SUCCESS,
  CLEAR_EVENT,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  REVERT_UPDATE_EVENT,
  REVERT_UPDATE_EVENT_SUCCESS,
  REVERT_UPDATE_EVENT_FAILURE,
  FETCH_ALL_EVENTS,
  FETCH_ALL_EVENTS_FAILURE,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_FILTERED_EVENTS, 
  FETCH_FILTERED_EVENTS_SUCCESS,
  FETCH_FILTERED_EVENTS_FAILURE,
  FETCH_ALL_EVENT_NOTES,
  FETCH_ALL_EVENT_NOTES_FAILURE,
  FETCH_ALL_EVENT_NOTES_SUCCESS,
  CREATE_EVENT_NOTE,
  CREATE_EVENT_NOTE_SUCCESS,
  CREATE_EVENT_NOTE_FAILURE,
  EVENT_EMAIL_SUCCESS
} from '../actions/event';

const intitalState = Map({
  data: null,
  notes: null,
  isLoading: false,
  hasError: false,
  errorCode: null,
  all: null
});

const user = (state = intitalState, action = {}) => {
  switch (action.type) {
    case CREATE_EVENT: return state.merge({ isLoading: true });
    case CREATE_EVENT_SUCCESS: return state.merge({ isLoading: false, data: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case CREATE_EVENT_FAILURE: return state.merge({ isLoading: false, data: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    case FETCH_EVENT: return state.merge({ isLoading: true });
    case FETCH_EVENT_SUCCESS: return state.merge({ isLoading: false, data: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case FETCH_EVENT_FAILURE: return state.merge({ isLoading: false, data: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    case FETCH_ALL_EVENTS: return state.merge({ isLoading: true });
    case FETCH_ALL_EVENTS_SUCCESS: return state.merge({ isLoading: false, all: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case FETCH_ALL_EVENTS_FAILURE: return state.merge({ isLoading: false, all: state.get('all'), hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    case FETCH_FILTERED_EVENTS: return state.merge({ isLoading: true });
    case FETCH_FILTERED_EVENTS_SUCCESS: return state.merge({ isLoading: false, all: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case FETCH_FILTERED_EVENTS_FAILURE: return state.merge({ isLoading: false, all: state.get('all'), hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    case UPDATE_EVENT: return state.merge({ isLoading: true });
    case UPDATE_EVENT_SUCCESS: return state.merge({ isLoading: false, data: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case UPDATE_EVENT_FAILURE: return state.merge({ isLoading: false, data: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    case REVERT_UPDATE_EVENT: return state.merge({ isLoading: true });
    case REVERT_UPDATE_EVENT_SUCCESS: return state.merge({ isLoading: false, data: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
    case REVERT_UPDATE_EVENT_FAILURE: return state.merge({ isLoading: false, data: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });

    case FETCH_ALL_EVENT_NOTES: return state;
    case FETCH_ALL_EVENT_NOTES_SUCCESS: return state.merge({ notes: action.payload.data });
    case FETCH_ALL_EVENT_NOTES_FAILURE: return state.merge({ notes: action.payload });
	
	case CREATE_EVENT_NOTE: return state;
	case CREATE_EVENT_NOTE_SUCCESS: return state.merge({ isLoading: false, notes: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
	case CREATE_EVENT_NOTE_FAILURE: return state.merge({ isLoading: false, data: null, hasError: action.payload.hasError, errorCode: action.payload.errorCode });

	case EVENT_EMAIL_SUCCESS: return state.merge({ isLoading: false, data: action.payload.data, hasError: action.payload.hasError, errorCode: action.payload.errorCode });
	
    case CLEAR_EVENT: {
      return state.merge({ data: null });
    }
    default: return state;
  }
}

export default user;