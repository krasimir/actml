import execute from './middlewares/execute';
import processResult from './middlewares/processResult';
import processChildren from './middlewares/processChildren';

export default function createPipeline(element, middlewares) {
  if (!element) {
    throw new Error('The pipeline requires an element.');
  }
  if (!middlewares || middlewares.length === 0) {
    middlewares = [
      { func: execute, enabled: true },
      { func: processResult, enabled: true },
      { func: processChildren, enabled: true }
    ];
  }

  return async function process() {
    let entry;
    let pointer = 0;

    while(entry = middlewares[pointer]) {
      if (entry.enabled) {
        await entry.func(element);
      }
      pointer += 1;
    }
    return element.result;
  }
}