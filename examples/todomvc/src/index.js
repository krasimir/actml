/** @jsx A */
import { A, run } from 'actml';

import { State, Reducer } from './Store';
import Renderer from './Renderer';
import Listener from './Listener';

function App() {
  return (
    <State exports='todos'>
      <Listener>
        <Reducer />
      </Listener>
      <Renderer $todos />
    </State>
  );
};

run(<App />);
