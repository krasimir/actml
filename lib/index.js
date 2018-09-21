'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redux = exports.Pipeline = exports.Parallel = exports.run = exports.A = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Parallel = require('./elements/Parallel');

var _Parallel2 = _interopRequireDefault(_Parallel);

var _redux = require('./elements/redux');

var ReduxMethods = _interopRequireWildcard(_redux);

var _Pipeline = require('./Pipeline');

var _Pipeline2 = _interopRequireDefault(_Pipeline);

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _Context = require('./Context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(func, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // using D as a dymmy component
  if (func === create) return (0, _Element2.default)(function () {
    return this.context.dump();
  }, props, children);
  return (0, _Element2.default)(func, props, children);
}
async function run(element, contextData) {
  var context = (0, _Context.createContext)(contextData);

  if (_Element2.default.isItAnElement(element)) {
    if (_Element2.default.isItAnElement(element.func)) {
      element.func.mergeToProps(element.props);
      return await element.func.run(context);
    }
    return await element.run(context);
  }
  return await create(element, null).run(context);
}

var Redux = _extends({}, ReduxMethods);
var A = create;

exports.A = A;
exports.run = run;
exports.Parallel = _Parallel2.default;
exports.Pipeline = _Pipeline2.default;
exports.Redux = Redux;