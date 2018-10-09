'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var _children = require('./children');

var _children2 = _interopRequireDefault(_children);

var _exports = require('./exports');

var _exports2 = _interopRequireDefault(_exports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function executeMiddleware(element) {
  var func = element.func,
      props = element.props,
      name = element.name;

  var normalizedProps = _extends({}, props);

  // normalizing props
  if (props) {
    normalizedProps = _extends({}, props);
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
  }

  // creating the `children` prop
  normalizedProps.children = function (result) {
    element.result = result;
    (0, _exports2.default)(element);
    (0, _children2.default)(element);
  };

  // actual running of the function
  element.result = await func.call(element, normalizedProps);
}

executeMiddleware._name = 'EXECUTE';

exports.default = executeMiddleware;