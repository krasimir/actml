const $ = (selector) => document.querySelector(selector);
const container = $('.todo-list');

export function FillContainer({ useChildren }) {
  const [ , content ] = useChildren();

  container.innerHTML = content;
}
export function Container({ useChildren }) {
  const [ children ] = useChildren();

  container.addEventListener('click', (e) => {
    const todoIndex = parseInt(e.target.getAttribute('data-index'), 10);
    const type = e.target.getAttribute('data-action');

    children(type, todoIndex);
  });
}
