export function getPosts(url) {
  return async () => {
    const result = await fetch(url);
    return result.json();
  };
}
export function addPost(url) {
  return async ({ data }) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };
}