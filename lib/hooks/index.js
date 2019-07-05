'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = initializeHooks;

var _useElement = require('./useElement');

var _useElement2 = _interopRequireDefault(_useElement);

var _useChildren = require('./useChildren');

var _useChildren2 = _interopRequireDefault(_useChildren);

var _useProduct = require('./useProduct');

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = require('./usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = require('./useState');

var _useState2 = _interopRequireDefault(_useState);

var _useReducer = require('./useReducer');

var _useReducer2 = _interopRequireDefault(_useReducer);

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initializeHooks(branch, callChildren, stack, process) {
  var element = branch.element;

  var useElement = (0, _useElement2.default)(element);
  var useChildren = (0, _useChildren2.default)(element, callChildren);

  var _createUseProductHook = (0, _useProduct2.default)(element, stack),
      _createUseProductHook2 = _slicedToArray(_createUseProductHook, 2),
      useProduct = _createUseProductHook2[0],
      resolvedProductProps = _createUseProductHook2[1];

  var usePubSub = (0, _usePubSub2.default)(element);
  var useState = (0, _useState2.default)(element, function () {
    return process(branch, stack);
  });
  var useReducer = (0, _useReducer2.default)(element, useState);

  return _extends({}, resolvedProductProps, {
    useChildren: useChildren,
    useElement: useElement,
    useProduct: useProduct,
    usePubSub: usePubSub,
    useState: useState,
    useReducer: useReducer,
    useElements: function useElements() {
      return (0, _elements2.default)(element);
    }
  });
};