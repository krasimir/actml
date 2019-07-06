/** @jsx A */
import { A, run, Fragment, usePubSub } from '../../../lib';

import Store from './Store';
import Renderer from './Renderer';
import CheckForEditField from './CheckForEditField';
import { ProgressChecker, FilterOptionsTabs, Container, Footer } from './DOM';
import Filter from './Filter';
import Persist from './Persist';

function App() {
  const { publish } = usePubSub();

  return (
    <Fragment>
      <Container onUserAction={ publish } />
      <Footer onUserAction={ publish }/>
      <Persist.Provider exports='initialValue' />
      <Store exports='todos' $initialValue>
        <Filter exports='filter'>
          <Renderer $todos $filter />
          <FilterOptionsTabs $filter />
        </Filter>
        <CheckForEditField $todos />
        <ProgressChecker $todos />
        <Persist.Storage $todos />
      </Store>
    </Fragment>
  );
};

run(<App />);
