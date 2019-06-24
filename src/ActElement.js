/* eslint-disable no-use-before-define, consistent-return */

import resolveBindings from './utils/resolveBindings';
import getMeta from './utils/getMeta';
import isActMLElement from './utils/isActMLElement';
import { createState } from './utils/State';
import getId from './utils/uid';
import createUseChildrenHook from './hooks/useChildren';
import createUseElementHook from './hooks/useElement';
import createUseStateHook from './hooks/useState';
import createUsePubSubHook from './hooks/usePubSub';

export default function createElement(func, props, children) {
  const element = {
    __actml: getId(),
    parent: null,
    meta: getMeta(func, props),
    run,
    requestBinding
  };
  const state = createState(element);
  const {
    hook: useChildren,
    callChildren,
    processChildrenAutomatically
  } = createUseChildrenHook(element, children);
  const useElement = createUseElementHook(element);
  const useState = createUseStateHook(state);
  const usePubSub = createUsePubSubHook(element);

  function requestBinding(propName, dependent) {
    const { exportsKeyword } = element.meta;

    if (exportsKeyword && exportsKeyword === propName) {
      state.subscribe(dependent);
      return { value: state.get() };
    }
  }

  async function run(parent, additionalProps = {}) {
    element.parent = parent;
    processChildrenAutomatically.process = true;

    let result = func({
      ...props,
      ...additionalProps,
      ...resolveBindings(element),
      useChildren,
      useElement,
      useState,
      usePubSub
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
    if (processChildrenAutomatically.process) {
      await callChildren();
    }

    return result;
  }

  return element;
};
