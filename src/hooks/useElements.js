import createSubscribeElement from './elements/Subscribe';
import createPublishElement from './elements/Publish';
import isValidHookContext from './utils/isValidHookContext';

export default function createUseElementsHook(processor, useChildren, usePubSub) {
  return () => {
    isValidHookContext(processor);

    const node = processor.node();

    return {
      Subscribe: createSubscribeElement(node.element, useChildren, usePubSub),
      Publish: createPublishElement(node.element, useChildren, usePubSub)
    };
  };
};
