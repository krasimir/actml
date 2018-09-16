export default url => async () => {
  const result = await fetch(url);
  return result.json();
}