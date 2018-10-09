'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getFuncName = exports.getFuncName = function getFuncName(fun) {
  if (typeof fun === 'string') return fun;

  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));

  if (ret === '') return 'unknown';
  return ret;
};
var getScopedVars = exports.getScopedVars = function getScopedVars(props) {
  var scoped = [];
  if (props && props.scope) {
    scoped = props.scope.split(/, ?/);
  }
  return scoped;
};

var isItAnElement = exports.isItAnElement = function isItAnElement(element) {
  return element && !!element.run;
};

var ids = 100;
var getId = exports.getId = function getId() {
  return ids++;
};