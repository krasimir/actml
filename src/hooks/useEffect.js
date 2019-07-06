/* eslint-disable no-return-assign */
import equal from 'fast-deep-equal';
import isValidHookContext from './utils/isValidHookContext';

const Storage = {
  elements: {},
  get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { effects: [], consumer: 0 };
  },
  cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
};

const createEffect = (callback, deps) => {
  return {
    callback,
    deps
  };
};
const updateEffect = (effect, callback, deps) => {
  effect.callback = callback;
  effect.oldDeps = effect.deps;
  effect.deps = deps;
  return effect;
};

function depsEqual(oldDeps, newDeps) {
  if (!oldDeps) return false;
  if (oldDeps.length !== newDeps.length) return false;
  return equal(oldDeps, newDeps);
}
function resolveEffect(node, effect) {
  const { deps, oldDeps, callback } = effect;

  if (typeof deps === 'undefined') {
    effect.cleanUp = callback();
  } else if (deps.length === 0) {
    if (node.element.used() === 1) {
      effect.cleanUp = callback();
    }
  } else {
    const areEqual = depsEqual(oldDeps, deps);

    if (!areEqual) {
      effect.cleanUp = callback();
    }
  }
}

const createUseEffectHook = (processor) => {
  processor.onNodeRemove(node => {
    const { element } = node;
    const storage = Storage.get(element);

    storage.effects.forEach(effect => {
      if (effect.cleanUp) effect.cleanUp();
    });
    Storage.cleanUp(node.element.id);
  });
  processor.onNodeOut(node => {
    const { element } = node;
    const storage = Storage.get(element);

    if (storage.effects.length > 0) {
      storage.effects.forEach(effect => resolveEffect(node, effect));
    }
  });
  return (callback, deps) => {
    isValidHookContext(processor);

    const node = processor.node();
    const { element } = node;
    const storage = Storage.get(element);

    // first run
    if (element.used() === 0) {
      storage.effects.push(createEffect(callback, deps));

    // other runs
    } else {
      let index = storage.consumer;

      storage.consumer = index < storage.effects.length - 1 ? storage.consumer + 1 : 0;
      updateEffect(storage.effects[index], callback, deps);
    }
  };
};

export default createUseEffectHook;

createUseEffectHook.clear = () => {
  Storage.elements = {};
};

