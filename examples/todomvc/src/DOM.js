const $ = (selector) => document.querySelector(selector);
const container = $('.todo-list');

export function FillContainer({ useChildren }) {
  const [ , content ] = useChildren();

  container.innerHTML = content.join('');
}
export function Container({ useChildren }) {
  const [ children ] = useChildren();

  children({ container });
  return container;
}
