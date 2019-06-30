import createUseElementHook from '../hooks/useElement';
import createUseChildrenHook from '../hooks/useChildren';
import createUseProductHook from '../hooks/useProduct';

export default function enhanceProps(element, callChildren, stack) {
  const useElement = createUseElementHook(element);
  const {
    hook: useChildren,
    processChildrenAutomatically
  } = createUseChildrenHook(element, callChildren);
  const {
    hook: useProduct,
    resolvedProps
  } = createUseProductHook(element, stack);

  return {
    props: {
      ...element.props,
      ...resolvedProps,
      useChildren,
      useElement,
      useProduct,
      // usePubSub,
      // useState,
      // useElements: createUseElementsHook(element)
    },
    processChildrenAutomatically
  };
};
