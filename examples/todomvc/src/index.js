/** @jsx A */
import { A, run } from 'actml';

import Store from './Store';
import Renderer from './Renderer';
import Listener from './Listener';

function App() {
  return (
    <Store exports='todos'>
      <Listener />
      <Renderer $todos />
    </Store>
  );
};

run(<App />);
