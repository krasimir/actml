import { debuggerIn, debuggerOut } from './deburger';
import { isItAnElement } from './utils';
import { A } from './';
import flow from './flow';
import { NOOP } from './flow';

function normalizeProps(context, done) {
  const { element } = context;
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

  context.normalizedProps = normalizedProps;
  done();
}
function defineChildrenProp(context, done) {
  const { element } = context;
  const { children } = element;
  const childrenProp = {
    value: children.length === 1 ? children[0] : children,
    process: true
  }
  // FACC
  if (children.length === 1 && !isItAnElement(children[0]) && typeof children[0] === 'function') {
    childrenProp.value = (...params) => {
      if (params.length === 0) params = [ undefined ];
      return A(children[0].bind(null, ...params), null).run(element, () => {});
    }
  // if an array of Elements pass a function
  } else if (children.length >= 3 && children[0] === '(' && children[children.length-1] === ')') {
    childrenProp.process = false;
    childrenProp.value = (newResult) => {
      context.result = newResult;
      flow([ processResult, resolveExports, processChildren ], done, context);
    }
  }

  context.childrenProp = childrenProp;
  done();
}
function processResult(context, done) {
  const { element, result } = context;

  if (result) {
    // another ActML element
    if (isItAnElement(result)) {
      return result.run(element, r => {
        context.result = r;
        done();
      });
    } else if (typeof result.next === 'function') {
      // generator
      const gen = result;
      let genRes = { value: undefined, done: false };
      let processGenerator = function () {
        if (genRes.done) {
          context.result = genRes.value;
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
      return processGenerator(gen);
    }
  }
  done();
}
function resolveExports(context, done) {
  const { element, result } = context;
  const { props, scope } = element;

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
      element.dispatch(props.exports, result);
    }
  }
  done();
}
function processChildren(context, done) {
  const { element } = context;
  const children = element.children;

  if (children && Array.isArray(children) && children.length > 0) {
    return flow(children.map(child => {
      if (!isItAnElement(child)) return (context, childDone) => childDone();
      return (context, childDone) => child.run(element, childDone);
    }), done, context)
  }
  done();
}
function execute(context, done) {
  const { element } = context;
  
  context.result = element.func.call(element, {
    ...context.normalizedProps,
    children: context.childrenProp.value
  });
  if (context.result && context.result.then) {
    return context.result.then(asyncResult => {
      context.result = asyncResult;
      done();
    });
  }
  done();
}
export default function processor(element, done) {
  const context = { element };

    flow(
      [
        element.debug ? debuggerIn : NOOP,
        normalizeProps,
        defineChildrenProp,
        execute,
        (context, done) => {
          if (context.childrenProp.process) {
            return flow([ processResult, resolveExports, processChildren ], done, context);
          }
          done();
        },
        element.debug ? debuggerOut : NOOP,
      ],
      () => done(context.result),
      context
    );

  return context.result;
}