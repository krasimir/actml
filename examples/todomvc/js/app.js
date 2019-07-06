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
    regeneratorRuntime.mark(function _callee2(node) {
      var result, genResult, toGenValue;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              currentNode = node;
              node.enter();

              node.rerun = function () {
                return processNode(node);
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
                          return processNode(node.addChildNode(children[i]));

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
                          return processNode(node.addChildNode(funcResult));

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
                _context2.next = 12;
                break;
              }

              _context2.next = 9;
              return result;

            case 9:
              result = _context2.sent;
              _context2.next = 35;
              break;

            case 12:
              if (!(result && typeof result.next === 'function')) {
                _context2.next = 31;
                break;
              }

              genResult = result.next();

            case 14:
              if (genResult.done) {
                _context2.next = 22;
                break;
              }

              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 19;
                break;
              }

              _context2.next = 18;
              return processNode(node.addChildNode(genResult.value));

            case 18:
              toGenValue = _context2.sent;

            case 19:
              genResult = result.next(toGenValue);
              _context2.next = 14;
              break;

            case 22:
              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 28;
                break;
              }

              _context2.next = 25;
              return processNode(node.addChildNode(genResult.value));

            case 25:
              result = _context2.sent;
              _context2.next = 29;
              break;

            case 28:
              result = genResult.value;

            case 29:
              _context2.next = 35;
              break;

            case 31:
              if (!(0, _isActMLElement2.default)(result)) {
                _context2.next = 35;
                break;
              }

              _context2.next = 34;
              return processNode(node.addChildNode(result));

            case 34:
              result = _context2.sent;

            case 35:
              if (!node.element.shouldProcessChildrenAutomatically()) {
                _context2.next = 38;
                break;
              }

              _context2.next = 38;
              return node.callChildren();

            case 38:
              node.element.out();
              node.out();
              currentNode = null;
              return _context2.abrupt('return', result);

            case 42:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function processNode(_x) {
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

  function createNewNode(element, parent) {
    if (element) {
      element.initialize(getId());
    }

    return {
      element: element,
      children: [],
      parent: parent,
      cursor: 0,
      enter: function enter() {
        var _this = this;

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


        var newChildNode = createNewNode(newElement, this);

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


var bridgeMethodName = function bridgeMethodName(keyword) {
  return '__request__' + keyword;
};

var resolveProduct = function resolveProduct(bridgeMethod, node, getError) {
  if (!node) {
    throw getError();
  }

  var source = void 0;

  if (node[bridgeMethod]) {
    source = node;
  } else {
    source = node.children.find(function (child) {
      return !!child[bridgeMethod];
    });
  }

  var product = source ? source[bridgeMethod]() : null;

  if (product !== null) {
    return product.value;
  }

  return resolveProduct(bridgeMethod, node.parent, getError);
};

var getNotFoundError = function getNotFoundError(keyword, node) {
  var getStack = function getStack(node) {
    var stack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    stack.push(node.element.name);

    if (node.parent) {
      return getStack(node.parent, stack);
    }

    return stack;
  };

  return new Error('"' + keyword + '" prop requested by "' + node.element.name + '" can not be found.\n\nStack:\n' + getStack(node).reverse().map(function (name) {
    return '  <' + name + '>';
  }).join('\n'));
};

var createUseProductHook = function createUseProductHook(processor) {
  processor.onNodeEnter(function (node) {
    var element = node.element;
    var props = element.props;
    var propNames = props ? Object.keys(props) : [];
    propNames.forEach(function (propName) {
      if (propName.charAt(0) === '$') {
        var keyword = propName.substr(1, propName.length);
        var productValue = resolveProduct(bridgeMethodName(keyword), node.parent, function () {
          return getNotFoundError(keyword, node);
        });
        element.mergeProps(_defineProperty({}, keyword, productValue));
      } else if (propName === 'exports') {
        node[bridgeMethodName(props[propName])] = function () {
          return {
            value: node.__product
          };
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
/*! exports provided: FillContainer, Container, FocusField, ProgressChecker, Footer, FilterOptionsTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillContainer", function() { return FillContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusField", function() { return FocusField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressChecker", function() { return ProgressChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterOptionsTabs", function() { return FilterOptionsTabs; });
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
function Footer(_ref5) {
  var onUserAction = _ref5.onUserAction;
  $('[data-filter]').addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-all')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_ALL"]);
    } else if (e.target.hasAttribute('data-active')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_ACTIVE"]);
    } else if (e.target.hasAttribute('data-completed')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_COMPLETED"]);
    }
  });
  $('[data-clear-completed]').addEventListener('click', function () {
    onUserAction(_Store__WEBPACK_IMPORTED_MODULE_2__["CLEAR_COMPLETED"]);
  });
}
;
function FilterOptionsTabs(_ref6) {
  var filter = _ref6.filter;
  $('[data-all]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_ALL"] ? 'selected' : '');
  $('[data-active]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_ACTIVE"] ? 'selected' : '');
  $('[data-completed]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_3__["FILTER_COMPLETED"] ? 'selected' : '');
}

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
  return Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_lib__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(Subscribe, {
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

/***/ "./src/Persist.js":
/*!************************!*\
  !*** ./src/Persist.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/** @jsx A */


var initialValue = JSON.stringify([Object(_Store__WEBPACK_IMPORTED_MODULE_1__["ToDo"])({
  label: 'ActML is using JSX'
}), Object(_Store__WEBPACK_IMPORTED_MODULE_1__["ToDo"])({
  label: 'It is like React but not for rendering'
})]);
/* harmony default export */ __webpack_exports__["default"] = ({
  Provider: function Provider() {
    Object(_lib__WEBPACK_IMPORTED_MODULE_0__["useProduct"])(JSON.parse(localStorage.getItem('todos') || initialValue));
  },
  Storage: function Storage(_ref) {
    var todos = _ref.todos;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});

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
/*! exports provided: TOGGLE, NEW_TODO, DELETE, EDIT, EDIT_TODO, CLEAR_COMPLETED, ToDo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOGGLE", function() { return TOGGLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_TODO", function() { return NEW_TODO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE", function() { return DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT", function() { return EDIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TODO", function() { return EDIT_TODO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_COMPLETED", function() { return CLEAR_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToDo", function() { return ToDo; });
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
var CLEAR_COMPLETED = 'CLEAR_COMPLETED';

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

var clearCompleted = function clearCompleted() {
  return {
    type: CLEAR_COMPLETED
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

    case CLEAR_COMPLETED:
      return todos.filter(function (todo) {
        return !todo.completed;
      });

    default:
      return todos;
  }
};

function Store(_ref3) {
  var initialValue = _ref3.initialValue;

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
    propsToAction: function propsToAction(_ref4) {
      var todoIndex = _ref4.payload;
      return toggle(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: NEW_TODO
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref5) {
      var label = _ref5.payload;
      return newTodo(label);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: DELETE
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref6) {
      var todoIndex = _ref6.payload;
      return deleteTodo(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: EDIT
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref7) {
      var todoIndex = _ref7.payload;
      return edit(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: EDIT_TODO
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref8) {
      var payload = _ref8.payload;
      return editToDo(payload);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: CLEAR_COMPLETED
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    action: clearCompleted()
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
/* harmony import */ var _CheckForEditField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CheckForEditField */ "./src/CheckForEditField.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Filter */ "./src/Filter.js");
/* harmony import */ var _Persist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Persist */ "./src/Persist.js");
/** @jsx A */








function App() {
  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["usePubSub"])(),
      publish = _usePubSub.publish;

  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_lib__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["Container"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["Footer"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Persist__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    exports: "initialValue"
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"], {
    exports: "todos",
    $initialValue: true
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Filter__WEBPACK_IMPORTED_MODULE_5__["default"], {
    exports: "filter"
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Renderer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    $todos: true,
    $filter: true
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["FilterOptionsTabs"], {
    $filter: true
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_CheckForEditField__WEBPACK_IMPORTED_MODULE_3__["default"], {
    $todos: true
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["ProgressChecker"], {
    $todos: true
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Persist__WEBPACK_IMPORTED_MODULE_6__["default"].Storage, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNoaWxkcmVuLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VQdWJTdWIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VSZWR1Y2VyLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL3V0aWxzL2lzQWN0TUxFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9ub2RlX21vZHVsZXMvZmFzdC1kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyc2lzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImdldEZ1bmNOYW1lIiwiZnVuYyIsIm5hbWUiLCJyZXN1bHQiLCJleGVjIiwidG9TdHJpbmciLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsIkVycm9yIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsIl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJzaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5IiwiZW50ZXIiLCJvdXQiLCJkZWZhdWx0IiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwib2JqIiwiX19lc01vZHVsZSIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZm4iLCJnZW4iLCJhcHBseSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3RlcCIsImtleSIsImFyZyIsImluZm8iLCJlcnJvciIsImRvbmUiLCJ0aGVuIiwiZXJyIiwiX3RoaXMiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJwcm9jZXNzTm9kZSIsIl9yZWYiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZTIiLCJub2RlIiwiZ2VuUmVzdWx0IiwidG9HZW5WYWx1ZSIsIndyYXAiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwcmV2IiwibmV4dCIsInJlcnVuIiwiY2FsbENoaWxkcmVuIiwiX3JlZjIiLCJfY2FsbGVlIiwiY2hpbGRyZW5SZXN1bHQiLCJpIiwiX2NoaWxkcmVuJGkiLCJmdW5jUmVzdWx0IiwiX2FyZ3MiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiZWxlbWVudCIsInQwIiwiYWRkQ2hpbGROb2RlIiwidDEiLCJzZW50IiwicHVzaCIsImNhbGwiLCJ0MiIsInQzIiwiYWJydXB0Iiwic3RvcCIsIl94IiwicnVuIiwicmVzb2x2ZWRSb290Tm9kZSIsInJlc29sdmVSb290Iiwib25Ob2RlRW50ZXIiLCJjYWxsYmFjayIsImFkZE5vZGVFbnRlckNhbGxiYWNrIiwib25Ob2RlT3V0IiwiYWRkTm9kZU91dENhbGxiYWNrIiwib25Ob2RlUmVtb3ZlIiwic3lzdGVtIiwicmVzZXQiLCJjbGVhciIsIlRyZWUiLCJfZmFzdERlZXBFcXVhbCIsIl9mYXN0RGVlcEVxdWFsMiIsIl9vbk5vZGVSZW1vdmUiLCJyb290IiwiY3JlYXRlTmV3Tm9kZSIsImlkcyIsImdldElkIiwidXNlU2FtZU5vZGUiLCJuZXdFbGVtZW50IiwidHJlZURpZmYiLCJvbGRFbGVtZW50IiwicGFyZW50IiwiY3Vyc29yIiwiZm9yRWFjaCIsImMiLCJfdGhpczIiLCJzcGxpY2UiLCJyZW1vdmVkTm9kZSIsIl90aGlzMyIsImNoaWxkTm9kZSIsIm5ld0NoaWxkTm9kZSIsImdldE51bU9mRWxlbWVudHMiLCJkaWFnbm9zZSIsImxvb3BPdmVyIiwiaW5kIiwibWFwIiwiY2hpbGQiLCJfaXNWYWxpZEhvb2tDb250ZXh0IiwiX2lzVmFsaWRIb29rQ29udGV4dDIiLCJjcmVhdGVVc2VDaGlsZHJlbkhvb2siLCJwcm9jZXNzb3IiLCJjcmVhdGVVc2VFbGVtZW50SG9vayIsIl9kZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImJyaWRnZU1ldGhvZE5hbWUiLCJrZXl3b3JkIiwicmVzb2x2ZVByb2R1Y3QiLCJicmlkZ2VNZXRob2QiLCJnZXRFcnJvciIsInNvdXJjZSIsImZpbmQiLCJwcm9kdWN0IiwiZ2V0Tm90Rm91bmRFcnJvciIsImdldFN0YWNrIiwic3RhY2siLCJyZXZlcnNlIiwiam9pbiIsImNyZWF0ZVVzZVByb2R1Y3RIb29rIiwicHJvcE5hbWVzIiwia2V5cyIsInByb3BOYW1lIiwiY2hhckF0Iiwic3Vic3RyIiwicHJvZHVjdFZhbHVlIiwiX19wcm9kdWN0IiwibmV3VmFsdWUiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJhcnIiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwiY3JlYXRlVXNlUHViU3ViSG9vayIsInN1YnNjcmliZXJzIiwiY3JlYXRlU3Vic2NyaWJlRWxlbWVudCIsInN1YnNjcmliZSIsInVzZUNoaWxkcmVuIiwidHlwZSIsIl91c2VDaGlsZHJlbiIsIl91c2VDaGlsZHJlbjIiLCJwYXlsb2FkIiwiY3JlYXRlUHVibGlzaEVsZW1lbnQiLCJwdWJsaXNoIiwic2NvcGVkRWxlbWVudCIsImVsIiwic3Vic2NyaWJlRnVuYyIsIl9sZW4iLCJwYXJhbXMiLCJfa2V5IiwiY29uY2F0IiwicHVibGlzaEZ1bmMiLCJTdWJzY3JpYmUiLCJQdWJsaXNoIiwiY3JlYXRlVXNlUmVkdWNlckhvb2siLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJ0YXJnZXQiLCJpbmRleE9mIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsImFjdGlvbiIsInByb3BzVG9BY3Rpb24iLCJyZXN0IiwidXNlU3RhdGUiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImdldFN0YXRlIiwiY3JlYXRlVXNlU3RhdGVIb29rIiwiU3RvcmFnZSIsImVsZW1lbnRzIiwiZ2V0Iiwic3RhdGVzIiwiY29uc3VtZXIiLCJjbGVhblVwIiwic3RvcmFnZSIsImluZGV4IiwibmV3U3RhdGUiLCJpc1ZhbGlkSG9va0NvbnRleHQiLCJjcmVhdGVVbml2ZXJzZSIsIl9Qcm9jZXNzb3IiLCJfUHJvY2Vzc29yMiIsIl9BY3RFbGVtZW50IiwiX0FjdEVsZW1lbnQyIiwiX3VzZUVsZW1lbnQiLCJfdXNlRWxlbWVudDIiLCJfdXNlUHJvZHVjdCIsIl91c2VQcm9kdWN0MiIsIl91c2VSZWR1Y2VyIiwiX3VzZVJlZHVjZXIyIiwiQSIsIkZyYWdtZW50IiwidXNlRWxlbWVudCIsInVzZVByb2R1Y3QiLCJ1c2VQdWJTdWIiLCJ1c2VSZWR1Y2VyIiwidW5pdmVyc2UiLCJtb2R1bGUiLCJpc0FjdE1MRWxlbWVudCIsIkNoZWNrRm9yRWRpdEZpZWxkIiwidG9kb3MiLCJmaW5kSW5kZXgiLCJlZGl0aW5nIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGlzdCIsImhlYWRlciIsIkVOVEVSIiwiRVNDIiwiRmlsbENvbnRhaW5lciIsImNvbnRlbnQiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJvblVzZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiVE9HR0xFIiwiREVMRVRFIiwiRURJVCIsIkVESVRfVE9ETyIsImxhYmVsIiwia2V5Q29kZSIsIk5FV19UT0RPIiwiRm9jdXNGaWVsZCIsImZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJQcm9ncmVzc0NoZWNrZXIiLCJjb21wbGV0ZWQiLCJmaWx0ZXIiLCJpdGVtc0xlZnQiLCJGb290ZXIiLCJGSUxURVJfQUxMIiwiRklMVEVSX0FDVElWRSIsIkZJTFRFUl9DT01QTEVURUQiLCJDTEVBUl9DT01QTEVURUQiLCJGaWx0ZXJPcHRpb25zVGFicyIsInNldEF0dHJpYnV0ZSIsIkZpbHRlciIsInNldEZpbHRlciIsImluaXRpYWxWYWx1ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJUb0RvIiwiUHJvdmlkZXIiLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwiUmVuZGVyZXIiLCJ0b2RvIiwibGlDbGFzcyIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVkaXRUb0RvIiwiY2xlYXJDb21wbGV0ZWQiLCJTdG9yZSIsIkRpc3BhdGNoIiwiQXBwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUViQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7O0FBR0EsU0FBU0MsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDekIsTUFBSUEsSUFBSSxDQUFDQyxJQUFULEVBQWUsT0FBT0QsSUFBSSxDQUFDQyxJQUFaO0FBQ2YsTUFBSUMsTUFBTSxHQUFHLDZCQUE2QkMsSUFBN0IsQ0FBa0NILElBQUksQ0FBQ0ksUUFBTCxFQUFsQyxDQUFiO0FBRUEsU0FBT0YsTUFBTSxHQUFHQSxNQUFNLENBQUMsQ0FBRCxDQUFULEdBQWUsU0FBNUI7QUFDRDs7QUFBQTs7QUFFRCxJQUFJRyxhQUFhLEdBQUcsU0FBU0EsYUFBVCxDQUF1QkwsSUFBdkIsRUFBNkJNLEtBQTdCLEVBQW9DQyxRQUFwQyxFQUE4QztBQUNoRSxNQUFJLE9BQU9QLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDOUIsVUFBTSxJQUFJUSxLQUFKLENBQVUsd0NBQXdDUixJQUF4QyxHQUErQyxrQkFBekQsQ0FBTjtBQUNEOztBQUNELFNBQU87QUFDTFMsV0FBTyxFQUFFLElBREo7QUFFTEMsVUFBTSxFQUFFLENBRkg7QUFHTEMsYUFBUyxFQUFFLEtBSE47QUFJTEMsa0NBQThCLEVBQUUsSUFKM0I7QUFLTEMsTUFBRSxFQUFFLElBTEM7QUFNTFAsU0FBSyxFQUFFQSxLQU5GO0FBT0xMLFFBQUksRUFBRUYsV0FBVyxDQUFDQyxJQUFELENBUFo7QUFRTE8sWUFBUSxFQUFFQSxRQVJMO0FBU0xPLGNBQVUsRUFBRSxTQUFTQSxVQUFULENBQW9CRCxFQUFwQixFQUF3QjtBQUNsQyxVQUFJRSxJQUFJLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixDQUFuQixJQUF3QkQsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQkUsU0FBekMsR0FBcURGLFNBQVMsQ0FBQyxDQUFELENBQTlELEdBQW9FLENBQS9FO0FBRUEsV0FBS0gsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsV0FBS0gsTUFBTCxHQUFjSyxJQUFkO0FBQ0EsV0FBS0osU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtDLDhCQUFMLEdBQXNDLElBQXRDO0FBQ0QsS0FoQkk7QUFpQkxPLGNBQVUsRUFBRSxTQUFTQSxVQUFULENBQW9CQyxRQUFwQixFQUE4QjtBQUN4QyxXQUFLZCxLQUFMLEdBQWFYLE1BQU0sQ0FBQzBCLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtmLEtBQXZCLEVBQThCYyxRQUE5QixDQUFiO0FBQ0QsS0FuQkk7QUFvQkxMLFFBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLGFBQU8sS0FBS0wsTUFBWjtBQUNELEtBdEJJO0FBdUJMWSxhQUFTLEVBQUUsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixhQUFPLEtBQUtYLFNBQVo7QUFDRCxLQXpCSTtBQTBCTFksc0NBQWtDLEVBQUUsU0FBU0Esa0NBQVQsQ0FBNEN6QixLQUE1QyxFQUFtRDtBQUNyRixVQUFJLE9BQU9BLEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDaEMsZUFBTyxLQUFLYyw4QkFBWjtBQUNEOztBQUNELFdBQUtBLDhCQUFMLEdBQXNDZCxLQUF0QztBQUNBLGFBQU9BLEtBQVA7QUFDRCxLQWhDSTtBQWlDTDBCLFNBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCLFdBQUtiLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxXQUFLQyw4QkFBTCxHQUFzQyxJQUF0QztBQUVBLGFBQU9aLElBQUksQ0FBQyxLQUFLTSxLQUFOLENBQVg7QUFDRCxLQXRDSTtBQXVDTG1CLE9BQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBS2YsTUFBTCxJQUFlLENBQWY7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7QUExQ0ksR0FBUDtBQTRDRCxDQWhERDs7QUFrREFkLE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0JyQixhQUFsQixDOzs7Ozs7Ozs7Ozs7QUM5RGE7O0FBRWJWLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCQyxlQUFsQjs7QUFFQSxJQUFJQyxlQUFlLEdBQUdDLG1CQUFPLENBQUMsaUVBQUQsQ0FBN0I7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUdDLHNCQUFzQixDQUFDSCxlQUFELENBQTdDOztBQUVBLElBQUlJLEtBQUssR0FBR0gsbUJBQU8sQ0FBQyxpQ0FBRCxDQUFuQjs7QUFFQSxJQUFJSSxNQUFNLEdBQUdGLHNCQUFzQixDQUFDQyxLQUFELENBQW5DOztBQUVBLElBQUlFLFVBQVUsR0FBR0wsbUJBQU8sQ0FBQyx1REFBRCxDQUF4Qjs7QUFFQSxJQUFJTSxXQUFXLEdBQUdKLHNCQUFzQixDQUFDRyxVQUFELENBQXhDOztBQUVBLElBQUlFLFNBQVMsR0FBR1AsbUJBQU8sQ0FBQyxxREFBRCxDQUF2Qjs7QUFFQSxJQUFJUSxVQUFVLEdBQUdOLHNCQUFzQixDQUFDSyxTQUFELENBQXZDOztBQUVBLFNBQVNMLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLFNBQVNFLGlCQUFULENBQTJCQyxFQUEzQixFQUErQjtBQUFFLFNBQU8sWUFBWTtBQUFFLFFBQUlDLEdBQUcsR0FBR0QsRUFBRSxDQUFDRSxLQUFILENBQVMsSUFBVCxFQUFlM0IsU0FBZixDQUFWO0FBQXFDLFdBQU8sSUFBSTRCLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUFFLGVBQVNDLElBQVQsQ0FBY0MsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0I7QUFBRSxZQUFJO0FBQUUsY0FBSUMsSUFBSSxHQUFHUixHQUFHLENBQUNNLEdBQUQsQ0FBSCxDQUFTQyxHQUFULENBQVg7QUFBMEIsY0FBSW5ELEtBQUssR0FBR29ELElBQUksQ0FBQ3BELEtBQWpCO0FBQXlCLFNBQXpELENBQTBELE9BQU9xRCxLQUFQLEVBQWM7QUFBRUwsZ0JBQU0sQ0FBQ0ssS0FBRCxDQUFOO0FBQWU7QUFBUzs7QUFBQyxZQUFJRCxJQUFJLENBQUNFLElBQVQsRUFBZTtBQUFFUCxpQkFBTyxDQUFDL0MsS0FBRCxDQUFQO0FBQWlCLFNBQWxDLE1BQXdDO0FBQUUsaUJBQU84QyxPQUFPLENBQUNDLE9BQVIsQ0FBZ0IvQyxLQUFoQixFQUF1QnVELElBQXZCLENBQTRCLFVBQVV2RCxLQUFWLEVBQWlCO0FBQUVpRCxnQkFBSSxDQUFDLE1BQUQsRUFBU2pELEtBQVQsQ0FBSjtBQUFzQixXQUFyRSxFQUF1RSxVQUFVd0QsR0FBVixFQUFlO0FBQUVQLGdCQUFJLENBQUMsT0FBRCxFQUFVTyxHQUFWLENBQUo7QUFBcUIsV0FBN0csQ0FBUDtBQUF3SDtBQUFFOztBQUFDLGFBQU9QLElBQUksQ0FBQyxNQUFELENBQVg7QUFBc0IsS0FBalcsQ0FBUDtBQUE0VyxHQUF0YTtBQUF5YTtBQUFDO0FBRzNjOzs7QUFFQSxTQUFTcEIsZUFBVCxHQUEyQjtBQUN6QixNQUFJNEIsS0FBSyxHQUFHLElBQVo7O0FBRUEsTUFBSUMsSUFBSSxHQUFHLENBQUMsR0FBR3ZCLE1BQU0sQ0FBQ1AsT0FBWCxHQUFYO0FBQ0EsTUFBSStCLFdBQVcsR0FBRyxJQUFsQjs7QUFFQSxNQUFJQyxXQUFXLEdBQUcsWUFBWTtBQUM1QixRQUFJQyxJQUFJLEdBQUduQixpQkFBaUI7QUFBRTtBQUFhb0Isc0JBQWtCLENBQUNDLElBQW5CLENBQXdCLFNBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3pGLFVBQUk3RCxNQUFKLEVBQVk4RCxTQUFaLEVBQXVCQyxVQUF2QjtBQUNBLGFBQU9MLGtCQUFrQixDQUFDTSxJQUFuQixDQUF3QixTQUFTQyxTQUFULENBQW1CQyxTQUFuQixFQUE4QjtBQUMzRCxlQUFPLENBQVAsRUFBVTtBQUNSLGtCQUFRQSxTQUFTLENBQUNDLElBQVYsR0FBaUJELFNBQVMsQ0FBQ0UsSUFBbkM7QUFDRSxpQkFBSyxDQUFMO0FBQ0ViLHlCQUFXLEdBQUdNLElBQWQ7QUFDQUEsa0JBQUksQ0FBQ3ZDLEtBQUw7O0FBQ0F1QyxrQkFBSSxDQUFDUSxLQUFMLEdBQWEsWUFBWTtBQUN2Qix1QkFBT2IsV0FBVyxDQUFDSyxJQUFELENBQWxCO0FBQ0QsZUFGRDs7QUFHQUEsa0JBQUksQ0FBQ1MsWUFBTCxHQUFvQixZQUFZO0FBQzlCLG9CQUFJQyxLQUFLLEdBQUdqQyxpQkFBaUI7QUFBRTtBQUFhb0Isa0NBQWtCLENBQUNDLElBQW5CLENBQXdCLFNBQVNhLE9BQVQsR0FBbUI7QUFDckYsc0JBQUlDLGNBQUo7QUFBQSxzQkFDSXBFLFFBREo7QUFBQSxzQkFFSXFFLENBRko7QUFBQSxzQkFHSUMsV0FISjtBQUFBLHNCQUlJQyxVQUpKO0FBQUEsc0JBS0lDLEtBQUssR0FBRy9ELFNBTFo7O0FBT0EseUJBQU80QyxrQkFBa0IsQ0FBQ00sSUFBbkIsQ0FBd0IsU0FBU2MsUUFBVCxDQUFrQkMsUUFBbEIsRUFBNEI7QUFDekQsMkJBQU8sQ0FBUCxFQUFVO0FBQ1IsOEJBQVFBLFFBQVEsQ0FBQ1osSUFBVCxHQUFnQlksUUFBUSxDQUFDWCxJQUFqQztBQUNFLDZCQUFLLENBQUw7QUFDRUssd0NBQWMsR0FBRyxFQUFqQjtBQUNBcEUsa0NBQVEsR0FBR3dELElBQUksQ0FBQ21CLE9BQUwsQ0FBYTNFLFFBQXhCOztBQUVBLDhCQUFJLEVBQUVBLFFBQVEsSUFBSUEsUUFBUSxDQUFDVSxNQUFULEdBQWtCLENBQWhDLENBQUosRUFBd0M7QUFDdENnRSxvQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0E7QUFDRDs7QUFFRE0sMkJBQUMsR0FBRyxDQUFKOztBQUVGLDZCQUFLLENBQUw7QUFDRSw4QkFBSSxFQUFFQSxDQUFDLEdBQUdyRSxRQUFRLENBQUNVLE1BQWYsQ0FBSixFQUE0QjtBQUMxQmdFLG9DQUFRLENBQUNYLElBQVQsR0FBZ0IsRUFBaEI7QUFDQTtBQUNEOztBQUVELDhCQUFJLENBQUMsQ0FBQyxHQUFHeEMsZ0JBQWdCLENBQUNKLE9BQXJCLEVBQThCbkIsUUFBUSxDQUFDcUUsQ0FBRCxDQUF0QyxDQUFMLEVBQWlEO0FBQy9DSyxvQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0E7QUFDRDs7QUFFRCwyQkFBQ08sV0FBVyxHQUFHdEUsUUFBUSxDQUFDcUUsQ0FBRCxDQUF2QixFQUE0QnpELFVBQTVCLENBQXVDd0IsS0FBdkMsQ0FBNkNrQyxXQUE3QyxFQUEwREUsS0FBMUQ7O0FBQ0FFLGtDQUFRLENBQUNFLEVBQVQsR0FBY1IsY0FBZDtBQUNBTSxrQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0EsaUNBQU9aLFdBQVcsQ0FBQ0ssSUFBSSxDQUFDcUIsWUFBTCxDQUFrQjdFLFFBQVEsQ0FBQ3FFLENBQUQsQ0FBMUIsQ0FBRCxDQUFsQjs7QUFFRiw2QkFBSyxFQUFMO0FBQ0VLLGtDQUFRLENBQUNJLEVBQVQsR0FBY0osUUFBUSxDQUFDSyxJQUF2Qjs7QUFFQUwsa0NBQVEsQ0FBQ0UsRUFBVCxDQUFZSSxJQUFaLENBQWlCQyxJQUFqQixDQUFzQlAsUUFBUSxDQUFDRSxFQUEvQixFQUFtQ0YsUUFBUSxDQUFDSSxFQUE1Qzs7QUFFQUosa0NBQVEsQ0FBQ1gsSUFBVCxHQUFnQixFQUFoQjtBQUNBOztBQUVGLDZCQUFLLEVBQUw7QUFDRSw4QkFBSSxFQUFFLE9BQU8vRCxRQUFRLENBQUNxRSxDQUFELENBQWYsS0FBdUIsVUFBekIsQ0FBSixFQUEwQztBQUN4Q0ssb0NBQVEsQ0FBQ1gsSUFBVCxHQUFnQixFQUFoQjtBQUNBO0FBQ0Q7O0FBRURXLGtDQUFRLENBQUNYLElBQVQsR0FBZ0IsRUFBaEI7QUFDQSxpQ0FBTy9ELFFBQVEsQ0FBQ3FFLENBQUQsQ0FBUixDQUFZakMsS0FBWixDQUFrQnBDLFFBQWxCLEVBQTRCd0UsS0FBNUIsQ0FBUDs7QUFFRiw2QkFBSyxFQUFMO0FBQ0VELG9DQUFVLEdBQUdHLFFBQVEsQ0FBQ0ssSUFBdEI7O0FBRUEsOEJBQUksQ0FBQyxDQUFDLEdBQUd4RCxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJvRCxVQUE5QixDQUFMLEVBQWdEO0FBQzlDRyxvQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0E7QUFDRDs7QUFFRFcsa0NBQVEsQ0FBQ1EsRUFBVCxHQUFjZCxjQUFkO0FBQ0FNLGtDQUFRLENBQUNYLElBQVQsR0FBZ0IsRUFBaEI7QUFDQSxpQ0FBT1osV0FBVyxDQUFDSyxJQUFJLENBQUNxQixZQUFMLENBQWtCTixVQUFsQixDQUFELENBQWxCOztBQUVGLDZCQUFLLEVBQUw7QUFDRUcsa0NBQVEsQ0FBQ1MsRUFBVCxHQUFjVCxRQUFRLENBQUNLLElBQXZCOztBQUVBTCxrQ0FBUSxDQUFDUSxFQUFULENBQVlGLElBQVosQ0FBaUJDLElBQWpCLENBQXNCUCxRQUFRLENBQUNRLEVBQS9CLEVBQW1DUixRQUFRLENBQUNTLEVBQTVDOztBQUVBVCxrQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0E7O0FBRUYsNkJBQUssRUFBTDtBQUNFSyx3Q0FBYyxDQUFDWSxJQUFmLENBQW9CVCxVQUFwQjs7QUFFRiw2QkFBSyxFQUFMO0FBQ0VGLDJCQUFDO0FBQ0RLLGtDQUFRLENBQUNYLElBQVQsR0FBZ0IsQ0FBaEI7QUFDQTs7QUFFRiw2QkFBSyxFQUFMO0FBQ0UsaUNBQU9XLFFBQVEsQ0FBQ1UsTUFBVCxDQUFnQixRQUFoQixFQUEwQmhCLGNBQTFCLENBQVA7O0FBRUYsNkJBQUssRUFBTDtBQUNBLDZCQUFLLEtBQUw7QUFDRSxpQ0FBT00sUUFBUSxDQUFDVyxJQUFULEVBQVA7QUE5RUo7QUFnRkQ7QUFDRixtQkFuRk0sRUFtRkpsQixPQW5GSSxFQW1GS25CLEtBbkZMLENBQVA7QUFvRkQsaUJBNUYyQyxDQUFmLENBQTdCOztBQThGQSx1QkFBTyxZQUFZO0FBQ2pCLHlCQUFPa0IsS0FBSyxDQUFDOUIsS0FBTixDQUFZLElBQVosRUFBa0IzQixTQUFsQixDQUFQO0FBQ0QsaUJBRkQ7QUFHRCxlQWxHbUIsRUFBcEIsQ0FORixDQTBHRTs7O0FBQ0FkLG9CQUFNLEdBQUc2RCxJQUFJLENBQUNtQixPQUFMLENBQWExRCxLQUFiLEVBQVQ7QUFDQXdDLHVCQUFTLEdBQUcsS0FBSyxDQUFqQixFQUFvQkMsVUFBVSxHQUFHLEtBQUssQ0FBdEMsQ0E1R0YsQ0E4R0U7O0FBRUEsa0JBQUksRUFBRS9ELE1BQU0sSUFBSUEsTUFBTSxDQUFDbUQsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QmUseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRURGLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsQ0FBakI7QUFDQSxxQkFBT3BFLE1BQVA7O0FBRUYsaUJBQUssQ0FBTDtBQUNFQSxvQkFBTSxHQUFHa0UsU0FBUyxDQUFDa0IsSUFBbkI7QUFDQWxCLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTs7QUFFRixpQkFBSyxFQUFMO0FBQ0Usa0JBQUksRUFBRXBFLE1BQU0sSUFBSSxPQUFPQSxNQUFNLENBQUNvRSxJQUFkLEtBQXVCLFVBQW5DLENBQUosRUFBb0Q7QUFDbERGLHlCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTtBQUNEOztBQUVETix1QkFBUyxHQUFHOUQsTUFBTSxDQUFDb0UsSUFBUCxFQUFaOztBQUVGLGlCQUFLLEVBQUw7QUFDRSxrQkFBSU4sU0FBUyxDQUFDWixJQUFkLEVBQW9CO0FBQ2xCZ0IseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRUQsa0JBQUksQ0FBQyxDQUFDLEdBQUd4QyxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJzQyxTQUFTLENBQUNsRSxLQUF4QyxDQUFMLEVBQXFEO0FBQ25Ec0UseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRURGLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQSxxQkFBT1osV0FBVyxDQUFDSyxJQUFJLENBQUNxQixZQUFMLENBQWtCcEIsU0FBUyxDQUFDbEUsS0FBNUIsQ0FBRCxDQUFsQjs7QUFFRixpQkFBSyxFQUFMO0FBQ0VtRSx3QkFBVSxHQUFHRyxTQUFTLENBQUNrQixJQUF2Qjs7QUFFRixpQkFBSyxFQUFMO0FBQ0V0Qix1QkFBUyxHQUFHOUQsTUFBTSxDQUFDb0UsSUFBUCxDQUFZTCxVQUFaLENBQVo7QUFDQUcsdUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBOztBQUVGLGlCQUFLLEVBQUw7QUFDRSxrQkFBSSxDQUFDLENBQUMsR0FBR3hDLGdCQUFnQixDQUFDSixPQUFyQixFQUE4QnNDLFNBQVMsQ0FBQ2xFLEtBQXhDLENBQUwsRUFBcUQ7QUFDbkRzRSx5QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7QUFDRDs7QUFFREYsdUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBLHFCQUFPWixXQUFXLENBQUNLLElBQUksQ0FBQ3FCLFlBQUwsQ0FBa0JwQixTQUFTLENBQUNsRSxLQUE1QixDQUFELENBQWxCOztBQUVGLGlCQUFLLEVBQUw7QUFDRUksb0JBQU0sR0FBR2tFLFNBQVMsQ0FBQ2tCLElBQW5CO0FBQ0FsQix1QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7O0FBRUYsaUJBQUssRUFBTDtBQUNFcEUsb0JBQU0sR0FBRzhELFNBQVMsQ0FBQ2xFLEtBQW5COztBQUVGLGlCQUFLLEVBQUw7QUFDRXNFLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTs7QUFFRixpQkFBSyxFQUFMO0FBQ0Usa0JBQUksQ0FBQyxDQUFDLEdBQUd4QyxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJ4QixNQUE5QixDQUFMLEVBQTRDO0FBQzFDa0UseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRURGLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQSxxQkFBT1osV0FBVyxDQUFDSyxJQUFJLENBQUNxQixZQUFMLENBQWtCbEYsTUFBbEIsQ0FBRCxDQUFsQjs7QUFFRixpQkFBSyxFQUFMO0FBQ0VBLG9CQUFNLEdBQUdrRSxTQUFTLENBQUNrQixJQUFuQjs7QUFFRixpQkFBSyxFQUFMO0FBQ0Usa0JBQUksQ0FBQ3ZCLElBQUksQ0FBQ21CLE9BQUwsQ0FBYTNELGtDQUFiLEVBQUwsRUFBd0Q7QUFDdEQ2Qyx5QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7QUFDRDs7QUFFREYsdUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBLHFCQUFPUCxJQUFJLENBQUNTLFlBQUwsRUFBUDs7QUFFRixpQkFBSyxFQUFMO0FBRUVULGtCQUFJLENBQUNtQixPQUFMLENBQWF6RCxHQUFiO0FBQ0FzQyxrQkFBSSxDQUFDdEMsR0FBTDtBQUNBZ0MseUJBQVcsR0FBRyxJQUFkO0FBRUEscUJBQU9XLFNBQVMsQ0FBQ3VCLE1BQVYsQ0FBaUIsUUFBakIsRUFBMkJ6RixNQUEzQixDQUFQOztBQUVGLGlCQUFLLEVBQUw7QUFDQSxpQkFBSyxLQUFMO0FBQ0UscUJBQU9rRSxTQUFTLENBQUN3QixJQUFWLEVBQVA7QUFoTko7QUFrTkQ7QUFDRixPQXJOTSxFQXFOSjlCLFFBck5JLEVBcU5NUCxLQXJOTixDQUFQO0FBc05ELEtBeE4wQyxDQUFmLENBQTVCOztBQTBOQSxXQUFPLFNBQVNHLFdBQVQsQ0FBcUJtQyxFQUFyQixFQUF5QjtBQUM5QixhQUFPbEMsSUFBSSxDQUFDaEIsS0FBTCxDQUFXLElBQVgsRUFBaUIzQixTQUFqQixDQUFQO0FBQ0QsS0FGRDtBQUdELEdBOU5pQixFQUFsQjs7QUFnT0EsU0FBTztBQUNMK0MsUUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsYUFBT04sV0FBUDtBQUNELEtBSEk7QUFJTHFDLE9BQUcsRUFBRSxTQUFTQSxHQUFULENBQWFaLE9BQWIsRUFBc0I7QUFDekIsVUFBSWEsZ0JBQWdCLEdBQUd2QyxJQUFJLENBQUN3QyxXQUFMLENBQWlCZCxPQUFqQixDQUF2QjtBQUVBLGFBQU94QixXQUFXLENBQUNxQyxnQkFBRCxFQUFtQixFQUFuQixDQUFsQjtBQUNELEtBUkk7QUFTTEUsZUFBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJDLFFBQXJCLEVBQStCO0FBQzFDMUMsVUFBSSxDQUFDMkMsb0JBQUwsQ0FBMEJELFFBQTFCO0FBQ0QsS0FYSTtBQVlMRSxhQUFTLEVBQUUsU0FBU0EsU0FBVCxDQUFtQkYsUUFBbkIsRUFBNkI7QUFDdEMxQyxVQUFJLENBQUM2QyxrQkFBTCxDQUF3QkgsUUFBeEI7QUFDRCxLQWRJO0FBZUxJLGdCQUFZLEVBQUUsU0FBU0EsWUFBVCxDQUFzQkosUUFBdEIsRUFBZ0M7QUFDNUMxQyxVQUFJLENBQUM4QyxZQUFMLENBQWtCSixRQUFsQjtBQUNELEtBakJJO0FBa0JMSyxVQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixhQUFPO0FBQ0wvQyxZQUFJLEVBQUVBLElBREQ7QUFFTGdELGFBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCaEQsY0FBSSxDQUFDZ0QsS0FBTDs7QUFDQXJFLHFCQUFXLENBQUNULE9BQVosQ0FBb0IrRSxLQUFwQjs7QUFDQXBFLG9CQUFVLENBQUNYLE9BQVgsQ0FBbUIrRSxLQUFuQjtBQUNEO0FBTkksT0FBUDtBQVFEO0FBM0JJLEdBQVA7QUE2QkQ7O0FBQUEsQzs7Ozs7Ozs7Ozs7O0FDalNZOztBQUViOUcsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDO0FBR0FELE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0JnRixJQUFsQjs7QUFFQSxJQUFJQyxjQUFjLEdBQUc5RSxtQkFBTyxDQUFDLG9FQUFELENBQTVCOztBQUVBLElBQUkrRSxlQUFlLEdBQUc3RSxzQkFBc0IsQ0FBQzRFLGNBQUQsQ0FBNUM7O0FBRUEsU0FBUzVFLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLFNBQVNvRSxJQUFULEdBQWdCO0FBQ2QsTUFBSVQsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsTUFBSUcsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsTUFBSVMsYUFBYSxHQUFHLEVBQXBCO0FBQ0EsTUFBSUMsSUFBSSxHQUFHQyxhQUFhLEVBQXhCO0FBQ0EsTUFBSUMsR0FBRyxHQUFHLENBQVY7O0FBRUEsV0FBU0MsS0FBVCxHQUFpQjtBQUNmLFdBQU8sTUFBTSxFQUFFRCxHQUFmO0FBQ0Q7O0FBQUE7O0FBQ0QsV0FBU0UsV0FBVCxDQUFxQm5ELElBQXJCLEVBQTJCb0QsVUFBM0IsRUFBdUM7QUFDckNBLGNBQVUsQ0FBQ3JHLFVBQVgsQ0FBc0JpRCxJQUFJLENBQUNtQixPQUFMLENBQWFyRSxFQUFuQyxFQUF1Q2tELElBQUksQ0FBQ21CLE9BQUwsQ0FBYW5FLElBQWIsRUFBdkM7QUFDQWdELFFBQUksQ0FBQ21CLE9BQUwsR0FBZWlDLFVBQWY7QUFDQSxXQUFPcEQsSUFBUDtBQUNEOztBQUNELFdBQVNxRCxRQUFULENBQWtCQyxVQUFsQixFQUE4QkYsVUFBOUIsRUFBMEM7QUFDeEMsUUFBSUUsVUFBVSxJQUFJQSxVQUFVLENBQUNwSCxJQUFYLEtBQW9Ca0gsVUFBVSxDQUFDbEgsSUFBakQsRUFBdUQ7QUFDckQsYUFBTyxDQUFDLEdBQUcyRyxlQUFlLENBQUNsRixPQUFwQixFQUE2QjJGLFVBQVUsQ0FBQy9HLEtBQXhDLEVBQStDNkcsVUFBVSxDQUFDN0csS0FBMUQsQ0FBUDtBQUNEOztBQUNELFdBQU8sS0FBUDtBQUNEOztBQUNELFdBQVN5RyxhQUFULENBQXVCN0IsT0FBdkIsRUFBZ0NvQyxNQUFoQyxFQUF3QztBQUN0QyxRQUFJcEMsT0FBSixFQUFhO0FBQ1hBLGFBQU8sQ0FBQ3BFLFVBQVIsQ0FBbUJtRyxLQUFLLEVBQXhCO0FBQ0Q7O0FBQ0QsV0FBTztBQUNML0IsYUFBTyxFQUFFQSxPQURKO0FBRUwzRSxjQUFRLEVBQUUsRUFGTDtBQUdMK0csWUFBTSxFQUFFQSxNQUhIO0FBSUxDLFlBQU0sRUFBRSxDQUpIO0FBS0wvRixXQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtBQUN0QixZQUFJK0IsS0FBSyxHQUFHLElBQVo7O0FBRUEwQyxtQkFBVyxDQUFDdUIsT0FBWixDQUFvQixVQUFVQyxDQUFWLEVBQWE7QUFDL0IsaUJBQU9BLENBQUMsQ0FBQ2xFLEtBQUQsQ0FBUjtBQUNELFNBRkQ7QUFHRCxPQVhJO0FBWUw5QixTQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0FBQ2xCLFlBQUlpRyxNQUFNLEdBQUcsSUFBYixDQURrQixDQUdsQjs7O0FBQ0EsWUFBSSxLQUFLSCxNQUFMLEdBQWMsS0FBS2hILFFBQUwsQ0FBY1UsTUFBaEMsRUFBd0M7QUFDdEMsZUFBS1YsUUFBTCxDQUFjb0gsTUFBZCxDQUFxQixLQUFLSixNQUExQixFQUFrQyxLQUFLaEgsUUFBTCxDQUFjVSxNQUFkLEdBQXVCLEtBQUtzRyxNQUE5RCxFQUFzRUMsT0FBdEUsQ0FBOEUsVUFBVUksV0FBVixFQUF1QjtBQUNuRyxtQkFBT2YsYUFBYSxDQUFDVyxPQUFkLENBQXNCLFVBQVVDLENBQVYsRUFBYTtBQUN4QyxxQkFBT0EsQ0FBQyxDQUFDRyxXQUFELENBQVI7QUFDRCxhQUZNLENBQVA7QUFHRCxXQUpEO0FBS0Q7O0FBQ0QsYUFBS0wsTUFBTCxHQUFjLENBQWQ7QUFDQW5CLGlCQUFTLENBQUNvQixPQUFWLENBQWtCLFVBQVVDLENBQVYsRUFBYTtBQUM3QixpQkFBT0EsQ0FBQyxDQUFDQyxNQUFELENBQVI7QUFDRCxTQUZEO0FBR0QsT0EzQkk7QUE0Qkx0QyxrQkFBWSxFQUFFLFNBQVNBLFlBQVQsQ0FBc0IrQixVQUF0QixFQUFrQztBQUM5QyxZQUFJVSxNQUFNLEdBQUcsSUFBYjs7QUFFQSxZQUFJQyxTQUFTLEdBQUcsS0FBS3ZILFFBQUwsQ0FBYyxLQUFLZ0gsTUFBbkIsQ0FBaEIsQ0FIOEMsQ0FLOUM7O0FBQ0EsWUFBSU8sU0FBUyxJQUFJVixRQUFRLENBQUNVLFNBQVMsQ0FBQzVDLE9BQVgsRUFBb0JpQyxVQUFwQixDQUF6QixFQUEwRDtBQUN4RCxlQUFLSSxNQUFMLElBQWUsQ0FBZjtBQUNBLGlCQUFPTCxXQUFXLENBQUNZLFNBQUQsRUFBWVgsVUFBWixDQUFsQjtBQUNELFNBVDZDLENBVzlDOzs7QUFDQSxZQUFJWSxZQUFZLEdBQUdoQixhQUFhLENBQUNJLFVBQUQsRUFBYSxJQUFiLENBQWhDOztBQUVBLFlBQUksS0FBSzVHLFFBQUwsQ0FBYyxLQUFLZ0gsTUFBbkIsQ0FBSixFQUFnQztBQUM5QlYsdUJBQWEsQ0FBQ1csT0FBZCxDQUFzQixVQUFVQyxDQUFWLEVBQWE7QUFDakMsbUJBQU9BLENBQUMsQ0FBQ0ksTUFBTSxDQUFDdEgsUUFBUCxDQUFnQnNILE1BQU0sQ0FBQ04sTUFBdkIsQ0FBRCxDQUFSO0FBQ0QsV0FGRDtBQUdEOztBQUNELGFBQUtoSCxRQUFMLENBQWMsS0FBS2dILE1BQW5CLElBQTZCUSxZQUE3QjtBQUNBLGFBQUtSLE1BQUwsSUFBZSxDQUFmO0FBQ0EsZUFBT1EsWUFBUDtBQUNEO0FBbERJLEtBQVA7QUFvREQ7O0FBRUQsU0FBTztBQUNML0IsZUFBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJkLE9BQXJCLEVBQThCO0FBQ3pDLGFBQU80QixJQUFJLEdBQUdNLFFBQVEsQ0FBQ04sSUFBSSxDQUFDNUIsT0FBTixFQUFlQSxPQUFmLENBQVIsR0FBa0NnQyxXQUFXLENBQUNKLElBQUQsRUFBTzVCLE9BQVAsQ0FBN0MsR0FBK0Q2QixhQUFhLENBQUM3QixPQUFELENBQTFGO0FBQ0QsS0FISTtBQUlMc0IsU0FBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUI7QUFDdEJNLFVBQUksR0FBR0MsYUFBYSxFQUFwQjtBQUNBQyxTQUFHLEdBQUcsQ0FBTjtBQUNELEtBUEk7QUFRTGdCLG9CQUFnQixFQUFFLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU9oQixHQUFQO0FBQ0QsS0FWSTtBQVdMaUIsWUFBUSxFQUFFLFNBQVNBLFFBQVQsR0FBb0I7QUFDNUIsYUFBTyxTQUFTQyxRQUFULENBQWtCbkUsSUFBbEIsRUFBd0I7QUFDN0IsWUFBSW9FLEdBQUcsR0FBR25ILFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixDQUFuQixJQUF3QkQsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQkUsU0FBekMsR0FBcURGLFNBQVMsQ0FBQyxDQUFELENBQTlELEdBQW9FLENBQTlFLENBRDZCLENBRzdCOztBQUNBLGVBQU87QUFDTG1ILGFBQUcsRUFBRUEsR0FEQTtBQUVMbEksY0FBSSxFQUFFOEQsSUFBSSxDQUFDbUIsT0FBTCxDQUFhakYsSUFGZDtBQUdMYyxjQUFJLEVBQUVnRCxJQUFJLENBQUNtQixPQUFMLENBQWFuRSxJQUFiLEVBSEQ7QUFJTEYsWUFBRSxFQUFFa0QsSUFBSSxDQUFDbUIsT0FBTCxDQUFhckUsRUFKWjtBQUtMTixrQkFBUSxFQUFFd0QsSUFBSSxDQUFDeEQsUUFBTCxDQUFjNkgsR0FBZCxDQUFrQixVQUFVQyxLQUFWLEVBQWlCO0FBQzNDLG1CQUFPSCxRQUFRLENBQUNHLEtBQUQsRUFBUUYsR0FBRyxHQUFHLENBQWQsQ0FBZjtBQUNELFdBRlM7QUFMTCxTQUFQO0FBU0QsT0FiTSxDQWFMckIsSUFiSyxDQUFQO0FBY0QsS0ExQkk7QUEyQkxYLHdCQUFvQixFQUFFLFNBQVNBLG9CQUFULENBQThCRCxRQUE5QixFQUF3QztBQUM1REQsaUJBQVcsQ0FBQ1YsSUFBWixDQUFpQlcsUUFBakI7QUFDRCxLQTdCSTtBQThCTEcsc0JBQWtCLEVBQUUsU0FBU0Esa0JBQVQsQ0FBNEJILFFBQTVCLEVBQXNDO0FBQ3hERSxlQUFTLENBQUNiLElBQVYsQ0FBZVcsUUFBZjtBQUNELEtBaENJO0FBaUNMSSxnQkFBWSxFQUFFLFNBQVNBLFlBQVQsQ0FBc0JKLFFBQXRCLEVBQWdDO0FBQzVDVyxtQkFBYSxDQUFDdEIsSUFBZCxDQUFtQlcsUUFBbkI7QUFDRDtBQW5DSSxHQUFQO0FBcUNEO0FBQUM7OztBQUNGLEM7Ozs7Ozs7Ozs7OztBQ2xJYTs7QUFFYnZHLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJd0ksbUJBQW1CLEdBQUd6RyxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUkwRyxvQkFBb0IsR0FBR3hHLHNCQUFzQixDQUFDdUcsbUJBQUQsQ0FBakQ7O0FBRUEsU0FBU3ZHLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLElBQUlrRyxxQkFBcUIsR0FBRyxTQUFTQSxxQkFBVCxDQUErQkMsU0FBL0IsRUFBMEM7QUFDcEUsU0FBTyxZQUFZO0FBQ2pCLEtBQUMsR0FBR0Ysb0JBQW9CLENBQUM3RyxPQUF6QixFQUFrQytHLFNBQWxDO0FBRUEsUUFBSTFFLElBQUksR0FBRzBFLFNBQVMsQ0FBQzFFLElBQVYsRUFBWDtBQUVBQSxRQUFJLENBQUNtQixPQUFMLENBQWEzRCxrQ0FBYixDQUFnRCxLQUFoRDtBQUNBLFdBQU8sQ0FBQ3dDLElBQUksQ0FBQ1MsWUFBTixFQUFvQlQsSUFBSSxDQUFDbUIsT0FBTCxDQUFhM0UsUUFBakMsQ0FBUDtBQUNELEdBUEQ7QUFRRCxDQVREOztBQVdBVixPQUFPLENBQUM2QixPQUFSLEdBQWtCOEcscUJBQWxCLEM7Ozs7Ozs7Ozs7OztBQ3ZCYTs7QUFFYjdJLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJd0ksbUJBQW1CLEdBQUd6RyxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUkwRyxvQkFBb0IsR0FBR3hHLHNCQUFzQixDQUFDdUcsbUJBQUQsQ0FBakQ7O0FBRUEsU0FBU3ZHLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLElBQUlvRyxvQkFBb0IsR0FBRyxTQUFTQSxvQkFBVCxDQUE4QkQsU0FBOUIsRUFBeUM7QUFDbEUsU0FBTyxZQUFZO0FBQ2pCLEtBQUMsR0FBR0Ysb0JBQW9CLENBQUM3RyxPQUF6QixFQUFrQytHLFNBQWxDO0FBRUEsV0FBT0EsU0FBUyxDQUFDMUUsSUFBVixHQUFpQm1CLE9BQXhCO0FBQ0QsR0FKRDtBQUtELENBTkQ7O0FBUUFyRixPQUFPLENBQUM2QixPQUFSLEdBQWtCZ0gsb0JBQWxCLEM7Ozs7Ozs7Ozs7OztBQ3BCYTs7QUFFYi9JLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJd0ksbUJBQW1CLEdBQUd6RyxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUkwRyxvQkFBb0IsR0FBR3hHLHNCQUFzQixDQUFDdUcsbUJBQUQsQ0FBakQ7O0FBRUEsU0FBU3ZHLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLFNBQVNxRyxlQUFULENBQXlCckcsR0FBekIsRUFBOEJVLEdBQTlCLEVBQW1DbEQsS0FBbkMsRUFBMEM7QUFBRSxNQUFJa0QsR0FBRyxJQUFJVixHQUFYLEVBQWdCO0FBQUUzQyxVQUFNLENBQUNDLGNBQVAsQ0FBc0IwQyxHQUF0QixFQUEyQlUsR0FBM0IsRUFBZ0M7QUFBRWxELFdBQUssRUFBRUEsS0FBVDtBQUFnQjhJLGdCQUFVLEVBQUUsSUFBNUI7QUFBa0NDLGtCQUFZLEVBQUUsSUFBaEQ7QUFBc0RDLGNBQVEsRUFBRTtBQUFoRSxLQUFoQztBQUEwRyxHQUE1SCxNQUFrSTtBQUFFeEcsT0FBRyxDQUFDVSxHQUFELENBQUgsR0FBV2xELEtBQVg7QUFBbUI7O0FBQUMsU0FBT3dDLEdBQVA7QUFBYTtBQUFDOzs7QUFHbE4sSUFBSXlHLGdCQUFnQixHQUFHLFNBQVNBLGdCQUFULENBQTBCQyxPQUExQixFQUFtQztBQUN4RCxTQUFPLGdCQUFnQkEsT0FBdkI7QUFDRCxDQUZEOztBQUlBLElBQUlDLGNBQWMsR0FBRyxTQUFTQSxjQUFULENBQXdCQyxZQUF4QixFQUFzQ25GLElBQXRDLEVBQTRDb0YsUUFBNUMsRUFBc0Q7QUFDekUsTUFBSSxDQUFDcEYsSUFBTCxFQUFXO0FBQ1QsVUFBTW9GLFFBQVEsRUFBZDtBQUNEOztBQUNELE1BQUlDLE1BQU0sR0FBRyxLQUFLLENBQWxCOztBQUVBLE1BQUlyRixJQUFJLENBQUNtRixZQUFELENBQVIsRUFBd0I7QUFDdEJFLFVBQU0sR0FBR3JGLElBQVQ7QUFDRCxHQUZELE1BRU87QUFDTHFGLFVBQU0sR0FBR3JGLElBQUksQ0FBQ3hELFFBQUwsQ0FBYzhJLElBQWQsQ0FBbUIsVUFBVWhCLEtBQVYsRUFBaUI7QUFDM0MsYUFBTyxDQUFDLENBQUNBLEtBQUssQ0FBQ2EsWUFBRCxDQUFkO0FBQ0QsS0FGUSxDQUFUO0FBR0Q7O0FBQ0QsTUFBSUksT0FBTyxHQUFHRixNQUFNLEdBQUdBLE1BQU0sQ0FBQ0YsWUFBRCxDQUFOLEVBQUgsR0FBNEIsSUFBaEQ7O0FBRUEsTUFBSUksT0FBTyxLQUFLLElBQWhCLEVBQXNCO0FBQ3BCLFdBQU9BLE9BQU8sQ0FBQ3hKLEtBQWY7QUFDRDs7QUFDRCxTQUFPbUosY0FBYyxDQUFDQyxZQUFELEVBQWVuRixJQUFJLENBQUN1RCxNQUFwQixFQUE0QjZCLFFBQTVCLENBQXJCO0FBQ0QsQ0FuQkQ7O0FBcUJBLElBQUlJLGdCQUFnQixHQUFHLFNBQVNBLGdCQUFULENBQTBCUCxPQUExQixFQUFtQ2pGLElBQW5DLEVBQXlDO0FBQzlELE1BQUl5RixRQUFRLEdBQUcsU0FBU0EsUUFBVCxDQUFrQnpGLElBQWxCLEVBQXdCO0FBQ3JDLFFBQUkwRixLQUFLLEdBQUd6SSxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JELFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUJFLFNBQXpDLEdBQXFERixTQUFTLENBQUMsQ0FBRCxDQUE5RCxHQUFvRSxFQUFoRjtBQUVBeUksU0FBSyxDQUFDbEUsSUFBTixDQUFXeEIsSUFBSSxDQUFDbUIsT0FBTCxDQUFhakYsSUFBeEI7O0FBQ0EsUUFBSThELElBQUksQ0FBQ3VELE1BQVQsRUFBaUI7QUFDZixhQUFPa0MsUUFBUSxDQUFDekYsSUFBSSxDQUFDdUQsTUFBTixFQUFjbUMsS0FBZCxDQUFmO0FBQ0Q7O0FBQ0QsV0FBT0EsS0FBUDtBQUNELEdBUkQ7O0FBVUEsU0FBTyxJQUFJakosS0FBSixDQUFVLE1BQU13SSxPQUFOLEdBQWdCLHVCQUFoQixHQUEwQ2pGLElBQUksQ0FBQ21CLE9BQUwsQ0FBYWpGLElBQXZELEdBQThELGlDQUE5RCxHQUFrR3VKLFFBQVEsQ0FBQ3pGLElBQUQsQ0FBUixDQUFlMkYsT0FBZixHQUF5QnRCLEdBQXpCLENBQTZCLFVBQVVuSSxJQUFWLEVBQWdCO0FBQzlKLFdBQU8sUUFBUUEsSUFBUixHQUFlLEdBQXRCO0FBQ0QsR0FGa0gsRUFFaEgwSixJQUZnSCxDQUUzRyxJQUYyRyxDQUE1RyxDQUFQO0FBR0QsQ0FkRDs7QUFnQkEsSUFBSUMsb0JBQW9CLEdBQUcsU0FBU0Esb0JBQVQsQ0FBOEJuQixTQUE5QixFQUF5QztBQUNsRUEsV0FBUyxDQUFDeEMsV0FBVixDQUFzQixVQUFVbEMsSUFBVixFQUFnQjtBQUNwQyxRQUFJbUIsT0FBTyxHQUFHbkIsSUFBSSxDQUFDbUIsT0FBbkI7QUFDQSxRQUFJNUUsS0FBSyxHQUFHNEUsT0FBTyxDQUFDNUUsS0FBcEI7QUFFQSxRQUFJdUosU0FBUyxHQUFHdkosS0FBSyxHQUFHWCxNQUFNLENBQUNtSyxJQUFQLENBQVl4SixLQUFaLENBQUgsR0FBd0IsRUFBN0M7QUFFQXVKLGFBQVMsQ0FBQ3JDLE9BQVYsQ0FBa0IsVUFBVXVDLFFBQVYsRUFBb0I7QUFDcEMsVUFBSUEsUUFBUSxDQUFDQyxNQUFULENBQWdCLENBQWhCLE1BQXVCLEdBQTNCLEVBQWdDO0FBQzlCLFlBQUloQixPQUFPLEdBQUdlLFFBQVEsQ0FBQ0UsTUFBVCxDQUFnQixDQUFoQixFQUFtQkYsUUFBUSxDQUFDOUksTUFBNUIsQ0FBZDtBQUNBLFlBQUlpSixZQUFZLEdBQUdqQixjQUFjLENBQUNGLGdCQUFnQixDQUFDQyxPQUFELENBQWpCLEVBQTRCakYsSUFBSSxDQUFDdUQsTUFBakMsRUFBeUMsWUFBWTtBQUNwRixpQkFBT2lDLGdCQUFnQixDQUFDUCxPQUFELEVBQVVqRixJQUFWLENBQXZCO0FBQ0QsU0FGZ0MsQ0FBakM7QUFJQW1CLGVBQU8sQ0FBQy9ELFVBQVIsQ0FBbUJ3SCxlQUFlLENBQUMsRUFBRCxFQUFLSyxPQUFMLEVBQWNrQixZQUFkLENBQWxDO0FBQ0QsT0FQRCxNQU9PLElBQUlILFFBQVEsS0FBSyxTQUFqQixFQUE0QjtBQUNqQ2hHLFlBQUksQ0FBQ2dGLGdCQUFnQixDQUFDekksS0FBSyxDQUFDeUosUUFBRCxDQUFOLENBQWpCLENBQUosR0FBMEMsWUFBWTtBQUNwRCxpQkFBTztBQUFFakssaUJBQUssRUFBRWlFLElBQUksQ0FBQ29HO0FBQWQsV0FBUDtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBYkQ7QUFjRCxHQXBCRDtBQXNCQSxTQUFPLFVBQVVySyxLQUFWLEVBQWlCO0FBQ3RCLEtBQUMsR0FBR3lJLG9CQUFvQixDQUFDN0csT0FBekIsRUFBa0MrRyxTQUFsQztBQUNBLFFBQUkxRSxJQUFJLEdBQUcwRSxTQUFTLENBQUMxRSxJQUFWLEVBQVg7QUFFQUEsUUFBSSxDQUFDb0csU0FBTCxHQUFpQnJLLEtBQWpCO0FBQ0EsV0FBTyxDQUFDLFVBQVVzSyxRQUFWLEVBQW9CO0FBQzFCLGFBQU9yRyxJQUFJLENBQUNvRyxTQUFMLEdBQWlCQyxRQUF4QjtBQUNELEtBRk0sQ0FBUDtBQUdELEdBUkQ7QUFTRCxDQWhDRDs7QUFrQ0F2SyxPQUFPLENBQUM2QixPQUFSLEdBQWtCa0ksb0JBQWxCLEM7Ozs7Ozs7Ozs7OztBQzFGYTs7QUFFYmpLLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJdUssY0FBYyxHQUFHLFlBQVk7QUFBRSxXQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QjNGLENBQTVCLEVBQStCO0FBQUUsUUFBSTRGLElBQUksR0FBRyxFQUFYO0FBQWUsUUFBSUMsRUFBRSxHQUFHLElBQVQ7QUFBZSxRQUFJQyxFQUFFLEdBQUcsS0FBVDtBQUFnQixRQUFJQyxFQUFFLEdBQUd6SixTQUFUOztBQUFvQixRQUFJO0FBQUUsV0FBSyxJQUFJMEosRUFBRSxHQUFHTCxHQUFHLENBQUNNLE1BQU0sQ0FBQ0MsUUFBUixDQUFILEVBQVQsRUFBaUNDLEVBQXRDLEVBQTBDLEVBQUVOLEVBQUUsR0FBRyxDQUFDTSxFQUFFLEdBQUdILEVBQUUsQ0FBQ3RHLElBQUgsRUFBTixFQUFpQmxCLElBQXhCLENBQTFDLEVBQXlFcUgsRUFBRSxHQUFHLElBQTlFLEVBQW9GO0FBQUVELFlBQUksQ0FBQ2pGLElBQUwsQ0FBVXdGLEVBQUUsQ0FBQ2pMLEtBQWI7O0FBQXFCLFlBQUk4RSxDQUFDLElBQUk0RixJQUFJLENBQUN2SixNQUFMLEtBQWdCMkQsQ0FBekIsRUFBNEI7QUFBUTtBQUFFLEtBQXZKLENBQXdKLE9BQU90QixHQUFQLEVBQVk7QUFBRW9ILFFBQUUsR0FBRyxJQUFMO0FBQVdDLFFBQUUsR0FBR3JILEdBQUw7QUFBVyxLQUE1TCxTQUFxTTtBQUFFLFVBQUk7QUFBRSxZQUFJLENBQUNtSCxFQUFELElBQU9HLEVBQUUsQ0FBQyxRQUFELENBQWIsRUFBeUJBLEVBQUUsQ0FBQyxRQUFELENBQUY7QUFBaUIsT0FBaEQsU0FBeUQ7QUFBRSxZQUFJRixFQUFKLEVBQVEsTUFBTUMsRUFBTjtBQUFXO0FBQUU7O0FBQUMsV0FBT0gsSUFBUDtBQUFjOztBQUFDLFNBQU8sVUFBVUQsR0FBVixFQUFlM0YsQ0FBZixFQUFrQjtBQUFFLFFBQUlvRyxLQUFLLENBQUNDLE9BQU4sQ0FBY1YsR0FBZCxDQUFKLEVBQXdCO0FBQUUsYUFBT0EsR0FBUDtBQUFhLEtBQXZDLE1BQTZDLElBQUlNLE1BQU0sQ0FBQ0MsUUFBUCxJQUFtQm5MLE1BQU0sQ0FBQzRLLEdBQUQsQ0FBN0IsRUFBb0M7QUFBRSxhQUFPRCxhQUFhLENBQUNDLEdBQUQsRUFBTTNGLENBQU4sQ0FBcEI7QUFBK0IsS0FBckUsTUFBMkU7QUFBRSxZQUFNLElBQUlzRyxTQUFKLENBQWMsc0RBQWQsQ0FBTjtBQUE4RTtBQUFFLEdBQXJPO0FBQXdPLENBQWhvQixFQUFyQjs7QUFFQXJMLE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0J5SixtQkFBbEI7O0FBRUEsSUFBSTdDLG1CQUFtQixHQUFHekcsbUJBQU8sQ0FBQywrRUFBRCxDQUFqQzs7QUFFQSxJQUFJMEcsb0JBQW9CLEdBQUd4RyxzQkFBc0IsQ0FBQ3VHLG1CQUFELENBQWpEOztBQUVBLFNBQVN2RyxzQkFBVCxDQUFnQ08sR0FBaEMsRUFBcUM7QUFBRSxTQUFPQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsVUFBWCxHQUF3QkQsR0FBeEIsR0FBOEI7QUFBRVosV0FBTyxFQUFFWTtBQUFYLEdBQXJDO0FBQXdEOztBQUUvRixJQUFJOEksV0FBVyxHQUFHLEVBQWxCOztBQUVBLFNBQVNDLHNCQUFULENBQWdDQyxTQUFoQyxFQUEyQ0MsV0FBM0MsRUFBd0Q7QUFDdEQsU0FBTyxVQUFVNUgsSUFBVixFQUFnQjtBQUNyQixRQUFJNkgsSUFBSSxHQUFHN0gsSUFBSSxDQUFDNkgsSUFBaEI7O0FBRUEsUUFBSUMsWUFBWSxHQUFHRixXQUFXLEVBQTlCO0FBQUEsUUFDSUcsYUFBYSxHQUFHckIsY0FBYyxDQUFDb0IsWUFBRCxFQUFlLENBQWYsQ0FEbEM7QUFBQSxRQUVJbEwsUUFBUSxHQUFHbUwsYUFBYSxDQUFDLENBQUQsQ0FGNUI7O0FBSUFKLGFBQVMsQ0FBQ0UsSUFBRCxFQUFPLFVBQVVHLE9BQVYsRUFBbUI7QUFDakMsYUFBT3BMLFFBQVEsQ0FBQztBQUFFb0wsZUFBTyxFQUFFQTtBQUFYLE9BQUQsQ0FBZjtBQUNELEtBRlEsQ0FBVDtBQUdELEdBVkQ7QUFXRDs7QUFBQTs7QUFDRCxTQUFTQyxvQkFBVCxDQUE4QkMsT0FBOUIsRUFBdUM7QUFDckMsU0FBTyxVQUFVcEgsS0FBVixFQUFpQjtBQUN0QixRQUFJK0csSUFBSSxHQUFHL0csS0FBSyxDQUFDK0csSUFBakI7QUFBQSxRQUNJRyxPQUFPLEdBQUdsSCxLQUFLLENBQUNrSCxPQURwQjtBQUdBRSxXQUFPLENBQUNMLElBQUQsRUFBT0csT0FBUCxDQUFQO0FBQ0QsR0FMRDtBQU1EOztBQUVELElBQUlMLFNBQVMsR0FBRyxTQUFTQSxTQUFULENBQW1CcEcsT0FBbkIsRUFBNEJzRyxJQUE1QixFQUFrQ3RGLFFBQWxDLEVBQTRDO0FBQzFELE1BQUksQ0FBQ2tGLFdBQVcsQ0FBQ0ksSUFBRCxDQUFoQixFQUF3QkosV0FBVyxDQUFDSSxJQUFELENBQVgsR0FBb0IsRUFBcEI7QUFDeEJKLGFBQVcsQ0FBQ0ksSUFBRCxDQUFYLENBQWtCdEcsT0FBTyxDQUFDckUsRUFBMUIsSUFBZ0NxRixRQUFoQztBQUNBLFNBQU8sWUFBWTtBQUNqQixXQUFPa0YsV0FBVyxDQUFDSSxJQUFELENBQVgsQ0FBa0J0RyxPQUFPLENBQUNyRSxFQUExQixDQUFQO0FBQ0QsR0FGRDtBQUdELENBTkQ7O0FBT0EsSUFBSWdMLE9BQU8sR0FBRyxTQUFTQSxPQUFULENBQWlCTCxJQUFqQixFQUF1QkcsT0FBdkIsRUFBZ0M7QUFDNUMsTUFBSSxDQUFDUCxXQUFXLENBQUNJLElBQUQsQ0FBaEIsRUFBd0I7QUFDeEI3TCxRQUFNLENBQUNtSyxJQUFQLENBQVlzQixXQUFXLENBQUNJLElBQUQsQ0FBdkIsRUFBK0JoRSxPQUEvQixDQUF1QyxVQUFVM0csRUFBVixFQUFjO0FBQ25EdUssZUFBVyxDQUFDSSxJQUFELENBQVgsQ0FBa0IzSyxFQUFsQixFQUFzQjhLLE9BQXRCO0FBQ0QsR0FGRDtBQUdELENBTEQ7O0FBT0EsU0FBU1IsbUJBQVQsQ0FBNkIxQyxTQUE3QixFQUF3QzhDLFdBQXhDLEVBQXFEO0FBQ25EOUMsV0FBUyxDQUFDbkMsWUFBVixDQUF1QixVQUFVdkMsSUFBVixFQUFnQjtBQUNyQ3BFLFVBQU0sQ0FBQ21LLElBQVAsQ0FBWXNCLFdBQVosRUFBeUI1RCxPQUF6QixDQUFpQyxVQUFVZ0UsSUFBVixFQUFnQjtBQUMvQyxVQUFJSixXQUFXLENBQUNJLElBQUQsQ0FBWCxDQUFrQnpILElBQUksQ0FBQ21CLE9BQUwsQ0FBYXJFLEVBQS9CLENBQUosRUFBd0M7QUFDdEMsZUFBT3VLLFdBQVcsQ0FBQ0ksSUFBRCxDQUFYLENBQWtCekgsSUFBSSxDQUFDbUIsT0FBTCxDQUFhckUsRUFBL0IsQ0FBUDtBQUNEO0FBQ0YsS0FKRDtBQUtELEdBTkQ7QUFPQSxTQUFPLFVBQVVpTCxhQUFWLEVBQXlCO0FBQzlCLEtBQUMsR0FBR3ZELG9CQUFvQixDQUFDN0csT0FBekIsRUFBa0MrRyxTQUFsQztBQUVBLFFBQUkxRSxJQUFJLEdBQUcwRSxTQUFTLENBQUMxRSxJQUFWLEVBQVg7QUFDQSxRQUFJZ0ksRUFBRSxHQUFHRCxhQUFhLElBQUkvSCxJQUFJLENBQUNtQixPQUEvQjs7QUFDQSxRQUFJOEcsYUFBYSxHQUFHLFNBQVNBLGFBQVQsR0FBeUI7QUFDM0MsV0FBSyxJQUFJQyxJQUFJLEdBQUdqTCxTQUFTLENBQUNDLE1BQXJCLEVBQTZCaUwsTUFBTSxHQUFHbEIsS0FBSyxDQUFDaUIsSUFBRCxDQUEzQyxFQUFtREUsSUFBSSxHQUFHLENBQS9ELEVBQWtFQSxJQUFJLEdBQUdGLElBQXpFLEVBQStFRSxJQUFJLEVBQW5GLEVBQXVGO0FBQ3JGRCxjQUFNLENBQUNDLElBQUQsQ0FBTixHQUFlbkwsU0FBUyxDQUFDbUwsSUFBRCxDQUF4QjtBQUNEOztBQUVELGFBQU9iLFNBQVMsQ0FBQzNJLEtBQVYsQ0FBZ0J6QixTQUFoQixFQUEyQixDQUFDNkssRUFBRCxFQUFLSyxNQUFMLENBQVlGLE1BQVosQ0FBM0IsQ0FBUDtBQUNELEtBTkQ7O0FBT0EsUUFBSUcsV0FBVyxHQUFHLFNBQVNBLFdBQVQsR0FBdUI7QUFDdkMsYUFBT1IsT0FBTyxDQUFDbEosS0FBUixDQUFjekIsU0FBZCxFQUF5QkYsU0FBekIsQ0FBUDtBQUNELEtBRkQ7O0FBSUEsV0FBTztBQUNMc0ssZUFBUyxFQUFFVSxhQUROO0FBRUxILGFBQU8sRUFBRVEsV0FGSjtBQUdMakIsaUJBQVcsRUFBRUEsV0FIUjtBQUlMa0IsZUFBUyxFQUFFakIsc0JBQXNCLENBQUNXLGFBQUQsRUFBZ0JULFdBQWhCLENBSjVCO0FBS0xnQixhQUFPLEVBQUVYLG9CQUFvQixDQUFDUyxXQUFEO0FBTHhCLEtBQVA7QUFPRCxHQXZCRDtBQXdCRDs7QUFFRGxCLG1CQUFtQixDQUFDMUUsS0FBcEIsR0FBNEIsWUFBWTtBQUN0QzJFLGFBQVcsR0FBRyxFQUFkO0FBQ0QsQ0FGRCxDOzs7Ozs7Ozs7Ozs7QUN4RmE7O0FBRWJ6TCxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSXVLLGNBQWMsR0FBRyxZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEIzRixDQUE1QixFQUErQjtBQUFFLFFBQUk0RixJQUFJLEdBQUcsRUFBWDtBQUFlLFFBQUlDLEVBQUUsR0FBRyxJQUFUO0FBQWUsUUFBSUMsRUFBRSxHQUFHLEtBQVQ7QUFBZ0IsUUFBSUMsRUFBRSxHQUFHekosU0FBVDs7QUFBb0IsUUFBSTtBQUFFLFdBQUssSUFBSTBKLEVBQUUsR0FBR0wsR0FBRyxDQUFDTSxNQUFNLENBQUNDLFFBQVIsQ0FBSCxFQUFULEVBQWlDQyxFQUF0QyxFQUEwQyxFQUFFTixFQUFFLEdBQUcsQ0FBQ00sRUFBRSxHQUFHSCxFQUFFLENBQUN0RyxJQUFILEVBQU4sRUFBaUJsQixJQUF4QixDQUExQyxFQUF5RXFILEVBQUUsR0FBRyxJQUE5RSxFQUFvRjtBQUFFRCxZQUFJLENBQUNqRixJQUFMLENBQVV3RixFQUFFLENBQUNqTCxLQUFiOztBQUFxQixZQUFJOEUsQ0FBQyxJQUFJNEYsSUFBSSxDQUFDdkosTUFBTCxLQUFnQjJELENBQXpCLEVBQTRCO0FBQVE7QUFBRSxLQUF2SixDQUF3SixPQUFPdEIsR0FBUCxFQUFZO0FBQUVvSCxRQUFFLEdBQUcsSUFBTDtBQUFXQyxRQUFFLEdBQUdySCxHQUFMO0FBQVcsS0FBNUwsU0FBcU07QUFBRSxVQUFJO0FBQUUsWUFBSSxDQUFDbUgsRUFBRCxJQUFPRyxFQUFFLENBQUMsUUFBRCxDQUFiLEVBQXlCQSxFQUFFLENBQUMsUUFBRCxDQUFGO0FBQWlCLE9BQWhELFNBQXlEO0FBQUUsWUFBSUYsRUFBSixFQUFRLE1BQU1DLEVBQU47QUFBVztBQUFFOztBQUFDLFdBQU9ILElBQVA7QUFBYzs7QUFBQyxTQUFPLFVBQVVELEdBQVYsRUFBZTNGLENBQWYsRUFBa0I7QUFBRSxRQUFJb0csS0FBSyxDQUFDQyxPQUFOLENBQWNWLEdBQWQsQ0FBSixFQUF3QjtBQUFFLGFBQU9BLEdBQVA7QUFBYSxLQUF2QyxNQUE2QyxJQUFJTSxNQUFNLENBQUNDLFFBQVAsSUFBbUJuTCxNQUFNLENBQUM0SyxHQUFELENBQTdCLEVBQW9DO0FBQUUsYUFBT0QsYUFBYSxDQUFDQyxHQUFELEVBQU0zRixDQUFOLENBQXBCO0FBQStCLEtBQXJFLE1BQTJFO0FBQUUsWUFBTSxJQUFJc0csU0FBSixDQUFjLHNEQUFkLENBQU47QUFBOEU7QUFBRSxHQUFyTztBQUF3TyxDQUFob0IsRUFBckI7O0FBRUFyTCxPQUFPLENBQUM2QixPQUFSLEdBQWtCOEssb0JBQWxCOztBQUVBLFNBQVNDLHdCQUFULENBQWtDbkssR0FBbEMsRUFBdUN3SCxJQUF2QyxFQUE2QztBQUFFLE1BQUk0QyxNQUFNLEdBQUcsRUFBYjs7QUFBaUIsT0FBSyxJQUFJOUgsQ0FBVCxJQUFjdEMsR0FBZCxFQUFtQjtBQUFFLFFBQUl3SCxJQUFJLENBQUM2QyxPQUFMLENBQWEvSCxDQUFiLEtBQW1CLENBQXZCLEVBQTBCO0FBQVUsUUFBSSxDQUFDakYsTUFBTSxDQUFDaU4sU0FBUCxDQUFpQkMsY0FBakIsQ0FBZ0NySCxJQUFoQyxDQUFxQ2xELEdBQXJDLEVBQTBDc0MsQ0FBMUMsQ0FBTCxFQUFtRDtBQUFVOEgsVUFBTSxDQUFDOUgsQ0FBRCxDQUFOLEdBQVl0QyxHQUFHLENBQUNzQyxDQUFELENBQWY7QUFBcUI7O0FBQUMsU0FBTzhILE1BQVA7QUFBZ0I7O0FBRTVOLFNBQVNJLHFCQUFULENBQStCQyxRQUEvQixFQUF5QztBQUN2QyxTQUFPLFVBQVVwSixJQUFWLEVBQWdCO0FBQ3JCLFFBQUlxSixNQUFNLEdBQUdySixJQUFJLENBQUNxSixNQUFsQjtBQUFBLFFBQ0lDLGFBQWEsR0FBR3RKLElBQUksQ0FBQ3NKLGFBRHpCO0FBQUEsUUFFSUMsSUFBSSxHQUFHVCx3QkFBd0IsQ0FBQzlJLElBQUQsRUFBTyxDQUFDLFFBQUQsRUFBVyxlQUFYLENBQVAsQ0FGbkM7O0FBSUEsUUFBSXFKLE1BQUosRUFBWTtBQUNWRCxjQUFRLENBQUNDLE1BQUQsQ0FBUjtBQUNELEtBRkQsTUFFTyxJQUFJQyxhQUFKLEVBQW1CO0FBQ3hCRixjQUFRLENBQUNFLGFBQWEsQ0FBQ0MsSUFBRCxDQUFkLENBQVI7QUFDRCxLQUZNLE1BRUE7QUFDTCxZQUFNLElBQUkxTSxLQUFKLENBQVUsc0RBQVYsQ0FBTjtBQUNEO0FBQ0YsR0FaRDtBQWFEOztBQUVELFNBQVNnTSxvQkFBVCxDQUE4QlcsUUFBOUIsRUFBd0M7QUFDdEMsU0FBTyxVQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQztBQUN0QyxRQUFJakwsU0FBUyxHQUFHK0ssUUFBUSxDQUFDRSxZQUFELENBQXhCO0FBQUEsUUFDSWhMLFVBQVUsR0FBR2dJLGNBQWMsQ0FBQ2pJLFNBQUQsRUFBWSxDQUFaLENBRC9CO0FBQUEsUUFFSWtMLEtBQUssR0FBR2pMLFVBQVUsQ0FBQyxDQUFELENBRnRCO0FBQUEsUUFHSWtMLFFBQVEsR0FBR2xMLFVBQVUsQ0FBQyxDQUFELENBSHpCO0FBQUEsUUFJSW1MLFFBQVEsR0FBR25MLFVBQVUsQ0FBQyxDQUFELENBSnpCOztBQU1BLFFBQUkwSyxRQUFRLEdBQUcsU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7QUFDdkMsYUFBT08sUUFBUSxDQUFDSCxPQUFPLENBQUNJLFFBQVEsRUFBVCxFQUFhUixNQUFiLENBQVIsQ0FBZjtBQUNELEtBRkQ7O0FBSUEsV0FBTyxDQUFDTSxLQUFELEVBQVFQLFFBQVIsRUFBa0JELHFCQUFxQixDQUFDQyxRQUFELENBQXZDLEVBQW1EO0FBQzFELGdCQUFZO0FBQ1YsYUFBT1MsUUFBUSxFQUFmO0FBQ0QsS0FITSxDQUdMO0FBSEssS0FBUDtBQUtELEdBaEJEO0FBaUJELEM7Ozs7Ozs7Ozs7OztBQzlDWTs7QUFFYjdOLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCK0wsa0JBQWxCOztBQUVBLElBQUluRixtQkFBbUIsR0FBR3pHLG1CQUFPLENBQUMsK0VBQUQsQ0FBakM7O0FBRUEsSUFBSTBHLG9CQUFvQixHQUFHeEcsc0JBQXNCLENBQUN1RyxtQkFBRCxDQUFqRDs7QUFFQSxTQUFTdkcsc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsSUFBSW9MLE9BQU8sR0FBRztBQUNaQyxVQUFRLEVBQUUsRUFERTtBQUVaQyxLQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhMUksT0FBYixFQUFzQjtBQUN6QixRQUFJLEtBQUt5SSxRQUFMLENBQWN6SSxPQUFPLENBQUNyRSxFQUF0QixDQUFKLEVBQStCO0FBQzdCLGFBQU8sS0FBSzhNLFFBQUwsQ0FBY3pJLE9BQU8sQ0FBQ3JFLEVBQXRCLENBQVA7QUFDRDs7QUFDRCxXQUFPLEtBQUs4TSxRQUFMLENBQWN6SSxPQUFPLENBQUNyRSxFQUF0QixJQUE0QjtBQUFFZ04sWUFBTSxFQUFFLEVBQVY7QUFBY0MsY0FBUSxFQUFFO0FBQXhCLEtBQW5DO0FBQ0QsR0FQVztBQVFaQyxTQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQmxOLEVBQWpCLEVBQXFCO0FBQzVCLFFBQUksS0FBSzhNLFFBQUwsQ0FBYzlNLEVBQWQsQ0FBSixFQUF1QjtBQUNyQixhQUFPLEtBQUs4TSxRQUFMLENBQWM5TSxFQUFkLENBQVA7QUFDRDtBQUNGO0FBWlcsQ0FBZDtBQWFHOztBQUNILFNBQVM0TSxrQkFBVCxDQUE0QmhGLFNBQTVCLEVBQXVDO0FBQ3JDQSxXQUFTLENBQUNuQyxZQUFWLENBQXVCLFVBQVV2QyxJQUFWLEVBQWdCO0FBQ3JDLFdBQU8ySixPQUFPLENBQUNLLE9BQVIsQ0FBZ0JoSyxJQUFJLENBQUNtQixPQUFMLENBQWFyRSxFQUE3QixDQUFQO0FBQ0QsR0FGRDtBQUdBLFNBQU8sVUFBVXdNLFlBQVYsRUFBd0I7QUFDN0IsS0FBQyxHQUFHOUUsb0JBQW9CLENBQUM3RyxPQUF6QixFQUFrQytHLFNBQWxDO0FBRUEsUUFBSTFFLElBQUksR0FBRzBFLFNBQVMsQ0FBQzFFLElBQVYsRUFBWDtBQUNBLFFBQUltQixPQUFPLEdBQUduQixJQUFJLENBQUNtQixPQUFuQjtBQUVBLFFBQUk4SSxPQUFPLEdBQUdOLE9BQU8sQ0FBQ0UsR0FBUixDQUFZMUksT0FBWixDQUFkO0FBRUEsUUFBSStJLEtBQUssR0FBRyxLQUFLLENBQWpCLENBUjZCLENBVTdCOztBQUNBLFFBQUkvSSxPQUFPLENBQUNuRSxJQUFSLE9BQW1CLENBQXZCLEVBQTBCO0FBQ3hCaU4sYUFBTyxDQUFDSCxNQUFSLENBQWV0SSxJQUFmLENBQW9COEgsWUFBcEI7QUFDQVksV0FBSyxHQUFHRCxPQUFPLENBQUNILE1BQVIsQ0FBZTVNLE1BQWYsR0FBd0IsQ0FBaEMsQ0FGd0IsQ0FJeEI7QUFDRCxLQUxELE1BS087QUFDTGdOLFdBQUssR0FBR0QsT0FBTyxDQUFDRixRQUFoQjtBQUNBRSxhQUFPLENBQUNGLFFBQVIsR0FBbUJHLEtBQUssR0FBR0QsT0FBTyxDQUFDSCxNQUFSLENBQWU1TSxNQUFmLEdBQXdCLENBQWhDLEdBQW9DK00sT0FBTyxDQUFDRixRQUFSLEdBQW1CLENBQXZELEdBQTJELENBQTlFO0FBQ0Q7O0FBRUQsV0FBTyxDQUFDRSxPQUFPLENBQUNILE1BQVIsQ0FBZUksS0FBZixDQUFELEVBQXdCLFVBQVVDLFFBQVYsRUFBb0I7QUFDakRGLGFBQU8sQ0FBQ0gsTUFBUixDQUFlSSxLQUFmLElBQXdCQyxRQUF4Qjs7QUFDQSxVQUFJLENBQUNoSixPQUFPLENBQUM1RCxTQUFSLEVBQUwsRUFBMEI7QUFDeEJ5QyxZQUFJLENBQUNRLEtBQUw7QUFDRDs7QUFDRCxhQUFPMkosUUFBUDtBQUNELEtBTk0sRUFNSixZQUFZO0FBQ2IsYUFBT0YsT0FBTyxDQUFDSCxNQUFSLENBQWVJLEtBQWYsQ0FBUDtBQUNELEtBUk0sQ0FBUDtBQVNELEdBOUJEO0FBK0JEOztBQUVEUixrQkFBa0IsQ0FBQ2hILEtBQW5CLEdBQTJCLFlBQVk7QUFDckNpSCxTQUFPLENBQUNDLFFBQVIsR0FBbUIsRUFBbkI7QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7OztBQ2hFYTs7QUFFYmhPLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCeU0sa0JBQWxCOztBQUNBLFNBQVNBLGtCQUFULENBQTRCMUYsU0FBNUIsRUFBdUM7QUFDckMsTUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2QsVUFBTSxJQUFJakksS0FBSixDQUFVLDZGQUFWLENBQU47QUFDRDs7QUFDRCxNQUFJLENBQUNpSSxTQUFTLENBQUMxRSxJQUFWLEVBQUwsRUFBdUI7QUFDckIsVUFBTSxJQUFJdkQsS0FBSixDQUFVLDBEQUFWLENBQU47QUFDRDtBQUNGOztBQUFBLEM7Ozs7Ozs7Ozs7OztBQ2JZOztBQUViYixNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7QUFHQUQsT0FBTyxDQUFDdU8sY0FBUixHQUF5QkEsY0FBekI7O0FBRUEsSUFBSUMsVUFBVSxHQUFHeE0sbUJBQU8sQ0FBQywyQ0FBRCxDQUF4Qjs7QUFFQSxJQUFJeU0sV0FBVyxHQUFHdk0sc0JBQXNCLENBQUNzTSxVQUFELENBQXhDOztBQUVBLElBQUl6TSxlQUFlLEdBQUdDLG1CQUFPLENBQUMsaUVBQUQsQ0FBN0I7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUdDLHNCQUFzQixDQUFDSCxlQUFELENBQTdDOztBQUVBLElBQUkyTSxXQUFXLEdBQUcxTSxtQkFBTyxDQUFDLDZDQUFELENBQXpCOztBQUVBLElBQUkyTSxZQUFZLEdBQUd6TSxzQkFBc0IsQ0FBQ3dNLFdBQUQsQ0FBekM7O0FBRUEsSUFBSTlDLFlBQVksR0FBRzVKLG1CQUFPLENBQUMsMkRBQUQsQ0FBMUI7O0FBRUEsSUFBSTZKLGFBQWEsR0FBRzNKLHNCQUFzQixDQUFDMEosWUFBRCxDQUExQzs7QUFFQSxJQUFJZ0QsV0FBVyxHQUFHNU0sbUJBQU8sQ0FBQyx5REFBRCxDQUF6Qjs7QUFFQSxJQUFJNk0sWUFBWSxHQUFHM00sc0JBQXNCLENBQUMwTSxXQUFELENBQXpDOztBQUVBLElBQUlFLFdBQVcsR0FBRzlNLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsSUFBSStNLFlBQVksR0FBRzdNLHNCQUFzQixDQUFDNE0sV0FBRCxDQUF6Qzs7QUFFQSxJQUFJek0sVUFBVSxHQUFHTCxtQkFBTyxDQUFDLHVEQUFELENBQXhCOztBQUVBLElBQUlNLFdBQVcsR0FBR0osc0JBQXNCLENBQUNHLFVBQUQsQ0FBeEM7O0FBRUEsSUFBSUUsU0FBUyxHQUFHUCxtQkFBTyxDQUFDLHFEQUFELENBQXZCOztBQUVBLElBQUlRLFVBQVUsR0FBR04sc0JBQXNCLENBQUNLLFNBQUQsQ0FBdkM7O0FBRUEsSUFBSXlNLFdBQVcsR0FBR2hOLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsSUFBSWlOLFlBQVksR0FBRy9NLHNCQUFzQixDQUFDOE0sV0FBRCxDQUF6Qzs7QUFFQSxTQUFTOU0sc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsU0FBUzhMLGNBQVQsR0FBMEI7QUFDeEIsTUFBSTNGLFNBQVMsR0FBRyxDQUFDLEdBQUc2RixXQUFXLENBQUM1TSxPQUFoQixHQUFoQjs7QUFFQSxXQUFTcU4sQ0FBVCxDQUFXL08sSUFBWCxFQUFpQk0sS0FBakIsRUFBd0I7QUFDdEIsU0FBSyxJQUFJMkwsSUFBSSxHQUFHakwsU0FBUyxDQUFDQyxNQUFyQixFQUE2QlYsUUFBUSxHQUFHeUssS0FBSyxDQUFDaUIsSUFBSSxHQUFHLENBQVAsR0FBV0EsSUFBSSxHQUFHLENBQWxCLEdBQXNCLENBQXZCLENBQTdDLEVBQXdFRSxJQUFJLEdBQUcsQ0FBcEYsRUFBdUZBLElBQUksR0FBR0YsSUFBOUYsRUFBb0dFLElBQUksRUFBeEcsRUFBNEc7QUFDMUc1TCxjQUFRLENBQUM0TCxJQUFJLEdBQUcsQ0FBUixDQUFSLEdBQXFCbkwsU0FBUyxDQUFDbUwsSUFBRCxDQUE5QjtBQUNEOztBQUVELFdBQU8sQ0FBQyxHQUFHcUMsWUFBWSxDQUFDOU0sT0FBakIsRUFBMEIxQixJQUExQixFQUFnQ00sS0FBaEMsRUFBdUNDLFFBQXZDLENBQVA7QUFDRDs7QUFDRCxXQUFTdUYsR0FBVCxDQUFhWixPQUFiLEVBQXNCO0FBQ3BCLFFBQUksQ0FBQyxDQUFDLEdBQUdwRCxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJ3RCxPQUE5QixDQUFMLEVBQTZDO0FBQzNDLFlBQU0sSUFBSTFFLEtBQUosQ0FBVSxxQ0FBcUMwRSxPQUFPLENBQUM5RSxRQUFSLEVBQXJDLEdBQTBELFVBQXBFLENBQU47QUFDRDs7QUFDRCxXQUFPcUksU0FBUyxDQUFDM0MsR0FBVixDQUFjWixPQUFkLENBQVA7QUFDRDs7QUFDRCxNQUFJOEosUUFBUSxHQUFHLFNBQVNBLFFBQVQsR0FBb0IsQ0FBRSxDQUFyQzs7QUFDQSxNQUFJekQsV0FBVyxHQUFHLENBQUMsR0FBR0csYUFBYSxDQUFDaEssT0FBbEIsRUFBMkIrRyxTQUEzQixDQUFsQjtBQUNBLE1BQUl3RyxVQUFVLEdBQUcsQ0FBQyxHQUFHUCxZQUFZLENBQUNoTixPQUFqQixFQUEwQitHLFNBQTFCLENBQWpCO0FBQ0EsTUFBSTBFLFFBQVEsR0FBRyxDQUFDLEdBQUc5SyxVQUFVLENBQUNYLE9BQWYsRUFBd0IrRyxTQUF4QixDQUFmO0FBQ0EsTUFBSXlHLFVBQVUsR0FBRyxDQUFDLEdBQUdOLFlBQVksQ0FBQ2xOLE9BQWpCLEVBQTBCK0csU0FBMUIsRUFBcUMwRSxRQUFyQyxDQUFqQjtBQUNBLE1BQUlnQyxTQUFTLEdBQUcsQ0FBQyxHQUFHaE4sV0FBVyxDQUFDVCxPQUFoQixFQUF5QitHLFNBQXpCLEVBQW9DOEMsV0FBcEMsQ0FBaEI7QUFDQSxNQUFJNkQsVUFBVSxHQUFHLENBQUMsR0FBR04sWUFBWSxDQUFDcE4sT0FBakIsRUFBMEJ5TCxRQUExQixDQUFqQjtBQUVBLFNBQU87QUFDTDRCLEtBQUMsRUFBRUEsQ0FERTtBQUVMakosT0FBRyxFQUFFQSxHQUZBO0FBR0xrSixZQUFRLEVBQUVBLFFBSEw7QUFJTHZHLGFBQVMsRUFBRUEsU0FKTjtBQUtMOEMsZUFBVyxFQUFFQSxXQUxSO0FBTUwwRCxjQUFVLEVBQUVBLFVBTlA7QUFPTEMsY0FBVSxFQUFFQSxVQVBQO0FBUUxDLGFBQVMsRUFBRUEsU0FSTjtBQVNMaEMsWUFBUSxFQUFFQSxRQVRMO0FBVUxpQyxjQUFVLEVBQUVBO0FBVlAsR0FBUDtBQVlEOztBQUVELElBQUlDLFFBQVEsR0FBR2pCLGNBQWMsRUFBN0I7QUFFQWtCLE1BQU0sQ0FBQ3pQLE9BQVAsR0FBaUJ3UCxRQUFqQjtBQUNBQyxNQUFNLENBQUN6UCxPQUFQLENBQWV1TyxjQUFmLEdBQWdDQSxjQUFjLEVBQTlDLEM7Ozs7Ozs7Ozs7OztBQ3RGYTs7QUFFYnpPLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCNk4sY0FBbEI7O0FBQ0EsU0FBU0EsY0FBVCxDQUF3QnJLLE9BQXhCLEVBQWlDO0FBQy9CLFNBQU9BLE9BQU8sSUFBSUEsT0FBTyxDQUFDekUsT0FBUixLQUFvQixJQUF0QztBQUNEOztBQUFBLEM7Ozs7Ozs7Ozs7OztBQ1JZOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixXQUFXO0FBQy9COztBQUVBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3REQTtBQUNBO0FBQ0E7O0FBRUEsaUM7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBLGlEQUFpRCxnQkFBZ0I7QUFDakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQzs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7O0FBRUEsa0M7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QywrQkFBK0I7QUFDNUU7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUM7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7Ozs7O0FDSkEscUJBQXFCLG1CQUFPLENBQUMsaUZBQWtCOztBQUUvQztBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQzs7Ozs7Ozs7Ozs7QUN6QkEscUJBQXFCLG1CQUFPLENBQUMsaUZBQWtCOztBQUUvQywyQkFBMkIsbUJBQU8sQ0FBQyw2RkFBd0I7O0FBRTNELHNCQUFzQixtQkFBTyxDQUFDLG1GQUFtQjs7QUFFakQ7QUFDQTtBQUNBOztBQUVBLGdDOzs7Ozs7Ozs7OztBQ1ZBLHdCQUF3QixtQkFBTyxDQUFDLHVGQUFxQjs7QUFFckQsc0JBQXNCLG1CQUFPLENBQUMsbUZBQW1COztBQUVqRCx3QkFBd0IsbUJBQU8sQ0FBQyx1RkFBcUI7O0FBRXJEO0FBQ0E7QUFDQTs7QUFFQSxvQzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0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RUEsU0FBU0csR0FBVCxHQUFlO0FBQUEsbUJBQ094RSxzREFBUyxFQURoQjtBQUFBLE1BQ0x0RCxPQURLLGNBQ0xBLE9BREs7O0FBR2IsU0FDRSwrQ0FBQyw2Q0FBRCxRQUNFLCtDQUFDLDhDQUFEO0FBQVcsZ0JBQVksRUFBR0E7QUFBMUIsSUFERixFQUVFLCtDQUFDLDJDQUFEO0FBQVEsZ0JBQVksRUFBR0E7QUFBdkIsSUFGRixFQUdFLCtDQUFDLGdEQUFELENBQVMsUUFBVDtBQUFrQixXQUFPLEVBQUM7QUFBMUIsSUFIRixFQUlFLCtDQUFDLDhDQUFEO0FBQU8sV0FBTyxFQUFDLE9BQWY7QUFBdUIsaUJBQWE7QUFBcEMsS0FDRSwrQ0FBQywrQ0FBRDtBQUFRLFdBQU8sRUFBQztBQUFoQixLQUNFLCtDQUFDLGlEQUFEO0FBQVUsVUFBTSxNQUFoQjtBQUFpQixXQUFPO0FBQXhCLElBREYsRUFFRSwrQ0FBQyxzREFBRDtBQUFtQixXQUFPO0FBQTFCLElBRkYsQ0FERixFQUtFLCtDQUFDLDBEQUFEO0FBQW1CLFVBQU07QUFBekIsSUFMRixFQU1FLCtDQUFDLG9EQUFEO0FBQWlCLFVBQU07QUFBdkIsSUFORixFQU9FLCtDQUFDLGdEQUFELENBQVMsT0FBVDtBQUFpQixVQUFNO0FBQXZCLElBUEYsQ0FKRixDQURGO0FBZ0JEOztBQUFBO0FBRUQvRixnREFBRyxDQUFDLCtDQUFDLEdBQUQsT0FBRCxDQUFILEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmZ1bmN0aW9uIGdldEZ1bmNOYW1lKGZ1bmMpIHtcbiAgaWYgKGZ1bmMubmFtZSkgcmV0dXJuIGZ1bmMubmFtZTtcbiAgdmFyIHJlc3VsdCA9IC9eZnVuY3Rpb25cXHMrKFtcXHdcXCRdKylcXHMqXFwoLy5leGVjKGZ1bmMudG9TdHJpbmcoKSk7XG5cbiAgcmV0dXJuIHJlc3VsdCA/IHJlc3VsdFsxXSA6ICd1bmtub3duJztcbn07XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmdW5jLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBY3RNTCBlbGVtZW50IGV4cGVjdHMgYSBmdW5jdGlvbi4gXCInICsgZnVuYyArICdcIiBnaXZlbiBpbnN0ZWFkLicpO1xuICB9XG4gIHJldHVybiB7XG4gICAgX19hY3RtbDogdHJ1ZSxcbiAgICBfX3VzZWQ6IDAsXG4gICAgX19ydW5uaW5nOiBmYWxzZSxcbiAgICBfX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHk6IHRydWUsXG4gICAgaWQ6IG51bGwsXG4gICAgcHJvcHM6IHByb3BzLFxuICAgIG5hbWU6IGdldEZ1bmNOYW1lKGZ1bmMpLFxuICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKGlkKSB7XG4gICAgICB2YXIgdXNlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgdGhpcy5fX3VzZWQgPSB1c2VkO1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5ID0gdHJ1ZTtcbiAgICB9LFxuICAgIG1lcmdlUHJvcHM6IGZ1bmN0aW9uIG1lcmdlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCBuZXdQcm9wcyk7XG4gICAgfSxcbiAgICB1c2VkOiBmdW5jdGlvbiB1c2VkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX191c2VkO1xuICAgIH0sXG4gICAgaXNSdW5uaW5nOiBmdW5jdGlvbiBpc1J1bm5pbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3J1bm5pbmc7XG4gICAgfSxcbiAgICBzaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5OiBmdW5jdGlvbiBzaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5KHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZW50ZXI6IGZ1bmN0aW9uIGVudGVyKCkge1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB0cnVlO1xuXG4gICAgICByZXR1cm4gZnVuYyh0aGlzLnByb3BzKTtcbiAgICB9LFxuICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgdGhpcy5fX3VzZWQgKz0gMTtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlRWxlbWVudDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVQcm9jZXNzb3I7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX1RyZWUgPSByZXF1aXJlKCcuL1RyZWUnKTtcblxudmFyIF9UcmVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RyZWUpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgZnVuY3Rpb24gc3RlcChrZXksIGFyZykgeyB0cnkgeyB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7IHZhciB2YWx1ZSA9IGluZm8udmFsdWU7IH0gY2F0Y2ggKGVycm9yKSB7IHJlamVjdChlcnJvcik7IHJldHVybjsgfSBpZiAoaW5mby5kb25lKSB7IHJlc29sdmUodmFsdWUpOyB9IGVsc2UgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgc3RlcChcInRocm93XCIsIGVycik7IH0pOyB9IH0gcmV0dXJuIHN0ZXAoXCJuZXh0XCIpOyB9KTsgfTsgfSAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuXG5cbi8vIGltcG9ydCBpbml0aWFsaXplSG9va3MgZnJvbSAnLi9ob29rcyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2Nlc3NvcigpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgdHJlZSA9ICgwLCBfVHJlZTIuZGVmYXVsdCkoKTtcbiAgdmFyIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICB2YXIgcHJvY2Vzc05vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKG5vZGUpIHtcbiAgICAgIHZhciByZXN1bHQsIGdlblJlc3VsdCwgdG9HZW5WYWx1ZTtcbiAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgbm9kZS5lbnRlcigpO1xuICAgICAgICAgICAgICBub2RlLnJlcnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgbm9kZS5jYWxsQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWYyID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuUmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICAgICAgX2NoaWxkcmVuJGksXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY1Jlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICBfYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IG5vZGUuZWxlbWVudC5jaGlsZHJlbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBjaGlsZHJlbi5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAoX2NoaWxkcmVuJGkgPSBjaGlsZHJlbltpXSkubWVyZ2VQcm9wcy5hcHBseShfY2hpbGRyZW4kaSwgX2FyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC50MCA9IGNoaWxkcmVuUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjaGlsZHJlbltpXSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC50MSA9IF9jb250ZXh0LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDAucHVzaC5jYWxsKF9jb250ZXh0LnQwLCBfY29udGV4dC50MSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIGNoaWxkcmVuW2ldID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuW2ldLmFwcGx5KGNoaWxkcmVuLCBfYXJncyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmNSZXN1bHQgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZnVuY1Jlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC50MiA9IGNoaWxkcmVuUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShmdW5jUmVzdWx0KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQzID0gX2NvbnRleHQuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC50Mi5wdXNoLmNhbGwoX2NvbnRleHQudDIsIF9jb250ZXh0LnQzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblJlc3VsdC5wdXNoKGZ1bmNSZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdCgncmV0dXJuJywgY2hpbGRyZW5SZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMxOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUsIF90aGlzKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICAgIC8vIGFjdHVhbCBjYWxsIG9mIHRoZSBBY3RNTCBlbGVtZW50XG4gICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGUuZWxlbWVudC5lbnRlcigpO1xuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSB2b2lkIDAsIHRvR2VuVmFsdWUgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgICAgLy8gaGFuZGxpbmcgYSBwcm9taXNlXG5cbiAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ICYmIHJlc3VsdC50aGVuKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDk7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgcmVzdWx0ID0gX2NvbnRleHQyLnNlbnQ7XG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC5uZXh0ID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSByZXN1bHQubmV4dCgpO1xuXG4gICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICBpZiAoZ2VuUmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDIyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAxOTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTg7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpKTtcblxuICAgICAgICAgICAgY2FzZSAxODpcbiAgICAgICAgICAgICAgdG9HZW5WYWx1ZSA9IF9jb250ZXh0Mi5zZW50O1xuXG4gICAgICAgICAgICBjYXNlIDE5OlxuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSByZXN1bHQubmV4dCh0b0dlblZhbHVlKTtcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAxNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMjI6XG4gICAgICAgICAgICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI1O1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSk7XG5cbiAgICAgICAgICAgIGNhc2UgMjU6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IF9jb250ZXh0Mi5zZW50O1xuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI5O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAyODpcbiAgICAgICAgICAgICAgcmVzdWx0ID0gZ2VuUmVzdWx0LnZhbHVlO1xuXG4gICAgICAgICAgICBjYXNlIDI5OlxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM1O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzMTpcbiAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzQ7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShyZXN1bHQpKTtcblxuICAgICAgICAgICAgY2FzZSAzNDpcbiAgICAgICAgICAgICAgcmVzdWx0ID0gX2NvbnRleHQyLnNlbnQ7XG5cbiAgICAgICAgICAgIGNhc2UgMzU6XG4gICAgICAgICAgICAgIGlmICghbm9kZS5lbGVtZW50LnNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkoKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM4O1xuICAgICAgICAgICAgICByZXR1cm4gbm9kZS5jYWxsQ2hpbGRyZW4oKTtcblxuICAgICAgICAgICAgY2FzZSAzODpcblxuICAgICAgICAgICAgICBub2RlLmVsZW1lbnQub3V0KCk7XG4gICAgICAgICAgICAgIG5vZGUub3V0KCk7XG4gICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdCgncmV0dXJuJywgcmVzdWx0KTtcblxuICAgICAgICAgICAgY2FzZSA0MjpcbiAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgX2NhbGxlZTIsIF90aGlzKTtcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gcHJvY2Vzc05vZGUoX3gpIHtcbiAgICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHJldHVybiB7XG4gICAgbm9kZTogZnVuY3Rpb24gbm9kZSgpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9LFxuICAgIHJ1bjogZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICAgIHZhciByZXNvbHZlZFJvb3ROb2RlID0gdHJlZS5yZXNvbHZlUm9vdChlbGVtZW50KTtcblxuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKHJlc29sdmVkUm9vdE5vZGUsIFtdKTtcbiAgICB9LFxuICAgIG9uTm9kZUVudGVyOiBmdW5jdGlvbiBvbk5vZGVFbnRlcihjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVPdXQ6IGZ1bmN0aW9uIG9uTm9kZU91dChjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUub25Ob2RlUmVtb3ZlKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIHN5c3RlbTogZnVuY3Rpb24gc3lzdGVtKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJlZTogdHJlZSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgIHRyZWUucmVzZXQoKTtcbiAgICAgICAgICBfdXNlUHViU3ViMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgICAgX3VzZVN0YXRlMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBUcmVlO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwgPSByZXF1aXJlKCdmYXN0LWRlZXAtZXF1YWwnKTtcblxudmFyIF9mYXN0RGVlcEVxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zhc3REZWVwRXF1YWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBUcmVlKCkge1xuICB2YXIgb25Ob2RlRW50ZXIgPSBbXTtcbiAgdmFyIG9uTm9kZU91dCA9IFtdO1xuICB2YXIgX29uTm9kZVJlbW92ZSA9IFtdO1xuICB2YXIgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgdmFyIGlkcyA9IDA7XG5cbiAgZnVuY3Rpb24gZ2V0SWQoKSB7XG4gICAgcmV0dXJuICdhJyArICsraWRzO1xuICB9O1xuICBmdW5jdGlvbiB1c2VTYW1lTm9kZShub2RlLCBuZXdFbGVtZW50KSB7XG4gICAgbmV3RWxlbWVudC5pbml0aWFsaXplKG5vZGUuZWxlbWVudC5pZCwgbm9kZS5lbGVtZW50LnVzZWQoKSk7XG4gICAgbm9kZS5lbGVtZW50ID0gbmV3RWxlbWVudDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBmdW5jdGlvbiB0cmVlRGlmZihvbGRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgaWYgKG9sZEVsZW1lbnQgJiYgb2xkRWxlbWVudC5uYW1lID09PSBuZXdFbGVtZW50Lm5hbWUpIHtcbiAgICAgIHJldHVybiAoMCwgX2Zhc3REZWVwRXF1YWwyLmRlZmF1bHQpKG9sZEVsZW1lbnQucHJvcHMsIG5ld0VsZW1lbnQucHJvcHMpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlTmV3Tm9kZShlbGVtZW50LCBwYXJlbnQpIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5pbml0aWFsaXplKGdldElkKCkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgY3Vyc29yOiAwLFxuICAgICAgZW50ZXI6IGZ1bmN0aW9uIGVudGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIG9uTm9kZUVudGVyLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyhfdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAvLyBJZiB0aGVyZSdyZSBtb3JlIG5vZGVzIGluIHRoZSB0cmVlIHRoYW4gd2hhdCB3YXMgcHJvY2Vzc2VkXG4gICAgICAgIGlmICh0aGlzLmN1cnNvciA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5jdXJzb3IpLmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZWROb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjKHJlbW92ZWROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Vyc29yID0gMDtcbiAgICAgICAgb25Ob2RlT3V0LmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyhfdGhpczIpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBhZGRDaGlsZE5vZGU6IGZ1bmN0aW9uIGFkZENoaWxkTm9kZShuZXdFbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXTtcblxuICAgICAgICAvLyB1c2luZyB0aGUgc2FtZSBub2RlXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgdHJlZURpZmYoY2hpbGROb2RlLmVsZW1lbnQsIG5ld0VsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgICByZXR1cm4gdXNlU2FtZU5vZGUoY2hpbGROb2RlLCBuZXdFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0aW5nIGEgbmV3IG5vZGVcbiAgICAgICAgdmFyIG5ld0NoaWxkTm9kZSA9IGNyZWF0ZU5ld05vZGUobmV3RWxlbWVudCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdKSB7XG4gICAgICAgICAgX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICByZXR1cm4gYyhfdGhpczMuY2hpbGRyZW5bX3RoaXMzLmN1cnNvcl0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdID0gbmV3Q2hpbGROb2RlO1xuICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGROb2RlO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVSb290OiBmdW5jdGlvbiByZXNvbHZlUm9vdChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gcm9vdCA9IHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgPyB1c2VTYW1lTm9kZShyb290LCBlbGVtZW50KSA6IGNyZWF0ZU5ld05vZGUoZWxlbWVudCk7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHM6IGZ1bmN0aW9uIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2U6IGZ1bmN0aW9uIGRpYWdub3NlKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxvb3BPdmVyKG5vZGUpIHtcbiAgICAgICAgdmFyIGluZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhub2RlLmVsZW1lbnQubmFtZSwgbm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZDogaW5kLFxuICAgICAgICAgIG5hbWU6IG5vZGUuZWxlbWVudC5uYW1lLFxuICAgICAgICAgIHVzZWQ6IG5vZGUuZWxlbWVudC51c2VkKCksXG4gICAgICAgICAgaWQ6IG5vZGUuZWxlbWVudC5pZCxcbiAgICAgICAgICBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9vcE92ZXIoY2hpbGQsIGluZCArIDEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICB9KHJvb3QpO1xuICAgIH0sXG4gICAgYWRkTm9kZUVudGVyQ2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVFbnRlckNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVFbnRlci5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIGFkZE5vZGVPdXRDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVPdXQucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgX29uTm9kZVJlbW92ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG59IC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBuby1yZXR1cm4tYXNzaWduLCBtYXgtbGVuICovXG47IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVVc2VDaGlsZHJlbkhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VDaGlsZHJlbkhvb2socHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICBub2RlLmVsZW1lbnQuc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseShmYWxzZSk7XG4gICAgcmV0dXJuIFtub2RlLmNhbGxDaGlsZHJlbiwgbm9kZS5lbGVtZW50LmNoaWxkcmVuXTtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUNoaWxkcmVuSG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNyZWF0ZVVzZUVsZW1lbnRIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlRWxlbWVudEhvb2socHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gcHJvY2Vzc29yLm5vZGUoKS5lbGVtZW50O1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWxlbWVudEhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cblxuXG52YXIgYnJpZGdlTWV0aG9kTmFtZSA9IGZ1bmN0aW9uIGJyaWRnZU1ldGhvZE5hbWUoa2V5d29yZCkge1xuICByZXR1cm4gJ19fcmVxdWVzdF9fJyArIGtleXdvcmQ7XG59O1xuXG52YXIgcmVzb2x2ZVByb2R1Y3QgPSBmdW5jdGlvbiByZXNvbHZlUHJvZHVjdChicmlkZ2VNZXRob2QsIG5vZGUsIGdldEVycm9yKSB7XG4gIGlmICghbm9kZSkge1xuICAgIHRocm93IGdldEVycm9yKCk7XG4gIH1cbiAgdmFyIHNvdXJjZSA9IHZvaWQgMDtcblxuICBpZiAobm9kZVticmlkZ2VNZXRob2RdKSB7XG4gICAgc291cmNlID0gbm9kZTtcbiAgfSBlbHNlIHtcbiAgICBzb3VyY2UgPSBub2RlLmNoaWxkcmVuLmZpbmQoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICByZXR1cm4gISFjaGlsZFticmlkZ2VNZXRob2RdO1xuICAgIH0pO1xuICB9XG4gIHZhciBwcm9kdWN0ID0gc291cmNlID8gc291cmNlW2JyaWRnZU1ldGhvZF0oKSA6IG51bGw7XG5cbiAgaWYgKHByb2R1Y3QgIT09IG51bGwpIHtcbiAgICByZXR1cm4gcHJvZHVjdC52YWx1ZTtcbiAgfVxuICByZXR1cm4gcmVzb2x2ZVByb2R1Y3QoYnJpZGdlTWV0aG9kLCBub2RlLnBhcmVudCwgZ2V0RXJyb3IpO1xufTtcblxudmFyIGdldE5vdEZvdW5kRXJyb3IgPSBmdW5jdGlvbiBnZXROb3RGb3VuZEVycm9yKGtleXdvcmQsIG5vZGUpIHtcbiAgdmFyIGdldFN0YWNrID0gZnVuY3Rpb24gZ2V0U3RhY2sobm9kZSkge1xuICAgIHZhciBzdGFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogW107XG5cbiAgICBzdGFjay5wdXNoKG5vZGUuZWxlbWVudC5uYW1lKTtcbiAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBnZXRTdGFjayhub2RlLnBhcmVudCwgc3RhY2spO1xuICAgIH1cbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBFcnJvcignXCInICsga2V5d29yZCArICdcIiBwcm9wIHJlcXVlc3RlZCBieSBcIicgKyBub2RlLmVsZW1lbnQubmFtZSArICdcIiBjYW4gbm90IGJlIGZvdW5kLlxcblxcblN0YWNrOlxcbicgKyBnZXRTdGFjayhub2RlKS5yZXZlcnNlKCkubWFwKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuICcgIDwnICsgbmFtZSArICc+JztcbiAgfSkuam9pbignXFxuJykpO1xufTtcblxudmFyIGNyZWF0ZVVzZVByb2R1Y3RIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlUHJvZHVjdEhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVFbnRlcihmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuICAgIHZhciBwcm9wcyA9IGVsZW1lbnQucHJvcHM7XG5cbiAgICB2YXIgcHJvcE5hbWVzID0gcHJvcHMgPyBPYmplY3Qua2V5cyhwcm9wcykgOiBbXTtcblxuICAgIHByb3BOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wTmFtZSkge1xuICAgICAgaWYgKHByb3BOYW1lLmNoYXJBdCgwKSA9PT0gJyQnKSB7XG4gICAgICAgIHZhciBrZXl3b3JkID0gcHJvcE5hbWUuc3Vic3RyKDEsIHByb3BOYW1lLmxlbmd0aCk7XG4gICAgICAgIHZhciBwcm9kdWN0VmFsdWUgPSByZXNvbHZlUHJvZHVjdChicmlkZ2VNZXRob2ROYW1lKGtleXdvcmQpLCBub2RlLnBhcmVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZXROb3RGb3VuZEVycm9yKGtleXdvcmQsIG5vZGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGVtZW50Lm1lcmdlUHJvcHMoX2RlZmluZVByb3BlcnR5KHt9LCBrZXl3b3JkLCBwcm9kdWN0VmFsdWUpKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09ICdleHBvcnRzJykge1xuICAgICAgICBub2RlW2JyaWRnZU1ldGhvZE5hbWUocHJvcHNbcHJvcE5hbWVdKV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG5vZGUuX19wcm9kdWN0IH07XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICBub2RlLl9fcHJvZHVjdCA9IHZhbHVlO1xuICAgIHJldHVybiBbZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICByZXR1cm4gbm9kZS5fX3Byb2R1Y3QgPSBuZXdWYWx1ZTtcbiAgICB9XTtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZVByb2R1Y3RIb29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQdWJTdWJIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzdWJzY3JpYmVycyA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVTdWJzY3JpYmVFbGVtZW50KHN1YnNjcmliZSwgdXNlQ2hpbGRyZW4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIHR5cGUgPSBfcmVmLnR5cGU7XG5cbiAgICB2YXIgX3VzZUNoaWxkcmVuID0gdXNlQ2hpbGRyZW4oKSxcbiAgICAgICAgX3VzZUNoaWxkcmVuMiA9IF9zbGljZWRUb0FycmF5KF91c2VDaGlsZHJlbiwgMSksXG4gICAgICAgIGNoaWxkcmVuID0gX3VzZUNoaWxkcmVuMlswXTtcblxuICAgIHN1YnNjcmliZSh0eXBlLCBmdW5jdGlvbiAocGF5bG9hZCkge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuKHsgcGF5bG9hZDogcGF5bG9hZCB9KTtcbiAgICB9KTtcbiAgfTtcbn07XG5mdW5jdGlvbiBjcmVhdGVQdWJsaXNoRWxlbWVudChwdWJsaXNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgdHlwZSA9IF9yZWYyLnR5cGUsXG4gICAgICAgIHBheWxvYWQgPSBfcmVmMi5wYXlsb2FkO1xuXG4gICAgcHVibGlzaCh0eXBlLCBwYXlsb2FkKTtcbiAgfTtcbn1cblxudmFyIHN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSBzdWJzY3JpYmVyc1t0eXBlXSA9IHt9O1xuICBzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXSA9IGNhbGxiYWNrO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXTtcbiAgfTtcbn07XG52YXIgcHVibGlzaCA9IGZ1bmN0aW9uIHB1Ymxpc2godHlwZSwgcGF5bG9hZCkge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSByZXR1cm47XG4gIE9iamVjdC5rZXlzKHN1YnNjcmliZXJzW3R5cGVdKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgIHN1YnNjcmliZXJzW3R5cGVdW2lkXShwYXlsb2FkKTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVVc2VQdWJTdWJIb29rKHByb2Nlc3NvciwgdXNlQ2hpbGRyZW4pIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBpZiAoc3Vic2NyaWJlcnNbdHlwZV1bbm9kZS5lbGVtZW50LmlkXSkge1xuICAgICAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bbm9kZS5lbGVtZW50LmlkXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoc2NvcGVkRWxlbWVudCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbCA9IHNjb3BlZEVsZW1lbnQgfHwgbm9kZS5lbGVtZW50O1xuICAgIHZhciBzdWJzY3JpYmVGdW5jID0gZnVuY3Rpb24gc3Vic2NyaWJlRnVuYygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBwYXJhbXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgcGFyYW1zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3Vic2NyaWJlLmFwcGx5KHVuZGVmaW5lZCwgW2VsXS5jb25jYXQocGFyYW1zKSk7XG4gICAgfTtcbiAgICB2YXIgcHVibGlzaEZ1bmMgPSBmdW5jdGlvbiBwdWJsaXNoRnVuYygpIHtcbiAgICAgIHJldHVybiBwdWJsaXNoLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1YnNjcmliZTogc3Vic2NyaWJlRnVuYyxcbiAgICAgIHB1Ymxpc2g6IHB1Ymxpc2hGdW5jLFxuICAgICAgc3Vic2NyaWJlcnM6IHN1YnNjcmliZXJzLFxuICAgICAgU3Vic2NyaWJlOiBjcmVhdGVTdWJzY3JpYmVFbGVtZW50KHN1YnNjcmliZUZ1bmMsIHVzZUNoaWxkcmVuKSxcbiAgICAgIFB1Ymxpc2g6IGNyZWF0ZVB1Ymxpc2hFbGVtZW50KHB1Ymxpc2hGdW5jKVxuICAgIH07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVB1YlN1Ykhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHN1YnNjcmliZXJzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VSZWR1Y2VySG9vaztcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGFjdGlvbiA9IF9yZWYuYWN0aW9uLFxuICAgICAgICBwcm9wc1RvQWN0aW9uID0gX3JlZi5wcm9wc1RvQWN0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnYWN0aW9uJywgJ3Byb3BzVG9BY3Rpb24nXSk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBkaXNwYXRjaChhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAocHJvcHNUb0FjdGlvbikge1xuICAgICAgZGlzcGF0Y2gocHJvcHNUb0FjdGlvbihyZXN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERpc3BhdGNoPiBleHBlY3RzIFwiYWN0aW9uXCIgb3IgXCJwcm9wc1RvQWN0aW9uXCIgcHJvcC4nKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVJlZHVjZXJIb29rKHVzZVN0YXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgaW5pdGlhbFN0YXRlKSB7XG4gICAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGluaXRpYWxTdGF0ZSksXG4gICAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDMpLFxuICAgICAgICBzdGF0ZSA9IF91c2VTdGF0ZTJbMF0sXG4gICAgICAgIHNldFN0YXRlID0gX3VzZVN0YXRlMlsxXSxcbiAgICAgICAgZ2V0U3RhdGUgPSBfdXNlU3RhdGUyWzJdO1xuXG4gICAgdmFyIGRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICByZXR1cm4gc2V0U3RhdGUocmVkdWNlcihnZXRTdGF0ZSgpLCBhY3Rpb24pKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2gsIGNyZWF0ZURpc3BhdGNoRWxlbWVudChkaXNwYXRjaCksIC8vIDxEaXNwYXRjaD5cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ2V0U3RhdGUoKTtcbiAgICB9IC8vIDxHZXRTdGF0ZT5cbiAgICBdO1xuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZVN0YXRlSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU3RvcmFnZSA9IHtcbiAgZWxlbWVudHM6IHt9LFxuICBnZXQ6IGZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0pIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSA9IHsgc3RhdGVzOiBbXSwgY29uc3VtZXI6IDAgfTtcbiAgfSxcbiAgY2xlYW5VcDogZnVuY3Rpb24gY2xlYW5VcChpZCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2lkXSkge1xuICAgICAgZGVsZXRlIHRoaXMuZWxlbWVudHNbaWRdO1xuICAgIH1cbiAgfVxufTsgLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuZnVuY3Rpb24gY3JlYXRlVXNlU3RhdGVIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgcmV0dXJuIFN0b3JhZ2UuY2xlYW5VcChub2RlLmVsZW1lbnQuaWQpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpbml0aWFsU3RhdGUpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICB2YXIgaW5kZXggPSB2b2lkIDA7XG5cbiAgICAvLyBmaXJzdCBydW5cbiAgICBpZiAoZWxlbWVudC51c2VkKCkgPT09IDApIHtcbiAgICAgIHN0b3JhZ2Uuc3RhdGVzLnB1c2goaW5pdGlhbFN0YXRlKTtcbiAgICAgIGluZGV4ID0gc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMTtcblxuICAgICAgLy8gb3RoZXIgcnVuc1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IHN0b3JhZ2UuY29uc3VtZXI7XG4gICAgICBzdG9yYWdlLmNvbnN1bWVyID0gaW5kZXggPCBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxID8gc3RvcmFnZS5jb25zdW1lciArIDEgOiAwO1xuICAgIH1cblxuICAgIHJldHVybiBbc3RvcmFnZS5zdGF0ZXNbaW5kZXhdLCBmdW5jdGlvbiAobmV3U3RhdGUpIHtcbiAgICAgIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XSA9IG5ld1N0YXRlO1xuICAgICAgaWYgKCFlbGVtZW50LmlzUnVubmluZygpKSB7XG4gICAgICAgIG5vZGUucmVydW4oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RvcmFnZS5zdGF0ZXNbaW5kZXhdO1xuICAgIH1dO1xuICB9O1xufVxuXG5jcmVhdGVVc2VTdGF0ZUhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNWYWxpZEhvb2tDb250ZXh0O1xuZnVuY3Rpb24gaXNWYWxpZEhvb2tDb250ZXh0KHByb2Nlc3Nvcikge1xuICBpZiAoIXByb2Nlc3Nvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHRlcnJpYmx5IHdyb25nIGhhcHBlbmVkLiBUaGUgaG9vayBmYWN0b3J5IGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRob3V0IGEgcHJvY2Vzc29yLicpO1xuICB9XG4gIGlmICghcHJvY2Vzc29yLm5vZGUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSG9va3MgbXVzdCBiZSBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgYW4gQWN0TUwgZWxlbWVudC4nKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNyZWF0ZVVuaXZlcnNlID0gY3JlYXRlVW5pdmVyc2U7XG5cbnZhciBfUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9Qcm9jZXNzb3InKTtcblxudmFyIF9Qcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvY2Vzc29yKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfQWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vQWN0RWxlbWVudCcpO1xuXG52YXIgX0FjdEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0RWxlbWVudCk7XG5cbnZhciBfdXNlQ2hpbGRyZW4gPSByZXF1aXJlKCcuL2hvb2tzL3VzZUNoaWxkcmVuJyk7XG5cbnZhciBfdXNlQ2hpbGRyZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlQ2hpbGRyZW4pO1xuXG52YXIgX3VzZUVsZW1lbnQgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVsZW1lbnQnKTtcblxudmFyIF91c2VFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVsZW1lbnQpO1xuXG52YXIgX3VzZVByb2R1Y3QgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVByb2R1Y3QnKTtcblxudmFyIF91c2VQcm9kdWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVByb2R1Y3QpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG52YXIgX3VzZVJlZHVjZXIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVJlZHVjZXInKTtcblxudmFyIF91c2VSZWR1Y2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVJlZHVjZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjcmVhdGVVbml2ZXJzZSgpIHtcbiAgdmFyIHByb2Nlc3NvciA9ICgwLCBfUHJvY2Vzc29yMi5kZWZhdWx0KSgpO1xuXG4gIGZ1bmN0aW9uIEEoZnVuYywgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfQWN0RWxlbWVudDIuZGVmYXVsdCkoZnVuYywgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfVxuICBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAnICsgZWxlbWVudC50b1N0cmluZygpICsgJyBwYXNzZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzb3IucnVuKGVsZW1lbnQpO1xuICB9XG4gIHZhciBGcmFnbWVudCA9IGZ1bmN0aW9uIEZyYWdtZW50KCkge307XG4gIHZhciB1c2VDaGlsZHJlbiA9ICgwLCBfdXNlQ2hpbGRyZW4yLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VFbGVtZW50ID0gKDAsIF91c2VFbGVtZW50Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlU3RhdGUgPSAoMCwgX3VzZVN0YXRlMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlUHJvZHVjdCA9ICgwLCBfdXNlUHJvZHVjdDIuZGVmYXVsdCkocHJvY2Vzc29yLCB1c2VTdGF0ZSk7XG4gIHZhciB1c2VQdWJTdWIgPSAoMCwgX3VzZVB1YlN1YjIuZGVmYXVsdCkocHJvY2Vzc29yLCB1c2VDaGlsZHJlbik7XG4gIHZhciB1c2VSZWR1Y2VyID0gKDAsIF91c2VSZWR1Y2VyMi5kZWZhdWx0KSh1c2VTdGF0ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBBOiBBLFxuICAgIHJ1bjogcnVuLFxuICAgIEZyYWdtZW50OiBGcmFnbWVudCxcbiAgICBwcm9jZXNzb3I6IHByb2Nlc3NvcixcbiAgICB1c2VDaGlsZHJlbjogdXNlQ2hpbGRyZW4sXG4gICAgdXNlRWxlbWVudDogdXNlRWxlbWVudCxcbiAgICB1c2VQcm9kdWN0OiB1c2VQcm9kdWN0LFxuICAgIHVzZVB1YlN1YjogdXNlUHViU3ViLFxuICAgIHVzZVN0YXRlOiB1c2VTdGF0ZSxcbiAgICB1c2VSZWR1Y2VyOiB1c2VSZWR1Y2VyXG4gIH07XG59XG5cbnZhciB1bml2ZXJzZSA9IGNyZWF0ZVVuaXZlcnNlKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pdmVyc2U7XG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVVbml2ZXJzZSA9IGNyZWF0ZVVuaXZlcnNlKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0FjdE1MRWxlbWVudDtcbmZ1bmN0aW9uIGlzQWN0TUxFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5fX2FjdG1sID09PSB0cnVlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBrZXlMaXN0ID0gT2JqZWN0LmtleXM7XG52YXIgaGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIHZhciBhcnJBID0gaXNBcnJheShhKVxuICAgICAgLCBhcnJCID0gaXNBcnJheShiKVxuICAgICAgLCBpXG4gICAgICAsIGxlbmd0aFxuICAgICAgLCBrZXk7XG5cbiAgICBpZiAoYXJyQSAmJiBhcnJCKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGRhdGVBID0gYSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICwgZGF0ZUIgPSBiIGluc3RhbmNlb2YgRGF0ZTtcbiAgICBpZiAoZGF0ZUEgIT0gZGF0ZUIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBhLmdldFRpbWUoKSA9PSBiLmdldFRpbWUoKTtcblxuICAgIHZhciByZWdleHBBID0gYSBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgLCByZWdleHBCID0gYiBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICBpZiAocmVnZXhwQSAhPSByZWdleHBCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG5cbiAgICB2YXIga2V5cyA9IGtleUxpc3QoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoICE9PSBrZXlMaXN0KGIpLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghaGFzUHJvcC5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIWVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQyOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZvY3VzRmllbGQgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENoZWNrRm9yRWRpdEZpZWxkKHsgdG9kb3MgfSkge1xuICByZXR1cm4gPEZvY3VzRmllbGQgaW5kZXg9eyB0b2Rvcy5maW5kSW5kZXgoKHsgZWRpdGluZyB9KSA9PiBlZGl0aW5nKSB9IC8+O1xufVxuIiwiaW1wb3J0IHsgdXNlQ2hpbGRyZW4gfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQge1xuICBUT0dHTEUsXG4gIE5FV19UT0RPLFxuICBERUxFVEUsXG4gIEVESVQsXG4gIEVESVRfVE9ETyxcbiAgQ0xFQVJfQ09NUExFVEVEXG59IGZyb20gJy4vU3RvcmUnO1xuXG5pbXBvcnQge1xuICBGSUxURVJfQUxMLFxuICBGSUxURVJfQUNUSVZFLFxuICBGSUxURVJfQ09NUExFVEVEXG59IGZyb20gJy4vRmlsdGVyJztcblxuY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBsaXN0ID0gJCgnLnRvZG8tbGlzdCcpO1xuY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuXG5jb25zdCBFTlRFUiA9IDEzO1xuY29uc3QgRVNDID0gMjc7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKCkge1xuICBjb25zdCBbICwgY29udGVudCBdID0gdXNlQ2hpbGRyZW4oKTtcblxuICBsaXN0LmlubmVySFRNTCA9IGNvbnRlbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihUT0dHTEUsIHRvZG9JbmRleCk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZGVsZXRlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihERUxFVEUsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9XG4gIH0pO1xuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRVNDKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV3JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgb25Vc2VyQWN0aW9uKE5FV19UT0RPLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gRm9jdXNGaWVsZCh7IGluZGV4IH0pIHtcbiAgY29uc3QgZWwgPSAkKGAuZWRpdFtkYXRhLWluZGV4PVwiJHsgaW5kZXggfVwiXWApO1xuXG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPSBlbC52YWx1ZS5sZW5ndGg7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3NDaGVja2VyKHsgdG9kb3MgfSkge1xuICBjb25zdCBjb21wbGV0ZWQgPSB0b2Rvcy5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IGNvbXBsZXRlZCkubGVuZ3RoO1xuICBjb25zdCBpdGVtc0xlZnQgPSB0b2Rvcy5sZW5ndGggLSBjb21wbGV0ZWQ7XG5cbiAgJCgnW2RhdGEtY291bnRdJykuaW5uZXJIVE1MID0gYFxuICAgIDxzdHJvbmc+JHsgaXRlbXNMZWZ0IH08L3N0cm9uZz4gJHsgaXRlbXNMZWZ0ID4gMSB8fCBpdGVtc0xlZnQgPT09IDAgPyAnaXRlbXMnIDogJ2l0ZW0nIH0gbGVmdFxuICBgO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGb290ZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICAkKCdbZGF0YS1maWx0ZXJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWxsJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUxMKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9BQ1RJVkUpO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWNvbXBsZXRlZCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0NPTVBMRVRFRCk7XG4gICAgfVxuICB9KTtcbiAgJCgnW2RhdGEtY2xlYXItY29tcGxldGVkXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG9uVXNlckFjdGlvbihDTEVBUl9DT01QTEVURUQpO1xuICB9KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlsdGVyT3B0aW9uc1RhYnMoeyBmaWx0ZXIgfSkge1xuICAkKCdbZGF0YS1hbGxdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FMTCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICQoJ1tkYXRhLWFjdGl2ZV0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUNUSVZFID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgJCgnW2RhdGEtY29tcGxldGVkXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQgPyAnc2VsZWN0ZWQnIDogJycpO1xufVxuIiwiLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSwgRnJhZ21lbnQsIHVzZVByb2R1Y3QsIHVzZVB1YlN1YiwgdXNlU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5leHBvcnQgY29uc3QgRklMVEVSX0FMTCA9ICdGSUxURVJfQUxMJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQUNUSVZFID0gJ0ZJTFRFUl9BQ1RJVkUnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9DT01QTEVURUQgPSAnRklMVEVSX0NPTVBMRVRFRCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpbHRlcigpIHtcbiAgY29uc3QgWyBmaWx0ZXIsIHNldEZpbHRlciBdID0gdXNlU3RhdGUoRklMVEVSX0FMTCk7XG4gIGNvbnN0IHsgU3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcblxuICB1c2VQcm9kdWN0KGZpbHRlcik7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBGSUxURVJfQUxMIH0+XG4gICAgICAgIHsgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9BTEwpIH1cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRklMVEVSX0FDVElWRSB9PlxuICAgICAgICB7ICgpID0+IHNldEZpbHRlcihGSUxURVJfQUNUSVZFKSB9XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEZJTFRFUl9DT01QTEVURUQgfT5cbiAgICAgICAgeyAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0NPTVBMRVRFRCkgfVxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG4iLCIvKiogQGpzeCBBICovXG5pbXBvcnQgeyB1c2VQcm9kdWN0IH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vU3RvcmUnO1xuXG5jb25zdCBpbml0aWFsVmFsdWUgPSBKU09OLnN0cmluZ2lmeShbXG4gIFRvRG8oeyBsYWJlbDogJ0FjdE1MIGlzIHVzaW5nIEpTWCcgfSksXG4gIFRvRG8oeyBsYWJlbDogJ0l0IGlzIGxpa2UgUmVhY3QgYnV0IG5vdCBmb3IgcmVuZGVyaW5nJyB9KVxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgUHJvdmlkZXI6ICgpID0+IHtcbiAgICB1c2VQcm9kdWN0KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykgfHwgaW5pdGlhbFZhbHVlKSk7XG4gIH0sXG4gIFN0b3JhZ2U6ICh7IHRvZG9zIH0pID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICB9XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZpbGxDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBGSUxURVJfQUxMLCBGSUxURVJfQUNUSVZFLCBGSUxURVJfQ09NUExFVEVEIH0gZnJvbSAnLi9GaWx0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlcih7IHRvZG9zLCBmaWx0ZXIgfSkge1xuICByZXR1cm4gKFxuICAgIDxGaWxsQ29udGFpbmVyPlxuICAgICAge1xuICAgICAgICB0b2Rvc1xuICAgICAgICAuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiB7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FMTCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSkgcmV0dXJuICFjb21wbGV0ZWQ7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCkgcmV0dXJuIGNvbXBsZXRlZDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLm1hcCgodG9kbywgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpQ2xhc3MgPSB0b2RvLmVkaXRpbmcgPyAnZWRpdGluZycgOiAodG9kby5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnKTtcblxuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9JyR7IGxpQ2xhc3MgfSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGVcbiAgICAgICAgICAgICAgICAgICR7IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfT5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtbGFiZWw+JHsgdG9kby5sYWJlbCB9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImRlc3Ryb3lcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWRlbGV0ZT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXRcIiB2YWx1ZT1cIiR7IHRvZG8ubGFiZWwgfVwiIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWVkaXQ+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgICB9XG4gICAgPC9GaWxsQ29udGFpbmVyPlxuICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIEZyYWdtZW50LCB1c2VSZWR1Y2VyLCB1c2VQcm9kdWN0LCB1c2VQdWJTdWIgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFID0gJ1RPR0dMRSc7XG5leHBvcnQgY29uc3QgTkVXX1RPRE8gPSAnTkVXX1RPRE8nO1xuZXhwb3J0IGNvbnN0IERFTEVURSA9ICdERUxFVEUnO1xuZXhwb3J0IGNvbnN0IEVESVQgPSAnRURJVCc7XG5leHBvcnQgY29uc3QgRURJVF9UT0RPID0gJ0VESVRfVE9ETyc7XG5leHBvcnQgY29uc3QgQ0xFQVJfQ09NUExFVEVEID0gJ0NMRUFSX0NPTVBMRVRFRCc7XG5cbmNvbnN0IHRvZ2dsZSA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IFRPR0dMRSwgdG9kb0luZGV4IH0pO1xuY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IERFTEVURSwgdG9kb0luZGV4IH0pO1xuY29uc3QgbmV3VG9kbyA9IChsYWJlbCkgPT4gKHsgdHlwZTogTkVXX1RPRE8sIGxhYmVsIH0pO1xuY29uc3QgZWRpdCA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IEVESVQsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGVkaXRUb0RvID0gKHsgaW5kZXgsIGxhYmVsIH0pID0+ICh7IHR5cGU6IEVESVRfVE9ETywgaW5kZXgsIGxhYmVsIH0pO1xuY29uc3QgY2xlYXJDb21wbGV0ZWQgPSAoKSA9PiAoeyB0eXBlOiBDTEVBUl9DT01QTEVURUQgfSk7XG5cbmV4cG9ydCBjb25zdCBUb0RvID0gKHsgbGFiZWwgfSkgPT4gKHsgbGFiZWwsIGNvbXBsZXRlZDogZmFsc2UsIGVkaXRpbmc6IGZhbHNlIH0pO1xuY29uc3QgcmVkdWNlciA9IGZ1bmN0aW9uICh0b2RvcywgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRTpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkOiAhdG9kby5jb21wbGV0ZWRcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBlZGl0aW5nOiAhdG9kby5lZGl0aW5nXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVF9UT0RPOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24uaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGxhYmVsOiBhY3Rpb24ubGFiZWwsXG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIE5FV19UT0RPOlxuICAgICAgcmV0dXJuIFsgLi4udG9kb3MsIFRvRG8oeyBsYWJlbDogYWN0aW9uLmxhYmVsIH0pIF07XG4gICAgY2FzZSBERUxFVEU6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggIT09IGFjdGlvbi50b2RvSW5kZXgpO1xuICAgIGNhc2UgQ0xFQVJfQ09NUExFVEVEOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbykgPT4gIXRvZG8uY29tcGxldGVkKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRvZG9zO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yZSh7IGluaXRpYWxWYWx1ZSB9KSB7XG4gIGNvbnN0IFsgdG9kb3MsICwgRGlzcGF0Y2ggXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgeyBTdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuXG4gIHVzZVByb2R1Y3QodG9kb3MpO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgVE9HR0xFIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZDogdG9kb0luZGV4IH0pID0+IHRvZ2dsZSh0b2RvSW5kZXgpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgTkVXX1RPRE8gfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkOiBsYWJlbCB9KSA9PiBuZXdUb2RvKGxhYmVsKSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IERFTEVURSB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IHRvZG9JbmRleCB9KSA9PiBkZWxldGVUb2RvKHRvZG9JbmRleCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBFRElUIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZDogdG9kb0luZGV4IH0pID0+IGVkaXQodG9kb0luZGV4KSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEVESVRfVE9ETyB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQgfSkgPT4gZWRpdFRvRG8ocGF5bG9hZCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBDTEVBUl9DT01QTEVURUQgfT5cbiAgICAgICAgPERpc3BhdGNoIGFjdGlvbj17IGNsZWFyQ29tcGxldGVkKCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIHJ1biwgRnJhZ21lbnQsIHVzZVB1YlN1YiB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBDaGVja0ZvckVkaXRGaWVsZCBmcm9tICcuL0NoZWNrRm9yRWRpdEZpZWxkJztcbmltcG9ydCB7IFByb2dyZXNzQ2hlY2tlciwgRmlsdGVyT3B0aW9uc1RhYnMsIENvbnRhaW5lciwgRm9vdGVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IEZpbHRlciBmcm9tICcuL0ZpbHRlcic7XG5pbXBvcnQgUGVyc2lzdCBmcm9tICcuL1BlcnNpc3QnO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IHsgcHVibGlzaCB9ID0gdXNlUHViU3ViKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8Q29udGFpbmVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfSAvPlxuICAgICAgPEZvb3RlciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0vPlxuICAgICAgPFBlcnNpc3QuUHJvdmlkZXIgZXhwb3J0cz0naW5pdGlhbFZhbHVlJyAvPlxuICAgICAgPFN0b3JlIGV4cG9ydHM9J3RvZG9zJyAkaW5pdGlhbFZhbHVlPlxuICAgICAgICA8RmlsdGVyIGV4cG9ydHM9J2ZpbHRlcic+XG4gICAgICAgICAgPFJlbmRlcmVyICR0b2RvcyAkZmlsdGVyIC8+XG4gICAgICAgICAgPEZpbHRlck9wdGlvbnNUYWJzICRmaWx0ZXIgLz5cbiAgICAgICAgPC9GaWx0ZXI+XG4gICAgICAgIDxDaGVja0ZvckVkaXRGaWVsZCAkdG9kb3MgLz5cbiAgICAgICAgPFByb2dyZXNzQ2hlY2tlciAkdG9kb3MgLz5cbiAgICAgICAgPFBlcnNpc3QuU3RvcmFnZSAkdG9kb3MgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=