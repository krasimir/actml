/* eslint-disable no-use-before-define */

import getNormalizeProps from './utils/getNormalizeProps';
import getMeta from './utils/getMeta';
import isActMLElement from './utils/isActMLElement';

export default function (func, props, children) {
  const element = {
    parent: null,
    state: undefined,
    exported: {},
    meta: getMeta(func, props),
    run
  };

  async function callChildren(newPros) {
    const result = [];

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          result.push(await children[i].run(element, newPros));
        }
      }
    }

    return result;
  }

  async function run(parent, additionalProps = {}) {
    element.parent = parent;

    let processChildrenAutomatically = true;
    let result = func({
      ...getNormalizeProps(element),
      ...additionalProps,
      // hooks definitions
      useChildren: () => {
        processChildrenAutomatically = false;
        return [ callChildren, children ];
      },
      useElement: () => [ element ],
      useState: (initialState) => {
        if (typeof initialState !== 'undefined') {
          element.state = initialState;
        }
        return [
          element.state,
          newState => {
            element.state = newState;
            return newState;
          }
        ];
      }
    });
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

    // exporting state
    if (element.meta.exportsKeyword) {
      element.exported[element.meta.exportsKeyword] = element.state;
    }

    // handling children
    if (processChildrenAutomatically) {
      await callChildren();
    }

    return result;
  }

  return element;
};
