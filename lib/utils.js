'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getFuncName = exports.getFuncName = function getFuncName(fun) {
  if (typeof fun === 'string') return fun;

  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
};
var getScopedVars = exports.getScopedVars = function getScopedVars(props) {
  var scoped = [];
  if (props && props.scope) {
    scoped = props.scope.split(/, ?/);
  }
  return scoped;
};