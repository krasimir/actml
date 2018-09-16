import { GET_POSTS, NEW_POST, GET_DETAILS } from './constants';

export const getPosts = () => ({ type: GET_POSTS });
export const addPost = (title, text) => ({ type: NEW_POST, title, text });
export const getDetails = id => ({ type: GET_DETAILS, id });