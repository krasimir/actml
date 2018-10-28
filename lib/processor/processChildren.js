'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processChildren;

var _utils = require('../utils');

function processChildren(execContext, done) {
  var element = execContext.element,
      processor = execContext.processor;

  var children = element.children;

  if (children && Array.isArray(children) && children.length > 0) {
    var i = -1;

    (function process() {
      i++;
      i === children.length ? done() : (0, _utils.isItAnElement)(children[i]) ? processor.add(children[i], element, process) : process();
    })();
  } else {
    done();
  }
} /* eslint-disable consistent-return */