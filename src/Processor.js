import { execute, children } from './middlewares';
import deburger from './deburger';

const DEFAULT_MIDDLEWARES = [
  execute,
  children
];

export default function Processor(element, middlewares = DEFAULT_MIDDLEWARES) {
  if (!element) {
    throw new Error('The processor requires an element as first argument.');
  }

  const { debug, props } = element;

  // running the middlewares
  return async function () {
    debug && deburger(element, 'IN');
    for(let index = 0; index < middlewares.length; index++) {
      let entry = middlewares[index]; 

      if (!entry) {
        throw new Error(`Falsy middleware at index ${ index }!`);
      }

      try {
        await entry(element);
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
    debug && deburger(element, 'OUT');
    
    return element.result;
  }
}