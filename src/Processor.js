import { execute, children } from './middlewares';
import deburger from './deburger';
import { isItAnElement } from './utils';

const DEFAULT_MIDDLEWARES = [
  execute,
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
    debugMode && element.debug('IN');
    for(let index = 0; index < middlewares.length; index++) {
      let entry = middlewares[index];

      if (!entry) {
        throw new Error(`Falsy middleware at index ${ index }!`);
      }

      try {
        debugMode && element.debug(`${ entry._name }_IN`);
        await entry(element);
        debugMode && element.debug(`${ entry._name }_OUT`);
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
    }
    debugMode && element.debug('OUT');
    
    return element.result;
  }
}