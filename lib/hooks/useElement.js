"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseElementHook;
function createUseElementHook(element) {
  return function () {
    return [element];
  };
}