import deburger from './deburger';
import { isItAnElement } from './utils';
import { A } from './';

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
  const childrenProp = {
    value: children.length === 1 ? children[0] : children,
    process: true
  }
  // FACC
  if (children.length === 1 && !isItAnElement(children[0]) && typeof children[0] === 'function') {
    childrenProp.value = (...params) => {
      if (params.length === 0) params = [ undefined ];
      return A(children[0].bind(null, ...params), null).run(element);
    }
  // if an array of Elements pass a function
  } else if (children.length >= 3 && children[0] === '(' && children[children.length-1] === ')') {
    childrenProp.process = false;
    childrenProp.value = (newResult) => {
      childrenProp.used = true;
      element.result = newResult;
      processResult(element);
      resolveExports(element);
      processChildren(element);
    }
  }

  return childrenProp;
}
function processResult(element) {
  const { result } = element;

  if (result) {
    // another ActML element
    if (isItAnElement(result)) {
      result.run(element);
    } else if (typeof result.next === 'function') {
      // generator
      const gen = result;
      let genRes = { value: undefined, done: false };

      while(!genRes.done) {
        genRes = gen.next(genRes.value);
        if (isItAnElement(genRes.value)) {
          genRes.value = genRes.value.run(element);
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
function processChildren(element) {
  const { children } = element;
  
  if (children && Array.isArray(children) && children.length > 0) {
    let pointer = 0;

    while(pointer < children.length) {
      if (isItAnElement(children[pointer])) {
        children[pointer].run(element);
      }
      pointer++;
    }
  }
}
export default function processor(element) {
  const { debug, props, name, func } = element;
  const normalizedProps = normalizeProps(element);
  const childrenProp = defineChildrenProp(element);

  debug && deburger({ name, props: normalizedProps }, 'IN');
  try {
    element.result = func.call(element, {
      ...normalizedProps,
      children: childrenProp.value
    });
    if (childrenProp.process) {
      processResult(element);
      resolveExports(element);
      processChildren(element);
    }
  } catch(error) {
    if (props && props.onError) {
      props.onError.mergeToProps({ error });
      if (!props.onError.run(element)) {
        // ...
      };
    } else {
      throw error;
    }
  }
  debug && deburger(element, 'OUT');
  return element.result;
}