import CreateNote from '../components/notes/CreateNote';
import { connect } from 'react-redux';
import { createEventNote, updateEventNote, removeEventNote } from '../actions/event';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';

const mapStateToProps = (state, props) => {
    return {
    initialValues: {
      title: props.noteData ? props.noteData.title : '',
      description: props.noteData ? props.noteData.desc : '',
	  noteId: props.noteData ? props.noteData.noteId : ''
    }
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		createEventNote: (values) => {
			dispatch(createEventNote(values));
        },
		updateEventNote: (values) => {
			dispatch(updateEventNote(values));
        },
		removeEventNote: (values) => {
			dispatch(removeEventNote(values));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(CreateNote));