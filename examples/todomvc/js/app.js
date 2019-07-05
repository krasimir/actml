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

/***/ "./node_modules/actml/lib/ActElement.js":
/*!**********************************************!*\
  !*** ./node_modules/actml/lib/ActElement.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getFuncName(func) {
  if (func.name) return func.name;
  var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};

var createElement = function createElement(func, props, children) {
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
    run: function run() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.__running = true;
                _this.__processChildrenAutomatically = true;

                _context.next = 4;
                return func(_this.props);

              case 4:
                result = _context.sent;


                _this.__used += 1;
                _this.__running = false;
                return _context.abrupt('return', result);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
};

exports.default = createElement;

/***/ }),

/***/ "./node_modules/actml/lib/Processor.js":
/*!*********************************************!*\
  !*** ./node_modules/actml/lib/Processor.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProcessor;

var _isActMLElement = __webpack_require__(/*! ./utils/isActMLElement */ "./node_modules/actml/lib/utils/isActMLElement.js");

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _Tree = __webpack_require__(/*! ./Tree */ "./node_modules/actml/lib/Tree.js");

var _Tree2 = _interopRequireDefault(_Tree);

var _usePubSub = __webpack_require__(/*! ./hooks/usePubSub */ "./node_modules/actml/lib/hooks/usePubSub.js");

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = __webpack_require__(/*! ./hooks/useState */ "./node_modules/actml/lib/hooks/useState.js");

var _useState2 = _interopRequireDefault(_useState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-use-before-define */


// import initializeHooks from './hooks';

function createProcessor() {
  var _this = this;

  var tree = (0, _Tree2.default)();
  var currentNode = null;

  var processNode = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(node, stack) {
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
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
              }();

              // actual call of the ActML element
              _context2.next = 7;
              return node.element.run();

            case 7:
              result = _context2.sent;
              genResult = void 0, toGenValue = void 0;

              // handling a promise

              if (!(result && result.then)) {
                _context2.next = 15;
                break;
              }

              _context2.next = 12;
              return result;

            case 12:
              result = _context2.sent;
              _context2.next = 38;
              break;

            case 15:
              if (!(result && typeof result.next === 'function')) {
                _context2.next = 34;
                break;
              }

              genResult = result.next();

            case 17:
              if (genResult.done) {
                _context2.next = 25;
                break;
              }

              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 22;
                break;
              }

              _context2.next = 21;
              return processNode(node.addChildNode(genResult.value), stack);

            case 21:
              toGenValue = _context2.sent;

            case 22:
              genResult = result.next(toGenValue);
              _context2.next = 17;
              break;

            case 25:
              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 31;
                break;
              }

              _context2.next = 28;
              return processNode(node.addChildNode(genResult.value), stack);

            case 28:
              result = _context2.sent;
              _context2.next = 32;
              break;

            case 31:
              result = genResult.value;

            case 32:
              _context2.next = 38;
              break;

            case 34:
              if (!(0, _isActMLElement2.default)(result)) {
                _context2.next = 38;
                break;
              }

              _context2.next = 37;
              return processNode(node.addChildNode(result), stack);

            case 37:
              result = _context2.sent;

            case 38:
              if (!node.element.shouldProcessChildrenAutomatically()) {
                _context2.next = 41;
                break;
              }

              _context2.next = 41;
              return node.callChildren();

            case 41:

              node.out();
              currentNode = null;

              return _context2.abrupt('return', result);

            case 44:
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
};

/***/ }),

/***/ "./node_modules/actml/lib/Tree.js":
/*!****************************************!*\
  !*** ./node_modules/actml/lib/Tree.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;

var _fastDeepEqual = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tree() {
  var onNodeEnter = [];
  var onNodeOut = [];
  var _onNodeRemove = [];
  var root = createNewNode();
  var ids = 0;

  function getId() {
    return 'a' + ++ids;
  };
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
        var _this2 = this;

        // If there're more nodes in the tree than what was processed
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

        var childNode = this.children[this.cursor];

        // using the same node
        if (childNode && treeDiff(childNode.element, newElement)) {
          this.cursor += 1;
          return useSameNode(childNode, newElement);
        }

        // creating a new node
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
        var ind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        // console.log(node.element.name, node.children.length);
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
} /* eslint-disable no-use-before-define, no-return-assign, max-len */
;

/***/ }),

/***/ "./node_modules/actml/lib/hooks/useChildren.js":
/*!*****************************************************!*\
  !*** ./node_modules/actml/lib/hooks/useChildren.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "./node_modules/actml/lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/***/ "./node_modules/actml/lib/hooks/useElement.js":
/*!****************************************************!*\
  !*** ./node_modules/actml/lib/hooks/useElement.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "./node_modules/actml/lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUseElementHook = function createUseElementHook(processor) {
  return function () {
    (0, _isValidHookContext2.default)(processor);

    return processor.node().element;
  };
};

exports.default = createUseElementHook;

/***/ }),

/***/ "./node_modules/actml/lib/hooks/useProduct.js":
/*!****************************************************!*\
  !*** ./node_modules/actml/lib/hooks/useProduct.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "./node_modules/actml/lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint-disable no-return-assign */


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

var createUseProductHook = function createUseProductHook(processor, useState) {
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
            return { value: node.__product };
          }
          return null;
        };
      }
    });
  });

  return function () {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();

    return [function (initialValue) {
      var _useState = useState(initialValue),
          _useState2 = _slicedToArray(_useState, 2),
          product = _useState2[0],
          setProduct = _useState2[1];

      node.__product = product;
      return [setProduct];
    }];
  };
};

exports.default = createUseProductHook;

/***/ }),

/***/ "./node_modules/actml/lib/hooks/usePubSub.js":
/*!***************************************************!*\
  !*** ./node_modules/actml/lib/hooks/usePubSub.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUsePubSubHook;

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "./node_modules/actml/lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscribers = {};

var _subscribe = function _subscribe(element, type, callback) {
  if (!subscribers[type]) subscribers[type] = {};
  subscribers[type][element.id] = callback;
  return function () {
    delete subscribers[type][element.id];
  };
};
var _publish = function _publish(element, type, payload) {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(function (id) {
    subscribers[type][id](payload, element);
  });
};

function createUsePubSubHook(processor) {
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

    return {
      subscribe: function subscribe() {
        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        return _subscribe.apply(undefined, [scopedElement || node.element].concat(params));
      },
      publish: function publish() {
        for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          params[_key2] = arguments[_key2];
        }

        return _publish.apply(undefined, [scopedElement || node.element].concat(params));
      },
      subscribers: subscribers
    };
  };
}

createUsePubSubHook.clear = function () {
  subscribers = {};
};

/***/ }),

/***/ "./node_modules/actml/lib/hooks/useReducer.js":
/*!****************************************************!*\
  !*** ./node_modules/actml/lib/hooks/useReducer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = createUseReducerHook;
function createUseReducerHook(useState) {
  return function (reducer, initialState) {
    var _useState = useState(initialState),
        _useState2 = _slicedToArray(_useState, 2),
        data = _useState2[0],
        setData = _useState2[1];

    return [data, function (action) {
      return setData(reducer(data, action));
    }];
  };
}

/***/ }),

/***/ "./node_modules/actml/lib/hooks/useState.js":
/*!**************************************************!*\
  !*** ./node_modules/actml/lib/hooks/useState.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseStateHook;

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "./node_modules/actml/lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { states: [], consumer: 0 };
  },
  cleanUp: function cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
}; /* eslint-disable no-return-assign */
function createUseStateHook(processor) {
  processor.onNodeRemove(function (node) {
    return Storage.cleanUp(node.element.id);
  });
  return function (initialState) {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();
    var element = node.element;

    var storage = Storage.get(element);

    var index = void 0;

    // first run
    if (element.used() === 0) {
      storage.states.push(initialState);
      index = storage.states.length - 1;

      // other runs
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
    }];
  };
}

createUseStateHook.clear = function () {
  Storage.elements = {};
};

/***/ }),

/***/ "./node_modules/actml/lib/hooks/utils/isValidHookContext.js":
/*!******************************************************************!*\
  !*** ./node_modules/actml/lib/hooks/utils/isValidHookContext.js ***!
  \******************************************************************/
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
};

/***/ }),

/***/ "./node_modules/actml/lib/index.js":
/*!*****************************************!*\
  !*** ./node_modules/actml/lib/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUniverse = createUniverse;

var _Processor = __webpack_require__(/*! ./Processor */ "./node_modules/actml/lib/Processor.js");

var _Processor2 = _interopRequireDefault(_Processor);

var _isActMLElement = __webpack_require__(/*! ./utils/isActMLElement */ "./node_modules/actml/lib/utils/isActMLElement.js");

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _ActElement = __webpack_require__(/*! ./ActElement */ "./node_modules/actml/lib/ActElement.js");

var _ActElement2 = _interopRequireDefault(_ActElement);

var _useChildren = __webpack_require__(/*! ./hooks/useChildren */ "./node_modules/actml/lib/hooks/useChildren.js");

var _useChildren2 = _interopRequireDefault(_useChildren);

var _useElement = __webpack_require__(/*! ./hooks/useElement */ "./node_modules/actml/lib/hooks/useElement.js");

var _useElement2 = _interopRequireDefault(_useElement);

var _useProduct = __webpack_require__(/*! ./hooks/useProduct */ "./node_modules/actml/lib/hooks/useProduct.js");

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = __webpack_require__(/*! ./hooks/usePubSub */ "./node_modules/actml/lib/hooks/usePubSub.js");

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = __webpack_require__(/*! ./hooks/useState */ "./node_modules/actml/lib/hooks/useState.js");

var _useState2 = _interopRequireDefault(_useState);

var _useReducer = __webpack_require__(/*! ./hooks/useReducer */ "./node_modules/actml/lib/hooks/useReducer.js");

var _useReducer2 = _interopRequireDefault(_useReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var usePubSub = (0, _usePubSub2.default)(processor);
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

/***/ "./node_modules/actml/lib/utils/isActMLElement.js":
/*!********************************************************!*\
  !*** ./node_modules/actml/lib/utils/isActMLElement.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isActMLElement;
function isActMLElement(element) {
  return element && element.__actml === true;
};

/***/ }),

/***/ "./node_modules/fast-deep-equal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
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

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/*! exports provided: FillContainer, Container */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillContainer", function() { return FillContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);


var $ = function $(selector) {
  return document.querySelector(selector);
};

var list = $('.todo-list');
var header = $('.header');
var ENTER = 13;
function FillContainer(_ref) {
  var useChildren = _ref.useChildren;

  var _useChildren = useChildren(),
      _useChildren2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useChildren, 2),
      content = _useChildren2[1];

  list.innerHTML = content;
}
function Container(_ref2) {
  var useChildren = _ref2.useChildren;

  var _useChildren3 = useChildren(),
      _useChildren4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useChildren3, 1),
      children = _useChildren4[0];

  list.addEventListener('click', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);
    var type = e.target.getAttribute('data-action');
    children(type, todoIndex);
  });
  header.addEventListener('keyup', function (e) {
    if (e.keyCode === ENTER) {
      children(e.target.getAttribute('data-action'), e.target.value);
      e.target.value = '';
    }
  });
}

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
/* harmony import */ var actml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! actml */ "./node_modules/actml/lib/index.js");
/* harmony import */ var actml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(actml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable react/prop-types */

/** @jsx A */


function Listener(_ref) {
  var useElements = _ref.useElements;

  var _useElements = useElements(),
      Publish = _useElements.Publish;

  return Object(actml__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["Container"], null, function (type, todoIndex) {
    return Object(actml__WEBPACK_IMPORTED_MODULE_0__["A"])(Publish, {
      type: type,
      payload: todoIndex
    });
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
/* harmony import */ var actml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! actml */ "./node_modules/actml/lib/index.js");
/* harmony import */ var actml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(actml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable react/prop-types */

/** @jsx A */


function Renderer(_ref) {
  var todos = _ref.todos;
  return Object(actml__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["FillContainer"], null, todos.map(function (todo, i) {
    return "\n            <li class='".concat(todo.completed ? 'completed' : '', "'>\n              <div class=\"view\">\n                <input \n                  class=\"toggle\"\n                  type=\"checkbox\"\n                  data-index=\"").concat(i, "\"\n                  data-action=\"toggle\"\n                  ").concat(todo.completed ? 'checked' : '', ">\n                <label>").concat(todo.label, "</label>\n                <button\n                  class=\"destroy\"\n                  data-index=\"").concat(i, "\"\n                  data-action=\"delete\"></button>\n              </div>\n              <input class=\"edit\" value=\"Rule the web\">\n            </li>\n          ");
  }).join(''));
}
;

/***/ }),

/***/ "./src/Store.js":
/*!**********************!*\
  !*** ./src/Store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread2 */ "./node_modules/@babel/runtime/helpers/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var actml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! actml */ "./node_modules/actml/lib/index.js");
/* harmony import */ var actml__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(actml__WEBPACK_IMPORTED_MODULE_2__);



/* eslint-disable react/prop-types */

/** @jsx A */


var ToDo = function ToDo(_ref) {
  var label = _ref.label;
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
function Store() {
  var _useState = Object(actml__WEBPACK_IMPORTED_MODULE_2__["useState"])(initialValue),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      todos = _useState2[0],
      setTodos = _useState2[1];

  var _useProduct = Object(actml__WEBPACK_IMPORTED_MODULE_2__["useProduct"])(todos),
      _useProduct2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useProduct, 1),
      setProduct = _useProduct2[0];

  var _useElements = Object(actml__WEBPACK_IMPORTED_MODULE_2__["useElements"])(),
      Subscribe = _useElements.Subscribe;

  return Object(actml__WEBPACK_IMPORTED_MODULE_2__["A"])(actml__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, Object(actml__WEBPACK_IMPORTED_MODULE_2__["A"])(Subscribe, {
    type: "toggle"
  }, function (todoIndex) {
    var newState = todos.map(function (todo, index) {
      if (index === todoIndex) {
        return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_0___default()({}, todo, {
          completed: !todo.completed
        });
      }

      return todo;
    });
    setTodos(newState);
    setProduct(newState);
  }), Object(actml__WEBPACK_IMPORTED_MODULE_2__["A"])(Subscribe, {
    type: "new"
  }, function (label) {
    todos.push(ToDo({
      label: label
    }));
    setTodos(todos);
    setProduct(todos);
  }));
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
/* harmony import */ var actml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! actml */ "./node_modules/actml/lib/index.js");
/* harmony import */ var actml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(actml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.js");
/* harmony import */ var _Listener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Listener */ "./src/Listener.js");
/** @jsx A */





function App() {
  return Object(actml__WEBPACK_IMPORTED_MODULE_0__["A"])(actml__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(actml__WEBPACK_IMPORTED_MODULE_0__["A"])(_Listener__WEBPACK_IMPORTED_MODULE_3__["default"], null), Object(actml__WEBPACK_IMPORTED_MODULE_0__["A"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"], {
    exports: "todos"
  }, Object(actml__WEBPACK_IMPORTED_MODULE_0__["A"])(_Renderer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    $todos: true
  })));
}

;
Object(actml__WEBPACK_IMPORTED_MODULE_0__["run"])(Object(actml__WEBPACK_IMPORTED_MODULE_0__["A"])(App, null));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZDIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWN0bWwvbGliL0FjdEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FjdG1sL2xpYi9Qcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FjdG1sL2xpYi9UcmVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hY3RtbC9saWIvaG9va3MvdXNlQ2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hY3RtbC9saWIvaG9va3MvdXNlUHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWN0bWwvbGliL2hvb2tzL3VzZVB1YlN1Yi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWN0bWwvbGliL2hvb2tzL3VzZVJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FjdG1sL2xpYi9ob29rcy91c2VTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWN0bWwvbGliL2hvb2tzL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWN0bWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hY3RtbC9saWIvdXRpbHMvaXNBY3RNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIiQiLCJzZWxlY3RvciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxpc3QiLCJoZWFkZXIiLCJFTlRFUiIsIkZpbGxDb250YWluZXIiLCJ1c2VDaGlsZHJlbiIsImNvbnRlbnQiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJjaGlsZHJlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidG9kb0luZGV4IiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJ0eXBlIiwia2V5Q29kZSIsInZhbHVlIiwiTGlzdGVuZXIiLCJ1c2VFbGVtZW50cyIsIlB1Ymxpc2giLCJSZW5kZXJlciIsInRvZG9zIiwibWFwIiwidG9kbyIsImkiLCJjb21wbGV0ZWQiLCJsYWJlbCIsImpvaW4iLCJUb0RvIiwiZWRpdGluZyIsImluaXRpYWxWYWx1ZSIsIlN0b3JlIiwidXNlU3RhdGUiLCJzZXRUb2RvcyIsInVzZVByb2R1Y3QiLCJzZXRQcm9kdWN0IiwiU3Vic2NyaWJlIiwibmV3U3RhdGUiLCJpbmRleCIsInB1c2giLCJBcHAiLCJydW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7O0FBRUEsaUM7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQzs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLCtCQUErQjtBQUM1RTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1Qzs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBOztB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Q0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtB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LENBQUNJLFFBQUQsQ0FBUjtBQUNBRixjQUFVLENBQUNFLFFBQUQsQ0FBVjtBQUNELEdBZkwsQ0FERixFQW1CRSxnREFBQyxTQUFEO0FBQVcsUUFBSSxFQUFDO0FBQWhCLEtBRUksVUFBQVgsS0FBSyxFQUFJO0FBQ1BMLFNBQUssQ0FBQ2tCLElBQU4sQ0FBV1gsSUFBSSxDQUFDO0FBQUVGLFdBQUssRUFBTEE7QUFBRixLQUFELENBQWY7QUFDQU8sWUFBUSxDQUFDWixLQUFELENBQVI7QUFDQWMsY0FBVSxDQUFDZCxLQUFELENBQVY7QUFDRCxHQU5MLENBbkJGLENBREY7QUErQkQsQzs7Ozs7Ozs7Ozs7O0FDL0NEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU21CLEdBQVQsR0FBZTtBQUNiLFNBQ0UsZ0RBQUMsOENBQUQsUUFDRSxnREFBQyxpREFBRCxPQURGLEVBRUUsZ0RBQUMsOENBQUQ7QUFBTyxXQUFPLEVBQUM7QUFBZixLQUNFLGdEQUFDLGlEQUFEO0FBQVUsVUFBTTtBQUFoQixJQURGLENBRkYsQ0FERjtBQVFEOztBQUFBO0FBRURDLGlEQUFHLENBQUMsZ0RBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpICUgMikge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDI7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSwgZnVuY3Rpb24gKGVycikgeyBzdGVwKFwidGhyb3dcIiwgZXJyKTsgfSk7IH0gfSByZXR1cm4gc3RlcChcIm5leHRcIik7IH0pOyB9OyB9XG5cbmZ1bmN0aW9uIGdldEZ1bmNOYW1lKGZ1bmMpIHtcbiAgaWYgKGZ1bmMubmFtZSkgcmV0dXJuIGZ1bmMubmFtZTtcbiAgdmFyIHJlc3VsdCA9IC9eZnVuY3Rpb25cXHMrKFtcXHdcXCRdKylcXHMqXFwoLy5leGVjKGZ1bmMudG9TdHJpbmcoKSk7XG5cbiAgcmV0dXJuIHJlc3VsdCA/IHJlc3VsdFsxXSA6ICd1bmtub3duJztcbn07XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmdW5jLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIF9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTogdHJ1ZSxcbiAgICBpZDogbnVsbCxcbiAgICBwcm9wczogcHJvcHMsXG4gICAgbmFtZTogZ2V0RnVuY05hbWUoZnVuYyksXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoaWQpIHtcbiAgICAgIHZhciB1c2VkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICB0aGlzLl9fdXNlZCA9IHVzZWQ7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB0cnVlO1xuICAgIH0sXG4gICAgbWVyZ2VQcm9wczogZnVuY3Rpb24gbWVyZ2VQcm9wcyhuZXdQcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICB9LFxuICAgIHVzZWQ6IGZ1bmN0aW9uIHVzZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3VzZWQ7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcnVubmluZztcbiAgICB9LFxuICAgIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHk6IGZ1bmN0aW9uIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5ID0gdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBydW46IGZ1bmN0aW9uIHJ1bigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfdGhpcy5fX3J1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF90aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyhfdGhpcy5wcm9wcyk7XG5cbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9jb250ZXh0LnNlbnQ7XG5cblxuICAgICAgICAgICAgICAgIF90aGlzLl9fdXNlZCArPSAxO1xuICAgICAgICAgICAgICAgIF90aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoJ3JldHVybicsIHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlLCBfdGhpcyk7XG4gICAgICB9KSkoKTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVFbGVtZW50OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVByb2Nlc3NvcjtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfVHJlZSA9IHJlcXVpcmUoJy4vVHJlZScpO1xuXG52YXIgX1RyZWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVHJlZSk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgZnVuY3Rpb24gc3RlcChrZXksIGFyZykgeyB0cnkgeyB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7IHZhciB2YWx1ZSA9IGluZm8udmFsdWU7IH0gY2F0Y2ggKGVycm9yKSB7IHJlamVjdChlcnJvcik7IHJldHVybjsgfSBpZiAoaW5mby5kb25lKSB7IHJlc29sdmUodmFsdWUpOyB9IGVsc2UgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgc3RlcChcInRocm93XCIsIGVycik7IH0pOyB9IH0gcmV0dXJuIHN0ZXAoXCJuZXh0XCIpOyB9KTsgfTsgfSAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuXG5cbi8vIGltcG9ydCBpbml0aWFsaXplSG9va3MgZnJvbSAnLi9ob29rcyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2Nlc3NvcigpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgdHJlZSA9ICgwLCBfVHJlZTIuZGVmYXVsdCkoKTtcbiAgdmFyIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICB2YXIgcHJvY2Vzc05vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKG5vZGUsIHN0YWNrKSB7XG4gICAgICB2YXIgcmVzdWx0LCBnZW5SZXN1bHQsIHRvR2VuVmFsdWU7XG4gICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgIHN0YWNrID0gW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShzdGFjayksIFtub2RlLmVsZW1lbnRdKTtcbiAgICAgICAgICAgICAgbm9kZS5lbnRlcihzdGFjayk7XG4gICAgICAgICAgICAgIG5vZGUucmVydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUsIHN0YWNrKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgbm9kZS5jYWxsQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWYyID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuUmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICAgICAgX2NoaWxkcmVuJGksXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY1Jlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICBfYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IG5vZGUuZWxlbWVudC5jaGlsZHJlbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBjaGlsZHJlbi5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAoX2NoaWxkcmVuJGkgPSBjaGlsZHJlbltpXSkubWVyZ2VQcm9wcy5hcHBseShfY2hpbGRyZW4kaSwgX2FyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC50MCA9IGNoaWxkcmVuUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjaGlsZHJlbltpXSksIHN0YWNrKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDEgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQwLnB1c2guY2FsbChfY29udGV4dC50MCwgX2NvbnRleHQudDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGVvZiBjaGlsZHJlbltpXSA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbltpXS5hcHBseShjaGlsZHJlbiwgX2FyZ3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jUmVzdWx0ID0gX2NvbnRleHQuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDIgPSBjaGlsZHJlblJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDIyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZnVuY1Jlc3VsdCksIHN0YWNrKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQudDMgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnQyLnB1c2guY2FsbChfY29udGV4dC50MiwgX2NvbnRleHQudDMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuUmVzdWx0LnB1c2goZnVuY1Jlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KCdyZXR1cm4nLCBjaGlsZHJlblJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzE6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwgX2NhbGxlZSwgX3RoaXMpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgLy8gYWN0dWFsIGNhbGwgb2YgdGhlIEFjdE1MIGVsZW1lbnRcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA3O1xuICAgICAgICAgICAgICByZXR1cm4gbm9kZS5lbGVtZW50LnJ1bigpO1xuXG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IF9jb250ZXh0Mi5zZW50O1xuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSB2b2lkIDAsIHRvR2VuVmFsdWUgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgICAgLy8gaGFuZGxpbmcgYSBwcm9taXNlXG5cbiAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ICYmIHJlc3VsdC50aGVuKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDEyO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICByZXN1bHQgPSBfY29udGV4dDIuc2VudDtcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzODtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgIGlmICghKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0Lm5leHQgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IHJlc3VsdC5uZXh0KCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTc6XG4gICAgICAgICAgICAgIGlmIChnZW5SZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDIyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyMTtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSksIHN0YWNrKTtcblxuICAgICAgICAgICAgY2FzZSAyMTpcbiAgICAgICAgICAgICAgdG9HZW5WYWx1ZSA9IF9jb250ZXh0Mi5zZW50O1xuXG4gICAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSByZXN1bHQubmV4dCh0b0dlblZhbHVlKTtcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAxNztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMjU6XG4gICAgICAgICAgICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI4O1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSwgc3RhY2spO1xuXG4gICAgICAgICAgICBjYXNlIDI4OlxuICAgICAgICAgICAgICByZXN1bHQgPSBfY29udGV4dDIuc2VudDtcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzE6XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGdlblJlc3VsdC52YWx1ZTtcblxuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzODtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM3O1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUocmVzdWx0KSwgc3RhY2spO1xuXG4gICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICByZXN1bHQgPSBfY29udGV4dDIuc2VudDtcblxuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgaWYgKCFub2RlLmVsZW1lbnQuc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSgpKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA0MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gNDE7XG4gICAgICAgICAgICAgIHJldHVybiBub2RlLmNhbGxDaGlsZHJlbigpO1xuXG4gICAgICAgICAgICBjYXNlIDQxOlxuXG4gICAgICAgICAgICAgIG5vZGUub3V0KCk7XG4gICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdCgncmV0dXJuJywgcmVzdWx0KTtcblxuICAgICAgICAgICAgY2FzZSA0NDpcbiAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgX2NhbGxlZTIsIF90aGlzKTtcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gcHJvY2Vzc05vZGUoX3gsIF94Mikge1xuICAgICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBub2RlOiBmdW5jdGlvbiBub2RlKCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0sXG4gICAgcnVuOiBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgICAgdmFyIHJlc29sdmVkUm9vdE5vZGUgPSB0cmVlLnJlc29sdmVSb290KGVsZW1lbnQpO1xuXG4gICAgICByZXR1cm4gcHJvY2Vzc05vZGUocmVzb2x2ZWRSb290Tm9kZSwgW10pO1xuICAgIH0sXG4gICAgb25Ob2RlRW50ZXI6IGZ1bmN0aW9uIG9uTm9kZUVudGVyKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVFbnRlckNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZU91dDogZnVuY3Rpb24gb25Ob2RlT3V0KGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgdHJlZS5vbk5vZGVSZW1vdmUoY2FsbGJhY2spO1xuICAgIH0sXG4gICAgc3lzdGVtOiBmdW5jdGlvbiBzeXN0ZW0oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmVlOiB0cmVlLFxuICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgdHJlZS5yZXNldCgpO1xuICAgICAgICAgIF91c2VQdWJTdWIyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlU3RhdGUyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRyZWU7XG5cbnZhciBfZmFzdERlZXBFcXVhbCA9IHJlcXVpcmUoJ2Zhc3QtZGVlcC1lcXVhbCcpO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFzdERlZXBFcXVhbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIFRyZWUoKSB7XG4gIHZhciBvbk5vZGVFbnRlciA9IFtdO1xuICB2YXIgb25Ob2RlT3V0ID0gW107XG4gIHZhciBfb25Ob2RlUmVtb3ZlID0gW107XG4gIHZhciByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICB2YXIgaWRzID0gMDtcblxuICBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgICByZXR1cm4gJ2EnICsgKytpZHM7XG4gIH07XG4gIGZ1bmN0aW9uIHVzZVNhbWVOb2RlKG5vZGUsIG5ld0VsZW1lbnQpIHtcbiAgICBuZXdFbGVtZW50LmluaXRpYWxpemUobm9kZS5lbGVtZW50LmlkLCBub2RlLmVsZW1lbnQudXNlZCgpKTtcbiAgICBub2RlLmVsZW1lbnQgPSBuZXdFbGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIHRyZWVEaWZmKG9sZEVsZW1lbnQsIG5ld0VsZW1lbnQpIHtcbiAgICBpZiAob2xkRWxlbWVudCAmJiBvbGRFbGVtZW50Lm5hbWUgPT09IG5ld0VsZW1lbnQubmFtZSkge1xuICAgICAgcmV0dXJuICgwLCBfZmFzdERlZXBFcXVhbDIuZGVmYXVsdCkob2xkRWxlbWVudC5wcm9wcywgbmV3RWxlbWVudC5wcm9wcyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5pbml0aWFsaXplKGdldElkKCkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIHN0YWNrOiBbXSxcbiAgICAgIGN1cnNvcjogMCxcbiAgICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcihzdGFjaykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc3RhY2sgPSBzdGFjaztcbiAgICAgICAgb25Ob2RlRW50ZXIuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIC8vIElmIHRoZXJlJ3JlIG1vcmUgbm9kZXMgaW4gdGhlIHRyZWUgdGhhbiB3aGF0IHdhcyBwcm9jZXNzZWRcbiAgICAgICAgaWYgKHRoaXMuY3Vyc29yIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSh0aGlzLmN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSB0aGlzLmN1cnNvcikuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlZE5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGMocmVtb3ZlZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJzb3IgPSAwO1xuICAgICAgICB0aGlzLnN0YWNrID0gW107XG4gICAgICAgIG9uTm9kZU91dC5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMyKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYWRkQ2hpbGROb2RlOiBmdW5jdGlvbiBhZGRDaGlsZE5vZGUobmV3RWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl07XG5cbiAgICAgICAgLy8gdXNpbmcgdGhlIHNhbWUgbm9kZVxuICAgICAgICBpZiAoY2hpbGROb2RlICYmIHRyZWVEaWZmKGNoaWxkTm9kZS5lbGVtZW50LCBuZXdFbGVtZW50KSkge1xuICAgICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgICAgcmV0dXJuIHVzZVNhbWVOb2RlKGNoaWxkTm9kZSwgbmV3RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGluZyBhIG5ldyBub2RlXG4gICAgICAgIHZhciBuZXdDaGlsZE5vZGUgPSBjcmVhdGVOZXdOb2RlKG5ld0VsZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSkge1xuICAgICAgICAgIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgcmV0dXJuIGMoX3RoaXMzLmNoaWxkcmVuW190aGlzMy5jdXJzb3JdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSA9IG5ld0NoaWxkTm9kZTtcbiAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkTm9kZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlUm9vdDogZnVuY3Rpb24gcmVzb2x2ZVJvb3QoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHJvb3QgPSB0cmVlRGlmZihyb290LmVsZW1lbnQsIGVsZW1lbnQpID8gdXNlU2FtZU5vZGUocm9vdCwgZWxlbWVudCkgOiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQpO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgICAgIGlkcyA9IDA7XG4gICAgfSxcbiAgICBnZXROdW1PZkVsZW1lbnRzOiBmdW5jdGlvbiBnZXROdW1PZkVsZW1lbnRzKCkge1xuICAgICAgcmV0dXJuIGlkcztcbiAgICB9LFxuICAgIGRpYWdub3NlOiBmdW5jdGlvbiBkaWFnbm9zZSgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBsb29wT3Zlcihub2RlKSB7XG4gICAgICAgIHZhciBpbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobm9kZS5lbGVtZW50Lm5hbWUsIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmQ6IGluZCxcbiAgICAgICAgICBuYW1lOiBub2RlLmVsZW1lbnQubmFtZSxcbiAgICAgICAgICB1c2VkOiBub2RlLmVsZW1lbnQudXNlZCgpLFxuICAgICAgICAgIGlkOiBub2RlLmVsZW1lbnQuaWQsXG4gICAgICAgICAgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvb3BPdmVyKGNoaWxkLCBpbmQgKyAxKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgfShyb290KTtcbiAgICB9LFxuICAgIGFkZE5vZGVFbnRlckNhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlRW50ZXIucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBhZGROb2RlT3V0Q2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlT3V0LnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIF9vbk5vZGVSZW1vdmUucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9O1xufSAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgbm8tcmV0dXJuLWFzc2lnbiwgbWF4LWxlbiAqL1xuOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlQ2hpbGRyZW5Ib29rID0gZnVuY3Rpb24gY3JlYXRlVXNlQ2hpbGRyZW5Ib29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgbm9kZS5lbGVtZW50LnNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkoZmFsc2UpO1xuICAgIHJldHVybiBbbm9kZS5jYWxsQ2hpbGRyZW4sIG5vZGUuZWxlbWVudC5jaGlsZHJlbl07XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VDaGlsZHJlbkhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVVc2VFbGVtZW50SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRIb29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgcmV0dXJuIHByb2Nlc3Nvci5ub2RlKCkuZWxlbWVudDtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVsZW1lbnRIb29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cblxuXG52YXIgcmVzb2x2ZVByb2R1Y3QgPSBmdW5jdGlvbiByZXNvbHZlUHJvZHVjdChwcm9wLCBzdGFja0luZGV4LCBzdGFjaywgZXJyb3IpIHtcbiAgaWYgKHN0YWNrSW5kZXggPCAwKSB7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbiAgdmFyIHBhcmVudCA9IHN0YWNrW3N0YWNrSW5kZXhdO1xuICB2YXIgcHJvZHVjdCA9IHBhcmVudC5yZXF1ZXN0UHJvZHVjdCA/IHBhcmVudC5yZXF1ZXN0UHJvZHVjdChwcm9wKSA6IG51bGw7XG5cbiAgaWYgKHByb2R1Y3QgIT09IG51bGwpIHtcbiAgICByZXR1cm4gcHJvZHVjdC52YWx1ZTtcbiAgfVxuICByZXR1cm4gcmVzb2x2ZVByb2R1Y3QocHJvcCwgc3RhY2tJbmRleCAtIDEsIHN0YWNrLCBlcnJvcik7XG59O1xuXG52YXIgY3JlYXRlVXNlUHJvZHVjdEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VQcm9kdWN0SG9vayhwcm9jZXNzb3IsIHVzZVN0YXRlKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVFbnRlcihmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50LFxuICAgICAgICBzdGFjayA9IG5vZGUuc3RhY2s7XG4gICAgdmFyIHByb3BzID0gZWxlbWVudC5wcm9wcztcblxuICAgIHZhciBwcm9wTmFtZXMgPSBwcm9wcyA/IE9iamVjdC5rZXlzKHByb3BzKSA6IFtdO1xuXG4gICAgcHJvcE5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvcE5hbWUuY2hhckF0KDApID09PSAnJCcpIHtcbiAgICAgICAgdmFyIGtleXdvcmQgPSBwcm9wTmFtZS5zdWJzdHIoMSwgcHJvcE5hbWUubGVuZ3RoKTtcbiAgICAgICAgdmFyIHN0YWNrVG9TZWFyY2hJbiA9IG5vZGUuc3RhY2suc2xpY2UoMCwgbm9kZS5zdGFjay5sZW5ndGggLSAxKTtcbiAgICAgICAgdmFyIHByb2R1Y3RWYWx1ZSA9IHJlc29sdmVQcm9kdWN0KGtleXdvcmQsIHN0YWNrVG9TZWFyY2hJbi5sZW5ndGggLSAxLCBzdGFja1RvU2VhcmNoSW4sIG5ldyBFcnJvcignXCInICsga2V5d29yZCArICdcIiBwcm9wIHJlcXVlc3RlZCBieSBcIicgKyBlbGVtZW50Lm5hbWUgKyAnXCIgY2FuIG5vdCBiZSBmb3VuZC5cXG5cXG5TdGFjazpcXG4nICsgc3RhY2subWFwKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSBfcmVmLm5hbWU7XG4gICAgICAgICAgcmV0dXJuICcgIDwnICsgbmFtZSArICc+JztcbiAgICAgICAgfSkuam9pbignXFxuJykpKTtcblxuICAgICAgICBlbGVtZW50Lm1lcmdlUHJvcHMoX2RlZmluZVByb3BlcnR5KHt9LCBrZXl3b3JkLCBwcm9kdWN0VmFsdWUpKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09ICdleHBvcnRzJykge1xuICAgICAgICBlbGVtZW50LnJlcXVlc3RQcm9kdWN0ID0gZnVuY3Rpb24gKGtleXdvcmQpIHtcbiAgICAgICAgICBpZiAocHJvcHMgJiYgcHJvcHMuZXhwb3J0cyAmJiBwcm9wcy5leHBvcnRzID09PSBrZXl3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbm9kZS5fX3Byb2R1Y3QgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICByZXR1cm4gW2Z1bmN0aW9uIChpbml0aWFsVmFsdWUpIHtcbiAgICAgIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShpbml0aWFsVmFsdWUpLFxuICAgICAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDIpLFxuICAgICAgICAgIHByb2R1Y3QgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgICAgIHNldFByb2R1Y3QgPSBfdXNlU3RhdGUyWzFdO1xuXG4gICAgICBub2RlLl9fcHJvZHVjdCA9IHByb2R1Y3Q7XG4gICAgICByZXR1cm4gW3NldFByb2R1Y3RdO1xuICAgIH1dO1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHJvZHVjdEhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHViU3ViSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3Vic2NyaWJlcnMgPSB7fTtcblxudmFyIF9zdWJzY3JpYmUgPSBmdW5jdGlvbiBfc3Vic2NyaWJlKGVsZW1lbnQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHN1YnNjcmliZXJzW3R5cGVdID0ge307XG4gIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdID0gY2FsbGJhY2s7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdO1xuICB9O1xufTtcbnZhciBfcHVibGlzaCA9IGZ1bmN0aW9uIF9wdWJsaXNoKGVsZW1lbnQsIHR5cGUsIHBheWxvYWQpIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgcmV0dXJuO1xuICBPYmplY3Qua2V5cyhzdWJzY3JpYmVyc1t0eXBlXSkuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICBzdWJzY3JpYmVyc1t0eXBlXVtpZF0ocGF5bG9hZCwgZWxlbWVudCk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVXNlUHViU3ViSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBpZiAoc3Vic2NyaWJlcnNbdHlwZV1bbm9kZS5lbGVtZW50LmlkXSkge1xuICAgICAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bbm9kZS5lbGVtZW50LmlkXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoc2NvcGVkRWxlbWVudCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKCkge1xuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgcGFyYW1zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9zdWJzY3JpYmUuYXBwbHkodW5kZWZpbmVkLCBbc2NvcGVkRWxlbWVudCB8fCBub2RlLmVsZW1lbnRdLmNvbmNhdChwYXJhbXMpKTtcbiAgICAgIH0sXG4gICAgICBwdWJsaXNoOiBmdW5jdGlvbiBwdWJsaXNoKCkge1xuICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgcGFyYW1zW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX3B1Ymxpc2guYXBwbHkodW5kZWZpbmVkLCBbc2NvcGVkRWxlbWVudCB8fCBub2RlLmVsZW1lbnRdLmNvbmNhdChwYXJhbXMpKTtcbiAgICAgIH0sXG4gICAgICBzdWJzY3JpYmVyczogc3Vic2NyaWJlcnNcbiAgICB9O1xuICB9O1xufVxuXG5jcmVhdGVVc2VQdWJTdWJIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBzdWJzY3JpYmVycyA9IHt9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VSZWR1Y2VySG9vaztcbmZ1bmN0aW9uIGNyZWF0ZVVzZVJlZHVjZXJIb29rKHVzZVN0YXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgaW5pdGlhbFN0YXRlKSB7XG4gICAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGluaXRpYWxTdGF0ZSksXG4gICAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDIpLFxuICAgICAgICBkYXRhID0gX3VzZVN0YXRlMlswXSxcbiAgICAgICAgc2V0RGF0YSA9IF91c2VTdGF0ZTJbMV07XG5cbiAgICByZXR1cm4gW2RhdGEsIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgIHJldHVybiBzZXREYXRhKHJlZHVjZXIoZGF0YSwgYWN0aW9uKSk7XG4gICAgfV07XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlU3RhdGVIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTdG9yYWdlID0ge1xuICBlbGVtZW50czoge30sXG4gIGdldDogZnVuY3Rpb24gZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0geyBzdGF0ZXM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9LFxuICBjbGVhblVwOiBmdW5jdGlvbiBjbGVhblVwKGlkKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbaWRdKSB7XG4gICAgICBkZWxldGUgdGhpcy5lbGVtZW50c1tpZF07XG4gICAgfVxuICB9XG59OyAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5mdW5jdGlvbiBjcmVhdGVVc2VTdGF0ZUhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gU3RvcmFnZS5jbGVhblVwKG5vZGUuZWxlbWVudC5pZCk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKGluaXRpYWxTdGF0ZSkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIHZhciBpbmRleCA9IHZvaWQgMDtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXMucHVzaChpbml0aWFsU3RhdGUpO1xuICAgICAgaW5kZXggPSBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxO1xuXG4gICAgICAvLyBvdGhlciBydW5zXG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcbiAgICAgIHN0b3JhZ2UuY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdG9yYWdlLnN0YXRlc1tpbmRleF0sIGZ1bmN0aW9uIChuZXdTdGF0ZSkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdID0gbmV3U3RhdGU7XG4gICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgbm9kZS5yZXJ1bigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1dO1xuICB9O1xufVxuXG5jcmVhdGVVc2VTdGF0ZUhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNWYWxpZEhvb2tDb250ZXh0O1xuZnVuY3Rpb24gaXNWYWxpZEhvb2tDb250ZXh0KHByb2Nlc3Nvcikge1xuICBpZiAoIXByb2Nlc3Nvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHRlcnJpYmx5IHdyb25nIGhhcHBlbmVkLiBUaGUgaG9vayBmYWN0b3J5IGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRob3V0IGEgcHJvY2Vzc29yLicpO1xuICB9XG4gIGlmICghcHJvY2Vzc29yLm5vZGUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSG9va3MgbXVzdCBiZSBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgYW4gQWN0TUwgZWxlbWVudC4nKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNyZWF0ZVVuaXZlcnNlID0gY3JlYXRlVW5pdmVyc2U7XG5cbnZhciBfUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9Qcm9jZXNzb3InKTtcblxudmFyIF9Qcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvY2Vzc29yKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfQWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vQWN0RWxlbWVudCcpO1xuXG52YXIgX0FjdEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0RWxlbWVudCk7XG5cbnZhciBfdXNlQ2hpbGRyZW4gPSByZXF1aXJlKCcuL2hvb2tzL3VzZUNoaWxkcmVuJyk7XG5cbnZhciBfdXNlQ2hpbGRyZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlQ2hpbGRyZW4pO1xuXG52YXIgX3VzZUVsZW1lbnQgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVsZW1lbnQnKTtcblxudmFyIF91c2VFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVsZW1lbnQpO1xuXG52YXIgX3VzZVByb2R1Y3QgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVByb2R1Y3QnKTtcblxudmFyIF91c2VQcm9kdWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVByb2R1Y3QpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG52YXIgX3VzZVJlZHVjZXIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVJlZHVjZXInKTtcblxudmFyIF91c2VSZWR1Y2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVJlZHVjZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjcmVhdGVVbml2ZXJzZSgpIHtcbiAgdmFyIHByb2Nlc3NvciA9ICgwLCBfUHJvY2Vzc29yMi5kZWZhdWx0KSgpO1xuXG4gIGZ1bmN0aW9uIEEoZnVuYywgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfQWN0RWxlbWVudDIuZGVmYXVsdCkoZnVuYywgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfVxuICBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAnICsgZWxlbWVudC50b1N0cmluZygpICsgJyBwYXNzZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzb3IucnVuKGVsZW1lbnQpO1xuICB9XG4gIHZhciBGcmFnbWVudCA9IGZ1bmN0aW9uIEZyYWdtZW50KCkge307XG4gIHZhciB1c2VDaGlsZHJlbiA9ICgwLCBfdXNlQ2hpbGRyZW4yLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VFbGVtZW50ID0gKDAsIF91c2VFbGVtZW50Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlU3RhdGUgPSAoMCwgX3VzZVN0YXRlMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlUHJvZHVjdCA9ICgwLCBfdXNlUHJvZHVjdDIuZGVmYXVsdCkocHJvY2Vzc29yLCB1c2VTdGF0ZSk7XG4gIHZhciB1c2VQdWJTdWIgPSAoMCwgX3VzZVB1YlN1YjIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVJlZHVjZXIgPSAoMCwgX3VzZVJlZHVjZXIyLmRlZmF1bHQpKHVzZVN0YXRlKTtcblxuICByZXR1cm4ge1xuICAgIEE6IEEsXG4gICAgcnVuOiBydW4sXG4gICAgRnJhZ21lbnQ6IEZyYWdtZW50LFxuICAgIHByb2Nlc3NvcjogcHJvY2Vzc29yLFxuICAgIHVzZUNoaWxkcmVuOiB1c2VDaGlsZHJlbixcbiAgICB1c2VFbGVtZW50OiB1c2VFbGVtZW50LFxuICAgIHVzZVByb2R1Y3Q6IHVzZVByb2R1Y3QsXG4gICAgdXNlUHViU3ViOiB1c2VQdWJTdWIsXG4gICAgdXNlU3RhdGU6IHVzZVN0YXRlLFxuICAgIHVzZVJlZHVjZXI6IHVzZVJlZHVjZXJcbiAgfTtcbn1cblxudmFyIHVuaXZlcnNlID0gY3JlYXRlVW5pdmVyc2UoKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bml2ZXJzZTtcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZVVuaXZlcnNlID0gY3JlYXRlVW5pdmVyc2UoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQWN0TUxFbGVtZW50O1xuZnVuY3Rpb24gaXNBY3RNTEVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50Ll9fYWN0bWwgPT09IHRydWU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGtleUxpc3QgPSBPYmplY3Qua2V5cztcbnZhciBoYXNQcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09ICdvYmplY3QnICYmIHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFyckEgPSBpc0FycmF5KGEpXG4gICAgICAsIGFyckIgPSBpc0FycmF5KGIpXG4gICAgICAsIGlcbiAgICAgICwgbGVuZ3RoXG4gICAgICAsIGtleTtcblxuICAgIGlmIChhcnJBICYmIGFyckIpIHtcbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgICBpZiAoIWVxdWFsKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYXJyQSAhPSBhcnJCKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgZGF0ZUEgPSBhIGluc3RhbmNlb2YgRGF0ZVxuICAgICAgLCBkYXRlQiA9IGIgaW5zdGFuY2VvZiBEYXRlO1xuICAgIGlmIChkYXRlQSAhPSBkYXRlQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChkYXRlQSAmJiBkYXRlQikgcmV0dXJuIGEuZ2V0VGltZSgpID09IGIuZ2V0VGltZSgpO1xuXG4gICAgdmFyIHJlZ2V4cEEgPSBhIGluc3RhbmNlb2YgUmVnRXhwXG4gICAgICAsIHJlZ2V4cEIgPSBiIGluc3RhbmNlb2YgUmVnRXhwO1xuICAgIGlmIChyZWdleHBBICE9IHJlZ2V4cEIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAocmVnZXhwQSAmJiByZWdleHBCKSByZXR1cm4gYS50b1N0cmluZygpID09IGIudG9TdHJpbmcoKTtcblxuICAgIHZhciBrZXlzID0ga2V5TGlzdChhKTtcbiAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGggIT09IGtleUxpc3QoYikubGVuZ3RoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgaWYgKCFoYXNQcm9wLmNhbGwoYiwga2V5c1tpXSkpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gYSE9PWEgJiYgYiE9PWI7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCJjb25zdCAkID0gKHNlbGVjdG9yKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbmNvbnN0IGxpc3QgPSAkKCcudG9kby1saXN0Jyk7XG5jb25zdCBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5cbmNvbnN0IEVOVEVSID0gMTM7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKHsgdXNlQ2hpbGRyZW4gfSkge1xuICBjb25zdCBbICwgY29udGVudCBdID0gdXNlQ2hpbGRyZW4oKTtcblxuICBsaXN0LmlubmVySFRNTCA9IGNvbnRlbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHsgdXNlQ2hpbGRyZW4gfSkge1xuICBjb25zdCBbIGNoaWxkcmVuIF0gPSB1c2VDaGlsZHJlbigpO1xuXG4gIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgY29uc3QgdHlwZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nKTtcblxuICAgIGNoaWxkcmVuKHR5cGUsIHRvZG9JbmRleCk7XG4gIH0pO1xuICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICBjaGlsZHJlbihlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJyksIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgfVxuICB9KTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICdhY3RtbCc7XG5cbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4vRE9NJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGlzdGVuZXIoeyB1c2VFbGVtZW50cyB9KSB7XG4gIGNvbnN0IHsgUHVibGlzaCB9ID0gdXNlRWxlbWVudHMoKTtcblxuICByZXR1cm4gKFxuICAgIDxDb250YWluZXI+XG4gICAgICB7XG4gICAgICAgICh0eXBlLCB0b2RvSW5kZXgpID0+IDxQdWJsaXNoIHR5cGU9eyB0eXBlIH0gcGF5bG9hZD17IHRvZG9JbmRleCB9IC8+XG4gICAgICB9XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnYWN0bWwnO1xuXG5pbXBvcnQgeyBGaWxsQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlcih7IHRvZG9zIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8RmlsbENvbnRhaW5lcj5cbiAgICAgIHtcbiAgICAgICAgdG9kb3MubWFwKCh0b2RvLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxsaSBjbGFzcz0nJHsgdG9kby5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnIH0nPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYWN0aW9uPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgICR7IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfT5cbiAgICAgICAgICAgICAgICA8bGFiZWw+JHsgdG9kby5sYWJlbCB9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImRlc3Ryb3lcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWRpdFwiIHZhbHVlPVwiUnVsZSB0aGUgd2ViXCI+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgICB9XG4gICAgPC9GaWxsQ29udGFpbmVyPlxuICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIEZyYWdtZW50LCB1c2VTdGF0ZSwgdXNlUHJvZHVjdCwgdXNlRWxlbWVudHMgfSBmcm9tICdhY3RtbCc7XG5cbmNvbnN0IFRvRG8gPSAoeyBsYWJlbCB9KSA9PiAoeyBsYWJlbCwgY29tcGxldGVkOiBmYWxzZSwgZWRpdGluZzogZmFsc2UgfSk7XG5cbnZhciBpbml0aWFsVmFsdWUgPSBbXG4gIFRvRG8oeyBsYWJlbDogJ0ZpcnN0IHRhc2snIH0pLFxuICBUb0RvKHsgbGFiZWw6ICdTZWNvbmQgdGFzaycgfSlcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0b3JlKCkge1xuICBjb25zdCBbIHRvZG9zLCBzZXRUb2RvcyBdID0gdXNlU3RhdGUoaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgWyBzZXRQcm9kdWN0IF0gPSB1c2VQcm9kdWN0KHRvZG9zKTtcbiAgY29uc3QgeyBTdWJzY3JpYmUgfSA9IHVzZUVsZW1lbnRzKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9J3RvZ2dsZSc+XG4gICAgICAgIHtcbiAgICAgICAgICB0b2RvSW5kZXggPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdG9kb0luZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6ICF0b2RvLmNvbXBsZXRlZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0VG9kb3MobmV3U3RhdGUpO1xuICAgICAgICAgICAgc2V0UHJvZHVjdChuZXdTdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT0nbmV3Jz5cbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsID0+IHtcbiAgICAgICAgICAgIHRvZG9zLnB1c2goVG9Ebyh7IGxhYmVsIH0pKTtcbiAgICAgICAgICAgIHNldFRvZG9zKHRvZG9zKTtcbiAgICAgICAgICAgIHNldFByb2R1Y3QodG9kb3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIHJ1biwgRnJhZ21lbnQgfSBmcm9tICdhY3RtbCc7XG5cbmltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL0xpc3RlbmVyJztcblxuZnVuY3Rpb24gQXBwKCkge1xuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxMaXN0ZW5lciAvPlxuICAgICAgPFN0b3JlIGV4cG9ydHM9J3RvZG9zJz5cbiAgICAgICAgPFJlbmRlcmVyICR0b2RvcyAvPlxuICAgICAgPC9TdG9yZT5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxucnVuKDxBcHAgLz4pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==