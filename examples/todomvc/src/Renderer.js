const $ = (selector) => document.querySelector(selector);
const container = $('.todo-list');

export default function Renderer({ todos }) {
  container.innerHTML = todos.map((todo, i) => {
    return `
      <li class='${ todo.completed }'>
        <div class="view">
          <input class="toggle" type="checkbox" data-index="${ i }">
          <label>${ todo.label }</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
      </li>
    `;
  }).join('');
};
