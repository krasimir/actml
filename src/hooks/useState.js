export default function createUseStateHook(state) {
  return (initialState) => {
    if (typeof initialState !== 'undefined') {
      state.set(initialState);
    }
    return [
      state.get(),
      newState => state.set(newState)
    ];
  };
};
