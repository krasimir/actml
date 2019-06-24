(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.actml = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

exports.default = createElement;

var _resolveBindings = require('./utils/resolveBindings');

var _resolveBindings2 = _interopRequireDefault(_resolveBindings);

var _getMeta = require('./utils/getMeta');

var _getMeta2 = _interopRequireDefault(_getMeta);

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _Product = require('./hooks/utils/Product');

var _uid = require('./utils/uid');

var _uid2 = _interopRequireDefault(_uid);

var _useChildren = require('./hooks/useChildren');

var _useChildren2 = _interopRequireDefault(_useChildren);

var _useElement = require('./hooks/useElement');

var _useElement2 = _interopRequireDefault(_useElement);

var _useProduct = require('./hooks/useProduct');

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = require('./hooks/usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
} /* eslint-disable no-use-before-define, consistent-return */

function createElement(func, props, children) {
  var run = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent) {
      var additionalProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var result, genResult, toGenValue;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              element.parent = parent;
              processChildrenAutomatically.process = true;

              result = func(_extends({}, props, additionalProps, (0, _resolveBindings2.default)(element), {
                useChildren: useChildren,
                useElement: useElement,
                useProduct: useProduct,
                usePubSub: usePubSub
              }));
              genResult = void 0, toGenValue = void 0;

              // handling a promise

              if (!(result && result.then)) {
                _context.next = 10;
                break;
              }

              _context.next = 7;
              return result;

            case 7:
              result = _context.sent;
              _context.next = 27;
              break;

            case 10:
              if (!(result && typeof result.next === 'function')) {
                _context.next = 23;
                break;
              }

              genResult = result.next();

            case 12:
              if (genResult.done) {
                _context.next = 20;
                break;
              }

              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context.next = 17;
                break;
              }

              _context.next = 16;
              return genResult.value.run(element);

            case 16:
              toGenValue = _context.sent;

            case 17:
              genResult = result.next(toGenValue);
              _context.next = 12;
              break;

            case 20:
              result = genResult.value;

              // handling another ActML element
              _context.next = 27;
              break;

            case 23:
              if (!(0, _isActMLElement2.default)(result)) {
                _context.next = 27;
                break;
              }

              _context.next = 26;
              return result.run(element);

            case 26:
              result = _context.sent;

            case 27:
              if (!processChildrenAutomatically.process) {
                _context.next = 30;
                break;
              }

              _context.next = 30;
              return callChildren();

            case 30:
              return _context.abrupt('return', result);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function run(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var element = {
    __actml: (0, _uid2.default)(),
    parent: null,
    meta: (0, _getMeta2.default)(func, props),
    run: run,
    requestProduct: requestProduct
  };
  var product = (0, _Product.createProduct)(element);

  var _createUseChildrenHoo = (0, _useChildren2.default)(element, children),
      useChildren = _createUseChildrenHoo.hook,
      callChildren = _createUseChildrenHoo.callChildren,
      processChildrenAutomatically = _createUseChildrenHoo.processChildrenAutomatically;

  var useElement = (0, _useElement2.default)(element);
  var useProduct = (0, _useProduct2.default)(product);
  var usePubSub = (0, _usePubSub2.default)(element);

  function requestProduct(propName, dependent) {
    var exportsKeyword = element.meta.exportsKeyword;

    if (exportsKeyword && exportsKeyword === propName) {
      product.subscribe(dependent);
      return { value: product.get() };
    }
  }

  return element;
};

},{"./hooks/useChildren":2,"./hooks/useElement":3,"./hooks/useProduct":4,"./hooks/usePubSub":5,"./hooks/utils/Product":6,"./utils/getMeta":8,"./utils/isActMLElement":9,"./utils/resolveBindings":10,"./utils/uid":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseChildrenHook;

var _isActMLElement = require('../utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

function createUseChildrenHook(element, children) {
  var callChildren = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newProps) {
      var result, i;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = [];

              if (!(children && children.length > 0)) {
                _context.next = 13;
                break;
              }

              i = 0;

            case 3:
              if (!(i < children.length)) {
                _context.next = 13;
                break;
              }

              if (!(0, _isActMLElement2.default)(children[i])) {
                _context.next = 10;
                break;
              }

              _context.t0 = result;
              _context.next = 8;
              return children[i].run(element, newProps);

            case 8:
              _context.t1 = _context.sent;

              _context.t0.push.call(_context.t0, _context.t1);

            case 10:
              i++;
              _context.next = 3;
              break;

            case 13:
              return _context.abrupt('return', result);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function callChildren(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var processChildrenAutomatically = { process: true };

  return {
    hook: function hook() {
      processChildrenAutomatically.process = false;
      return [callChildren, children];
    },
    callChildren: callChildren,
    processChildrenAutomatically: processChildrenAutomatically
  };
};

},{"../utils/isActMLElement":9}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseElementHook;
function createUseElementHook(element) {
  return function () {
    return [element];
  };
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseProductHook;
function createUseProductHook(product) {
  return function (initialValue) {
    if (typeof initialValue !== 'undefined') {
      product.set(initialValue);
    }
    return [product.get(), function (newValue) {
      return product.set(newValue);
    }];
  };
};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUsePubSubHook;
var subscribers = {};

var _subscribe = function _subscribe(element, type, callback) {
  if (!subscribers[type]) subscribers[type] = {};
  if (!subscribers[type][element.__actml]) subscribers[type][element.__actml] = callback;
  return function () {
    delete subscribers[type][element.__actml];
  };
};
var _publish = function _publish(element, type, payload) {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(function (id) {
    subscribers[type][id](payload, element);
  });
};

function createUsePubSubHook(element) {
  return function () {
    return {
      subscribe: function subscribe() {
        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        return _subscribe.apply(undefined, [element].concat(params));
      },
      publish: function publish() {
        for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          params[_key2] = arguments[_key2];
        }

        return _publish.apply(undefined, [element].concat(params));
      },
      subscribers: subscribers,
      clear: function clear() {
        subscribers = {};
      }
    };
  };
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createProduct = exports.createProduct = function createProduct(element) {
  var subscribers = {};
  var state;

  return {
    set: function set(value) {
      state = value;
      Object.keys(subscribers).forEach(function (id) {
        subscribers[id].run(element);
      });
      return value;
    },
    get: function get() {
      return state;
    },
    subscribe: function subscribe(dependent) {
      if (!subscribers[dependent.__actml]) {
        subscribers[dependent.__actml] = dependent;
      }
    }
  };
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fragment = exports.run = exports.A = undefined;

var _ActElement = require('./ActElement');

var _ActElement2 = _interopRequireDefault(_ActElement);

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function create(func, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return (0, _ActElement2.default)(func, props, children);
}
function run(element) {
  if (!(0, _isActMLElement2.default)(element)) {
    throw new Error('ActML element expected. Instead ' + element.toString() + ' passed.');
  }
  return element.run();
}

var A = create;
var Fragment = function Fragment() {};

exports.A = A;
exports.run = run;
exports.Fragment = Fragment;

},{"./ActElement":1,"./utils/isActMLElement":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMeta;
var getFuncName = function getFuncName(func) {
  if (func.name) return func.name;

  var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};

function getMeta(func, props) {
  var propNames = props ? Object.keys(props) : [];
  var bindings = [];
  var exportsKeyword = void 0;

  propNames.forEach(function (propName) {
    if (propName.charAt(0) === '$') {
      bindings.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      exportsKeyword = props.exports;
    }
  });

  return {
    name: getFuncName(func),
    bindings: bindings,
    exportsKeyword: exportsKeyword
  };
};

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isActMLElement;
function isActMLElement(element) {
  return element && element.__actml;
};

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getId;
var i = 0;

function getId() {
  return 'a' + ++i;
};

},{}]},{},[7])(7)
});
