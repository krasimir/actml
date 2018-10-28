'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redux = exports.run = exports.A = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('./elements/redux');

var ReduxMethods = _interopRequireWildcard(_redux);

var _Element = require('./elements/Element');

var _Element2 = _interopRequireDefault(_Element);

var _A = require('./elements/A');

var _A2 = _interopRequireDefault(_A);

var _createRootElement = require('./elements/createRootElement');

var _createRootElement2 = _interopRequireDefault(_createRootElement);

var _utils = require('./utils');

var _processor = require('./processor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function create(func, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return func === create ? (0, _Element2.default)(_A2.default, _extends({ scope: '*' }, props), children) : (0, _Element2.default)(func, props, children);
}

function run(element) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (done, reject) {
    if ((0, _utils.isItAnElement)(element)) {
      (0, _processor.createProcessor)(function (error, result) {
        return error ? reject(error) : done(result);
      }).add(element, (0, _createRootElement2.default)(context));
    } else {
      throw new Error('`run` should be called with an ActML element. You are passing:', element);
    }
  });
}

var Redux = _extends({}, ReduxMethods);
var A = create;

exports.A = A;
exports.run = run;
exports.Redux = Redux;