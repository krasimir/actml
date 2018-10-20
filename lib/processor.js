'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = processor;

var _deburger = require('./deburger');

var _utils = require('./utils');

var _ = require('./');

var _flow = require('./flow');

var _flow2 = _interopRequireDefault(_flow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function normalizeProps(context, done) {
  var element = context.element;
  var props = element.props,
      name = element.name;

  var normalizedProps = _extends({}, props);

  if (!props) return done();

  Object.keys(props).forEach(function (propName) {
    if (propName.charAt(0) === '$') {
      var prop = propName.substr(1, propName.length);
      var value = element.readFromScope(prop, name);

      if (typeof value !== 'undefined') {
        if (typeof props[propName] === 'string') {
          normalizedProps[props[propName]] = value;
        } else if (typeof props[propName] === 'function') {
          normalizedProps = _extends({}, normalizedProps, props[propName](value));
        } else {
          normalizedProps[prop] = value;
        }
        delete normalizedProps[propName];
      }
    }
  });

  context.normalizedProps = normalizedProps;
  done();
}
function defineChildrenProp(context, done) {
  var element = context.element;
  var children = element.children;

  var childrenProp = {
    value: children.length === 1 ? children[0] : children,
    process: true
    // FACC
  };if (children.length === 1 && !(0, _utils.isItAnElement)(children[0]) && typeof children[0] === 'function') {
    childrenProp.value = function () {
      var _children$;

      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if (params.length === 0) params = [undefined];
      return (0, _.A)((_children$ = children[0]).bind.apply(_children$, [null].concat(_toConsumableArray(params))), null).run(element, function () {});
    };
    // if an array of Elements pass a function
  } else if (children.length >= 3 && children[0] === '(' && children[children.length - 1] === ')') {
    childrenProp.process = false;
    childrenProp.value = function (newResult) {
      context.result = newResult;
      (0, _flow2.default)([processResult, resolveExports, processChildren], done, context);
    };
  }

  context.childrenProp = childrenProp;
  done();
}
function processResult(context, done) {
  var element = context.element,
      result = context.result;


  if (result) {
    // another ActML element
    if ((0, _utils.isItAnElement)(result)) {
      return result.run(element, function (r) {
        context.result = r;
        done();
      });
    } else if (typeof result.next === 'function') {
      // generator
      var gen = result;
      var genRes = { value: undefined, done: false };
      var processGenerator = function processGenerator() {
        if (genRes.done) {
          context.result = genRes.value;
          return done();
        }
        genRes = gen.next(genRes.value);
        if ((0, _utils.isItAnElement)(genRes.value)) {
          return genRes.value.run(element, function (newValue) {
            genRes.value = newValue;
            processGenerator();
          });
        }
        processGenerator();
      };
      return processGenerator(gen);
    }
  }
  done();
}
function resolveExports(context, done) {
  var element = context.element,
      result = context.result;
  var props = element.props,
      scope = element.scope;


  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      var exportedProps = props.exports(result);

      Object.keys(exportedProps).forEach(function (key) {
        scope[key] = exportedProps[key];
        element.dispatch(key, exportedProps[key]);
      });
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, result);
    }
  }
  done();
}
function processChildren(context, done) {
  var element = context.element;

  var children = element.children;

  if (children && Array.isArray(children) && children.length > 0) {
    return (0, _flow2.default)(children.map(function (child) {
      if (!(0, _utils.isItAnElement)(child)) return function (context, childDone) {
        return childDone();
      };
      return function (context, childDone) {
        return child.run(element, childDone);
      };
    }), done, context);
  }
  done();
}
function execute(context, done) {
  var element = context.element;


  context.result = element.func.call(element, _extends({}, context.normalizedProps, {
    children: context.childrenProp.value
  }));
  if (context.result && context.result.then) {
    return context.result.then(function (asyncResult) {
      context.result = asyncResult;
      done();
    });
  }
  done();
}
function processor(element, done) {
  var context = { element: element };

  (0, _flow2.default)([element.debug ? _deburger.debuggerIn : _flow.NOOP, normalizeProps, defineChildrenProp, execute, function (context, done) {
    if (context.childrenProp.process) {
      return (0, _flow2.default)([processResult, resolveExports, processChildren], done, context);
    }
    done();
  }, element.debug ? _deburger.debuggerOut : _flow.NOOP], function () {
    return done(context.result);
  }, context);

  return context.result;
}