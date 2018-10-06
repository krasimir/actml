import execute from './middlewares/execute';
import exports from './middlewares/exports';
import result from './middlewares/result';
import children from './middlewares/children';

const DEFAULT_MIDDLEWARES = [
  execute,
  exports,
  result,
  children
];

export default function createProcessor(element, middlewares = DEFAULT_MIDDLEWARES) {
  if (!element) {
    throw new Error('You can not create a pipeline with an element.');
  }

  return async function () {
    let entry;
    let index = 0;

    while(entry = middlewares[index]) {
      await entry(element);
      index++;
    }
    return element.result;
  }
}