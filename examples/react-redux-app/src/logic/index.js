/** @jsx D */
import { D, pipeline } from 'dactory';

const { normalizeProps, execute, processChildren } = pipeline;

// ****************************************************************
const ReduxIntegration = {
  _listeners: [],
  middleware: function dactoryReduxMiddleware({ getState, dispatch }) {
    return next => action => {
      const result = next(action);
      
      ReduxIntegration.actionDetected(action);
      return result;
    };
  },
  addListener(callback) {
    this._listeners.push(callback);
  },
  actionDetected(action) {
    this._listeners.forEach(l => l(action));
  }
}

export function Subscribe({ action }) {
  ReduxIntegration.addListener(action => {
    console.log(action);
  });
}
Subscribe.pipeline = [
  normalizeProps,
  execute
];
Subscribe.middleware = ReduxIntegration.middleware;

// ****************************************************************

export default function StartUp() {
  return (
    <Subscribe></Subscribe>
  )
}