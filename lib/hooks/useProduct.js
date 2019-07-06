'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint-disable no-return-assign */


var resolveProduct = function resolveProduct(prop, stackIndex, stack, error) {
  if (stackIndex < 0) {
    throw error;
  }
  var parent = stack[stackIndex];
  var product = parent.requestProduct ? parent.requestProduct(prop) : null;

  if (product !== null) {
    return product.value;
  }
  return resolveProduct(prop, stackIndex - 1, stack, error);
};

var createUseProductHook = function createUseProductHook(processor) {
  processor.onNodeEnter(function (node) {
    var element = node.element,
        stack = node.stack;
    var props = element.props;

    var propNames = props ? Object.keys(props) : [];

    propNames.forEach(function (propName) {
      if (propName.charAt(0) === '$') {
        var keyword = propName.substr(1, propName.length);
        var stackToSearchIn = node.stack.slice(0, node.stack.length - 1);
        var productValue = resolveProduct(keyword, stackToSearchIn.length - 1, stackToSearchIn, new Error('"' + keyword + '" prop requested by "' + element.name + '" can not be found.\n\nStack:\n' + stack.map(function (_ref) {
          var name = _ref.name;
          return '  <' + name + '>';
        }).join('\n')));

        element.mergeProps(_defineProperty({}, keyword, productValue));
      } else if (propName === 'exports') {
        element.requestProduct = function (keyword) {
          if (props && props.exports && props.exports === keyword) {
            return { value: node.__product };
          }
          return null;
        };
      }
    });
  });

  return function (value) {
    (0, _isValidHookContext2.default)(processor);
    var node = processor.node();

    node.__product = value;
    return [function (newValue) {
      return node.__product = newValue;
    }];
  };
};

exports.default = createUseProductHook;