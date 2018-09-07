import { create as D, speak } from './Dactory';
import Parallel from './dictionary/Parallel';
import { normalizeProps, beforeHook, execute, afterHook, processingResult, processChildren } from './Word';

const pipeline = { normalizeProps, beforeHook, execute, afterHook, processingResult, processChildren };

export {
  D,
  speak,
  Parallel,
  pipeline
};
