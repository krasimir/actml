'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveBindings;
var resolveProp = function resolveProp(prop, element, parent, errorMessage, stack) {
  if (parent) {
    var binding = parent.requestProduct(prop, element);

    if (binding) {
      return binding.value;
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

function resolveBindings(element) {
  var _element$meta = element.meta,
      bindings = _element$meta.bindings,
      elementName = _element$meta.name;

  var boundData = {};

  if (bindings.length === 0) {
    return {};
  }

  bindings.forEach(function (propName) {
    boundData[propName] = resolveProp(propName, element, element.parent, '"' + propName + '" prop requested by "' + elementName + '" can not be found.', [elementName]);
  });
  return boundData;
};