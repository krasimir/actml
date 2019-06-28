/* eslint-disable react/prop-types */
/** @jsx A */
import { A } from '../../../src';

var initialValue = [
  {
    label: 'First task',
    completed: false,
    editing: false
  },
  {
    label: 'Second task',
    completed: false,
    editing: false
  }
];

export default function Store({ useState, useProduct, useElements }) {
  const [ todos, setTodos ] = useState(initialValue);
  const [ setProduct ] = useProduct(todos);
  const { Subscribe } = useElements();

  return (
    <Subscribe type='toggle'>
      {
        todoIndex => {
          console.log(todoIndex);
          const newState = todos.map((todo, index) => {
            if (index === todoIndex) {
              return {
                ...todo,
                completed: !todo.completed
              };
            }
            return todo;
          });

          setTodos(newState);
          setProduct(newState);
        }
      }
    </Subscribe>
  );
}
