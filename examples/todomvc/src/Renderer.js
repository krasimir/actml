/* eslint-disable react/prop-types */
/** @jsx A */
import { A } from '../../../src';

import { FillContainer } from './DOM';

export default function Renderer({ todos }) {
  return (
    <FillContainer>
      {
        todos.map((todo, i) => {
          return `
            <li class='${ todo.completed ? 'completed' : '' }'>
              <div class="view">
                <input 
                  class="toggle"
                  type="checkbox"
                  data-index="${ i }"
                  data-action="toggle"
                  ${ todo.completed ? 'checked' : '' }>
                <label>${ todo.label }</label>
                <button
                  class="destroy"
                  data-index="${ i }"
                  data-action="delete"></button>
              </div>
              <input class="edit" value="Rule the web">
            </li>
          `;
        }).join('')
      }
    </FillContainer>
  );
};
