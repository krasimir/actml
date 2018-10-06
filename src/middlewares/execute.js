import { STOP_PROCESSING, CONTINUE_PROCESSING } from '../constants';
import childrenMiddleware from './children';
import exportsMiddleware from './exports';

const handleElementError = async function (error, props, element) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error });

    const onErrorStrategy = await props.onError.run(element);

    if (onErrorStrategy === true) {
      throw new Error(CONTINUE_PROCESSING);
    }
    throw new Error(STOP_PROCESSING);    
  } else {
    throw error;
  }
}

export default async function executeMiddleware(element) {
  const { func, props } = element;
  var normalizedProps = { ...props };

  // normalizing props
  if (props) {
    normalizedProps = { ...props };
    Object.keys(props).forEach(propName => {
      if (propName.charAt(0) === '$') {
        const prop = propName.substr(1, propName.length);
        const value = element.readFromScope(prop);

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
  try {
    element.result = await func.call(element, normalizedProps);
  } catch (error) {
    await handleElementError(error, normalizedProps, element);
  }
}