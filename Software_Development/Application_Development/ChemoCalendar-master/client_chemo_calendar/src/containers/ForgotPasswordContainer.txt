import LoginPage from '../components/pages/LoginPage';
import { connect } from 'react-redux';
import { login } from '../actions/user';
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
        onSubmit: (values) => {
            dispatch(login(values));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(LoginPage));