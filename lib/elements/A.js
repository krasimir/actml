"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = A;
/* eslint-disable max-len */

function A() {
  return this.scope;
}
A.after = function (context, done) {
  var _context$element = context.element,
      props = _context$element.props,
      scope = _context$element.scope;


  if (props && props.result) {
    if (!scope.hasOwnProperty(props.result)) {
      throw new Error("You are trying to return \"" + props.result + "\" as a result of an <A> element. However no one down the chain is exporting it.");
    }
    context.result = scope[props.result];
  }
  done();
};