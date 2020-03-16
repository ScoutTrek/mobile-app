import {applyMiddleware, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import {createLogger} from 'redux-logger'
import {logger} from 'redux-logger';
import reducer from './reducer';

const enhancers = [applyMiddleware(thunkMiddleware)];

/* eslint-disable no-undef */
const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

export const store = createStore(reducer, {}, enhancer);
