/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../lib/ActElement.js":
/*!*************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/ActElement.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getFuncName(func) {
  if (func.name) return func.name;
  var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());
  return result ? result[1] : 'unknown';
}

;

var createElement = function createElement(func, props, children) {
  if (typeof func !== 'function') {
    throw new Error('ActML element expects a function. "' + func + '" given instead.');
  }

  return {
    __actml: true,
    __used: 0,
    __running: false,
    __processChildrenAutomatically: true,
    id: null,
    props: props,
    name: getFuncName(func),
    children: children,
    initialize: function initialize(id) {
      var used = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.id = id;
      this.__used = used;
      this.__running = false;
      this.__processChildrenAutomatically = true;
    },
    mergeProps: function mergeProps(newProps) {
      this.props = Object.assign({}, this.props, newProps);
    },
    used: function used() {
      return this.__used;
    },
    isRunning: function isRunning() {
      return this.__running;
    },
    shouldProcessChildrenAutomatically: function shouldProcessChildrenAutomatically(value) {
      if (typeof value === 'undefined') {
        return this.__processChildrenAutomatically;
      }

      this.__processChildrenAutomatically = value;
      return value;
    },
    enter: function enter() {
      this.__running = true;
      this.__processChildrenAutomatically = true;
      return func(this.props);
    },
    out: function out() {
      this.__used += 1;
      this.__running = false;
    }
  };
};

exports.default = createElement;

/***/ }),

/***/ "../../lib/Processor.js":
/*!************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/Processor.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProcessor;

var _isActMLElement = __webpack_require__(/*! ./utils/isActMLElement */ "../../lib/utils/isActMLElement.js");

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _Tree = __webpack_require__(/*! ./Tree */ "../../lib/Tree.js");

var _Tree2 = _interopRequireDefault(_Tree);

var _usePubSub = __webpack_require__(/*! ./hooks/usePubSub */ "../../lib/hooks/usePubSub.js");

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = __webpack_require__(/*! ./hooks/useState */ "../../lib/hooks/useState.js");

var _useState2 = _interopRequireDefault(_useState);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
}
/* eslint-disable no-use-before-define */
// import initializeHooks from './hooks';


function createProcessor() {
  var _this = this;

  var tree = (0, _Tree2.default)();
  var currentNode = null;

  var processNode = function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(node, stack) {
      var result, genResult, toGenValue;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              currentNode = node;
              stack = [].concat(_toConsumableArray(stack), [node.element]);
              node.enter(stack);

              node.rerun = function () {
                return processNode(node, stack);
              };

              node.callChildren = function () {
                var _ref2 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  var childrenResult,
                      children,
                      i,
                      _children$i,
                      funcResult,
                      _args = arguments;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          childrenResult = [];
                          children = node.element.children;

                          if (!(children && children.length > 0)) {
                            _context.next = 30;
                            break;
                          }

                          i = 0;

                        case 4:
                          if (!(i < children.length)) {
                            _context.next = 30;
                            break;
                          }

                          if (!(0, _isActMLElement2.default)(children[i])) {
                            _context.next = 14;
                            break;
                          }

                          (_children$i = children[i]).mergeProps.apply(_children$i, _args);

                          _context.t0 = childrenResult;
                          _context.next = 10;
                          return processNode(node.addChildNode(children[i]), stack);

                        case 10:
                          _context.t1 = _context.sent;

                          _context.t0.push.call(_context.t0, _context.t1);

                          _context.next = 27;
                          break;

                        case 14:
                          if (!(typeof children[i] === 'function')) {
                            _context.next = 27;
                            break;
                          }

                          _context.next = 17;
                          return children[i].apply(children, _args);

                        case 17:
                          funcResult = _context.sent;

                          if (!(0, _isActMLElement2.default)(funcResult)) {
                            _context.next = 26;
                            break;
                          }

                          _context.t2 = childrenResult;
                          _context.next = 22;
                          return processNode(node.addChildNode(funcResult), stack);

                        case 22:
                          _context.t3 = _context.sent;

                          _context.t2.push.call(_context.t2, _context.t3);

                          _context.next = 27;
                          break;

                        case 26:
                          childrenResult.push(funcResult);

                        case 27:
                          i++;
                          _context.next = 4;
                          break;

                        case 30:
                          return _context.abrupt('return', childrenResult);

                        case 31:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function () {
                  return _ref2.apply(this, arguments);
                };
              }(); // actual call of the ActML element


              result = node.element.enter();
              genResult = void 0, toGenValue = void 0; // handling a promise

              if (!(result && result.then)) {
                _context2.next = 13;
                break;
              }

              _context2.next = 10;
              return result;

            case 10:
              result = _context2.sent;
              _context2.next = 36;
              break;

            case 13:
              if (!(result && typeof result.next === 'function')) {
                _context2.next = 32;
                break;
              }

              genResult = result.next();

            case 15:
              if (genResult.done) {
                _context2.next = 23;
                break;
              }

              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 20;
                break;
              }

              _context2.next = 19;
              return processNode(node.addChildNode(genResult.value), stack);

            case 19:
              toGenValue = _context2.sent;

            case 20:
              genResult = result.next(toGenValue);
              _context2.next = 15;
              break;

            case 23:
              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 29;
                break;
              }

              _context2.next = 26;
              return processNode(node.addChildNode(genResult.value), stack);

            case 26:
              result = _context2.sent;
              _context2.next = 30;
              break;

            case 29:
              result = genResult.value;

            case 30:
              _context2.next = 36;
              break;

            case 32:
              if (!(0, _isActMLElement2.default)(result)) {
                _context2.next = 36;
                break;
              }

              _context2.next = 35;
              return processNode(node.addChildNode(result), stack);

            case 35:
              result = _context2.sent;

            case 36:
              if (!node.element.shouldProcessChildrenAutomatically()) {
                _context2.next = 39;
                break;
              }

              _context2.next = 39;
              return node.callChildren();

            case 39:
              node.element.out();
              node.out();
              currentNode = null;
              return _context2.abrupt('return', result);

            case 43:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function processNode(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    node: function node() {
      return currentNode;
    },
    run: function run(element) {
      var resolvedRootNode = tree.resolveRoot(element);
      return processNode(resolvedRootNode, []);
    },
    onNodeEnter: function onNodeEnter(callback) {
      tree.addNodeEnterCallback(callback);
    },
    onNodeOut: function onNodeOut(callback) {
      tree.addNodeOutCallback(callback);
    },
    onNodeRemove: function onNodeRemove(callback) {
      tree.onNodeRemove(callback);
    },
    system: function system() {
      return {
        tree: tree,
        reset: function reset() {
          tree.reset();

          _usePubSub2.default.clear();

          _useState2.default.clear();
        }
      };
    }
  };
}

;

/***/ }),

/***/ "../../lib/Tree.js":
/*!*******************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/Tree.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;

var _fastDeepEqual = __webpack_require__(/*! fast-deep-equal */ "../../node_modules/fast-deep-equal/index.js");

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function Tree() {
  var onNodeEnter = [];
  var onNodeOut = [];
  var _onNodeRemove = [];
  var root = createNewNode();
  var ids = 0;

  function getId() {
    return 'a' + ++ids;
  }

  ;

  function useSameNode(node, newElement) {
    newElement.initialize(node.element.id, node.element.used());
    node.element = newElement;
    return node;
  }

  function treeDiff(oldElement, newElement) {
    if (oldElement && oldElement.name === newElement.name) {
      return (0, _fastDeepEqual2.default)(oldElement.props, newElement.props);
    }

    return false;
  }

  function createNewNode(element) {
    if (element) {
      element.initialize(getId());
    }

    return {
      element: element,
      children: [],
      stack: [],
      cursor: 0,
      enter: function enter(stack) {
        var _this = this;

        this.stack = stack;
        onNodeEnter.forEach(function (c) {
          return c(_this);
        });
      },
      out: function out() {
        var _this2 = this; // If there're more nodes in the tree than what was processed


        if (this.cursor < this.children.length) {
          this.children.splice(this.cursor, this.children.length - this.cursor).forEach(function (removedNode) {
            return _onNodeRemove.forEach(function (c) {
              return c(removedNode);
            });
          });
        }

        this.cursor = 0;
        this.stack = [];
        onNodeOut.forEach(function (c) {
          return c(_this2);
        });
      },
      addChildNode: function addChildNode(newElement) {
        var _this3 = this;

        var childNode = this.children[this.cursor]; // using the same node

        if (childNode && treeDiff(childNode.element, newElement)) {
          this.cursor += 1;
          return useSameNode(childNode, newElement);
        } // creating a new node


        var newChildNode = createNewNode(newElement);

        if (this.children[this.cursor]) {
          _onNodeRemove.forEach(function (c) {
            return c(_this3.children[_this3.cursor]);
          });
        }

        this.children[this.cursor] = newChildNode;
        this.cursor += 1;
        return newChildNode;
      }
    };
  }

  return {
    resolveRoot: function resolveRoot(element) {
      return root = treeDiff(root.element, element) ? useSameNode(root, element) : createNewNode(element);
    },
    reset: function reset() {
      root = createNewNode();
      ids = 0;
    },
    getNumOfElements: function getNumOfElements() {
      return ids;
    },
    diagnose: function diagnose() {
      return function loopOver(node) {
        var ind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // console.log(node.element.name, node.children.length);

        return {
          ind: ind,
          name: node.element.name,
          used: node.element.used(),
          id: node.element.id,
          children: node.children.map(function (child) {
            return loopOver(child, ind + 1);
          })
        };
      }(root);
    },
    addNodeEnterCallback: function addNodeEnterCallback(callback) {
      onNodeEnter.push(callback);
    },
    addNodeOutCallback: function addNodeOutCallback(callback) {
      onNodeOut.push(callback);
    },
    onNodeRemove: function onNodeRemove(callback) {
      _onNodeRemove.push(callback);
    }
  };
}
/* eslint-disable no-use-before-define, no-return-assign, max-len */


;

/***/ }),

/***/ "../../lib/hooks/useChildren.js":
/*!********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useChildren.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var createUseChildrenHook = function createUseChildrenHook(processor) {
  return function () {
    (0, _isValidHookContext2.default)(processor);
    var node = processor.node();
    node.element.shouldProcessChildrenAutomatically(false);
    return [node.callChildren, node.element.children];
  };
};

exports.default = createUseChildrenHook;

/***/ }),

/***/ "../../lib/hooks/useElement.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useElement.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var createUseElementHook = function createUseElementHook(processor) {
  return function () {
    (0, _isValidHookContext2.default)(processor);
    return processor.node().element;
  };
};

exports.default = createUseElementHook;

/***/ }),

/***/ "../../lib/hooks/useProduct.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useProduct.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/* eslint-disable no-return-assign */


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
            return {
              value: node.__product
            };
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

/***/ }),

/***/ "../../lib/hooks/usePubSub.js":
/*!******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/usePubSub.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

exports.default = createUsePubSubHook;

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var subscribers = {};

function createSubscribeElement(subscribe, useChildren) {
  return function (_ref) {
    var type = _ref.type;

    var _useChildren = useChildren(),
        _useChildren2 = _slicedToArray(_useChildren, 1),
        children = _useChildren2[0];

    subscribe(type, function (payload) {
      return children({
        payload: payload
      });
    });
  };
}

;

function createPublishElement(publish) {
  return function (_ref2) {
    var type = _ref2.type,
        payload = _ref2.payload;
    publish(type, payload);
  };
}

var subscribe = function subscribe(element, type, callback) {
  if (!subscribers[type]) subscribers[type] = {};
  subscribers[type][element.id] = callback;
  return function () {
    delete subscribers[type][element.id];
  };
};

var publish = function publish(type, payload) {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(function (id) {
    subscribers[type][id](payload);
  });
};

function createUsePubSubHook(processor, useChildren) {
  processor.onNodeRemove(function (node) {
    Object.keys(subscribers).forEach(function (type) {
      if (subscribers[type][node.element.id]) {
        delete subscribers[type][node.element.id];
      }
    });
  });
  return function (scopedElement) {
    (0, _isValidHookContext2.default)(processor);
    var node = processor.node();
    var el = scopedElement || node.element;

    var subscribeFunc = function subscribeFunc() {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return subscribe.apply(undefined, [el].concat(params));
    };

    var publishFunc = function publishFunc() {
      return publish.apply(undefined, arguments);
    };

    return {
      subscribe: subscribeFunc,
      publish: publishFunc,
      subscribers: subscribers,
      Subscribe: createSubscribeElement(subscribeFunc, useChildren),
      Publish: createPublishElement(publishFunc)
    };
  };
}

createUsePubSubHook.clear = function () {
  subscribers = {};
};

/***/ }),

/***/ "../../lib/hooks/useReducer.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useReducer.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

exports.default = createUseReducerHook;

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

function createDispatchElement(dispatch) {
  return function (_ref) {
    var action = _ref.action,
        propsToAction = _ref.propsToAction,
        rest = _objectWithoutProperties(_ref, ['action', 'propsToAction']);

    if (action) {
      dispatch(action);
    } else if (propsToAction) {
      dispatch(propsToAction(rest));
    } else {
      throw new Error('<Dispatch> expects "action" or "propsToAction" prop.');
    }
  };
}

function createUseReducerHook(useState) {
  return function (reducer, initialState) {
    var _useState = useState(initialState),
        _useState2 = _slicedToArray(_useState, 3),
        state = _useState2[0],
        setState = _useState2[1],
        getState = _useState2[2];

    var dispatch = function dispatch(action) {
      return setState(reducer(getState(), action));
    };

    return [state, dispatch, createDispatchElement(dispatch), // <Dispatch>
    function () {
      return getState();
    } // <GetState>
    ];
  };
}

/***/ }),

/***/ "../../lib/hooks/useState.js":
/*!*****************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useState.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseStateHook;

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }

    return this.elements[element.id] = {
      states: [],
      consumer: 0
    };
  },
  cleanUp: function cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
};
/* eslint-disable no-return-assign */

function createUseStateHook(processor) {
  processor.onNodeRemove(function (node) {
    return Storage.cleanUp(node.element.id);
  });
  return function (initialState) {
    (0, _isValidHookContext2.default)(processor);
    var node = processor.node();
    var element = node.element;
    var storage = Storage.get(element);
    var index = void 0; // first run

    if (element.used() === 0) {
      storage.states.push(initialState);
      index = storage.states.length - 1; // other runs
    } else {
      index = storage.consumer;
      storage.consumer = index < storage.states.length - 1 ? storage.consumer + 1 : 0;
    }

    return [storage.states[index], function (newState) {
      storage.states[index] = newState;

      if (!element.isRunning()) {
        node.rerun();
      }

      return newState;
    }, function () {
      return storage.states[index];
    }];
  };
}

createUseStateHook.clear = function () {
  Storage.elements = {};
};

/***/ }),

/***/ "../../lib/hooks/utils/isValidHookContext.js":
/*!*********************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/utils/isValidHookContext.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidHookContext;

function isValidHookContext(processor) {
  if (!processor) {
    throw new Error('Something terribly wrong happened. The hook factory function is called without a processor.');
  }

  if (!processor.node()) {
    throw new Error('Hooks must be called in the context of an ActML element.');
  }
}

;

/***/ }),

/***/ "../../lib/index.js":
/*!********************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUniverse = createUniverse;

var _Processor = __webpack_require__(/*! ./Processor */ "../../lib/Processor.js");

var _Processor2 = _interopRequireDefault(_Processor);

var _isActMLElement = __webpack_require__(/*! ./utils/isActMLElement */ "../../lib/utils/isActMLElement.js");

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _ActElement = __webpack_require__(/*! ./ActElement */ "../../lib/ActElement.js");

var _ActElement2 = _interopRequireDefault(_ActElement);

var _useChildren = __webpack_require__(/*! ./hooks/useChildren */ "../../lib/hooks/useChildren.js");

var _useChildren2 = _interopRequireDefault(_useChildren);

var _useElement = __webpack_require__(/*! ./hooks/useElement */ "../../lib/hooks/useElement.js");

var _useElement2 = _interopRequireDefault(_useElement);

var _useProduct = __webpack_require__(/*! ./hooks/useProduct */ "../../lib/hooks/useProduct.js");

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = __webpack_require__(/*! ./hooks/usePubSub */ "../../lib/hooks/usePubSub.js");

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = __webpack_require__(/*! ./hooks/useState */ "../../lib/hooks/useState.js");

var _useState2 = _interopRequireDefault(_useState);

var _useReducer = __webpack_require__(/*! ./hooks/useReducer */ "../../lib/hooks/useReducer.js");

var _useReducer2 = _interopRequireDefault(_useReducer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function createUniverse() {
  var processor = (0, _Processor2.default)();

  function A(func, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return (0, _ActElement2.default)(func, props, children);
  }

  function run(element) {
    if (!(0, _isActMLElement2.default)(element)) {
      throw new Error('ActML element expected. Instead ' + element.toString() + ' passed.');
    }

    return processor.run(element);
  }

  var Fragment = function Fragment() {};

  var useChildren = (0, _useChildren2.default)(processor);
  var useElement = (0, _useElement2.default)(processor);
  var useState = (0, _useState2.default)(processor);
  var useProduct = (0, _useProduct2.default)(processor, useState);
  var usePubSub = (0, _usePubSub2.default)(processor, useChildren);
  var useReducer = (0, _useReducer2.default)(useState);
  return {
    A: A,
    run: run,
    Fragment: Fragment,
    processor: processor,
    useChildren: useChildren,
    useElement: useElement,
    useProduct: useProduct,
    usePubSub: usePubSub,
    useState: useState,
    useReducer: useReducer
  };
}

var universe = createUniverse();
module.exports = universe;
module.exports.createUniverse = createUniverse();

/***/ }),

/***/ "../../lib/utils/isActMLElement.js":
/*!***********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/utils/isActMLElement.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isActMLElement;

function isActMLElement(element) {
  return element && element.__actml === true;
}

;

/***/ }),

/***/ "../../node_modules/fast-deep-equal/index.js":
/*!*********************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/node_modules/fast-deep-equal/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a!==a && b!==b;
};


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectSpread2.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread2.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    if (i % 2) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i]));
    }
  }

  return target;
}

module.exports = _objectSpread2;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./src/CheckForEditField.js":
/*!**********************************!*\
  !*** ./src/CheckForEditField.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckForEditField; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable react/prop-types */

/** @jsx A */


function CheckForEditField(_ref) {
  var todos = _ref.todos;
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["FocusField"], {
    index: todos.findIndex(function (_ref2) {
      var editing = _ref2.editing;
      return editing;
    })
  });
}

/***/ }),

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/*! exports provided: FillContainer, Container, FocusField, ProgressChecker, FilterOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillContainer", function() { return FillContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusField", function() { return FocusField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressChecker", function() { return ProgressChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterOptions", function() { return FilterOptions; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Filter */ "./src/Filter.js");





var $ = function $(selector) {
  return document.querySelector(selector);
};

var list = $('.todo-list');
var header = $('.header');
var ENTER = 13;
var ESC = 27;
function FillContainer() {
  var _useChildren = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useChildren"])(),
      _useChildren2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useChildren, 2),
      content = _useChildren2[1];

  list.innerHTML = content;
}
function Container(_ref) {
  var onUserAction = _ref.onUserAction;
  list.addEventListener('click', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

    if (e.target.hasAttribute('data-toggle')) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_2__["TOGGLE"], todoIndex);
    } else if (e.target.hasAttribute('data-delete')) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_2__["DELETE"], todoIndex);
    }
  });
  list.addEventListener('dblclick', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

    if (e.target.hasAttribute('data-label')) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_2__["EDIT"], todoIndex);
    }
  });
  list.addEventListener('focusout', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

    if (e.target.hasAttribute('data-edit')) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_2__["EDIT_TODO"], {
        index: todoIndex,
        label: e.target.value
      });
    }
  });
  list.addEventListener('keyup', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

    if (e.target.hasAttribute('data-edit') && e.keyCode === ENTER) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_2__["EDIT_TODO"], {
        index: todoIndex,
        label: e.target.value
      });
    } else if (e.target.hasAttribute('data-edit') && e.keyCode === ESC) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_2__["EDIT"], todoIndex);
    }
  });
  header.addEventListener('keyup', function (e) {
    if (e.target.hasAttribute('data-new') && e.keyCode === ENTER) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_2__["NEW_TODO"], e.target.value);
      e.target.value = '';
    }
  });
}
function FocusField(_ref2) {
  var index = _ref2.index;
  var el = $(".edit[data-index=\"".concat(index, "\"]"));

  if (el) {
    el.focus();
    el.selectionStart = el.selectionEnd = el.value.length;
  }
}
;
function ProgressChecker(_ref3) {
  var todos = _ref3.todos;
  var completed = todos.filter(function (_ref4) {
    var completed = _ref4.completed;
    return completed;
  }).length;
  var itemsLeft = todos.length - completed;
  $('[data-count]').innerHTML = "\n    <strong>".concat(itemsLeft, "</strong> ").concat(itemsLeft > 1 || itemsLeft === 0 ? 'items' : 'item', " left\n  ");
}
;
function FilterOptions(_ref5) {
  var filter = _ref5.filter,
      onUserAction = _ref5.onUserAction;
  $('[data-filter]').addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-all')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_ALL"]);
    } else if (e.target.hasAttribute('data-active')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_ACTIVE"]);
    } else if (e.target.hasAttribute('data-completed')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_COMPLETED"]);
    }
  });
  $('[data-all]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_ALL"] ? 'selected' : '');
  $('[data-active]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_ACTIVE"] ? 'selected' : '');
  $('[data-completed]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_COMPLETED"] ? 'selected' : '');
}
;

/***/ }),

/***/ "./src/Filter.js":
/*!***********************!*\
  !*** ./src/Filter.js ***!
  \***********************/
/*! exports provided: FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_ALL", function() { return FILTER_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_ACTIVE", function() { return FILTER_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_COMPLETED", function() { return FILTER_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");


/** @jsx A */


var FILTER_ALL = 'FILTER_ALL';
var FILTER_ACTIVE = 'FILTER_ACTIVE';
var FILTER_COMPLETED = 'FILTER_COMPLETED';
function Filter() {
  var _useState = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useState"])(FILTER_ALL),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["usePubSub"])(),
      Subscribe = _usePubSub.Subscribe;

  Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useProduct"])(filter);
  return Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_lib__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_2__["FilterOptions"], {
    filter: filter
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(Subscribe, {
    type: FILTER_ALL
  }, function () {
    return setFilter(FILTER_ALL);
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(Subscribe, {
    type: FILTER_ACTIVE
  }, function () {
    return setFilter(FILTER_ACTIVE);
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(Subscribe, {
    type: FILTER_COMPLETED
  }, function () {
    return setFilter(FILTER_COMPLETED);
  }));
}
;

/***/ }),

/***/ "./src/Listener.js":
/*!*************************!*\
  !*** ./src/Listener.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Listener; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable react/prop-types */

/** @jsx A */


function Listener() {
  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["usePubSub"])(),
      publish = _usePubSub.publish;

  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    onUserAction: publish
  });
}

/***/ }),

/***/ "./src/Renderer.js":
/*!*************************!*\
  !*** ./src/Renderer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Renderer; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filter */ "./src/Filter.js");
/* eslint-disable react/prop-types */

/** @jsx A */



function Renderer(_ref) {
  var todos = _ref.todos,
      filter = _ref.filter;
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["FillContainer"], null, todos.filter(function (_ref2) {
    var completed = _ref2.completed;
    if (filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_ALL"]) return true;
    if (filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_ACTIVE"]) return !completed;
    if (filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_COMPLETED"]) return completed;
    return false;
  }).map(function (todo, i) {
    var liClass = todo.editing ? 'editing' : todo.completed ? 'completed' : '';
    return "\n            <li class='".concat(liClass, "'>\n              <div class=\"view\">\n                <input \n                  class=\"toggle\"\n                  type=\"checkbox\"\n                  data-index=\"").concat(i, "\"\n                  data-toggle\n                  ").concat(todo.completed ? 'checked' : '', ">\n                <label data-index=\"").concat(i, "\" data-label>").concat(todo.label, "</label>\n                <button\n                  class=\"destroy\"\n                  data-index=\"").concat(i, "\"\n                  data-delete></button>\n              </div>\n              <input class=\"edit\" value=\"").concat(todo.label, "\" data-index=\"").concat(i, "\" data-edit>\n            </li>\n          ");
  }).join(''));
}
;

/***/ }),

/***/ "./src/Store.js":
/*!**********************!*\
  !*** ./src/Store.js ***!
  \**********************/
/*! exports provided: TOGGLE, NEW_TODO, DELETE, EDIT, EDIT_TODO, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOGGLE", function() { return TOGGLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_TODO", function() { return NEW_TODO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE", function() { return DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT", function() { return EDIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TODO", function() { return EDIT_TODO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread2 */ "./node_modules/@babel/runtime/helpers/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_3__);




/* eslint-disable react/prop-types */

/** @jsx A */

var TOGGLE = 'TOGGLE';
var NEW_TODO = 'NEW_TODO';
var DELETE = 'DELETE';
var EDIT = 'EDIT';
var EDIT_TODO = 'EDIT_TODO';

var toggle = function toggle(todoIndex) {
  return {
    type: TOGGLE,
    todoIndex: todoIndex
  };
};

var deleteTodo = function deleteTodo(todoIndex) {
  return {
    type: DELETE,
    todoIndex: todoIndex
  };
};

var newTodo = function newTodo(label) {
  return {
    type: NEW_TODO,
    label: label
  };
};

var edit = function edit(todoIndex) {
  return {
    type: EDIT,
    todoIndex: todoIndex
  };
};

var editToDo = function editToDo(_ref) {
  var index = _ref.index,
      label = _ref.label;
  return {
    type: EDIT_TODO,
    index: index,
    label: label
  };
};

var ToDo = function ToDo(_ref2) {
  var label = _ref2.label;
  return {
    label: label,
    completed: false,
    editing: false
  };
};

var initialValue = [ToDo({
  label: 'First task'
}), ToDo({
  label: 'Second task'
})];

var reducer = function reducer(todos, action) {
  switch (action.type) {
    case TOGGLE:
      return todos.map(function (todo, index) {
        if (index === action.todoIndex) {
          return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({}, todo, {
            completed: !todo.completed
          });
        }

        return todo;
      });

    case EDIT:
      return todos.map(function (todo, index) {
        if (index === action.todoIndex) {
          return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({}, todo, {
            editing: !todo.editing
          });
        }

        return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({}, todo, {
          editing: false
        });
      });

    case EDIT_TODO:
      return todos.map(function (todo, index) {
        if (index === action.index) {
          return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({}, todo, {
            label: action.label,
            editing: false
          });
        }

        return todo;
      });

    case NEW_TODO:
      return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(todos), [ToDo({
        label: action.label
      })]);

    case DELETE:
      return todos.filter(function (todo, index) {
        return index !== action.todoIndex;
      });

    default:
      return todos;
  }
};

function Store() {
  var _useReducer = Object(_lib__WEBPACK_IMPORTED_MODULE_3__["useReducer"])(reducer, initialValue),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useReducer, 3),
      todos = _useReducer2[0],
      Dispatch = _useReducer2[2];

  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_3__["usePubSub"])(),
      Subscribe = _usePubSub.Subscribe;

  Object(_lib__WEBPACK_IMPORTED_MODULE_3__["useProduct"])(todos);
  return Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(_lib__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: TOGGLE
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref3) {
      var todoIndex = _ref3.payload;
      return toggle(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: NEW_TODO
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref4) {
      var label = _ref4.payload;
      return newTodo(label);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: DELETE
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref5) {
      var todoIndex = _ref5.payload;
      return deleteTodo(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: EDIT
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref6) {
      var todoIndex = _ref6.payload;
      return edit(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: EDIT_TODO
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref7) {
      var payload = _ref7.payload;
      return editToDo(payload);
    }
  })));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.js");
/* harmony import */ var _Listener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Listener */ "./src/Listener.js");
/* harmony import */ var _CheckForEditField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CheckForEditField */ "./src/CheckForEditField.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Filter */ "./src/Filter.js");
/** @jsx A */








function App() {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_lib__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Listener__WEBPACK_IMPORTED_MODULE_3__["default"], null), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Filter__WEBPACK_IMPORTED_MODULE_6__["default"], {
    exports: "filter"
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"], {
    exports: "todos"
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Renderer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    $todos: true,
    $filter: true
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_CheckForEditField__WEBPACK_IMPORTED_MODULE_4__["default"], {
    $todos: true
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_5__["ProgressChecker"], {
    $todos: true
  })));
}

;
Object(_lib__WEBPACK_IMPORTED_MODULE_0__["run"])(Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(App, null));

/***/ }),

/***/ 0:
/*!********************************************************!*\
  !*** multi regenerator-runtime/runtime ./src/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! regenerator-runtime/runtime */"./node_modules/regenerator-runtime/runtime.js");
module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNoaWxkcmVuLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VQdWJTdWIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VSZWR1Y2VyLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL3V0aWxzL2lzQWN0TUxFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9ub2RlX21vZHVsZXMvZmFzdC1kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJnZXRGdW5jTmFtZSIsImZ1bmMiLCJuYW1lIiwicmVzdWx0IiwiZXhlYyIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJFcnJvciIsIl9fYWN0bWwiLCJfX3VzZWQiLCJfX3J1bm5pbmciLCJfX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkiLCJpZCIsImluaXRpYWxpemUiLCJ1c2VkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibWVyZ2VQcm9wcyIsIm5ld1Byb3BzIiwiYXNzaWduIiwiaXNSdW5uaW5nIiwic2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSIsImVudGVyIiwib3V0IiwiZGVmYXVsdCIsImNyZWF0ZVByb2Nlc3NvciIsIl9pc0FjdE1MRWxlbWVudCIsInJlcXVpcmUiLCJfaXNBY3RNTEVsZW1lbnQyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9UcmVlIiwiX1RyZWUyIiwiX3VzZVB1YlN1YiIsIl91c2VQdWJTdWIyIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwiYXJyMiIsImZyb20iLCJfYXN5bmNUb0dlbmVyYXRvciIsImZuIiwiZ2VuIiwiYXBwbHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0ZXAiLCJrZXkiLCJhcmciLCJpbmZvIiwiZXJyb3IiLCJkb25lIiwidGhlbiIsImVyciIsIl90aGlzIiwidHJlZSIsImN1cnJlbnROb2RlIiwicHJvY2Vzc05vZGUiLCJfcmVmIiwicmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUyIiwibm9kZSIsInN0YWNrIiwiZ2VuUmVzdWx0IiwidG9HZW5WYWx1ZSIsIndyYXAiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwcmV2IiwibmV4dCIsImNvbmNhdCIsImVsZW1lbnQiLCJyZXJ1biIsImNhbGxDaGlsZHJlbiIsIl9yZWYyIiwiX2NhbGxlZSIsImNoaWxkcmVuUmVzdWx0IiwiX2NoaWxkcmVuJGkiLCJmdW5jUmVzdWx0IiwiX2FyZ3MiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwidDAiLCJhZGRDaGlsZE5vZGUiLCJ0MSIsInNlbnQiLCJwdXNoIiwiY2FsbCIsInQyIiwidDMiLCJhYnJ1cHQiLCJzdG9wIiwiX3giLCJfeDIiLCJydW4iLCJyZXNvbHZlZFJvb3ROb2RlIiwicmVzb2x2ZVJvb3QiLCJvbk5vZGVFbnRlciIsImNhbGxiYWNrIiwiYWRkTm9kZUVudGVyQ2FsbGJhY2siLCJvbk5vZGVPdXQiLCJhZGROb2RlT3V0Q2FsbGJhY2siLCJvbk5vZGVSZW1vdmUiLCJzeXN0ZW0iLCJyZXNldCIsImNsZWFyIiwiVHJlZSIsIl9mYXN0RGVlcEVxdWFsIiwiX2Zhc3REZWVwRXF1YWwyIiwiX29uTm9kZVJlbW92ZSIsInJvb3QiLCJjcmVhdGVOZXdOb2RlIiwiaWRzIiwiZ2V0SWQiLCJ1c2VTYW1lTm9kZSIsIm5ld0VsZW1lbnQiLCJ0cmVlRGlmZiIsIm9sZEVsZW1lbnQiLCJjdXJzb3IiLCJmb3JFYWNoIiwiYyIsIl90aGlzMiIsInNwbGljZSIsInJlbW92ZWROb2RlIiwiX3RoaXMzIiwiY2hpbGROb2RlIiwibmV3Q2hpbGROb2RlIiwiZ2V0TnVtT2ZFbGVtZW50cyIsImRpYWdub3NlIiwibG9vcE92ZXIiLCJpbmQiLCJtYXAiLCJjaGlsZCIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsImNyZWF0ZVVzZUNoaWxkcmVuSG9vayIsInByb2Nlc3NvciIsImNyZWF0ZVVzZUVsZW1lbnRIb29rIiwiX2RlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwicmVzb2x2ZVByb2R1Y3QiLCJwcm9wIiwic3RhY2tJbmRleCIsInBhcmVudCIsInByb2R1Y3QiLCJyZXF1ZXN0UHJvZHVjdCIsImNyZWF0ZVVzZVByb2R1Y3RIb29rIiwicHJvcE5hbWVzIiwia2V5cyIsInByb3BOYW1lIiwiY2hhckF0Iiwia2V5d29yZCIsInN1YnN0ciIsInN0YWNrVG9TZWFyY2hJbiIsInNsaWNlIiwicHJvZHVjdFZhbHVlIiwiam9pbiIsIl9fcHJvZHVjdCIsIm5ld1ZhbHVlIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsIl9pIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfcyIsIlR5cGVFcnJvciIsImNyZWF0ZVVzZVB1YlN1Ykhvb2siLCJzdWJzY3JpYmVycyIsImNyZWF0ZVN1YnNjcmliZUVsZW1lbnQiLCJzdWJzY3JpYmUiLCJ1c2VDaGlsZHJlbiIsInR5cGUiLCJfdXNlQ2hpbGRyZW4iLCJfdXNlQ2hpbGRyZW4yIiwicGF5bG9hZCIsImNyZWF0ZVB1Ymxpc2hFbGVtZW50IiwicHVibGlzaCIsInNjb3BlZEVsZW1lbnQiLCJlbCIsInN1YnNjcmliZUZ1bmMiLCJfbGVuIiwicGFyYW1zIiwiX2tleSIsInB1Ymxpc2hGdW5jIiwiU3Vic2NyaWJlIiwiUHVibGlzaCIsImNyZWF0ZVVzZVJlZHVjZXJIb29rIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwidGFyZ2V0IiwiaW5kZXhPZiIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY3JlYXRlRGlzcGF0Y2hFbGVtZW50IiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJwcm9wc1RvQWN0aW9uIiwicmVzdCIsInVzZVN0YXRlIiwicmVkdWNlciIsImluaXRpYWxTdGF0ZSIsInN0YXRlIiwic2V0U3RhdGUiLCJnZXRTdGF0ZSIsImNyZWF0ZVVzZVN0YXRlSG9vayIsIlN0b3JhZ2UiLCJlbGVtZW50cyIsImdldCIsInN0YXRlcyIsImNvbnN1bWVyIiwiY2xlYW5VcCIsInN0b3JhZ2UiLCJpbmRleCIsIm5ld1N0YXRlIiwiaXNWYWxpZEhvb2tDb250ZXh0IiwiY3JlYXRlVW5pdmVyc2UiLCJfUHJvY2Vzc29yIiwiX1Byb2Nlc3NvcjIiLCJfQWN0RWxlbWVudCIsIl9BY3RFbGVtZW50MiIsIl91c2VFbGVtZW50IiwiX3VzZUVsZW1lbnQyIiwiX3VzZVByb2R1Y3QiLCJfdXNlUHJvZHVjdDIiLCJfdXNlUmVkdWNlciIsIl91c2VSZWR1Y2VyMiIsIkEiLCJGcmFnbWVudCIsInVzZUVsZW1lbnQiLCJ1c2VQcm9kdWN0IiwidXNlUHViU3ViIiwidXNlUmVkdWNlciIsInVuaXZlcnNlIiwibW9kdWxlIiwiaXNBY3RNTEVsZW1lbnQiLCJDaGVja0ZvckVkaXRGaWVsZCIsInRvZG9zIiwiZmluZEluZGV4IiwiZWRpdGluZyIsIiQiLCJzZWxlY3RvciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxpc3QiLCJoZWFkZXIiLCJFTlRFUiIsIkVTQyIsIkZpbGxDb250YWluZXIiLCJjb250ZW50IiwiaW5uZXJIVE1MIiwiQ29udGFpbmVyIiwib25Vc2VyQWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0b2RvSW5kZXgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsIlRPR0dMRSIsIkRFTEVURSIsIkVESVQiLCJFRElUX1RPRE8iLCJsYWJlbCIsImtleUNvZGUiLCJORVdfVE9ETyIsIkZvY3VzRmllbGQiLCJmb2N1cyIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiUHJvZ3Jlc3NDaGVja2VyIiwiY29tcGxldGVkIiwiZmlsdGVyIiwiaXRlbXNMZWZ0IiwiRmlsdGVyT3B0aW9ucyIsIkZJTFRFUl9BTEwiLCJGSUxURVJfQUNUSVZFIiwiRklMVEVSX0NPTVBMRVRFRCIsInNldEF0dHJpYnV0ZSIsIkZpbHRlciIsInNldEZpbHRlciIsIkxpc3RlbmVyIiwiUmVuZGVyZXIiLCJ0b2RvIiwibGlDbGFzcyIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVkaXRUb0RvIiwiVG9EbyIsImluaXRpYWxWYWx1ZSIsIlN0b3JlIiwiRGlzcGF0Y2giLCJBcHAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7O0FBRWJBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFHQSxTQUFTQyxXQUFULENBQXFCQyxJQUFyQixFQUEyQjtBQUN6QixNQUFJQSxJQUFJLENBQUNDLElBQVQsRUFBZSxPQUFPRCxJQUFJLENBQUNDLElBQVo7QUFDZixNQUFJQyxNQUFNLEdBQUcsNkJBQTZCQyxJQUE3QixDQUFrQ0gsSUFBSSxDQUFDSSxRQUFMLEVBQWxDLENBQWI7QUFFQSxTQUFPRixNQUFNLEdBQUdBLE1BQU0sQ0FBQyxDQUFELENBQVQsR0FBZSxTQUE1QjtBQUNEOztBQUFBOztBQUVELElBQUlHLGFBQWEsR0FBRyxTQUFTQSxhQUFULENBQXVCTCxJQUF2QixFQUE2Qk0sS0FBN0IsRUFBb0NDLFFBQXBDLEVBQThDO0FBQ2hFLE1BQUksT0FBT1AsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QixVQUFNLElBQUlRLEtBQUosQ0FBVSx3Q0FBd0NSLElBQXhDLEdBQStDLGtCQUF6RCxDQUFOO0FBQ0Q7O0FBQ0QsU0FBTztBQUNMUyxXQUFPLEVBQUUsSUFESjtBQUVMQyxVQUFNLEVBQUUsQ0FGSDtBQUdMQyxhQUFTLEVBQUUsS0FITjtBQUlMQyxrQ0FBOEIsRUFBRSxJQUozQjtBQUtMQyxNQUFFLEVBQUUsSUFMQztBQU1MUCxTQUFLLEVBQUVBLEtBTkY7QUFPTEwsUUFBSSxFQUFFRixXQUFXLENBQUNDLElBQUQsQ0FQWjtBQVFMTyxZQUFRLEVBQUVBLFFBUkw7QUFTTE8sY0FBVSxFQUFFLFNBQVNBLFVBQVQsQ0FBb0JELEVBQXBCLEVBQXdCO0FBQ2xDLFVBQUlFLElBQUksR0FBR0MsU0FBUyxDQUFDQyxNQUFWLEdBQW1CLENBQW5CLElBQXdCRCxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCRSxTQUF6QyxHQUFxREYsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsQ0FBL0U7QUFFQSxXQUFLSCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxXQUFLSCxNQUFMLEdBQWNLLElBQWQ7QUFDQSxXQUFLSixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsV0FBS0MsOEJBQUwsR0FBc0MsSUFBdEM7QUFDRCxLQWhCSTtBQWlCTE8sY0FBVSxFQUFFLFNBQVNBLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCO0FBQ3hDLFdBQUtkLEtBQUwsR0FBYVgsTUFBTSxDQUFDMEIsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS2YsS0FBdkIsRUFBOEJjLFFBQTlCLENBQWI7QUFDRCxLQW5CSTtBQW9CTEwsUUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsYUFBTyxLQUFLTCxNQUFaO0FBQ0QsS0F0Qkk7QUF1QkxZLGFBQVMsRUFBRSxTQUFTQSxTQUFULEdBQXFCO0FBQzlCLGFBQU8sS0FBS1gsU0FBWjtBQUNELEtBekJJO0FBMEJMWSxzQ0FBa0MsRUFBRSxTQUFTQSxrQ0FBVCxDQUE0Q3pCLEtBQTVDLEVBQW1EO0FBQ3JGLFVBQUksT0FBT0EsS0FBUCxLQUFpQixXQUFyQixFQUFrQztBQUNoQyxlQUFPLEtBQUtjLDhCQUFaO0FBQ0Q7O0FBQ0QsV0FBS0EsOEJBQUwsR0FBc0NkLEtBQXRDO0FBQ0EsYUFBT0EsS0FBUDtBQUNELEtBaENJO0FBaUNMMEIsU0FBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUI7QUFDdEIsV0FBS2IsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFdBQUtDLDhCQUFMLEdBQXNDLElBQXRDO0FBRUEsYUFBT1osSUFBSSxDQUFDLEtBQUtNLEtBQU4sQ0FBWDtBQUNELEtBdENJO0FBdUNMbUIsT0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtBQUNsQixXQUFLZixNQUFMLElBQWUsQ0FBZjtBQUNBLFdBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDRDtBQTFDSSxHQUFQO0FBNENELENBaEREOztBQWtEQWQsT0FBTyxDQUFDNkIsT0FBUixHQUFrQnJCLGFBQWxCLEM7Ozs7Ozs7Ozs7OztBQzlEYTs7QUFFYlYsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDO0FBR0FELE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0JDLGVBQWxCOztBQUVBLElBQUlDLGVBQWUsR0FBR0MsbUJBQU8sQ0FBQyxpRUFBRCxDQUE3Qjs7QUFFQSxJQUFJQyxnQkFBZ0IsR0FBR0Msc0JBQXNCLENBQUNILGVBQUQsQ0FBN0M7O0FBRUEsSUFBSUksS0FBSyxHQUFHSCxtQkFBTyxDQUFDLGlDQUFELENBQW5COztBQUVBLElBQUlJLE1BQU0sR0FBR0Ysc0JBQXNCLENBQUNDLEtBQUQsQ0FBbkM7O0FBRUEsSUFBSUUsVUFBVSxHQUFHTCxtQkFBTyxDQUFDLHVEQUFELENBQXhCOztBQUVBLElBQUlNLFdBQVcsR0FBR0osc0JBQXNCLENBQUNHLFVBQUQsQ0FBeEM7O0FBRUEsSUFBSUUsU0FBUyxHQUFHUCxtQkFBTyxDQUFDLHFEQUFELENBQXZCOztBQUVBLElBQUlRLFVBQVUsR0FBR04sc0JBQXNCLENBQUNLLFNBQUQsQ0FBdkM7O0FBRUEsU0FBU0wsc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsU0FBU0Usa0JBQVQsQ0FBNEJDLEdBQTVCLEVBQWlDO0FBQUUsTUFBSUMsS0FBSyxDQUFDQyxPQUFOLENBQWNGLEdBQWQsQ0FBSixFQUF3QjtBQUFFLFNBQUssSUFBSUcsQ0FBQyxHQUFHLENBQVIsRUFBV0MsSUFBSSxHQUFHSCxLQUFLLENBQUNELEdBQUcsQ0FBQ3hCLE1BQUwsQ0FBNUIsRUFBMEMyQixDQUFDLEdBQUdILEdBQUcsQ0FBQ3hCLE1BQWxELEVBQTBEMkIsQ0FBQyxFQUEzRCxFQUErRDtBQUFFQyxVQUFJLENBQUNELENBQUQsQ0FBSixHQUFVSCxHQUFHLENBQUNHLENBQUQsQ0FBYjtBQUFtQjs7QUFBQyxXQUFPQyxJQUFQO0FBQWMsR0FBN0gsTUFBbUk7QUFBRSxXQUFPSCxLQUFLLENBQUNJLElBQU4sQ0FBV0wsR0FBWCxDQUFQO0FBQXlCO0FBQUU7O0FBRW5NLFNBQVNNLGlCQUFULENBQTJCQyxFQUEzQixFQUErQjtBQUFFLFNBQU8sWUFBWTtBQUFFLFFBQUlDLEdBQUcsR0FBR0QsRUFBRSxDQUFDRSxLQUFILENBQVMsSUFBVCxFQUFlbEMsU0FBZixDQUFWO0FBQXFDLFdBQU8sSUFBSW1DLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUFFLGVBQVNDLElBQVQsQ0FBY0MsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0I7QUFBRSxZQUFJO0FBQUUsY0FBSUMsSUFBSSxHQUFHUixHQUFHLENBQUNNLEdBQUQsQ0FBSCxDQUFTQyxHQUFULENBQVg7QUFBMEIsY0FBSTFELEtBQUssR0FBRzJELElBQUksQ0FBQzNELEtBQWpCO0FBQXlCLFNBQXpELENBQTBELE9BQU80RCxLQUFQLEVBQWM7QUFBRUwsZ0JBQU0sQ0FBQ0ssS0FBRCxDQUFOO0FBQWU7QUFBUzs7QUFBQyxZQUFJRCxJQUFJLENBQUNFLElBQVQsRUFBZTtBQUFFUCxpQkFBTyxDQUFDdEQsS0FBRCxDQUFQO0FBQWlCLFNBQWxDLE1BQXdDO0FBQUUsaUJBQU9xRCxPQUFPLENBQUNDLE9BQVIsQ0FBZ0J0RCxLQUFoQixFQUF1QjhELElBQXZCLENBQTRCLFVBQVU5RCxLQUFWLEVBQWlCO0FBQUV3RCxnQkFBSSxDQUFDLE1BQUQsRUFBU3hELEtBQVQsQ0FBSjtBQUFzQixXQUFyRSxFQUF1RSxVQUFVK0QsR0FBVixFQUFlO0FBQUVQLGdCQUFJLENBQUMsT0FBRCxFQUFVTyxHQUFWLENBQUo7QUFBcUIsV0FBN0csQ0FBUDtBQUF3SDtBQUFFOztBQUFDLGFBQU9QLElBQUksQ0FBQyxNQUFELENBQVg7QUFBc0IsS0FBalcsQ0FBUDtBQUE0VyxHQUF0YTtBQUF5YTtBQUFDO0FBRzNjOzs7QUFFQSxTQUFTM0IsZUFBVCxHQUEyQjtBQUN6QixNQUFJbUMsS0FBSyxHQUFHLElBQVo7O0FBRUEsTUFBSUMsSUFBSSxHQUFHLENBQUMsR0FBRzlCLE1BQU0sQ0FBQ1AsT0FBWCxHQUFYO0FBQ0EsTUFBSXNDLFdBQVcsR0FBRyxJQUFsQjs7QUFFQSxNQUFJQyxXQUFXLEdBQUcsWUFBWTtBQUM1QixRQUFJQyxJQUFJLEdBQUduQixpQkFBaUI7QUFBRTtBQUFhb0Isc0JBQWtCLENBQUNDLElBQW5CLENBQXdCLFNBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxLQUF4QixFQUErQjtBQUNoRyxVQUFJckUsTUFBSixFQUFZc0UsU0FBWixFQUF1QkMsVUFBdkI7QUFDQSxhQUFPTixrQkFBa0IsQ0FBQ08sSUFBbkIsQ0FBd0IsU0FBU0MsU0FBVCxDQUFtQkMsU0FBbkIsRUFBOEI7QUFDM0QsZUFBTyxDQUFQLEVBQVU7QUFDUixrQkFBUUEsU0FBUyxDQUFDQyxJQUFWLEdBQWlCRCxTQUFTLENBQUNFLElBQW5DO0FBQ0UsaUJBQUssQ0FBTDtBQUNFZCx5QkFBVyxHQUFHTSxJQUFkO0FBQ0FDLG1CQUFLLEdBQUcsR0FBR1EsTUFBSCxDQUFVdkMsa0JBQWtCLENBQUMrQixLQUFELENBQTVCLEVBQXFDLENBQUNELElBQUksQ0FBQ1UsT0FBTixDQUFyQyxDQUFSO0FBQ0FWLGtCQUFJLENBQUM5QyxLQUFMLENBQVcrQyxLQUFYOztBQUNBRCxrQkFBSSxDQUFDVyxLQUFMLEdBQWEsWUFBWTtBQUN2Qix1QkFBT2hCLFdBQVcsQ0FBQ0ssSUFBRCxFQUFPQyxLQUFQLENBQWxCO0FBQ0QsZUFGRDs7QUFHQUQsa0JBQUksQ0FBQ1ksWUFBTCxHQUFvQixZQUFZO0FBQzlCLG9CQUFJQyxLQUFLLEdBQUdwQyxpQkFBaUI7QUFBRTtBQUFhb0Isa0NBQWtCLENBQUNDLElBQW5CLENBQXdCLFNBQVNnQixPQUFULEdBQW1CO0FBQ3JGLHNCQUFJQyxjQUFKO0FBQUEsc0JBQ0k5RSxRQURKO0FBQUEsc0JBRUlxQyxDQUZKO0FBQUEsc0JBR0kwQyxXQUhKO0FBQUEsc0JBSUlDLFVBSko7QUFBQSxzQkFLSUMsS0FBSyxHQUFHeEUsU0FMWjs7QUFPQSx5QkFBT21ELGtCQUFrQixDQUFDTyxJQUFuQixDQUF3QixTQUFTZSxRQUFULENBQWtCQyxRQUFsQixFQUE0QjtBQUN6RCwyQkFBTyxDQUFQLEVBQVU7QUFDUiw4QkFBUUEsUUFBUSxDQUFDYixJQUFULEdBQWdCYSxRQUFRLENBQUNaLElBQWpDO0FBQ0UsNkJBQUssQ0FBTDtBQUNFTyx3Q0FBYyxHQUFHLEVBQWpCO0FBQ0E5RSxrQ0FBUSxHQUFHK0QsSUFBSSxDQUFDVSxPQUFMLENBQWF6RSxRQUF4Qjs7QUFFQSw4QkFBSSxFQUFFQSxRQUFRLElBQUlBLFFBQVEsQ0FBQ1UsTUFBVCxHQUFrQixDQUFoQyxDQUFKLEVBQXdDO0FBQ3RDeUUsb0NBQVEsQ0FBQ1osSUFBVCxHQUFnQixFQUFoQjtBQUNBO0FBQ0Q7O0FBRURsQywyQkFBQyxHQUFHLENBQUo7O0FBRUYsNkJBQUssQ0FBTDtBQUNFLDhCQUFJLEVBQUVBLENBQUMsR0FBR3JDLFFBQVEsQ0FBQ1UsTUFBZixDQUFKLEVBQTRCO0FBQzFCeUUsb0NBQVEsQ0FBQ1osSUFBVCxHQUFnQixFQUFoQjtBQUNBO0FBQ0Q7O0FBRUQsOEJBQUksQ0FBQyxDQUFDLEdBQUdoRCxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJuQixRQUFRLENBQUNxQyxDQUFELENBQXRDLENBQUwsRUFBaUQ7QUFDL0M4QyxvQ0FBUSxDQUFDWixJQUFULEdBQWdCLEVBQWhCO0FBQ0E7QUFDRDs7QUFFRCwyQkFBQ1EsV0FBVyxHQUFHL0UsUUFBUSxDQUFDcUMsQ0FBRCxDQUF2QixFQUE0QnpCLFVBQTVCLENBQXVDK0IsS0FBdkMsQ0FBNkNvQyxXQUE3QyxFQUEwREUsS0FBMUQ7O0FBQ0FFLGtDQUFRLENBQUNDLEVBQVQsR0FBY04sY0FBZDtBQUNBSyxrQ0FBUSxDQUFDWixJQUFULEdBQWdCLEVBQWhCO0FBQ0EsaUNBQU9iLFdBQVcsQ0FBQ0ssSUFBSSxDQUFDc0IsWUFBTCxDQUFrQnJGLFFBQVEsQ0FBQ3FDLENBQUQsQ0FBMUIsQ0FBRCxFQUFpQzJCLEtBQWpDLENBQWxCOztBQUVGLDZCQUFLLEVBQUw7QUFDRW1CLGtDQUFRLENBQUNHLEVBQVQsR0FBY0gsUUFBUSxDQUFDSSxJQUF2Qjs7QUFFQUosa0NBQVEsQ0FBQ0MsRUFBVCxDQUFZSSxJQUFaLENBQWlCQyxJQUFqQixDQUFzQk4sUUFBUSxDQUFDQyxFQUEvQixFQUFtQ0QsUUFBUSxDQUFDRyxFQUE1Qzs7QUFFQUgsa0NBQVEsQ0FBQ1osSUFBVCxHQUFnQixFQUFoQjtBQUNBOztBQUVGLDZCQUFLLEVBQUw7QUFDRSw4QkFBSSxFQUFFLE9BQU92RSxRQUFRLENBQUNxQyxDQUFELENBQWYsS0FBdUIsVUFBekIsQ0FBSixFQUEwQztBQUN4QzhDLG9DQUFRLENBQUNaLElBQVQsR0FBZ0IsRUFBaEI7QUFDQTtBQUNEOztBQUVEWSxrQ0FBUSxDQUFDWixJQUFULEdBQWdCLEVBQWhCO0FBQ0EsaUNBQU92RSxRQUFRLENBQUNxQyxDQUFELENBQVIsQ0FBWU0sS0FBWixDQUFrQjNDLFFBQWxCLEVBQTRCaUYsS0FBNUIsQ0FBUDs7QUFFRiw2QkFBSyxFQUFMO0FBQ0VELG9DQUFVLEdBQUdHLFFBQVEsQ0FBQ0ksSUFBdEI7O0FBRUEsOEJBQUksQ0FBQyxDQUFDLEdBQUdoRSxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEI2RCxVQUE5QixDQUFMLEVBQWdEO0FBQzlDRyxvQ0FBUSxDQUFDWixJQUFULEdBQWdCLEVBQWhCO0FBQ0E7QUFDRDs7QUFFRFksa0NBQVEsQ0FBQ08sRUFBVCxHQUFjWixjQUFkO0FBQ0FLLGtDQUFRLENBQUNaLElBQVQsR0FBZ0IsRUFBaEI7QUFDQSxpQ0FBT2IsV0FBVyxDQUFDSyxJQUFJLENBQUNzQixZQUFMLENBQWtCTCxVQUFsQixDQUFELEVBQWdDaEIsS0FBaEMsQ0FBbEI7O0FBRUYsNkJBQUssRUFBTDtBQUNFbUIsa0NBQVEsQ0FBQ1EsRUFBVCxHQUFjUixRQUFRLENBQUNJLElBQXZCOztBQUVBSixrQ0FBUSxDQUFDTyxFQUFULENBQVlGLElBQVosQ0FBaUJDLElBQWpCLENBQXNCTixRQUFRLENBQUNPLEVBQS9CLEVBQW1DUCxRQUFRLENBQUNRLEVBQTVDOztBQUVBUixrQ0FBUSxDQUFDWixJQUFULEdBQWdCLEVBQWhCO0FBQ0E7O0FBRUYsNkJBQUssRUFBTDtBQUNFTyx3Q0FBYyxDQUFDVSxJQUFmLENBQW9CUixVQUFwQjs7QUFFRiw2QkFBSyxFQUFMO0FBQ0UzQywyQkFBQztBQUNEOEMsa0NBQVEsQ0FBQ1osSUFBVCxHQUFnQixDQUFoQjtBQUNBOztBQUVGLDZCQUFLLEVBQUw7QUFDRSxpQ0FBT1ksUUFBUSxDQUFDUyxNQUFULENBQWdCLFFBQWhCLEVBQTBCZCxjQUExQixDQUFQOztBQUVGLDZCQUFLLEVBQUw7QUFDQSw2QkFBSyxLQUFMO0FBQ0UsaUNBQU9LLFFBQVEsQ0FBQ1UsSUFBVCxFQUFQO0FBOUVKO0FBZ0ZEO0FBQ0YsbUJBbkZNLEVBbUZKaEIsT0FuRkksRUFtRkt0QixLQW5GTCxDQUFQO0FBb0ZELGlCQTVGMkMsQ0FBZixDQUE3Qjs7QUE4RkEsdUJBQU8sWUFBWTtBQUNqQix5QkFBT3FCLEtBQUssQ0FBQ2pDLEtBQU4sQ0FBWSxJQUFaLEVBQWtCbEMsU0FBbEIsQ0FBUDtBQUNELGlCQUZEO0FBR0QsZUFsR21CLEVBQXBCLENBUEYsQ0EyR0U7OztBQUNBZCxvQkFBTSxHQUFHb0UsSUFBSSxDQUFDVSxPQUFMLENBQWF4RCxLQUFiLEVBQVQ7QUFDQWdELHVCQUFTLEdBQUcsS0FBSyxDQUFqQixFQUFvQkMsVUFBVSxHQUFHLEtBQUssQ0FBdEMsQ0E3R0YsQ0ErR0U7O0FBRUEsa0JBQUksRUFBRXZFLE1BQU0sSUFBSUEsTUFBTSxDQUFDMEQsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QmdCLHlCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTtBQUNEOztBQUVERix1QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0EscUJBQU81RSxNQUFQOztBQUVGLGlCQUFLLEVBQUw7QUFDRUEsb0JBQU0sR0FBRzBFLFNBQVMsQ0FBQ2tCLElBQW5CO0FBQ0FsQix1QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7O0FBRUYsaUJBQUssRUFBTDtBQUNFLGtCQUFJLEVBQUU1RSxNQUFNLElBQUksT0FBT0EsTUFBTSxDQUFDNEUsSUFBZCxLQUF1QixVQUFuQyxDQUFKLEVBQW9EO0FBQ2xERix5QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7QUFDRDs7QUFFRE4sdUJBQVMsR0FBR3RFLE1BQU0sQ0FBQzRFLElBQVAsRUFBWjs7QUFFRixpQkFBSyxFQUFMO0FBQ0Usa0JBQUlOLFNBQVMsQ0FBQ2IsSUFBZCxFQUFvQjtBQUNsQmlCLHlCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTtBQUNEOztBQUVELGtCQUFJLENBQUMsQ0FBQyxHQUFHaEQsZ0JBQWdCLENBQUNKLE9BQXJCLEVBQThCOEMsU0FBUyxDQUFDMUUsS0FBeEMsQ0FBTCxFQUFxRDtBQUNuRDhFLHlCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTtBQUNEOztBQUVERix1QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0EscUJBQU9iLFdBQVcsQ0FBQ0ssSUFBSSxDQUFDc0IsWUFBTCxDQUFrQnBCLFNBQVMsQ0FBQzFFLEtBQTVCLENBQUQsRUFBcUN5RSxLQUFyQyxDQUFsQjs7QUFFRixpQkFBSyxFQUFMO0FBQ0VFLHdCQUFVLEdBQUdHLFNBQVMsQ0FBQ2tCLElBQXZCOztBQUVGLGlCQUFLLEVBQUw7QUFDRXRCLHVCQUFTLEdBQUd0RSxNQUFNLENBQUM0RSxJQUFQLENBQVlMLFVBQVosQ0FBWjtBQUNBRyx1QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7O0FBRUYsaUJBQUssRUFBTDtBQUNFLGtCQUFJLENBQUMsQ0FBQyxHQUFHaEQsZ0JBQWdCLENBQUNKLE9BQXJCLEVBQThCOEMsU0FBUyxDQUFDMUUsS0FBeEMsQ0FBTCxFQUFxRDtBQUNuRDhFLHlCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTtBQUNEOztBQUVERix1QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0EscUJBQU9iLFdBQVcsQ0FBQ0ssSUFBSSxDQUFDc0IsWUFBTCxDQUFrQnBCLFNBQVMsQ0FBQzFFLEtBQTVCLENBQUQsRUFBcUN5RSxLQUFyQyxDQUFsQjs7QUFFRixpQkFBSyxFQUFMO0FBQ0VyRSxvQkFBTSxHQUFHMEUsU0FBUyxDQUFDa0IsSUFBbkI7QUFDQWxCLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTs7QUFFRixpQkFBSyxFQUFMO0FBQ0U1RSxvQkFBTSxHQUFHc0UsU0FBUyxDQUFDMUUsS0FBbkI7O0FBRUYsaUJBQUssRUFBTDtBQUNFOEUsdUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBOztBQUVGLGlCQUFLLEVBQUw7QUFDRSxrQkFBSSxDQUFDLENBQUMsR0FBR2hELGdCQUFnQixDQUFDSixPQUFyQixFQUE4QnhCLE1BQTlCLENBQUwsRUFBNEM7QUFDMUMwRSx5QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7QUFDRDs7QUFFREYsdUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBLHFCQUFPYixXQUFXLENBQUNLLElBQUksQ0FBQ3NCLFlBQUwsQ0FBa0IxRixNQUFsQixDQUFELEVBQTRCcUUsS0FBNUIsQ0FBbEI7O0FBRUYsaUJBQUssRUFBTDtBQUNFckUsb0JBQU0sR0FBRzBFLFNBQVMsQ0FBQ2tCLElBQW5COztBQUVGLGlCQUFLLEVBQUw7QUFDRSxrQkFBSSxDQUFDeEIsSUFBSSxDQUFDVSxPQUFMLENBQWF6RCxrQ0FBYixFQUFMLEVBQXdEO0FBQ3REcUQseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRURGLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQSxxQkFBT1IsSUFBSSxDQUFDWSxZQUFMLEVBQVA7O0FBRUYsaUJBQUssRUFBTDtBQUVFWixrQkFBSSxDQUFDVSxPQUFMLENBQWF2RCxHQUFiO0FBQ0E2QyxrQkFBSSxDQUFDN0MsR0FBTDtBQUNBdUMseUJBQVcsR0FBRyxJQUFkO0FBRUEscUJBQU9ZLFNBQVMsQ0FBQ3VCLE1BQVYsQ0FBaUIsUUFBakIsRUFBMkJqRyxNQUEzQixDQUFQOztBQUVGLGlCQUFLLEVBQUw7QUFDQSxpQkFBSyxLQUFMO0FBQ0UscUJBQU8wRSxTQUFTLENBQUN3QixJQUFWLEVBQVA7QUFqTko7QUFtTkQ7QUFDRixPQXROTSxFQXNOSi9CLFFBdE5JLEVBc05NUCxLQXROTixDQUFQO0FBdU5ELEtBek4wQyxDQUFmLENBQTVCOztBQTJOQSxXQUFPLFNBQVNHLFdBQVQsQ0FBcUJvQyxFQUFyQixFQUF5QkMsR0FBekIsRUFBOEI7QUFDbkMsYUFBT3BDLElBQUksQ0FBQ2hCLEtBQUwsQ0FBVyxJQUFYLEVBQWlCbEMsU0FBakIsQ0FBUDtBQUNELEtBRkQ7QUFHRCxHQS9OaUIsRUFBbEI7O0FBaU9BLFNBQU87QUFDTHNELFFBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLGFBQU9OLFdBQVA7QUFDRCxLQUhJO0FBSUx1QyxPQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhdkIsT0FBYixFQUFzQjtBQUN6QixVQUFJd0IsZ0JBQWdCLEdBQUd6QyxJQUFJLENBQUMwQyxXQUFMLENBQWlCekIsT0FBakIsQ0FBdkI7QUFFQSxhQUFPZixXQUFXLENBQUN1QyxnQkFBRCxFQUFtQixFQUFuQixDQUFsQjtBQUNELEtBUkk7QUFTTEUsZUFBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJDLFFBQXJCLEVBQStCO0FBQzFDNUMsVUFBSSxDQUFDNkMsb0JBQUwsQ0FBMEJELFFBQTFCO0FBQ0QsS0FYSTtBQVlMRSxhQUFTLEVBQUUsU0FBU0EsU0FBVCxDQUFtQkYsUUFBbkIsRUFBNkI7QUFDdEM1QyxVQUFJLENBQUMrQyxrQkFBTCxDQUF3QkgsUUFBeEI7QUFDRCxLQWRJO0FBZUxJLGdCQUFZLEVBQUUsU0FBU0EsWUFBVCxDQUFzQkosUUFBdEIsRUFBZ0M7QUFDNUM1QyxVQUFJLENBQUNnRCxZQUFMLENBQWtCSixRQUFsQjtBQUNELEtBakJJO0FBa0JMSyxVQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixhQUFPO0FBQ0xqRCxZQUFJLEVBQUVBLElBREQ7QUFFTGtELGFBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCbEQsY0FBSSxDQUFDa0QsS0FBTDs7QUFDQTlFLHFCQUFXLENBQUNULE9BQVosQ0FBb0J3RixLQUFwQjs7QUFDQTdFLG9CQUFVLENBQUNYLE9BQVgsQ0FBbUJ3RixLQUFuQjtBQUNEO0FBTkksT0FBUDtBQVFEO0FBM0JJLEdBQVA7QUE2QkQ7O0FBQUEsQzs7Ozs7Ozs7Ozs7O0FDcFNZOztBQUVidkgsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDO0FBR0FELE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0J5RixJQUFsQjs7QUFFQSxJQUFJQyxjQUFjLEdBQUd2RixtQkFBTyxDQUFDLG9FQUFELENBQTVCOztBQUVBLElBQUl3RixlQUFlLEdBQUd0RixzQkFBc0IsQ0FBQ3FGLGNBQUQsQ0FBNUM7O0FBRUEsU0FBU3JGLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLFNBQVM2RSxJQUFULEdBQWdCO0FBQ2QsTUFBSVQsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsTUFBSUcsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsTUFBSVMsYUFBYSxHQUFHLEVBQXBCO0FBQ0EsTUFBSUMsSUFBSSxHQUFHQyxhQUFhLEVBQXhCO0FBQ0EsTUFBSUMsR0FBRyxHQUFHLENBQVY7O0FBRUEsV0FBU0MsS0FBVCxHQUFpQjtBQUNmLFdBQU8sTUFBTSxFQUFFRCxHQUFmO0FBQ0Q7O0FBQUE7O0FBQ0QsV0FBU0UsV0FBVCxDQUFxQnJELElBQXJCLEVBQTJCc0QsVUFBM0IsRUFBdUM7QUFDckNBLGNBQVUsQ0FBQzlHLFVBQVgsQ0FBc0J3RCxJQUFJLENBQUNVLE9BQUwsQ0FBYW5FLEVBQW5DLEVBQXVDeUQsSUFBSSxDQUFDVSxPQUFMLENBQWFqRSxJQUFiLEVBQXZDO0FBQ0F1RCxRQUFJLENBQUNVLE9BQUwsR0FBZTRDLFVBQWY7QUFDQSxXQUFPdEQsSUFBUDtBQUNEOztBQUNELFdBQVN1RCxRQUFULENBQWtCQyxVQUFsQixFQUE4QkYsVUFBOUIsRUFBMEM7QUFDeEMsUUFBSUUsVUFBVSxJQUFJQSxVQUFVLENBQUM3SCxJQUFYLEtBQW9CMkgsVUFBVSxDQUFDM0gsSUFBakQsRUFBdUQ7QUFDckQsYUFBTyxDQUFDLEdBQUdvSCxlQUFlLENBQUMzRixPQUFwQixFQUE2Qm9HLFVBQVUsQ0FBQ3hILEtBQXhDLEVBQStDc0gsVUFBVSxDQUFDdEgsS0FBMUQsQ0FBUDtBQUNEOztBQUNELFdBQU8sS0FBUDtBQUNEOztBQUNELFdBQVNrSCxhQUFULENBQXVCeEMsT0FBdkIsRUFBZ0M7QUFDOUIsUUFBSUEsT0FBSixFQUFhO0FBQ1hBLGFBQU8sQ0FBQ2xFLFVBQVIsQ0FBbUI0RyxLQUFLLEVBQXhCO0FBQ0Q7O0FBQ0QsV0FBTztBQUNMMUMsYUFBTyxFQUFFQSxPQURKO0FBRUx6RSxjQUFRLEVBQUUsRUFGTDtBQUdMZ0UsV0FBSyxFQUFFLEVBSEY7QUFJTHdELFlBQU0sRUFBRSxDQUpIO0FBS0x2RyxXQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlK0MsS0FBZixFQUFzQjtBQUMzQixZQUFJVCxLQUFLLEdBQUcsSUFBWjs7QUFFQSxhQUFLUyxLQUFMLEdBQWFBLEtBQWI7QUFDQW1DLG1CQUFXLENBQUNzQixPQUFaLENBQW9CLFVBQVVDLENBQVYsRUFBYTtBQUMvQixpQkFBT0EsQ0FBQyxDQUFDbkUsS0FBRCxDQUFSO0FBQ0QsU0FGRDtBQUdELE9BWkk7QUFhTHJDLFNBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7QUFDbEIsWUFBSXlHLE1BQU0sR0FBRyxJQUFiLENBRGtCLENBR2xCOzs7QUFDQSxZQUFJLEtBQUtILE1BQUwsR0FBYyxLQUFLeEgsUUFBTCxDQUFjVSxNQUFoQyxFQUF3QztBQUN0QyxlQUFLVixRQUFMLENBQWM0SCxNQUFkLENBQXFCLEtBQUtKLE1BQTFCLEVBQWtDLEtBQUt4SCxRQUFMLENBQWNVLE1BQWQsR0FBdUIsS0FBSzhHLE1BQTlELEVBQXNFQyxPQUF0RSxDQUE4RSxVQUFVSSxXQUFWLEVBQXVCO0FBQ25HLG1CQUFPZCxhQUFhLENBQUNVLE9BQWQsQ0FBc0IsVUFBVUMsQ0FBVixFQUFhO0FBQ3hDLHFCQUFPQSxDQUFDLENBQUNHLFdBQUQsQ0FBUjtBQUNELGFBRk0sQ0FBUDtBQUdELFdBSkQ7QUFLRDs7QUFDRCxhQUFLTCxNQUFMLEdBQWMsQ0FBZDtBQUNBLGFBQUt4RCxLQUFMLEdBQWEsRUFBYjtBQUNBc0MsaUJBQVMsQ0FBQ21CLE9BQVYsQ0FBa0IsVUFBVUMsQ0FBVixFQUFhO0FBQzdCLGlCQUFPQSxDQUFDLENBQUNDLE1BQUQsQ0FBUjtBQUNELFNBRkQ7QUFHRCxPQTdCSTtBQThCTHRDLGtCQUFZLEVBQUUsU0FBU0EsWUFBVCxDQUFzQmdDLFVBQXRCLEVBQWtDO0FBQzlDLFlBQUlTLE1BQU0sR0FBRyxJQUFiOztBQUVBLFlBQUlDLFNBQVMsR0FBRyxLQUFLL0gsUUFBTCxDQUFjLEtBQUt3SCxNQUFuQixDQUFoQixDQUg4QyxDQUs5Qzs7QUFDQSxZQUFJTyxTQUFTLElBQUlULFFBQVEsQ0FBQ1MsU0FBUyxDQUFDdEQsT0FBWCxFQUFvQjRDLFVBQXBCLENBQXpCLEVBQTBEO0FBQ3hELGVBQUtHLE1BQUwsSUFBZSxDQUFmO0FBQ0EsaUJBQU9KLFdBQVcsQ0FBQ1csU0FBRCxFQUFZVixVQUFaLENBQWxCO0FBQ0QsU0FUNkMsQ0FXOUM7OztBQUNBLFlBQUlXLFlBQVksR0FBR2YsYUFBYSxDQUFDSSxVQUFELENBQWhDOztBQUVBLFlBQUksS0FBS3JILFFBQUwsQ0FBYyxLQUFLd0gsTUFBbkIsQ0FBSixFQUFnQztBQUM5QlQsdUJBQWEsQ0FBQ1UsT0FBZCxDQUFzQixVQUFVQyxDQUFWLEVBQWE7QUFDakMsbUJBQU9BLENBQUMsQ0FBQ0ksTUFBTSxDQUFDOUgsUUFBUCxDQUFnQjhILE1BQU0sQ0FBQ04sTUFBdkIsQ0FBRCxDQUFSO0FBQ0QsV0FGRDtBQUdEOztBQUNELGFBQUt4SCxRQUFMLENBQWMsS0FBS3dILE1BQW5CLElBQTZCUSxZQUE3QjtBQUNBLGFBQUtSLE1BQUwsSUFBZSxDQUFmO0FBQ0EsZUFBT1EsWUFBUDtBQUNEO0FBcERJLEtBQVA7QUFzREQ7O0FBRUQsU0FBTztBQUNMOUIsZUFBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJ6QixPQUFyQixFQUE4QjtBQUN6QyxhQUFPdUMsSUFBSSxHQUFHTSxRQUFRLENBQUNOLElBQUksQ0FBQ3ZDLE9BQU4sRUFBZUEsT0FBZixDQUFSLEdBQWtDMkMsV0FBVyxDQUFDSixJQUFELEVBQU92QyxPQUFQLENBQTdDLEdBQStEd0MsYUFBYSxDQUFDeEMsT0FBRCxDQUExRjtBQUNELEtBSEk7QUFJTGlDLFNBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCTSxVQUFJLEdBQUdDLGFBQWEsRUFBcEI7QUFDQUMsU0FBRyxHQUFHLENBQU47QUFDRCxLQVBJO0FBUUxlLG9CQUFnQixFQUFFLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU9mLEdBQVA7QUFDRCxLQVZJO0FBV0xnQixZQUFRLEVBQUUsU0FBU0EsUUFBVCxHQUFvQjtBQUM1QixhQUFPLFNBQVNDLFFBQVQsQ0FBa0JwRSxJQUFsQixFQUF3QjtBQUM3QixZQUFJcUUsR0FBRyxHQUFHM0gsU0FBUyxDQUFDQyxNQUFWLEdBQW1CLENBQW5CLElBQXdCRCxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCRSxTQUF6QyxHQUFxREYsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsQ0FBOUUsQ0FENkIsQ0FHN0I7O0FBQ0EsZUFBTztBQUNMMkgsYUFBRyxFQUFFQSxHQURBO0FBRUwxSSxjQUFJLEVBQUVxRSxJQUFJLENBQUNVLE9BQUwsQ0FBYS9FLElBRmQ7QUFHTGMsY0FBSSxFQUFFdUQsSUFBSSxDQUFDVSxPQUFMLENBQWFqRSxJQUFiLEVBSEQ7QUFJTEYsWUFBRSxFQUFFeUQsSUFBSSxDQUFDVSxPQUFMLENBQWFuRSxFQUpaO0FBS0xOLGtCQUFRLEVBQUUrRCxJQUFJLENBQUMvRCxRQUFMLENBQWNxSSxHQUFkLENBQWtCLFVBQVVDLEtBQVYsRUFBaUI7QUFDM0MsbUJBQU9ILFFBQVEsQ0FBQ0csS0FBRCxFQUFRRixHQUFHLEdBQUcsQ0FBZCxDQUFmO0FBQ0QsV0FGUztBQUxMLFNBQVA7QUFTRCxPQWJNLENBYUxwQixJQWJLLENBQVA7QUFjRCxLQTFCSTtBQTJCTFgsd0JBQW9CLEVBQUUsU0FBU0Esb0JBQVQsQ0FBOEJELFFBQTlCLEVBQXdDO0FBQzVERCxpQkFBVyxDQUFDWCxJQUFaLENBQWlCWSxRQUFqQjtBQUNELEtBN0JJO0FBOEJMRyxzQkFBa0IsRUFBRSxTQUFTQSxrQkFBVCxDQUE0QkgsUUFBNUIsRUFBc0M7QUFDeERFLGVBQVMsQ0FBQ2QsSUFBVixDQUFlWSxRQUFmO0FBQ0QsS0FoQ0k7QUFpQ0xJLGdCQUFZLEVBQUUsU0FBU0EsWUFBVCxDQUFzQkosUUFBdEIsRUFBZ0M7QUFDNUNXLG1CQUFhLENBQUN2QixJQUFkLENBQW1CWSxRQUFuQjtBQUNEO0FBbkNJLEdBQVA7QUFxQ0Q7QUFBQzs7O0FBQ0YsQzs7Ozs7Ozs7Ozs7O0FDcElhOztBQUViaEgsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUlBLElBQUlnSixtQkFBbUIsR0FBR2pILG1CQUFPLENBQUMsK0VBQUQsQ0FBakM7O0FBRUEsSUFBSWtILG9CQUFvQixHQUFHaEgsc0JBQXNCLENBQUMrRyxtQkFBRCxDQUFqRDs7QUFFQSxTQUFTL0csc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsSUFBSTBHLHFCQUFxQixHQUFHLFNBQVNBLHFCQUFULENBQStCQyxTQUEvQixFQUEwQztBQUNwRSxTQUFPLFlBQVk7QUFDakIsS0FBQyxHQUFHRixvQkFBb0IsQ0FBQ3JILE9BQXpCLEVBQWtDdUgsU0FBbEM7QUFFQSxRQUFJM0UsSUFBSSxHQUFHMkUsU0FBUyxDQUFDM0UsSUFBVixFQUFYO0FBRUFBLFFBQUksQ0FBQ1UsT0FBTCxDQUFhekQsa0NBQWIsQ0FBZ0QsS0FBaEQ7QUFDQSxXQUFPLENBQUMrQyxJQUFJLENBQUNZLFlBQU4sRUFBb0JaLElBQUksQ0FBQ1UsT0FBTCxDQUFhekUsUUFBakMsQ0FBUDtBQUNELEdBUEQ7QUFRRCxDQVREOztBQVdBVixPQUFPLENBQUM2QixPQUFSLEdBQWtCc0gscUJBQWxCLEM7Ozs7Ozs7Ozs7OztBQ3ZCYTs7QUFFYnJKLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJZ0osbUJBQW1CLEdBQUdqSCxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUlrSCxvQkFBb0IsR0FBR2hILHNCQUFzQixDQUFDK0csbUJBQUQsQ0FBakQ7O0FBRUEsU0FBUy9HLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLElBQUk0RyxvQkFBb0IsR0FBRyxTQUFTQSxvQkFBVCxDQUE4QkQsU0FBOUIsRUFBeUM7QUFDbEUsU0FBTyxZQUFZO0FBQ2pCLEtBQUMsR0FBR0Ysb0JBQW9CLENBQUNySCxPQUF6QixFQUFrQ3VILFNBQWxDO0FBRUEsV0FBT0EsU0FBUyxDQUFDM0UsSUFBVixHQUFpQlUsT0FBeEI7QUFDRCxHQUpEO0FBS0QsQ0FORDs7QUFRQW5GLE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0J3SCxvQkFBbEIsQzs7Ozs7Ozs7Ozs7O0FDcEJhOztBQUVidkosTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUlBLElBQUlnSixtQkFBbUIsR0FBR2pILG1CQUFPLENBQUMsK0VBQUQsQ0FBakM7O0FBRUEsSUFBSWtILG9CQUFvQixHQUFHaEgsc0JBQXNCLENBQUMrRyxtQkFBRCxDQUFqRDs7QUFFQSxTQUFTL0csc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsU0FBUzZHLGVBQVQsQ0FBeUI3RyxHQUF6QixFQUE4QmlCLEdBQTlCLEVBQW1DekQsS0FBbkMsRUFBMEM7QUFBRSxNQUFJeUQsR0FBRyxJQUFJakIsR0FBWCxFQUFnQjtBQUFFM0MsVUFBTSxDQUFDQyxjQUFQLENBQXNCMEMsR0FBdEIsRUFBMkJpQixHQUEzQixFQUFnQztBQUFFekQsV0FBSyxFQUFFQSxLQUFUO0FBQWdCc0osZ0JBQVUsRUFBRSxJQUE1QjtBQUFrQ0Msa0JBQVksRUFBRSxJQUFoRDtBQUFzREMsY0FBUSxFQUFFO0FBQWhFLEtBQWhDO0FBQTBHLEdBQTVILE1BQWtJO0FBQUVoSCxPQUFHLENBQUNpQixHQUFELENBQUgsR0FBV3pELEtBQVg7QUFBbUI7O0FBQUMsU0FBT3dDLEdBQVA7QUFBYTtBQUFDOzs7QUFHbE4sSUFBSWlILGNBQWMsR0FBRyxTQUFTQSxjQUFULENBQXdCQyxJQUF4QixFQUE4QkMsVUFBOUIsRUFBMENsRixLQUExQyxFQUFpRGIsS0FBakQsRUFBd0Q7QUFDM0UsTUFBSStGLFVBQVUsR0FBRyxDQUFqQixFQUFvQjtBQUNsQixVQUFNL0YsS0FBTjtBQUNEOztBQUNELE1BQUlnRyxNQUFNLEdBQUduRixLQUFLLENBQUNrRixVQUFELENBQWxCO0FBQ0EsTUFBSUUsT0FBTyxHQUFHRCxNQUFNLENBQUNFLGNBQVAsR0FBd0JGLE1BQU0sQ0FBQ0UsY0FBUCxDQUFzQkosSUFBdEIsQ0FBeEIsR0FBc0QsSUFBcEU7O0FBRUEsTUFBSUcsT0FBTyxLQUFLLElBQWhCLEVBQXNCO0FBQ3BCLFdBQU9BLE9BQU8sQ0FBQzdKLEtBQWY7QUFDRDs7QUFDRCxTQUFPeUosY0FBYyxDQUFDQyxJQUFELEVBQU9DLFVBQVUsR0FBRyxDQUFwQixFQUF1QmxGLEtBQXZCLEVBQThCYixLQUE5QixDQUFyQjtBQUNELENBWEQ7O0FBYUEsSUFBSW1HLG9CQUFvQixHQUFHLFNBQVNBLG9CQUFULENBQThCWixTQUE5QixFQUF5QztBQUNsRUEsV0FBUyxDQUFDdkMsV0FBVixDQUFzQixVQUFVcEMsSUFBVixFQUFnQjtBQUNwQyxRQUFJVSxPQUFPLEdBQUdWLElBQUksQ0FBQ1UsT0FBbkI7QUFBQSxRQUNJVCxLQUFLLEdBQUdELElBQUksQ0FBQ0MsS0FEakI7QUFFQSxRQUFJakUsS0FBSyxHQUFHMEUsT0FBTyxDQUFDMUUsS0FBcEI7QUFFQSxRQUFJd0osU0FBUyxHQUFHeEosS0FBSyxHQUFHWCxNQUFNLENBQUNvSyxJQUFQLENBQVl6SixLQUFaLENBQUgsR0FBd0IsRUFBN0M7QUFFQXdKLGFBQVMsQ0FBQzlCLE9BQVYsQ0FBa0IsVUFBVWdDLFFBQVYsRUFBb0I7QUFDcEMsVUFBSUEsUUFBUSxDQUFDQyxNQUFULENBQWdCLENBQWhCLE1BQXVCLEdBQTNCLEVBQWdDO0FBQzlCLFlBQUlDLE9BQU8sR0FBR0YsUUFBUSxDQUFDRyxNQUFULENBQWdCLENBQWhCLEVBQW1CSCxRQUFRLENBQUMvSSxNQUE1QixDQUFkO0FBQ0EsWUFBSW1KLGVBQWUsR0FBRzlGLElBQUksQ0FBQ0MsS0FBTCxDQUFXOEYsS0FBWCxDQUFpQixDQUFqQixFQUFvQi9GLElBQUksQ0FBQ0MsS0FBTCxDQUFXdEQsTUFBWCxHQUFvQixDQUF4QyxDQUF0QjtBQUNBLFlBQUlxSixZQUFZLEdBQUdmLGNBQWMsQ0FBQ1csT0FBRCxFQUFVRSxlQUFlLENBQUNuSixNQUFoQixHQUF5QixDQUFuQyxFQUFzQ21KLGVBQXRDLEVBQXVELElBQUk1SixLQUFKLENBQVUsTUFBTTBKLE9BQU4sR0FBZ0IsdUJBQWhCLEdBQTBDbEYsT0FBTyxDQUFDL0UsSUFBbEQsR0FBeUQsaUNBQXpELEdBQTZGc0UsS0FBSyxDQUFDcUUsR0FBTixDQUFVLFVBQVUxRSxJQUFWLEVBQWdCO0FBQ3ZOLGNBQUlqRSxJQUFJLEdBQUdpRSxJQUFJLENBQUNqRSxJQUFoQjtBQUNBLGlCQUFPLFFBQVFBLElBQVIsR0FBZSxHQUF0QjtBQUNELFNBSDhMLEVBRzVMc0ssSUFINEwsQ0FHdkwsSUFIdUwsQ0FBdkcsQ0FBdkQsQ0FBakM7QUFLQXZGLGVBQU8sQ0FBQzdELFVBQVIsQ0FBbUJnSSxlQUFlLENBQUMsRUFBRCxFQUFLZSxPQUFMLEVBQWNJLFlBQWQsQ0FBbEM7QUFDRCxPQVRELE1BU08sSUFBSU4sUUFBUSxLQUFLLFNBQWpCLEVBQTRCO0FBQ2pDaEYsZUFBTyxDQUFDNEUsY0FBUixHQUF5QixVQUFVTSxPQUFWLEVBQW1CO0FBQzFDLGNBQUk1SixLQUFLLElBQUlBLEtBQUssQ0FBQ1QsT0FBZixJQUEwQlMsS0FBSyxDQUFDVCxPQUFOLEtBQWtCcUssT0FBaEQsRUFBeUQ7QUFDdkQsbUJBQU87QUFBRXBLLG1CQUFLLEVBQUV3RSxJQUFJLENBQUNrRztBQUFkLGFBQVA7QUFDRDs7QUFDRCxpQkFBTyxJQUFQO0FBQ0QsU0FMRDtBQU1EO0FBQ0YsS0FsQkQ7QUFtQkQsR0ExQkQ7QUE0QkEsU0FBTyxVQUFVMUssS0FBVixFQUFpQjtBQUN0QixLQUFDLEdBQUdpSixvQkFBb0IsQ0FBQ3JILE9BQXpCLEVBQWtDdUgsU0FBbEM7QUFDQSxRQUFJM0UsSUFBSSxHQUFHMkUsU0FBUyxDQUFDM0UsSUFBVixFQUFYO0FBRUFBLFFBQUksQ0FBQ2tHLFNBQUwsR0FBaUIxSyxLQUFqQjtBQUNBLFdBQU8sQ0FBQyxVQUFVMkssUUFBVixFQUFvQjtBQUMxQixhQUFPbkcsSUFBSSxDQUFDa0csU0FBTCxHQUFpQkMsUUFBeEI7QUFDRCxLQUZNLENBQVA7QUFHRCxHQVJEO0FBU0QsQ0F0Q0Q7O0FBd0NBNUssT0FBTyxDQUFDNkIsT0FBUixHQUFrQm1JLG9CQUFsQixDOzs7Ozs7Ozs7Ozs7QUNwRWE7O0FBRWJsSyxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSTRLLGNBQWMsR0FBRyxZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QmxJLEdBQXZCLEVBQTRCRyxDQUE1QixFQUErQjtBQUFFLFFBQUlnSSxJQUFJLEdBQUcsRUFBWDtBQUFlLFFBQUlDLEVBQUUsR0FBRyxJQUFUO0FBQWUsUUFBSUMsRUFBRSxHQUFHLEtBQVQ7QUFBZ0IsUUFBSUMsRUFBRSxHQUFHN0osU0FBVDs7QUFBb0IsUUFBSTtBQUFFLFdBQUssSUFBSThKLEVBQUUsR0FBR3ZJLEdBQUcsQ0FBQ3dJLE1BQU0sQ0FBQ0MsUUFBUixDQUFILEVBQVQsRUFBaUNDLEVBQXRDLEVBQTBDLEVBQUVOLEVBQUUsR0FBRyxDQUFDTSxFQUFFLEdBQUdILEVBQUUsQ0FBQ2xHLElBQUgsRUFBTixFQUFpQm5CLElBQXhCLENBQTFDLEVBQXlFa0gsRUFBRSxHQUFHLElBQTlFLEVBQW9GO0FBQUVELFlBQUksQ0FBQzdFLElBQUwsQ0FBVW9GLEVBQUUsQ0FBQ3JMLEtBQWI7O0FBQXFCLFlBQUk4QyxDQUFDLElBQUlnSSxJQUFJLENBQUMzSixNQUFMLEtBQWdCMkIsQ0FBekIsRUFBNEI7QUFBUTtBQUFFLEtBQXZKLENBQXdKLE9BQU9pQixHQUFQLEVBQVk7QUFBRWlILFFBQUUsR0FBRyxJQUFMO0FBQVdDLFFBQUUsR0FBR2xILEdBQUw7QUFBVyxLQUE1TCxTQUFxTTtBQUFFLFVBQUk7QUFBRSxZQUFJLENBQUNnSCxFQUFELElBQU9HLEVBQUUsQ0FBQyxRQUFELENBQWIsRUFBeUJBLEVBQUUsQ0FBQyxRQUFELENBQUY7QUFBaUIsT0FBaEQsU0FBeUQ7QUFBRSxZQUFJRixFQUFKLEVBQVEsTUFBTUMsRUFBTjtBQUFXO0FBQUU7O0FBQUMsV0FBT0gsSUFBUDtBQUFjOztBQUFDLFNBQU8sVUFBVW5JLEdBQVYsRUFBZUcsQ0FBZixFQUFrQjtBQUFFLFFBQUlGLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixHQUFkLENBQUosRUFBd0I7QUFBRSxhQUFPQSxHQUFQO0FBQWEsS0FBdkMsTUFBNkMsSUFBSXdJLE1BQU0sQ0FBQ0MsUUFBUCxJQUFtQnZMLE1BQU0sQ0FBQzhDLEdBQUQsQ0FBN0IsRUFBb0M7QUFBRSxhQUFPa0ksYUFBYSxDQUFDbEksR0FBRCxFQUFNRyxDQUFOLENBQXBCO0FBQStCLEtBQXJFLE1BQTJFO0FBQUUsWUFBTSxJQUFJd0ksU0FBSixDQUFjLHNEQUFkLENBQU47QUFBOEU7QUFBRSxHQUFyTztBQUF3TyxDQUFob0IsRUFBckI7O0FBRUF2TCxPQUFPLENBQUM2QixPQUFSLEdBQWtCMkosbUJBQWxCOztBQUVBLElBQUl2QyxtQkFBbUIsR0FBR2pILG1CQUFPLENBQUMsK0VBQUQsQ0FBakM7O0FBRUEsSUFBSWtILG9CQUFvQixHQUFHaEgsc0JBQXNCLENBQUMrRyxtQkFBRCxDQUFqRDs7QUFFQSxTQUFTL0csc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsSUFBSWdKLFdBQVcsR0FBRyxFQUFsQjs7QUFFQSxTQUFTQyxzQkFBVCxDQUFnQ0MsU0FBaEMsRUFBMkNDLFdBQTNDLEVBQXdEO0FBQ3RELFNBQU8sVUFBVXZILElBQVYsRUFBZ0I7QUFDckIsUUFBSXdILElBQUksR0FBR3hILElBQUksQ0FBQ3dILElBQWhCOztBQUVBLFFBQUlDLFlBQVksR0FBR0YsV0FBVyxFQUE5QjtBQUFBLFFBQ0lHLGFBQWEsR0FBR2xCLGNBQWMsQ0FBQ2lCLFlBQUQsRUFBZSxDQUFmLENBRGxDO0FBQUEsUUFFSXBMLFFBQVEsR0FBR3FMLGFBQWEsQ0FBQyxDQUFELENBRjVCOztBQUlBSixhQUFTLENBQUNFLElBQUQsRUFBTyxVQUFVRyxPQUFWLEVBQW1CO0FBQ2pDLGFBQU90TCxRQUFRLENBQUM7QUFBRXNMLGVBQU8sRUFBRUE7QUFBWCxPQUFELENBQWY7QUFDRCxLQUZRLENBQVQ7QUFHRCxHQVZEO0FBV0Q7O0FBQUE7O0FBQ0QsU0FBU0Msb0JBQVQsQ0FBOEJDLE9BQTlCLEVBQXVDO0FBQ3JDLFNBQU8sVUFBVTVHLEtBQVYsRUFBaUI7QUFDdEIsUUFBSXVHLElBQUksR0FBR3ZHLEtBQUssQ0FBQ3VHLElBQWpCO0FBQUEsUUFDSUcsT0FBTyxHQUFHMUcsS0FBSyxDQUFDMEcsT0FEcEI7QUFHQUUsV0FBTyxDQUFDTCxJQUFELEVBQU9HLE9BQVAsQ0FBUDtBQUNELEdBTEQ7QUFNRDs7QUFFRCxJQUFJTCxTQUFTLEdBQUcsU0FBU0EsU0FBVCxDQUFtQnhHLE9BQW5CLEVBQTRCMEcsSUFBNUIsRUFBa0MvRSxRQUFsQyxFQUE0QztBQUMxRCxNQUFJLENBQUMyRSxXQUFXLENBQUNJLElBQUQsQ0FBaEIsRUFBd0JKLFdBQVcsQ0FBQ0ksSUFBRCxDQUFYLEdBQW9CLEVBQXBCO0FBQ3hCSixhQUFXLENBQUNJLElBQUQsQ0FBWCxDQUFrQjFHLE9BQU8sQ0FBQ25FLEVBQTFCLElBQWdDOEYsUUFBaEM7QUFDQSxTQUFPLFlBQVk7QUFDakIsV0FBTzJFLFdBQVcsQ0FBQ0ksSUFBRCxDQUFYLENBQWtCMUcsT0FBTyxDQUFDbkUsRUFBMUIsQ0FBUDtBQUNELEdBRkQ7QUFHRCxDQU5EOztBQU9BLElBQUlrTCxPQUFPLEdBQUcsU0FBU0EsT0FBVCxDQUFpQkwsSUFBakIsRUFBdUJHLE9BQXZCLEVBQWdDO0FBQzVDLE1BQUksQ0FBQ1AsV0FBVyxDQUFDSSxJQUFELENBQWhCLEVBQXdCO0FBQ3hCL0wsUUFBTSxDQUFDb0ssSUFBUCxDQUFZdUIsV0FBVyxDQUFDSSxJQUFELENBQXZCLEVBQStCMUQsT0FBL0IsQ0FBdUMsVUFBVW5ILEVBQVYsRUFBYztBQUNuRHlLLGVBQVcsQ0FBQ0ksSUFBRCxDQUFYLENBQWtCN0ssRUFBbEIsRUFBc0JnTCxPQUF0QjtBQUNELEdBRkQ7QUFHRCxDQUxEOztBQU9BLFNBQVNSLG1CQUFULENBQTZCcEMsU0FBN0IsRUFBd0N3QyxXQUF4QyxFQUFxRDtBQUNuRHhDLFdBQVMsQ0FBQ2xDLFlBQVYsQ0FBdUIsVUFBVXpDLElBQVYsRUFBZ0I7QUFDckMzRSxVQUFNLENBQUNvSyxJQUFQLENBQVl1QixXQUFaLEVBQXlCdEQsT0FBekIsQ0FBaUMsVUFBVTBELElBQVYsRUFBZ0I7QUFDL0MsVUFBSUosV0FBVyxDQUFDSSxJQUFELENBQVgsQ0FBa0JwSCxJQUFJLENBQUNVLE9BQUwsQ0FBYW5FLEVBQS9CLENBQUosRUFBd0M7QUFDdEMsZUFBT3lLLFdBQVcsQ0FBQ0ksSUFBRCxDQUFYLENBQWtCcEgsSUFBSSxDQUFDVSxPQUFMLENBQWFuRSxFQUEvQixDQUFQO0FBQ0Q7QUFDRixLQUpEO0FBS0QsR0FORDtBQU9BLFNBQU8sVUFBVW1MLGFBQVYsRUFBeUI7QUFDOUIsS0FBQyxHQUFHakQsb0JBQW9CLENBQUNySCxPQUF6QixFQUFrQ3VILFNBQWxDO0FBRUEsUUFBSTNFLElBQUksR0FBRzJFLFNBQVMsQ0FBQzNFLElBQVYsRUFBWDtBQUNBLFFBQUkySCxFQUFFLEdBQUdELGFBQWEsSUFBSTFILElBQUksQ0FBQ1UsT0FBL0I7O0FBQ0EsUUFBSWtILGFBQWEsR0FBRyxTQUFTQSxhQUFULEdBQXlCO0FBQzNDLFdBQUssSUFBSUMsSUFBSSxHQUFHbkwsU0FBUyxDQUFDQyxNQUFyQixFQUE2Qm1MLE1BQU0sR0FBRzFKLEtBQUssQ0FBQ3lKLElBQUQsQ0FBM0MsRUFBbURFLElBQUksR0FBRyxDQUEvRCxFQUFrRUEsSUFBSSxHQUFHRixJQUF6RSxFQUErRUUsSUFBSSxFQUFuRixFQUF1RjtBQUNyRkQsY0FBTSxDQUFDQyxJQUFELENBQU4sR0FBZXJMLFNBQVMsQ0FBQ3FMLElBQUQsQ0FBeEI7QUFDRDs7QUFFRCxhQUFPYixTQUFTLENBQUN0SSxLQUFWLENBQWdCaEMsU0FBaEIsRUFBMkIsQ0FBQytLLEVBQUQsRUFBS2xILE1BQUwsQ0FBWXFILE1BQVosQ0FBM0IsQ0FBUDtBQUNELEtBTkQ7O0FBT0EsUUFBSUUsV0FBVyxHQUFHLFNBQVNBLFdBQVQsR0FBdUI7QUFDdkMsYUFBT1AsT0FBTyxDQUFDN0ksS0FBUixDQUFjaEMsU0FBZCxFQUF5QkYsU0FBekIsQ0FBUDtBQUNELEtBRkQ7O0FBSUEsV0FBTztBQUNMd0ssZUFBUyxFQUFFVSxhQUROO0FBRUxILGFBQU8sRUFBRU8sV0FGSjtBQUdMaEIsaUJBQVcsRUFBRUEsV0FIUjtBQUlMaUIsZUFBUyxFQUFFaEIsc0JBQXNCLENBQUNXLGFBQUQsRUFBZ0JULFdBQWhCLENBSjVCO0FBS0xlLGFBQU8sRUFBRVYsb0JBQW9CLENBQUNRLFdBQUQ7QUFMeEIsS0FBUDtBQU9ELEdBdkJEO0FBd0JEOztBQUVEakIsbUJBQW1CLENBQUNuRSxLQUFwQixHQUE0QixZQUFZO0FBQ3RDb0UsYUFBVyxHQUFHLEVBQWQ7QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7OztBQ3hGYTs7QUFFYjNMLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJNEssY0FBYyxHQUFHLFlBQVk7QUFBRSxXQUFTQyxhQUFULENBQXVCbEksR0FBdkIsRUFBNEJHLENBQTVCLEVBQStCO0FBQUUsUUFBSWdJLElBQUksR0FBRyxFQUFYO0FBQWUsUUFBSUMsRUFBRSxHQUFHLElBQVQ7QUFBZSxRQUFJQyxFQUFFLEdBQUcsS0FBVDtBQUFnQixRQUFJQyxFQUFFLEdBQUc3SixTQUFUOztBQUFvQixRQUFJO0FBQUUsV0FBSyxJQUFJOEosRUFBRSxHQUFHdkksR0FBRyxDQUFDd0ksTUFBTSxDQUFDQyxRQUFSLENBQUgsRUFBVCxFQUFpQ0MsRUFBdEMsRUFBMEMsRUFBRU4sRUFBRSxHQUFHLENBQUNNLEVBQUUsR0FBR0gsRUFBRSxDQUFDbEcsSUFBSCxFQUFOLEVBQWlCbkIsSUFBeEIsQ0FBMUMsRUFBeUVrSCxFQUFFLEdBQUcsSUFBOUUsRUFBb0Y7QUFBRUQsWUFBSSxDQUFDN0UsSUFBTCxDQUFVb0YsRUFBRSxDQUFDckwsS0FBYjs7QUFBcUIsWUFBSThDLENBQUMsSUFBSWdJLElBQUksQ0FBQzNKLE1BQUwsS0FBZ0IyQixDQUF6QixFQUE0QjtBQUFRO0FBQUUsS0FBdkosQ0FBd0osT0FBT2lCLEdBQVAsRUFBWTtBQUFFaUgsUUFBRSxHQUFHLElBQUw7QUFBV0MsUUFBRSxHQUFHbEgsR0FBTDtBQUFXLEtBQTVMLFNBQXFNO0FBQUUsVUFBSTtBQUFFLFlBQUksQ0FBQ2dILEVBQUQsSUFBT0csRUFBRSxDQUFDLFFBQUQsQ0FBYixFQUF5QkEsRUFBRSxDQUFDLFFBQUQsQ0FBRjtBQUFpQixPQUFoRCxTQUF5RDtBQUFFLFlBQUlGLEVBQUosRUFBUSxNQUFNQyxFQUFOO0FBQVc7QUFBRTs7QUFBQyxXQUFPSCxJQUFQO0FBQWM7O0FBQUMsU0FBTyxVQUFVbkksR0FBVixFQUFlRyxDQUFmLEVBQWtCO0FBQUUsUUFBSUYsS0FBSyxDQUFDQyxPQUFOLENBQWNGLEdBQWQsQ0FBSixFQUF3QjtBQUFFLGFBQU9BLEdBQVA7QUFBYSxLQUF2QyxNQUE2QyxJQUFJd0ksTUFBTSxDQUFDQyxRQUFQLElBQW1CdkwsTUFBTSxDQUFDOEMsR0FBRCxDQUE3QixFQUFvQztBQUFFLGFBQU9rSSxhQUFhLENBQUNsSSxHQUFELEVBQU1HLENBQU4sQ0FBcEI7QUFBK0IsS0FBckUsTUFBMkU7QUFBRSxZQUFNLElBQUl3SSxTQUFKLENBQWMsc0RBQWQsQ0FBTjtBQUE4RTtBQUFFLEdBQXJPO0FBQXdPLENBQWhvQixFQUFyQjs7QUFFQXZMLE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0IrSyxvQkFBbEI7O0FBRUEsU0FBU0Msd0JBQVQsQ0FBa0NwSyxHQUFsQyxFQUF1Q3lILElBQXZDLEVBQTZDO0FBQUUsTUFBSTRDLE1BQU0sR0FBRyxFQUFiOztBQUFpQixPQUFLLElBQUkvSixDQUFULElBQWNOLEdBQWQsRUFBbUI7QUFBRSxRQUFJeUgsSUFBSSxDQUFDNkMsT0FBTCxDQUFhaEssQ0FBYixLQUFtQixDQUF2QixFQUEwQjtBQUFVLFFBQUksQ0FBQ2pELE1BQU0sQ0FBQ2tOLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDOUcsSUFBaEMsQ0FBcUMxRCxHQUFyQyxFQUEwQ00sQ0FBMUMsQ0FBTCxFQUFtRDtBQUFVK0osVUFBTSxDQUFDL0osQ0FBRCxDQUFOLEdBQVlOLEdBQUcsQ0FBQ00sQ0FBRCxDQUFmO0FBQXFCOztBQUFDLFNBQU8rSixNQUFQO0FBQWdCOztBQUU1TixTQUFTSSxxQkFBVCxDQUErQkMsUUFBL0IsRUFBeUM7QUFDdkMsU0FBTyxVQUFVOUksSUFBVixFQUFnQjtBQUNyQixRQUFJK0ksTUFBTSxHQUFHL0ksSUFBSSxDQUFDK0ksTUFBbEI7QUFBQSxRQUNJQyxhQUFhLEdBQUdoSixJQUFJLENBQUNnSixhQUR6QjtBQUFBLFFBRUlDLElBQUksR0FBR1Qsd0JBQXdCLENBQUN4SSxJQUFELEVBQU8sQ0FBQyxRQUFELEVBQVcsZUFBWCxDQUFQLENBRm5DOztBQUlBLFFBQUkrSSxNQUFKLEVBQVk7QUFDVkQsY0FBUSxDQUFDQyxNQUFELENBQVI7QUFDRCxLQUZELE1BRU8sSUFBSUMsYUFBSixFQUFtQjtBQUN4QkYsY0FBUSxDQUFDRSxhQUFhLENBQUNDLElBQUQsQ0FBZCxDQUFSO0FBQ0QsS0FGTSxNQUVBO0FBQ0wsWUFBTSxJQUFJM00sS0FBSixDQUFVLHNEQUFWLENBQU47QUFDRDtBQUNGLEdBWkQ7QUFhRDs7QUFFRCxTQUFTaU0sb0JBQVQsQ0FBOEJXLFFBQTlCLEVBQXdDO0FBQ3RDLFNBQU8sVUFBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUM7QUFDdEMsUUFBSWxMLFNBQVMsR0FBR2dMLFFBQVEsQ0FBQ0UsWUFBRCxDQUF4QjtBQUFBLFFBQ0lqTCxVQUFVLEdBQUdxSSxjQUFjLENBQUN0SSxTQUFELEVBQVksQ0FBWixDQUQvQjtBQUFBLFFBRUltTCxLQUFLLEdBQUdsTCxVQUFVLENBQUMsQ0FBRCxDQUZ0QjtBQUFBLFFBR0ltTCxRQUFRLEdBQUduTCxVQUFVLENBQUMsQ0FBRCxDQUh6QjtBQUFBLFFBSUlvTCxRQUFRLEdBQUdwTCxVQUFVLENBQUMsQ0FBRCxDQUp6Qjs7QUFNQSxRQUFJMkssUUFBUSxHQUFHLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0FBQ3ZDLGFBQU9PLFFBQVEsQ0FBQ0gsT0FBTyxDQUFDSSxRQUFRLEVBQVQsRUFBYVIsTUFBYixDQUFSLENBQWY7QUFDRCxLQUZEOztBQUlBLFdBQU8sQ0FBQ00sS0FBRCxFQUFRUCxRQUFSLEVBQWtCRCxxQkFBcUIsQ0FBQ0MsUUFBRCxDQUF2QyxFQUFtRDtBQUMxRCxnQkFBWTtBQUNWLGFBQU9TLFFBQVEsRUFBZjtBQUNELEtBSE0sQ0FHTDtBQUhLLEtBQVA7QUFLRCxHQWhCRDtBQWlCRCxDOzs7Ozs7Ozs7Ozs7QUM5Q1k7O0FBRWI5TixNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7QUFHQUQsT0FBTyxDQUFDNkIsT0FBUixHQUFrQmdNLGtCQUFsQjs7QUFFQSxJQUFJNUUsbUJBQW1CLEdBQUdqSCxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUlrSCxvQkFBb0IsR0FBR2hILHNCQUFzQixDQUFDK0csbUJBQUQsQ0FBakQ7O0FBRUEsU0FBUy9HLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLElBQUlxTCxPQUFPLEdBQUc7QUFDWkMsVUFBUSxFQUFFLEVBREU7QUFFWkMsS0FBRyxFQUFFLFNBQVNBLEdBQVQsQ0FBYTdJLE9BQWIsRUFBc0I7QUFDekIsUUFBSSxLQUFLNEksUUFBTCxDQUFjNUksT0FBTyxDQUFDbkUsRUFBdEIsQ0FBSixFQUErQjtBQUM3QixhQUFPLEtBQUsrTSxRQUFMLENBQWM1SSxPQUFPLENBQUNuRSxFQUF0QixDQUFQO0FBQ0Q7O0FBQ0QsV0FBTyxLQUFLK00sUUFBTCxDQUFjNUksT0FBTyxDQUFDbkUsRUFBdEIsSUFBNEI7QUFBRWlOLFlBQU0sRUFBRSxFQUFWO0FBQWNDLGNBQVEsRUFBRTtBQUF4QixLQUFuQztBQUNELEdBUFc7QUFRWkMsU0FBTyxFQUFFLFNBQVNBLE9BQVQsQ0FBaUJuTixFQUFqQixFQUFxQjtBQUM1QixRQUFJLEtBQUsrTSxRQUFMLENBQWMvTSxFQUFkLENBQUosRUFBdUI7QUFDckIsYUFBTyxLQUFLK00sUUFBTCxDQUFjL00sRUFBZCxDQUFQO0FBQ0Q7QUFDRjtBQVpXLENBQWQ7QUFhRzs7QUFDSCxTQUFTNk0sa0JBQVQsQ0FBNEJ6RSxTQUE1QixFQUF1QztBQUNyQ0EsV0FBUyxDQUFDbEMsWUFBVixDQUF1QixVQUFVekMsSUFBVixFQUFnQjtBQUNyQyxXQUFPcUosT0FBTyxDQUFDSyxPQUFSLENBQWdCMUosSUFBSSxDQUFDVSxPQUFMLENBQWFuRSxFQUE3QixDQUFQO0FBQ0QsR0FGRDtBQUdBLFNBQU8sVUFBVXlNLFlBQVYsRUFBd0I7QUFDN0IsS0FBQyxHQUFHdkUsb0JBQW9CLENBQUNySCxPQUF6QixFQUFrQ3VILFNBQWxDO0FBRUEsUUFBSTNFLElBQUksR0FBRzJFLFNBQVMsQ0FBQzNFLElBQVYsRUFBWDtBQUNBLFFBQUlVLE9BQU8sR0FBR1YsSUFBSSxDQUFDVSxPQUFuQjtBQUVBLFFBQUlpSixPQUFPLEdBQUdOLE9BQU8sQ0FBQ0UsR0FBUixDQUFZN0ksT0FBWixDQUFkO0FBRUEsUUFBSWtKLEtBQUssR0FBRyxLQUFLLENBQWpCLENBUjZCLENBVTdCOztBQUNBLFFBQUlsSixPQUFPLENBQUNqRSxJQUFSLE9BQW1CLENBQXZCLEVBQTBCO0FBQ3hCa04sYUFBTyxDQUFDSCxNQUFSLENBQWUvSCxJQUFmLENBQW9CdUgsWUFBcEI7QUFDQVksV0FBSyxHQUFHRCxPQUFPLENBQUNILE1BQVIsQ0FBZTdNLE1BQWYsR0FBd0IsQ0FBaEMsQ0FGd0IsQ0FJeEI7QUFDRCxLQUxELE1BS087QUFDTGlOLFdBQUssR0FBR0QsT0FBTyxDQUFDRixRQUFoQjtBQUNBRSxhQUFPLENBQUNGLFFBQVIsR0FBbUJHLEtBQUssR0FBR0QsT0FBTyxDQUFDSCxNQUFSLENBQWU3TSxNQUFmLEdBQXdCLENBQWhDLEdBQW9DZ04sT0FBTyxDQUFDRixRQUFSLEdBQW1CLENBQXZELEdBQTJELENBQTlFO0FBQ0Q7O0FBRUQsV0FBTyxDQUFDRSxPQUFPLENBQUNILE1BQVIsQ0FBZUksS0FBZixDQUFELEVBQXdCLFVBQVVDLFFBQVYsRUFBb0I7QUFDakRGLGFBQU8sQ0FBQ0gsTUFBUixDQUFlSSxLQUFmLElBQXdCQyxRQUF4Qjs7QUFDQSxVQUFJLENBQUNuSixPQUFPLENBQUMxRCxTQUFSLEVBQUwsRUFBMEI7QUFDeEJnRCxZQUFJLENBQUNXLEtBQUw7QUFDRDs7QUFDRCxhQUFPa0osUUFBUDtBQUNELEtBTk0sRUFNSixZQUFZO0FBQ2IsYUFBT0YsT0FBTyxDQUFDSCxNQUFSLENBQWVJLEtBQWYsQ0FBUDtBQUNELEtBUk0sQ0FBUDtBQVNELEdBOUJEO0FBK0JEOztBQUVEUixrQkFBa0IsQ0FBQ3hHLEtBQW5CLEdBQTJCLFlBQVk7QUFDckN5RyxTQUFPLENBQUNDLFFBQVIsR0FBbUIsRUFBbkI7QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7OztBQ2hFYTs7QUFFYmpPLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCME0sa0JBQWxCOztBQUNBLFNBQVNBLGtCQUFULENBQTRCbkYsU0FBNUIsRUFBdUM7QUFDckMsTUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2QsVUFBTSxJQUFJekksS0FBSixDQUFVLDZGQUFWLENBQU47QUFDRDs7QUFDRCxNQUFJLENBQUN5SSxTQUFTLENBQUMzRSxJQUFWLEVBQUwsRUFBdUI7QUFDckIsVUFBTSxJQUFJOUQsS0FBSixDQUFVLDBEQUFWLENBQU47QUFDRDtBQUNGOztBQUFBLEM7Ozs7Ozs7Ozs7OztBQ2JZOztBQUViYixNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7QUFHQUQsT0FBTyxDQUFDd08sY0FBUixHQUF5QkEsY0FBekI7O0FBRUEsSUFBSUMsVUFBVSxHQUFHek0sbUJBQU8sQ0FBQywyQ0FBRCxDQUF4Qjs7QUFFQSxJQUFJME0sV0FBVyxHQUFHeE0sc0JBQXNCLENBQUN1TSxVQUFELENBQXhDOztBQUVBLElBQUkxTSxlQUFlLEdBQUdDLG1CQUFPLENBQUMsaUVBQUQsQ0FBN0I7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUdDLHNCQUFzQixDQUFDSCxlQUFELENBQTdDOztBQUVBLElBQUk0TSxXQUFXLEdBQUczTSxtQkFBTyxDQUFDLDZDQUFELENBQXpCOztBQUVBLElBQUk0TSxZQUFZLEdBQUcxTSxzQkFBc0IsQ0FBQ3lNLFdBQUQsQ0FBekM7O0FBRUEsSUFBSTdDLFlBQVksR0FBRzlKLG1CQUFPLENBQUMsMkRBQUQsQ0FBMUI7O0FBRUEsSUFBSStKLGFBQWEsR0FBRzdKLHNCQUFzQixDQUFDNEosWUFBRCxDQUExQzs7QUFFQSxJQUFJK0MsV0FBVyxHQUFHN00sbUJBQU8sQ0FBQyx5REFBRCxDQUF6Qjs7QUFFQSxJQUFJOE0sWUFBWSxHQUFHNU0sc0JBQXNCLENBQUMyTSxXQUFELENBQXpDOztBQUVBLElBQUlFLFdBQVcsR0FBRy9NLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsSUFBSWdOLFlBQVksR0FBRzlNLHNCQUFzQixDQUFDNk0sV0FBRCxDQUF6Qzs7QUFFQSxJQUFJMU0sVUFBVSxHQUFHTCxtQkFBTyxDQUFDLHVEQUFELENBQXhCOztBQUVBLElBQUlNLFdBQVcsR0FBR0osc0JBQXNCLENBQUNHLFVBQUQsQ0FBeEM7O0FBRUEsSUFBSUUsU0FBUyxHQUFHUCxtQkFBTyxDQUFDLHFEQUFELENBQXZCOztBQUVBLElBQUlRLFVBQVUsR0FBR04sc0JBQXNCLENBQUNLLFNBQUQsQ0FBdkM7O0FBRUEsSUFBSTBNLFdBQVcsR0FBR2pOLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsSUFBSWtOLFlBQVksR0FBR2hOLHNCQUFzQixDQUFDK00sV0FBRCxDQUF6Qzs7QUFFQSxTQUFTL00sc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsU0FBUytMLGNBQVQsR0FBMEI7QUFDeEIsTUFBSXBGLFNBQVMsR0FBRyxDQUFDLEdBQUdzRixXQUFXLENBQUM3TSxPQUFoQixHQUFoQjs7QUFFQSxXQUFTc04sQ0FBVCxDQUFXaFAsSUFBWCxFQUFpQk0sS0FBakIsRUFBd0I7QUFDdEIsU0FBSyxJQUFJNkwsSUFBSSxHQUFHbkwsU0FBUyxDQUFDQyxNQUFyQixFQUE2QlYsUUFBUSxHQUFHbUMsS0FBSyxDQUFDeUosSUFBSSxHQUFHLENBQVAsR0FBV0EsSUFBSSxHQUFHLENBQWxCLEdBQXNCLENBQXZCLENBQTdDLEVBQXdFRSxJQUFJLEdBQUcsQ0FBcEYsRUFBdUZBLElBQUksR0FBR0YsSUFBOUYsRUFBb0dFLElBQUksRUFBeEcsRUFBNEc7QUFDMUc5TCxjQUFRLENBQUM4TCxJQUFJLEdBQUcsQ0FBUixDQUFSLEdBQXFCckwsU0FBUyxDQUFDcUwsSUFBRCxDQUE5QjtBQUNEOztBQUVELFdBQU8sQ0FBQyxHQUFHb0MsWUFBWSxDQUFDL00sT0FBakIsRUFBMEIxQixJQUExQixFQUFnQ00sS0FBaEMsRUFBdUNDLFFBQXZDLENBQVA7QUFDRDs7QUFDRCxXQUFTZ0csR0FBVCxDQUFhdkIsT0FBYixFQUFzQjtBQUNwQixRQUFJLENBQUMsQ0FBQyxHQUFHbEQsZ0JBQWdCLENBQUNKLE9BQXJCLEVBQThCc0QsT0FBOUIsQ0FBTCxFQUE2QztBQUMzQyxZQUFNLElBQUl4RSxLQUFKLENBQVUscUNBQXFDd0UsT0FBTyxDQUFDNUUsUUFBUixFQUFyQyxHQUEwRCxVQUFwRSxDQUFOO0FBQ0Q7O0FBQ0QsV0FBTzZJLFNBQVMsQ0FBQzFDLEdBQVYsQ0FBY3ZCLE9BQWQsQ0FBUDtBQUNEOztBQUNELE1BQUlpSyxRQUFRLEdBQUcsU0FBU0EsUUFBVCxHQUFvQixDQUFFLENBQXJDOztBQUNBLE1BQUl4RCxXQUFXLEdBQUcsQ0FBQyxHQUFHRyxhQUFhLENBQUNsSyxPQUFsQixFQUEyQnVILFNBQTNCLENBQWxCO0FBQ0EsTUFBSWlHLFVBQVUsR0FBRyxDQUFDLEdBQUdQLFlBQVksQ0FBQ2pOLE9BQWpCLEVBQTBCdUgsU0FBMUIsQ0FBakI7QUFDQSxNQUFJbUUsUUFBUSxHQUFHLENBQUMsR0FBRy9LLFVBQVUsQ0FBQ1gsT0FBZixFQUF3QnVILFNBQXhCLENBQWY7QUFDQSxNQUFJa0csVUFBVSxHQUFHLENBQUMsR0FBR04sWUFBWSxDQUFDbk4sT0FBakIsRUFBMEJ1SCxTQUExQixFQUFxQ21FLFFBQXJDLENBQWpCO0FBQ0EsTUFBSWdDLFNBQVMsR0FBRyxDQUFDLEdBQUdqTixXQUFXLENBQUNULE9BQWhCLEVBQXlCdUgsU0FBekIsRUFBb0N3QyxXQUFwQyxDQUFoQjtBQUNBLE1BQUk0RCxVQUFVLEdBQUcsQ0FBQyxHQUFHTixZQUFZLENBQUNyTixPQUFqQixFQUEwQjBMLFFBQTFCLENBQWpCO0FBRUEsU0FBTztBQUNMNEIsS0FBQyxFQUFFQSxDQURFO0FBRUx6SSxPQUFHLEVBQUVBLEdBRkE7QUFHTDBJLFlBQVEsRUFBRUEsUUFITDtBQUlMaEcsYUFBUyxFQUFFQSxTQUpOO0FBS0x3QyxlQUFXLEVBQUVBLFdBTFI7QUFNTHlELGNBQVUsRUFBRUEsVUFOUDtBQU9MQyxjQUFVLEVBQUVBLFVBUFA7QUFRTEMsYUFBUyxFQUFFQSxTQVJOO0FBU0xoQyxZQUFRLEVBQUVBLFFBVEw7QUFVTGlDLGNBQVUsRUFBRUE7QUFWUCxHQUFQO0FBWUQ7O0FBRUQsSUFBSUMsUUFBUSxHQUFHakIsY0FBYyxFQUE3QjtBQUVBa0IsTUFBTSxDQUFDMVAsT0FBUCxHQUFpQnlQLFFBQWpCO0FBQ0FDLE1BQU0sQ0FBQzFQLE9BQVAsQ0FBZXdPLGNBQWYsR0FBZ0NBLGNBQWMsRUFBOUMsQzs7Ozs7Ozs7Ozs7O0FDdEZhOztBQUViMU8sTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDO0FBR0FELE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0I4TixjQUFsQjs7QUFDQSxTQUFTQSxjQUFULENBQXdCeEssT0FBeEIsRUFBaUM7QUFDL0IsU0FBT0EsT0FBTyxJQUFJQSxPQUFPLENBQUN2RSxPQUFSLEtBQW9CLElBQXRDO0FBQ0Q7O0FBQUEsQzs7Ozs7Ozs7Ozs7O0FDUlk7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixXQUFXO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLFdBQVc7QUFDL0I7O0FBRUEsb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDdERBO0FBQ0E7QUFDQTs7QUFFQSxpQzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0EsaURBQWlELGdCQUFnQjtBQUNqRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlDOzs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLCtCQUErQjtBQUM1RTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1Qzs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBOztBQUVBLGtDOzs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTs7QUFFQSxvQzs7Ozs7Ozs7Ozs7QUNKQSxxQkFBcUIsbUJBQU8sQ0FBQyxpRkFBa0I7O0FBRS9DO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdDOzs7Ozs7Ozs7OztBQ3pCQSxxQkFBcUIsbUJBQU8sQ0FBQyxpRkFBa0I7O0FBRS9DLDJCQUEyQixtQkFBTyxDQUFDLDZGQUF3Qjs7QUFFM0Qsc0JBQXNCLG1CQUFPLENBQUMsbUZBQW1COztBQUVqRDtBQUNBO0FBQ0E7O0FBRUEsZ0M7Ozs7Ozs7Ozs7O0FDVkEsd0JBQXdCLG1CQUFPLENBQUMsdUZBQXFCOztBQUVyRCxzQkFBc0IsbUJBQU8sQ0FBQyxtRkFBbUI7O0FBRWpELHdCQUF3QixtQkFBTyxDQUFDLHVGQUFxQjs7QUFFckQ7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxLQUFLO0FBQ0wsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLGtCQUFrQjtBQUNuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNB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RixDQVZGLEVBYUUsK0NBQUMsU0FBRDtBQUFXLFFBQUksRUFBR087QUFBbEIsS0FDRSwrQ0FBQyxRQUFEO0FBQVUsaUJBQWEsRUFBRztBQUFBLFVBQUd0RixPQUFILFNBQUdBLE9BQUg7QUFBQSxhQUFpQmlILFFBQVEsQ0FBQ2pILE9BQUQsQ0FBekI7QUFBQTtBQUExQixJQURGLENBYkYsQ0FERjtBQW1CRCxDOzs7Ozs7Ozs7Ozs7QUMzRkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTc0gsR0FBVCxHQUFlO0FBQ2IsU0FDRSwrQ0FBQyw2Q0FBRCxRQUNFLCtDQUFDLGlEQUFELE9BREYsRUFFRSwrQ0FBQywrQ0FBRDtBQUFRLFdBQU8sRUFBQztBQUFoQixJQUZGLEVBR0UsK0NBQUMsOENBQUQ7QUFBTyxXQUFPLEVBQUM7QUFBZixLQUNFLCtDQUFDLGlEQUFEO0FBQVUsVUFBTSxNQUFoQjtBQUFpQixXQUFPO0FBQXhCLElBREYsRUFFRSwrQ0FBQywwREFBRDtBQUFtQixVQUFNO0FBQXpCLElBRkYsRUFHRSwrQ0FBQyxvREFBRDtBQUFpQixVQUFNO0FBQXZCLElBSEYsQ0FIRixDQURGO0FBV0Q7O0FBQUE7QUFFRDVNLGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuICB2YXIgcmVzdWx0ID0gL15mdW5jdGlvblxccysoW1xcd1xcJF0rKVxccypcXCgvLmV4ZWMoZnVuYy50b1N0cmluZygpKTtcblxuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0WzFdIDogJ3Vua25vd24nO1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uLiBcIicgKyBmdW5jICsgJ1wiIGdpdmVuIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIF9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTogdHJ1ZSxcbiAgICBpZDogbnVsbCxcbiAgICBwcm9wczogcHJvcHMsXG4gICAgbmFtZTogZ2V0RnVuY05hbWUoZnVuYyksXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoaWQpIHtcbiAgICAgIHZhciB1c2VkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICB0aGlzLl9fdXNlZCA9IHVzZWQ7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB0cnVlO1xuICAgIH0sXG4gICAgbWVyZ2VQcm9wczogZnVuY3Rpb24gbWVyZ2VQcm9wcyhuZXdQcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICB9LFxuICAgIHVzZWQ6IGZ1bmN0aW9uIHVzZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3VzZWQ7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcnVubmluZztcbiAgICB9LFxuICAgIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHk6IGZ1bmN0aW9uIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5ID0gdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IHRydWU7XG4gICAgICB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSA9IHRydWU7XG5cbiAgICAgIHJldHVybiBmdW5jKHRoaXMucHJvcHMpO1xuICAgIH0sXG4gICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICB0aGlzLl9fdXNlZCArPSAxO1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVFbGVtZW50OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVByb2Nlc3NvcjtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfVHJlZSA9IHJlcXVpcmUoJy4vVHJlZScpO1xuXG52YXIgX1RyZWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVHJlZSk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgZnVuY3Rpb24gc3RlcChrZXksIGFyZykgeyB0cnkgeyB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7IHZhciB2YWx1ZSA9IGluZm8udmFsdWU7IH0gY2F0Y2ggKGVycm9yKSB7IHJlamVjdChlcnJvcik7IHJldHVybjsgfSBpZiAoaW5mby5kb25lKSB7IHJlc29sdmUodmFsdWUpOyB9IGVsc2UgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgc3RlcChcInRocm93XCIsIGVycik7IH0pOyB9IH0gcmV0dXJuIHN0ZXAoXCJuZXh0XCIpOyB9KTsgfTsgfSAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuXG5cbi8vIGltcG9ydCBpbml0aWFsaXplSG9va3MgZnJvbSAnLi9ob29rcyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2Nlc3NvcigpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgdHJlZSA9ICgwLCBfVHJlZTIuZGVmYXVsdCkoKTtcbiAgdmFyIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICB2YXIgcHJvY2Vzc05vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKG5vZGUsIHN0YWNrKSB7XG4gICAgICB2YXIgcmVzdWx0LCBnZW5SZXN1bHQsIHRvR2VuVmFsdWU7XG4gICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgIHN0YWNrID0gW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShzdGFjayksIFtub2RlLmVsZW1lbnRdKTtcbiAgICAgICAgICAgICAgbm9kZS5lbnRlcihzdGFjayk7XG4gICAgICAgICAgICAgIG5vZGUucmVydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUsIHN0YWNrKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgbm9kZS5jYWxsQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWYyID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuUmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICAgICAgX2NoaWxkcmVuJGksXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY1Jlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICBfYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IG5vZGUuZWxlbWVudC5jaGlsZHJlbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBjaGlsZHJlbi5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAoX2NoaWxkcmVuJGkgPSBjaGlsZHJlbltpXSkubWVyZ2VQcm9wcy5hcHBseShfY2hpbGRyZW4kaSwgX2FyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC50MCA9IGNoaWxkcmVuUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjaGlsZHJlbltpXSksIHN0YWNrKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDEgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQwLnB1c2guY2FsbChfY29udGV4dC50MCwgX2NvbnRleHQudDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGVvZiBjaGlsZHJlbltpXSA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbltpXS5hcHBseShjaGlsZHJlbiwgX2FyZ3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jUmVzdWx0ID0gX2NvbnRleHQuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDIgPSBjaGlsZHJlblJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDIyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZnVuY1Jlc3VsdCksIHN0YWNrKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDMgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQyLnB1c2guY2FsbChfY29udGV4dC50MiwgX2NvbnRleHQudDMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuUmVzdWx0LnB1c2goZnVuY1Jlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KCdyZXR1cm4nLCBjaGlsZHJlblJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzE6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZSwgX3RoaXMpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgLy8gYWN0dWFsIGNhbGwgb2YgdGhlIEFjdE1MIGVsZW1lbnRcbiAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZS5lbGVtZW50LmVudGVyKCk7XG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IHZvaWQgMCwgdG9HZW5WYWx1ZSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgICAvLyBoYW5kbGluZyBhIHByb21pc2VcblxuICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgJiYgcmVzdWx0LnRoZW4pKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAxMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IF9jb250ZXh0Mi5zZW50O1xuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM2O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQubmV4dCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDMyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZ2VuUmVzdWx0ID0gcmVzdWx0Lm5leHQoKTtcblxuICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgaWYgKGdlblJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE5O1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSwgc3RhY2spO1xuXG4gICAgICAgICAgICBjYXNlIDE5OlxuICAgICAgICAgICAgICB0b0dlblZhbHVlID0gX2NvbnRleHQyLnNlbnQ7XG5cbiAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IHJlc3VsdC5uZXh0KHRvR2VuVmFsdWUpO1xuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE1O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAyMzpcbiAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyOTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjY7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpLCBzdGFjayk7XG5cbiAgICAgICAgICAgIGNhc2UgMjY6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IF9jb250ZXh0Mi5zZW50O1xuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDMwO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAyOTpcbiAgICAgICAgICAgICAgcmVzdWx0ID0gZ2VuUmVzdWx0LnZhbHVlO1xuXG4gICAgICAgICAgICBjYXNlIDMwOlxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM2O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzNjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzU7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShyZXN1bHQpLCBzdGFjayk7XG5cbiAgICAgICAgICAgIGNhc2UgMzU6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IF9jb250ZXh0Mi5zZW50O1xuXG4gICAgICAgICAgICBjYXNlIDM2OlxuICAgICAgICAgICAgICBpZiAoIW5vZGUuZWxlbWVudC5zaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5KCkpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzOTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuY2FsbENoaWxkcmVuKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMzk6XG5cbiAgICAgICAgICAgICAgbm9kZS5lbGVtZW50Lm91dCgpO1xuICAgICAgICAgICAgICBub2RlLm91dCgpO1xuICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoJ3JldHVybicsIHJlc3VsdCk7XG5cbiAgICAgICAgICAgIGNhc2UgNDM6XG4gICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIF9jYWxsZWUyLCBfdGhpcyk7XG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHByb2Nlc3NOb2RlKF94LCBfeDIpIHtcbiAgICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHJldHVybiB7XG4gICAgbm9kZTogZnVuY3Rpb24gbm9kZSgpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9LFxuICAgIHJ1bjogZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICAgIHZhciByZXNvbHZlZFJvb3ROb2RlID0gdHJlZS5yZXNvbHZlUm9vdChlbGVtZW50KTtcblxuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKHJlc29sdmVkUm9vdE5vZGUsIFtdKTtcbiAgICB9LFxuICAgIG9uTm9kZUVudGVyOiBmdW5jdGlvbiBvbk5vZGVFbnRlcihjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVPdXQ6IGZ1bmN0aW9uIG9uTm9kZU91dChjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUub25Ob2RlUmVtb3ZlKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIHN5c3RlbTogZnVuY3Rpb24gc3lzdGVtKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJlZTogdHJlZSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgIHRyZWUucmVzZXQoKTtcbiAgICAgICAgICBfdXNlUHViU3ViMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgICAgX3VzZVN0YXRlMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBUcmVlO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwgPSByZXF1aXJlKCdmYXN0LWRlZXAtZXF1YWwnKTtcblxudmFyIF9mYXN0RGVlcEVxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zhc3REZWVwRXF1YWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBUcmVlKCkge1xuICB2YXIgb25Ob2RlRW50ZXIgPSBbXTtcbiAgdmFyIG9uTm9kZU91dCA9IFtdO1xuICB2YXIgX29uTm9kZVJlbW92ZSA9IFtdO1xuICB2YXIgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgdmFyIGlkcyA9IDA7XG5cbiAgZnVuY3Rpb24gZ2V0SWQoKSB7XG4gICAgcmV0dXJuICdhJyArICsraWRzO1xuICB9O1xuICBmdW5jdGlvbiB1c2VTYW1lTm9kZShub2RlLCBuZXdFbGVtZW50KSB7XG4gICAgbmV3RWxlbWVudC5pbml0aWFsaXplKG5vZGUuZWxlbWVudC5pZCwgbm9kZS5lbGVtZW50LnVzZWQoKSk7XG4gICAgbm9kZS5lbGVtZW50ID0gbmV3RWxlbWVudDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBmdW5jdGlvbiB0cmVlRGlmZihvbGRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgaWYgKG9sZEVsZW1lbnQgJiYgb2xkRWxlbWVudC5uYW1lID09PSBuZXdFbGVtZW50Lm5hbWUpIHtcbiAgICAgIHJldHVybiAoMCwgX2Zhc3REZWVwRXF1YWwyLmRlZmF1bHQpKG9sZEVsZW1lbnQucHJvcHMsIG5ld0VsZW1lbnQucHJvcHMpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlTmV3Tm9kZShlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuaW5pdGlhbGl6ZShnZXRJZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBzdGFjazogW10sXG4gICAgICBjdXJzb3I6IDAsXG4gICAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoc3RhY2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB0aGlzLnN0YWNrID0gc3RhY2s7XG4gICAgICAgIG9uTm9kZUVudGVyLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyhfdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAvLyBJZiB0aGVyZSdyZSBtb3JlIG5vZGVzIGluIHRoZSB0cmVlIHRoYW4gd2hhdCB3YXMgcHJvY2Vzc2VkXG4gICAgICAgIGlmICh0aGlzLmN1cnNvciA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5jdXJzb3IpLmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZWROb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjKHJlbW92ZWROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Vyc29yID0gMDtcbiAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuICAgICAgICBvbk5vZGVPdXQuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGFkZENoaWxkTm9kZTogZnVuY3Rpb24gYWRkQ2hpbGROb2RlKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdO1xuXG4gICAgICAgIC8vIHVzaW5nIHRoZSBzYW1lIG5vZGVcbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiB0cmVlRGlmZihjaGlsZE5vZGUuZWxlbWVudCwgbmV3RWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICAgIHJldHVybiB1c2VTYW1lTm9kZShjaGlsZE5vZGUsIG5ld0VsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRpbmcgYSBuZXcgbm9kZVxuICAgICAgICB2YXIgbmV3Q2hpbGROb2RlID0gY3JlYXRlTmV3Tm9kZShuZXdFbGVtZW50KTtcblxuICAgICAgICBpZiAodGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl0pIHtcbiAgICAgICAgICBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiBjKF90aGlzMy5jaGlsZHJlbltfdGhpczMuY3Vyc29yXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl0gPSBuZXdDaGlsZE5vZGU7XG4gICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgIHJldHVybiBuZXdDaGlsZE5vZGU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZVJvb3Q6IGZ1bmN0aW9uIHJlc29sdmVSb290KGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiByb290ID0gdHJlZURpZmYocm9vdC5lbGVtZW50LCBlbGVtZW50KSA/IHVzZVNhbWVOb2RlKHJvb3QsIGVsZW1lbnQpIDogY3JlYXRlTmV3Tm9kZShlbGVtZW50KTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHJvb3QgPSBjcmVhdGVOZXdOb2RlKCk7XG4gICAgICBpZHMgPSAwO1xuICAgIH0sXG4gICAgZ2V0TnVtT2ZFbGVtZW50czogZnVuY3Rpb24gZ2V0TnVtT2ZFbGVtZW50cygpIHtcbiAgICAgIHJldHVybiBpZHM7XG4gICAgfSxcbiAgICBkaWFnbm9zZTogZnVuY3Rpb24gZGlhZ25vc2UoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gbG9vcE92ZXIobm9kZSkge1xuICAgICAgICB2YXIgaW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5vZGUuZWxlbWVudC5uYW1lLCBub2RlLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kOiBpbmQsXG4gICAgICAgICAgbmFtZTogbm9kZS5lbGVtZW50Lm5hbWUsXG4gICAgICAgICAgdXNlZDogbm9kZS5lbGVtZW50LnVzZWQoKSxcbiAgICAgICAgICBpZDogbm9kZS5lbGVtZW50LmlkLFxuICAgICAgICAgIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb29wT3ZlcihjaGlsZCwgaW5kICsgMSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgIH0ocm9vdCk7XG4gICAgfSxcbiAgICBhZGROb2RlRW50ZXJDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIG9uTm9kZUVudGVyLnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgYWRkTm9kZU91dENhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIG9uTm9kZU91dC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICBfb25Ob2RlUmVtb3ZlLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcbn0gLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIG5vLXJldHVybi1hc3NpZ24sIG1heC1sZW4gKi9cbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNyZWF0ZVVzZUNoaWxkcmVuSG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUNoaWxkcmVuSG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgIG5vZGUuZWxlbWVudC5zaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5KGZhbHNlKTtcbiAgICByZXR1cm4gW25vZGUuY2FsbENoaWxkcmVuLCBub2RlLmVsZW1lbnQuY2hpbGRyZW5dO1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlQ2hpbGRyZW5Ib29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHJldHVybiBwcm9jZXNzb3Iubm9kZSgpLmVsZW1lbnQ7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH0gLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuXG5cbnZhciByZXNvbHZlUHJvZHVjdCA9IGZ1bmN0aW9uIHJlc29sdmVQcm9kdWN0KHByb3AsIHN0YWNrSW5kZXgsIHN0YWNrLCBlcnJvcikge1xuICBpZiAoc3RhY2tJbmRleCA8IDApIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuICB2YXIgcGFyZW50ID0gc3RhY2tbc3RhY2tJbmRleF07XG4gIHZhciBwcm9kdWN0ID0gcGFyZW50LnJlcXVlc3RQcm9kdWN0ID8gcGFyZW50LnJlcXVlc3RQcm9kdWN0KHByb3ApIDogbnVsbDtcblxuICBpZiAocHJvZHVjdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBwcm9kdWN0LnZhbHVlO1xuICB9XG4gIHJldHVybiByZXNvbHZlUHJvZHVjdChwcm9wLCBzdGFja0luZGV4IC0gMSwgc3RhY2ssIGVycm9yKTtcbn07XG5cbnZhciBjcmVhdGVVc2VQcm9kdWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZVByb2R1Y3RIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlRW50ZXIoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudCxcbiAgICAgICAgc3RhY2sgPSBub2RlLnN0YWNrO1xuICAgIHZhciBwcm9wcyA9IGVsZW1lbnQucHJvcHM7XG5cbiAgICB2YXIgcHJvcE5hbWVzID0gcHJvcHMgPyBPYmplY3Qua2V5cyhwcm9wcykgOiBbXTtcblxuICAgIHByb3BOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wTmFtZSkge1xuICAgICAgaWYgKHByb3BOYW1lLmNoYXJBdCgwKSA9PT0gJyQnKSB7XG4gICAgICAgIHZhciBrZXl3b3JkID0gcHJvcE5hbWUuc3Vic3RyKDEsIHByb3BOYW1lLmxlbmd0aCk7XG4gICAgICAgIHZhciBzdGFja1RvU2VhcmNoSW4gPSBub2RlLnN0YWNrLnNsaWNlKDAsIG5vZGUuc3RhY2subGVuZ3RoIC0gMSk7XG4gICAgICAgIHZhciBwcm9kdWN0VmFsdWUgPSByZXNvbHZlUHJvZHVjdChrZXl3b3JkLCBzdGFja1RvU2VhcmNoSW4ubGVuZ3RoIC0gMSwgc3RhY2tUb1NlYXJjaEluLCBuZXcgRXJyb3IoJ1wiJyArIGtleXdvcmQgKyAnXCIgcHJvcCByZXF1ZXN0ZWQgYnkgXCInICsgZWxlbWVudC5uYW1lICsgJ1wiIGNhbiBub3QgYmUgZm91bmQuXFxuXFxuU3RhY2s6XFxuJyArIHN0YWNrLm1hcChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICAgIHZhciBuYW1lID0gX3JlZi5uYW1lO1xuICAgICAgICAgIHJldHVybiAnICA8JyArIG5hbWUgKyAnPic7XG4gICAgICAgIH0pLmpvaW4oJ1xcbicpKSk7XG5cbiAgICAgICAgZWxlbWVudC5tZXJnZVByb3BzKF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5d29yZCwgcHJvZHVjdFZhbHVlKSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnZXhwb3J0cycpIHtcbiAgICAgICAgZWxlbWVudC5yZXF1ZXN0UHJvZHVjdCA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG4gICAgICAgICAgaWYgKHByb3BzICYmIHByb3BzLmV4cG9ydHMgJiYgcHJvcHMuZXhwb3J0cyA9PT0ga2V5d29yZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG5vZGUuX19wcm9kdWN0IH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgbm9kZS5fX3Byb2R1Y3QgPSB2YWx1ZTtcbiAgICByZXR1cm4gW2Z1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgcmV0dXJuIG5vZGUuX19wcm9kdWN0ID0gbmV3VmFsdWU7XG4gICAgfV07XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQcm9kdWN0SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHViU3ViSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3Vic2NyaWJlcnMgPSB7fTtcblxuZnVuY3Rpb24gY3JlYXRlU3Vic2NyaWJlRWxlbWVudChzdWJzY3JpYmUsIHVzZUNoaWxkcmVuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciB0eXBlID0gX3JlZi50eXBlO1xuXG4gICAgdmFyIF91c2VDaGlsZHJlbiA9IHVzZUNoaWxkcmVuKCksXG4gICAgICAgIF91c2VDaGlsZHJlbjIgPSBfc2xpY2VkVG9BcnJheShfdXNlQ2hpbGRyZW4sIDEpLFxuICAgICAgICBjaGlsZHJlbiA9IF91c2VDaGlsZHJlbjJbMF07XG5cbiAgICBzdWJzY3JpYmUodHlwZSwgZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlbih7IHBheWxvYWQ6IHBheWxvYWQgfSk7XG4gICAgfSk7XG4gIH07XG59O1xuZnVuY3Rpb24gY3JlYXRlUHVibGlzaEVsZW1lbnQocHVibGlzaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIHR5cGUgPSBfcmVmMi50eXBlLFxuICAgICAgICBwYXlsb2FkID0gX3JlZjIucGF5bG9hZDtcblxuICAgIHB1Ymxpc2godHlwZSwgcGF5bG9hZCk7XG4gIH07XG59XG5cbnZhciBzdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgc3Vic2NyaWJlcnNbdHlwZV0gPSB7fTtcbiAgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0gPSBjYWxsYmFjaztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF07XG4gIH07XG59O1xudmFyIHB1Ymxpc2ggPSBmdW5jdGlvbiBwdWJsaXNoKHR5cGUsIHBheWxvYWQpIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgcmV0dXJuO1xuICBPYmplY3Qua2V5cyhzdWJzY3JpYmVyc1t0eXBlXSkuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICBzdWJzY3JpYmVyc1t0eXBlXVtpZF0ocGF5bG9hZCk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVXNlUHViU3ViSG9vayhwcm9jZXNzb3IsIHVzZUNoaWxkcmVuKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgaWYgKHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF0pIHtcbiAgICAgICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlZEVsZW1lbnQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWwgPSBzY29wZWRFbGVtZW50IHx8IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgc3Vic2NyaWJlRnVuYyA9IGZ1bmN0aW9uIHN1YnNjcmliZUZ1bmMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YnNjcmliZS5hcHBseSh1bmRlZmluZWQsIFtlbF0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG4gICAgdmFyIHB1Ymxpc2hGdW5jID0gZnVuY3Rpb24gcHVibGlzaEZ1bmMoKSB7XG4gICAgICByZXR1cm4gcHVibGlzaC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZUZ1bmMsXG4gICAgICBwdWJsaXNoOiBwdWJsaXNoRnVuYyxcbiAgICAgIHN1YnNjcmliZXJzOiBzdWJzY3JpYmVycyxcbiAgICAgIFN1YnNjcmliZTogY3JlYXRlU3Vic2NyaWJlRWxlbWVudChzdWJzY3JpYmVGdW5jLCB1c2VDaGlsZHJlbiksXG4gICAgICBQdWJsaXNoOiBjcmVhdGVQdWJsaXNoRWxlbWVudChwdWJsaXNoRnVuYylcbiAgICB9O1xuICB9O1xufVxuXG5jcmVhdGVVc2VQdWJTdWJIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBzdWJzY3JpYmVycyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUmVkdWNlckhvb2s7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBhY3Rpb24gPSBfcmVmLmFjdGlvbixcbiAgICAgICAgcHJvcHNUb0FjdGlvbiA9IF9yZWYucHJvcHNUb0FjdGlvbixcbiAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2FjdGlvbicsICdwcm9wc1RvQWN0aW9uJ10pO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgZGlzcGF0Y2goYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHByb3BzVG9BY3Rpb24pIHtcbiAgICAgIGRpc3BhdGNoKHByb3BzVG9BY3Rpb24ocmVzdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJzxEaXNwYXRjaD4gZXhwZWN0cyBcImFjdGlvblwiIG9yIFwicHJvcHNUb0FjdGlvblwiIHByb3AuJyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVc2VSZWR1Y2VySG9vayh1c2VTdGF0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xuICAgIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShpbml0aWFsU3RhdGUpLFxuICAgICAgICBfdXNlU3RhdGUyID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAzKSxcbiAgICAgICAgc3RhdGUgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgICBzZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMV0sXG4gICAgICAgIGdldFN0YXRlID0gX3VzZVN0YXRlMlsyXTtcblxuICAgIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHNldFN0YXRlKHJlZHVjZXIoZ2V0U3RhdGUoKSwgYWN0aW9uKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoLCBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpLCAvLyA8RGlzcGF0Y2g+XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldFN0YXRlKCk7XG4gICAgfSAvLyA8R2V0U3RhdGU+XG4gICAgXTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VTdGF0ZUhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IHN0YXRlczogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0b3JhZ2Uuc3RhdGVzW2luZGV4XSwgZnVuY3Rpb24gKG5ld1N0YXRlKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlc1tpbmRleF0gPSBuZXdTdGF0ZTtcbiAgICAgIGlmICghZWxlbWVudC5pc1J1bm5pbmcoKSkge1xuICAgICAgICBub2RlLnJlcnVuKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XTtcbiAgICB9XTtcbiAgfTtcbn1cblxuY3JlYXRlVXNlU3RhdGVIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBTdG9yYWdlLmVsZW1lbnRzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVmFsaWRIb29rQ29udGV4dDtcbmZ1bmN0aW9uIGlzVmFsaWRIb29rQ29udGV4dChwcm9jZXNzb3IpIHtcbiAgaWYgKCFwcm9jZXNzb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB0ZXJyaWJseSB3cm9uZyBoYXBwZW5lZC4gVGhlIGhvb2sgZmFjdG9yeSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aG91dCBhIHByb2Nlc3Nvci4nKTtcbiAgfVxuICBpZiAoIXByb2Nlc3Nvci5ub2RlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvb2tzIG11c3QgYmUgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIGFuIEFjdE1MIGVsZW1lbnQuJyk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jcmVhdGVVbml2ZXJzZSA9IGNyZWF0ZVVuaXZlcnNlO1xuXG52YXIgX1Byb2Nlc3NvciA9IHJlcXVpcmUoJy4vUHJvY2Vzc29yJyk7XG5cbnZhciBfUHJvY2Vzc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Byb2Nlc3Nvcik7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX0FjdEVsZW1lbnQgPSByZXF1aXJlKCcuL0FjdEVsZW1lbnQnKTtcblxudmFyIF9BY3RFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdEVsZW1lbnQpO1xuXG52YXIgX3VzZUNoaWxkcmVuID0gcmVxdWlyZSgnLi9ob29rcy91c2VDaGlsZHJlbicpO1xuXG52YXIgX3VzZUNoaWxkcmVuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUNoaWxkcmVuKTtcblxudmFyIF91c2VFbGVtZW50ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFbGVtZW50Jyk7XG5cbnZhciBfdXNlRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VFbGVtZW50KTtcblxudmFyIF91c2VQcm9kdWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VQcm9kdWN0Jyk7XG5cbnZhciBfdXNlUHJvZHVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQcm9kdWN0KTtcblxudmFyIF91c2VQdWJTdWIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVB1YlN1YicpO1xuXG52YXIgX3VzZVB1YlN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQdWJTdWIpO1xuXG52YXIgX3VzZVN0YXRlID0gcmVxdWlyZSgnLi9ob29rcy91c2VTdGF0ZScpO1xuXG52YXIgX3VzZVN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVN0YXRlKTtcblxudmFyIF91c2VSZWR1Y2VyID0gcmVxdWlyZSgnLi9ob29rcy91c2VSZWR1Y2VyJyk7XG5cbnZhciBfdXNlUmVkdWNlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VSZWR1Y2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlVW5pdmVyc2UoKSB7XG4gIHZhciBwcm9jZXNzb3IgPSAoMCwgX1Byb2Nlc3NvcjIuZGVmYXVsdCkoKTtcblxuICBmdW5jdGlvbiBBKGZ1bmMsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgY2hpbGRyZW5bX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX0FjdEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmMsIHByb3BzLCBjaGlsZHJlbik7XG4gIH1cbiAgZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0ZWQuIEluc3RlYWQgJyArIGVsZW1lbnQudG9TdHJpbmcoKSArICcgcGFzc2VkLicpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvY2Vzc29yLnJ1bihlbGVtZW50KTtcbiAgfVxuICB2YXIgRnJhZ21lbnQgPSBmdW5jdGlvbiBGcmFnbWVudCgpIHt9O1xuICB2YXIgdXNlQ2hpbGRyZW4gPSAoMCwgX3VzZUNoaWxkcmVuMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlRWxlbWVudCA9ICgwLCBfdXNlRWxlbWVudDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVN0YXRlID0gKDAsIF91c2VTdGF0ZTIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVByb2R1Y3QgPSAoMCwgX3VzZVByb2R1Y3QyLmRlZmF1bHQpKHByb2Nlc3NvciwgdXNlU3RhdGUpO1xuICB2YXIgdXNlUHViU3ViID0gKDAsIF91c2VQdWJTdWIyLmRlZmF1bHQpKHByb2Nlc3NvciwgdXNlQ2hpbGRyZW4pO1xuICB2YXIgdXNlUmVkdWNlciA9ICgwLCBfdXNlUmVkdWNlcjIuZGVmYXVsdCkodXNlU3RhdGUpO1xuXG4gIHJldHVybiB7XG4gICAgQTogQSxcbiAgICBydW46IHJ1bixcbiAgICBGcmFnbWVudDogRnJhZ21lbnQsXG4gICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IsXG4gICAgdXNlQ2hpbGRyZW46IHVzZUNoaWxkcmVuLFxuICAgIHVzZUVsZW1lbnQ6IHVzZUVsZW1lbnQsXG4gICAgdXNlUHJvZHVjdDogdXNlUHJvZHVjdCxcbiAgICB1c2VQdWJTdWI6IHVzZVB1YlN1YixcbiAgICB1c2VTdGF0ZTogdXNlU3RhdGUsXG4gICAgdXNlUmVkdWNlcjogdXNlUmVkdWNlclxuICB9O1xufVxuXG52YXIgdW5pdmVyc2UgPSBjcmVhdGVVbml2ZXJzZSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXZlcnNlO1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlVW5pdmVyc2UgPSBjcmVhdGVVbml2ZXJzZSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNBY3RNTEVsZW1lbnQ7XG5mdW5jdGlvbiBpc0FjdE1MRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuX19hY3RtbCA9PT0gdHJ1ZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIga2V5TGlzdCA9IE9iamVjdC5rZXlzO1xudmFyIGhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IGlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IGlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBrZXlMaXN0KGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0ga2V5TGlzdChiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIWhhc1Byb3AuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBhIT09YSAmJiBiIT09Yjtcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgJSAyKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkMjsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGb2N1c0ZpZWxkIH0gZnJvbSAnLi9ET00nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDaGVja0ZvckVkaXRGaWVsZCh7IHRvZG9zIH0pIHtcbiAgcmV0dXJuIDxGb2N1c0ZpZWxkIGluZGV4PXsgdG9kb3MuZmluZEluZGV4KCh7IGVkaXRpbmcgfSkgPT4gZWRpdGluZykgfSAvPjtcbn1cbiIsImltcG9ydCB7IHVzZUNoaWxkcmVuIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHtcbiAgVE9HR0xFLFxuICBORVdfVE9ETyxcbiAgREVMRVRFLFxuICBFRElULFxuICBFRElUX1RPRE9cbn0gZnJvbSAnLi9TdG9yZSc7XG5cbmltcG9ydCB7XG4gIEZJTFRFUl9BTEwsXG4gIEZJTFRFUl9BQ1RJVkUsXG4gIEZJTFRFUl9DT01QTEVURURcbn0gZnJvbSAnLi9GaWx0ZXInO1xuXG5jb25zdCAkID0gKHNlbGVjdG9yKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbmNvbnN0IGxpc3QgPSAkKCcudG9kby1saXN0Jyk7XG5jb25zdCBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5cbmNvbnN0IEVOVEVSID0gMTM7XG5jb25zdCBFU0MgPSAyNztcblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxDb250YWluZXIoKSB7XG4gIGNvbnN0IFsgLCBjb250ZW50IF0gPSB1c2VDaGlsZHJlbigpO1xuXG4gIGxpc3QuaW5uZXJIVE1MID0gY29udGVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKFRPR0dMRSwgdG9kb0luZGV4KTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1kZWxldGUnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKERFTEVURSwgdG9kb0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihFRElUX1RPRE8sIHsgaW5kZXg6IHRvZG9JbmRleCwgbGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgIH1cbiAgfSk7XG4gIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSAmJiBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFU0MpIHtcbiAgICAgIG9uVXNlckFjdGlvbihFRElULCB0b2RvSW5kZXgpO1xuICAgIH1cbiAgfSk7XG4gIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1uZXcnKSAmJiBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICBvblVzZXJBY3Rpb24oTkVXX1RPRE8sIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgfVxuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBGb2N1c0ZpZWxkKHsgaW5kZXggfSkge1xuICBjb25zdCBlbCA9ICQoYC5lZGl0W2RhdGEtaW5kZXg9XCIkeyBpbmRleCB9XCJdYCk7XG5cbiAgaWYgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgICBlbC5zZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvbkVuZCA9IGVsLnZhbHVlLmxlbmd0aDtcbiAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBQcm9ncmVzc0NoZWNrZXIoeyB0b2RvcyB9KSB7XG4gIGNvbnN0IGNvbXBsZXRlZCA9IHRvZG9zLmZpbHRlcigoeyBjb21wbGV0ZWQgfSkgPT4gY29tcGxldGVkKS5sZW5ndGg7XG4gIGNvbnN0IGl0ZW1zTGVmdCA9IHRvZG9zLmxlbmd0aCAtIGNvbXBsZXRlZDtcblxuICAkKCdbZGF0YS1jb3VudF0nKS5pbm5lckhUTUwgPSBgXG4gICAgPHN0cm9uZz4keyBpdGVtc0xlZnQgfTwvc3Ryb25nPiAkeyBpdGVtc0xlZnQgPiAxIHx8IGl0ZW1zTGVmdCA9PT0gMCA/ICdpdGVtcycgOiAnaXRlbScgfSBsZWZ0XG4gIGA7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlck9wdGlvbnMoeyBmaWx0ZXIsIG9uVXNlckFjdGlvbiB9KSB7XG4gICQoJ1tkYXRhLWZpbHRlcl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hbGwnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9BTEwpO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFjdGl2ZScpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0FDVElWRSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY29tcGxldGVkJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQ09NUExFVEVEKTtcbiAgICB9XG4gIH0pO1xuICAkKCdbZGF0YS1hbGxdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FMTCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICQoJ1tkYXRhLWFjdGl2ZV0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUNUSVZFID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgJCgnW2RhdGEtY29tcGxldGVkXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQgPyAnc2VsZWN0ZWQnIDogJycpO1xufTtcbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIEZyYWdtZW50LCB1c2VQcm9kdWN0LCB1c2VQdWJTdWIsIHVzZVN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcbmltcG9ydCB7IEZpbHRlck9wdGlvbnMgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfQUxMID0gJ0ZJTFRFUl9BTEwnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9BQ1RJVkUgPSAnRklMVEVSX0FDVElWRSc7XG5leHBvcnQgY29uc3QgRklMVEVSX0NPTVBMRVRFRCA9ICdGSUxURVJfQ09NUExFVEVEJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRmlsdGVyKCkge1xuICBjb25zdCBbIGZpbHRlciwgc2V0RmlsdGVyIF0gPSB1c2VTdGF0ZShGSUxURVJfQUxMKTtcbiAgY29uc3QgeyBTdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuXG4gIHVzZVByb2R1Y3QoZmlsdGVyKTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxGaWx0ZXJPcHRpb25zIGZpbHRlcj17IGZpbHRlciB9IC8+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBGSUxURVJfQUxMIH0+XG4gICAgICAgIHsgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9BTEwpIH1cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRklMVEVSX0FDVElWRSB9PlxuICAgICAgICB7ICgpID0+IHNldEZpbHRlcihGSUxURVJfQUNUSVZFKSB9XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEZJTFRFUl9DT01QTEVURUQgfT5cbiAgICAgICAgeyAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0NPTVBMRVRFRCkgfVxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCB1c2VQdWJTdWIgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpc3RlbmVyKCkge1xuICBjb25zdCB7IHB1Ymxpc2ggfSA9IHVzZVB1YlN1YigpO1xuXG4gIHJldHVybiA8Q29udGFpbmVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfSAvPjtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGaWxsQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgRklMVEVSX0FMTCwgRklMVEVSX0FDVElWRSwgRklMVEVSX0NPTVBMRVRFRCB9IGZyb20gJy4vRmlsdGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyZXIoeyB0b2RvcywgZmlsdGVyIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8RmlsbENvbnRhaW5lcj5cbiAgICAgIHtcbiAgICAgICAgdG9kb3NcbiAgICAgICAgLmZpbHRlcigoeyBjb21wbGV0ZWQgfSkgPT4ge1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BTEwpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BQ1RJVkUpIHJldHVybiAhY29tcGxldGVkO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQpIHJldHVybiBjb21wbGV0ZWQ7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KS5tYXAoKHRvZG8sIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBsaUNsYXNzID0gdG9kby5lZGl0aW5nID8gJ2VkaXRpbmcnIDogKHRvZG8uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJyk7XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPSckeyBsaUNsYXNzIH0nPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlXG4gICAgICAgICAgICAgICAgICAkeyB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnIH0+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWxhYmVsPiR7IHRvZG8ubGFiZWwgfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkZXN0cm95XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS1kZWxldGU+PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZGl0XCIgdmFsdWU9XCIkeyB0b2RvLmxhYmVsIH1cIiBkYXRhLWluZGV4PVwiJHsgaSB9XCIgZGF0YS1lZGl0PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICBgO1xuICAgICAgICB9KS5qb2luKCcnKVxuICAgICAgfVxuICAgIDwvRmlsbENvbnRhaW5lcj5cbiAgKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCBGcmFnbWVudCwgdXNlUmVkdWNlciwgdXNlUHJvZHVjdCwgdXNlUHViU3ViIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuZXhwb3J0IGNvbnN0IFRPR0dMRSA9ICdUT0dHTEUnO1xuZXhwb3J0IGNvbnN0IE5FV19UT0RPID0gJ05FV19UT0RPJztcbmV4cG9ydCBjb25zdCBERUxFVEUgPSAnREVMRVRFJztcbmV4cG9ydCBjb25zdCBFRElUID0gJ0VESVQnO1xuZXhwb3J0IGNvbnN0IEVESVRfVE9ETyA9ICdFRElUX1RPRE8nO1xuXG5jb25zdCB0b2dnbGUgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBUT0dHTEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBERUxFVEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IG5ld1RvZG8gPSAobGFiZWwpID0+ICh7IHR5cGU6IE5FV19UT0RPLCBsYWJlbCB9KTtcbmNvbnN0IGVkaXQgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBFRElULCB0b2RvSW5kZXggfSk7XG5jb25zdCBlZGl0VG9EbyA9ICh7IGluZGV4LCBsYWJlbCB9KSA9PiAoeyB0eXBlOiBFRElUX1RPRE8sIGluZGV4LCBsYWJlbCB9KTtcblxuY29uc3QgVG9EbyA9ICh7IGxhYmVsIH0pID0+ICh7IGxhYmVsLCBjb21wbGV0ZWQ6IGZhbHNlLCBlZGl0aW5nOiBmYWxzZSB9KTtcbmNvbnN0IGluaXRpYWxWYWx1ZSA9IFtcbiAgVG9Ebyh7IGxhYmVsOiAnRmlyc3QgdGFzaycgfSksXG4gIFRvRG8oeyBsYWJlbDogJ1NlY29uZCB0YXNrJyB9KVxuXTtcbmNvbnN0IHJlZHVjZXIgPSBmdW5jdGlvbiAodG9kb3MsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBUT0dHTEU6XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi50b2RvSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogIXRvZG8uY29tcGxldGVkXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVDpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgZWRpdGluZzogIXRvZG8uZWRpdGluZ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICBjYXNlIEVESVRfVE9ETzpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLmluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBsYWJlbDogYWN0aW9uLmxhYmVsLFxuICAgICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBORVdfVE9ETzpcbiAgICAgIHJldHVybiBbIC4uLnRvZG9zLCBUb0RvKHsgbGFiZWw6IGFjdGlvbi5sYWJlbCB9KSBdO1xuICAgIGNhc2UgREVMRVRFOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbywgaW5kZXgpID0+IGluZGV4ICE9PSBhY3Rpb24udG9kb0luZGV4KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRvZG9zO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yZSgpIHtcbiAgY29uc3QgWyB0b2RvcywgLCBEaXNwYXRjaCBdID0gdXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsVmFsdWUpO1xuICBjb25zdCB7IFN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG5cbiAgdXNlUHJvZHVjdCh0b2Rvcyk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBUT0dHTEUgfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkOiB0b2RvSW5kZXggfSkgPT4gdG9nZ2xlKHRvZG9JbmRleCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBORVdfVE9ETyB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IGxhYmVsIH0pID0+IG5ld1RvZG8obGFiZWwpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgREVMRVRFIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZDogdG9kb0luZGV4IH0pID0+IGRlbGV0ZVRvZG8odG9kb0luZGV4KSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEVESVQgfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkOiB0b2RvSW5kZXggfSkgPT4gZWRpdCh0b2RvSW5kZXgpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRURJVF9UT0RPIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZCB9KSA9PiBlZGl0VG9EbyhwYXlsb2FkKSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufVxuIiwiLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSwgcnVuLCBGcmFnbWVudCB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL0xpc3RlbmVyJztcbmltcG9ydCBDaGVja0ZvckVkaXRGaWVsZCBmcm9tICcuL0NoZWNrRm9yRWRpdEZpZWxkJztcbmltcG9ydCB7IFByb2dyZXNzQ2hlY2tlciB9IGZyb20gJy4vRE9NJztcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9GaWx0ZXInO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPExpc3RlbmVyIC8+XG4gICAgICA8RmlsdGVyIGV4cG9ydHM9J2ZpbHRlcicgLz5cbiAgICAgIDxTdG9yZSBleHBvcnRzPSd0b2Rvcyc+XG4gICAgICAgIDxSZW5kZXJlciAkdG9kb3MgJGZpbHRlci8+XG4gICAgICAgIDxDaGVja0ZvckVkaXRGaWVsZCAkdG9kb3MgLz5cbiAgICAgICAgPFByb2dyZXNzQ2hlY2tlciAkdG9kb3MgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=