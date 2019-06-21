'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (func, props, children) {
  var element = {
    scope: {},
    meta: (0, _getMeta2.default)(func, props),
    parent: null,
    run: run
  };

  async function run(parent) {
    element.parent = parent;

    var result = func((0, _normalizeProps2.default)(element));
    var genResult = void 0,
        toGenValue = void 0;

    // handling a promise
    if (result && result.then) {
      result = await result;

      // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if ((0, _isActMLElement2.default)(genResult.value)) {
          toGenValue = await genResult.value.run(element);
        }
        genResult = result.next(toGenValue);
      }
      result = genResult.value;

      // handling another ActML element
    } else if ((0, _isActMLElement2.default)(result)) {
      result = await result.run(element);
    }

    // exports
    (0, _useProps2.default)(props).exists('exports', function (exportsKeyword) {
      element.scope[exportsKeyword] = result;
    });

    // handling children
    if (children && children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        if ((0, _isActMLElement2.default)(children[i])) {
          await children[i].run(element);
        }
      }
    }

    return result;
  }

  return element;
};

var _normalizeProps = require('./utils/normalizeProps');

var _normalizeProps2 = _interopRequireDefault(_normalizeProps);

var _getMeta = require('./utils/getMeta');

var _getMeta2 = _interopRequireDefault(_getMeta);

var _useProps = require('./utils/useProps');

var _useProps2 = _interopRequireDefault(_useProps);

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

; /* eslint-disable no-use-before-define */