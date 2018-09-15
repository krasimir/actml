import { create as D, speak } from './Dactory';
import Parallel from './words/Parallel';
import * as ReduxMethods from './words/redux';
import Pipeline from './Pipeline';

const Redux = { ...ReduxMethods };

export {
  D,
  speak,
  Parallel,
  Pipeline,
  Redux
};
