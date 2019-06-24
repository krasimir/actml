"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-return-assign */

var createProduct = exports.createProduct = function createProduct(element) {
  var state;

  return {
    set: function set(value) {
      return state = value;
    },
    get: function get() {
      return state;
    },
    clear: function clear() {
      state = undefined;
    }
  };
};