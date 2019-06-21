'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeProps;
var resolveProp = function resolveProp(prop, parent, errorMessage, stack) {
  if (parent.scope[prop]) {
    return parent.scope[prop];
  } else if (parent.parent) {
    stack.push(parent.meta.name);
    return resolveProp(prop, parent.parent, errorMessage, stack);
  }
  stack.push(parent.meta.name);
  throw new Error(errorMessage + '\n\nStack:\n' + stack.map(function (n) {
    return '  <' + n + '>';
  }).join('\n'));
};

function normalizeProps(element) {
  var _element$meta = element.meta,
      props = _element$meta.props,
      propNames = _element$meta.propNames,
      elementName = _element$meta.name;


  if (!props) {
    return props;
  }

  propNames.forEach(function (propName) {
    if (propName.charAt(0) === '$') {
      delete props[propName];
      var cleanPropName = propName.substr(1, propName.length);

      props[cleanPropName] = resolveProp(cleanPropName, element.parent, '"' + cleanPropName + '" prop requested by "' + elementName + '" can not be found.', [elementName]);
    }
  });
  return props;
};