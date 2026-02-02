import ForgotPassword from '../components/pages/ForgotPassword';
import { connect } from 'react-redux';
import { sendOtp, savePassword } from '../actions/user';
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
        sendOtp: (values) => {
            dispatch(sendOtp(values));
        },
		savePassword: (values) => {
			dispatch(savePassword(values));
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ForgotPassword));