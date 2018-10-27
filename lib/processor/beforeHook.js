"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = beforeHook;
function beforeHook(execContext, done) {
  if (execContext.element.func.before) {
    execContext.element.func.before(execContext, done);
  } else {
    done();
  }
}