'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveProduct;
var resolveProp = function resolveProp(prop, element, parent, errorMessage, stack) {
  if (parent) {
    var productValue = parent.requestProduct(prop);

    if (productValue) {
      return productValue.value;
    } else if (parent.parent) {
      stack.push(parent.meta.name);
      return resolveProp(prop, element, parent.parent, errorMessage, stack);
    }
    stack.push(parent.meta.name);
  }
  throw new Error(errorMessage + '\n\nStack:\n' + stack.reverse().map(function (n) {
    return '  <' + n + '>';
  }).join('\n'));
};

function resolveProduct(element) {
  var _element$meta = element.meta,
      dependencies = _element$meta.dependencies,
      elementName = _element$meta.name;

  var data = {};

  if (dependencies.length === 0) {
    return {};
  }

  dependencies.forEach(function (propName) {
    data[propName] = resolveProp(propName, element, element.parent, '"' + propName + '" prop requested by "' + elementName + '" can not be found.', [elementName]);
  });
  return data;
};