import { isItAnElement } from '../utils';
import { A } from '../';

export default async function executeMiddleware(element) {
  const { func, props, name, children, scope } = element;
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

  // passing a `children` prop
  if (children.length === 1 && !isItAnElement(children[0]) && typeof children[0] === 'function') {
    // FACC
    normalizedProps.children = (...params) => {
      if (params.length === 0) params = [ undefined ];
      return A(children[0].bind(null, ...params), null).run(element);
    }
  } else if (children.find(isItAnElement)) {
    // Everything else. The `children` prop is always considered a function.
    normalizedProps.children = async (newProps) => {
      element.mergeToScope(newProps);
      for(let i=0; i<children.length; i++) {
        await children[i].run(element);
      }
    }
  } else {
    normalizedProps.children = children.length === 1 ? children[0] : children;
  }

  // actual running of the function
  element.result = await func.call(element, normalizedProps);

  // exporting data
  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      const exportedProps = props.exports(element.result);

      Object
        .keys(exportedProps)
        .forEach(key => {
          scope[key] = exportedProps[key];
          element.dispatch(key, exportedProps[key]);
        });
    } else {
      scope[props.exports] = element.result;
      element.dispatch(props.exports, element.result);
    }
  }

  // processing the result of the function
  if (element.result) {
    // another ActML element
    if (isItAnElement(element.result)) {
      if (props && props.debug) {
        element.result.mergeToProps({ debug: props.debug });
      }
      return await element.result.run(element);
    }
    // generator
    if (typeof element.result.next === 'function') {
      const gen = element.result;
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