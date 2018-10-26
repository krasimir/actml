import { flow } from '../utils';
import beforeHook from './beforeHook';
import afterHook from './afterHook';
import normalizeProps from './normalizeProps';
import execute from './execute';
import resolveExports from './resolveExports';
import processChildren from './processChildren';

export default function processor(element, done) {
  const execContext = { element };

  flow(
    [
      beforeHook,
      normalizeProps,
      execute,
      resolveExports,
      (execContext, done) => execContext.normalizedProps.children ? done() : processChildren(execContext, done),
      afterHook
    ],
    () => done(execContext.result),
    execContext
  );

  return execContext.result;
}
