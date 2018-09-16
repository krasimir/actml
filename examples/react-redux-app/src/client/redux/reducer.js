import { POSTS_LOADED, GETTING_POSTS_FAILED } from './constants';

const initialState = {
  error: null,
  posts: null
}

const reducer = function (oldState = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return { posts: action.posts };
    case GETTING_POSTS_FAILED:
      return { error: action.error, posts: null };
  }
  return oldState;
};

export default reducer;