/* eslint-disable no-return-assign */

const Storage = {
  elements: {},
  get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { states: [], consumer: 0 };
  }
};

export default function createUseStateHook(element, rerun) {
  const storage = Storage.get(element);

  return (initialState) => {
    let index;

    // first run
    if (element.used() === 0) {
      storage.states.push(initialState);
      index = storage.states.length - 1;

    // other runs
    } else {
      index = storage.consumer;
      storage.consumer = index < storage.states.length - 1 ? storage.consumer + 1 : 0;
    }

    return [
      storage.states[index],
      newState => {
        storage.states[index] = newState;
        if (!element.isRunning()) {
          rerun();
        }
        return newState;
      }
    ];
  };
}

createUseStateHook.clear = () => {
  Storage.elements = {};
};
