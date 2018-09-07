import { USERS_FETCHED } from './constants';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { Subscribe } from '../logic';

export default () => createStore(reducer, applyMiddleware(Subscribe.middleware));