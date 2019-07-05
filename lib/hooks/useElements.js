'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseElementsHook;

var _Subscribe = require('./elements/Subscribe');

var _Subscribe2 = _interopRequireDefault(_Subscribe);

var _Publish = require('./elements/Publish');

var _Publish2 = _interopRequireDefault(_Publish);

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUseElementsHook(processor, useChildren, usePubSub) {
  return function () {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();

    return {
      Subscribe: (0, _Subscribe2.default)(node.element, useChildren, usePubSub),
      Publish: (0, _Publish2.default)(node.element, useChildren, usePubSub)
    };
  };
};