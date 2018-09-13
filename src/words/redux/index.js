export { default as Subscribe } from './Subscribe';
export { default as SubscribeOnce } from './SubscribeOnce';
export { default as Inspect } from './Inspect';

import Integration from './Integration';

export const middleware = function({ getState, dispatch }) {
  return next => action => {
    const result = next(action);
    
    Integration.actionDetected(action);
    return result;
  };
}
export const reset = Integration.reset.bind(Integration);;