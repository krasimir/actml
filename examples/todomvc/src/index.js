/** @jsx A */
import { A, run, Fragment } from '../../../lib';

import Store from './Store';
import Renderer from './Renderer';
import Listener from './Listener';
import CheckForEditField from './CheckForEditField';
import { ProgressChecker } from './DOM';
import Filter from './Filter';

function App() {
  return (
    <Fragment>
      <Listener />
      <Filter exports='filter' />
      <Store exports='todos'>
        <Renderer $todos $filter/>
        <CheckForEditField $todos />
        <ProgressChecker $todos />
      </Store>
    </Fragment>
  );
};

run(<App />);
