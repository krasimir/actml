export default function createUseStateHook(element) {
  const storage = {
    states: []
  };
  let consumer = 0;

  return (initialState) => {
    let index;

    if (!element.isUsed) {
      storage.states.push(initialState);
      index = storage.states.length - 1;
    } else {
      index = consumer;
      consumer = index < storage.states.length - 1 ? consumer + 1 : 0;
    }

    return [
      storage.states[index],
      newState => (storage.states[index] = newState)
    ];
  };
}
