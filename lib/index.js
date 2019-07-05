'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUniverse = createUniverse;

var _Processor = require('./Processor');

var _Processor2 = _interopRequireDefault(_Processor);

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _ActElement = require('./ActElement');

var _ActElement2 = _interopRequireDefault(_ActElement);

var _useChildren = require('./hooks/useChildren');

var _useChildren2 = _interopRequireDefault(_useChildren);

var _useElement = require('./hooks/useElement');

var _useElement2 = _interopRequireDefault(_useElement);

var _useProduct = require('./hooks/useProduct');

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = require('./hooks/usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = require('./hooks/useState');

var _useState2 = _interopRequireDefault(_useState);

var _useReducer = require('./hooks/useReducer');

var _useReducer2 = _interopRequireDefault(_useReducer);

var _useElements = require('./hooks/useElements');

var _useElements2 = _interopRequireDefault(_useElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUniverse() {
  var processor = (0, _Processor2.default)();

  function A(func, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return (0, _ActElement2.default)(func, props, children);
  }
  function run(element) {
    if (!(0, _isActMLElement2.default)(element)) {
      throw new Error('ActML element expected. Instead ' + element.toString() + ' passed.');
    }
    return processor.run(element);
  }
  var Fragment = function Fragment() {};
  var useChildren = (0, _useChildren2.default)(processor);
  var useElement = (0, _useElement2.default)(processor);
  var useState = (0, _useState2.default)(processor);
  var useProduct = (0, _useProduct2.default)(processor, useState);
  var usePubSub = (0, _usePubSub2.default)(processor);
  var useReducer = (0, _useReducer2.default)(useState);
  var useElements = (0, _useElements2.default)(processor, useChildren, usePubSub);

  return {
    A: A,
    run: run,
    Fragment: Fragment,
    processor: processor,
    useChildren: useChildren,
    useElement: useElement,
    useProduct: useProduct,
    usePubSub: usePubSub,
    useState: useState,
    useReducer: useReducer,
    useElements: useElements
  };
}

var universe = createUniverse();

module.exports = universe;
module.exports.createUniverse = createUniverse();