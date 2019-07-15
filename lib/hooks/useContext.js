'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

var _Context = require('../Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUseElementHook = function createUseElementHook(processor) {
  return function (Context) {
    (0, _isValidHookContext2.default)(processor);

    return Context[_Context.PUBLIC_CONTEXT_KEY]();
  };
};

exports.default = createUseElementHook;