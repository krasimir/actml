'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fragment = exports.run = exports.A = undefined;

var _ActElement = require('./ActElement');

var _ActElement2 = _interopRequireDefault(_ActElement);

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(func, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return (0, _ActElement2.default)(func, props, children);
}
function run(element) {
  if (!(0, _isActMLElement2.default)(element)) {
    throw new Error('ActML element expected. Instead ' + element.toString() + ' passed.');
  }
  return element.run();
}

var A = create;
var Fragment = function Fragment() {};

exports.A = A;
exports.run = run;
exports.Fragment = Fragment;