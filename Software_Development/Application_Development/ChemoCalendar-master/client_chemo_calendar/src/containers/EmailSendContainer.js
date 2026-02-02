import SendEmail from '../components/pages/SendEmail';
import { connect } from 'react-redux';
import { sendEmail } from '../actions/event';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';

const mapStateToProps = (state) => {
	console.log('emailcon')
    return { 
        user: state.get('user'),
        translate: getTranslate(state.get('locale'))
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendEmail: (email, emailFile, eventName, patientName, beginDate, viewType) => {
			dispatch(sendEmail(email, emailFile, eventName, patientName, beginDate, viewType));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SendEmail));