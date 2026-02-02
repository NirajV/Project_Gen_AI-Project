import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { localeReducer as locale } from 'react-localize-redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import {reducer as toastrReducer} from 'react-redux-toastr'
import undoHistoryReducer from './undo-redo';
import user from './user';
import event from './event';
import cycle from './cycle';

export default combineReducers({
    form,
    user,
    loadingBar: loadingBar,
    locale,
    event,
    cycle,
    toastr: toastrReducer,
    undoHistory: undoHistoryReducer
});