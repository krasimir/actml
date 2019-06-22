/** @jsx A */
import { A } from 'actml';

import { FillContainer } from './DOM';

export default function Renderer({ todos }) {
  return (
    <FillContainer>
      {
        todos.map((todo, i) => {
          return `
            <li class='${ todo.completed }'>
              <div class="view">
                <input class="toggle" type="checkbox" data-index="${ i }" data-action="toggle">
                <label>${ todo.label }</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="Rule the web">
            </li>
          `;
        }).join('')
      }
    </FillContainer>
  );
};
