import { debuggerIn, debuggerOut } from './deburger';
import { isItAnElement } from './utils';
import { A } from './';
import flow from './flow';
import { NOOP } from './flow';
import ChildrenWrapper from './elements/ChildrenWrapper';

const WRONG_PARAMS_ERROR = 'The "children" prop expects an object (key-value pairs) as first argument and a callback as second argument.';

function normalizeProps(execContext, done) {
  const { element } = execContext;
  const { props, name } = element;
  let normalizedProps = { ...props };

  if (!props) return done();

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

  execContext.normalizedProps = normalizedProps;
  done();
}
function processResult(execContext, done) {
  const { element, result } = execContext;

  if (result) {
    // another ActML element
    if (isItAnElement(result)) {
      return result.run(element, r => {
        execContext.result = r;
        done();
      });
    // promise
    } else if (result && result.then) {
      return result.then(asyncResult => {
        if (isItAnElement(asyncResult)) {
          return asyncResult.run(element, r => {
            execContext.result = r;
            done();
          });
        }
        execContext.result = asyncResult;
        done();
      });
    // generator
    } else if (typeof result.next === 'function') {
      const gen = result;
      let genRes = { value: undefined, done: false };
      let processGenerator = function () {
        if (genRes.done) {
          execContext.result = genRes.value;
          return done();
        }
        genRes = gen.next(genRes.value);
        if (isItAnElement(genRes.value)) {
          return genRes.value.run(element, newValue => {
            genRes.value = newValue;
            processGenerator();
          });
        }
        processGenerator();
      }
      return processGenerator();
    }
  }
  done();
}
function resolveExports(execContext, done) {
  const { element, result } = execContext;
  const { props, scope } = element;

  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      const exportedProps = props.exports(result);

      if (exportedProps) {
        Object
          .keys(exportedProps)
          .forEach(key => {
            scope[key] = exportedProps[key];
            element.dispatch(key, exportedProps[key]);
          });
      }
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, result);
    }
  }
  done();
}
function processChildren(execContext, done) {
  const { element } = execContext;
  const children = element.children;

  if (children && Array.isArray(children) && children.length > 0) {
    return flow(children.map(child => {
      if (!isItAnElement(child)) return (execContext, childDone) => childDone();
      return (execContext, childDone) => child.run(element, childDone);
    }), done, execContext);
  }
  done();
}
function execute(execContext, done) {
  const { element } = execContext;
  
  execContext.result = element.func.call(element, execContext.normalizedProps);
  done();
}
function beforeHook(execContext, done) {
  if (execContext.element.func.before) {
    execContext.element.func.before(execContext, done);
  } else {
    done();
  }
}
function afterHook(execContext, done) {
  if (execContext.element.func.after) {
    execContext.element.func.after(execContext, done);
  } else {
    done();
  }
}

export function defineChildrenProp(element) {
  const { children } = element;

  // FACC
  if (children.length === 1 && !isItAnElement(children[0]) && typeof children[0] === 'function') {
    return (props, childrenDone) => {
      if (typeof props !== 'object') {
        throw new Error(WRONG_PARAMS_ERROR);
      }
      return A(children[0].bind(null, props), null).run(element, childrenDone || (() => {}))
    }
  // if an array of Elements pass a function
  } else if (children.length >= 3 && children[0] === '(' && children[children.length-1] === ')') {
    return (props, childrenDone) => {
      if (typeof props !== 'object') {
        throw new Error(WRONG_PARAMS_ERROR);
      }
      return A(ChildrenWrapper, props, ...children.slice(1, -1)).run(element, childrenDone || (() => {}));
    };
  }

  return null;
}

export default function processor(element, done) {
  const execContext = { element };

  flow(
    [
      beforeHook,
      normalizeProps,
      element.debug ? debuggerIn : NOOP,
      execute,
      processResult,
      resolveExports,
      (execContext, done) => execContext.normalizedProps.children ? done() : processChildren(execContext, done),
      afterHook,
      element.debug ? debuggerOut : NOOP,
    ],
    () => done(execContext.result),
    execContext
  );

  return execContext.result;
}