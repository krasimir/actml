import isValidHookContext from './utils/isValidHookContext';

const createUseChildrenHook = (processor) => {
  return () => {
    isValidHookContext(processor);

    const node = processor.node();

    node.element.shouldProcessChildrenAutomatically(false);
    return [ node.callChildren, node.element.children ];
  };
};

export default createUseChildrenHook;
