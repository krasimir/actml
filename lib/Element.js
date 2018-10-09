'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Element;

var _Processor = require('./Processor');

var _Processor2 = _interopRequireDefault(_Processor);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Element(func, props, children) {
  return {
    id: (0, _utils.getId)(),
    func: func,
    props: props,
    children: children,
    scopedVars: (0, _utils.getScopedVars)(props),
    name: (0, _utils.getFuncName)(func),
    scope: {},
    processor: undefined,
    result: undefined,
    context: undefined,
    parent: undefined,
    debug: undefined,

    mergeToProps: function mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    dispatch: function dispatch(type, value) {
      if (this.scopedVars.indexOf(type) >= 0 || this.scopedVars[0] === '*') {
        this.scope[type] = value;
      } else {
        this.parent.dispatch(type, value);
      }
    },
    readFromScope: function readFromScope(key, requester) {
      var scope = this.scope,
          parent = this.parent;

      var value = scope[key];

      if (typeof value !== 'undefined') return value;
      return parent.readFromScope(key, requester);
    },
    run: async function run(parent) {
      if (!parent) {
        throw new Error('The Element can not be run with no parent.');
      }
      this.parent = parent;
      this.context = parent.context;

      if (!this.processor) {
        this.processor = (0, _Processor2.default)(this, this.func.processor);
      }

      if (typeof func === 'string') {
        if (this.context[func]) {
          this.func = this.context[func];
        } else {
          throw new Error('"' + func + '" is missing in the context.');
        }
      }

      return await this.processor();
    }
  };
}

// Static
Element.createRootElement = function (context) {
  return {
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
};