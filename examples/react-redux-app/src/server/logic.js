var posts = [];

var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export function GetPosts() {
  return posts.map(({ text, ...other }) => ({ ...other }));
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

  posts = posts.filter(post => {
    if (id !== post.id) {
      return true;
    }
    deleted = post;
    return false;
  });

  if (!deleted) {
    throw new Error('Not found');
  }
  return deleted;
}
export function HandleError({ error }) {
  return error.message;
}