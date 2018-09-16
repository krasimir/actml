import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import { Redux } from 'dactory';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(reducer, composeEnhancers(
  applyMiddleware(Redux.middleware)
));