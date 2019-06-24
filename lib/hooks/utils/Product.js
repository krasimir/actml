"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createProduct = exports.createProduct = function createProduct(element) {
  var subscribers = {};
  var state;

  return {
    set: function set(value) {
      state = value;
      Object.keys(subscribers).forEach(function (id) {
        subscribers[id].run(element);
      });
      return value;
    },
    get: function get() {
      return state;
    },
    subscribe: function subscribe(dependent) {
      if (!(dependent.__actml in subscribers)) {
        subscribers[dependent.__actml] = dependent;
      }
    },
    clear: function clear() {
      subscribers = {};
      state = undefined;
    }
  };
};