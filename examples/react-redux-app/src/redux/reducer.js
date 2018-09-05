import { GET_POSTS } from './constants';

const initialState = {
  posts: null
}

const reducer = function (oldState = initialState, action) {
  if (action.type === GET_POSTS) {
    return { posts: null };
  }
  return oldState;
};

export default reducer;