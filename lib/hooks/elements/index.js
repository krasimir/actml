'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseElementsHook;

var _Publish = require('./Publish');

var _Publish2 = _interopRequireDefault(_Publish);

var _Subscribe = require('./Subscribe');

var _Subscribe2 = _interopRequireDefault(_Subscribe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUseElementsHook(element) {
  return {
    Publish: (0, _Publish2.default)(element),
    Subscribe: (0, _Subscribe2.default)(element)
  };
}