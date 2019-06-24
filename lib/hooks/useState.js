"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseStateHook;
function createUseStateHook(element) {
  var storage = {
    states: []
  };
  var consumer = 0;

  return function (initialState) {
    var index = void 0;

    if (!element.isUsed) {
      storage.states.push(initialState);
      index = storage.states.length - 1;
    } else {
      index = consumer;
      consumer = index < storage.states.length - 1 ? consumer + 1 : 0;
    }

    return [storage.states[index], function (newState) {
      return storage.states[index] = newState;
    }];
  };
}