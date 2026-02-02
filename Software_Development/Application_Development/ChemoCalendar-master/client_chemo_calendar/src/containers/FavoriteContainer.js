import Favorite from '../components/pages/Favorite';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../actions/user';
import { fetchAllFavoriteEvents, fetchAllCycles } from '../actions/cycle';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';

const mapStateToProps = (state) => {
    return { 
        user: state.get('user'),
        translate: getTranslate(state.get('locale')),
        allEvents: state.getIn(['cycle', 'allEvents']),
        currentEventCycles: state.getIn(['cycle', 'all'])
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsers: () => {
            dispatch(fetchAllUsers());
        },
        fetchAllFavoriteEvents: (hospitalId) => {
            dispatch(fetchAllFavoriteEvents(hospitalId));
        },
        fetchAllCycles: (payload) => {
            dispatch(fetchAllCycles(payload));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Favorite));