import HomePage from '../components/pages/HomePage';
import { connect } from 'react-redux';
import { login, fetchAllUsers } from '../actions/user';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';
import { fetchAllEvents, fetchFilteredEvents } from '../actions/event';

const mapStateToProps = (state) => {
    return { 
        user: state.get('user'),
        translate: getTranslate(state.get('locale')),
        events: state.getIn(['event', 'all'])
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (values) => {
            dispatch(login(values));
        },
        fetchAllEvents: (userId) => {
            dispatch(fetchAllEvents(userId));
        },
        fetchFilteredEvents: (payload) => {
            dispatch(fetchFilteredEvents(payload));
        },
        fetchAllUsers: () => {
            dispatch(fetchAllUsers());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(HomePage));