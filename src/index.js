import { create as D, speak } from './Dactory';
import Parallel from './dictionary/Parallel';
import { beforeHook, execute, afterHook, processingResult, processChildren } from './Word';

const pipeline = { beforeHook, execute, afterHook, processingResult, processChildren };

export {
  D,
  speak,
  Parallel,
  pipeline
};