import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import { addTranslationForLanguage } from 'react-localize-redux';
import { initialize } from 'react-localize-redux';
import { Map } from 'immutable';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer';
import undoMiddleware from './undoMiddleware';


const initialState = Map();
const languages = ['en'];
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk, undoMiddleware)
    )
);

store.dispatch(initialize(languages, { defaultLanguage: 'en' }));


ReactDOM.render(
    <BrowserRouter>
        <Provider store={ store }>
            <App />
        </Provider>
    </BrowserRouter>,
document.getElementById('root'));
registerServiceWorker();
