import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { logout } from '../actions/user';
import { toJS } from './to-js';

const mapStateToProps = (state) => {
    const locale = state.get('locale');
    return { 
        translate: getTranslate(locale),
        currentLanguage: getActiveLanguage(locale).code,
        user: state.get('user')
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Layout));