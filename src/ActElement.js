/* eslint-disable no-use-before-define, consistent-return */

import resolveBindings from './utils/resolveBindings';
import getMeta from './utils/getMeta';
import isActMLElement from './utils/isActMLElement';
import { createState } from './utils/State';
import getId from './utils/uid';

export default function createElement(func, props, children) {
  const element = {
    __actml: getId(),
    parent: null,
    meta: getMeta(func, props),
    run,
    requestBinding
  };
  const state = createState(element);

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

  function requestBinding(propName, dependent) {
    const { exportsKeyword } = element.meta;

    if (exportsKeyword && exportsKeyword === propName) {
      state.subscribe(dependent);
      return { value: state.get() };
    }
  }

  async function run(parent, additionalProps = {}) {
    element.parent = parent;

    let processChildrenAutomatically = true;
    let result = func({
      ...props,
      ...additionalProps,
      ...resolveBindings(element),
      // hooks definitions
      useChildren: () => {
        processChildrenAutomatically = false;
        return [ callChildren, children ];
      },
      useElement: () => [ element ],
      useState: (initialState) => {
        if (typeof initialState !== 'undefined') {
          state.set(initialState);
        }
        return [
          state.get(),
          newState => state.set(newState)
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

    // handling children
    if (processChildrenAutomatically) {
      await callChildren();
    }

    return result;
  }

  return element;
};
