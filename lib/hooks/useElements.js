'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseElementsHook;

var _Subscribe = require('./elements/Subscribe');

var _Subscribe2 = _interopRequireDefault(_Subscribe);

var _Publish = require('./elements/Publish');

var _Publish2 = _interopRequireDefault(_Publish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUseElementsHook(hostElement) {
  return function () {
    return {
      Subscribe: (0, _Subscribe2.default)(hostElement),
      Publish: (0, _Publish2.default)(hostElement)
    };
  };
};