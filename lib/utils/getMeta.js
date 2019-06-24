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
  var propNames = props ? Object.keys(props) : [];
  var bindings = [];
  var exportsKeyword = void 0;

  propNames.forEach(function (propName) {
    if (propName.charAt(0) === '$') {
      bindings.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      exportsKeyword = props.exports;
    }
  });

  return {
    name: getFuncName(func),
    bindings: bindings,
    exportsKeyword: exportsKeyword
  };
};