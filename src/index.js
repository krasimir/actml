import createProcessor from './Processor';
import isActMLElement from './utils/isActMLElement';
import ActElement from './ActElement';

import createUseChildrenHook from './hooks/useChildren';
import createUseElementHook from './hooks/useElement';
import createUseProductHook from './hooks/useProduct';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';
import createUseReducerHook from './hooks/useReducer';
import createUseEffectHook from './hooks/useEffect';

export function createRuntime() {
  const processor = createProcessor();

  function A(func, props, ...children) {
    return ActElement(func, props, children);
  }
  function run(element) {
    if (!isActMLElement(element)) {
      throw new Error(`ActML element expected. Instead ${ element.toString() } passed.`);
    }
    return processor.run(element);
  }
  const Fragment = () => {};
  const useChildren = createUseChildrenHook(processor);
  const useElement = createUseElementHook(processor);
  const useState = createUseStateHook(processor);
  const useProduct = createUseProductHook(processor, useState);
  const usePubSub = createUsePubSubHook(processor, useChildren);
  const useReducer = createUseReducerHook(useState);
  const useEffect = createUseEffectHook(processor);

  return {
    A,
    run,
    Fragment,
    processor,
    useChildren,
    useElement,
    useProduct,
    usePubSub,
    useState,
    useReducer,
    useEffect
  };
}

const runtime = createRuntime();

module.exports = runtime;
module.exports.createRuntime = createRuntime();
