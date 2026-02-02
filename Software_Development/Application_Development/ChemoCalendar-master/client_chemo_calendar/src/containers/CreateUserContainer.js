import CreateUser from '../components/pages/CreateUser';
import { connect } from 'react-redux';
import { createUser } from '../actions/user';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';

const mapStateToProps = (state) => {
    return { 
        user: state.get('user'),
        translate: getTranslate(state.get('locale'))
      };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createUserSubmit: (values) => {
            dispatch(createUser(values));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(CreateUser));