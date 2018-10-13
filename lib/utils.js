'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getFuncName = exports.getFuncName = function getFuncName(func) {
  var result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());
  return result ? result[1] : '';
};

var isItAnElement = exports.isItAnElement = function isItAnElement(element) {
  return element && element.__actml;
};

var ids = 100;
var getId = exports.getId = function getId() {
  return ids++;
};