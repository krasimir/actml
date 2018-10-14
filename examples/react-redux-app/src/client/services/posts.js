export function getPosts(url) {
  return async function getPosts () {
    const result = await fetch(url);
    return result.json();
  };
}
export function addPost(url) {
  return async function addPost ({ post }){
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
  return async function getPost ({ id }) {
    const result = await fetch(url + id);
    return result.json();
  };
}
export function deletePost(url) {
  return async function deletePost ({ id }) {
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