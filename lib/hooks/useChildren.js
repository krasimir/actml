"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createUseChildrenHook = function createUseChildrenHook(element, callChildren) {
  return function () {
    element.shouldProcessChildrenAutomatically(false);
    return [callChildren, element.children];
  };
};

exports.default = createUseChildrenHook;