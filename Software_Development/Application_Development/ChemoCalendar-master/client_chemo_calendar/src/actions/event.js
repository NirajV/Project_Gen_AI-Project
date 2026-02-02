import client from '../client';
import {toastr} from 'react-redux-toastr';
import config from '../config';

import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const FETCH_EVENT = 'FETCH_EVENT_EVENT';
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';

export const FETCH_ALL_EVENTS = 'FETCH_ALL_EVENTS';
export const FETCH_ALL_EVENTS_SUCCESS = 'FETCH_ALL_EVENTS_SUCCESS';
export const FETCH_ALL_EVENTS_FAILURE = 'FETCH_ALL_EVENTS_FAILURE';

export const FETCH_FILTERED_EVENTS = 'FETCH_FILTERED_EVENTS';
export const FETCH_FILTERED_EVENTS_SUCCESS = 'FETCH_FILTERED_EVENTS_SUCCESS';
export const FETCH_FILTERED_EVENTS_FAILURE = 'FETCH_FILTERED_EVENTS_FAILURE';

export const UPDATE_EVENT = 'UPDATE_EVENT';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

export const REVERT_UPDATE_EVENT = 'REVERT_UPDATE_EVENT';
export const REVERT_UPDATE_EVENT_SUCCESS = 'REVERT_UPDATE_EVENT_SUCCESS';
export const REVERT_UPDATE_EVENT_FAILURE = 'REVERT_UPDATE_EVENT_FAILURE';

export const CREATE_EVENT_NOTE = 'CREATE_EVENT_NOTE';
export const CREATE_EVENT_NOTE_SUCCESS = 'CREATE_EVENT_NOTE_SUCCESS';
export const CREATE_EVENT_NOTE_FAILURE = 'CREATE_EVENT_NOTE_FAILURE';

export const FETCH_ALL_EVENT_NOTES = 'FETCH_ALL_EVENT_NOTES';
export const FETCH_ALL_EVENT_NOTES_SUCCESS = 'FETCH_ALL_EVENT_NOTES_SUCCESS';
export const FETCH_ALL_EVENT_NOTES_FAILURE = 'FETCH_ALL_EVENT_NOTES_FAILURE';

export const EVENT_EMAIL_SUCCESS = 'EVENT_EMAIL_SUCCESS';

export const CLEAR_EVENT = 'CLEAR_EVENT';

export const createEvent = (payload) => {
  return (dispatch, getState) => {
      const user = getState().getIn(['user', 'data']);
      const newPayload = payload.set('userId', user._id || user.get('_id'));
      dispatch({
          type: CREATE_EVENT,
          payload: {}
      });
      dispatch(showLoading());
      client().post(`${config.backendAPI}/event/create`, newPayload).then((res) => {
        toastr.success('Successfully created the event');
        dispatch({
            type: CREATE_EVENT_SUCCESS,
            payload: res.data
        });
        dispatch(hideLoading());
        
      }).catch((error) => {
        toastr.error('Please fill in all the fields');
        dispatch({
            type: CREATE_EVENT_FAILURE,
            payload: error
        });
        dispatch(hideLoading());
      });
  };
};

export const fetchEventById = (payload) => {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_EVENT,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/event/one`, payload).then((res) => {
          dispatch({
              type: FETCH_EVENT_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Event not found, Please navigate to the proper regime');
          dispatch({
              type: FETCH_EVENT_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};

export const fetchAllEvents = (userId) => {
    const payload = {
        userId
    }
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_ALL_EVENTS,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/event/all`, payload).then((res) => {
          dispatch({
              type: FETCH_ALL_EVENTS_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Failed to get the regime list');
          dispatch({
              type: FETCH_ALL_EVENTS_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};

export const fetchFilteredEvents = (payload) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_FILTERED_EVENTS,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/event/filter`, payload).then((res) => {
          dispatch({
              type: FETCH_FILTERED_EVENTS_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Failed to get filtered regime list');
          dispatch({
              type: FETCH_FILTERED_EVENTS_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};

export const clearEvent = (payload) => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_EVENT,
            payload
        })
    }
}

export const updateEvent = (payload, successMessage) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_EVENT,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/event/update`, payload).then((res) => {
        toastr.success(successMessage);
          dispatch({
              type: UPDATE_EVENT_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Failed to update the regime');
          dispatch({
              type: UPDATE_EVENT_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};

export const revertUpdateEvent = (payload, successMessage) => {
    return (dispatch, getState) => {
        dispatch({
            type: REVERT_UPDATE_EVENT,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/event/update`, payload).then((res) => {
        toastr.success(successMessage);
          dispatch({
              type: REVERT_UPDATE_EVENT_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Failed to update the regime');
          dispatch({
              type: REVERT_UPDATE_EVENT_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};

export const createEventNote = (payload) => {
    return (dispatch, getState) => {
        const user = getState().getIn(['user', 'data']);
        const event = getState().getIn(['event', 'data']);
        let newPayload = payload.set('userId', user._id || user.get('_id'));
        newPayload = newPayload.set('eventId', event._id || event.get('_id'));
        dispatch({
            type: CREATE_EVENT_NOTE,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/note/create`, newPayload).then((res) => {
          toastr.success('Successfully added new note');
          dispatch(fetchNotesByEventId({eventId: event._id || event.get('_id')}));
		  
          
        }).catch((error) => {
          toastr.error('Please fill in all the fields');
          dispatch({
              type: CREATE_EVENT_NOTE_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
  };
  
export const updateEventNote = (payload) => {
    return (dispatch, getState) => {
        const user = getState().getIn(['user', 'data']);
        const event = getState().getIn(['event', 'data']);
        
        dispatch(showLoading());
        client().post(`${config.backendAPI}/note/update`, payload).then((res) => {
          toastr.success('Successfully updated note');
          dispatch(fetchNotesByEventId({eventId: event._id || event.get('_id')}));
		  
          
        }).catch((error) => {
          toastr.error('Please fill in all the fields');
          dispatch({
              type: CREATE_EVENT_NOTE_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
  };

export const fetchNotesByEventId = (payload) => {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_ALL_EVENT_NOTES,
            payload: {}
        });
        dispatch(showLoading());
        client().post(`${config.backendAPI}/note/all`, payload).then((res) => {
          dispatch({
              type: FETCH_ALL_EVENT_NOTES_SUCCESS,
              payload: res.data
          });
          dispatch(hideLoading());
          
        }).catch((error) => {
          toastr.error('Notes not found');
          dispatch({
              type: FETCH_ALL_EVENT_NOTES_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
};

export const removeEventNote = (payload) => {
    return (dispatch, getState) => {
		const event = getState().getIn(['event', 'data']);
		
        dispatch(showLoading());
        client().post(`${config.backendAPI}/note/remove`, payload).then((res) => {
          toastr.success('Successfully removed note');
          dispatch(fetchNotesByEventId({eventId: event._id || event.get('_id')}));
		  
          
        }).catch((error) => {
          toastr.error('Please fill in all the fields');
          dispatch({
              type: CREATE_EVENT_NOTE_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
  };

  export const sendEmail = (email, emailFile, eventName, patientName, beginDate, viewType) => {
    return (dispatch, getState) => {
		const event = getState().getIn(['event', 'data']);
		var formData = new FormData();
        formData.append('pdf', emailFile);
		formData.append('emailId', email);
		formData.append('eventName', eventName);
		formData.append('patientName', patientName);
		formData.append('beginDate', beginDate);
		formData.append('viewType', viewType);
        dispatch(showLoading());
        client().post(`${config.backendAPI}/event/sendFile`, formData).then((res) => {
          toastr.success('Successfully sent');		  
          dispatch({
              type: FETCH_EVENT,
              payload: {}
          });
          dispatch(hideLoading());
        }).catch((error) => {
          toastr.error('Please fill in all the fields');
          dispatch({
              type: CREATE_EVENT_NOTE_FAILURE,
              payload: error
          });
          dispatch(hideLoading());
        });
    };
  };