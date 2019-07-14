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

export default function createUseReducerHook(useState) {
  return (reducer, initialState) => {
    const [ state, setState ] = useState(initialState);
    const dispatch = action => setState(reducer(state(), action));

    return [
      state,
      dispatch,
      createDispatchElement(dispatch), // <Dispatch>
      () => state() // <GetState>
    ];
  };
}
