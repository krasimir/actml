import { USERS_FETCHED } from './constants';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { Redux } from 'dactory';

export default () => createStore(reducer, applyMiddleware(Redux.middleware));