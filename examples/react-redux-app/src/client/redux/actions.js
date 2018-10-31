import { GET_POSTS, NEW_POST, GET_DETAILS, DELETE_POST} from './constants';

export const getPosts = () => ({ type: GET_POSTS });
export const addPost = (title, text) => ({ type: NEW_POST, title, text });
export const getDetails = id => ({ type: GET_DETAILS, id });
export const deletePost = id => ({ type: DELETE_POST, id });
