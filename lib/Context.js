"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;
function createContext(initialData) {
  var data = initialData || {};

  return {
    get: function get(key) {
      return data[key];
    },
    set: function set(key, value) {
      data[key] = value;
    },
    dump: function dump() {
      return data;
    }
  };
}