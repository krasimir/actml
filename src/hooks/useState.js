/* eslint-disable no-return-assign */
import isValidHookContext from './utils/isValidHookContext';

const Storage = {
  elements: {},
  get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { states: [], consumer: 0 };
  },
  cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
};

export default function createUseStateHook(processor) {
  processor.onNodeRemove(node => Storage.cleanUp(node.element.id));
  return (initialState) => {
    isValidHookContext(processor);

    const node = processor.node();
    const { element } = node;
    const storage = Storage.get(element);

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
          node.rerun();
        }
        return newState;
      },
      () => storage.states[index]
    ];
  };
}

createUseStateHook.clear = () => {
  Storage.elements = {};
};
