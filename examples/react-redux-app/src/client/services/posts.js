export function getPosts(url) {
  return async () => {
    const result = await fetch(url);
    return result.json();
  };
}
export function addPost(url) {
  return async ({ post }) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
  };
}
export function getPost(url) {
  return async ({ id }) => {
    const result = await fetch(url + id);
    return result.json();
  };
}
export function deletePost(url) {
  return async ({ id }) => {
    const result = await fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return result.json();
  };
}