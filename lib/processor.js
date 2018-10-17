'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _deburger = require('./deburger');

var _deburger2 = _interopRequireDefault(_deburger);

var _utils = require('./utils');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function normalizeProps(element) {
  var props = element.props,
      name = element.name;

  var normalizedProps = _extends({}, props);

  if (!props) return normalizedProps;

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

  return normalizedProps;
}
function defineChildrenProp(element) {
  var children = element.children;


  if (children.length === 1 && !(0, _utils.isItAnElement)(children[0]) && typeof children[0] === 'function') {
    // FACC
    return function () {
      var _children$;

      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if (params.length === 0) params = [undefined];
      return (0, _.A)((_children$ = children[0]).bind.apply(_children$, [null].concat(_toConsumableArray(params))), null).run(element);
    };
  } else if (children.find(_utils.isItAnElement)) {
    // if an array of Elements pass a function
    return async function (newResult) {
      element.result = newResult;
      resolveExports(element);
      await processChildren(element);
    };
  }

  return children.length === 1 ? children[0] : children;
}
async function processResult(element) {
  var result = element.result;


  if (result) {
    // another ActML element
    if ((0, _utils.isItAnElement)(result)) {
      await result.run(element);
    } else if (typeof result.next === 'function') {
      // generator
      var gen = result;
      var genRes = { value: undefined, done: false };

      while (!genRes.done) {
        genRes = gen.next(genRes.value);
        if ((0, _utils.isItAnElement)(genRes.value)) {
          genRes.value = await genRes.value.run(element);
        }
      }
      element.result = genRes.value;
    }
  }
}
function resolveExports(element) {
  var props = element.props,
      scope = element.scope,
      result = element.result;


  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      var exportedProps = props.exports(result);

      Object.keys(exportedProps).forEach(function (key) {
        scope[key] = exportedProps[key];
        element.dispatch(key, exportedProps[key]);
      });
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, element.result);
    }
  }
}
async function processChildren(element) {
  var children = element.children;


  if (children && Array.isArray(children) && children.length > 0) {
    var pointer = 0;

    while (pointer < children.length) {
      if ((0, _utils.isItAnElement)(children[pointer])) {
        await children[pointer].run(element);
      }
      pointer++;
    }
  }
}

exports.default = async function processor(element) {
  var debug = element.debug,
      props = element.props,
      name = element.name,
      func = element.func;

  var normalizedProps = normalizeProps(element);
  var childrenProp = defineChildrenProp(element);

  debug && (0, _deburger2.default)({ name: name, props: normalizedProps }, 'IN');
  try {
    element.result = await func.call(element, _extends({}, normalizedProps, {
      children: childrenProp
    }));
    await processResult(element);
    !func.ignoreChildren && resolveExports(element);
    !func.ignoreChildren && (await processChildren(element));
  } catch (error) {
    if (props && props.onError) {
      props.onError.mergeToProps({ error: error });
      if (!(await props.onError.run(element))) {
        // ...
      };
    } else {
      throw error;
    }
  }
  debug && (0, _deburger2.default)(element, 'OUT');
  return element.result;
};