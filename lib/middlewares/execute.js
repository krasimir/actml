'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Element = require('../Element');

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleElementError = async function handleElementError(error, props, element) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error: error });

    var onErrorStrategy = await props.onError.run(element);

    if (onErrorStrategy === false) {
      throw new Error(_Element2.default.errors.STOP_PROCESSING);
    } else if (onErrorStrategy === true) {
      throw new Error(_Element2.default.errors.CONTINUE_PROCESSING);
    } else {
      // swallowing the error
    }
  } else {
    throw error;
  }
};

exports.default = async function execute(element) {
  var func = element.func,
      props = element.props;

  var normalizedProps = _extends({}, props);

  // normalizing props
  if (props) {
    normalizedProps = _extends({}, props);
    Object.keys(props).forEach(function (propName) {
      if (propName.charAt(0) === '$') {
        var prop = propName.substr(1, propName.length);
        var value = element.readFromScope(prop);

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

  // actual running of the function
  try {
    element.result = await func.call(element, normalizedProps);
  } catch (error) {
    await handleElementError(error, normalizedProps, element);
  }
};