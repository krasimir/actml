import Integration from './Integration';

export default function actMLReduxMiddleware({ getState, dispatch }) {
  Integration.getState = getState;
  Integration.dispatch = dispatch;
  return next => action => {
    const result = next(action);
    
    Integration.actionDetected(action);
    return result;
  };
}