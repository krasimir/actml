import { isItAnElement } from '../utils';
import { A } from '../';

function normalizeProps(element) {
  const { props, name } = element;
  let normalizedProps = { ...props };

  if (!props) return normalizedProps;

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

  return normalizedProps;
}
function defineChildrenProp(element) {
  const { children } = element;

  // passing a `children` prop
  if (children.length === 1 && !isItAnElement(children[0]) && typeof children[0] === 'function') {
    // FACC
    return (...params) => {
      if (params.length === 0) params = [ undefined ];
      return A(children[0].bind(null, ...params), null).run(element);
    }
  } else if (children.find(isItAnElement)) {
    // if an array of Elements pass a function
    return async (newProps) => {
      element.mergeToScope(newProps);
      for(let i=0; i<children.length; i++) {
        await children[i].run(element);
      }
    }
  }

  return children.length === 1 ? children[0] : children;
}
async function processResult(element) {
  const { result } = element;

  if (result) {
    // another ActML element
    if (isItAnElement(result)) {
      await result.run(element);
    } else if (typeof result.next === 'function') {
      // generator
      const gen = result;
      let genRes = { value: undefined, done: false };

      while(!genRes.done) {
        genRes = gen.next(genRes.value);
        if (isItAnElement(genRes.value)) {
          genRes.value = await genRes.value.run(element);
        }
      }
      element.result = genRes.value;
    }
  }
}
function resolveExports(element) {
  const { props, scope, result } = element;

  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      const exportedProps = props.exports(result);

      Object
        .keys(exportedProps)
        .forEach(key => {
          scope[key] = exportedProps[key];
          element.dispatch(key, exportedProps[key]);
        });
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, element.result);
    }
  }
}

export default async function executeMiddleware(element) {
  element.result = await element.func.call(element, {
    ...normalizeProps(element),
    children: defineChildrenProp(element)
  });
  await processResult(element);
  resolveExports(element);
}