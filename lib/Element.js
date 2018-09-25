'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Element;

var _Pipeline = require('./Pipeline');

var _utils = require('./utils');

function Element(func, props, children) {
  return {
    func: func,
    props: props,
    children: children,
    scopedVars: (0, _utils.getScopedVars)(props),
    name: (0, _utils.getFuncName)(func),
    scope: {},
    pipeline: undefined,
    result: undefined,
    context: undefined,
    parent: undefined,

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
    readFromScope: function readFromScope(key) {
      var scope = this.scope,
          parent = this.parent;

      var value = scope[key];

      if (typeof value !== 'undefined') return value;
      return parent.readFromScope(key);
    },
    run: async function run(parent) {
      if (!parent) {
        throw new Error('The Element can not be run with no parent.');
      }
      this.parent = parent;
      this.context = parent.context;
      this.pipeline = this.func.pipeline || (0, _Pipeline.createDefaultPipeline)(this);

      if (typeof func === 'string') {
        this.func = this.context[func];
      }

      return await this.pipeline.process();
    }
  };
}

// Static
Element.isItAnElement = function (element) {
  return element && !!element.run;
};
Element.createRootElement = function (context) {
  return {
    context: context,
    scope: {},
    dispatch: function dispatch() {},
    readFromScope: function readFromScope(key) {
      var value = this.scope[key];
      if (typeof value !== 'undefined') return value;

      value = this.context[key];
      if (typeof value !== 'undefined') return value;

      throw new Error('Undefined variable "' + key + '".');
    }
  };
};
Element.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};