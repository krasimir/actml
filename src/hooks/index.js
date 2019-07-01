import createUseElementHook from './useElement';
import createUseChildrenHook from './useChildren';
import createUseProductHook from './useProduct';
import createUsePubSubHook from './usePubSub';
import createUseStateHook from './useState';
import createUseElementsHook from './elements';

export default function initializeHooks(branch, callChildren, stack, process) {
  const { element } = branch;
  const useElement = createUseElementHook(element);
  const useChildren = createUseChildrenHook(element, callChildren);
  const [ useProduct, resolvedProductProps ] = createUseProductHook(element, stack);
  const usePubSub = createUsePubSubHook(element);
  const useState = createUseStateHook(element, () => process(branch, stack));

  return {
    ...resolvedProductProps,
    useChildren,
    useElement,
    useProduct,
    usePubSub,
    useState,
    useElements: () => createUseElementsHook(element)
  };
};
