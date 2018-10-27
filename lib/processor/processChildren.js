'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processChildren;

var _utils = require('../utils');

/* eslint-disable consistent-return */
function processChildren(execContext, done) {
  var element = execContext.element;

  var children = element.children;

  if (children && Array.isArray(children) && children.length > 0) {
    return (0, _utils.flow)().withContext(execContext).done(done).run(children.map(function (child) {
      if (!(0, _utils.isItAnElement)(child)) return function (execContext, childDone) {
        return childDone();
      };
      return function (execContext, childDone) {
        return child.run(element, childDone);
      };
    }));
  }
  done();
}