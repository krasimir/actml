/** @jsx A */
import { A, run, Fragment } from '../../../src';

import Store from './Store';
import Renderer from './Renderer';
import Listener from './Listener';

function App() {
  return (
    <Fragment>
      <Listener />
      <Store exports='todos'>
        <Renderer $todos />
      </Store>
    </Fragment>
  );
};

run(<App />);
