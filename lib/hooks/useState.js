"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseStateHook;
/* eslint-disable no-return-assign */

var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { states: [], consumer: 0 };
  }
};

function createUseStateHook(element, rerun) {
  var storage = Storage.get(element);

  return function (initialState) {
    var index = void 0;

    // first run
    if (element.used() === 0) {
      storage.states.push(initialState);
      index = storage.states.length - 1;

      // other runs
    } else {
      index = storage.consumer;
      storage.consumer = index < storage.states.length - 1 ? storage.consumer + 1 : 0;
    }

    return [storage.states[index], function (newState) {
      storage.states[index] = newState;
      if (!element.isRunning()) {
        rerun();
      }
      return newState;
    }];
  };
}

createUseStateHook.clear = function () {
  Storage.elements = {};
};