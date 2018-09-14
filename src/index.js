import { create as D, speak } from './Dactory';
import Parallel from './words/Parallel';
import { init, beforeHook, execute, afterHook, processResult, processChildren } from './Word';
import * as ReduxMethods from './words/redux';

const pipeline = { init, beforeHook, execute, afterHook, processResult, processChildren };
const redux = { ...ReduxMethods };

export {
  D,
  speak,
  Parallel,
  pipeline,
  redux
};
