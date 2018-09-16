import { POSTS_LOADED, UPDATE_POST } from './constants';
import uniqBy from 'lodash.uniqby';

const initialState = {
  error: null,
  posts: []
}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return {
        posts: uniqBy([ ...state.posts, ...action.posts ], 'id')
      }
    case UPDATE_POST:
      const posts = state.posts.map(post => {
        if (post.id === action.data.id) {
          return action.data;
        }
        return post;
      });
      return { posts };
  }
  return state;
};

export default reducer;