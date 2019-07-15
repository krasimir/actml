'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createContextFactory;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable consistent-return */
var CONTEXT_KEY = '__CONTEXT_KEY__';

var PUBLIC_CONTEXT_KEY = exports.PUBLIC_CONTEXT_KEY = '__PUBLIC_CONTEXT_KEY__';

var ids = 0;

function getId() {
  return 'c' + ++ids;
};
function resolveContext(node, id) {
  var stack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  stack.push(node.element.name);
  if (node[CONTEXT_KEY] && id in node[CONTEXT_KEY]) {
    return node[CONTEXT_KEY][id];
  } else if (node.parent) {
    return resolveContext(node.parent, id, stack);
  }
  console.warn('A context consumer is used with no provider.\n  Stack:\n' + stack.map(function (name) {
    return '    <' + name + '>';
  }).join('\n'));
}

function createContextFactory(processor) {
  return function createContext(initialValue) {
    var _ref3;

    var id = getId();

    var Provider = function Provider(_ref) {
      var value = _ref.value,
          children = _ref.children;

      var node = processor.node();

      if (!node[CONTEXT_KEY]) {
        node[CONTEXT_KEY] = {};
      }
      node[CONTEXT_KEY][id] = value;

      return children;
    };
    var Consumer = function Consumer(_ref2) {
      var children = _ref2.children;

      var node = processor.node();

      children(resolveContext(node, id) || initialValue);
    };

    return _ref3 = {}, _defineProperty(_ref3, PUBLIC_CONTEXT_KEY, function () {
      var node = processor.node();

      return resolveContext(node, id) || initialValue;
    }), _defineProperty(_ref3, 'Provider', Provider), _defineProperty(_ref3, 'Consumer', Consumer), _ref3;
  };
};