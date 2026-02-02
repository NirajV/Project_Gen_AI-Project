import ViewEvent from '../components/pages/ViewEvent';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';
import { fetchEventById, clearEvent, updateEvent, fetchNotesByEventId } from '../actions/event';
import { undo, redo, clear } from '../actions/undo-redo';

const mapStateToProps = (state, props) => {
    return { 
        user: state.getIn(['user', 'data']),
        translate: getTranslate(state.get('locale')),
        event: state.getIn(['event', 'data']),
        notes: state.getIn(['event', 'notes']),
        canUndo: state.get('undoHistory').undoQueue.length > 0,
        canRedo: state.get('undoHistory').redoQueue.length > 0
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchEventById: (eventId, hospitalId) => {
        dispatch(fetchEventById({eventId, hospitalId}));
      },
      updateEvent: (event, successMessage) => {
        dispatch(updateEvent(event, successMessage));
      },
      clearEvent: (payload) => {
        dispatch(clearEvent(payload));
      },
      onUndo: () => {
        dispatch(undo());
      },
      onRedo: () => {
        dispatch(redo());
      },
      clearUndoRedo: () => {
        dispatch(clear());
      },
      fetchNotesByEventId: (payload) => {
        dispatch(fetchNotesByEventId(payload))
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ViewEvent));