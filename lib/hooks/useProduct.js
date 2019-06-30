'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseProductHook;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable no-return-assign */

var resolveProp = function resolveProp(prop, stackIndex, stack, error) {
  if (stackIndex < 0) {
    throw error;
  }
  var parent = stack[stackIndex];
  var product = parent.requestProduct ? parent.requestProduct(prop) : null;

  if (product !== null) {
    return product.value;
  }
  return resolveProp(prop, stackIndex - 1, stack, error);
};

function resolveProduct(element, stack) {
  var dependencies = element.props.dependencies;

  var data = {};

  if (dependencies.length === 0) {
    return {};
  }

  dependencies.forEach(function (propName) {
    data[propName] = resolveProp(propName, stack.length - 1, stack, new Error('"' + propName + '" prop requested by "' + element.name + '" can not be found.\n\nStack:\n' + [].concat(_toConsumableArray(stack), [element]).map(function (_ref) {
      var name = _ref.name;
      return '  <' + name + '>';
    }).join('\n')));
  });
  return data;
};

function createUseProductHook(element, stack) {
  var product = void 0;
  var resolvedProductProps = resolveProduct(element, stack);

  element.requestProduct = function (propName) {
    if (element.props.exportsKeyword && element.props.exportsKeyword === propName) {
      return { value: product };
    }
    return null;
  };

  return [function (initialValue) {
    if (typeof initialValue !== 'undefined') {
      product = initialValue;
    }
    return [function (newValue) {
      product = newValue;
    }];
  }, resolvedProductProps];
};