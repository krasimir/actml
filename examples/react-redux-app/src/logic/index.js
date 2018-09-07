/** @jsx D */
import { D, pipeline } from 'dactory';

import { GET_POSTS } from '../redux/constants';

// ****************************************************************
const { normalizeProps, execute, processChildren } = pipeline;

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

export function Subscribe(props) {
  if (props && props.type) {
    ReduxIntegration.addListener(action => {
      if (action.type === props.type) {
        processChildren({ ...this, result: action });
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}
Subscribe.pipeline = [
  normalizeProps,
  execute
];
Subscribe.middleware = ReduxIntegration.middleware;

// ****************************************************************

export default function StartUp() {
  return (
    <Subscribe type={ 'GET_POSTS' }>
      {
        action => {
          console.log(action);
        }
      }
    </Subscribe>
  )
}