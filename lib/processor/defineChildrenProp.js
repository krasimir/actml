'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable max-len, consistent-return */


exports.default = defineChildrenProp;

var _utils = require('../utils');

var _ = require('../');

var _ChildrenWrapper = require('../elements/ChildrenWrapper');

var _ChildrenWrapper2 = _interopRequireDefault(_ChildrenWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var WRONG_PARAMS_ERROR = 'The "children" prop expects an object (key-value pairs) as first argument and a callback as second argument.';

function defineChildrenProp(element) {
  var children = element.children;

  // FACC

  if (children.length === 1 && !(0, _utils.isItAnElement)(children[0]) && typeof children[0] === 'function') {
    return function (props) {
      if (typeof props !== 'undefined' && (typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
        throw new Error(WRONG_PARAMS_ERROR);
      }
      return new Promise(function (childDone) {
        return (0, _.A)(children[0], props).run(element, childDone);
      });
    };
    // an array of ActML elements
  } else if (children.length >= 3 && children[0] === '(' && children[children.length - 1] === ')') {
    return function (props, childrenDone) {
      if (typeof props !== 'undefined' && (typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
        throw new Error(WRONG_PARAMS_ERROR);
      }
      return _.A.apply(undefined, [_ChildrenWrapper2.default, props].concat(_toConsumableArray(children.slice(1, -1)))).run(element, childrenDone || function () {});
    };
  }

  return null;
}