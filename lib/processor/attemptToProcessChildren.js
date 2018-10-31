'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = attemptToProcessChildren;

var _processChildren = require('./processChildren');

var _processChildren2 = _interopRequireDefault(_processChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attemptToProcessChildren(execContext, done, addNewWorker) {
  if (!execContext.childrenProp) {
    addNewWorker(_processChildren2.default);
  }
  done();
}