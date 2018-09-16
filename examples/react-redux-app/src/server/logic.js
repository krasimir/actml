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
export function Add({ title, text }) {
  const post = {
    id: ID(),
    title,
    text
  };

  posts.push(post);
  return post;
}
export function Delete({ id }) {
  posts = posts.filter(({ id: postId }) => id !== postId);
}
export function HandleError({ error }) {
  return error.message;
}