import { ToDo } from './Store';

const initialValue = JSON.stringify([
  ToDo({ label: 'ActML is using JSX' }),
  ToDo({ label: 'It is like React but not for rendering' })
]);

export default {
  Provider: ({ children }) => {
    children(JSON.parse(localStorage.getItem('todos') || initialValue));
  },
  Storage: ({ todos }) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
};
