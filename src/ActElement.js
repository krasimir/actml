/* eslint-disable no-use-before-define */

import normalizeProps from './utils/normalizeProps';
import getMeta from './utils/getMeta';
import useProps from './utils/useProps';
import isActMLElement from './utils/isActMLElement';

export default function (func, props, children) {
  const element = {
    scope: {},
    meta: getMeta(func, props),
    parent: null,
    run
  };

  async function run(parent) {
    element.parent = parent;

    let result = func(normalizeProps(element));
    let genResult, toGenValue;

    // handling a promise
    if (result && result.then) {
      result = await result;

    // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if (isActMLElement(genResult.value)) {
          toGenValue = await genResult.value.run(element);
        }
        genResult = result.next(toGenValue);
      }
      result = genResult.value;

    // handling another ActML element
    } else if (isActMLElement(result)) {
      result = await result.run(element);
    }

    // exports
    useProps(props)
      .exists('exports', (exportsKeyword) => {
        element.scope[exportsKeyword] = result;
      });

    // handling children
    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          await children[i].run(element);
        }
      }
    }

    return result;
  }

  return element;
};
