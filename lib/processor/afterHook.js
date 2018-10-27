"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = afterHook;
function afterHook(execContext, done) {
  if (execContext.element.func.after) {
    execContext.element.func.after(execContext, done);
  } else {
    done();
  }
}