import isValidHookContext from './utils/isValidHookContext';
import { PUBLIC_CONTEXT_KEY } from '../Context';

const createUseElementHook = (processor) => {
  return (Context) => {
    isValidHookContext(processor);

    return Context[PUBLIC_CONTEXT_KEY]();
  };
};

export default createUseElementHook;

