import Subscribe from './Subscribe';
import Integration from './Integration';

export const middleware = function({ getState, dispatch }) {
  return next => action => {
    const result = next(action);
    
    Integration.actionDetected(action);
    return result;
  };
}
export const Subscribe = Subscribe;