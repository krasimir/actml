'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

exports.default = async function childrenMiddleware(element) {
  var children = element.children;


  if (children && Array.isArray(children) && children.length > 0) {
    var pointer = 0;

    while (pointer < children.length) {
      if ((0, _utils.isItAnElement)(children[pointer])) {
        await children[pointer].run(element);
      }
      pointer++;
    }
  }
};