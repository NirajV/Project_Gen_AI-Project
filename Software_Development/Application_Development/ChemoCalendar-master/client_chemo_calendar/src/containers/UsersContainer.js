import Users from '../components/pages/Users';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../actions/user';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';

const mapStateToProps = (state) => {
    return { 
        user: state.get('user'),
        translate: getTranslate(state.get('locale'))
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsers: () => {
            dispatch(fetchAllUsers());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Users));