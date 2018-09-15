'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redux = exports.Pipeline = exports.Parallel = exports.speak = exports.D = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Dactory = require('./Dactory');

var _Parallel = require('./words/Parallel');

var _Parallel2 = _interopRequireDefault(_Parallel);

var _redux = require('./words/redux');

var ReduxMethods = _interopRequireWildcard(_redux);

var _Pipeline = require('./Pipeline');

var _Pipeline2 = _interopRequireDefault(_Pipeline);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redux = _extends({}, ReduxMethods);

exports.D = _Dactory.create;
exports.speak = _Dactory.speak;
exports.Parallel = _Parallel2.default;
exports.Pipeline = _Pipeline2.default;
exports.Redux = Redux;