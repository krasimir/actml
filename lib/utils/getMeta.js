'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMeta;
var getFuncName = function getFuncName(func) {
  if (func.name) return func.name;

  var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};

function getMeta(func, props) {
  return {
    name: getFuncName(func),
    props: props,
    propNames: props ? Object.keys(props) : null
  };
};