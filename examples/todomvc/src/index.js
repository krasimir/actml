/** @jsx A */
import { A, run } from 'actml';

import Renderer from './Renderer';

const todos = [
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

function App() {
  return (
    <Renderer todos={ todos } />
  );
};

run(<App />);
