'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ind = function ind(to) {
  var str = '';

  for (var i = 0; i < to; i++) {
    str += ' ';
  }
  return str;
};

var delay = exports.delay = function delay(ms) {
  var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(func());
    }, ms);
  });
};

var printTree = exports.printTree = function printTree(t) {
  if (Array.isArray(t)) {
    return t.map(printTree).join('\n');
  }
  return ind(t.ind) + '<' + t.name + '> (' + t.used + ')';
};

var prettyTree = exports.prettyTree = function prettyTree(t) {
  var str = t.name + '(' + t.used + ')\n';

  if (t.children.length > 0) {
    str += t.children.map(prettyTree).join('');
  }
  return str;
};

var exerciseTree = exports.exerciseTree = function exerciseTree(processor, expected) {
  var filter = function filter(str) {
    return str.split('\n').map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return s !== '' && s !== ' ';
    }).join('\n');
  };
  var result = prettyTree(processor.system().tree.diagnose());

  expect(filter(result)).toEqual(filter(expected));
};

var getPrettyTree = exports.getPrettyTree = function getPrettyTree(processor) {
  return prettyTree(processor.system().tree.diagnose());
};