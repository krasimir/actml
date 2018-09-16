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
      if (data[key]) {
        console.warn("\"" + key + "\" is already defined in the current context. This may be completely fine if you know what you are doing.");
      }
      data[key] = value;
    },
    dump: function dump() {
      return data;
    }
  };
}