(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _src = require('../../src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MyLogic(props) {
  console.log('MyLogic a = ', props.a);
  return props.a * 4;
} /** @jsx dialectica */

function Foo(_ref) {
  var data = _ref.data;

  console.log('Foo parent = ' + data);
}
function Bar(_ref2) {
  var data = _ref2.data;

  console.log('Bar parent = ' + data);
}

var dialect = (0, _src2.default)(
  MyLogic,
  { a: 10 },
  function (result) {
    return (0, _src2.default)(
      _src.Dialect,
      null,
      (0, _src2.default)(Foo, { data: result }),
      (0, _src2.default)(Bar, { data: result })
    );
  }
);

_src2.default.speak(dialect);

},{"../../src":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dialectica;
exports.Dialect = Dialect;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DIALECTICA_TYPE = '__dialectica';

function dialectica(func, params) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return _defineProperty({
    func: func,
    params: params,
    children: children
  }, DIALECTICA_TYPE, true);
}

function speak(_ref2) {
  var func = _ref2.func,
      params = _ref2.params,
      children = _ref2.children;

  if (typeof func === 'function') {
    var result = func.call(this, params);

    if (children) {
      if (children.length === 1 && !children[0][DIALECTICA_TYPE]) {
        speak(children[0](result));
      } else {
        children.forEach(function (c) {
          speak({
            func: c.func,
            params: Object.assign({}, c.params, { parent: result }),
            children: c.children
          });
        });
      }
    }
  }
}

dialectica.speak = speak;

function Dialect() {}

},{}]},{},[1]);
