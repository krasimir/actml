import isValidHookContext from './utils/isValidHookContext';

function createDispatchElement(dispatch) {
  return ({ action, propsToAction, ...rest }) => {
    if (action) {
      dispatch(action);
    } else if (propsToAction) {
      dispatch(propsToAction(rest));
    } else {
      throw new Error('<Dispatch> expects "action" or "propsToAction" prop.');
    }
  };
}

export default function createUseReducerHook(processor, useState) {
  return (reducer, initialState) => {
    isValidHookContext(processor);

    const node = processor.node();
    const [ state, setState ] = useState(initialState);
    const dispatch = action => {
      if (__DEV__) {
        node.log('useReducer:dispatch', action.type);
      }
      setState(reducer(state(), action));
    };

    return [
      state,
      dispatch,
      createDispatchElement(dispatch), // <Dispatch>
      () => state() // <GetState>
    ];
  };
}
