/* eslint-disable no-use-before-define, consistent-return */

import resolveBindings from './utils/resolveBindings';
import getMeta from './utils/getMeta';
import isActMLElement from './utils/isActMLElement';
import { createProduct } from './hooks/utils/Product';
import getId from './utils/uid';
import createUseChildrenHook from './hooks/useChildren';
import createUseElementHook from './hooks/useElement';
import createUseProductHook from './hooks/useProduct';
import createUsePubSubHook from './hooks/usePubSub';
import createUSeStateHook from './hooks/useState';

export default function createElement(func, props, children) {
  const element = {
    __actml: getId(),
    parent: null,
    meta: getMeta(func, props),
    run,
    requestProduct,
    isUsed: false,
    isRunning: false
  };
  const product = createProduct(element);
  const {
    hook: useChildren,
    callChildren,
    processChildrenAutomatically
  } = createUseChildrenHook(element, children);
  const useElement = createUseElementHook(element);
  const useProduct = createUseProductHook(product);
  const usePubSub = createUsePubSubHook(element);
  const useState = createUSeStateHook(element);

  function requestProduct(propName, dependent) {
    const { exportsKeyword } = element.meta;

    if (exportsKeyword && exportsKeyword === propName) {
      return { value: product.get() };
    }
  }

  async function run(parent, additionalProps = {}) {
    element.parent = parent;
    element.isRunning = true;
    processChildrenAutomatically.process = true;

    let result = func({
      ...props,
      ...additionalProps,
      ...resolveBindings(element),
      useChildren,
      useElement,
      useProduct,
      usePubSub,
      useState
    });
    let genResult, toGenValue;

    element.isRunning = false;
    element.isUsed = true;

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
