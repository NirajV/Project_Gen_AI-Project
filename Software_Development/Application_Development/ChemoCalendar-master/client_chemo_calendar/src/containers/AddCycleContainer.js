import AddCycle from '../components/cycle/AddCycle';
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
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AddCycle));