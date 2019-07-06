/** @jsx A */
import { A, run, Fragment, usePubSub } from '../../../lib';

import Store from './Store';
import Renderer from './Renderer';
import CheckForEditField from './CheckForEditField';
import { ProgressChecker, FilterOptionsTabs, Container, FilterOptions } from './DOM';
import Filter from './Filter';

function App() {
  const { publish } = usePubSub();

  return (
    <Fragment>
      <Container onUserAction={ publish } />
      <FilterOptions onUserAction={ publish }/>
      <Store exports='todos'>
        <Filter exports='filter'>
          <Renderer $todos $filter />
          <FilterOptionsTabs $filter />
        </Filter>
        <CheckForEditField $todos />
        <ProgressChecker $todos />
      </Store>
    </Fragment>
  );
};

run(<App />);
