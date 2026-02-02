import CreateFavCycle from '../components/cycle/CreateFavCycle';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { toJS } from './to-js';
import { createCycle } from '../actions/cycle';
import { List } from 'immutable';

const mapStateToProps = (state) => {
    return {
        translate: getTranslate(state.get('locale')),
        event: state.get('event'),
        user: state.get('user')
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (values) => {
            const eventName = values.get('eventName');
            const cycles = values.get('cycles');
            if(cycles.length) {
                let payload = List([]);
                cycles && cycles.map((cycle, index) => {
                    const value = {
                        cycleLength: cycle.cycleLength,
                        repetition: cycle.repetition,
                        medicines: cycle.medicines,
                        cycleName: cycle.cycleName,
                        userId: values.get('userId'),
                        eventName
                    };
                    payload = payload.push(value);
                });
                dispatch(createCycle(payload));
            } else {
                dispatch(createCycle(values));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(CreateFavCycle));