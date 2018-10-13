'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRootElement;
function createRootElement(context) {
  return {
    __actml: true,
    context: context,
    scope: {},
    dispatch: function dispatch() {},
    readFromScope: function readFromScope(key, requester) {
      var value = this.scope[key];
      if (typeof value !== 'undefined') return value;

      value = this.context[key];
      if (typeof value !== 'undefined') return value;

      requester = requester === '' ? 'unknown' : requester;
      throw new Error('Undefined variable "' + key + '" requested by <' + requester + '>.');
    }
  };
}