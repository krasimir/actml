'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUseChildrenHook = function createUseChildrenHook(processor) {
  return function () {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();

    node.element.shouldProcessChildrenAutomatically(false);
    return [node.callChildren, node.element.children];
  };
};

exports.default = createUseChildrenHook;