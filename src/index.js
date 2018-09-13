import { create as D, speak } from './Dactory';
import Parallel from './words/Parallel';
import { normalizeProps, beforeHook, execute, afterHook, processingResult, processChildren } from './Word';
import * as ReduxMethods from './words/redux';

const pipeline = { normalizeProps, beforeHook, execute, afterHook, processingResult, processChildren };
const redux = { ...ReduxMethods };

export {
  D,
  speak,
  Parallel,
  pipeline,
  redux
};
