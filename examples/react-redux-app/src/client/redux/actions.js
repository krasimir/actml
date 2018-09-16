import { GET_POSTS, NEW_POST } from './constants';

export const getPosts = () => ({ type: GET_POSTS });
export const addPost = (title, text) => ({ type: NEW_POST, title, text });