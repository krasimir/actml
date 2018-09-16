import { GET_POSTS, GETTING_POSTS_FAILED } from './constants';

const initialState = {
  pending: false,
  posts: null
}

const reducer = function (oldState = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { pending: true, posts: null };
    case GETTING_POSTS_FAILED:
      return { pending: false, error: action.error, posts: action.posts };
  }
  return oldState;
};

export default reducer;