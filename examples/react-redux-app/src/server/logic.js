var posts = [];

var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export function GetPosts() {
  return posts;
}
export function GetPost({ id }) {
  const post = posts.find(({ id: postId }) => postId === id);

  if (post) {
    return post;
  }
  throw new Error('Not found');
}
export function AddPost({ title, text }) {
  const post = {
    id: ID(),
    title,
    text
  };

  posts.push(post);
  return post;
}
export function DeletePost({ id }) {
  var deleted = false;

  posts = posts.filter(({ id: postId }) => {
    if (id !== postId) {
      return true;
    }
    deleted = true;
    return false;
  });

  if (!deleted) {
    throw new Error('Not found');
  }
}
export function HandleError({ error }) {
  return error.message;
}