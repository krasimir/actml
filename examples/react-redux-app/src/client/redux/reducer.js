import { POSTS_LOADED } from './constants';

const initialState = {
  error: null,
  posts: null
}

const reducer = function (oldState = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return { posts: action.posts };
  }
  return oldState;
};

export default reducer;