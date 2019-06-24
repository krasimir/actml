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
      if (!subscribers[dependent.__actml]) {
        subscribers[dependent.__actml] = dependent;
      }
    }
  };
};