/* eslint-disable react/prop-types */
/** @jsx A */
import { A, Fragment, useState, useProduct, useElements } from 'actml';

const ToDo = ({ label }) => ({ label, completed: false, editing: false });

var initialValue = [
  ToDo({ label: 'First task' }),
  ToDo({ label: 'Second task' })
];

export default function Store() {
  const [ todos, setTodos ] = useState(initialValue);
  const [ setProduct ] = useProduct(todos);
  const { Subscribe } = useElements();

  return (
    <Fragment>
      <Subscribe type='toggle'>
        {
          todoIndex => {
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
      <Subscribe type='new'>
        {
          label => {
            todos.push(ToDo({ label }));
            setTodos(todos);
            setProduct(todos);
          }
        }
      </Subscribe>
    </Fragment>
  );
}
