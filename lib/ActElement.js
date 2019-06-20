"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (func, props, children) {
  async function run() {
    var result = func(props);

    if (children && children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          await children[i].run();
        }
      }
    }

    if (isActMLElement(result)) {
      return result.run();
    }
    return result;
  }

  return {
    __actML: true,
    __children: children,
    run: run
  };
};

var isActMLElement = exports.isActMLElement = function isActMLElement(element) {
  return element && element.__actML;
};

;