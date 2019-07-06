/* eslint-disable react/prop-types */
/** @jsx A */
import { A, Fragment, useReducer, useProduct, usePubSub } from '../../../lib';

export const TOGGLE = 'TOGGLE';
export const NEW_TODO = 'NEW_TODO';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';
export const EDIT_TODO = 'EDIT_TODO';

const toggle = (todoIndex) => ({ type: TOGGLE, todoIndex });
const deleteTodo = (todoIndex) => ({ type: DELETE, todoIndex });
const newTodo = (label) => ({ type: NEW_TODO, label });
const edit = (todoIndex) => ({ type: EDIT, todoIndex });
const editToDo = ({ index, label }) => ({ type: EDIT_TODO, index, label });

const ToDo = ({ label }) => ({ label, completed: false, editing: false });
const initialValue = [
  ToDo({ label: 'First task' }),
  ToDo({ label: 'Second task' })
];
const reducer = function (todos, action) {
  switch (action.type) {
    case TOGGLE:
      return todos.map((todo, index) => {
        if (index === action.todoIndex) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
    case EDIT:
      return todos.map((todo, index) => {
        if (index === action.todoIndex) {
          return {
            ...todo,
            editing: !todo.editing
          };
        }
        return {
          ...todo,
          editing: false
        };
      });
    case EDIT_TODO:
      return todos.map((todo, index) => {
        if (index === action.index) {
          return {
            ...todo,
            label: action.label,
            editing: false
          };
        }
        return todo;
      });
    case NEW_TODO:
      return [ ...todos, ToDo({ label: action.label }) ];
    case DELETE:
      return todos.filter((todo, index) => index !== action.todoIndex);
    default:
      return todos;
  }
};

export default function Store() {
  const [ todos, , Dispatch ] = useReducer(reducer, initialValue);
  const { Subscribe } = usePubSub();

  useProduct(todos);

  return (
    <Fragment>
      <Subscribe type={ TOGGLE }>
        <Dispatch propsToAction={ ({ payload: todoIndex }) => toggle(todoIndex) } />
      </Subscribe>
      <Subscribe type={ NEW_TODO }>
        <Dispatch propsToAction={ ({ payload: label }) => newTodo(label) } />
      </Subscribe>
      <Subscribe type={ DELETE }>
        <Dispatch propsToAction={ ({ payload: todoIndex }) => deleteTodo(todoIndex) } />
      </Subscribe>
      <Subscribe type={ EDIT }>
        <Dispatch propsToAction={ ({ payload: todoIndex }) => edit(todoIndex) } />
      </Subscribe>
      <Subscribe type={ EDIT_TODO }>
        <Dispatch propsToAction={ ({ payload }) => editToDo(payload) } />
      </Subscribe>
    </Fragment>
  );
}
