'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fastDeepEqual = require('fast-deep-equal');

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-return-assign */
var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { effects: [], consumer: 0 };
  },
  cleanUp: function cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
};

var createEffect = function createEffect(callback, deps) {
  return {
    callback: callback,
    deps: deps
  };
};
var updateEffect = function updateEffect(effect, callback, deps) {
  effect.callback = callback;
  effect.oldDeps = effect.deps;
  effect.deps = deps;
  return effect;
};

function depsEqual(oldDeps, newDeps) {
  if (!oldDeps) return false;
  if (oldDeps.length !== newDeps.length) return false;
  return (0, _fastDeepEqual2.default)(oldDeps, newDeps);
}
function resolveEffect(node, effect) {
  var deps = effect.deps,
      oldDeps = effect.oldDeps,
      callback = effect.callback;


  if (typeof deps === 'undefined') {
    effect.cleanUp = callback();
  } else if (deps.length === 0) {
    if (node.element.used() === 1) {
      effect.cleanUp = callback();
      if (__DEV__) node.log('useEffect:fired');
    }
  } else {
    var areEqual = depsEqual(oldDeps, deps);

    if (!areEqual) {
      effect.cleanUp = callback();
      if (__DEV__) node.log('useEffect:fired');
    }
  }
}

var createUseEffectHook = function createUseEffectHook(processor) {
  processor.onNodeRemove(function (node) {
    var element = node.element;

    var storage = Storage.get(element);

    storage.effects.forEach(function (effect) {
      if (effect.cleanUp) {
        effect.cleanUp();
        if (__DEV__) node.log('useEffect:cleanUp');
      }
    });
    Storage.cleanUp(node.element.id);
  });
  processor.onNodeOut(function (node) {
    var element = node.element;

    var storage = Storage.get(element);

    if (storage.effects.length > 0) {
      storage.effects.forEach(function (effect) {
        return resolveEffect(node, effect);
      });
    }
  });
  return function (callback, deps) {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();
    var element = node.element;

    var storage = Storage.get(element);

    // first run
    if (element.used() === 0) {
      storage.effects.push(createEffect(callback, deps));

      // other runs
    } else {
      var index = storage.consumer;

      storage.consumer = index < storage.effects.length - 1 ? storage.consumer + 1 : 0;
      updateEffect(storage.effects[index], callback, deps);
    }
  };
};

exports.default = createUseEffectHook;


createUseEffectHook.clear = function () {
  Storage.elements = {};
};