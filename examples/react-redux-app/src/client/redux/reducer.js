import { POSTS_LOADED, UPDATE_POST } from './constants';

const initialState = {
  error: null,
  posts: []
}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return {
        posts: action.posts.map(post => {
          const existingPost = state.posts.find(({ id }) => id === post.id);

          if (existingPost) {
            return existingPost;
          }
          return post;
        })
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