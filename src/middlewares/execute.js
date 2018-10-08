import { STOP_PROCESSING, CONTINUE_PROCESSING } from '../constants';
import childrenMiddleware from './children';
import exportsMiddleware from './exports';

async function executeMiddleware(element) {
  const { func, props, name } = element;
  var normalizedProps = { ...props };

  // normalizing props
  if (props) {
    normalizedProps = { ...props };
    Object.keys(props).forEach(propName => {
      if (propName.charAt(0) === '$') {
        const prop = propName.substr(1, propName.length);
        const value = element.readFromScope(prop, name);

        if (typeof value !== 'undefined') {
          if (typeof props[propName] === 'string') {
            normalizedProps[props[propName]] = value;  
          } else if (typeof props[propName] === 'function') {
            normalizedProps = {
              ...normalizedProps,
              ...props[propName](value)
            }
          } else {
            normalizedProps[prop] = value;
          }
          delete normalizedProps[propName];
        }
      }
    });
  }

  // creating the `children` prop
  normalizedProps.children = result => {
    element.result = result;
    exportsMiddleware(element);
    childrenMiddleware(element);
  }

  // actual running of the function
  element.result = await func.call(element, normalizedProps);
}

executeMiddleware._name = 'EXECUTE';

export default executeMiddleware;