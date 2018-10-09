'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _utils = require('../utils');

async function childrenMiddleware(element) {
  var func = element.func,
      children = element.children,
      result = element.result;

  // FACC pattern

  if (children && children.length === 1 && !(0, _utils.isItAnElement)(children[0])) {
    var resultOfFACC = await children[0].call(element, result);

    if ((0, _utils.isItAnElement)(resultOfFACC)) {
      await resultOfFACC.run(element);
    }

    // nested tags
  } else if (children && children.length > 0) {
    var pointer = 0;

    while (pointer < children.length) {
      await children[pointer].run(element);
      pointer++;
    }
  }
}
childrenMiddleware._name = 'CHILDREN';

exports.default = childrenMiddleware;