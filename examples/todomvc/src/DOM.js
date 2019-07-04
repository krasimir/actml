const $ = (selector) => document.querySelector(selector);
const list = $('.todo-list');
const header = $('.header');

const ENTER = 13;

export function FillContainer({ useChildren }) {
  const [ , content ] = useChildren();

  list.innerHTML = content;
}
export function Container({ useChildren }) {
  const [ children ] = useChildren();

  list.addEventListener('click', (e) => {
    const todoIndex = parseInt(e.target.getAttribute('data-index'), 10);
    const type = e.target.getAttribute('data-action');

    children(type, todoIndex);
  });
  header.addEventListener('keyup', (e) => {
    if (e.keyCode === ENTER) {
      children(e.target.getAttribute('data-action'), e.target.value);
      e.target.value = '';
    }
  });
}
