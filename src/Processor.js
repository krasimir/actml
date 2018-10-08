import { execute, exports, result, children } from './middlewares';
import deburger from './deburger';
import { isItAnElement } from './utils';

const DEFAULT_MIDDLEWARES = [
  execute,
  exports,
  result,
  children
];

const setDebugger = (element, d, level) => {
  if (isItAnElement(element) && !element.debug) {
    element.debug = d(element, level);
    if (element.children && element.children.length > 0) {
      element.children.forEach(e => setDebugger(e, d, level + 1));
    }
  }
}

export default function Processor(element, middlewares = DEFAULT_MIDDLEWARES) {
  if (!element) {
    throw new Error('The processor requires an element as first argument.');
  }

  const { props } = element;

  // debugging
  let debugMode = element.debug;
  if (props && props.debug) {
    const { debug } = props;

    if (debug === true) {
      debugMode = true;
      setDebugger(element, deburger(), 1);
    } else if (debug && typeof debug === 'object') {
      debugMode = true;
      setDebugger(element, deburger(debug), 1);
    }
  }

  // running the middlewares
  return async function () {
    let entry;
    let index = 0;

    try {
      debugMode && element.debug('IN');
      while(entry = middlewares[index]) {
        debugMode && element.debug(`${ entry._name }_IN`);
        await entry(element);
        index++;
        debugMode && element.debug(`${ entry._name }_OUT`);
      }
      debugMode && element.debug('OUT');
    } catch(error) {
      if (props && props.onError) {
        props.onError.mergeToProps({ error });
        if (!await props.onError.run(element)) {
          index = middlewares.length + 1;
        };
      } else {
        throw error;
      }
    }
    
    return element.result;
  }
}