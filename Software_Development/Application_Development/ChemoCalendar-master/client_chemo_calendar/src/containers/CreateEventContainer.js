import CreateEvent from '../components/pages/CreateEvent';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';
import { createEvent, clearEvent } from '../actions/event';
import { createCycle, fetchAllCycles, fetchAllFavoriteEvents } from '../actions/cycle';

const mapStateToProps = (state) => {
    return {
        translate: getTranslate(state.get('locale')),
        event: state.get('event'),
        user: state.get('user'),
        cycles: state.getIn(['cycle', 'all']),
        favoriteEvents: state.getIn(['cycle', 'allEvents'])
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (values) => {
            dispatch(createEvent(values));
        },
        clearEvent: (payload) => {
            dispatch(clearEvent(payload));
        },
        createCycle: (payload) => {
            dispatch(createCycle(payload));
        },
        fetchAllCycles: (payload) => {
            dispatch(fetchAllCycles(payload));
        },
        fetchAllFavoriteEvents: (userId) => {
            dispatch(fetchAllFavoriteEvents(userId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(CreateEvent));