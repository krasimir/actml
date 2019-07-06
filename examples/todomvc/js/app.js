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
/*! exports provided: FillContainer, Container, FocusField, ProgressChecker, FilterOptions, FilterOptionsTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillContainer", function() { return FillContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusField", function() { return FocusField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressChecker", function() { return ProgressChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterOptions", function() { return FilterOptions; });
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
function FilterOptions(_ref5) {
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
/* harmony import */ var _CheckForEditField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CheckForEditField */ "./src/CheckForEditField.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Filter */ "./src/Filter.js");
/** @jsx A */







function App() {
  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["usePubSub"])(),
      publish = _usePubSub.publish;

  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_lib__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["Container"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["FilterOptions"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"], {
    exports: "todos"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNoaWxkcmVuLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VQdWJTdWIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VSZWR1Y2VyLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL3V0aWxzL2lzQWN0TUxFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9ub2RlX21vZHVsZXMvZmFzdC1kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImdldEZ1bmNOYW1lIiwiZnVuYyIsIm5hbWUiLCJyZXN1bHQiLCJleGVjIiwidG9TdHJpbmciLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsIkVycm9yIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsIl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJzaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5IiwiZW50ZXIiLCJvdXQiLCJkZWZhdWx0IiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwib2JqIiwiX19lc01vZHVsZSIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZm4iLCJnZW4iLCJhcHBseSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3RlcCIsImtleSIsImFyZyIsImluZm8iLCJlcnJvciIsImRvbmUiLCJ0aGVuIiwiZXJyIiwiX3RoaXMiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJwcm9jZXNzTm9kZSIsIl9yZWYiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZTIiLCJub2RlIiwiZ2VuUmVzdWx0IiwidG9HZW5WYWx1ZSIsIndyYXAiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwcmV2IiwibmV4dCIsInJlcnVuIiwiY2FsbENoaWxkcmVuIiwiX3JlZjIiLCJfY2FsbGVlIiwiY2hpbGRyZW5SZXN1bHQiLCJpIiwiX2NoaWxkcmVuJGkiLCJmdW5jUmVzdWx0IiwiX2FyZ3MiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiZWxlbWVudCIsInQwIiwiYWRkQ2hpbGROb2RlIiwidDEiLCJzZW50IiwicHVzaCIsImNhbGwiLCJ0MiIsInQzIiwiYWJydXB0Iiwic3RvcCIsIl94IiwicnVuIiwicmVzb2x2ZWRSb290Tm9kZSIsInJlc29sdmVSb290Iiwib25Ob2RlRW50ZXIiLCJjYWxsYmFjayIsImFkZE5vZGVFbnRlckNhbGxiYWNrIiwib25Ob2RlT3V0IiwiYWRkTm9kZU91dENhbGxiYWNrIiwib25Ob2RlUmVtb3ZlIiwic3lzdGVtIiwicmVzZXQiLCJjbGVhciIsIlRyZWUiLCJfZmFzdERlZXBFcXVhbCIsIl9mYXN0RGVlcEVxdWFsMiIsIl9vbk5vZGVSZW1vdmUiLCJyb290IiwiY3JlYXRlTmV3Tm9kZSIsImlkcyIsImdldElkIiwidXNlU2FtZU5vZGUiLCJuZXdFbGVtZW50IiwidHJlZURpZmYiLCJvbGRFbGVtZW50IiwicGFyZW50IiwiY3Vyc29yIiwiZm9yRWFjaCIsImMiLCJfdGhpczIiLCJzcGxpY2UiLCJyZW1vdmVkTm9kZSIsIl90aGlzMyIsImNoaWxkTm9kZSIsIm5ld0NoaWxkTm9kZSIsImdldE51bU9mRWxlbWVudHMiLCJkaWFnbm9zZSIsImxvb3BPdmVyIiwiaW5kIiwibWFwIiwiY2hpbGQiLCJfaXNWYWxpZEhvb2tDb250ZXh0IiwiX2lzVmFsaWRIb29rQ29udGV4dDIiLCJjcmVhdGVVc2VDaGlsZHJlbkhvb2siLCJwcm9jZXNzb3IiLCJjcmVhdGVVc2VFbGVtZW50SG9vayIsIl9kZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImJyaWRnZU1ldGhvZE5hbWUiLCJrZXl3b3JkIiwicmVzb2x2ZVByb2R1Y3QiLCJicmlkZ2VNZXRob2QiLCJnZXRFcnJvciIsInNvdXJjZSIsImZpbmQiLCJwcm9kdWN0IiwiZ2V0Tm90Rm91bmRFcnJvciIsImdldFN0YWNrIiwic3RhY2siLCJyZXZlcnNlIiwiam9pbiIsImNyZWF0ZVVzZVByb2R1Y3RIb29rIiwicHJvcE5hbWVzIiwia2V5cyIsInByb3BOYW1lIiwiY2hhckF0Iiwic3Vic3RyIiwicHJvZHVjdFZhbHVlIiwiX19wcm9kdWN0IiwibmV3VmFsdWUiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJhcnIiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwiY3JlYXRlVXNlUHViU3ViSG9vayIsInN1YnNjcmliZXJzIiwiY3JlYXRlU3Vic2NyaWJlRWxlbWVudCIsInN1YnNjcmliZSIsInVzZUNoaWxkcmVuIiwidHlwZSIsIl91c2VDaGlsZHJlbiIsIl91c2VDaGlsZHJlbjIiLCJwYXlsb2FkIiwiY3JlYXRlUHVibGlzaEVsZW1lbnQiLCJwdWJsaXNoIiwic2NvcGVkRWxlbWVudCIsImVsIiwic3Vic2NyaWJlRnVuYyIsIl9sZW4iLCJwYXJhbXMiLCJfa2V5IiwiY29uY2F0IiwicHVibGlzaEZ1bmMiLCJTdWJzY3JpYmUiLCJQdWJsaXNoIiwiY3JlYXRlVXNlUmVkdWNlckhvb2siLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJ0YXJnZXQiLCJpbmRleE9mIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsImFjdGlvbiIsInByb3BzVG9BY3Rpb24iLCJyZXN0IiwidXNlU3RhdGUiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImdldFN0YXRlIiwiY3JlYXRlVXNlU3RhdGVIb29rIiwiU3RvcmFnZSIsImVsZW1lbnRzIiwiZ2V0Iiwic3RhdGVzIiwiY29uc3VtZXIiLCJjbGVhblVwIiwic3RvcmFnZSIsImluZGV4IiwibmV3U3RhdGUiLCJpc1ZhbGlkSG9va0NvbnRleHQiLCJjcmVhdGVVbml2ZXJzZSIsIl9Qcm9jZXNzb3IiLCJfUHJvY2Vzc29yMiIsIl9BY3RFbGVtZW50IiwiX0FjdEVsZW1lbnQyIiwiX3VzZUVsZW1lbnQiLCJfdXNlRWxlbWVudDIiLCJfdXNlUHJvZHVjdCIsIl91c2VQcm9kdWN0MiIsIl91c2VSZWR1Y2VyIiwiX3VzZVJlZHVjZXIyIiwiQSIsIkZyYWdtZW50IiwidXNlRWxlbWVudCIsInVzZVByb2R1Y3QiLCJ1c2VQdWJTdWIiLCJ1c2VSZWR1Y2VyIiwidW5pdmVyc2UiLCJtb2R1bGUiLCJpc0FjdE1MRWxlbWVudCIsIkNoZWNrRm9yRWRpdEZpZWxkIiwidG9kb3MiLCJmaW5kSW5kZXgiLCJlZGl0aW5nIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGlzdCIsImhlYWRlciIsIkVOVEVSIiwiRVNDIiwiRmlsbENvbnRhaW5lciIsImNvbnRlbnQiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJvblVzZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiVE9HR0xFIiwiREVMRVRFIiwiRURJVCIsIkVESVRfVE9ETyIsImxhYmVsIiwia2V5Q29kZSIsIk5FV19UT0RPIiwiRm9jdXNGaWVsZCIsImZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJQcm9ncmVzc0NoZWNrZXIiLCJjb21wbGV0ZWQiLCJmaWx0ZXIiLCJpdGVtc0xlZnQiLCJGaWx0ZXJPcHRpb25zIiwiRklMVEVSX0FMTCIsIkZJTFRFUl9BQ1RJVkUiLCJGSUxURVJfQ09NUExFVEVEIiwiRmlsdGVyT3B0aW9uc1RhYnMiLCJzZXRBdHRyaWJ1dGUiLCJGaWx0ZXIiLCJzZXRGaWx0ZXIiLCJSZW5kZXJlciIsInRvZG8iLCJsaUNsYXNzIiwidG9nZ2xlIiwiZGVsZXRlVG9kbyIsIm5ld1RvZG8iLCJlZGl0IiwiZWRpdFRvRG8iLCJUb0RvIiwiaW5pdGlhbFZhbHVlIiwiU3RvcmUiLCJEaXNwYXRjaCIsIkFwcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYkEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUdBLFNBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLE1BQUlBLElBQUksQ0FBQ0MsSUFBVCxFQUFlLE9BQU9ELElBQUksQ0FBQ0MsSUFBWjtBQUNmLE1BQUlDLE1BQU0sR0FBRyw2QkFBNkJDLElBQTdCLENB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QURLOztBQUdiLFNBQ0UsK0NBQUMsNkNBQUQsUUFDRSwrQ0FBQyw4Q0FBRDtBQUFXLGdCQUFZLEVBQUdBO0FBQTFCLElBREYsRUFFRSwrQ0FBQyxrREFBRDtBQUFlLGdCQUFZLEVBQUdBO0FBQTlCLElBRkYsRUFHRSwrQ0FBQyw4Q0FBRDtBQUFPLFdBQU8sRUFBQztBQUFmLEtBQ0UsK0NBQUMsK0NBQUQ7QUFBUSxXQUFPLEVBQUM7QUFBaEIsS0FDRSwrQ0FBQyxpREFBRDtBQUFVLFVBQU0sTUFBaEI7QUFBaUIsV0FBTztBQUF4QixJQURGLEVBRUUsK0NBQUMsc0RBQUQ7QUFBbUIsV0FBTztBQUExQixJQUZGLENBREYsRUFLRSwrQ0FBQywwREFBRDtBQUFtQixVQUFNO0FBQXpCLElBTEYsRUFNRSwrQ0FBQyxvREFBRDtBQUFpQixVQUFNO0FBQXZCLElBTkYsQ0FIRixDQURGO0FBY0Q7O0FBQUE7QUFFRC9GLGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuICB2YXIgcmVzdWx0ID0gL15mdW5jdGlvblxccysoW1xcd1xcJF0rKVxccypcXCgvLmV4ZWMoZnVuYy50b1N0cmluZygpKTtcblxuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0WzFdIDogJ3Vua25vd24nO1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uLiBcIicgKyBmdW5jICsgJ1wiIGdpdmVuIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIF9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTogdHJ1ZSxcbiAgICBpZDogbnVsbCxcbiAgICBwcm9wczogcHJvcHMsXG4gICAgbmFtZTogZ2V0RnVuY05hbWUoZnVuYyksXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoaWQpIHtcbiAgICAgIHZhciB1c2VkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICB0aGlzLl9fdXNlZCA9IHVzZWQ7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB0cnVlO1xuICAgIH0sXG4gICAgbWVyZ2VQcm9wczogZnVuY3Rpb24gbWVyZ2VQcm9wcyhuZXdQcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICB9LFxuICAgIHVzZWQ6IGZ1bmN0aW9uIHVzZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3VzZWQ7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcnVubmluZztcbiAgICB9LFxuICAgIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHk6IGZ1bmN0aW9uIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5ID0gdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IHRydWU7XG4gICAgICB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSA9IHRydWU7XG5cbiAgICAgIHJldHVybiBmdW5jKHRoaXMucHJvcHMpO1xuICAgIH0sXG4gICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICB0aGlzLl9fdXNlZCArPSAxO1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVFbGVtZW50OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVByb2Nlc3NvcjtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfVHJlZSA9IHJlcXVpcmUoJy4vVHJlZScpO1xuXG52YXIgX1RyZWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVHJlZSk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSwgZnVuY3Rpb24gKGVycikgeyBzdGVwKFwidGhyb3dcIiwgZXJyKTsgfSk7IH0gfSByZXR1cm4gc3RlcChcIm5leHRcIik7IH0pOyB9OyB9IC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5cblxuLy8gaW1wb3J0IGluaXRpYWxpemVIb29rcyBmcm9tICcuL2hvb2tzJztcblxuZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc29yKCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHZhciB0cmVlID0gKDAsIF9UcmVlMi5kZWZhdWx0KSgpO1xuICB2YXIgY3VycmVudE5vZGUgPSBudWxsO1xuXG4gIHZhciBwcm9jZXNzTm9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3JlZiA9IF9hc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIobm9kZSkge1xuICAgICAgdmFyIHJlc3VsdCwgZ2VuUmVzdWx0LCB0b0dlblZhbHVlO1xuICAgICAgcmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHtcbiAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICBub2RlLmVudGVyKCk7XG4gICAgICAgICAgICAgIG5vZGUucmVydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBub2RlLmNhbGxDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjIgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW5SZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICAgICAgICBfY2hpbGRyZW4kaSxcbiAgICAgICAgICAgICAgICAgICAgICBmdW5jUmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgIF9hcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuUmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gbm9kZS5lbGVtZW50LmNoaWxkcmVuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaSA8IGNoaWxkcmVuLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGNoaWxkcmVuW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChfY2hpbGRyZW4kaSA9IGNoaWxkcmVuW2ldKS5tZXJnZVByb3BzLmFwcGx5KF9jaGlsZHJlbiRpLCBfYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQwID0gY2hpbGRyZW5SZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGNoaWxkcmVuW2ldKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQxID0gX2NvbnRleHQuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC50MC5wdXNoLmNhbGwoX2NvbnRleHQudDAsIF9jb250ZXh0LnQxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0eXBlb2YgY2hpbGRyZW5baV0gPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRyZW5baV0uYXBwbHkoY2hpbGRyZW4sIF9hcmdzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY1Jlc3VsdCA9IF9jb250ZXh0LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShmdW5jUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyNjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQyID0gY2hpbGRyZW5SZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGZ1bmNSZXN1bHQpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDMgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQyLnB1c2guY2FsbChfY29udGV4dC50MiwgX2NvbnRleHQudDMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuUmVzdWx0LnB1c2goZnVuY1Jlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KCdyZXR1cm4nLCBjaGlsZHJlblJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzE6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZSwgX3RoaXMpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgLy8gYWN0dWFsIGNhbGwgb2YgdGhlIEFjdE1MIGVsZW1lbnRcbiAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZS5lbGVtZW50LmVudGVyKCk7XG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IHZvaWQgMCwgdG9HZW5WYWx1ZSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgICAvLyBoYW5kbGluZyBhIHByb21pc2VcblxuICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgJiYgcmVzdWx0LnRoZW4pKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAxMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICByZXN1bHQgPSBfY29udGV4dDIuc2VudDtcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgIGlmICghKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0Lm5leHQgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IHJlc3VsdC5uZXh0KCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgIGlmIChnZW5SZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAxODtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICBjYXNlIDE4OlxuICAgICAgICAgICAgICB0b0dlblZhbHVlID0gX2NvbnRleHQyLnNlbnQ7XG5cbiAgICAgICAgICAgIGNhc2UgMTk6XG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IHJlc3VsdC5uZXh0KHRvR2VuVmFsdWUpO1xuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE0O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAyMjpcbiAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyODtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjU7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpKTtcblxuICAgICAgICAgICAgY2FzZSAyNTpcbiAgICAgICAgICAgICAgcmVzdWx0ID0gX2NvbnRleHQyLnNlbnQ7XG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDI4OlxuICAgICAgICAgICAgICByZXN1bHQgPSBnZW5SZXN1bHQudmFsdWU7XG5cbiAgICAgICAgICAgIGNhc2UgMjk6XG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDMxOlxuICAgICAgICAgICAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM1O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzNDtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKHJlc3VsdCkpO1xuXG4gICAgICAgICAgICBjYXNlIDM0OlxuICAgICAgICAgICAgICByZXN1bHQgPSBfY29udGV4dDIuc2VudDtcblxuICAgICAgICAgICAgY2FzZSAzNTpcbiAgICAgICAgICAgICAgaWYgKCFub2RlLmVsZW1lbnQuc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSgpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzODtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzg7XG4gICAgICAgICAgICAgIHJldHVybiBub2RlLmNhbGxDaGlsZHJlbigpO1xuXG4gICAgICAgICAgICBjYXNlIDM4OlxuXG4gICAgICAgICAgICAgIG5vZGUuZWxlbWVudC5vdXQoKTtcbiAgICAgICAgICAgICAgbm9kZS5vdXQoKTtcbiAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KCdyZXR1cm4nLCByZXN1bHQpO1xuXG4gICAgICAgICAgICBjYXNlIDQyOlxuICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBfY2FsbGVlMiwgX3RoaXMpO1xuICAgIH0pKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBwcm9jZXNzTm9kZShfeCkge1xuICAgICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBub2RlOiBmdW5jdGlvbiBub2RlKCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0sXG4gICAgcnVuOiBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgICAgdmFyIHJlc29sdmVkUm9vdE5vZGUgPSB0cmVlLnJlc29sdmVSb290KGVsZW1lbnQpO1xuXG4gICAgICByZXR1cm4gcHJvY2Vzc05vZGUocmVzb2x2ZWRSb290Tm9kZSwgW10pO1xuICAgIH0sXG4gICAgb25Ob2RlRW50ZXI6IGZ1bmN0aW9uIG9uTm9kZUVudGVyKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVFbnRlckNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZU91dDogZnVuY3Rpb24gb25Ob2RlT3V0KGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgdHJlZS5vbk5vZGVSZW1vdmUoY2FsbGJhY2spO1xuICAgIH0sXG4gICAgc3lzdGVtOiBmdW5jdGlvbiBzeXN0ZW0oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmVlOiB0cmVlLFxuICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgdHJlZS5yZXNldCgpO1xuICAgICAgICAgIF91c2VQdWJTdWIyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlU3RhdGUyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRyZWU7XG5cbnZhciBfZmFzdERlZXBFcXVhbCA9IHJlcXVpcmUoJ2Zhc3QtZGVlcC1lcXVhbCcpO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFzdERlZXBFcXVhbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIFRyZWUoKSB7XG4gIHZhciBvbk5vZGVFbnRlciA9IFtdO1xuICB2YXIgb25Ob2RlT3V0ID0gW107XG4gIHZhciBfb25Ob2RlUmVtb3ZlID0gW107XG4gIHZhciByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICB2YXIgaWRzID0gMDtcblxuICBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgICByZXR1cm4gJ2EnICsgKytpZHM7XG4gIH07XG4gIGZ1bmN0aW9uIHVzZVNhbWVOb2RlKG5vZGUsIG5ld0VsZW1lbnQpIHtcbiAgICBuZXdFbGVtZW50LmluaXRpYWxpemUobm9kZS5lbGVtZW50LmlkLCBub2RlLmVsZW1lbnQudXNlZCgpKTtcbiAgICBub2RlLmVsZW1lbnQgPSBuZXdFbGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIHRyZWVEaWZmKG9sZEVsZW1lbnQsIG5ld0VsZW1lbnQpIHtcbiAgICBpZiAob2xkRWxlbWVudCAmJiBvbGRFbGVtZW50Lm5hbWUgPT09IG5ld0VsZW1lbnQubmFtZSkge1xuICAgICAgcmV0dXJuICgwLCBfZmFzdERlZXBFcXVhbDIuZGVmYXVsdCkob2xkRWxlbWVudC5wcm9wcywgbmV3RWxlbWVudC5wcm9wcyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQsIHBhcmVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmluaXRpYWxpemUoZ2V0SWQoKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICBjdXJzb3I6IDAsXG4gICAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgb25Ob2RlRW50ZXIuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIC8vIElmIHRoZXJlJ3JlIG1vcmUgbm9kZXMgaW4gdGhlIHRyZWUgdGhhbiB3aGF0IHdhcyBwcm9jZXNzZWRcbiAgICAgICAgaWYgKHRoaXMuY3Vyc29yIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSh0aGlzLmN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSB0aGlzLmN1cnNvcikuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlZE5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGMocmVtb3ZlZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJzb3IgPSAwO1xuICAgICAgICBvbk5vZGVPdXQuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGFkZENoaWxkTm9kZTogZnVuY3Rpb24gYWRkQ2hpbGROb2RlKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdO1xuXG4gICAgICAgIC8vIHVzaW5nIHRoZSBzYW1lIG5vZGVcbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiB0cmVlRGlmZihjaGlsZE5vZGUuZWxlbWVudCwgbmV3RWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICAgIHJldHVybiB1c2VTYW1lTm9kZShjaGlsZE5vZGUsIG5ld0VsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRpbmcgYSBuZXcgbm9kZVxuICAgICAgICB2YXIgbmV3Q2hpbGROb2RlID0gY3JlYXRlTmV3Tm9kZShuZXdFbGVtZW50LCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl0pIHtcbiAgICAgICAgICBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiBjKF90aGlzMy5jaGlsZHJlbltfdGhpczMuY3Vyc29yXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl0gPSBuZXdDaGlsZE5vZGU7XG4gICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgIHJldHVybiBuZXdDaGlsZE5vZGU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZVJvb3Q6IGZ1bmN0aW9uIHJlc29sdmVSb290KGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiByb290ID0gdHJlZURpZmYocm9vdC5lbGVtZW50LCBlbGVtZW50KSA/IHVzZVNhbWVOb2RlKHJvb3QsIGVsZW1lbnQpIDogY3JlYXRlTmV3Tm9kZShlbGVtZW50KTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHJvb3QgPSBjcmVhdGVOZXdOb2RlKCk7XG4gICAgICBpZHMgPSAwO1xuICAgIH0sXG4gICAgZ2V0TnVtT2ZFbGVtZW50czogZnVuY3Rpb24gZ2V0TnVtT2ZFbGVtZW50cygpIHtcbiAgICAgIHJldHVybiBpZHM7XG4gICAgfSxcbiAgICBkaWFnbm9zZTogZnVuY3Rpb24gZGlhZ25vc2UoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gbG9vcE92ZXIobm9kZSkge1xuICAgICAgICB2YXIgaW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5vZGUuZWxlbWVudC5uYW1lLCBub2RlLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kOiBpbmQsXG4gICAgICAgICAgbmFtZTogbm9kZS5lbGVtZW50Lm5hbWUsXG4gICAgICAgICAgdXNlZDogbm9kZS5lbGVtZW50LnVzZWQoKSxcbiAgICAgICAgICBpZDogbm9kZS5lbGVtZW50LmlkLFxuICAgICAgICAgIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb29wT3ZlcihjaGlsZCwgaW5kICsgMSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgIH0ocm9vdCk7XG4gICAgfSxcbiAgICBhZGROb2RlRW50ZXJDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIG9uTm9kZUVudGVyLnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgYWRkTm9kZU91dENhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIG9uTm9kZU91dC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICBfb25Ob2RlUmVtb3ZlLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcbn0gLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIG5vLXJldHVybi1hc3NpZ24sIG1heC1sZW4gKi9cbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNyZWF0ZVVzZUNoaWxkcmVuSG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUNoaWxkcmVuSG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgIG5vZGUuZWxlbWVudC5zaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5KGZhbHNlKTtcbiAgICByZXR1cm4gW25vZGUuY2FsbENoaWxkcmVuLCBub2RlLmVsZW1lbnQuY2hpbGRyZW5dO1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlQ2hpbGRyZW5Ib29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHJldHVybiBwcm9jZXNzb3Iubm9kZSgpLmVsZW1lbnQ7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH0gLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuXG5cbnZhciBicmlkZ2VNZXRob2ROYW1lID0gZnVuY3Rpb24gYnJpZGdlTWV0aG9kTmFtZShrZXl3b3JkKSB7XG4gIHJldHVybiAnX19yZXF1ZXN0X18nICsga2V5d29yZDtcbn07XG5cbnZhciByZXNvbHZlUHJvZHVjdCA9IGZ1bmN0aW9uIHJlc29sdmVQcm9kdWN0KGJyaWRnZU1ldGhvZCwgbm9kZSwgZ2V0RXJyb3IpIHtcbiAgaWYgKCFub2RlKSB7XG4gICAgdGhyb3cgZ2V0RXJyb3IoKTtcbiAgfVxuICB2YXIgc291cmNlID0gdm9pZCAwO1xuXG4gIGlmIChub2RlW2JyaWRnZU1ldGhvZF0pIHtcbiAgICBzb3VyY2UgPSBub2RlO1xuICB9IGVsc2Uge1xuICAgIHNvdXJjZSA9IG5vZGUuY2hpbGRyZW4uZmluZChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIHJldHVybiAhIWNoaWxkW2JyaWRnZU1ldGhvZF07XG4gICAgfSk7XG4gIH1cbiAgdmFyIHByb2R1Y3QgPSBzb3VyY2UgPyBzb3VyY2VbYnJpZGdlTWV0aG9kXSgpIDogbnVsbDtcblxuICBpZiAocHJvZHVjdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBwcm9kdWN0LnZhbHVlO1xuICB9XG4gIHJldHVybiByZXNvbHZlUHJvZHVjdChicmlkZ2VNZXRob2QsIG5vZGUucGFyZW50LCBnZXRFcnJvcik7XG59O1xuXG52YXIgZ2V0Tm90Rm91bmRFcnJvciA9IGZ1bmN0aW9uIGdldE5vdEZvdW5kRXJyb3Ioa2V5d29yZCwgbm9kZSkge1xuICB2YXIgZ2V0U3RhY2sgPSBmdW5jdGlvbiBnZXRTdGFjayhub2RlKSB7XG4gICAgdmFyIHN0YWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBbXTtcblxuICAgIHN0YWNrLnB1c2gobm9kZS5lbGVtZW50Lm5hbWUpO1xuICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgcmV0dXJuIGdldFN0YWNrKG5vZGUucGFyZW50LCBzdGFjayk7XG4gICAgfVxuICAgIHJldHVybiBzdGFjaztcbiAgfTtcblxuICByZXR1cm4gbmV3IEVycm9yKCdcIicgKyBrZXl3b3JkICsgJ1wiIHByb3AgcmVxdWVzdGVkIGJ5IFwiJyArIG5vZGUuZWxlbWVudC5uYW1lICsgJ1wiIGNhbiBub3QgYmUgZm91bmQuXFxuXFxuU3RhY2s6XFxuJyArIGdldFN0YWNrKG5vZGUpLnJldmVyc2UoKS5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gJyAgPCcgKyBuYW1lICsgJz4nO1xuICB9KS5qb2luKCdcXG4nKSk7XG59O1xuXG52YXIgY3JlYXRlVXNlUHJvZHVjdEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VQcm9kdWN0SG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZUVudGVyKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG4gICAgdmFyIHByb3BzID0gZWxlbWVudC5wcm9wcztcblxuICAgIHZhciBwcm9wTmFtZXMgPSBwcm9wcyA/IE9iamVjdC5rZXlzKHByb3BzKSA6IFtdO1xuXG4gICAgcHJvcE5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvcE5hbWUuY2hhckF0KDApID09PSAnJCcpIHtcbiAgICAgICAgdmFyIGtleXdvcmQgPSBwcm9wTmFtZS5zdWJzdHIoMSwgcHJvcE5hbWUubGVuZ3RoKTtcbiAgICAgICAgdmFyIHByb2R1Y3RWYWx1ZSA9IHJlc29sdmVQcm9kdWN0KGJyaWRnZU1ldGhvZE5hbWUoa2V5d29yZCksIG5vZGUucGFyZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdldE5vdEZvdW5kRXJyb3Ioa2V5d29yZCwgbm9kZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZW1lbnQubWVyZ2VQcm9wcyhfZGVmaW5lUHJvcGVydHkoe30sIGtleXdvcmQsIHByb2R1Y3RWYWx1ZSkpO1xuICAgICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gJ2V4cG9ydHMnKSB7XG4gICAgICAgIG5vZGVbYnJpZGdlTWV0aG9kTmFtZShwcm9wc1twcm9wTmFtZV0pXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbm9kZS5fX3Byb2R1Y3QgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgIG5vZGUuX19wcm9kdWN0ID0gdmFsdWU7XG4gICAgcmV0dXJuIFtmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgIHJldHVybiBub2RlLl9fcHJvZHVjdCA9IG5ld1ZhbHVlO1xuICAgIH1dO1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHJvZHVjdEhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZVB1YlN1Ykhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHN1YnNjcmliZXJzID0ge307XG5cbmZ1bmN0aW9uIGNyZWF0ZVN1YnNjcmliZUVsZW1lbnQoc3Vic2NyaWJlLCB1c2VDaGlsZHJlbikge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgdHlwZSA9IF9yZWYudHlwZTtcblxuICAgIHZhciBfdXNlQ2hpbGRyZW4gPSB1c2VDaGlsZHJlbigpLFxuICAgICAgICBfdXNlQ2hpbGRyZW4yID0gX3NsaWNlZFRvQXJyYXkoX3VzZUNoaWxkcmVuLCAxKSxcbiAgICAgICAgY2hpbGRyZW4gPSBfdXNlQ2hpbGRyZW4yWzBdO1xuXG4gICAgc3Vic2NyaWJlKHR5cGUsIGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgICByZXR1cm4gY2hpbGRyZW4oeyBwYXlsb2FkOiBwYXlsb2FkIH0pO1xuICAgIH0pO1xuICB9O1xufTtcbmZ1bmN0aW9uIGNyZWF0ZVB1Ymxpc2hFbGVtZW50KHB1Ymxpc2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmMikge1xuICAgIHZhciB0eXBlID0gX3JlZjIudHlwZSxcbiAgICAgICAgcGF5bG9hZCA9IF9yZWYyLnBheWxvYWQ7XG5cbiAgICBwdWJsaXNoKHR5cGUsIHBheWxvYWQpO1xuICB9O1xufVxuXG52YXIgc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKGVsZW1lbnQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHN1YnNjcmliZXJzW3R5cGVdID0ge307XG4gIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdID0gY2FsbGJhY2s7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdO1xuICB9O1xufTtcbnZhciBwdWJsaXNoID0gZnVuY3Rpb24gcHVibGlzaCh0eXBlLCBwYXlsb2FkKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnNbdHlwZV0pLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgc3Vic2NyaWJlcnNbdHlwZV1baWRdKHBheWxvYWQpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVB1YlN1Ykhvb2socHJvY2Vzc29yLCB1c2VDaGlsZHJlbikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIGlmIChzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdKSB7XG4gICAgICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZWRFbGVtZW50KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsID0gc2NvcGVkRWxlbWVudCB8fCBub2RlLmVsZW1lbnQ7XG4gICAgdmFyIHN1YnNjcmliZUZ1bmMgPSBmdW5jdGlvbiBzdWJzY3JpYmVGdW5jKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBwYXJhbXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWJzY3JpYmUuYXBwbHkodW5kZWZpbmVkLCBbZWxdLmNvbmNhdChwYXJhbXMpKTtcbiAgICB9O1xuICAgIHZhciBwdWJsaXNoRnVuYyA9IGZ1bmN0aW9uIHB1Ymxpc2hGdW5jKCkge1xuICAgICAgcmV0dXJuIHB1Ymxpc2guYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmVGdW5jLFxuICAgICAgcHVibGlzaDogcHVibGlzaEZ1bmMsXG4gICAgICBzdWJzY3JpYmVyczogc3Vic2NyaWJlcnMsXG4gICAgICBTdWJzY3JpYmU6IGNyZWF0ZVN1YnNjcmliZUVsZW1lbnQoc3Vic2NyaWJlRnVuYywgdXNlQ2hpbGRyZW4pLFxuICAgICAgUHVibGlzaDogY3JlYXRlUHVibGlzaEVsZW1lbnQocHVibGlzaEZ1bmMpXG4gICAgfTtcbiAgfTtcbn1cblxuY3JlYXRlVXNlUHViU3ViSG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgc3Vic2NyaWJlcnMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZVJlZHVjZXJIb29rO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZURpc3BhdGNoRWxlbWVudChkaXNwYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgYWN0aW9uID0gX3JlZi5hY3Rpb24sXG4gICAgICAgIHByb3BzVG9BY3Rpb24gPSBfcmVmLnByb3BzVG9BY3Rpb24sXG4gICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydhY3Rpb24nLCAncHJvcHNUb0FjdGlvbiddKTtcblxuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgIGRpc3BhdGNoKGFjdGlvbik7XG4gICAgfSBlbHNlIGlmIChwcm9wc1RvQWN0aW9uKSB7XG4gICAgICBkaXNwYXRjaChwcm9wc1RvQWN0aW9uKHJlc3QpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCc8RGlzcGF0Y2g+IGV4cGVjdHMgXCJhY3Rpb25cIiBvciBcInByb3BzVG9BY3Rpb25cIiBwcm9wLicpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVXNlUmVkdWNlckhvb2sodXNlU3RhdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBpbml0aWFsU3RhdGUpIHtcbiAgICB2YXIgX3VzZVN0YXRlID0gdXNlU3RhdGUoaW5pdGlhbFN0YXRlKSxcbiAgICAgICAgX3VzZVN0YXRlMiA9IF9zbGljZWRUb0FycmF5KF91c2VTdGF0ZSwgMyksXG4gICAgICAgIHN0YXRlID0gX3VzZVN0YXRlMlswXSxcbiAgICAgICAgc2V0U3RhdGUgPSBfdXNlU3RhdGUyWzFdLFxuICAgICAgICBnZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMl07XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgIHJldHVybiBzZXRTdGF0ZShyZWR1Y2VyKGdldFN0YXRlKCksIGFjdGlvbikpO1xuICAgIH07XG5cbiAgICByZXR1cm4gW3N0YXRlLCBkaXNwYXRjaCwgY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSwgLy8gPERpc3BhdGNoPlxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRTdGF0ZSgpO1xuICAgIH0gLy8gPEdldFN0YXRlPlxuICAgIF07XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlU3RhdGVIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTdG9yYWdlID0ge1xuICBlbGVtZW50czoge30sXG4gIGdldDogZnVuY3Rpb24gZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0geyBzdGF0ZXM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9LFxuICBjbGVhblVwOiBmdW5jdGlvbiBjbGVhblVwKGlkKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbaWRdKSB7XG4gICAgICBkZWxldGUgdGhpcy5lbGVtZW50c1tpZF07XG4gICAgfVxuICB9XG59OyAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5mdW5jdGlvbiBjcmVhdGVVc2VTdGF0ZUhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gU3RvcmFnZS5jbGVhblVwKG5vZGUuZWxlbWVudC5pZCk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKGluaXRpYWxTdGF0ZSkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIHZhciBpbmRleCA9IHZvaWQgMDtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXMucHVzaChpbml0aWFsU3RhdGUpO1xuICAgICAgaW5kZXggPSBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxO1xuXG4gICAgICAvLyBvdGhlciBydW5zXG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcbiAgICAgIHN0b3JhZ2UuY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdG9yYWdlLnN0YXRlc1tpbmRleF0sIGZ1bmN0aW9uIChuZXdTdGF0ZSkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdID0gbmV3U3RhdGU7XG4gICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgbm9kZS5yZXJ1bigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlLnN0YXRlc1tpbmRleF07XG4gICAgfV07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1ZhbGlkSG9va0NvbnRleHQ7XG5mdW5jdGlvbiBpc1ZhbGlkSG9va0NvbnRleHQocHJvY2Vzc29yKSB7XG4gIGlmICghcHJvY2Vzc29yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgdGVycmlibHkgd3JvbmcgaGFwcGVuZWQuIFRoZSBob29rIGZhY3RvcnkgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGhvdXQgYSBwcm9jZXNzb3IuJyk7XG4gIH1cbiAgaWYgKCFwcm9jZXNzb3Iubm9kZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIb29rcyBtdXN0IGJlIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiBhbiBBY3RNTCBlbGVtZW50LicpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlVW5pdmVyc2UgPSBjcmVhdGVVbml2ZXJzZTtcblxudmFyIF9Qcm9jZXNzb3IgPSByZXF1aXJlKCcuL1Byb2Nlc3NvcicpO1xuXG52YXIgX1Byb2Nlc3NvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Qcm9jZXNzb3IpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50ID0gcmVxdWlyZSgnLi91dGlscy9pc0FjdE1MRWxlbWVudCcpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQWN0TUxFbGVtZW50KTtcblxudmFyIF9BY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9BY3RFbGVtZW50Jyk7XG5cbnZhciBfQWN0RWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY3RFbGVtZW50KTtcblxudmFyIF91c2VDaGlsZHJlbiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlQ2hpbGRyZW4nKTtcblxudmFyIF91c2VDaGlsZHJlbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VDaGlsZHJlbik7XG5cbnZhciBfdXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWxlbWVudCcpO1xuXG52YXIgX3VzZUVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWxlbWVudCk7XG5cbnZhciBfdXNlUHJvZHVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHJvZHVjdCcpO1xuXG52YXIgX3VzZVByb2R1Y3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHJvZHVjdCk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlUmVkdWNlciA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUmVkdWNlcicpO1xuXG52YXIgX3VzZVJlZHVjZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUmVkdWNlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZVVuaXZlcnNlKCkge1xuICB2YXIgcHJvY2Vzc29yID0gKDAsIF9Qcm9jZXNzb3IyLmRlZmF1bHQpKCk7XG5cbiAgZnVuY3Rpb24gQShmdW5jLCBwcm9wcykge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBjaGlsZHJlbiA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGNoaWxkcmVuW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gKDAsIF9BY3RFbGVtZW50Mi5kZWZhdWx0KShmdW5jLCBwcm9wcywgY2hpbGRyZW4pO1xuICB9XG4gIGZ1bmN0aW9uIHJ1bihlbGVtZW50KSB7XG4gICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShlbGVtZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3RNTCBlbGVtZW50IGV4cGVjdGVkLiBJbnN0ZWFkICcgKyBlbGVtZW50LnRvU3RyaW5nKCkgKyAnIHBhc3NlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb2Nlc3Nvci5ydW4oZWxlbWVudCk7XG4gIH1cbiAgdmFyIEZyYWdtZW50ID0gZnVuY3Rpb24gRnJhZ21lbnQoKSB7fTtcbiAgdmFyIHVzZUNoaWxkcmVuID0gKDAsIF91c2VDaGlsZHJlbjIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZUVsZW1lbnQgPSAoMCwgX3VzZUVsZW1lbnQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VTdGF0ZSA9ICgwLCBfdXNlU3RhdGUyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VQcm9kdWN0ID0gKDAsIF91c2VQcm9kdWN0Mi5kZWZhdWx0KShwcm9jZXNzb3IsIHVzZVN0YXRlKTtcbiAgdmFyIHVzZVB1YlN1YiA9ICgwLCBfdXNlUHViU3ViMi5kZWZhdWx0KShwcm9jZXNzb3IsIHVzZUNoaWxkcmVuKTtcbiAgdmFyIHVzZVJlZHVjZXIgPSAoMCwgX3VzZVJlZHVjZXIyLmRlZmF1bHQpKHVzZVN0YXRlKTtcblxuICByZXR1cm4ge1xuICAgIEE6IEEsXG4gICAgcnVuOiBydW4sXG4gICAgRnJhZ21lbnQ6IEZyYWdtZW50LFxuICAgIHByb2Nlc3NvcjogcHJvY2Vzc29yLFxuICAgIHVzZUNoaWxkcmVuOiB1c2VDaGlsZHJlbixcbiAgICB1c2VFbGVtZW50OiB1c2VFbGVtZW50LFxuICAgIHVzZVByb2R1Y3Q6IHVzZVByb2R1Y3QsXG4gICAgdXNlUHViU3ViOiB1c2VQdWJTdWIsXG4gICAgdXNlU3RhdGU6IHVzZVN0YXRlLFxuICAgIHVzZVJlZHVjZXI6IHVzZVJlZHVjZXJcbiAgfTtcbn1cblxudmFyIHVuaXZlcnNlID0gY3JlYXRlVW5pdmVyc2UoKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bml2ZXJzZTtcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZVVuaXZlcnNlID0gY3JlYXRlVW5pdmVyc2UoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQWN0TUxFbGVtZW50O1xuZnVuY3Rpb24gaXNBY3RNTEVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50Ll9fYWN0bWwgPT09IHRydWU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGtleUxpc3QgPSBPYmplY3Qua2V5cztcbnZhciBoYXNQcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09ICdvYmplY3QnICYmIHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFyckEgPSBpc0FycmF5KGEpXG4gICAgICAsIGFyckIgPSBpc0FycmF5KGIpXG4gICAgICAsIGlcbiAgICAgICwgbGVuZ3RoXG4gICAgICAsIGtleTtcblxuICAgIGlmIChhcnJBICYmIGFyckIpIHtcbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgICBpZiAoIWVxdWFsKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYXJyQSAhPSBhcnJCKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgZGF0ZUEgPSBhIGluc3RhbmNlb2YgRGF0ZVxuICAgICAgLCBkYXRlQiA9IGIgaW5zdGFuY2VvZiBEYXRlO1xuICAgIGlmIChkYXRlQSAhPSBkYXRlQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChkYXRlQSAmJiBkYXRlQikgcmV0dXJuIGEuZ2V0VGltZSgpID09IGIuZ2V0VGltZSgpO1xuXG4gICAgdmFyIHJlZ2V4cEEgPSBhIGluc3RhbmNlb2YgUmVnRXhwXG4gICAgICAsIHJlZ2V4cEIgPSBiIGluc3RhbmNlb2YgUmVnRXhwO1xuICAgIGlmIChyZWdleHBBICE9IHJlZ2V4cEIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAocmVnZXhwQSAmJiByZWdleHBCKSByZXR1cm4gYS50b1N0cmluZygpID09IGIudG9TdHJpbmcoKTtcblxuICAgIHZhciBrZXlzID0ga2V5TGlzdChhKTtcbiAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGggIT09IGtleUxpc3QoYikubGVuZ3RoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgaWYgKCFoYXNQcm9wLmNhbGwoYiwga2V5c1tpXSkpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gYSE9PWEgJiYgYiE9PWI7XG59O1xuIiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlczsiLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpICUgMikge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDI7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgRm9jdXNGaWVsZCB9IGZyb20gJy4vRE9NJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hlY2tGb3JFZGl0RmllbGQoeyB0b2RvcyB9KSB7XG4gIHJldHVybiA8Rm9jdXNGaWVsZCBpbmRleD17IHRvZG9zLmZpbmRJbmRleCgoeyBlZGl0aW5nIH0pID0+IGVkaXRpbmcpIH0gLz47XG59XG4iLCJpbXBvcnQgeyB1c2VDaGlsZHJlbiB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7XG4gIFRPR0dMRSxcbiAgTkVXX1RPRE8sXG4gIERFTEVURSxcbiAgRURJVCxcbiAgRURJVF9UT0RPXG59IGZyb20gJy4vU3RvcmUnO1xuXG5pbXBvcnQge1xuICBGSUxURVJfQUxMLFxuICBGSUxURVJfQUNUSVZFLFxuICBGSUxURVJfQ09NUExFVEVEXG59IGZyb20gJy4vRmlsdGVyJztcblxuY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBsaXN0ID0gJCgnLnRvZG8tbGlzdCcpO1xuY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuXG5jb25zdCBFTlRFUiA9IDEzO1xuY29uc3QgRVNDID0gMjc7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKCkge1xuICBjb25zdCBbICwgY29udGVudCBdID0gdXNlQ2hpbGRyZW4oKTtcblxuICBsaXN0LmlubmVySFRNTCA9IGNvbnRlbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihUT0dHTEUsIHRvZG9JbmRleCk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZGVsZXRlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihERUxFVEUsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9XG4gIH0pO1xuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRVNDKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV3JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgb25Vc2VyQWN0aW9uKE5FV19UT0RPLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gRm9jdXNGaWVsZCh7IGluZGV4IH0pIHtcbiAgY29uc3QgZWwgPSAkKGAuZWRpdFtkYXRhLWluZGV4PVwiJHsgaW5kZXggfVwiXWApO1xuXG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPSBlbC52YWx1ZS5sZW5ndGg7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3NDaGVja2VyKHsgdG9kb3MgfSkge1xuICBjb25zdCBjb21wbGV0ZWQgPSB0b2Rvcy5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IGNvbXBsZXRlZCkubGVuZ3RoO1xuICBjb25zdCBpdGVtc0xlZnQgPSB0b2Rvcy5sZW5ndGggLSBjb21wbGV0ZWQ7XG5cbiAgJCgnW2RhdGEtY291bnRdJykuaW5uZXJIVE1MID0gYFxuICAgIDxzdHJvbmc+JHsgaXRlbXNMZWZ0IH08L3N0cm9uZz4gJHsgaXRlbXNMZWZ0ID4gMSB8fCBpdGVtc0xlZnQgPT09IDAgPyAnaXRlbXMnIDogJ2l0ZW0nIH0gbGVmdFxuICBgO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaWx0ZXJPcHRpb25zKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgJCgnW2RhdGEtZmlsdGVyXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFsbCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0FMTCk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUNUSVZFKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1jb21wbGV0ZWQnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9DT01QTEVURUQpO1xuICAgIH1cbiAgfSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlck9wdGlvbnNUYWJzKHsgZmlsdGVyIH0pIHtcbiAgJCgnW2RhdGEtYWxsXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9BTEwgPyAnc2VsZWN0ZWQnIDogJycpO1xuICAkKCdbZGF0YS1hY3RpdmVdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICQoJ1tkYXRhLWNvbXBsZXRlZF0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQ09NUExFVEVEID8gJ3NlbGVjdGVkJyA6ICcnKTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIEZyYWdtZW50LCB1c2VQcm9kdWN0LCB1c2VQdWJTdWIsIHVzZVN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9BTEwgPSAnRklMVEVSX0FMTCc7XG5leHBvcnQgY29uc3QgRklMVEVSX0FDVElWRSA9ICdGSUxURVJfQUNUSVZFJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQ09NUExFVEVEID0gJ0ZJTFRFUl9DT01QTEVURUQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGaWx0ZXIoKSB7XG4gIGNvbnN0IFsgZmlsdGVyLCBzZXRGaWx0ZXIgXSA9IHVzZVN0YXRlKEZJTFRFUl9BTEwpO1xuICBjb25zdCB7IFN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG5cbiAgdXNlUHJvZHVjdChmaWx0ZXIpO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRklMVEVSX0FMTCB9PlxuICAgICAgICB7ICgpID0+IHNldEZpbHRlcihGSUxURVJfQUxMKSB9XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEZJTFRFUl9BQ1RJVkUgfT5cbiAgICAgICAgeyAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FDVElWRSkgfVxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBGSUxURVJfQ09NUExFVEVEIH0+XG4gICAgICAgIHsgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9DT01QTEVURUQpIH1cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZpbGxDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBGSUxURVJfQUxMLCBGSUxURVJfQUNUSVZFLCBGSUxURVJfQ09NUExFVEVEIH0gZnJvbSAnLi9GaWx0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlcih7IHRvZG9zLCBmaWx0ZXIgfSkge1xuICByZXR1cm4gKFxuICAgIDxGaWxsQ29udGFpbmVyPlxuICAgICAge1xuICAgICAgICB0b2Rvc1xuICAgICAgICAuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiB7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FMTCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSkgcmV0dXJuICFjb21wbGV0ZWQ7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCkgcmV0dXJuIGNvbXBsZXRlZDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLm1hcCgodG9kbywgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpQ2xhc3MgPSB0b2RvLmVkaXRpbmcgPyAnZWRpdGluZycgOiAodG9kby5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnKTtcblxuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9JyR7IGxpQ2xhc3MgfSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGVcbiAgICAgICAgICAgICAgICAgICR7IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfT5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtbGFiZWw+JHsgdG9kby5sYWJlbCB9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImRlc3Ryb3lcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWRlbGV0ZT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXRcIiB2YWx1ZT1cIiR7IHRvZG8ubGFiZWwgfVwiIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWVkaXQ+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgICB9XG4gICAgPC9GaWxsQ29udGFpbmVyPlxuICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIEZyYWdtZW50LCB1c2VSZWR1Y2VyLCB1c2VQcm9kdWN0LCB1c2VQdWJTdWIgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFID0gJ1RPR0dMRSc7XG5leHBvcnQgY29uc3QgTkVXX1RPRE8gPSAnTkVXX1RPRE8nO1xuZXhwb3J0IGNvbnN0IERFTEVURSA9ICdERUxFVEUnO1xuZXhwb3J0IGNvbnN0IEVESVQgPSAnRURJVCc7XG5leHBvcnQgY29uc3QgRURJVF9UT0RPID0gJ0VESVRfVE9ETyc7XG5cbmNvbnN0IHRvZ2dsZSA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IFRPR0dMRSwgdG9kb0luZGV4IH0pO1xuY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IERFTEVURSwgdG9kb0luZGV4IH0pO1xuY29uc3QgbmV3VG9kbyA9IChsYWJlbCkgPT4gKHsgdHlwZTogTkVXX1RPRE8sIGxhYmVsIH0pO1xuY29uc3QgZWRpdCA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IEVESVQsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGVkaXRUb0RvID0gKHsgaW5kZXgsIGxhYmVsIH0pID0+ICh7IHR5cGU6IEVESVRfVE9ETywgaW5kZXgsIGxhYmVsIH0pO1xuXG5jb25zdCBUb0RvID0gKHsgbGFiZWwgfSkgPT4gKHsgbGFiZWwsIGNvbXBsZXRlZDogZmFsc2UsIGVkaXRpbmc6IGZhbHNlIH0pO1xuY29uc3QgaW5pdGlhbFZhbHVlID0gW1xuICBUb0RvKHsgbGFiZWw6ICdGaXJzdCB0YXNrJyB9KSxcbiAgVG9Ebyh7IGxhYmVsOiAnU2Vjb25kIHRhc2snIH0pXG5dO1xuY29uc3QgcmVkdWNlciA9IGZ1bmN0aW9uICh0b2RvcywgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRTpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkOiAhdG9kby5jb21wbGV0ZWRcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBlZGl0aW5nOiAhdG9kby5lZGl0aW5nXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVF9UT0RPOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24uaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGxhYmVsOiBhY3Rpb24ubGFiZWwsXG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIE5FV19UT0RPOlxuICAgICAgcmV0dXJuIFsgLi4udG9kb3MsIFRvRG8oeyBsYWJlbDogYWN0aW9uLmxhYmVsIH0pIF07XG4gICAgY2FzZSBERUxFVEU6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggIT09IGFjdGlvbi50b2RvSW5kZXgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdG9kb3M7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0b3JlKCkge1xuICBjb25zdCBbIHRvZG9zLCAsIERpc3BhdGNoIF0gPSB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxWYWx1ZSk7XG4gIGNvbnN0IHsgU3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcblxuICB1c2VQcm9kdWN0KHRvZG9zKTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IFRPR0dMRSB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IHRvZG9JbmRleCB9KSA9PiB0b2dnbGUodG9kb0luZGV4KSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IE5FV19UT0RPIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZDogbGFiZWwgfSkgPT4gbmV3VG9kbyhsYWJlbCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBERUxFVEUgfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkOiB0b2RvSW5kZXggfSkgPT4gZGVsZXRlVG9kbyh0b2RvSW5kZXgpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRURJVCB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IHRvZG9JbmRleCB9KSA9PiBlZGl0KHRvZG9JbmRleCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBFRElUX1RPRE8gfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkIH0pID0+IGVkaXRUb0RvKHBheWxvYWQpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iLCIvKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCBydW4sIEZyYWdtZW50LCB1c2VQdWJTdWIgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgQ2hlY2tGb3JFZGl0RmllbGQgZnJvbSAnLi9DaGVja0ZvckVkaXRGaWVsZCc7XG5pbXBvcnQgeyBQcm9ncmVzc0NoZWNrZXIsIEZpbHRlck9wdGlvbnNUYWJzLCBDb250YWluZXIsIEZpbHRlck9wdGlvbnMgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgRmlsdGVyIGZyb20gJy4vRmlsdGVyJztcblxuZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCB7IHB1Ymxpc2ggfSA9IHVzZVB1YlN1YigpO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPENvbnRhaW5lciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0gLz5cbiAgICAgIDxGaWx0ZXJPcHRpb25zIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfS8+XG4gICAgICA8U3RvcmUgZXhwb3J0cz0ndG9kb3MnPlxuICAgICAgICA8RmlsdGVyIGV4cG9ydHM9J2ZpbHRlcic+XG4gICAgICAgICAgPFJlbmRlcmVyICR0b2RvcyAkZmlsdGVyIC8+XG4gICAgICAgICAgPEZpbHRlck9wdGlvbnNUYWJzICRmaWx0ZXIgLz5cbiAgICAgICAgPC9GaWx0ZXI+XG4gICAgICAgIDxDaGVja0ZvckVkaXRGaWVsZCAkdG9kb3MgLz5cbiAgICAgICAgPFByb2dyZXNzQ2hlY2tlciAkdG9kb3MgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=