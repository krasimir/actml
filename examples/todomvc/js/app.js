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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNoaWxkcmVuLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VQdWJTdWIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VSZWR1Y2VyLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL3V0aWxzL2lzQWN0TUxFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9ub2RlX21vZHVsZXMvZmFzdC1kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyc2lzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImdldEZ1bmNOYW1lIiwiZnVuYyIsIm5hbWUiLCJyZXN1bHQiLCJleGVjIiwidG9TdHJpbmciLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsIkVycm9yIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsIl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJzaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5IiwiZW50ZXIiLCJvdXQiLCJkZWZhdWx0IiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwib2JqIiwiX19lc01vZHVsZSIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZm4iLCJnZW4iLCJhcHBseSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic3RlcCIsImtleSIsImFyZyIsImluZm8iLCJlcnJvciIsImRvbmUiLCJ0aGVuIiwiZXJyIiwiX3RoaXMiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJwcm9jZXNzTm9kZSIsIl9yZWYiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZTIiLCJub2RlIiwiZ2VuUmVzdWx0IiwidG9HZW5WYWx1ZSIsIndyYXAiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwcmV2IiwibmV4dCIsInJlcnVuIiwiY2FsbENoaWxkcmVuIiwiX3JlZjIiLCJfY2FsbGVlIiwiY2hpbGRyZW5SZXN1bHQiLCJpIiwiX2NoaWxkcmVuJGkiLCJmdW5jUmVzdWx0IiwiX2FyZ3MiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiZWxlbWVudCIsInQwIiwiYWRkQ2hpbGROb2RlIiwidDEiLCJzZW50IiwicHVzaCIsImNhbGwiLCJ0MiIsInQzIiwiYWJydXB0Iiwic3RvcCIsIl94IiwicnVuIiwicmVzb2x2ZWRSb290Tm9kZSIsInJlc29sdmVSb290Iiwib25Ob2RlRW50ZXIiLCJjYWxsYmFjayIsImFkZE5vZGVFbnRlckNhbGxiYWNrIiwib25Ob2RlT3V0IiwiYWRkTm9kZU91dENhbGxiYWNrIiwib25Ob2RlUmVtb3ZlIiwic3lzdGVtIiwicmVzZXQiLCJjbGVhciIsIlRyZWUiLCJfZmFzdERlZXBFcXVhbCIsIl9mYXN0RGVlcEVxdWFsMiIsIl9vbk5vZGVSZW1vdmUiLCJyb290IiwiY3JlYXRlTmV3Tm9kZSIsImlkcyIsImdldElkIiwidXNlU2FtZU5vZGUiLCJuZXdFbGVtZW50IiwidHJlZURpZmYiLCJvbGRFbGVtZW50IiwicGFyZW50IiwiY3Vyc29yIiwiZm9yRWFjaCIsImMiLCJfdGhpczIiLCJzcGxpY2UiLCJyZW1vdmVkTm9kZSIsIl90aGlzMyIsImNoaWxkTm9kZSIsIm5ld0NoaWxkTm9kZSIsImdldE51bU9mRWxlbWVudHMiLCJkaWFnbm9zZSIsImxvb3BPdmVyIiwiaW5kIiwibWFwIiwiY2hpbGQiLCJfaXNWYWxpZEhvb2tDb250ZXh0IiwiX2lzVmFsaWRIb29rQ29udGV4dDIiLCJjcmVhdGVVc2VDaGlsZHJlbkhvb2siLCJwcm9jZXNzb3IiLCJjcmVhdGVVc2VFbGVtZW50SG9vayIsIl9kZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImJyaWRnZU1ldGhvZE5hbWUiLCJrZXl3b3JkIiwicmVzb2x2ZVByb2R1Y3QiLCJicmlkZ2VNZXRob2QiLCJnZXRFcnJvciIsInNvdXJjZSIsImZpbmQiLCJwcm9kdWN0IiwiZ2V0Tm90Rm91bmRFcnJvciIsImdldFN0YWNrIiwic3RhY2siLCJyZXZlcnNlIiwiam9pbiIsImNyZWF0ZVVzZVByb2R1Y3RIb29rIiwicHJvcE5hbWVzIiwia2V5cyIsInByb3BOYW1lIiwiY2hhckF0Iiwic3Vic3RyIiwicHJvZHVjdFZhbHVlIiwiX19wcm9kdWN0IiwibmV3VmFsdWUiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJhcnIiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwiY3JlYXRlVXNlUHViU3ViSG9vayIsInN1YnNjcmliZXJzIiwiY3JlYXRlU3Vic2NyaWJlRWxlbWVudCIsInN1YnNjcmliZSIsInVzZUNoaWxkcmVuIiwidHlwZSIsIl91c2VDaGlsZHJlbiIsIl91c2VDaGlsZHJlbjIiLCJwYXlsb2FkIiwiY3JlYXRlUHVibGlzaEVsZW1lbnQiLCJwdWJsaXNoIiwic2NvcGVkRWxlbWVudCIsImVsIiwic3Vic2NyaWJlRnVuYyIsIl9sZW4iLCJwYXJhbXMiLCJfa2V5IiwiY29uY2F0IiwicHVibGlzaEZ1bmMiLCJTdWJzY3JpYmUiLCJQdWJsaXNoIiwiY3JlYXRlVXNlUmVkdWNlckhvb2siLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJ0YXJnZXQiLCJpbmRleE9mIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsImFjdGlvbiIsInByb3BzVG9BY3Rpb24iLCJyZXN0IiwidXNlU3RhdGUiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImdldFN0YXRlIiwiY3JlYXRlVXNlU3RhdGVIb29rIiwiU3RvcmFnZSIsImVsZW1lbnRzIiwiZ2V0Iiwic3RhdGVzIiwiY29uc3VtZXIiLCJjbGVhblVwIiwic3RvcmFnZSIsImluZGV4IiwibmV3U3RhdGUiLCJpc1ZhbGlkSG9va0NvbnRleHQiLCJjcmVhdGVVbml2ZXJzZSIsIl9Qcm9jZXNzb3IiLCJfUHJvY2Vzc29yMiIsIl9BY3RFbGVtZW50IiwiX0FjdEVsZW1lbnQyIiwiX3VzZUVsZW1lbnQiLCJfdXNlRWxlbWVudDIiLCJfdXNlUHJvZHVjdCIsIl91c2VQcm9kdWN0MiIsIl91c2VSZWR1Y2VyIiwiX3VzZVJlZHVjZXIyIiwiQSIsIkZyYWdtZW50IiwidXNlRWxlbWVudCIsInVzZVByb2R1Y3QiLCJ1c2VQdWJTdWIiLCJ1c2VSZWR1Y2VyIiwidW5pdmVyc2UiLCJtb2R1bGUiLCJpc0FjdE1MRWxlbWVudCIsIkNoZWNrRm9yRWRpdEZpZWxkIiwidG9kb3MiLCJmaW5kSW5kZXgiLCJlZGl0aW5nIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGlzdCIsImhlYWRlciIsIkVOVEVSIiwiRVNDIiwiRmlsbENvbnRhaW5lciIsImNvbnRlbnQiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJvblVzZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiVE9HR0xFIiwiREVMRVRFIiwiRURJVCIsIkVESVRfVE9ETyIsImxhYmVsIiwia2V5Q29kZSIsIk5FV19UT0RPIiwiRm9jdXNGaWVsZCIsImZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJQcm9ncmVzc0NoZWNrZXIiLCJjb21wbGV0ZWQiLCJmaWx0ZXIiLCJpdGVtc0xlZnQiLCJGb290ZXIiLCJGSUxURVJfQUxMIiwiRklMVEVSX0FDVElWRSIsIkZJTFRFUl9DT01QTEVURUQiLCJDTEVBUl9DT01QTEVURUQiLCJGaWx0ZXJPcHRpb25zVGFicyIsInNldEF0dHJpYnV0ZSIsIkZpbHRlciIsInNldEZpbHRlciIsImluaXRpYWxWYWx1ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJUb0RvIiwiUHJvdmlkZXIiLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwiUmVuZGVyZXIiLCJ0b2RvIiwibGlDbGFzcyIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVkaXRUb0RvIiwiY2xlYXJDb21wbGV0ZWQiLCJTdG9yZSIsIkRpc3BhdGNoIiwiQXBwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUViQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7O0FBR0EsU0FBU0MsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDekIsTUFBSUEsSUFBSSxDQUFDQyxJQUFULEVBQWUsT0FBT0QsSUFBSSxDQUFDQyxJQUFaO0FBQ2YsTUFBSUMsTUFBTSxHQUFHLDZCQUE2QkMsSUFBN0IsQ0FBa0NILElBQUksQ0FBQ0ksUUFBTCxFQUFsQyxDQUFiO0FBRUEsU0FBT0YsTUFBTSxHQUFHQSxNQUFNLENBQUMsQ0FBRCxDQUFULEdBQWUsU0FBNUI7QUFDRDs7QUFBQTs7QUFFRCxJQUFJRyxhQUFhLEdBQUcsU0FBU0EsYUFBVCxDQUF1QkwsSUFBdkIsRUFBNkJNLEtBQTdCLEVBQW9DQyxRQUFwQyxFQUE4QztBQUNoRSxNQUFJLE9BQU9QLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDOUIsVUFBTSxJQUFJUSxLQUFKLENBQVUsd0NBQXdDUixJQUF4QyxHQUErQyxrQkFBekQsQ0FBTjtBQUNEOztBQUNELFNBQU87QUFDTFMsV0FBTyxFQUFFLElBREo7QUFFTEMsVUFBTSxFQUFFLENBRkg7QUFHTEMsYUFBUyxFQUFFLEtBSE47QUFJTEMsa0NBQThCLEVBQUUsSUFKM0I7QUFLTEMsTUFBRSxFQUFFLElBTEM7QUFNTFAsU0FBSyxFQUFFQSxLQU5GO0FBT0xMLFFBQUksRUFBRUYsV0FBVyxDQUFDQyxJQUFELENBUFo7QUFRTE8sWUFBUSxFQUFFQSxRQVJMO0FBU0xPLGNBQVUsRUFBRSxTQUFTQSxVQUFULENBQW9CRCxFQUFwQixFQUF3QjtBQUNsQyxVQUFJRSxJQUFJLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixDQUFuQixJQUF3QkQsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQkUsU0FBekMsR0FBcURGLFNBQVMsQ0FBQyxDQUFELENBQTlELEdBQW9FLENBQS9FO0FBRUEsV0FBS0gsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsV0FBS0gsTUFBTCxHQUFjSyxJQUFkO0FBQ0EsV0FBS0osU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtDLDhCQUFMLEdBQXNDLElBQXRDO0FBQ0QsS0FoQkk7QUFpQkxPLGNBQVUsRUFBRSxTQUFTQSxVQUFULENBQW9CQyxRQUFwQixFQUE4QjtBQUN4QyxXQUFLZCxLQUFMLEdBQWFYLE1BQU0sQ0FBQzBCLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtmLEtBQXZCLEVBQThCYyxRQUE5QixDQUFiO0FBQ0QsS0FuQkk7QUFvQkxMLFFBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLGFBQU8sS0FBS0wsTUFBWjtBQUNELEtBdEJJO0FBdUJMWSxhQUFTLEVBQUUsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixhQUFPLEtBQUtYLFNBQVo7QUFDRCxLQXpCSTtBQTBCTFksc0NBQWtDLEVBQUUsU0FBU0Esa0NBQVQsQ0FBNEN6QixLQUE1QyxFQUFtRDtBQUNyRixVQUFJLE9BQU9BLEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDaEMsZUFBTyxLQUFLYyw4QkFBWjtBQUNEOztBQUNELFdBQUtBLDhCQUFMLEdBQXNDZCxLQUF0QztBQUNBLGFBQU9BLEtBQVA7QUFDRCxLQWhDSTtBQWlDTDBCLFNBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCLFdBQUtiLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxXQUFLQyw4QkFBTCxHQUFzQyxJQUF0QztBQUVBLGFBQU9aLElBQUksQ0FBQyxLQUFLTSxLQUFOLENBQVg7QUFDRCxLQXRDSTtBQXVDTG1CLE9BQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBS2YsTUFBTCxJQUFlLENBQWY7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7QUExQ0ksR0FBUDtBQTRDRCxDQWhERDs7QUFrREFkLE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0JyQixhQUFsQixDOzs7Ozs7Ozs7Ozs7QUM5RGE7O0FBRWJWLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCQyxlQUFsQjs7QUFFQSxJQUFJQyxlQUFlLEdBQUdDLG1CQUFPLENBQUMsaUVBQUQsQ0FBN0I7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUdDLHNCQUFzQixDQUFDSCxlQUFELENBQTdDOztBQUVBLElBQUlJLEtBQUssR0FBR0gsbUJBQU8sQ0FBQyxpQ0FBRCxDQUFuQjs7QUFFQSxJQUFJSSxNQUFNLEdBQUdGLHNCQUFzQixDQUFDQyxLQUFELENBQW5DOztBQUVBLElBQUlFLFVBQVUsR0FBR0wsbUJBQU8sQ0FBQyx1REFBRCxDQUF4Qjs7QUFFQSxJQUFJTSxXQUFXLEdBQUdKLHNCQUFzQixDQUFDRyxVQUFELENBQXhDOztBQUVBLElBQUlFLFNBQVMsR0FBR1AsbUJBQU8sQ0FBQyxxREFBRCxDQUF2Qjs7QUFFQSxJQUFJUSxVQUFVLEdBQUdOLHNCQUFzQixDQUFDSyxTQUFELENBQXZDOztBQUVBLFNBQVNMLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLFNBQVNFLGlCQUFULENBQTJCQyxFQUEzQixFQUErQjtBQUFFLFNBQU8sWUFBWTtBQUFFLFFBQUlDLEdBQUcsR0FBR0QsRUFBRSxDQUFDRSxLQUFILENBQVMsSUFBVCxFQUFlM0IsU0FBZixDQUFWO0FBQXFDLFdBQU8sSUFBSTRCLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUFFLGVBQVNDLElBQVQsQ0FBY0MsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0I7QUFBRSxZQUFJO0FBQUUsY0FBSUMsSUFBSSxHQUFHUixHQUFHLENBQUNNLEdBQUQsQ0FBSCxDQUFTQyxHQUFULENBQVg7QUFBMEIsY0FBSW5ELEtBQUssR0FBR29ELElBQUksQ0FBQ3BELEtBQWpCO0FBQXlCLFNBQXpELENBQTBELE9BQU9xRCxLQUFQLEVBQWM7QUFBRUwsZ0JBQU0sQ0FBQ0ssS0FBRCxDQUFOO0FBQWU7QUFBUzs7QUFBQyxZQUFJRCxJQUFJLENBQUNFLElBQVQsRUFBZTtBQUFFUCxpQkFBTyxDQUFDL0MsS0FBRCxDQUFQO0FBQWlCLFNBQWxDLE1BQXdDO0FBQUUsaUJBQU84QyxPQUFPLENBQUNDLE9BQVIsQ0FBZ0IvQyxLQUFoQixFQUF1QnVELElBQXZCLENBQTRCLFVBQVV2RCxLQUFWLEVBQWlCO0FBQUVpRCxnQkFBSSxDQUFDLE1BQUQsRUFBU2pELEtBQVQsQ0FBSjtBQUFzQixXQUFyRSxFQUF1RSxVQUFVd0QsR0FBVixFQUFlO0FBQUVQLGdCQUFJLENBQUMsT0FBRCxFQUFVTyxHQUFWLENBQUo7QUFBcUIsV0FBN0csQ0FBUDtBQUF3SDtBQUFFOztBQUFDLGFBQU9QLElBQUksQ0FBQyxNQUFELENBQVg7QUFBc0IsS0FBalcsQ0FBUDtBQUE0VyxHQUF0YTtBQUF5YTtBQUFDO0FBRzNjOzs7QUFFQSxTQUFTcEIsZUFBVCxHQUEyQjtBQUN6QixNQUFJNEIsS0FBSyxHQUFHLElBQVo7O0FBRUEsTUFBSUMsSUFBSSxHQUFHLENBQUMsR0FBR3ZCLE1BQU0sQ0FBQ1AsT0FBWCxHQUFYO0FBQ0EsTUFBSStCLFdBQVcsR0FBRyxJQUFsQjs7QUFFQSxNQUFJQyxXQUFXLEdBQUcsWUFBWTtBQUM1QixRQUFJQyxJQUFJLEdBQUduQixpQkFBaUI7QUFBRTtBQUFhb0Isc0JBQWtCLENBQUNDLElBQW5CLENBQXdCLFNBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3pGLFVBQUk3RCxNQUFKLEVBQVk4RCxTQUFaLEVBQXVCQyxVQUF2QjtBQUNBLGFBQU9MLGtCQUFrQixDQUFDTSxJQUFuQixDQUF3QixTQUFTQyxTQUFULENBQW1CQyxTQUFuQixFQUE4QjtBQUMzRCxlQUFPLENBQVAsRUFBVTtBQUNSLGtCQUFRQSxTQUFTLENBQUNDLElBQVYsR0FBaUJELFNBQVMsQ0FBQ0UsSUFBbkM7QUFDRSxpQkFBSyxDQUFMO0FBQ0ViLHlCQUFXLEdBQUdNLElBQWQ7QUFDQUEsa0JBQUksQ0FBQ3ZDLEtBQUw7O0FBQ0F1QyxrQkFBSSxDQUFDUSxLQUFMLEdBQWEsWUFBWTtBQUN2Qix1QkFBT2IsV0FBVyxDQUFDSyxJQUFELENBQWxCO0FBQ0QsZUFGRDs7QUFHQUEsa0JBQUksQ0FBQ1MsWUFBTCxHQUFvQixZQUFZO0FBQzlCLG9CQUFJQyxLQUFLLEdBQUdqQyxpQkFBaUI7QUFBRTtBQUFhb0Isa0NBQWtCLENBQUNDLElBQW5CLENBQXdCLFNBQVNhLE9BQVQsR0FBbUI7QUFDckYsc0JBQUlDLGNBQUo7QUFBQSxzQkFDSXBFLFFBREo7QUFBQSxzQkFFSXFFLENBRko7QUFBQSxzQkFHSUMsV0FISjtBQUFBLHNCQUlJQyxVQUpKO0FBQUEsc0JBS0lDLEtBQUssR0FBRy9ELFNBTFo7O0FBT0EseUJBQU80QyxrQkFBa0IsQ0FBQ00sSUFBbkIsQ0FBd0IsU0FBU2MsUUFBVCxDQUFrQkMsUUFBbEIsRUFBNEI7QUFDekQsMkJBQU8sQ0FBUCxFQUFVO0FBQ1IsOEJBQVFBLFFBQVEsQ0FBQ1osSUFBVCxHQUFnQlksUUFBUSxDQUFDWCxJQUFqQztBQUNFLDZCQUFLLENBQUw7QUFDRUssd0NBQWMsR0FBRyxFQUFqQjtBQUNBcEUsa0NBQVEsR0FBR3dELElBQUksQ0FBQ21CLE9BQUwsQ0FBYTNFLFFBQXhCOztBQUVBLDhCQUFJLEVBQUVBLFFBQVEsSUFBSUEsUUFBUSxDQUFDVSxNQUFULEdBQWtCLENBQWhDLENBQUosRUFBd0M7QUFDdENnRSxvQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0E7QUFDRDs7QUFFRE0sMkJBQUMsR0FBRyxDQUFKOztBQUVGLDZCQUFLLENBQUw7QUFDRSw4QkFBSSxFQUFFQSxDQUFDLEdBQUdyRSxRQUFRLENBQUNVLE1BQWYsQ0FBSixFQUE0QjtBQUMxQmdFLG9DQUFRLENBQUNYLElBQVQsR0FBZ0IsRUFBaEI7QUFDQTtBQUNEOztBQUVELDhCQUFJLENBQUMsQ0FBQyxHQUFHeEMsZ0JBQWdCLENBQUNKLE9BQXJCLEVBQThCbkIsUUFBUSxDQUFDcUUsQ0FBRCxDQUF0QyxDQUFMLEVBQWlEO0FBQy9DSyxvQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0E7QUFDRDs7QUFFRCwyQkFBQ08sV0FBVyxHQUFHdEUsUUFBUSxDQUFDcUUsQ0FBRCxDQUF2QixFQUE0QnpELFVBQTVCLENBQXVDd0IsS0FBdkMsQ0FBNkNrQyxXQUE3QyxFQUEwREUsS0FBMUQ7O0FBQ0FFLGtDQUFRLENBQUNFLEVBQVQsR0FBY1IsY0FBZDtBQUNBTSxrQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0EsaUNBQU9aLFdBQVcsQ0FBQ0ssSUFBSSxDQUFDcUIsWUFBTCxDQUFrQjdFLFFBQVEsQ0FBQ3FFLENBQUQsQ0FBMUIsQ0FBRCxDQUFsQjs7QUFFRiw2QkFBSyxFQUFMO0FBQ0VLLGtDQUFRLENBQUNJLEVBQVQsR0FBY0osUUFBUSxDQUFDSyxJQUF2Qjs7QUFFQUwsa0NBQVEsQ0FBQ0UsRUFBVCxDQUFZSSxJQUFaLENBQWlCQyxJQUFqQixDQUFzQlAsUUFBUSxDQUFDRSxFQUEvQixFQUFtQ0YsUUFBUSxDQUFDSSxFQUE1Qzs7QUFFQUosa0NBQVEsQ0FBQ1gsSUFBVCxHQUFnQixFQUFoQjtBQUNBOztBQUVGLDZCQUFLLEVBQUw7QUFDRSw4QkFBSSxFQUFFLE9BQU8vRCxRQUFRLENBQUNxRSxDQUFELENBQWYsS0FBdUIsVUFBekIsQ0FBSixFQUEwQztBQUN4Q0ssb0NBQVEsQ0FBQ1gsSUFBVCxHQUFnQixFQUFoQjtBQUNBO0FBQ0Q7O0FBRURXLGtDQUFRLENBQUNYLElBQVQsR0FBZ0IsRUFBaEI7QUFDQSxpQ0FBTy9ELFFBQVEsQ0FBQ3FFLENBQUQsQ0FBUixDQUFZakMsS0FBWixDQUFrQnBDLFFBQWxCLEVBQTRCd0UsS0FBNUIsQ0FBUDs7QUFFRiw2QkFBSyxFQUFMO0FBQ0VELG9DQUFVLEdBQUdHLFFBQVEsQ0FBQ0ssSUFBdEI7O0FBRUEsOEJBQUksQ0FBQyxDQUFDLEdBQUd4RCxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJvRCxVQUE5QixDQUFMLEVBQWdEO0FBQzlDRyxvQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0E7QUFDRDs7QUFFRFcsa0NBQVEsQ0FBQ1EsRUFBVCxHQUFjZCxjQUFkO0FBQ0FNLGtDQUFRLENBQUNYLElBQVQsR0FBZ0IsRUFBaEI7QUFDQSxpQ0FBT1osV0FBVyxDQUFDSyxJQUFJLENBQUNxQixZQUFMLENBQWtCTixVQUFsQixDQUFELENBQWxCOztBQUVGLDZCQUFLLEVBQUw7QUFDRUcsa0NBQVEsQ0FBQ1MsRUFBVCxHQUFjVCxRQUFRLENBQUNLLElBQXZCOztBQUVBTCxrQ0FBUSxDQUFDUSxFQUFULENBQVlGLElBQVosQ0FBaUJDLElBQWpCLENBQXNCUCxRQUFRLENBQUNRLEVBQS9CLEVBQW1DUixRQUFRLENBQUNTLEVBQTVDOztBQUVBVCxrQ0FBUSxDQUFDWCxJQUFULEdBQWdCLEVBQWhCO0FBQ0E7O0FBRUYsNkJBQUssRUFBTDtBQUNFSyx3Q0FBYyxDQUFDWSxJQUFmLENBQW9CVCxVQUFwQjs7QUFFRiw2QkFBSyxFQUFMO0FBQ0VGLDJCQUFDO0FBQ0RLLGtDQUFRLENBQUNYLElBQVQsR0FBZ0IsQ0FBaEI7QUFDQTs7QUFFRiw2QkFBSyxFQUFMO0FBQ0UsaUNBQU9XLFFBQVEsQ0FBQ1UsTUFBVCxDQUFnQixRQUFoQixFQUEwQmhCLGNBQTFCLENBQVA7O0FBRUYsNkJBQUssRUFBTDtBQUNBLDZCQUFLLEtBQUw7QUFDRSxpQ0FBT00sUUFBUSxDQUFDVyxJQUFULEVBQVA7QUE5RUo7QUFnRkQ7QUFDRixtQkFuRk0sRUFtRkpsQixPQW5GSSxFQW1GS25CLEtBbkZMLENBQVA7QUFvRkQsaUJBNUYyQyxDQUFmLENBQTdCOztBQThGQSx1QkFBTyxZQUFZO0FBQ2pCLHlCQUFPa0IsS0FBSyxDQUFDOUIsS0FBTixDQUFZLElBQVosRUFBa0IzQixTQUFsQixDQUFQO0FBQ0QsaUJBRkQ7QUFHRCxlQWxHbUIsRUFBcEIsQ0FORixDQTBHRTs7O0FBQ0FkLG9CQUFNLEdBQUc2RCxJQUFJLENBQUNtQixPQUFMLENBQWExRCxLQUFiLEVBQVQ7QUFDQXdDLHVCQUFTLEdBQUcsS0FBSyxDQUFqQixFQUFvQkMsVUFBVSxHQUFHLEtBQUssQ0FBdEMsQ0E1R0YsQ0E4R0U7O0FBRUEsa0JBQUksRUFBRS9ELE1BQU0sSUFBSUEsTUFBTSxDQUFDbUQsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QmUseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRURGLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsQ0FBakI7QUFDQSxxQkFBT3BFLE1BQVA7O0FBRUYsaUJBQUssQ0FBTDtBQUNFQSxvQkFBTSxHQUFHa0UsU0FBUyxDQUFDa0IsSUFBbkI7QUFDQWxCLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTs7QUFFRixpQkFBSyxFQUFMO0FBQ0Usa0JBQUksRUFBRXBFLE1BQU0sSUFBSSxPQUFPQSxNQUFNLENBQUNvRSxJQUFkLEtBQXVCLFVBQW5DLENBQUosRUFBb0Q7QUFDbERGLHlCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTtBQUNEOztBQUVETix1QkFBUyxHQUFHOUQsTUFBTSxDQUFDb0UsSUFBUCxFQUFaOztBQUVGLGlCQUFLLEVBQUw7QUFDRSxrQkFBSU4sU0FBUyxDQUFDWixJQUFkLEVBQW9CO0FBQ2xCZ0IseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRUQsa0JBQUksQ0FBQyxDQUFDLEdBQUd4QyxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJzQyxTQUFTLENBQUNsRSxLQUF4QyxDQUFMLEVBQXFEO0FBQ25Ec0UseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRURGLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQSxxQkFBT1osV0FBVyxDQUFDSyxJQUFJLENBQUNxQixZQUFMLENBQWtCcEIsU0FBUyxDQUFDbEUsS0FBNUIsQ0FBRCxDQUFsQjs7QUFFRixpQkFBSyxFQUFMO0FBQ0VtRSx3QkFBVSxHQUFHRyxTQUFTLENBQUNrQixJQUF2Qjs7QUFFRixpQkFBSyxFQUFMO0FBQ0V0Qix1QkFBUyxHQUFHOUQsTUFBTSxDQUFDb0UsSUFBUCxDQUFZTCxVQUFaLENBQVo7QUFDQUcsdUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBOztBQUVGLGlCQUFLLEVBQUw7QUFDRSxrQkFBSSxDQUFDLENBQUMsR0FBR3hDLGdCQUFnQixDQUFDSixPQUFyQixFQUE4QnNDLFNBQVMsQ0FBQ2xFLEtBQXhDLENBQUwsRUFBcUQ7QUFDbkRzRSx5QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7QUFDRDs7QUFFREYsdUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBLHFCQUFPWixXQUFXLENBQUNLLElBQUksQ0FBQ3FCLFlBQUwsQ0FBa0JwQixTQUFTLENBQUNsRSxLQUE1QixDQUFELENBQWxCOztBQUVGLGlCQUFLLEVBQUw7QUFDRUksb0JBQU0sR0FBR2tFLFNBQVMsQ0FBQ2tCLElBQW5CO0FBQ0FsQix1QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7O0FBRUYsaUJBQUssRUFBTDtBQUNFcEUsb0JBQU0sR0FBRzhELFNBQVMsQ0FBQ2xFLEtBQW5COztBQUVGLGlCQUFLLEVBQUw7QUFDRXNFLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQTs7QUFFRixpQkFBSyxFQUFMO0FBQ0Usa0JBQUksQ0FBQyxDQUFDLEdBQUd4QyxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJ4QixNQUE5QixDQUFMLEVBQTRDO0FBQzFDa0UseUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBO0FBQ0Q7O0FBRURGLHVCQUFTLENBQUNFLElBQVYsR0FBaUIsRUFBakI7QUFDQSxxQkFBT1osV0FBVyxDQUFDSyxJQUFJLENBQUNxQixZQUFMLENBQWtCbEYsTUFBbEIsQ0FBRCxDQUFsQjs7QUFFRixpQkFBSyxFQUFMO0FBQ0VBLG9CQUFNLEdBQUdrRSxTQUFTLENBQUNrQixJQUFuQjs7QUFFRixpQkFBSyxFQUFMO0FBQ0Usa0JBQUksQ0FBQ3ZCLElBQUksQ0FBQ21CLE9BQUwsQ0FBYTNELGtDQUFiLEVBQUwsRUFBd0Q7QUFDdEQ2Qyx5QkFBUyxDQUFDRSxJQUFWLEdBQWlCLEVBQWpCO0FBQ0E7QUFDRDs7QUFFREYsdUJBQVMsQ0FBQ0UsSUFBVixHQUFpQixFQUFqQjtBQUNBLHFCQUFPUCxJQUFJLENBQUNTLFlBQUwsRUFBUDs7QUFFRixpQkFBSyxFQUFMO0FBRUVULGtCQUFJLENBQUNtQixPQUFMLENBQWF6RCxHQUFiO0FBQ0FzQyxrQkFBSSxDQUFDdEMsR0FBTDtBQUNBZ0MseUJBQVcsR0FBRyxJQUFkO0FBRUEscUJBQU9XLFNBQVMsQ0FBQ3VCLE1BQVYsQ0FBaUIsUUFBakIsRUFBMkJ6RixNQUEzQixDQUFQOztBQUVGLGlCQUFLLEVBQUw7QUFDQSxpQkFBSyxLQUFMO0FBQ0UscUJBQU9rRSxTQUFTLENBQUN3QixJQUFWLEVBQVA7QUFoTko7QUFrTkQ7QUFDRixPQXJOTSxFQXFOSjlCLFFBck5JLEVBcU5NUCxLQXJOTixDQUFQO0FBc05ELEtBeE4wQyxDQUFmLENBQTVCOztBQTBOQSxXQUFPLFNBQVNHLFdBQVQsQ0FBcUJtQyxFQUFyQixFQUF5QjtBQUM5QixhQUFPbEMsSUFBSSxDQUFDaEIsS0FBTCxDQUFXLElBQVgsRUFBaUIzQixTQUFqQixDQUFQO0FBQ0QsS0FGRDtBQUdELEdBOU5pQixFQUFsQjs7QUFnT0EsU0FBTztBQUNMK0MsUUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsYUFBT04sV0FBUDtBQUNELEtBSEk7QUFJTHFDLE9BQUcsRUFBRSxTQUFTQSxHQUFULENBQWFaLE9BQWIsRUFBc0I7QUFDekIsVUFBSWEsZ0JBQWdCLEdBQUd2QyxJQUFJLENBQUN3QyxXQUFMLENBQWlCZCxPQUFqQixDQUF2QjtBQUVBLGFBQU94QixXQUFXLENBQUNxQyxnQkFBRCxFQUFtQixFQUFuQixDQUFsQjtBQUNELEtBUkk7QUFTTEUsZUFBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJDLFFBQXJCLEVBQStCO0FBQzFDMUMsVUFBSSxDQUFDMkMsb0JBQUwsQ0FBMEJELFFBQTFCO0FBQ0QsS0FYSTtBQVlMRSxhQUFTLEVBQUUsU0FBU0EsU0FBVCxDQUFtQkYsUUFBbkIsRUFBNkI7QUFDdEMxQyxVQUFJLENBQUM2QyxrQkFBTCxDQUF3QkgsUUFBeEI7QUFDRCxLQWRJO0FBZUxJLGdCQUFZLEVBQUUsU0FBU0EsWUFBVCxDQUFzQkosUUFBdEIsRUFBZ0M7QUFDNUMxQyxVQUFJLENBQUM4QyxZQUFMLENBQWtCSixRQUFsQjtBQUNELEtBakJJO0FBa0JMSyxVQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixhQUFPO0FBQ0wvQyxZQUFJLEVBQUVBLElBREQ7QUFFTGdELGFBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCaEQsY0FBSSxDQUFDZ0QsS0FBTDs7QUFDQXJFLHFCQUFXLENBQUNULE9BQVosQ0FBb0IrRSxLQUFwQjs7QUFDQXBFLG9CQUFVLENBQUNYLE9BQVgsQ0FBbUIrRSxLQUFuQjtBQUNEO0FBTkksT0FBUDtBQVFEO0FBM0JJLEdBQVA7QUE2QkQ7O0FBQUEsQzs7Ozs7Ozs7Ozs7O0FDalNZOztBQUViOUcsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDO0FBR0FELE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0JnRixJQUFsQjs7QUFFQSxJQUFJQyxjQUFjLEdBQUc5RSxtQkFBTyxDQUFDLG9FQUFELENBQTVCOztBQUVBLElBQUkrRSxlQUFlLEdBQUc3RSxzQkFBc0IsQ0FBQzRFLGNBQUQsQ0FBNUM7O0FBRUEsU0FBUzVFLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLFNBQVNvRSxJQUFULEdBQWdCO0FBQ2QsTUFBSVQsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsTUFBSUcsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsTUFBSVMsYUFBYSxHQUFHLEVBQXBCO0FBQ0EsTUFBSUMsSUFBSSxHQUFHQyxhQUFhLEVBQXhCO0FBQ0EsTUFBSUMsR0FBRyxHQUFHLENBQVY7O0FBRUEsV0FBU0MsS0FBVCxHQUFpQjtBQUNmLFdBQU8sTUFBTSxFQUFFRCxHQUFmO0FBQ0Q7O0FBQUE7O0FBQ0QsV0FBU0UsV0FBVCxDQUFxQm5ELElBQXJCLEVBQTJCb0QsVUFBM0IsRUFBdUM7QUFDckNBLGNBQVUsQ0FBQ3JHLFVBQVgsQ0FBc0JpRCxJQUFJLENBQUNtQixPQUFMLENBQWFyRSxFQUFuQyxFQUF1Q2tELElBQUksQ0FBQ21CLE9BQUwsQ0FBYW5FLElBQWIsRUFBdkM7QUFDQWdELFFBQUksQ0FBQ21CLE9BQUwsR0FBZWlDLFVBQWY7QUFDQSxXQUFPcEQsSUFBUDtBQUNEOztBQUNELFdBQVNxRCxRQUFULENBQWtCQyxVQUFsQixFQUE4QkYsVUFBOUIsRUFBMEM7QUFDeEMsUUFBSUUsVUFBVSxJQUFJQSxVQUFVLENBQUNwSCxJQUFYLEtBQW9Ca0gsVUFBVSxDQUFDbEgsSUFBakQsRUFBdUQ7QUFDckQsYUFBTyxDQUFDLEdBQUcyRyxlQUFlLENBQUNsRixPQUFwQixFQUE2QjJGLFVBQVUsQ0FBQy9HLEtBQXhDLEVBQStDNkcsVUFBVSxDQUFDN0csS0FBMUQsQ0FBUDtBQUNEOztBQUNELFdBQU8sS0FBUDtBQUNEOztBQUNELFdBQVN5RyxhQUFULENBQXVCN0IsT0FBdkIsRUFBZ0NvQyxNQUFoQyxFQUF3QztBQUN0QyxRQUFJcEMsT0FBSixFQUFhO0FBQ1hBLGFBQU8sQ0FBQ3BFLFVBQVIsQ0FBbUJtRyxLQUFLLEVBQXhCO0FBQ0Q7O0FBQ0QsV0FBTztBQUNML0IsYUFBTyxFQUFFQSxPQURKO0FBRUwzRSxjQUFRLEVBQUUsRUFGTDtBQUdMK0csWUFBTSxFQUFFQSxNQUhIO0FBSUxDLFlBQU0sRUFBRSxDQUpIO0FBS0wvRixXQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtBQUN0QixZQUFJK0IsS0FBSyxHQUFHLElBQVo7O0FBRUEwQyxtQkFBVyxDQUFDdUIsT0FBWixDQUFvQixVQUFVQyxDQUFWLEVBQWE7QUFDL0IsaUJBQU9BLENBQUMsQ0FBQ2xFLEtBQUQsQ0FBUjtBQUNELFNBRkQ7QUFHRCxPQVhJO0FBWUw5QixTQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0FBQ2xCLFlBQUlpRyxNQUFNLEdBQUcsSUFBYixDQURrQixDQUdsQjs7O0FBQ0EsWUFBSSxLQUFLSCxNQUFMLEdBQWMsS0FBS2hILFFBQUwsQ0FBY1UsTUFBaEMsRUFBd0M7QUFDdEMsZUFBS1YsUUFBTCxDQUFjb0gsTUFBZCxDQUFxQixLQUFLSixNQUExQixFQUFrQyxLQUFLaEgsUUFBTCxDQUFjVSxNQUFkLEdBQXVCLEtBQUtzRyxNQUE5RCxFQUFzRUMsT0FBdEUsQ0FBOEUsVUFBVUksV0FBVixFQUF1QjtBQUNuRyxtQkFBT2YsYUFBYSxDQUFDVyxPQUFkLENBQXNCLFVBQVVDLENBQVYsRUFBYTtBQUN4QyxxQkFBT0EsQ0FBQyxDQUFDRyxXQUFELENBQVI7QUFDRCxhQUZNLENBQVA7QUFHRCxXQUpEO0FBS0Q7O0FBQ0QsYUFBS0wsTUFBTCxHQUFjLENBQWQ7QUFDQW5CLGlCQUFTLENBQUNvQixPQUFWLENBQWtCLFVBQVVDLENBQVYsRUFBYTtBQUM3QixpQkFBT0EsQ0FBQyxDQUFDQyxNQUFELENBQVI7QUFDRCxTQUZEO0FBR0QsT0EzQkk7QUE0Qkx0QyxrQkFBWSxFQUFFLFNBQVNBLFlBQVQsQ0FBc0IrQixVQUF0QixFQUFrQztBQUM5QyxZQUFJVSxNQUFNLEdBQUcsSUFBYjs7QUFFQSxZQUFJQyxTQUFTLEdBQUcsS0FBS3ZILFFBQUwsQ0FBYyxLQUFLZ0gsTUFBbkIsQ0FBaEIsQ0FIOEMsQ0FLOUM7O0FBQ0EsWUFBSU8sU0FBUyxJQUFJVixRQUFRLENBQUNVLFNBQVMsQ0FBQzVDLE9BQVgsRUFBb0JpQyxVQUFwQixDQUF6QixFQUEwRDtBQUN4RCxlQUFLSSxNQUFMLElBQWUsQ0FBZjtBQUNBLGlCQUFPTCxXQUFXLENBQUNZLFNBQUQsRUFBWVgsVUFBWixDQUFsQjtBQUNELFNBVDZDLENBVzlDOzs7QUFDQSxZQUFJWSxZQUFZLEdBQUdoQixhQUFhLENBQUNJLFVBQUQsRUFBYSxJQUFiLENBQWhDOztBQUVBLFlBQUksS0FBSzVHLFFBQUwsQ0FBYyxLQUFLZ0gsTUFBbkIsQ0FBSixFQUFnQztBQUM5QlYsdUJBQWEsQ0FBQ1csT0FBZCxDQUFzQixVQUFVQyxDQUFWLEVBQWE7QUFDakMsbUJBQU9BLENBQUMsQ0FBQ0ksTUFBTSxDQUFDdEgsUUFBUCxDQUFnQnNILE1BQU0sQ0FBQ04sTUFBdkIsQ0FBRCxDQUFSO0FBQ0QsV0FGRDtBQUdEOztBQUNELGFBQUtoSCxRQUFMLENBQWMsS0FBS2dILE1BQW5CLElBQTZCUSxZQUE3QjtBQUNBLGFBQUtSLE1BQUwsSUFBZSxDQUFmO0FBQ0EsZUFBT1EsWUFBUDtBQUNEO0FBbERJLEtBQVA7QUFvREQ7O0FBRUQsU0FBTztBQUNML0IsZUFBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJkLE9BQXJCLEVBQThCO0FBQ3pDLGFBQU80QixJQUFJLEdBQUdNLFFBQVEsQ0FBQ04sSUFBSSxDQUFDNUIsT0FBTixFQUFlQSxPQUFmLENBQVIsR0FBa0NnQyxXQUFXLENBQUNKLElBQUQsRUFBTzVCLE9BQVAsQ0FBN0MsR0FBK0Q2QixhQUFhLENBQUM3QixPQUFELENBQTFGO0FBQ0QsS0FISTtBQUlMc0IsU0FBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUI7QUFDdEJNLFVBQUksR0FBR0MsYUFBYSxFQUFwQjtBQUNBQyxTQUFHLEdBQUcsQ0FBTjtBQUNELEtBUEk7QUFRTGdCLG9CQUFnQixFQUFFLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU9oQixHQUFQO0FBQ0QsS0FWSTtBQVdMaUIsWUFBUSxFQUFFLFNBQVNBLFFBQVQsR0FBb0I7QUFDNUIsYUFBTyxTQUFTQyxRQUFULENBQWtCbkUsSUFBbEIsRUFBd0I7QUFDN0IsWUFBSW9FLEdBQUcsR0FBR25ILFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixDQUFuQixJQUF3QkQsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQkUsU0FBekMsR0FBcURGLFNBQVMsQ0FBQyxDQUFELENBQTlELEdBQW9FLENBQTlFLENBRDZCLENBRzdCOztBQUNBLGVBQU87QUFDTG1ILGFBQUcsRUFBRUEsR0FEQTtBQUVMbEksY0FBSSxFQUFFOEQsSUFBSSxDQUFDbUIsT0FBTCxDQUFhakYsSUFGZDtBQUdMYyxjQUFJLEVBQUVnRCxJQUFJLENBQUNtQixPQUFMLENBQWFuRSxJQUFiLEVBSEQ7QUFJTEYsWUFBRSxFQUFFa0QsSUFBSSxDQUFDbUIsT0FBTCxDQUFhckUsRUFKWjtBQUtMTixrQkFBUSxFQUFFd0QsSUFBSSxDQUFDeEQsUUFBTCxDQUFjNkgsR0FBZCxDQUFrQixVQUFVQyxLQUFWLEVBQWlCO0FBQzNDLG1CQUFPSCxRQUFRLENBQUNHLEtBQUQsRUFBUUYsR0FBRyxHQUFHLENBQWQsQ0FBZjtBQUNELFdBRlM7QUFMTCxTQUFQO0FBU0QsT0FiTSxDQWFMckIsSUFiSyxDQUFQO0FBY0QsS0ExQkk7QUEyQkxYLHdCQUFvQixFQUFFLFNBQVNBLG9CQUFULENBQThCRCxRQUE5QixFQUF3QztBQUM1REQsaUJBQVcsQ0FBQ1YsSUFBWixDQUFpQlcsUUFBakI7QUFDRCxLQTdCSTtBQThCTEcsc0JBQWtCLEVBQUUsU0FBU0Esa0JBQVQsQ0FBNEJILFFBQTVCLEVBQXNDO0FBQ3hERSxlQUFTLENBQUNiLElBQVYsQ0FBZVcsUUFBZjtBQUNELEtBaENJO0FBaUNMSSxnQkFBWSxFQUFFLFNBQVNBLFlBQVQsQ0FBc0JKLFFBQXRCLEVBQWdDO0FBQzVDVyxtQkFBYSxDQUFDdEIsSUFBZCxDQUFtQlcsUUFBbkI7QUFDRDtBQW5DSSxHQUFQO0FBcUNEO0FBQUM7OztBQUNGLEM7Ozs7Ozs7Ozs7OztBQ2xJYTs7QUFFYnZHLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJd0ksbUJBQW1CLEdBQUd6RyxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUkwRyxvQkFBb0IsR0FBR3hHLHNCQUFzQixDQUFDdUcsbUJBQUQsQ0FBakQ7O0FBRUEsU0FBU3ZHLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLElBQUlrRyxxQkFBcUIsR0FBRyxTQUFTQSxxQkFBVCxDQUErQkMsU0FBL0IsRUFBMEM7QUFDcEUsU0FBTyxZQUFZO0FBQ2pCLEtBQUMsR0FBR0Ysb0JBQW9CLENBQUM3RyxPQUF6QixFQUFrQytHLFNBQWxDO0FBRUEsUUFBSTFFLElBQUksR0FBRzBFLFNBQVMsQ0FBQzFFLElBQVYsRUFBWDtBQUVBQSxRQUFJLENBQUNtQixPQUFMLENBQWEzRCxrQ0FBYixDQUFnRCxLQUFoRDtBQUNBLFdBQU8sQ0FBQ3dDLElBQUksQ0FBQ1MsWUFBTixFQUFvQlQsSUFBSSxDQUFDbUIsT0FBTCxDQUFhM0UsUUFBakMsQ0FBUDtBQUNELEdBUEQ7QUFRRCxDQVREOztBQVdBVixPQUFPLENBQUM2QixPQUFSLEdBQWtCOEcscUJBQWxCLEM7Ozs7Ozs7Ozs7OztBQ3ZCYTs7QUFFYjdJLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJd0ksbUJBQW1CLEdBQUd6RyxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUkwRyxvQkFBb0IsR0FBR3hHLHNCQUFzQixDQUFDdUcsbUJBQUQsQ0FBakQ7O0FBRUEsU0FBU3ZHLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLElBQUlvRyxvQkFBb0IsR0FBRyxTQUFTQSxvQkFBVCxDQUE4QkQsU0FBOUIsRUFBeUM7QUFDbEUsU0FBTyxZQUFZO0FBQ2pCLEtBQUMsR0FBR0Ysb0JBQW9CLENBQUM3RyxPQUF6QixFQUFrQytHLFNBQWxDO0FBRUEsV0FBT0EsU0FBUyxDQUFDMUUsSUFBVixHQUFpQm1CLE9BQXhCO0FBQ0QsR0FKRDtBQUtELENBTkQ7O0FBUUFyRixPQUFPLENBQUM2QixPQUFSLEdBQWtCZ0gsb0JBQWxCLEM7Ozs7Ozs7Ozs7OztBQ3BCYTs7QUFFYi9JLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJd0ksbUJBQW1CLEdBQUd6RyxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUkwRyxvQkFBb0IsR0FBR3hHLHNCQUFzQixDQUFDdUcsbUJBQUQsQ0FBakQ7O0FBRUEsU0FBU3ZHLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFWixXQUFPLEVBQUVZO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLFNBQVNxRyxlQUFULENBQXlCckcsR0FBekIsRUFBOEJVLEdBQTlCLEVBQW1DbEQsS0FBbkMsRUFBMEM7QUFBRSxNQUFJa0QsR0FBRyxJQUFJVixHQUFYLEVBQWdCO0FBQUUzQyxVQUFNLENBQUNDLGNBQVAsQ0FBc0IwQyxHQUF0QixFQUEyQlUsR0FBM0IsRUFBZ0M7QUFBRWxELFdBQUssRUFBRUEsS0FBVDtBQUFnQjhJLGdCQUFVLEVBQUUsSUFBNUI7QUFBa0NDLGtCQUFZLEVBQUUsSUFBaEQ7QUFBc0RDLGNBQVEsRUFBRTtBQUFoRSxLQUFoQztBQUEwRyxHQUE1SCxNQUFrSTtBQUFFeEcsT0FBRyxDQUFDVSxHQUFELENBQUgsR0FBV2xELEtBQVg7QUFBbUI7O0FBQUMsU0FBT3dDLEdBQVA7QUFBYTtBQUFDOzs7QUFHbE4sSUFBSXlHLGdCQUFnQixHQUFHLFNBQVNBLGdCQUFULENBQTBCQyxPQUExQixFQUFtQztBQUN4RCxTQUFPLGdCQUFnQkEsT0FBdkI7QUFDRCxDQUZEOztBQUlBLElBQUlDLGNBQWMsR0FBRyxTQUFTQSxjQUFULENBQXdCQyxZQUF4QixFQUFzQ25GLElBQXRDLEVBQTRDb0YsUUFBNUMsRUFBc0Q7QUFDekUsTUFBSSxDQUFDcEYsSUFBTCxFQUFXO0FBQ1QsVUFBTW9GLFFBQVEsRUFBZDtBQUNEOztBQUNELE1BQUlDLE1BQU0sR0FBRyxLQUFLLENBQWxCOztBQUVBLE1BQUlyRixJQUFJLENBQUNtRixZQUFELENBQVIsRUFBd0I7QUFDdEJFLFVBQU0sR0FBR3JGLElBQVQ7QUFDRCxHQUZELE1BRU87QUFDTHFGLFVBQU0sR0FBR3JGLElBQUksQ0FBQ3hELFFBQUwsQ0FBYzhJLElBQWQsQ0FBbUIsVUFBVWhCLEtBQVYsRUFBaUI7QUFDM0MsYUFBTyxDQUFDLENBQUNBLEtBQUssQ0FBQ2EsWUFBRCxDQUFkO0FBQ0QsS0FGUSxDQUFUO0FBR0Q7O0FBQ0QsTUFBSUksT0FBTyxHQUFHRixNQUFNLEdBQUdBLE1BQU0sQ0FBQ0YsWUFBRCxDQUFOLEVBQUgsR0FBNEIsSUFBaEQ7O0FBRUEsTUFBSUksT0FBTyxLQUFLLElBQWhCLEVBQXNCO0FBQ3BCLFdBQU9BLE9BQU8sQ0FBQ3hKLEtBQWY7QUFDRDs7QUFDRCxTQUFPbUosY0FBYyxDQUFDQyxZQUFELEVBQWVuRixJQUFJLENBQUN1RCxNQUFwQixFQUE0QjZCLFFBQTVCLENBQXJCO0FBQ0QsQ0FuQkQ7O0FBcUJBLElBQUlJLGdCQUFnQixHQUFHLFNBQVNBLGdCQUFULENBQTBCUCxPQUExQixFQUFtQ2pGLElBQW5DLEVBQXlDO0FBQzlELE1BQUl5RixRQUFRLEdBQUcsU0FBU0EsUUFBVCxDQUFrQnpGLElBQWxCLEVBQXdCO0FBQ3JDLFFBQUkwRixLQUFLLEdBQUd6SSxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JELFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUJFLFNBQXpDLEdBQXFERixTQUFTLENBQUMsQ0FBRCxDQUE5RCxHQUFvRSxFQUFoRjtBQUVBeUksU0FBSyxDQUFDbEUsSUFBTixDQUFXeEIsSUFBSSxDQUFDbUIsT0FBTCxDQUFhakYsSUFBeEI7O0FBQ0EsUUFBSThELElBQUksQ0FBQ3VELE1BQVQsRUFBaUI7QUFDZixhQUFPa0MsUUFBUSxDQUFDekYsSUFBSSxDQUFDdUQsTUFBTixFQUFjbUMsS0FBZCxDQUFmO0FBQ0Q7O0FBQ0QsV0FBT0EsS0FBUDtBQUNELEdBUkQ7O0FBVUEsU0FBTyxJQUFJakosS0FBSixDQUFVLE1BQU13SSxPQUFOLEdBQWdCLHVCQUFoQixHQUEwQ2pGLElBQUksQ0FBQ21CLE9BQUwsQ0FBYWpGLElBQXZELEdBQThELGlDQUE5RCxHQUFrR3VKLFFBQVEsQ0FBQ3pGLElBQUQsQ0FBUixDQUFlMkYsT0FBZixHQUF5QnRCLEdBQXpCLENBQTZCLFVBQVVuSSxJQUFWLEVBQWdCO0FBQzlKLFdBQU8sUUFBUUEsSUFBUixHQUFlLEdBQXRCO0FBQ0QsR0FGa0gsRUFFaEgwSixJQUZnSCxDQUUzRyxJQUYyRyxDQUE1RyxDQUFQO0FBR0QsQ0FkRDs7QUFnQkEsSUFBSUMsb0JBQW9CLEdBQUcsU0FBU0Esb0JBQVQsQ0FBOEJuQixTQUE5QixFQUF5QztBQUNsRUEsV0FBUyxDQUFDeEMsV0FBVixDQUFzQixVQUFVbEMsSUFBVixFQUFnQjtBQUNwQyxRQUFJbUIsT0FBTyxHQUFHbkIsSUFBSSxDQUFDbUIsT0FBbkI7QUFDQSxRQUFJNUUsS0FBSyxHQUFHNEUsT0FBTyxDQUFDNUUsS0FBcEI7QUFFQSxRQUFJdUosU0FBUyxHQUFHdkosS0FBSyxHQUFHWCxNQUFNLENBQUNtSyxJQUFQLENBQVl4SixLQUFaLENBQUgsR0FBd0IsRUFBN0M7QUFFQXVKLGFBQVMsQ0FBQ3JDLE9BQVYsQ0FBa0IsVUFBVXVDLFFBQVYsRUFBb0I7QUFDcEMsVUFBSUEsUUFBUSxDQUFDQyxNQUFULENBQWdCLENBQWhCLE1BQXVCLEdBQTNCLEVBQWdDO0FBQzlCLFlBQUloQixPQUFPLEdBQUdlLFFBQVEsQ0FBQ0UsTUFBVCxDQUFnQixDQUFoQixFQUFtQkYsUUFBUSxDQUFDOUksTUFBNUIsQ0FBZDtBQUNBLFlBQUlpSixZQUFZLEdBQUdqQixjQUFjLENBQUNGLGdCQUFnQixDQUFDQyxPQUFELENBQWpCLEVBQTRCakYsSUFBSSxDQUFDdUQsTUFBakMsRUFBeUMsWUFBWTtBQUNwRixpQkFBT2lDLGdCQUFnQixDQUFDUCxPQUFELEVBQVVqRixJQUFWLENBQXZCO0FBQ0QsU0FGZ0MsQ0FBakM7QUFJQW1CLGVBQU8sQ0FBQy9ELFVBQVIsQ0FBbUJ3SCxlQUFlLENBQUMsRUFBRCxFQUFLSyxPQUFMLEVBQWNrQixZQUFkLENBQWxDO0FBQ0QsT0FQRCxNQU9PLElBQUlILFFBQVEsS0FBSyxTQUFqQixFQUE0QjtBQUNqQ2hHLFlBQUksQ0FBQ2dGLGdCQUFnQixDQUFDekksS0FBSyxDQUFDeUosUUFBRCxDQUFOLENBQWpCLENBQUosR0FBMEMsWUFBWTtBQUNwRCxpQkFBTztBQUFFakssaUJBQUssRUFBRWlFLElBQUksQ0FBQ29HO0FBQWQsV0FBUDtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBYkQ7QUFjRCxHQXBCRDtBQXNCQSxTQUFPLFVBQVVySyxLQUFWLEVBQWlCO0FBQ3RCLEtBQUMsR0FBR3lJLG9CQUFvQixDQUFDN0csT0FBekIsRUFBa0MrRyxTQUFsQztBQUNBLFFBQUkxRSxJQUFJLEdBQUcwRSxTQUFTLENBQUMxRSxJQUFWLEVBQVg7QUFFQUEsUUFBSSxDQUFDb0csU0FBTCxHQUFpQnJLLEtBQWpCO0FBQ0EsV0FBTyxDQUFDLFVBQVVzSyxRQUFWLEVBQW9CO0FBQzFCLGFBQU9yRyxJQUFJLENBQUNvRyxTQUFMLEdBQWlCQyxRQUF4QjtBQUNELEtBRk0sQ0FBUDtBQUdELEdBUkQ7QUFTRCxDQWhDRDs7QUFrQ0F2SyxPQUFPLENBQUM2QixPQUFSLEdBQWtCa0ksb0JBQWxCLEM7Ozs7Ozs7Ozs7OztBQzFGYTs7QUFFYmpLLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFJQSxJQUFJdUssY0FBYyxHQUFHLFlBQVk7QUFBRSxXQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QjNGLENBQTVCLEVBQStCO0FBQUUsUUFBSTRGLElBQUksR0FBRyxFQUFYO0FBQWUsUUFBSUMsRUFBRSxHQUFHLElBQVQ7QUFBZSxRQUFJQyxFQUFFLEdBQUcsS0FBVDtBQUFnQixRQUFJQyxFQUFFLEdBQUd6SixTQUFUOztBQUFvQixRQUFJO0FBQUUsV0FBSyxJQUFJMEosRUFBRSxHQUFHTCxHQUFHLENBQUNNLE1BQU0sQ0FBQ0MsUUFBUixDQUFILEVBQVQsRUFBaUNDLEVBQXRDLEVBQTBDLEVBQUVOLEVBQUUsR0FBRyxDQUFDTSxFQUFFLEdBQUdILEVBQUUsQ0FBQ3RHLElBQUgsRUFBTixFQUFpQmxCLElBQXhCLENBQTFDLEVBQXlFcUgsRUFBRSxHQUFHLElBQTlFLEVBQW9GO0FBQUVELFlBQUksQ0FBQ2pGLElBQUwsQ0FBVXdGLEVBQUUsQ0FBQ2pMLEtBQWI7O0FBQXFCLFlBQUk4RSxDQUFDLElBQUk0RixJQUFJLENBQUN2SixNQUFMLEtBQWdCMkQsQ0FBekIsRUFBNEI7QUFBUTtBQUFFLEtBQXZKLENBQXdKLE9BQU90QixHQUFQLEVBQVk7QUFBRW9ILFFBQUUsR0FBRyxJQUFMO0FBQVdDLFFBQUUsR0FBR3JILEdBQUw7QUFBVyxLQUE1TCxTQUFxTTtBQUFFLFVBQUk7QUFBRSxZQUFJLENBQUNtSCxFQUFELElBQU9HLEVBQUUsQ0FBQyxRQUFELENBQWIsRUFBeUJBLEVBQUUsQ0FBQyxRQUFELENBQUY7QUFBaUIsT0FBaEQsU0FBeUQ7QUFBRSxZQUFJRixFQUFKLEVBQVEsTUFBTUMsRUFBTjtBQUFXO0FBQUU7O0FBQUMsV0FBT0gsSUFBUDtBQUFjOztBQUFDLFNBQU8sVUFBVUQsR0FBVixFQUFlM0YsQ0FBZixFQUFrQjtBQUFFLFFBQUlvRyxLQUFLLENBQUNDLE9BQU4sQ0FBY1YsR0FBZCxDQUFKLEVBQXdCO0FBQUUsYUFBT0EsR0FBUDtBQUFhLEtBQXZDLE1BQTZDLElBQUlNLE1BQU0sQ0FBQ0MsUUFBUCxJQUFtQm5MLE1BQU0sQ0FBQzRLLEdBQUQsQ0FBN0IsRUFBb0M7QUFBRSxhQUFPRCxhQUFhLENBQUNDLEdBQUQsRUFBTTNGLENBQU4sQ0FBcEI7QUFBK0IsS0FBckUsTUFBMkU7QUFBRSxZQUFNLElBQUlzRyxTQUFKLENBQWMsc0RBQWQsQ0FBTjtBQUE4RTtBQUFFLEdBQXJPO0FBQXdPLENBQWhvQixFQUFyQjs7QUFFQXJMLE9BQU8sQ0FBQzZCLE9BQVIsR0FBa0J5SixtQkFBbEI7O0FBRUEsSUFBSTdDLG1CQUFtQixHQUFHekcsbUJBQU8sQ0FBQywrRUFBRCxDQUFqQzs7QUFFQSxJQUFJMEcsb0JBQW9CLEdBQUd4RyxzQkFBc0IsQ0FBQ3VHLG1CQUFELENBQWpEOztBQUVBLFNBQVN2RyxzQkFBVCxDQUFnQ08sR0FBaEMsRUFBcUM7QUFBRSxTQUFPQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsVUFBWCxHQUF3QkQsR0FBeEIsR0FBOEI7QUFBRVosV0FBTyxFQUFFWTtBQUFYLEdBQXJDO0FBQXdEOztBQUUvRixJQUFJOEksV0FBVyxHQUFHLEVBQWxCOztBQUVBLFNBQVNDLHNCQUFULENBQWdDQyxTQUFoQyxFQUEyQ0MsV0FBM0MsRUFBd0Q7QUFDdEQsU0FBTyxVQUFVNUgsSUFBVixFQUFnQjtBQUNyQixRQUFJNkgsSUFBSSxHQUFHN0gsSUFBSSxDQUFDNkgsSUFBaEI7O0FBRUEsUUFBSUMsWUFBWSxHQUFHRixXQUFXLEVBQTlCO0FBQUEsUUFDSUcsYUFBYSxHQUFHckIsY0FBYyxDQUFDb0IsWUFBRCxFQUFlLENBQWYsQ0FEbEM7QUFBQSxRQUVJbEwsUUFBUSxHQUFHbUwsYUFBYSxDQUFDLENBQUQsQ0FGNUI7O0FBSUFKLGFBQVMsQ0FBQ0UsSUFBRCxFQUFPLFVBQVVHLE9BQVYsRUFBbUI7QUFDakMsYUFBT3BMLFFBQVEsQ0FBQztBQUFFb0wsZUFBTyxFQUFFQTtBQUFYLE9BQUQsQ0FBZjtBQUNELEtBRlEsQ0FBVDtBQUdELEdBVkQ7QUFXRDs7QUFBQTs7QUFDRCxTQUFTQyxvQkFBVCxDQUE4QkMsT0FBOUIsRUFBdUM7QUFDckMsU0FBTyxVQUFVcEgsS0FBVixFQUFpQjtBQUN0QixRQUFJK0csSUFBSSxHQUFHL0csS0FBSyxDQUFDK0csSUFBakI7QUFBQSxRQUNJRyxPQUFPLEdBQUdsSCxLQUFLLENBQUNrSCxPQURwQjtBQUdBRSxXQUFPLENBQUNMLElBQUQsRUFBT0csT0FBUCxDQUFQO0FBQ0QsR0FMRDtBQU1EOztBQUVELElBQUlMLFNBQVMsR0FBRyxTQUFTQSxTQUFULENBQW1CcEcsT0FBbkIsRUFBNEJzRyxJQUE1QixFQUFrQ3RGLFFBQWxDLEVBQTRDO0FBQzFELE1BQUksQ0FBQ2tGLFdBQVcsQ0FBQ0ksSUFBRCxDQUFoQixFQUF3QkosV0FBVyxDQUFDSSxJQUFELENBQVgsR0FBb0IsRUFBcEI7QUFDeEJKLGFBQVcsQ0FBQ0ksSUFBRCxDQUFYLENBQWtCdEcsT0FBTyxDQUFDckUsRUFBMUIsSUFBZ0NxRixRQUFoQztBQUNBLFNBQU8sWUFBWTtBQUNqQixXQUFPa0YsV0FBVyxDQUFDSSxJQUFELENBQVgsQ0FBa0J0RyxPQUFPLENBQUNyRSxFQUExQixDQUFQO0FBQ0QsR0FGRDtBQUdELENBTkQ7O0FBT0EsSUFBSWdMLE9BQU8sR0FBRyxTQUFTQSxPQUFULENBQWlCTCxJQUFqQixFQUF1QkcsT0FBdkIsRUFBZ0M7QUFDNUMsTUFBSSxDQUFDUCxXQUFXLENBQUNJLElBQUQsQ0FBaEIsRUFBd0I7QUFDeEI3TCxRQUFNLENBQUNtSyxJQUFQLENBQVlzQixXQUFXLENBQUNJLElBQUQsQ0FBdkIsRUFBK0JoRSxPQUEvQixDQUF1QyxVQUFVM0csRUFBVixFQUFjO0FBQ25EdUssZUFBVyxDQUFDSSxJQUFELENBQVgsQ0FBa0IzSyxFQUFsQixFQUFzQjhLLE9BQXRCO0FBQ0QsR0FGRDtBQUdELENBTEQ7O0FBT0EsU0FBU1IsbUJBQVQsQ0FBNkIxQyxTQUE3QixFQUF3QzhDLFdBQXhDLEVBQXFEO0FBQ25EOUMsV0FBUyxDQUFDbkMsWUFBVixDQUF1QixVQUFVdkMsSUFBVixFQUFnQjtBQUNyQ3BFLFVBQU0sQ0FBQ21LLElBQVAsQ0FBWXNCLFdBQVosRUFBeUI1RCxPQUF6QixDQUFpQyxVQUFVZ0UsSUFBVixFQUFnQjtBQUMvQyxVQUFJSixXQUFXLENBQUNJLElBQUQsQ0FBWCxDQUFrQnpILElBQUksQ0FBQ21CLE9BQUwsQ0FBYXJFLEVBQS9CLENBQUosRUFBd0M7QUFDdEMsZUFBT3VLLFdBQVcsQ0FBQ0ksSUFBRCxDQUFYLENBQWtCekgsSUFBSSxDQUFDbUIsT0FBTCxDQUFhckUsRUFBL0IsQ0FBUDtBQUNEO0FBQ0YsS0FKRDtBQUtELEdBTkQ7QUFPQSxTQUFPLFVBQVVpTCxhQUFWLEVBQXlCO0FBQzlCLEtBQUMsR0FBR3ZELG9CQUFvQixDQUFDN0csT0FBekIsRUFBa0MrRyxTQUFsQztBQUVBLFFBQUkxRSxJQUFJLEdBQUcwRSxTQUFTLENBQUMxRSxJQUFWLEVBQVg7QUFDQSxRQUFJZ0ksRUFBRSxHQUFHRCxhQUFhLElBQUkvSCxJQUFJLENBQUNtQixPQUEvQjs7QUFDQSxRQUFJOEcsYUFBYSxHQUFHLFNBQVNBLGFBQVQsR0FBeUI7QUFDM0MsV0FBSyxJQUFJQyxJQUFJLEdBQUdqTCxTQUFTLENBQUNDLE1BQXJCLEVBQTZCaUwsTUFBTSxHQUFHbEIsS0FBSyxDQUFDaUIsSUFBRCxDQUEzQyxFQUFtREUsSUFBSSxHQUFHLENBQS9ELEVBQWtFQSxJQUFJLEdBQUdGLElBQXpFLEVBQStFRSxJQUFJLEVBQW5GLEVBQXVGO0FBQ3JGRCxjQUFNLENBQUNDLElBQUQsQ0FBTixHQUFlbkwsU0FBUyxDQUFDbUwsSUFBRCxDQUF4QjtBQUNEOztBQUVELGFBQU9iLFNBQVMsQ0FBQzNJLEtBQVYsQ0FBZ0J6QixTQUFoQixFQUEyQixDQUFDNkssRUFBRCxFQUFLSyxNQUFMLENBQVlGLE1BQVosQ0FBM0IsQ0FBUDtBQUNELEtBTkQ7O0FBT0EsUUFBSUcsV0FBVyxHQUFHLFNBQVNBLFdBQVQsR0FBdUI7QUFDdkMsYUFBT1IsT0FBTyxDQUFDbEosS0FBUixDQUFjekIsU0FBZCxFQUF5QkYsU0FBekIsQ0FBUDtBQUNELEtBRkQ7O0FBSUEsV0FBTztBQUNMc0ssZUFBUyxFQUFFVSxhQUROO0FBRUxILGFBQU8sRUFBRVEsV0FGSjtBQUdMakIsaUJBQVcsRUFBRUEsV0FIUjtBQUlMa0IsZUFBUyxFQUFFakIsc0JBQXNCLENBQUNXLGFBQUQsRUFBZ0JULFdBQWhCLENBSjVCO0FBS0xnQixhQUFPLEVBQUVYLG9CQUFvQixDQUFDUyxXQUFEO0FBTHhCLEtBQVA7QUFPRCxHQXZCRDtBQXdCRDs7QUFFRGxCLG1CQUFtQixDQUFDMUUsS0FBcEIsR0FBNEIsWUFBWTtBQUN0QzJFLGFBQVcsR0FBRyxFQUFkO0FBQ0QsQ0FGRCxDOzs7Ozs7Ozs7Ozs7QUN4RmE7O0FBRWJ6TCxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSXVLLGNBQWMsR0FBRyxZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEIzRixDQUE1QixFQUErQjtBQUFFLFFBQUk0RixJQUFJLEdBQUcsRUFBWDtBQUFlLFFBQUlDLEVBQUUsR0FBRyxJQUFUO0FBQWUsUUFBSUMsRUFBRSxHQUFHLEtBQVQ7QUFBZ0IsUUFBSUMsRUFBRSxHQUFHekosU0FBVDs7QUFBb0IsUUFBSTtBQUFFLFdBQUssSUFBSTBKLEVBQUUsR0FBR0wsR0FBRyxDQUFDTSxNQUFNLENBQUNDLFFBQVIsQ0FBSCxFQUFULEVBQWlDQyxFQUF0QyxFQUEwQyxFQUFFTixFQUFFLEdBQUcsQ0FBQ00sRUFBRSxHQUFHSCxFQUFFLENBQUN0RyxJQUFILEVBQU4sRUFBaUJsQixJQUF4QixDQUExQyxFQUF5RXFILEVBQUUsR0FBRyxJQUE5RSxFQUFvRjtBQUFFRCxZQUFJLENBQUNqRixJQUFMLENBQVV3RixFQUFFLENBQUNqTCxLQUFiOztBQUFxQixZQUFJOEUsQ0FBQyxJQUFJNEYsSUFBSSxDQUFDdkosTUFBTCxLQUFnQjJELENBQXpCLEVBQTRCO0FBQVE7QUFBRSxLQUF2SixDQUF3SixPQUFPdEIsR0FBUCxFQUFZO0FBQUVvSCxRQUFFLEdBQUcsSUFBTDtBQUFXQyxRQUFFLEdBQUdySCxHQUFMO0FBQVcsS0FBNUwsU0FBcU07QUFBRSxVQUFJO0FBQUUsWUFBSSxDQUFDbUgsRUFBRCxJQUFPRyxFQUFFLENBQUMsUUFBRCxDQUFiLEVBQXlCQSxFQUFFLENBQUMsUUFBRCxDQUFGO0FBQWlCLE9BQWhELFNBQXlEO0FBQUUsWUFBSUYsRUFBSixFQUFRLE1BQU1DLEVBQU47QUFBVztBQUFFOztBQUFDLFdBQU9ILElBQVA7QUFBYzs7QUFBQyxTQUFPLFVBQVVELEdBQVYsRUFBZTNGLENBQWYsRUFBa0I7QUFBRSxRQUFJb0csS0FBSyxDQUFDQyxPQUFOLENBQWNWLEdBQWQsQ0FBSixFQUF3QjtBQUFFLGFBQU9BLEdBQVA7QUFBYSxLQUF2QyxNQUE2QyxJQUFJTSxNQUFNLENBQUNDLFFBQVAsSUFBbUJuTCxNQUFNLENBQUM0SyxHQUFELENBQTdCLEVBQW9DO0FBQUUsYUFBT0QsYUFBYSxDQUFDQyxHQUFELEVBQU0zRixDQUFOLENBQXBCO0FBQStCLEtBQXJFLE1BQTJFO0FBQUUsWUFBTSxJQUFJc0csU0FBSixDQUFjLHNEQUFkLENBQU47QUFBOEU7QUFBRSxHQUFyTztBQUF3TyxDQUFob0IsRUFBckI7O0FBRUFyTCxPQUFPLENBQUM2QixPQUFSLEdBQWtCOEssb0JBQWxCOztBQUVBLFNBQVNDLHdCQUFULENBQWtDbkssR0FBbEMsRUFBdUN3SCxJQUF2QyxFQUE2QztBQUFFLE1BQUk0QyxNQUFNLEdBQUcsRUFBYjs7QUFBaUIsT0FBSyxJQUFJOUgsQ0FBVCxJQUFjdEMsR0FBZCxFQUFtQjtBQUFFLFFBQUl3SCxJQUFJLENBQUM2QyxPQUFMLENBQWEvSCxDQUFiLEtBQW1CLENBQXZCLEVBQTBCO0FBQVUsUUFBSSxDQUFDakYsTUFBTSxDQUFDaU4sU0FBUCxDQUFpQkMsY0FBakIsQ0FBZ0NySCxJQUFoQyxDQUFxQ2xELEdBQXJDLEVBQTBDc0MsQ0FBMUMsQ0FBTCxFQUFtRDtBQUFVOEgsVUFBTSxDQUFDOUgsQ0FBRCxDQUFOLEdBQVl0QyxHQUFHLENBQUNzQyxDQUFELENBQWY7QUFBcUI7O0FBQUMsU0FBTzhILE1BQVA7QUFBZ0I7O0FBRTVOLFNBQVNJLHFCQUFULENBQStCQyxRQUEvQixFQUF5QztBQUN2QyxTQUFPLFVBQVVwSixJQUFWLEVBQWdCO0FBQ3JCLFFBQUlxSixNQUFNLEdBQUdySixJQUFJLENBQUNxSixNQUFsQjtBQUFBLFFBQ0lDLGFBQWEsR0FBR3RKLElBQUksQ0FBQ3NKLGFBRHpCO0FBQUEsUUFFSUMsSUFBSSxHQUFHVCx3QkFBd0IsQ0FBQzlJLElBQUQsRUFBTyxDQUFDLFFBQUQsRUFBVyxlQUFYLENBQVAsQ0FGbkM7O0FBSUEsUUFBSXFKLE1BQUosRUFBWTtBQUNWRCxjQUFRLENBQUNDLE1BQUQsQ0FBUjtBQUNELEtBRkQsTUFFTyxJQUFJQyxhQUFKLEVBQW1CO0FBQ3hCRixjQUFRLENBQUNFLGFBQWEsQ0FBQ0MsSUFBRCxDQUFkLENBQVI7QUFDRCxLQUZNLE1BRUE7QUFDTCxZQUFNLElBQUkxTSxLQUFKLENBQVUsc0RBQVYsQ0FBTjtBQUNEO0FBQ0YsR0FaRDtBQWFEOztBQUVELFNBQVNnTSxvQkFBVCxDQUE4QlcsUUFBOUIsRUFBd0M7QUFDdEMsU0FBTyxVQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQztBQUN0QyxRQUFJakwsU0FBUyxHQUFHK0ssUUFBUSxDQUFDRSxZQUFELENBQXhCO0FBQUEsUUFDSWhMLFVBQVUsR0FBR2dJLGNBQWMsQ0FBQ2pJLFNBQUQsRUFBWSxDQUFaLENBRC9CO0FBQUEsUUFFSWtMLEtBQUssR0FBR2pMLFVBQVUsQ0FBQyxDQUFELENBRnRCO0FBQUEsUUFHSWtMLFFBQVEsR0FBR2xMLFVBQVUsQ0FBQyxDQUFELENBSHpCO0FBQUEsUUFJSW1MLFFBQVEsR0FBR25MLFVBQVUsQ0FBQyxDQUFELENBSnpCOztBQU1BLFFBQUkwSyxRQUFRLEdBQUcsU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7QUFDdkMsYUFBT08sUUFBUSxDQUFDSCxPQUFPLENBQUNJLFFBQVEsRUFBVCxFQUFhUixNQUFiLENBQVIsQ0FBZjtBQUNELEtBRkQ7O0FBSUEsV0FBTyxDQUFDTSxLQUFELEVBQVFQLFFBQVIsRUFBa0JELHFCQUFxQixDQUFDQyxRQUFELENBQXZDLEVBQW1EO0FBQzFELGdCQUFZO0FBQ1YsYUFBT1MsUUFBUSxFQUFmO0FBQ0QsS0FITSxDQUdMO0FBSEssS0FBUDtBQUtELEdBaEJEO0FBaUJELEM7Ozs7Ozs7Ozs7OztBQzlDWTs7QUFFYjdOLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCK0wsa0JBQWxCOztBQUVBLElBQUluRixtQkFBbUIsR0FBR3pHLG1CQUFPLENBQUMsK0VBQUQsQ0FBakM7O0FBRUEsSUFBSTBHLG9CQUFvQixHQUFHeEcsc0JBQXNCLENBQUN1RyxtQkFBRCxDQUFqRDs7QUFFQSxTQUFTdkcsc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsSUFBSW9MLE9BQU8sR0FBRztBQUNaQyxVQUFRLEVBQUUsRUFERTtBQUVaQyxLQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhMUksT0FBYixFQUFzQjtBQUN6QixRQUFJLEtBQUt5SSxRQUFMLENBQWN6SSxPQUFPLENBQUNyRSxFQUF0QixDQUFKLEVBQStCO0FBQzdCLGFBQU8sS0FBSzhNLFFBQUwsQ0FBY3pJLE9BQU8sQ0FBQ3JFLEVBQXRCLENBQVA7QUFDRDs7QUFDRCxXQUFPLEtBQUs4TSxRQUFMLENBQWN6SSxPQUFPLENBQUNyRSxFQUF0QixJQUE0QjtBQUFFZ04sWUFBTSxFQUFFLEVBQVY7QUFBY0MsY0FBUSxFQUFFO0FBQXhCLEtBQW5DO0FBQ0QsR0FQVztBQVFaQyxTQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQmxOLEVBQWpCLEVBQXFCO0FBQzVCLFFBQUksS0FBSzhNLFFBQUwsQ0FBYzlNLEVBQWQsQ0FBSixFQUF1QjtBQUNyQixhQUFPLEtBQUs4TSxRQUFMLENBQWM5TSxFQUFkLENBQVA7QUFDRDtBQUNGO0FBWlcsQ0FBZDtBQWFHOztBQUNILFNBQVM0TSxrQkFBVCxDQUE0QmhGLFNBQTVCLEVBQXVDO0FBQ3JDQSxXQUFTLENBQUNuQyxZQUFWLENBQXVCLFVBQVV2QyxJQUFWLEVBQWdCO0FBQ3JDLFdBQU8ySixPQUFPLENBQUNLLE9BQVIsQ0FBZ0JoSyxJQUFJLENBQUNtQixPQUFMLENBQWFyRSxFQUE3QixDQUFQO0FBQ0QsR0FGRDtBQUdBLFNBQU8sVUFBVXdNLFlBQVYsRUFBd0I7QUFDN0IsS0FBQyxHQUFHOUUsb0JBQW9CLENBQUM3RyxPQUF6QixFQUFrQytHLFNBQWxDO0FBRUEsUUFBSTFFLElBQUksR0FBRzBFLFNBQVMsQ0FBQzFFLElBQVYsRUFBWDtBQUNBLFFBQUltQixPQUFPLEdBQUduQixJQUFJLENBQUNtQixPQUFuQjtBQUVBLFFBQUk4SSxPQUFPLEdBQUdOLE9BQU8sQ0FBQ0UsR0FBUixDQUFZMUksT0FBWixDQUFkO0FBRUEsUUFBSStJLEtBQUssR0FBRyxLQUFLLENBQWpCLENBUjZCLENBVTdCOztBQUNBLFFBQUkvSSxPQUFPLENBQUNuRSxJQUFSLE9BQW1CLENBQXZCLEVBQTBCO0FBQ3hCaU4sYUFBTyxDQUFDSCxNQUFSLENBQWV0SSxJQUFmLENBQW9COEgsWUFBcEI7QUFDQVksV0FBSyxHQUFHRCxPQUFPLENBQUNILE1BQVIsQ0FBZTVNLE1BQWYsR0FBd0IsQ0FBaEMsQ0FGd0IsQ0FJeEI7QUFDRCxLQUxELE1BS087QUFDTGdOLFdBQUssR0FBR0QsT0FBTyxDQUFDRixRQUFoQjtBQUNBRSxhQUFPLENBQUNGLFFBQVIsR0FBbUJHLEtBQUssR0FBR0QsT0FBTyxDQUFDSCxNQUFSLENBQWU1TSxNQUFmLEdBQXdCLENBQWhDLEdBQW9DK00sT0FBTyxDQUFDRixRQUFSLEdBQW1CLENBQXZELEdBQTJELENBQTlFO0FBQ0Q7O0FBRUQsV0FBTyxDQUFDRSxPQUFPLENBQUNILE1BQVIsQ0FBZUksS0FBZixDQUFELEVBQXdCLFVBQVVDLFFBQVYsRUFBb0I7QUFDakRGLGFBQU8sQ0FBQ0gsTUFBUixDQUFlSSxLQUFmLElBQXdCQyxRQUF4Qjs7QUFDQSxVQUFJLENBQUNoSixPQUFPLENBQUM1RCxTQUFSLEVBQUwsRUFBMEI7QUFDeEJ5QyxZQUFJLENBQUNRLEtBQUw7QUFDRDs7QUFDRCxhQUFPMkosUUFBUDtBQUNELEtBTk0sRUFNSixZQUFZO0FBQ2IsYUFBT0YsT0FBTyxDQUFDSCxNQUFSLENBQWVJLEtBQWYsQ0FBUDtBQUNELEtBUk0sQ0FBUDtBQVNELEdBOUJEO0FBK0JEOztBQUVEUixrQkFBa0IsQ0FBQ2hILEtBQW5CLEdBQTJCLFlBQVk7QUFDckNpSCxTQUFPLENBQUNDLFFBQVIsR0FBbUIsRUFBbkI7QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7OztBQ2hFYTs7QUFFYmhPLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCeU0sa0JBQWxCOztBQUNBLFNBQVNBLGtCQUFULENBQTRCMUYsU0FBNUIsRUFBdUM7QUFDckMsTUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2QsVUFBTSxJQUFJakksS0FBSixDQUFVLDZGQUFWLENBQU47QUFDRDs7QUFDRCxNQUFJLENBQUNpSSxTQUFTLENBQUMxRSxJQUFWLEVBQUwsRUFBdUI7QUFDckIsVUFBTSxJQUFJdkQsS0FBSixDQUFVLDBEQUFWLENBQU47QUFDRDtBQUNGOztBQUFBLEM7Ozs7Ozs7Ozs7OztBQ2JZOztBQUViYixNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7QUFHQUQsT0FBTyxDQUFDdU8sY0FBUixHQUF5QkEsY0FBekI7O0FBRUEsSUFBSUMsVUFBVSxHQUFHeE0sbUJBQU8sQ0FBQywyQ0FBRCxDQUF4Qjs7QUFFQSxJQUFJeU0sV0FBVyxHQUFHdk0sc0JBQXNCLENBQUNzTSxVQUFELENBQXhDOztBQUVBLElBQUl6TSxlQUFlLEdBQUdDLG1CQUFPLENBQUMsaUVBQUQsQ0FBN0I7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUdDLHNCQUFzQixDQUFDSCxlQUFELENBQTdDOztBQUVBLElBQUkyTSxXQUFXLEdBQUcxTSxtQkFBTyxDQUFDLDZDQUFELENBQXpCOztBQUVBLElBQUkyTSxZQUFZLEdBQUd6TSxzQkFBc0IsQ0FBQ3dNLFdBQUQsQ0FBekM7O0FBRUEsSUFBSTlDLFlBQVksR0FBRzVKLG1CQUFPLENBQUMsMkRBQUQsQ0FBMUI7O0FBRUEsSUFBSTZKLGFBQWEsR0FBRzNKLHNCQUFzQixDQUFDMEosWUFBRCxDQUExQzs7QUFFQSxJQUFJZ0QsV0FBVyxHQUFHNU0sbUJBQU8sQ0FBQyx5REFBRCxDQUF6Qjs7QUFFQSxJQUFJNk0sWUFBWSxHQUFHM00sc0JBQXNCLENBQUMwTSxXQUFELENBQXpDOztBQUVBLElBQUlFLFdBQVcsR0FBRzlNLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsSUFBSStNLFlBQVksR0FBRzdNLHNCQUFzQixDQUFDNE0sV0FBRCxDQUF6Qzs7QUFFQSxJQUFJek0sVUFBVSxHQUFHTCxtQkFBTyxDQUFDLHVEQUFELENBQXhCOztBQUVBLElBQUlNLFdBQVcsR0FBR0osc0JBQXNCLENBQUNHLFVBQUQsQ0FBeEM7O0FBRUEsSUFBSUUsU0FBUyxHQUFHUCxtQkFBTyxDQUFDLHFEQUFELENBQXZCOztBQUVBLElBQUlRLFVBQVUsR0FBR04sc0JBQXNCLENBQUNLLFNBQUQsQ0FBdkM7O0FBRUEsSUFBSXlNLFdBQVcsR0FBR2hOLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsSUFBSWlOLFlBQVksR0FBRy9NLHNCQUFzQixDQUFDOE0sV0FBRCxDQUF6Qzs7QUFFQSxTQUFTOU0sc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVaLFdBQU8sRUFBRVk7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsU0FBUzhMLGNBQVQsR0FBMEI7QUFDeEIsTUFBSTNGLFNBQVMsR0FBRyxDQUFDLEdBQUc2RixXQUFXLENBQUM1TSxPQUFoQixHQUFoQjs7QUFFQSxXQUFTcU4sQ0FBVCxDQUFXL08sSUFBWCxFQUFpQk0sS0FBakIsRUFBd0I7QUFDdEIsU0FBSyxJQUFJMkwsSUFBSSxHQUFHakwsU0FBUyxDQUFDQyxNQUFyQixFQUE2QlYsUUFBUSxHQUFHeUssS0FBSyxDQUFDaUIsSUFBSSxHQUFHLENBQVAsR0FBV0EsSUFBSSxHQUFHLENBQWxCLEdBQXNCLENBQXZCLENBQTdDLEVBQXdFRSxJQUFJLEdBQUcsQ0FBcEYsRUFBdUZBLElBQUksR0FBR0YsSUFBOUYsRUFBb0dFLElBQUksRUFBeEcsRUFBNEc7QUFDMUc1TCxjQUFRLENBQUM0TCxJQUFJLEdBQUcsQ0FBUixDQUFSLEdBQXFCbkwsU0FBUyxDQUFDbUwsSUFBRCxDQUE5QjtBQUNEOztBQUVELFdBQU8sQ0FBQyxHQUFHcUMsWUFBWSxDQUFDOU0sT0FBakIsRUFBMEIxQixJQUExQixFQUFnQ00sS0FBaEMsRUFBdUNDLFFBQXZDLENBQVA7QUFDRDs7QUFDRCxXQUFTdUYsR0FBVCxDQUFhWixPQUFiLEVBQXNCO0FBQ3BCLFFBQUksQ0FBQyxDQUFDLEdBQUdwRCxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJ3RCxPQUE5QixDQUFMLEVBQTZDO0FBQzNDLFlBQU0sSUFBSTFFLEtBQUosQ0FBVSxxQ0FBcUMwRSxPQUFPLENBQUM5RSxRQUFSLEVBQXJDLEdBQTBELFVBQXBFLENBQU47QUFDRDs7QUFDRCxXQUFPcUksU0FBUyxDQUFDM0MsR0FBVixDQUFjWixPQUFkLENBQVA7QUFDRDs7QUFDRCxNQUFJOEosUUFBUSxHQUFHLFNBQVNBLFFBQVQsR0FBb0IsQ0FBRSxDQUFyQzs7QUFDQSxNQUFJekQsV0FBVyxHQUFHLENBQUMsR0FBR0csYUFBYSxDQUFDaEssT0FBbEIsRUFBMkIrRyxTQUEzQixDQUFsQjtBQUNBLE1BQUl3RyxVQUFVLEdBQUcsQ0FBQyxHQUFHUCxZQUFZLENBQUNoTixPQUFqQixFQUEwQitHLFNBQTFCLENBQWpCO0FBQ0EsTUFBSTBFLFFBQVEsR0FBRyxDQUFDLEdBQUc5SyxVQUFVLENBQUNYLE9BQWYsRUFBd0IrRyxTQUF4QixDQUFmO0FBQ0EsTUFBSXlHLFVBQVUsR0FBRyxDQUFDLEdBQUdOLFlBQVksQ0FBQ2xOLE9BQWpCLEVBQTBCK0csU0FBMUIsRUFBcUMwRSxRQUFyQyxDQUFqQjtBQUNBLE1BQUlnQyxTQUFTLEdBQUcsQ0FBQyxHQUFHaE4sV0FBVyxDQUFDVCxPQUFoQixFQUF5QitHLFNBQXpCLEVBQW9DOEMsV0FBcEMsQ0FBaEI7QUFDQSxNQUFJNkQsVUFBVSxHQUFHLENBQUMsR0FBR04sWUFBWSxDQUFDcE4sT0FBakIsRUFBMEJ5TCxRQUExQixDQUFqQjtBQUVBLFNBQU87QUFDTDRCLEtBQUMsRUFBRUEsQ0FERTtBQUVMakosT0FBRyxFQUFFQSxHQUZBO0FBR0xrSixZQUFRLEVBQUVBLFFBSEw7QUFJTHZHLGFBQVMsRUFBRUEsU0FKTjtBQUtMOEMsZUFBVyxFQUFFQSxXQUxSO0FBTUwwRCxjQUFVLEVBQUVBLFVBTlA7QUFPTEMsY0FBVSxFQUFFQSxVQVBQO0FBUUxDLGFBQVMsRUFBRUEsU0FSTjtBQVNMaEMsWUFBUSxFQUFFQSxRQVRMO0FBVUxpQyxjQUFVLEVBQUVBO0FBVlAsR0FBUDtBQVlEOztBQUVELElBQUlDLFFBQVEsR0FBR2pCLGNBQWMsRUFBN0I7QUFFQWtCLE1BQU0sQ0FBQ3pQLE9BQVAsR0FBaUJ3UCxRQUFqQjtBQUNBQyxNQUFNLENBQUN6UCxPQUFQLENBQWV1TyxjQUFmLEdBQWdDQSxjQUFjLEVBQTlDLEM7Ozs7Ozs7Ozs7OztBQ3RGYTs7QUFFYnpPLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM2QixPQUFSLEdBQWtCNk4sY0FBbEI7O0FBQ0EsU0FBU0EsY0FBVCxDQUF3QnJLLE9BQXhCLEVBQWlDO0FBQy9CLFNBQU9BLE9BQU8sSUFBSUEsT0FBTyxDQUFDekUsT0FBUixLQUFvQixJQUF0QztBQUNEOztBQUFBLEM7Ozs7Ozs7Ozs7OztBQ1JZOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixXQUFXO0FBQy9COztBQUVBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3REQTtBQUNBO0FBQ0E7O0FBRUEsaUM7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBLGlEQUFpRCxnQkFBZ0I7QUFDakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQzs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7O0FBRUEsa0M7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QywrQkFBK0I7QUFDNUU7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUM7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7Ozs7O0FDSkEscUJBQXFCLG1CQUFPLENBQUMsaUZBQWtCOztBQUUvQztBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQzs7Ozs7Ozs7Ozs7QUN6QkEscUJBQXFCLG1CQUFPLENBQUMsaUZBQWtCOztBQUUvQywyQkFBMkIsbUJBQU8sQ0FBQyw2RkFBd0I7O0FBRTNELHNCQUFzQixtQkFBTyxDQUFDLG1GQUFtQjs7QUFFakQ7QUFDQTtBQUNBOztBQUVBLGdDOzs7Ozs7Ozs7OztBQ1ZBLHdCQUF3QixtQkFBTyxDQUFDLHVGQUFxQjs7QUFFckQsc0JBQXNCLG1CQUFPLENBQUMsbUZBQW1COztBQUVqRCx3QkFBd0IsbUJBQU8sQ0FBQyx1RkFBcUI7O0FBRXJEO0FBQ0E7QUFDQTs7QUFFQSxvQzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0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QVNHLEdBQVQsR0FBZTtBQUFBLG1CQUNPeEUsc0RBQVMsRUFEaEI7QUFBQSxNQUNMdEQsT0FESyxjQUNMQSxPQURLOztBQUdiLFNBQ0UsK0NBQUMsNkNBQUQsUUFDRSwrQ0FBQyw4Q0FBRDtBQUFXLGdCQUFZLEVBQUdBO0FBQTFCLElBREYsRUFFRSwrQ0FBQywyQ0FBRDtBQUFRLGdCQUFZLEVBQUdBO0FBQXZCLElBRkYsRUFHRSwrQ0FBQyxnREFBRCxDQUFTLFFBQVQ7QUFBa0IsV0FBTyxFQUFDO0FBQTFCLElBSEYsRUFJRSwrQ0FBQyw4Q0FBRDtBQUFPLFdBQU8sRUFBQyxPQUFmO0FBQXVCLGlCQUFhO0FBQXBDLEtBQ0UsK0NBQUMsK0NBQUQ7QUFBUSxXQUFPLEVBQUM7QUFBaEIsS0FDRSwrQ0FBQyxpREFBRDtBQUFVLFVBQU0sTUFBaEI7QUFBaUIsV0FBTztBQUF4QixJQURGLEVBRUUsK0NBQUMsc0RBQUQ7QUFBbUIsV0FBTztBQUExQixJQUZGLENBREYsRUFLRSwrQ0FBQywwREFBRDtBQUFtQixVQUFNO0FBQXpCLElBTEYsRUFNRSwrQ0FBQyxvREFBRDtBQUFpQixVQUFNO0FBQXZCLElBTkYsRUFPRSwrQ0FBQyxnREFBRCxDQUFTLE9BQVQ7QUFBaUIsVUFBTTtBQUF2QixJQVBGLENBSkYsQ0FERjtBQWdCRDs7QUFBQTtBQUVEL0YsZ0RBQUcsQ0FBQywrQ0FBQyxHQUFELE9BQUQsQ0FBSCxDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5mdW5jdGlvbiBnZXRGdW5jTmFtZShmdW5jKSB7XG4gIGlmIChmdW5jLm5hbWUpIHJldHVybiBmdW5jLm5hbWU7XG4gIHZhciByZXN1bHQgPSAvXmZ1bmN0aW9uXFxzKyhbXFx3XFwkXSspXFxzKlxcKC8uZXhlYyhmdW5jLnRvU3RyaW5nKCkpO1xuXG4gIHJldHVybiByZXN1bHQgPyByZXN1bHRbMV0gOiAndW5rbm93bic7XG59O1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZnVuYywgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RzIGEgZnVuY3Rpb24uIFwiJyArIGZ1bmMgKyAnXCIgZ2l2ZW4gaW5zdGVhZC4nKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIF9fYWN0bWw6IHRydWUsXG4gICAgX191c2VkOiAwLFxuICAgIF9fcnVubmluZzogZmFsc2UsXG4gICAgX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5OiB0cnVlLFxuICAgIGlkOiBudWxsLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBuYW1lOiBnZXRGdW5jTmFtZShmdW5jKSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShpZCkge1xuICAgICAgdmFyIHVzZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuX191c2VkID0gdXNlZDtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSA9IHRydWU7XG4gICAgfSxcbiAgICBtZXJnZVByb3BzOiBmdW5jdGlvbiBtZXJnZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIH0sXG4gICAgdXNlZDogZnVuY3Rpb24gdXNlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fdXNlZDtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19ydW5uaW5nO1xuICAgIH0sXG4gICAgc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTogZnVuY3Rpb24gc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSh2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5O1xuICAgICAgfVxuICAgICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB2YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcigpIHtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5ID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuIGZ1bmModGhpcy5wcm9wcyk7XG4gICAgfSxcbiAgICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICAgIHRoaXMuX191c2VkICs9IDE7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUVsZW1lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUHJvY2Vzc29yO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50ID0gcmVxdWlyZSgnLi91dGlscy9pc0FjdE1MRWxlbWVudCcpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQWN0TUxFbGVtZW50KTtcblxudmFyIF9UcmVlID0gcmVxdWlyZSgnLi9UcmVlJyk7XG5cbnZhciBfVHJlZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UcmVlKTtcblxudmFyIF91c2VQdWJTdWIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVB1YlN1YicpO1xuXG52YXIgX3VzZVB1YlN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQdWJTdWIpO1xuXG52YXIgX3VzZVN0YXRlID0gcmVxdWlyZSgnLi9ob29rcy91c2VTdGF0ZScpO1xuXG52YXIgX3VzZVN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVN0YXRlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgdmFyIGdlbiA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHsgdHJ5IHsgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpOyB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlOyB9IGNhdGNoIChlcnJvcikgeyByZWplY3QoZXJyb3IpOyByZXR1cm47IH0gaWYgKGluZm8uZG9uZSkgeyByZXNvbHZlKHZhbHVlKTsgfSBlbHNlIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHN0ZXAoXCJ0aHJvd1wiLCBlcnIpOyB9KTsgfSB9IHJldHVybiBzdGVwKFwibmV4dFwiKTsgfSk7IH07IH0gLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cblxuXG4vLyBpbXBvcnQgaW5pdGlhbGl6ZUhvb2tzIGZyb20gJy4vaG9va3MnO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9jZXNzb3IoKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIHRyZWUgPSAoMCwgX1RyZWUyLmRlZmF1bHQpKCk7XG4gIHZhciBjdXJyZW50Tm9kZSA9IG51bGw7XG5cbiAgdmFyIHByb2Nlc3NOb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfcmVmID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlMihub2RlKSB7XG4gICAgICB2YXIgcmVzdWx0LCBnZW5SZXN1bHQsIHRvR2VuVmFsdWU7XG4gICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgIG5vZGUuZW50ZXIoKTtcbiAgICAgICAgICAgICAgbm9kZS5yZXJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIG5vZGUuY2FsbENoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfcmVmMiA9IF9hc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZSgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlblJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jaGlsZHJlbiRpLFxuICAgICAgICAgICAgICAgICAgICAgIGZ1bmNSZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgX2FyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5SZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBub2RlLmVsZW1lbnQuY2hpbGRyZW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpIDwgY2hpbGRyZW4ubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoY2hpbGRyZW5baV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKF9jaGlsZHJlbiRpID0gY2hpbGRyZW5baV0pLm1lcmdlUHJvcHMuYXBwbHkoX2NoaWxkcmVuJGksIF9hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDAgPSBjaGlsZHJlblJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoY2hpbGRyZW5baV0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDEgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQwLnB1c2guY2FsbChfY29udGV4dC50MCwgX2NvbnRleHQudDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGVvZiBjaGlsZHJlbltpXSA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbltpXS5hcHBseShjaGlsZHJlbiwgX2FyZ3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jUmVzdWx0ID0gX2NvbnRleHQuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDIgPSBjaGlsZHJlblJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDIyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZnVuY1Jlc3VsdCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC50MyA9IF9jb250ZXh0LnNlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDIucHVzaC5jYWxsKF9jb250ZXh0LnQyLCBfY29udGV4dC50Myk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5SZXN1bHQucHVzaChmdW5jUmVzdWx0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoJ3JldHVybicsIGNoaWxkcmVuUmVzdWx0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LCBfY2FsbGVlLCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0oKTtcblxuICAgICAgICAgICAgICAvLyBhY3R1YWwgY2FsbCBvZiB0aGUgQWN0TUwgZWxlbWVudFxuICAgICAgICAgICAgICByZXN1bHQgPSBub2RlLmVsZW1lbnQuZW50ZXIoKTtcbiAgICAgICAgICAgICAgZ2VuUmVzdWx0ID0gdm9pZCAwLCB0b0dlblZhbHVlID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAgIC8vIGhhbmRsaW5nIGEgcHJvbWlzZVxuXG4gICAgICAgICAgICAgIGlmICghKHJlc3VsdCAmJiByZXN1bHQudGhlbikpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDEyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA5O1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IF9jb250ZXh0Mi5zZW50O1xuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM1O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQubmV4dCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDMxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZ2VuUmVzdWx0ID0gcmVzdWx0Lm5leHQoKTtcblxuICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgaWYgKGdlblJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE4O1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSk7XG5cbiAgICAgICAgICAgIGNhc2UgMTg6XG4gICAgICAgICAgICAgIHRvR2VuVmFsdWUgPSBfY29udGV4dDIuc2VudDtcblxuICAgICAgICAgICAgY2FzZSAxOTpcbiAgICAgICAgICAgICAgZ2VuUmVzdWx0ID0gcmVzdWx0Lm5leHQodG9HZW5WYWx1ZSk7XG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyNTtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICBjYXNlIDI1OlxuICAgICAgICAgICAgICByZXN1bHQgPSBfY29udGV4dDIuc2VudDtcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMjg6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGdlblJlc3VsdC52YWx1ZTtcblxuICAgICAgICAgICAgY2FzZSAyOTpcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzE6XG4gICAgICAgICAgICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM0O1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUocmVzdWx0KSk7XG5cbiAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IF9jb250ZXh0Mi5zZW50O1xuXG4gICAgICAgICAgICBjYXNlIDM1OlxuICAgICAgICAgICAgICBpZiAoIW5vZGUuZWxlbWVudC5zaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5KCkpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzODtcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuY2FsbENoaWxkcmVuKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMzg6XG5cbiAgICAgICAgICAgICAgbm9kZS5lbGVtZW50Lm91dCgpO1xuICAgICAgICAgICAgICBub2RlLm91dCgpO1xuICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoJ3JldHVybicsIHJlc3VsdCk7XG5cbiAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIF9jYWxsZWUyLCBfdGhpcyk7XG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHByb2Nlc3NOb2RlKF94KSB7XG4gICAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0oKTtcblxuICByZXR1cm4ge1xuICAgIG5vZGU6IGZ1bmN0aW9uIG5vZGUoKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSxcbiAgICBydW46IGZ1bmN0aW9uIHJ1bihlbGVtZW50KSB7XG4gICAgICB2YXIgcmVzb2x2ZWRSb290Tm9kZSA9IHRyZWUucmVzb2x2ZVJvb3QoZWxlbWVudCk7XG5cbiAgICAgIHJldHVybiBwcm9jZXNzTm9kZShyZXNvbHZlZFJvb3ROb2RlLCBbXSk7XG4gICAgfSxcbiAgICBvbk5vZGVFbnRlcjogZnVuY3Rpb24gb25Ob2RlRW50ZXIoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlT3V0OiBmdW5jdGlvbiBvbk5vZGVPdXQoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLm9uTm9kZVJlbW92ZShjYWxsYmFjayk7XG4gICAgfSxcbiAgICBzeXN0ZW06IGZ1bmN0aW9uIHN5c3RlbSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyZWU6IHRyZWUsXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICB0cmVlLnJlc2V0KCk7XG4gICAgICAgICAgX3VzZVB1YlN1YjIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICAgIF91c2VTdGF0ZTIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gVHJlZTtcblxudmFyIF9mYXN0RGVlcEVxdWFsID0gcmVxdWlyZSgnZmFzdC1kZWVwLWVxdWFsJyk7XG5cbnZhciBfZmFzdERlZXBFcXVhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mYXN0RGVlcEVxdWFsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gVHJlZSgpIHtcbiAgdmFyIG9uTm9kZUVudGVyID0gW107XG4gIHZhciBvbk5vZGVPdXQgPSBbXTtcbiAgdmFyIF9vbk5vZGVSZW1vdmUgPSBbXTtcbiAgdmFyIHJvb3QgPSBjcmVhdGVOZXdOb2RlKCk7XG4gIHZhciBpZHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGdldElkKCkge1xuICAgIHJldHVybiAnYScgKyArK2lkcztcbiAgfTtcbiAgZnVuY3Rpb24gdXNlU2FtZU5vZGUobm9kZSwgbmV3RWxlbWVudCkge1xuICAgIG5ld0VsZW1lbnQuaW5pdGlhbGl6ZShub2RlLmVsZW1lbnQuaWQsIG5vZGUuZWxlbWVudC51c2VkKCkpO1xuICAgIG5vZGUuZWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgZnVuY3Rpb24gdHJlZURpZmYob2xkRWxlbWVudCwgbmV3RWxlbWVudCkge1xuICAgIGlmIChvbGRFbGVtZW50ICYmIG9sZEVsZW1lbnQubmFtZSA9PT0gbmV3RWxlbWVudC5uYW1lKSB7XG4gICAgICByZXR1cm4gKDAsIF9mYXN0RGVlcEVxdWFsMi5kZWZhdWx0KShvbGRFbGVtZW50LnByb3BzLCBuZXdFbGVtZW50LnByb3BzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld05vZGUoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuaW5pdGlhbGl6ZShnZXRJZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgIGN1cnNvcjogMCxcbiAgICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBvbk5vZGVFbnRlci5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUncmUgbW9yZSBub2RlcyBpbiB0aGUgdHJlZSB0aGFuIHdoYXQgd2FzIHByb2Nlc3NlZFxuICAgICAgICBpZiAodGhpcy5jdXJzb3IgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKHRoaXMuY3Vyc29yLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIHRoaXMuY3Vyc29yKS5mb3JFYWNoKGZ1bmN0aW9uIChyZW1vdmVkTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICByZXR1cm4gYyhyZW1vdmVkTm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnNvciA9IDA7XG4gICAgICAgIG9uTm9kZU91dC5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMyKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYWRkQ2hpbGROb2RlOiBmdW5jdGlvbiBhZGRDaGlsZE5vZGUobmV3RWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl07XG5cbiAgICAgICAgLy8gdXNpbmcgdGhlIHNhbWUgbm9kZVxuICAgICAgICBpZiAoY2hpbGROb2RlICYmIHRyZWVEaWZmKGNoaWxkTm9kZS5lbGVtZW50LCBuZXdFbGVtZW50KSkge1xuICAgICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgICAgcmV0dXJuIHVzZVNhbWVOb2RlKGNoaWxkTm9kZSwgbmV3RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGluZyBhIG5ldyBub2RlXG4gICAgICAgIHZhciBuZXdDaGlsZE5vZGUgPSBjcmVhdGVOZXdOb2RlKG5ld0VsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSkge1xuICAgICAgICAgIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgcmV0dXJuIGMoX3RoaXMzLmNoaWxkcmVuW190aGlzMy5jdXJzb3JdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSA9IG5ld0NoaWxkTm9kZTtcbiAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkTm9kZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlUm9vdDogZnVuY3Rpb24gcmVzb2x2ZVJvb3QoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHJvb3QgPSB0cmVlRGlmZihyb290LmVsZW1lbnQsIGVsZW1lbnQpID8gdXNlU2FtZU5vZGUocm9vdCwgZWxlbWVudCkgOiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQpO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgICAgIGlkcyA9IDA7XG4gICAgfSxcbiAgICBnZXROdW1PZkVsZW1lbnRzOiBmdW5jdGlvbiBnZXROdW1PZkVsZW1lbnRzKCkge1xuICAgICAgcmV0dXJuIGlkcztcbiAgICB9LFxuICAgIGRpYWdub3NlOiBmdW5jdGlvbiBkaWFnbm9zZSgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBsb29wT3Zlcihub2RlKSB7XG4gICAgICAgIHZhciBpbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobm9kZS5lbGVtZW50Lm5hbWUsIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmQ6IGluZCxcbiAgICAgICAgICBuYW1lOiBub2RlLmVsZW1lbnQubmFtZSxcbiAgICAgICAgICB1c2VkOiBub2RlLmVsZW1lbnQudXNlZCgpLFxuICAgICAgICAgIGlkOiBub2RlLmVsZW1lbnQuaWQsXG4gICAgICAgICAgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvb3BPdmVyKGNoaWxkLCBpbmQgKyAxKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgfShyb290KTtcbiAgICB9LFxuICAgIGFkZE5vZGVFbnRlckNhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlRW50ZXIucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBhZGROb2RlT3V0Q2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlT3V0LnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIF9vbk5vZGVSZW1vdmUucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9O1xufSAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgbm8tcmV0dXJuLWFzc2lnbiwgbWF4LWxlbiAqL1xuOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlQ2hpbGRyZW5Ib29rID0gZnVuY3Rpb24gY3JlYXRlVXNlQ2hpbGRyZW5Ib29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgbm9kZS5lbGVtZW50LnNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkoZmFsc2UpO1xuICAgIHJldHVybiBbbm9kZS5jYWxsQ2hpbGRyZW4sIG5vZGUuZWxlbWVudC5jaGlsZHJlbl07XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VDaGlsZHJlbkhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVVc2VFbGVtZW50SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRIb29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgcmV0dXJuIHByb2Nlc3Nvci5ub2RlKCkuZWxlbWVudDtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVsZW1lbnRIb29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfSAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5cblxudmFyIGJyaWRnZU1ldGhvZE5hbWUgPSBmdW5jdGlvbiBicmlkZ2VNZXRob2ROYW1lKGtleXdvcmQpIHtcbiAgcmV0dXJuICdfX3JlcXVlc3RfXycgKyBrZXl3b3JkO1xufTtcblxudmFyIHJlc29sdmVQcm9kdWN0ID0gZnVuY3Rpb24gcmVzb2x2ZVByb2R1Y3QoYnJpZGdlTWV0aG9kLCBub2RlLCBnZXRFcnJvcikge1xuICBpZiAoIW5vZGUpIHtcbiAgICB0aHJvdyBnZXRFcnJvcigpO1xuICB9XG4gIHZhciBzb3VyY2UgPSB2b2lkIDA7XG5cbiAgaWYgKG5vZGVbYnJpZGdlTWV0aG9kXSkge1xuICAgIHNvdXJjZSA9IG5vZGU7XG4gIH0gZWxzZSB7XG4gICAgc291cmNlID0gbm9kZS5jaGlsZHJlbi5maW5kKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgcmV0dXJuICEhY2hpbGRbYnJpZGdlTWV0aG9kXTtcbiAgICB9KTtcbiAgfVxuICB2YXIgcHJvZHVjdCA9IHNvdXJjZSA/IHNvdXJjZVticmlkZ2VNZXRob2RdKCkgOiBudWxsO1xuXG4gIGlmIChwcm9kdWN0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHByb2R1Y3QudmFsdWU7XG4gIH1cbiAgcmV0dXJuIHJlc29sdmVQcm9kdWN0KGJyaWRnZU1ldGhvZCwgbm9kZS5wYXJlbnQsIGdldEVycm9yKTtcbn07XG5cbnZhciBnZXROb3RGb3VuZEVycm9yID0gZnVuY3Rpb24gZ2V0Tm90Rm91bmRFcnJvcihrZXl3b3JkLCBub2RlKSB7XG4gIHZhciBnZXRTdGFjayA9IGZ1bmN0aW9uIGdldFN0YWNrKG5vZGUpIHtcbiAgICB2YXIgc3RhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IFtdO1xuXG4gICAgc3RhY2sucHVzaChub2RlLmVsZW1lbnQubmFtZSk7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICByZXR1cm4gZ2V0U3RhY2sobm9kZS5wYXJlbnQsIHN0YWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xuXG4gIHJldHVybiBuZXcgRXJyb3IoJ1wiJyArIGtleXdvcmQgKyAnXCIgcHJvcCByZXF1ZXN0ZWQgYnkgXCInICsgbm9kZS5lbGVtZW50Lm5hbWUgKyAnXCIgY2FuIG5vdCBiZSBmb3VuZC5cXG5cXG5TdGFjazpcXG4nICsgZ2V0U3RhY2sobm9kZSkucmV2ZXJzZSgpLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnICA8JyArIG5hbWUgKyAnPic7XG4gIH0pLmpvaW4oJ1xcbicpKTtcbn07XG5cbnZhciBjcmVhdGVVc2VQcm9kdWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZVByb2R1Y3RIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlRW50ZXIoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgcHJvcHMgPSBlbGVtZW50LnByb3BzO1xuXG4gICAgdmFyIHByb3BOYW1lcyA9IHByb3BzID8gT2JqZWN0LmtleXMocHJvcHMpIDogW107XG5cbiAgICBwcm9wTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcE5hbWUpIHtcbiAgICAgIGlmIChwcm9wTmFtZS5jaGFyQXQoMCkgPT09ICckJykge1xuICAgICAgICB2YXIga2V5d29yZCA9IHByb3BOYW1lLnN1YnN0cigxLCBwcm9wTmFtZS5sZW5ndGgpO1xuICAgICAgICB2YXIgcHJvZHVjdFZhbHVlID0gcmVzb2x2ZVByb2R1Y3QoYnJpZGdlTWV0aG9kTmFtZShrZXl3b3JkKSwgbm9kZS5wYXJlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Tm90Rm91bmRFcnJvcihrZXl3b3JkLCBub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5tZXJnZVByb3BzKF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5d29yZCwgcHJvZHVjdFZhbHVlKSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnZXhwb3J0cycpIHtcbiAgICAgICAgbm9kZVticmlkZ2VNZXRob2ROYW1lKHByb3BzW3Byb3BOYW1lXSldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBub2RlLl9fcHJvZHVjdCB9O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgbm9kZS5fX3Byb2R1Y3QgPSB2YWx1ZTtcbiAgICByZXR1cm4gW2Z1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgcmV0dXJuIG5vZGUuX19wcm9kdWN0ID0gbmV3VmFsdWU7XG4gICAgfV07XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQcm9kdWN0SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHViU3ViSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3Vic2NyaWJlcnMgPSB7fTtcblxuZnVuY3Rpb24gY3JlYXRlU3Vic2NyaWJlRWxlbWVudChzdWJzY3JpYmUsIHVzZUNoaWxkcmVuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciB0eXBlID0gX3JlZi50eXBlO1xuXG4gICAgdmFyIF91c2VDaGlsZHJlbiA9IHVzZUNoaWxkcmVuKCksXG4gICAgICAgIF91c2VDaGlsZHJlbjIgPSBfc2xpY2VkVG9BcnJheShfdXNlQ2hpbGRyZW4sIDEpLFxuICAgICAgICBjaGlsZHJlbiA9IF91c2VDaGlsZHJlbjJbMF07XG5cbiAgICBzdWJzY3JpYmUodHlwZSwgZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlbih7IHBheWxvYWQ6IHBheWxvYWQgfSk7XG4gICAgfSk7XG4gIH07XG59O1xuZnVuY3Rpb24gY3JlYXRlUHVibGlzaEVsZW1lbnQocHVibGlzaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIHR5cGUgPSBfcmVmMi50eXBlLFxuICAgICAgICBwYXlsb2FkID0gX3JlZjIucGF5bG9hZDtcblxuICAgIHB1Ymxpc2godHlwZSwgcGF5bG9hZCk7XG4gIH07XG59XG5cbnZhciBzdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgc3Vic2NyaWJlcnNbdHlwZV0gPSB7fTtcbiAgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0gPSBjYWxsYmFjaztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF07XG4gIH07XG59O1xudmFyIHB1Ymxpc2ggPSBmdW5jdGlvbiBwdWJsaXNoKHR5cGUsIHBheWxvYWQpIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgcmV0dXJuO1xuICBPYmplY3Qua2V5cyhzdWJzY3JpYmVyc1t0eXBlXSkuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICBzdWJzY3JpYmVyc1t0eXBlXVtpZF0ocGF5bG9hZCk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVXNlUHViU3ViSG9vayhwcm9jZXNzb3IsIHVzZUNoaWxkcmVuKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgaWYgKHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF0pIHtcbiAgICAgICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlZEVsZW1lbnQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWwgPSBzY29wZWRFbGVtZW50IHx8IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgc3Vic2NyaWJlRnVuYyA9IGZ1bmN0aW9uIHN1YnNjcmliZUZ1bmMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YnNjcmliZS5hcHBseSh1bmRlZmluZWQsIFtlbF0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG4gICAgdmFyIHB1Ymxpc2hGdW5jID0gZnVuY3Rpb24gcHVibGlzaEZ1bmMoKSB7XG4gICAgICByZXR1cm4gcHVibGlzaC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZUZ1bmMsXG4gICAgICBwdWJsaXNoOiBwdWJsaXNoRnVuYyxcbiAgICAgIHN1YnNjcmliZXJzOiBzdWJzY3JpYmVycyxcbiAgICAgIFN1YnNjcmliZTogY3JlYXRlU3Vic2NyaWJlRWxlbWVudChzdWJzY3JpYmVGdW5jLCB1c2VDaGlsZHJlbiksXG4gICAgICBQdWJsaXNoOiBjcmVhdGVQdWJsaXNoRWxlbWVudChwdWJsaXNoRnVuYylcbiAgICB9O1xuICB9O1xufVxuXG5jcmVhdGVVc2VQdWJTdWJIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBzdWJzY3JpYmVycyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUmVkdWNlckhvb2s7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBhY3Rpb24gPSBfcmVmLmFjdGlvbixcbiAgICAgICAgcHJvcHNUb0FjdGlvbiA9IF9yZWYucHJvcHNUb0FjdGlvbixcbiAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2FjdGlvbicsICdwcm9wc1RvQWN0aW9uJ10pO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgZGlzcGF0Y2goYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHByb3BzVG9BY3Rpb24pIHtcbiAgICAgIGRpc3BhdGNoKHByb3BzVG9BY3Rpb24ocmVzdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJzxEaXNwYXRjaD4gZXhwZWN0cyBcImFjdGlvblwiIG9yIFwicHJvcHNUb0FjdGlvblwiIHByb3AuJyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVc2VSZWR1Y2VySG9vayh1c2VTdGF0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xuICAgIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShpbml0aWFsU3RhdGUpLFxuICAgICAgICBfdXNlU3RhdGUyID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAzKSxcbiAgICAgICAgc3RhdGUgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgICBzZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMV0sXG4gICAgICAgIGdldFN0YXRlID0gX3VzZVN0YXRlMlsyXTtcblxuICAgIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHNldFN0YXRlKHJlZHVjZXIoZ2V0U3RhdGUoKSwgYWN0aW9uKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoLCBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpLCAvLyA8RGlzcGF0Y2g+XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldFN0YXRlKCk7XG4gICAgfSAvLyA8R2V0U3RhdGU+XG4gICAgXTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VTdGF0ZUhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IHN0YXRlczogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0b3JhZ2Uuc3RhdGVzW2luZGV4XSwgZnVuY3Rpb24gKG5ld1N0YXRlKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlc1tpbmRleF0gPSBuZXdTdGF0ZTtcbiAgICAgIGlmICghZWxlbWVudC5pc1J1bm5pbmcoKSkge1xuICAgICAgICBub2RlLnJlcnVuKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XTtcbiAgICB9XTtcbiAgfTtcbn1cblxuY3JlYXRlVXNlU3RhdGVIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBTdG9yYWdlLmVsZW1lbnRzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVmFsaWRIb29rQ29udGV4dDtcbmZ1bmN0aW9uIGlzVmFsaWRIb29rQ29udGV4dChwcm9jZXNzb3IpIHtcbiAgaWYgKCFwcm9jZXNzb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB0ZXJyaWJseSB3cm9uZyBoYXBwZW5lZC4gVGhlIGhvb2sgZmFjdG9yeSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aG91dCBhIHByb2Nlc3Nvci4nKTtcbiAgfVxuICBpZiAoIXByb2Nlc3Nvci5ub2RlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvb2tzIG11c3QgYmUgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIGFuIEFjdE1MIGVsZW1lbnQuJyk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jcmVhdGVVbml2ZXJzZSA9IGNyZWF0ZVVuaXZlcnNlO1xuXG52YXIgX1Byb2Nlc3NvciA9IHJlcXVpcmUoJy4vUHJvY2Vzc29yJyk7XG5cbnZhciBfUHJvY2Vzc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Byb2Nlc3Nvcik7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX0FjdEVsZW1lbnQgPSByZXF1aXJlKCcuL0FjdEVsZW1lbnQnKTtcblxudmFyIF9BY3RFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdEVsZW1lbnQpO1xuXG52YXIgX3VzZUNoaWxkcmVuID0gcmVxdWlyZSgnLi9ob29rcy91c2VDaGlsZHJlbicpO1xuXG52YXIgX3VzZUNoaWxkcmVuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUNoaWxkcmVuKTtcblxudmFyIF91c2VFbGVtZW50ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFbGVtZW50Jyk7XG5cbnZhciBfdXNlRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VFbGVtZW50KTtcblxudmFyIF91c2VQcm9kdWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VQcm9kdWN0Jyk7XG5cbnZhciBfdXNlUHJvZHVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQcm9kdWN0KTtcblxudmFyIF91c2VQdWJTdWIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVB1YlN1YicpO1xuXG52YXIgX3VzZVB1YlN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQdWJTdWIpO1xuXG52YXIgX3VzZVN0YXRlID0gcmVxdWlyZSgnLi9ob29rcy91c2VTdGF0ZScpO1xuXG52YXIgX3VzZVN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVN0YXRlKTtcblxudmFyIF91c2VSZWR1Y2VyID0gcmVxdWlyZSgnLi9ob29rcy91c2VSZWR1Y2VyJyk7XG5cbnZhciBfdXNlUmVkdWNlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VSZWR1Y2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlVW5pdmVyc2UoKSB7XG4gIHZhciBwcm9jZXNzb3IgPSAoMCwgX1Byb2Nlc3NvcjIuZGVmYXVsdCkoKTtcblxuICBmdW5jdGlvbiBBKGZ1bmMsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgY2hpbGRyZW5bX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX0FjdEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmMsIHByb3BzLCBjaGlsZHJlbik7XG4gIH1cbiAgZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0ZWQuIEluc3RlYWQgJyArIGVsZW1lbnQudG9TdHJpbmcoKSArICcgcGFzc2VkLicpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvY2Vzc29yLnJ1bihlbGVtZW50KTtcbiAgfVxuICB2YXIgRnJhZ21lbnQgPSBmdW5jdGlvbiBGcmFnbWVudCgpIHt9O1xuICB2YXIgdXNlQ2hpbGRyZW4gPSAoMCwgX3VzZUNoaWxkcmVuMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlRWxlbWVudCA9ICgwLCBfdXNlRWxlbWVudDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVN0YXRlID0gKDAsIF91c2VTdGF0ZTIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVByb2R1Y3QgPSAoMCwgX3VzZVByb2R1Y3QyLmRlZmF1bHQpKHByb2Nlc3NvciwgdXNlU3RhdGUpO1xuICB2YXIgdXNlUHViU3ViID0gKDAsIF91c2VQdWJTdWIyLmRlZmF1bHQpKHByb2Nlc3NvciwgdXNlQ2hpbGRyZW4pO1xuICB2YXIgdXNlUmVkdWNlciA9ICgwLCBfdXNlUmVkdWNlcjIuZGVmYXVsdCkodXNlU3RhdGUpO1xuXG4gIHJldHVybiB7XG4gICAgQTogQSxcbiAgICBydW46IHJ1bixcbiAgICBGcmFnbWVudDogRnJhZ21lbnQsXG4gICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IsXG4gICAgdXNlQ2hpbGRyZW46IHVzZUNoaWxkcmVuLFxuICAgIHVzZUVsZW1lbnQ6IHVzZUVsZW1lbnQsXG4gICAgdXNlUHJvZHVjdDogdXNlUHJvZHVjdCxcbiAgICB1c2VQdWJTdWI6IHVzZVB1YlN1YixcbiAgICB1c2VTdGF0ZTogdXNlU3RhdGUsXG4gICAgdXNlUmVkdWNlcjogdXNlUmVkdWNlclxuICB9O1xufVxuXG52YXIgdW5pdmVyc2UgPSBjcmVhdGVVbml2ZXJzZSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXZlcnNlO1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlVW5pdmVyc2UgPSBjcmVhdGVVbml2ZXJzZSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNBY3RNTEVsZW1lbnQ7XG5mdW5jdGlvbiBpc0FjdE1MRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuX19hY3RtbCA9PT0gdHJ1ZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIga2V5TGlzdCA9IE9iamVjdC5rZXlzO1xudmFyIGhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IGlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IGlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBrZXlMaXN0KGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0ga2V5TGlzdChiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIWhhc1Byb3AuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBhIT09YSAmJiBiIT09Yjtcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgJSAyKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkMjsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGb2N1c0ZpZWxkIH0gZnJvbSAnLi9ET00nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDaGVja0ZvckVkaXRGaWVsZCh7IHRvZG9zIH0pIHtcbiAgcmV0dXJuIDxGb2N1c0ZpZWxkIGluZGV4PXsgdG9kb3MuZmluZEluZGV4KCh7IGVkaXRpbmcgfSkgPT4gZWRpdGluZykgfSAvPjtcbn1cbiIsImltcG9ydCB7IHVzZUNoaWxkcmVuIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHtcbiAgVE9HR0xFLFxuICBORVdfVE9ETyxcbiAgREVMRVRFLFxuICBFRElULFxuICBFRElUX1RPRE8sXG4gIENMRUFSX0NPTVBMRVRFRFxufSBmcm9tICcuL1N0b3JlJztcblxuaW1wb3J0IHtcbiAgRklMVEVSX0FMTCxcbiAgRklMVEVSX0FDVElWRSxcbiAgRklMVEVSX0NPTVBMRVRFRFxufSBmcm9tICcuL0ZpbHRlcic7XG5cbmNvbnN0ICQgPSAoc2VsZWN0b3IpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuY29uc3QgbGlzdCA9ICQoJy50b2RvLWxpc3QnKTtcbmNvbnN0IGhlYWRlciA9ICQoJy5oZWFkZXInKTtcblxuY29uc3QgRU5URVIgPSAxMztcbmNvbnN0IEVTQyA9IDI3O1xuXG5leHBvcnQgZnVuY3Rpb24gRmlsbENvbnRhaW5lcigpIHtcbiAgY29uc3QgWyAsIGNvbnRlbnQgXSA9IHVzZUNoaWxkcmVuKCk7XG5cbiAgbGlzdC5pbm5lckhUTUwgPSBjb250ZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lcih7IG9uVXNlckFjdGlvbiB9KSB7XG4gIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLXRvZ2dsZScpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oVE9HR0xFLCB0b2RvSW5kZXgpO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWRlbGV0ZScpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oREVMRVRFLCB0b2RvSW5kZXgpO1xuICAgIH1cbiAgfSk7XG4gIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWxhYmVsJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihFRElULCB0b2RvSW5kZXgpO1xuICAgIH1cbiAgfSk7XG4gIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgIG9uVXNlckFjdGlvbihFRElUX1RPRE8sIHsgaW5kZXg6IHRvZG9JbmRleCwgbGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSAmJiBlLmtleUNvZGUgPT09IEVTQykge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLW5ldycpICYmIGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgIG9uVXNlckFjdGlvbihORVdfVE9ETywgZS50YXJnZXQudmFsdWUpO1xuICAgICAgZS50YXJnZXQudmFsdWUgPSAnJztcbiAgICB9XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIEZvY3VzRmllbGQoeyBpbmRleCB9KSB7XG4gIGNvbnN0IGVsID0gJChgLmVkaXRbZGF0YS1pbmRleD1cIiR7IGluZGV4IH1cIl1gKTtcblxuICBpZiAoZWwpIHtcbiAgICBlbC5mb2N1cygpO1xuICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gZWwuc2VsZWN0aW9uRW5kID0gZWwudmFsdWUubGVuZ3RoO1xuICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIFByb2dyZXNzQ2hlY2tlcih7IHRvZG9zIH0pIHtcbiAgY29uc3QgY29tcGxldGVkID0gdG9kb3MuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiBjb21wbGV0ZWQpLmxlbmd0aDtcbiAgY29uc3QgaXRlbXNMZWZ0ID0gdG9kb3MubGVuZ3RoIC0gY29tcGxldGVkO1xuXG4gICQoJ1tkYXRhLWNvdW50XScpLmlubmVySFRNTCA9IGBcbiAgICA8c3Ryb25nPiR7IGl0ZW1zTGVmdCB9PC9zdHJvbmc+ICR7IGl0ZW1zTGVmdCA+IDEgfHwgaXRlbXNMZWZ0ID09PSAwID8gJ2l0ZW1zJyA6ICdpdGVtJyB9IGxlZnRcbiAgYDtcbn07XG5leHBvcnQgZnVuY3Rpb24gRm9vdGVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgJCgnW2RhdGEtZmlsdGVyXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFsbCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0FMTCk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUNUSVZFKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1jb21wbGV0ZWQnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9DT01QTEVURUQpO1xuICAgIH1cbiAgfSk7XG4gICQoJ1tkYXRhLWNsZWFyLWNvbXBsZXRlZF0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBvblVzZXJBY3Rpb24oQ0xFQVJfQ09NUExFVEVEKTtcbiAgfSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlck9wdGlvbnNUYWJzKHsgZmlsdGVyIH0pIHtcbiAgJCgnW2RhdGEtYWxsXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9BTEwgPyAnc2VsZWN0ZWQnIDogJycpO1xuICAkKCdbZGF0YS1hY3RpdmVdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICQoJ1tkYXRhLWNvbXBsZXRlZF0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQ09NUExFVEVEID8gJ3NlbGVjdGVkJyA6ICcnKTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIEZyYWdtZW50LCB1c2VQcm9kdWN0LCB1c2VQdWJTdWIsIHVzZVN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9BTEwgPSAnRklMVEVSX0FMTCc7XG5leHBvcnQgY29uc3QgRklMVEVSX0FDVElWRSA9ICdGSUxURVJfQUNUSVZFJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQ09NUExFVEVEID0gJ0ZJTFRFUl9DT01QTEVURUQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGaWx0ZXIoKSB7XG4gIGNvbnN0IFsgZmlsdGVyLCBzZXRGaWx0ZXIgXSA9IHVzZVN0YXRlKEZJTFRFUl9BTEwpO1xuICBjb25zdCB7IFN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG5cbiAgdXNlUHJvZHVjdChmaWx0ZXIpO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRklMVEVSX0FMTCB9PlxuICAgICAgICB7ICgpID0+IHNldEZpbHRlcihGSUxURVJfQUxMKSB9XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEZJTFRFUl9BQ1RJVkUgfT5cbiAgICAgICAgeyAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FDVElWRSkgfVxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBGSUxURVJfQ09NUExFVEVEIH0+XG4gICAgICAgIHsgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9DT01QTEVURUQpIH1cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuIiwiaW1wb3J0IHsgdXNlUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IFRvRG8gfSBmcm9tICcuL1N0b3JlJztcblxuY29uc3QgaW5pdGlhbFZhbHVlID0gSlNPTi5zdHJpbmdpZnkoW1xuICBUb0RvKHsgbGFiZWw6ICdBY3RNTCBpcyB1c2luZyBKU1gnIH0pLFxuICBUb0RvKHsgbGFiZWw6ICdJdCBpcyBsaWtlIFJlYWN0IGJ1dCBub3QgZm9yIHJlbmRlcmluZycgfSlcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFByb3ZpZGVyOiAoKSA9PiB7XG4gICAgdXNlUHJvZHVjdChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvcycpIHx8IGluaXRpYWxWYWx1ZSkpO1xuICB9LFxuICBTdG9yYWdlOiAoeyB0b2RvcyB9KSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcbiAgfVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGaWxsQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgRklMVEVSX0FMTCwgRklMVEVSX0FDVElWRSwgRklMVEVSX0NPTVBMRVRFRCB9IGZyb20gJy4vRmlsdGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyZXIoeyB0b2RvcywgZmlsdGVyIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8RmlsbENvbnRhaW5lcj5cbiAgICAgIHtcbiAgICAgICAgdG9kb3NcbiAgICAgICAgLmZpbHRlcigoeyBjb21wbGV0ZWQgfSkgPT4ge1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BTEwpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BQ1RJVkUpIHJldHVybiAhY29tcGxldGVkO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQpIHJldHVybiBjb21wbGV0ZWQ7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KS5tYXAoKHRvZG8sIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBsaUNsYXNzID0gdG9kby5lZGl0aW5nID8gJ2VkaXRpbmcnIDogKHRvZG8uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJyk7XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPSckeyBsaUNsYXNzIH0nPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlXG4gICAgICAgICAgICAgICAgICAkeyB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnIH0+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWxhYmVsPiR7IHRvZG8ubGFiZWwgfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkZXN0cm95XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS1kZWxldGU+PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZGl0XCIgdmFsdWU9XCIkeyB0b2RvLmxhYmVsIH1cIiBkYXRhLWluZGV4PVwiJHsgaSB9XCIgZGF0YS1lZGl0PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICBgO1xuICAgICAgICB9KS5qb2luKCcnKVxuICAgICAgfVxuICAgIDwvRmlsbENvbnRhaW5lcj5cbiAgKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCBGcmFnbWVudCwgdXNlUmVkdWNlciwgdXNlUHJvZHVjdCwgdXNlUHViU3ViIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuZXhwb3J0IGNvbnN0IFRPR0dMRSA9ICdUT0dHTEUnO1xuZXhwb3J0IGNvbnN0IE5FV19UT0RPID0gJ05FV19UT0RPJztcbmV4cG9ydCBjb25zdCBERUxFVEUgPSAnREVMRVRFJztcbmV4cG9ydCBjb25zdCBFRElUID0gJ0VESVQnO1xuZXhwb3J0IGNvbnN0IEVESVRfVE9ETyA9ICdFRElUX1RPRE8nO1xuZXhwb3J0IGNvbnN0IENMRUFSX0NPTVBMRVRFRCA9ICdDTEVBUl9DT01QTEVURUQnO1xuXG5jb25zdCB0b2dnbGUgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBUT0dHTEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBERUxFVEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IG5ld1RvZG8gPSAobGFiZWwpID0+ICh7IHR5cGU6IE5FV19UT0RPLCBsYWJlbCB9KTtcbmNvbnN0IGVkaXQgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBFRElULCB0b2RvSW5kZXggfSk7XG5jb25zdCBlZGl0VG9EbyA9ICh7IGluZGV4LCBsYWJlbCB9KSA9PiAoeyB0eXBlOiBFRElUX1RPRE8sIGluZGV4LCBsYWJlbCB9KTtcbmNvbnN0IGNsZWFyQ29tcGxldGVkID0gKCkgPT4gKHsgdHlwZTogQ0xFQVJfQ09NUExFVEVEIH0pO1xuXG5leHBvcnQgY29uc3QgVG9EbyA9ICh7IGxhYmVsIH0pID0+ICh7IGxhYmVsLCBjb21wbGV0ZWQ6IGZhbHNlLCBlZGl0aW5nOiBmYWxzZSB9KTtcbmNvbnN0IHJlZHVjZXIgPSBmdW5jdGlvbiAodG9kb3MsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBUT0dHTEU6XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi50b2RvSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogIXRvZG8uY29tcGxldGVkXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVDpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgZWRpdGluZzogIXRvZG8uZWRpdGluZ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICBjYXNlIEVESVRfVE9ETzpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLmluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBsYWJlbDogYWN0aW9uLmxhYmVsLFxuICAgICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBORVdfVE9ETzpcbiAgICAgIHJldHVybiBbIC4uLnRvZG9zLCBUb0RvKHsgbGFiZWw6IGFjdGlvbi5sYWJlbCB9KSBdO1xuICAgIGNhc2UgREVMRVRFOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbywgaW5kZXgpID0+IGluZGV4ICE9PSBhY3Rpb24udG9kb0luZGV4KTtcbiAgICBjYXNlIENMRUFSX0NPTVBMRVRFRDpcbiAgICAgIHJldHVybiB0b2Rvcy5maWx0ZXIoKHRvZG8pID0+ICF0b2RvLmNvbXBsZXRlZCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0b2RvcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RvcmUoeyBpbml0aWFsVmFsdWUgfSkge1xuICBjb25zdCBbIHRvZG9zLCAsIERpc3BhdGNoIF0gPSB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxWYWx1ZSk7XG4gIGNvbnN0IHsgU3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcblxuICB1c2VQcm9kdWN0KHRvZG9zKTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IFRPR0dMRSB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IHRvZG9JbmRleCB9KSA9PiB0b2dnbGUodG9kb0luZGV4KSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IE5FV19UT0RPIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZDogbGFiZWwgfSkgPT4gbmV3VG9kbyhsYWJlbCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBERUxFVEUgfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkOiB0b2RvSW5kZXggfSkgPT4gZGVsZXRlVG9kbyh0b2RvSW5kZXgpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRURJVCB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IHRvZG9JbmRleCB9KSA9PiBlZGl0KHRvZG9JbmRleCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBFRElUX1RPRE8gfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkIH0pID0+IGVkaXRUb0RvKHBheWxvYWQpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgQ0xFQVJfQ09NUExFVEVEIH0+XG4gICAgICAgIDxEaXNwYXRjaCBhY3Rpb249eyBjbGVhckNvbXBsZXRlZCgpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iLCIvKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCBydW4sIEZyYWdtZW50LCB1c2VQdWJTdWIgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgQ2hlY2tGb3JFZGl0RmllbGQgZnJvbSAnLi9DaGVja0ZvckVkaXRGaWVsZCc7XG5pbXBvcnQgeyBQcm9ncmVzc0NoZWNrZXIsIEZpbHRlck9wdGlvbnNUYWJzLCBDb250YWluZXIsIEZvb3RlciB9IGZyb20gJy4vRE9NJztcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9GaWx0ZXInO1xuaW1wb3J0IFBlcnNpc3QgZnJvbSAnLi9QZXJzaXN0JztcblxuZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCB7IHB1Ymxpc2ggfSA9IHVzZVB1YlN1YigpO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPENvbnRhaW5lciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0gLz5cbiAgICAgIDxGb290ZXIgb25Vc2VyQWN0aW9uPXsgcHVibGlzaCB9Lz5cbiAgICAgIDxQZXJzaXN0LlByb3ZpZGVyIGV4cG9ydHM9J2luaXRpYWxWYWx1ZScgLz5cbiAgICAgIDxTdG9yZSBleHBvcnRzPSd0b2RvcycgJGluaXRpYWxWYWx1ZT5cbiAgICAgICAgPEZpbHRlciBleHBvcnRzPSdmaWx0ZXInPlxuICAgICAgICAgIDxSZW5kZXJlciAkdG9kb3MgJGZpbHRlciAvPlxuICAgICAgICAgIDxGaWx0ZXJPcHRpb25zVGFicyAkZmlsdGVyIC8+XG4gICAgICAgIDwvRmlsdGVyPlxuICAgICAgICA8Q2hlY2tGb3JFZGl0RmllbGQgJHRvZG9zIC8+XG4gICAgICAgIDxQcm9ncmVzc0NoZWNrZXIgJHRvZG9zIC8+XG4gICAgICAgIDxQZXJzaXN0LlN0b3JhZ2UgJHRvZG9zIC8+XG4gICAgICA8L1N0b3JlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuXG5ydW4oPEFwcCAvPik7XG4iXSwic291cmNlUm9vdCI6IiJ9