'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = normalizeProps;
/* eslint-disable consistent-return */

function normalizeProps(execContext, done) {
  var element = execContext.element;
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

  execContext.normalizedProps = normalizedProps;
  done();
}