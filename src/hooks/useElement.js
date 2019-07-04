import isValidHookContext from './utils/isValidHookContext';

const createUseElementHook = (processor) => {
  return () => {
    isValidHookContext(processor);

    return processor.node().element;
  };
};

export default createUseElementHook;

