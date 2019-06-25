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

var _resolveProduct = require('./utils/resolveProduct');

var _resolveProduct2 = _interopRequireDefault(_resolveProduct);

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

var _useState = require('./hooks/useState');

var _useState2 = _interopRequireDefault(_useState);

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
              element.isRunning = true;
              processChildrenAutomatically.process = true;

              result = func(_extends({}, props, additionalProps, (0, _resolveProduct2.default)(element), {
                useChildren: useChildren,
                useElement: useElement,
                useProduct: useProduct,
                usePubSub: usePubSub,
                useState: useState
              }));
              genResult = void 0, toGenValue = void 0;

              element.isRunning = false;
              element.isUsed = true;

              // handling a promise

              if (!(result && result.then)) {
                _context.next = 13;
                break;
              }

              _context.next = 10;
              return result;

            case 10:
              result = _context.sent;
              _context.next = 30;
              break;

            case 13:
              if (!(result && typeof result.next === 'function')) {
                _context.next = 26;
                break;
              }

              genResult = result.next();

            case 15:
              if (genResult.done) {
                _context.next = 23;
                break;
              }

              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context.next = 20;
                break;
              }

              _context.next = 19;
              return genResult.value.run(element);

            case 19:
              toGenValue = _context.sent;

            case 20:
              genResult = result.next(toGenValue);
              _context.next = 15;
              break;

            case 23:
              result = genResult.value;

              // handling another ActML element
              _context.next = 30;
              break;

            case 26:
              if (!(0, _isActMLElement2.default)(result)) {
                _context.next = 30;
                break;
              }

              _context.next = 29;
              return result.run(element);

            case 29:
              result = _context.sent;

            case 30:
              if (!processChildrenAutomatically.process) {
                _context.next = 33;
                break;
              }

              _context.next = 33;
              return callChildren();

            case 33:
              return _context.abrupt('return', result);

            case 34:
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
    requestProduct: requestProduct,
    isUsed: false,
    isRunning: false
  };
  var product = (0, _Product.createProduct)(element);

  var _createUseChildrenHoo = (0, _useChildren2.default)(element, children),
      useChildren = _createUseChildrenHoo.hook,
      callChildren = _createUseChildrenHoo.callChildren,
      processChildrenAutomatically = _createUseChildrenHoo.processChildrenAutomatically;

  var useElement = (0, _useElement2.default)(element);
  var useProduct = (0, _useProduct2.default)(product);
  var usePubSub = (0, _usePubSub2.default)(element);
  var useState = (0, _useState2.default)(element);

  function requestProduct(propName) {
    var exportsKeyword = element.meta.exportsKeyword;

    if (exportsKeyword && exportsKeyword === propName) {
      return { value: product.get() };
    }
  }

  return element;
};

},{"./hooks/useChildren":2,"./hooks/useElement":3,"./hooks/useProduct":4,"./hooks/usePubSub":5,"./hooks/useState":6,"./hooks/utils/Product":7,"./utils/getMeta":9,"./utils/isActMLElement":10,"./utils/resolveProduct":11,"./utils/uid":12}],2:[function(require,module,exports){
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

},{"../utils/isActMLElement":10}],3:[function(require,module,exports){
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
    return [function (newValue) {
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

var subscribe = function subscribe(element, type, callback) {
  if (!subscribers[type]) subscribers[type] = {};
  if (!subscribers[type][element.__actml]) subscribers[type][element.__actml] = callback;
  return function () {
    delete subscribers[type][element.__actml];
  };
};
var publish = function publish(element, type, payload) {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(function (id) {
    subscribers[type][id](payload, element);
  });
};

function createUsePubSubHook(element) {
  return function () {
    return [
    // subscribe
    function () {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return subscribe.apply(undefined, [element].concat(params));
    },
    // publish
    function () {
      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return publish.apply(undefined, [element].concat(params));
    },
    // clear
    function () {
      subscribers = {};
    },
    // list of all subscribers
    subscribers];
  };
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseStateHook;
function createUseStateHook(element) {
  var storage = {
    states: []
  };
  var consumer = 0;

  return function (initialState) {
    var index = void 0;

    if (!element.isUsed) {
      storage.states.push(initialState);
      index = storage.states.length - 1;
    } else {
      index = consumer;
      consumer = index < storage.states.length - 1 ? consumer + 1 : 0;
    }

    return [storage.states[index], function (newState) {
      storage.states[index] = newState;
      if (!element.isRunning) {
        element.run(element.parent);
      }
      return newState;
    }];
  };
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-return-assign */

var createProduct = exports.createProduct = function createProduct() {
  var state;

  return {
    set: function set(value) {
      return state = value;
    },
    get: function get() {
      return state;
    }
  };
};

},{}],8:[function(require,module,exports){
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

},{"./ActElement":1,"./utils/isActMLElement":10}],9:[function(require,module,exports){
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
  var dependencies = [];
  var exportsKeyword = void 0;

  propNames.forEach(function (propName) {
    if (propName.charAt(0) === '$') {
      dependencies.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      exportsKeyword = props.exports;
    }
  });

  return {
    name: getFuncName(func),
    dependencies: dependencies,
    exportsKeyword: exportsKeyword
  };
};

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isActMLElement;
function isActMLElement(element) {
  return element && element.__actml;
};

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getId;
var i = 0;

function getId() {
  return 'a' + ++i;
};

},{}]},{},[8])(8)
});
