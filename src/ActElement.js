/* eslint-disable no-use-before-define */

import resolveBindings from './utils/resolveBindings';
import getMeta from './utils/getMeta';
import isActMLElement from './utils/isActMLElement';
import { createState } from './utils/State';

export default function createElement(func, props, children) {
  const element = {
    __actml: true,
    parent: null,
    exported: {},
    meta: getMeta(func, props),
    run
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

  function setExported() {
    if (element.meta.exportsKeyword) {
      element.exported[element.meta.exportsKeyword] = state.get();
    }
  }

  state.subscribe(setExported);

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

    // exporting state
    setExported();

    // handling children
    if (processChildrenAutomatically) {
      await callChildren();
    }

    return result;
  }

  return element;
};
