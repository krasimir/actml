'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Element;

var _utils = require('../utils');

function Element(func, props, children) {
  var scopedVars = props && props.scope ? props.scope.split(/, ?/) : [];

  var element = {
    __actml: true,
    id: (0, _utils.getId)(),
    func: func,
    children: children,
    name: (0, _utils.getFuncName)(func),
    props: props,
    scope: {},
    context: undefined,
    parent: undefined,
    debug: false,
    isErrorHandler: false,

    mergeToProps: function mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    mergeToScope: function mergeToScope(additionalProps) {
      this.scope = Object.assign({}, this.scope, additionalProps);
    },
    dispatch: function dispatch(type, value) {
      if (scopedVars.indexOf(type) >= 0 || scopedVars[0] === '*') {
        this.scope[type] = value;
      } else {
        this.parent.dispatch(type, value);
      }
    },
    readFromScope: function readFromScope(key, requester) {
      var scope = this.scope,
          parent = this.parent;


      if (scope.hasOwnProperty(key)) return scope[key];
      return parent.readFromScope(key, requester);
    },
    handleError: function handleError(error) {
      if (this.props && this.props.onError) {
        this.props.onError.mergeToProps({ error: error });
        this.props.onError.isErrorHandler = true;
        return this.props.onError;
      }
      return this.parent.handleError(error);
    },
    initialize: function initialize(parent) {
      if (!parent) {
        throw new Error('The Element can not be run with no parent.');
      }
      this.parent = parent;
      this.context = parent.context;
      this.debug = parent.debug;

      // setting the debug flag
      if (this.props && typeof this.props.debug !== 'undefined') {
        this.debug = true;
      }

      if (typeof func === 'string') {
        if (this.context[func]) {
          this.func = this.context[func];
          this.name = (0, _utils.getFuncName)(this.func);
        } else {
          throw new Error('"' + func + '" is missing in the context.');
        }
      }

      return this;
    }
  };

  return element;
}