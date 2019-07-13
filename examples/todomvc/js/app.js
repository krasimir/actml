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
    },
    consume: function consume() {
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

var _useEffect = __webpack_require__(/*! ./hooks/useEffect */ "../../lib/hooks/useEffect.js");

var _useEffect2 = _interopRequireDefault(_useEffect);

var _Queue = __webpack_require__(/*! ./Queue */ "../../lib/Queue.js");

var _Queue2 = _interopRequireDefault(_Queue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* eslint-disable no-use-before-define */


var CONSUME = 'CONSUME';
var PROCESS_RESULT = 'PROCESS_RESULT';
var RETURNED_ELEMENT = 'RETURNED_ELEMENT';
var HANDLE_CHILDREN = 'HANDLE_CHILDREN';
var CHILD = 'CHILD';

var isGenerator = function isGenerator(obj) {
  return obj && typeof obj['next'] === 'function';
};

var isPromise = function isPromise(obj) {
  return obj && typeof obj['then'] === 'function';
};

function createProcessor() {
  var tree = (0, _Tree2.default)();
  var currentNode = null;

  var processNode = function processNode(node) {
    currentNode = node;
    node.enter();

    node.rerun = function () {
      return processNode(node);
    };

    node.callChildren = function () {
      var _arguments = arguments;
      var children = node.element.children;

      if (children && children.length > 0) {
        var queueItemsToAdd = [];
        var _results = [];
        var childrenQueue = (0, _Queue2.default)('  ' + node.element.name + ':children');

        var _loop = function _loop(i) {
          if ((0, _isActMLElement2.default)(children[i])) {
            var _children$i;

            (_children$i = children[i]).mergeProps.apply(_children$i, _arguments);

            queueItemsToAdd.push(function () {
              return processNode(node.addChildNode(children[i]));
            });
          } else if (typeof children[i] === 'function') {
            var funcResult = children[i].apply(children, _arguments);

            if ((0, _isActMLElement2.default)(funcResult)) {
              queueItemsToAdd.push(function () {
                return processNode(node.addChildNode(funcResult));
              });
            } else {
              _results.push(funcResult);
            }
          } else {
            _results.push(children[i]);
          }
        };

        for (var i = 0; i < children.length; i++) {
          _loop(i);
        }

        queueItemsToAdd.reverse().forEach(function (func) {
          childrenQueue.prependItem(CHILD, func, function (r) {
            return _results.push(r);
          });
        });
        childrenQueue.process();
        return childrenQueue.onDone(function () {
          return _results;
        });
      }

      return null;
    };

    var results = {};
    var queue = (0, _Queue2.default)(' ' + node.element.name); // CONSUME

    queue.add(CONSUME, function () {
      return node.element.consume();
    }, function (result) {
      return results[CONSUME] = result;
    }); // PROCESS_RESULT

    queue.add(PROCESS_RESULT, function () {
      var consumption = results[CONSUME];

      if ((0, _isActMLElement2.default)(consumption)) {
        queue.prependItem(RETURNED_ELEMENT, function () {
          return processNode(node.addChildNode(consumption));
        }, function (result) {
          return results[RETURNED_ELEMENT] = result;
        });
      } else if (isGenerator(consumption)) {
        var generator = consumption;
        queue.prependItem(RETURNED_ELEMENT, function () {
          return new Promise(function (generatorDone) {
            var genResult = void 0;

            (function iterate(value) {
              genResult = generator.next(value);

              if (!genResult.done) {
                if ((0, _isActMLElement2.default)(genResult.value)) {
                  var res = processNode(node.addChildNode(genResult.value));

                  if (isPromise(res)) {
                    res.then(function (r) {
                      return iterate(r);
                    });
                  } else {
                    iterate(res);
                  }
                }
              } else {
                if ((0, _isActMLElement2.default)(genResult.value)) {
                  var _res = processNode(node.addChildNode(genResult.value));

                  if (isPromise(_res)) {
                    _res.then(function (r) {
                      return generatorDone(r);
                    });
                  } else {
                    generatorDone(_res);
                  }
                } else {
                  generatorDone(genResult.value);
                }
              }
            })();
          });
        }, function (result) {
          return results[RETURNED_ELEMENT] = result;
        });
      }

      ;
    }); // HANDLE_CHILDREN

    queue.add(HANDLE_CHILDREN, function () {
      return node.element.shouldProcessChildrenAutomatically() ? node.callChildren() : null;
    }); // Running the queue

    queue.process(); // Getting the result. It is either a promise if there is
    // something asynchronous or a value

    return queue.onDone(function () {
      node.out();
      return RETURNED_ELEMENT in results ? results[RETURNED_ELEMENT] : results[CONSUME];
    });
  };

  return {
    node: function node() {
      return currentNode;
    },
    run: function run(element) {
      var rootNode = tree.resolveRoot(element);
      return processNode(rootNode);
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
          currentNode = null;
          tree.reset();

          _usePubSub2.default.clear();

          _useState2.default.clear();

          _useEffect2.default.clear();
        }
      };
    }
  };
}

;

/***/ }),

/***/ "../../lib/Queue.js":
/*!********************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/Queue.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createQueue;

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
/* eslint-disable no-return-assign */


var LOGS = false;

var log = function log() {
  var _console;

  return LOGS ? (_console = console).log.apply(_console, arguments) : null;
};

var isPromise = function isPromise(obj) {
  return obj && typeof obj['then'] === 'function';
};

var createItem = function createItem(type, func) {
  var onDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return {
    type: type,
    func: func,
    onDone: onDone
  };
};

function createQueue(context) {
  var items = [];
  var async = false;
  var running = false;

  var release = function release() {};

  return {
    add: function add(type, func, onDone) {
      log(context + ':Q: [...' + type + '] (' + (items.length + 1) + ' total)');
      items.push(createItem(type, func, onDone));
    },
    prependItem: function prependItem(type, func, onDone) {
      log(context + ':Q: [' + type + '...] (' + (items.length + 1) + ' total)');
      items = [createItem(type, func, onDone)].concat(_toConsumableArray(items));
    },
    process: function process(lastResult) {
      var _this = this;

      running = true;

      if (items.length === 0) {
        log(context + ':Q:done');
        running = false;
        release();
        return;
      }

      var item = items.shift();
      log(context + ':Q: ' + item.type + '() (' + items.length + ' left)');
      var result = item.func(lastResult);

      if (isPromise(result)) {
        async = true;
        result.then(function (asyncResult) {
          item.onDone(asyncResult);

          _this.process(asyncResult);
        }).catch(function (error) {
          release(error);
        });
      } else {
        item.onDone(result);
        this.process(result);
      }
    },
    onDone: function onDone(getResult) {
      if (async) {
        return new Promise(function (done, reject) {
          release = function release(error) {
            if (error) {
              reject(error);
            } else {
              done(getResult());
            }
          };
        });
      }

      return getResult();
    },
    isRunning: function isRunning() {
      return running;
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
/* eslint-disable no-use-before-define, no-return-assign, max-len */

var LOGS = false;

var log = function log() {
  var _console;

  return LOGS ? (_console = console).log.apply(_console, arguments) : null;
};

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
      if (oldElement.props && newElement.props) {
        return oldElement.props.key === newElement.props.key;
      }

      return true;
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

        log('-> ' + this.element.name);
        this.element.enter();
        onNodeEnter.forEach(function (c) {
          return c(_this);
        });
      },
      out: function out() {
        var _this2 = this;

        log('<- ' + this.element.name);
        this.element.out(); // If there're more nodes in the tree than what was processed

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
        var ind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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

/***/ "../../lib/hooks/useEffect.js":
/*!******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useEffect.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fastDeepEqual = __webpack_require__(/*! fast-deep-equal */ "../../node_modules/fast-deep-equal/index.js");

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* eslint-disable no-return-assign */


var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }

    return this.elements[element.id] = {
      effects: [],
      consumer: 0
    };
  },
  cleanUp: function cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
};

var createEffect = function createEffect(callback, deps) {
  return {
    callback: callback,
    deps: deps
  };
};

var updateEffect = function updateEffect(effect, callback, deps) {
  effect.callback = callback;
  effect.oldDeps = effect.deps;
  effect.deps = deps;
  return effect;
};

function depsEqual(oldDeps, newDeps) {
  if (!oldDeps) return false;
  if (oldDeps.length !== newDeps.length) return false;
  return (0, _fastDeepEqual2.default)(oldDeps, newDeps);
}

function resolveEffect(node, effect) {
  var deps = effect.deps,
      oldDeps = effect.oldDeps,
      callback = effect.callback;

  if (typeof deps === 'undefined') {
    effect.cleanUp = callback();
  } else if (deps.length === 0) {
    if (node.element.used() === 1) {
      effect.cleanUp = callback();
    }
  } else {
    var areEqual = depsEqual(oldDeps, deps);

    if (!areEqual) {
      effect.cleanUp = callback();
    }
  }
}

var createUseEffectHook = function createUseEffectHook(processor) {
  processor.onNodeRemove(function (node) {
    var element = node.element;
    var storage = Storage.get(element);
    storage.effects.forEach(function (effect) {
      if (effect.cleanUp) effect.cleanUp();
    });
    Storage.cleanUp(node.element.id);
  });
  processor.onNodeOut(function (node) {
    var element = node.element;
    var storage = Storage.get(element);

    if (storage.effects.length > 0) {
      storage.effects.forEach(function (effect) {
        return resolveEffect(node, effect);
      });
    }
  });
  return function (callback, deps) {
    (0, _isValidHookContext2.default)(processor);
    var node = processor.node();
    var element = node.element;
    var storage = Storage.get(element); // first run

    if (element.used() === 0) {
      storage.effects.push(createEffect(callback, deps)); // other runs
    } else {
      var index = storage.consumer;
      storage.consumer = index < storage.effects.length - 1 ? storage.consumer + 1 : 0;
      updateEffect(storage.effects[index], callback, deps);
    }
  };
};

exports.default = createUseEffectHook;

createUseEffectHook.clear = function () {
  Storage.elements = {};
};

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
exports.createRuntime = createRuntime;

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

var _useEffect = __webpack_require__(/*! ./hooks/useEffect */ "../../lib/hooks/useEffect.js");

var _useEffect2 = _interopRequireDefault(_useEffect);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function createRuntime() {
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
  var useEffect = (0, _useEffect2.default)(processor);
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
    useReducer: useReducer,
    useEffect: useEffect
  };
}

var runtime = createRuntime();
module.exports = runtime;
module.exports.createRuntime = createRuntime();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUXVldWUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9UcmVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlQ2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVB1YlN1Yi5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvdXRpbHMvaXNBY3RNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL25vZGVfbW9kdWxlcy9mYXN0LWRlZXAtZXF1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2hlY2tGb3JFZGl0RmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9QZXJzaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZ2V0RnVuY05hbWUiLCJmdW5jIiwibmFtZSIsInJlc3VsdCIsImV4ZWMiLCJ0b1N0cmluZyIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wcyIsImNoaWxkcmVuIiwiRXJyb3IiLCJfX2FjdG1sIiwiX191c2VkIiwiX19ydW5uaW5nIiwiX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5IiwiaWQiLCJpbml0aWFsaXplIiwidXNlZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1lcmdlUHJvcHMiLCJuZXdQcm9wcyIsImFzc2lnbiIsImlzUnVubmluZyIsInNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkiLCJlbnRlciIsImNvbnN1bWUiLCJvdXQiLCJkZWZhdWx0IiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3VzZUVmZmVjdCIsIl91c2VFZmZlY3QyIiwiX1F1ZXVlIiwiX1F1ZXVlMiIsIm9iaiIsIl9fZXNNb2R1bGUiLCJDT05TVU1FIiwiUFJPQ0VTU19SRVNVTFQiLCJSRVRVUk5FRF9FTEVNRU5UIiwiSEFORExFX0NISUxEUkVOIiwiQ0hJTEQiLCJpc0dlbmVyYXRvciIsImlzUHJvbWlzZSIsInRyZWUiLCJjdXJyZW50Tm9kZSIsInByb2Nlc3NOb2RlIiwibm9kZSIsInJlcnVuIiwiY2FsbENoaWxkcmVuIiwiX2FyZ3VtZW50cyIsImVsZW1lbnQiLCJxdWV1ZUl0ZW1zVG9BZGQiLCJfcmVzdWx0cyIsImNoaWxkcmVuUXVldWUiLCJfbG9vcCIsImkiLCJfY2hpbGRyZW4kaSIsImFwcGx5IiwicHVzaCIsImFkZENoaWxkTm9kZSIsImZ1bmNSZXN1bHQiLCJyZXZlcnNlIiwiZm9yRWFjaCIsInByZXBlbmRJdGVtIiwiciIsInByb2Nlc3MiLCJvbkRvbmUiLCJyZXN1bHRzIiwicXVldWUiLCJhZGQiLCJjb25zdW1wdGlvbiIsImdlbmVyYXRvciIsIlByb21pc2UiLCJnZW5lcmF0b3JEb25lIiwiZ2VuUmVzdWx0IiwiaXRlcmF0ZSIsIm5leHQiLCJkb25lIiwicmVzIiwidGhlbiIsIl9yZXMiLCJydW4iLCJyb290Tm9kZSIsInJlc29sdmVSb290Iiwib25Ob2RlRW50ZXIiLCJjYWxsYmFjayIsImFkZE5vZGVFbnRlckNhbGxiYWNrIiwib25Ob2RlT3V0IiwiYWRkTm9kZU91dENhbGxiYWNrIiwib25Ob2RlUmVtb3ZlIiwic3lzdGVtIiwicmVzZXQiLCJjbGVhciIsImNyZWF0ZVF1ZXVlIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiYXJyMiIsImZyb20iLCJMT0dTIiwibG9nIiwiX2NvbnNvbGUiLCJjb25zb2xlIiwiY3JlYXRlSXRlbSIsInR5cGUiLCJjb250ZXh0IiwiaXRlbXMiLCJhc3luYyIsInJ1bm5pbmciLCJyZWxlYXNlIiwiY29uY2F0IiwibGFzdFJlc3VsdCIsIl90aGlzIiwiaXRlbSIsInNoaWZ0IiwiYXN5bmNSZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZ2V0UmVzdWx0IiwicmVqZWN0IiwiVHJlZSIsIl9vbk5vZGVSZW1vdmUiLCJyb290IiwiY3JlYXRlTmV3Tm9kZSIsImlkcyIsImdldElkIiwidXNlU2FtZU5vZGUiLCJuZXdFbGVtZW50IiwidHJlZURpZmYiLCJvbGRFbGVtZW50Iiwia2V5IiwicGFyZW50IiwiY3Vyc29yIiwiYyIsIl90aGlzMiIsInNwbGljZSIsInJlbW92ZWROb2RlIiwiX3RoaXMzIiwiY2hpbGROb2RlIiwibmV3Q2hpbGROb2RlIiwiZ2V0TnVtT2ZFbGVtZW50cyIsImRpYWdub3NlIiwibG9vcE92ZXIiLCJpbmQiLCJtYXAiLCJjaGlsZCIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsImNyZWF0ZVVzZUNoaWxkcmVuSG9vayIsInByb2Nlc3NvciIsIl9mYXN0RGVlcEVxdWFsIiwiX2Zhc3REZWVwRXF1YWwyIiwiU3RvcmFnZSIsImVsZW1lbnRzIiwiZ2V0IiwiZWZmZWN0cyIsImNvbnN1bWVyIiwiY2xlYW5VcCIsImNyZWF0ZUVmZmVjdCIsImRlcHMiLCJ1cGRhdGVFZmZlY3QiLCJlZmZlY3QiLCJvbGREZXBzIiwiZGVwc0VxdWFsIiwibmV3RGVwcyIsInJlc29sdmVFZmZlY3QiLCJhcmVFcXVhbCIsImNyZWF0ZVVzZUVmZmVjdEhvb2siLCJzdG9yYWdlIiwiaW5kZXgiLCJjcmVhdGVVc2VFbGVtZW50SG9vayIsIl9kZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImJyaWRnZU1ldGhvZE5hbWUiLCJrZXl3b3JkIiwicmVzb2x2ZVByb2R1Y3QiLCJicmlkZ2VNZXRob2QiLCJnZXRFcnJvciIsInNvdXJjZSIsImZpbmQiLCJwcm9kdWN0IiwiZ2V0Tm90Rm91bmRFcnJvciIsImdldFN0YWNrIiwic3RhY2siLCJqb2luIiwiY3JlYXRlVXNlUHJvZHVjdEhvb2siLCJwcm9wTmFtZXMiLCJrZXlzIiwicHJvcE5hbWUiLCJjaGFyQXQiLCJzdWJzdHIiLCJwcm9kdWN0VmFsdWUiLCJfX3Byb2R1Y3QiLCJuZXdWYWx1ZSIsIl9zbGljZWRUb0FycmF5Iiwic2xpY2VJdGVyYXRvciIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJfaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3MiLCJlcnIiLCJUeXBlRXJyb3IiLCJjcmVhdGVVc2VQdWJTdWJIb29rIiwic3Vic2NyaWJlcnMiLCJjcmVhdGVTdWJzY3JpYmVFbGVtZW50Iiwic3Vic2NyaWJlIiwidXNlQ2hpbGRyZW4iLCJfcmVmIiwiX3VzZUNoaWxkcmVuIiwiX3VzZUNoaWxkcmVuMiIsInBheWxvYWQiLCJjcmVhdGVQdWJsaXNoRWxlbWVudCIsInB1Ymxpc2giLCJfcmVmMiIsInNjb3BlZEVsZW1lbnQiLCJlbCIsInN1YnNjcmliZUZ1bmMiLCJfbGVuIiwicGFyYW1zIiwiX2tleSIsInB1Ymxpc2hGdW5jIiwiU3Vic2NyaWJlIiwiUHVibGlzaCIsImNyZWF0ZVVzZVJlZHVjZXJIb29rIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwidGFyZ2V0IiwiaW5kZXhPZiIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImNyZWF0ZURpc3BhdGNoRWxlbWVudCIsImRpc3BhdGNoIiwiYWN0aW9uIiwicHJvcHNUb0FjdGlvbiIsInJlc3QiLCJ1c2VTdGF0ZSIsInJlZHVjZXIiLCJpbml0aWFsU3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwiZ2V0U3RhdGUiLCJjcmVhdGVVc2VTdGF0ZUhvb2siLCJzdGF0ZXMiLCJuZXdTdGF0ZSIsImlzVmFsaWRIb29rQ29udGV4dCIsImNyZWF0ZVJ1bnRpbWUiLCJfUHJvY2Vzc29yIiwiX1Byb2Nlc3NvcjIiLCJfQWN0RWxlbWVudCIsIl9BY3RFbGVtZW50MiIsIl91c2VFbGVtZW50IiwiX3VzZUVsZW1lbnQyIiwiX3VzZVByb2R1Y3QiLCJfdXNlUHJvZHVjdDIiLCJfdXNlUmVkdWNlciIsIl91c2VSZWR1Y2VyMiIsIkEiLCJGcmFnbWVudCIsInVzZUVsZW1lbnQiLCJ1c2VQcm9kdWN0IiwidXNlUHViU3ViIiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsInJ1bnRpbWUiLCJtb2R1bGUiLCJpc0FjdE1MRWxlbWVudCIsIkNoZWNrRm9yRWRpdEZpZWxkIiwidG9kb3MiLCJmaW5kSW5kZXgiLCJlZGl0aW5nIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGlzdCIsImhlYWRlciIsIkVOVEVSIiwiRVNDIiwiRmlsbENvbnRhaW5lciIsImNvbnRlbnQiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJvblVzZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiVE9HR0xFIiwiREVMRVRFIiwiRURJVCIsIkVESVRfVE9ETyIsImxhYmVsIiwia2V5Q29kZSIsIk5FV19UT0RPIiwiRm9jdXNGaWVsZCIsImZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJQcm9ncmVzc0NoZWNrZXIiLCJjb21wbGV0ZWQiLCJmaWx0ZXIiLCJpdGVtc0xlZnQiLCJGb290ZXIiLCJGSUxURVJfQUxMIiwiRklMVEVSX0FDVElWRSIsIkZJTFRFUl9DT01QTEVURUQiLCJDTEVBUl9DT01QTEVURUQiLCJGaWx0ZXJPcHRpb25zVGFicyIsInNldEF0dHJpYnV0ZSIsIkZpbHRlciIsInNldEZpbHRlciIsImluaXRpYWxWYWx1ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJUb0RvIiwiUHJvdmlkZXIiLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwiUmVuZGVyZXIiLCJ0b2RvIiwibGlDbGFzcyIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVkaXRUb0RvIiwiY2xlYXJDb21wbGV0ZWQiLCJTdG9yZSIsIkRpc3BhdGNoIiwiQXBwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUViQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7O0FBR0EsU0FBU0MsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDekIsTUFBSUEsSUFBSSxDQUFDQyxJQUFULEVBQWUsT0FBT0QsSUFBSSxDQUFDQyxJQUFaO0FBQ2YsTUFBSUMsTUFBTSxHQUFHLDZCQUE2QkMsSUFBN0IsQ0FBa0NILElBQUksQ0FBQ0ksUUFBTCxFQUFsQyxDQUFiO0FBRUEsU0FBT0YsTUFBTSxHQUFHQSxNQUFNLENBQUMsQ0FBRCxDQUFULEdBQWUsU0FBNUI7QUFDRDs7QUFBQTs7QUFFRCxJQUFJRyxhQUFhLEdBQUcsU0FBU0EsYUFBVCxDQUF1QkwsSUFBdkIsRUFBNkJNLEtBQTdCLEVBQW9DQyxRQUFwQyxFQUE4QztBQUNoRSxNQUFJLE9BQU9QLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDOUIsVUFBTSxJQUFJUSxLQUFKLENBQVUsd0NBQXdDUixJQUF4QyxHQUErQyxrQkFBekQsQ0FBTjtBQUNEOztBQUNELFNBQU87QUFDTFMsV0FBTyxFQUFFLElBREo7QUFFTEMsVUFBTSxFQUFFLENBRkg7QUFHTEMsYUFBUyxFQUFFLEtBSE47QUFJTEMsa0NBQThCLEVBQUUsSUFKM0I7QUFLTEMsTUFBRSxFQUFFLElBTEM7QUFNTFAsU0FBSyxFQUFFQSxLQU5GO0FBT0xMLFFBQUksRUFBRUYsV0FBVyxDQUFDQyxJQUFELENBUFo7QUFRTE8sWUFBUSxFQUFFQSxRQVJMO0FBU0xPLGNBQVUsRUFBRSxTQUFTQSxVQUFULENBQW9CRCxFQUFwQixFQUF3QjtBQUNsQyxVQUFJRSxJQUFJLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixDQUFuQixJQUF3QkQsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQkUsU0FBekMsR0FBcURGLFNBQVMsQ0FBQyxDQUFELENBQTlELEdBQW9FLENBQS9FO0FBRUEsV0FBS0gsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsV0FBS0gsTUFBTCxHQUFjSyxJQUFkO0FBQ0EsV0FBS0osU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtDLDhCQUFMLEdBQXNDLElBQXRDO0FBQ0QsS0FoQkk7QUFpQkxPLGNBQVUsRUFBRSxTQUFTQSxVQUFULENBQW9CQyxRQUFwQixFQUE4QjtBQUN4QyxXQUFLZCxLQUFMLEdBQWFYLE1BQU0sQ0FBQzBCLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtmLEtBQXZCLEVBQThCYyxRQUE5QixDQUFiO0FBQ0QsS0FuQkk7QUFvQkxMLFFBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLGFBQU8sS0FBS0wsTUFBWjtBQUNELEtBdEJJO0FBdUJMWSxhQUFTLEVBQUUsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixhQUFPLEtBQUtYLFNBQVo7QUFDRCxLQXpCSTtBQTBCTFksc0NBQWtDLEVBQUUsU0FBU0Esa0NBQVQsQ0FBNEN6QixLQUE1QyxFQUFtRDtBQUNyRixVQUFJLE9BQU9BLEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDaEMsZUFBTyxLQUFLYyw4QkFBWjtBQUNEOztBQUNELFdBQUtBLDhCQUFMLEdBQXNDZCxLQUF0QztBQUNBLGFBQU9BLEtBQVA7QUFDRCxLQWhDSTtBQWlDTDBCLFNBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCLFdBQUtiLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxXQUFLQyw4QkFBTCxHQUFzQyxJQUF0QztBQUNELEtBcENJO0FBcUNMYSxXQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixhQUFPekIsSUFBSSxDQUFDLEtBQUtNLEtBQU4sQ0FBWDtBQUNELEtBdkNJO0FBd0NMb0IsT0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtBQUNsQixXQUFLaEIsTUFBTCxJQUFlLENBQWY7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7QUEzQ0ksR0FBUDtBQTZDRCxDQWpERDs7QUFtREFkLE9BQU8sQ0FBQzhCLE9BQVIsR0FBa0J0QixhQUFsQixDOzs7Ozs7Ozs7Ozs7QUMvRGE7O0FBRWJWLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM4QixPQUFSLEdBQWtCQyxlQUFsQjs7QUFFQSxJQUFJQyxlQUFlLEdBQUdDLG1CQUFPLENBQUMsaUVBQUQsQ0FBN0I7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUdDLHNCQUFzQixDQUFDSCxlQUFELENBQTdDOztBQUVBLElBQUlJLEtBQUssR0FBR0gsbUJBQU8sQ0FBQyxpQ0FBRCxDQUFuQjs7QUFFQSxJQUFJSSxNQUFNLEdBQUdGLHNCQUFzQixDQUFDQyxLQUFELENBQW5DOztBQUVBLElBQUlFLFVBQVUsR0FBR0wsbUJBQU8sQ0FBQyx1REFBRCxDQUF4Qjs7QUFFQSxJQUFJTSxXQUFXLEdBQUdKLHNCQUFzQixDQUFDRyxVQUFELENBQXhDOztBQUVBLElBQUlFLFNBQVMsR0FBR1AsbUJBQU8sQ0FBQyxxREFBRCxDQUF2Qjs7QUFFQSxJQUFJUSxVQUFVLEdBQUdOLHNCQUFzQixDQUFDSyxTQUFELENBQXZDOztBQUVBLElBQUlFLFVBQVUsR0FBR1QsbUJBQU8sQ0FBQyx1REFBRCxDQUF4Qjs7QUFFQSxJQUFJVSxXQUFXLEdBQUdSLHNCQUFzQixDQUFDTyxVQUFELENBQXhDOztBQUVBLElBQUlFLE1BQU0sR0FBR1gsbUJBQU8sQ0FBQyxtQ0FBRCxDQUFwQjs7QUFFQSxJQUFJWSxPQUFPLEdBQUdWLHNCQUFzQixDQUFDUyxNQUFELENBQXBDOztBQUVBLFNBQVNULHNCQUFULENBQWdDVyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFaEIsV0FBTyxFQUFFZ0I7QUFBWCxHQUFyQztBQUF3RDtBQUUvRjs7O0FBQ0EsSUFBSUUsT0FBTyxHQUFHLFNBQWQ7QUFDQSxJQUFJQyxjQUFjLEdBQUcsZ0JBQXJCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsa0JBQXZCO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLGlCQUF0QjtBQUNBLElBQUlDLEtBQUssR0FBRyxPQUFaOztBQUVBLElBQUlDLFdBQVcsR0FBRyxTQUFTQSxXQUFULENBQXFCUCxHQUFyQixFQUEwQjtBQUMxQyxTQUFPQSxHQUFHLElBQUksT0FBT0EsR0FBRyxDQUFDLE1BQUQsQ0FBVixLQUF1QixVQUFyQztBQUNELENBRkQ7O0FBR0EsSUFBSVEsU0FBUyxHQUFHLFNBQVNBLFNBQVQsQ0FBbUJSLEdBQW5CLEVBQXdCO0FBQ3RDLFNBQU9BLEdBQUcsSUFBSSxPQUFPQSxHQUFHLENBQUMsTUFBRCxDQUFWLEtBQXVCLFVBQXJDO0FBQ0QsQ0FGRDs7QUFJQSxTQUFTZixlQUFULEdBQTJCO0FBQ3pCLE1BQUl3QixJQUFJLEdBQUcsQ0FBQyxHQUFHbEIsTUFBTSxDQUFDUCxPQUFYLEdBQVg7QUFDQSxNQUFJMEIsV0FBVyxHQUFHLElBQWxCOztBQUVBLE1BQUlDLFdBQVcsR0FBRyxTQUFTQSxXQUFULENBQXFCQyxJQUFyQixFQUEyQjtBQUMzQ0YsZUFBVyxHQUFHRSxJQUFkO0FBQ0FBLFFBQUksQ0FBQy9CLEtBQUw7O0FBQ0ErQixRQUFJLENBQUNDLEtBQUwsR0FBYSxZQUFZO0FBQ3ZCLGFBQU9GLFdBQVcsQ0FBQ0MsSUFBRCxDQUFsQjtBQUNELEtBRkQ7O0FBR0FBLFFBQUksQ0FBQ0UsWUFBTCxHQUFvQixZQUFZO0FBQzlCLFVBQUlDLFVBQVUsR0FBRzFDLFNBQWpCO0FBQ0EsVUFBSVQsUUFBUSxHQUFHZ0QsSUFBSSxDQUFDSSxPQUFMLENBQWFwRCxRQUE1Qjs7QUFHQSxVQUFJQSxRQUFRLElBQUlBLFFBQVEsQ0FBQ1UsTUFBVCxHQUFrQixDQUFsQyxFQUFxQztBQUNuQyxZQUFJMkMsZUFBZSxHQUFHLEVBQXRCO0FBQ0EsWUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxZQUFJQyxhQUFhLEdBQUcsQ0FBQyxHQUFHcEIsT0FBTyxDQUFDZixPQUFaLEVBQXFCLE9BQU80QixJQUFJLENBQUNJLE9BQUwsQ0FBYTFELElBQXBCLEdBQTJCLFdBQWhELENBQXBCOztBQUVBLFlBQUk4RCxLQUFLLEdBQUcsU0FBU0EsS0FBVCxDQUFlQyxDQUFmLEVBQWtCO0FBQzVCLGNBQUksQ0FBQyxHQUFHakMsZ0JBQWdCLENBQUNKLE9BQXJCLEVBQThCcEIsUUFBUSxDQUFDeUQsQ0FBRCxDQUF0QyxDQUFKLEVBQWdEO0FBQzlDLGdCQUFJQyxXQUFKOztBQUVBLGFBQUNBLFdBQVcsR0FBRzFELFFBQVEsQ0FBQ3lELENBQUQsQ0FBdkIsRUFBNEI3QyxVQUE1QixDQUF1QytDLEtBQXZDLENBQTZDRCxXQUE3QyxFQUEwRFAsVUFBMUQ7O0FBQ0FFLDJCQUFlLENBQUNPLElBQWhCLENBQXFCLFlBQVk7QUFDL0IscUJBQU9iLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDYSxZQUFMLENBQWtCN0QsUUFBUSxDQUFDeUQsQ0FBRCxDQUExQixDQUFELENBQWxCO0FBQ0QsYUFGRDtBQUdELFdBUEQsTUFPTyxJQUFJLE9BQU96RCxRQUFRLENBQUN5RCxDQUFELENBQWYsS0FBdUIsVUFBM0IsRUFBdUM7QUFDNUMsZ0JBQUlLLFVBQVUsR0FBRzlELFFBQVEsQ0FBQ3lELENBQUQsQ0FBUixDQUFZRSxLQUFaLENBQWtCM0QsUUFBbEIsRUFBNEJtRCxVQUE1QixDQUFqQjs7QUFFQSxnQkFBSSxDQUFDLEdBQUczQixnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEIwQyxVQUE5QixDQUFKLEVBQStDO0FBQzdDVCw2QkFBZSxDQUFDTyxJQUFoQixDQUFxQixZQUFZO0FBQy9CLHVCQUFPYixXQUFXLENBQUNDLElBQUksQ0FBQ2EsWUFBTCxDQUFrQkMsVUFBbEIsQ0FBRCxDQUFsQjtBQUNELGVBRkQ7QUFHRCxhQUpELE1BSU87QUFDTFIsc0JBQVEsQ0FBQ00sSUFBVCxDQUFjRSxVQUFkO0FBQ0Q7QUFDRixXQVZNLE1BVUE7QUFDTFIsb0JBQVEsQ0FBQ00sSUFBVCxDQUFjNUQsUUFBUSxDQUFDeUQsQ0FBRCxDQUF0QjtBQUNEO0FBQ0YsU0FyQkQ7O0FBdUJBLGFBQUssSUFBSUEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3pELFFBQVEsQ0FBQ1UsTUFBN0IsRUFBcUMrQyxDQUFDLEVBQXRDLEVBQTBDO0FBQ3hDRCxlQUFLLENBQUNDLENBQUQsQ0FBTDtBQUNEOztBQUNESix1QkFBZSxDQUFDVSxPQUFoQixHQUEwQkMsT0FBMUIsQ0FBa0MsVUFBVXZFLElBQVYsRUFBZ0I7QUFDaEQ4RCx1QkFBYSxDQUFDVSxXQUFkLENBQTBCdkIsS0FBMUIsRUFBaUNqRCxJQUFqQyxFQUF1QyxVQUFVeUUsQ0FBVixFQUFhO0FBQ2xELG1CQUFPWixRQUFRLENBQUNNLElBQVQsQ0FBY00sQ0FBZCxDQUFQO0FBQ0QsV0FGRDtBQUdELFNBSkQ7QUFLQVgscUJBQWEsQ0FBQ1ksT0FBZDtBQUNBLGVBQU9aLGFBQWEsQ0FBQ2EsTUFBZCxDQUFxQixZQUFZO0FBQ3RDLGlCQUFPZCxRQUFQO0FBQ0QsU0FGTSxDQUFQO0FBR0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0QsS0EvQ0Q7O0FBaURBLFFBQUllLE9BQU8sR0FBRyxFQUFkO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLENBQUMsR0FBR25DLE9BQU8sQ0FBQ2YsT0FBWixFQUFxQixNQUFNNEIsSUFBSSxDQUFDSSxPQUFMLENBQWExRCxJQUF4QyxDQUFaLENBeEQyQyxDQTBEM0M7O0FBQ0E0RSxTQUFLLENBQUNDLEdBQU4sQ0FBVWpDLE9BQVYsRUFBbUIsWUFBWTtBQUM3QixhQUFPVSxJQUFJLENBQUNJLE9BQUwsQ0FBYWxDLE9BQWIsRUFBUDtBQUNELEtBRkQsRUFFRyxVQUFVdkIsTUFBVixFQUFrQjtBQUNuQixhQUFPMEUsT0FBTyxDQUFDL0IsT0FBRCxDQUFQLEdBQW1CM0MsTUFBMUI7QUFDRCxLQUpELEVBM0QyQyxDQWlFM0M7O0FBQ0EyRSxTQUFLLENBQUNDLEdBQU4sQ0FBVWhDLGNBQVYsRUFBMEIsWUFBWTtBQUNwQyxVQUFJaUMsV0FBVyxHQUFHSCxPQUFPLENBQUMvQixPQUFELENBQXpCOztBQUVBLFVBQUksQ0FBQyxHQUFHZCxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJvRCxXQUE5QixDQUFKLEVBQWdEO0FBQzlDRixhQUFLLENBQUNMLFdBQU4sQ0FBa0J6QixnQkFBbEIsRUFBb0MsWUFBWTtBQUM5QyxpQkFBT08sV0FBVyxDQUFDQyxJQUFJLENBQUNhLFlBQUwsQ0FBa0JXLFdBQWxCLENBQUQsQ0FBbEI7QUFDRCxTQUZELEVBRUcsVUFBVTdFLE1BQVYsRUFBa0I7QUFDbkIsaUJBQU8wRSxPQUFPLENBQUM3QixnQkFBRCxDQUFQLEdBQTRCN0MsTUFBbkM7QUFDRCxTQUpEO0FBS0QsT0FORCxNQU1PLElBQUlnRCxXQUFXLENBQUM2QixXQUFELENBQWYsRUFBOEI7QUFDbkMsWUFBSUMsU0FBUyxHQUFHRCxXQUFoQjtBQUVBRixhQUFLLENBQUNMLFdBQU4sQ0FBa0J6QixnQkFBbEIsRUFBb0MsWUFBWTtBQUM5QyxpQkFBTyxJQUFJa0MsT0FBSixDQUFZLFVBQVVDLGFBQVYsRUFBeUI7QUFDMUMsZ0JBQUlDLFNBQVMsR0FBRyxLQUFLLENBQXJCOztBQUVBLGFBQUMsU0FBU0MsT0FBVCxDQUFpQnRGLEtBQWpCLEVBQXdCO0FBQ3ZCcUYsdUJBQVMsR0FBR0gsU0FBUyxDQUFDSyxJQUFWLENBQWV2RixLQUFmLENBQVo7O0FBQ0Esa0JBQUksQ0FBQ3FGLFNBQVMsQ0FBQ0csSUFBZixFQUFxQjtBQUNuQixvQkFBSSxDQUFDLEdBQUd2RCxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJ3RCxTQUFTLENBQUNyRixLQUF4QyxDQUFKLEVBQW9EO0FBQ2xELHNCQUFJeUYsR0FBRyxHQUFHakMsV0FBVyxDQUFDQyxJQUFJLENBQUNhLFlBQUwsQ0FBa0JlLFNBQVMsQ0FBQ3JGLEtBQTVCLENBQUQsQ0FBckI7O0FBRUEsc0JBQUlxRCxTQUFTLENBQUNvQyxHQUFELENBQWIsRUFBb0I7QUFDbEJBLHVCQUFHLENBQUNDLElBQUosQ0FBUyxVQUFVZixDQUFWLEVBQWE7QUFDcEIsNkJBQU9XLE9BQU8sQ0FBQ1gsQ0FBRCxDQUFkO0FBQ0QscUJBRkQ7QUFHRCxtQkFKRCxNQUlPO0FBQ0xXLDJCQUFPLENBQUNHLEdBQUQsQ0FBUDtBQUNEO0FBQ0Y7QUFDRixlQVpELE1BWU87QUFDTCxvQkFBSSxDQUFDLEdBQUd4RCxnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJ3RCxTQUFTLENBQUNyRixLQUF4QyxDQUFKLEVBQW9EO0FBQ2xELHNCQUFJMkYsSUFBSSxHQUFHbkMsV0FBVyxDQUFDQyxJQUFJLENBQUNhLFlBQUwsQ0FBa0JlLFNBQVMsQ0FBQ3JGLEtBQTVCLENBQUQsQ0FBdEI7O0FBRUEsc0JBQUlxRCxTQUFTLENBQUNzQyxJQUFELENBQWIsRUFBcUI7QUFDbkJBLHdCQUFJLENBQUNELElBQUwsQ0FBVSxVQUFVZixDQUFWLEVBQWE7QUFDckIsNkJBQU9TLGFBQWEsQ0FBQ1QsQ0FBRCxDQUFwQjtBQUNELHFCQUZEO0FBR0QsbUJBSkQsTUFJTztBQUNMUyxpQ0FBYSxDQUFDTyxJQUFELENBQWI7QUFDRDtBQUNGLGlCQVZELE1BVU87QUFDTFAsK0JBQWEsQ0FBQ0MsU0FBUyxDQUFDckYsS0FBWCxDQUFiO0FBQ0Q7QUFDRjtBQUNGLGFBN0JEO0FBOEJELFdBakNNLENBQVA7QUFrQ0QsU0FuQ0QsRUFtQ0csVUFBVUksTUFBVixFQUFrQjtBQUNuQixpQkFBTzBFLE9BQU8sQ0FBQzdCLGdCQUFELENBQVAsR0FBNEI3QyxNQUFuQztBQUNELFNBckNEO0FBc0NEOztBQUFBO0FBQ0YsS0FuREQsRUFsRTJDLENBdUgzQzs7QUFDQTJFLFNBQUssQ0FBQ0MsR0FBTixDQUFVOUIsZUFBVixFQUEyQixZQUFZO0FBQ3JDLGFBQU9PLElBQUksQ0FBQ0ksT0FBTCxDQUFhcEMsa0NBQWIsS0FBb0RnQyxJQUFJLENBQUNFLFlBQUwsRUFBcEQsR0FBMEUsSUFBakY7QUFDRCxLQUZELEVBeEgyQyxDQTRIM0M7O0FBQ0FvQixTQUFLLENBQUNILE9BQU4sR0E3SDJDLENBK0gzQztBQUNBOztBQUNBLFdBQU9HLEtBQUssQ0FBQ0YsTUFBTixDQUFhLFlBQVk7QUFDOUJwQixVQUFJLENBQUM3QixHQUFMO0FBQ0EsYUFBT3FCLGdCQUFnQixJQUFJNkIsT0FBcEIsR0FBOEJBLE9BQU8sQ0FBQzdCLGdCQUFELENBQXJDLEdBQTBENkIsT0FBTyxDQUFDL0IsT0FBRCxDQUF4RTtBQUNELEtBSE0sQ0FBUDtBQUlELEdBcklEOztBQXVJQSxTQUFPO0FBQ0xVLFFBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLGFBQU9GLFdBQVA7QUFDRCxLQUhJO0FBSUxxQyxPQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhL0IsT0FBYixFQUFzQjtBQUN6QixVQUFJZ0MsUUFBUSxHQUFHdkMsSUFBSSxDQUFDd0MsV0FBTCxDQUFpQmpDLE9BQWpCLENBQWY7QUFFQSxhQUFPTCxXQUFXLENBQUNxQyxRQUFELENBQWxCO0FBQ0QsS0FSSTtBQVNMRSxlQUFXLEVBQUUsU0FBU0EsV0FBVCxDQUFxQkMsUUFBckIsRUFBK0I7QUFDMUMxQyxVQUFJLENBQUMyQyxvQkFBTCxDQUEwQkQsUUFBMUI7QUFDRCxLQVhJO0FBWUxFLGFBQVMsRUFBRSxTQUFTQSxTQUFULENBQW1CRixRQUFuQixFQUE2QjtBQUN0QzFDLFVBQUksQ0FBQzZDLGtCQUFMLENBQXdCSCxRQUF4QjtBQUNELEtBZEk7QUFlTEksZ0JBQVksRUFBRSxTQUFTQSxZQUFULENBQXNCSixRQUF0QixFQUFnQztBQUM1QzFDLFVBQUksQ0FBQzhDLFlBQUwsQ0FBa0JKLFFBQWxCO0FBQ0QsS0FqQkk7QUFrQkxLLFVBQU0sRUFBRSxTQUFTQSxNQUFULEdBQWtCO0FBQ3hCLGFBQU87QUFDTC9DLFlBQUksRUFBRUEsSUFERDtBQUVMZ0QsYUFBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUI7QUFDdEIvQyxxQkFBVyxHQUFHLElBQWQ7QUFDQUQsY0FBSSxDQUFDZ0QsS0FBTDs7QUFDQWhFLHFCQUFXLENBQUNULE9BQVosQ0FBb0IwRSxLQUFwQjs7QUFDQS9ELG9CQUFVLENBQUNYLE9BQVgsQ0FBbUIwRSxLQUFuQjs7QUFDQTdELHFCQUFXLENBQUNiLE9BQVosQ0FBb0IwRSxLQUFwQjtBQUNEO0FBUkksT0FBUDtBQVVEO0FBN0JJLEdBQVA7QUErQkQ7O0FBQUEsQzs7Ozs7Ozs7Ozs7O0FDek5ZOztBQUViMUcsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDO0FBR0FELE9BQU8sQ0FBQzhCLE9BQVIsR0FBa0IyRSxXQUFsQjs7QUFFQSxTQUFTQyxrQkFBVCxDQUE0QkMsR0FBNUIsRUFBaUM7QUFBRSxNQUFJQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsR0FBZCxDQUFKLEVBQXdCO0FBQUUsU0FBSyxJQUFJeEMsQ0FBQyxHQUFHLENBQVIsRUFBVzJDLElBQUksR0FBR0YsS0FBSyxDQUFDRCxHQUFHLENBQUN2RixNQUFMLENBQTVCLEVBQTBDK0MsQ0FBQyxHQUFHd0MsR0FBRyxDQUFDdkYsTUFBbEQsRUFBMEQrQyxDQUFDLEVBQTNELEVBQStEO0FBQUUyQyxVQUFJLENBQUMzQyxDQUFELENBQUosR0FBVXdDLEdBQUcsQ0FBQ3hDLENBQUQsQ0FBYjtBQUFtQjs7QUFBQyxXQUFPMkMsSUFBUDtBQUFjLEdBQTdILE1BQW1JO0FBQUUsV0FBT0YsS0FBSyxDQUFDRyxJQUFOLENBQVdKLEdBQVgsQ0FBUDtBQUF5QjtBQUFFO0FBRW5NOzs7QUFDQSxJQUFJSyxJQUFJLEdBQUcsS0FBWDs7QUFDQSxJQUFJQyxHQUFHLEdBQUcsU0FBU0EsR0FBVCxHQUFlO0FBQ3ZCLE1BQUlDLFFBQUo7O0FBRUEsU0FBT0YsSUFBSSxHQUFHLENBQUNFLFFBQVEsR0FBR0MsT0FBWixFQUFxQkYsR0FBckIsQ0FBeUI1QyxLQUF6QixDQUErQjZDLFFBQS9CLEVBQXlDL0YsU0FBekMsQ0FBSCxHQUF5RCxJQUFwRTtBQUNELENBSkQ7O0FBS0EsSUFBSW1DLFNBQVMsR0FBRyxTQUFTQSxTQUFULENBQW1CUixHQUFuQixFQUF3QjtBQUN0QyxTQUFPQSxHQUFHLElBQUksT0FBT0EsR0FBRyxDQUFDLE1BQUQsQ0FBVixLQUF1QixVQUFyQztBQUNELENBRkQ7O0FBR0EsSUFBSXNFLFVBQVUsR0FBRyxTQUFTQSxVQUFULENBQW9CQyxJQUFwQixFQUEwQmxILElBQTFCLEVBQWdDO0FBQy9DLE1BQUkyRSxNQUFNLEdBQUczRCxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JELFNBQVMsQ0FBQyxDQUFELENBQVQsS0FBaUJFLFNBQXpDLEdBQXFERixTQUFTLENBQUMsQ0FBRCxDQUE5RCxHQUFvRSxZQUFZLENBQUUsQ0FBL0Y7QUFDQSxTQUFPO0FBQ0xrRyxRQUFJLEVBQUVBLElBREQ7QUFFTGxILFFBQUksRUFBRUEsSUFGRDtBQUdMMkUsVUFBTSxFQUFFQTtBQUhILEdBQVA7QUFLRCxDQVBEOztBQVNBLFNBQVMyQixXQUFULENBQXFCYSxPQUFyQixFQUE4QjtBQUM1QixNQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLE1BQUlDLEtBQUssR0FBRyxLQUFaO0FBQ0EsTUFBSUMsT0FBTyxHQUFHLEtBQWQ7O0FBQ0EsTUFBSUMsT0FBTyxHQUFHLFNBQVNBLE9BQVQsR0FBbUIsQ0FBRSxDQUFuQzs7QUFFQSxTQUFPO0FBQ0x6QyxPQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhb0MsSUFBYixFQUFtQmxILElBQW5CLEVBQXlCMkUsTUFBekIsRUFBaUM7QUFDcENtQyxTQUFHLENBQUNLLE9BQU8sR0FBRyxVQUFWLEdBQXVCRCxJQUF2QixHQUE4QixLQUE5QixJQUF1Q0UsS0FBSyxDQUFDbkcsTUFBTixHQUFlLENBQXRELElBQTJELFNBQTVELENBQUg7QUFDQW1HLFdBQUssQ0FBQ2pELElBQU4sQ0FBVzhDLFVBQVUsQ0FBQ0MsSUFBRCxFQUFPbEgsSUFBUCxFQUFhMkUsTUFBYixDQUFyQjtBQUNELEtBSkk7QUFLTEgsZUFBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUIwQyxJQUFyQixFQUEyQmxILElBQTNCLEVBQWlDMkUsTUFBakMsRUFBeUM7QUFDcERtQyxTQUFHLENBQUNLLE9BQU8sR0FBRyxPQUFWLEdBQW9CRCxJQUFwQixHQUEyQixRQUEzQixJQUF1Q0UsS0FBSyxDQUFDbkcsTUFBTixHQUFlLENBQXRELElBQTJELFNBQTVELENBQUg7QUFDQW1HLFdBQUssR0FBRyxDQUFDSCxVQUFVLENBQUNDLElBQUQsRUFBT2xILElBQVAsRUFBYTJFLE1BQWIsQ0FBWCxFQUFpQzZDLE1BQWpDLENBQXdDakIsa0JBQWtCLENBQUNhLEtBQUQsQ0FBMUQsQ0FBUjtBQUNELEtBUkk7QUFTTDFDLFdBQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCK0MsVUFBakIsRUFBNkI7QUFDcEMsVUFBSUMsS0FBSyxHQUFHLElBQVo7O0FBRUFKLGFBQU8sR0FBRyxJQUFWOztBQUNBLFVBQUlGLEtBQUssQ0FBQ25HLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEI2RixXQUFHLENBQUNLLE9BQU8sR0FBRyxTQUFYLENBQUg7QUFDQUcsZUFBTyxHQUFHLEtBQVY7QUFDQUMsZUFBTztBQUNQO0FBQ0Q7O0FBRUQsVUFBSUksSUFBSSxHQUFHUCxLQUFLLENBQUNRLEtBQU4sRUFBWDtBQUVBZCxTQUFHLENBQUNLLE9BQU8sR0FBRyxNQUFWLEdBQW1CUSxJQUFJLENBQUNULElBQXhCLEdBQStCLE1BQS9CLEdBQXdDRSxLQUFLLENBQUNuRyxNQUE5QyxHQUF1RCxRQUF4RCxDQUFIO0FBQ0EsVUFBSWYsTUFBTSxHQUFHeUgsSUFBSSxDQUFDM0gsSUFBTCxDQUFVeUgsVUFBVixDQUFiOztBQUVBLFVBQUl0RSxTQUFTLENBQUNqRCxNQUFELENBQWIsRUFBdUI7QUFDckJtSCxhQUFLLEdBQUcsSUFBUjtBQUNBbkgsY0FBTSxDQUFDc0YsSUFBUCxDQUFZLFVBQVVxQyxXQUFWLEVBQXVCO0FBQ2pDRixjQUFJLENBQUNoRCxNQUFMLENBQVlrRCxXQUFaOztBQUNBSCxlQUFLLENBQUNoRCxPQUFOLENBQWNtRCxXQUFkO0FBQ0QsU0FIRCxFQUdHQyxLQUhILENBR1MsVUFBVUMsS0FBVixFQUFpQjtBQUN4QlIsaUJBQU8sQ0FBQ1EsS0FBRCxDQUFQO0FBQ0QsU0FMRDtBQU1ELE9BUkQsTUFRTztBQUNMSixZQUFJLENBQUNoRCxNQUFMLENBQVl6RSxNQUFaO0FBQ0EsYUFBS3dFLE9BQUwsQ0FBYXhFLE1BQWI7QUFDRDtBQUNGLEtBckNJO0FBc0NMeUUsVUFBTSxFQUFFLFNBQVNBLE1BQVQsQ0FBZ0JxRCxTQUFoQixFQUEyQjtBQUNqQyxVQUFJWCxLQUFKLEVBQVc7QUFDVCxlQUFPLElBQUlwQyxPQUFKLENBQVksVUFBVUssSUFBVixFQUFnQjJDLE1BQWhCLEVBQXdCO0FBQ3pDVixpQkFBTyxHQUFHLFNBQVNBLE9BQVQsQ0FBaUJRLEtBQWpCLEVBQXdCO0FBQ2hDLGdCQUFJQSxLQUFKLEVBQVc7QUFDVEUsb0JBQU0sQ0FBQ0YsS0FBRCxDQUFOO0FBQ0QsYUFGRCxNQUVPO0FBQ0x6QyxrQkFBSSxDQUFDMEMsU0FBUyxFQUFWLENBQUo7QUFDRDtBQUNGLFdBTkQ7QUFPRCxTQVJNLENBQVA7QUFTRDs7QUFDRCxhQUFPQSxTQUFTLEVBQWhCO0FBQ0QsS0FuREk7QUFvREwxRyxhQUFTLEVBQUUsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixhQUFPZ0csT0FBUDtBQUNEO0FBdERJLEdBQVA7QUF3REQ7O0FBQUEsQzs7Ozs7Ozs7Ozs7O0FDMUZZOztBQUViM0gsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDO0FBR0FELE9BQU8sQ0FBQzhCLE9BQVIsR0FBa0J1RyxJQUFsQjtBQUNBOztBQUNBLElBQUlyQixJQUFJLEdBQUcsS0FBWDs7QUFDQSxJQUFJQyxHQUFHLEdBQUcsU0FBU0EsR0FBVCxHQUFlO0FBQ3ZCLE1BQUlDLFFBQUo7O0FBRUEsU0FBT0YsSUFBSSxHQUFHLENBQUNFLFFBQVEsR0FBR0MsT0FBWixFQUFxQkYsR0FBckIsQ0FBeUI1QyxLQUF6QixDQUErQjZDLFFBQS9CLEVBQXlDL0YsU0FBekMsQ0FBSCxHQUF5RCxJQUFwRTtBQUNELENBSkQ7O0FBTUEsU0FBU2tILElBQVQsR0FBZ0I7QUFDZCxNQUFJckMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsTUFBSUcsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsTUFBSW1DLGFBQWEsR0FBRyxFQUFwQjtBQUNBLE1BQUlDLElBQUksR0FBR0MsYUFBYSxFQUF4QjtBQUNBLE1BQUlDLEdBQUcsR0FBRyxDQUFWOztBQUVBLFdBQVNDLEtBQVQsR0FBaUI7QUFDZixXQUFPLE1BQU0sRUFBRUQsR0FBZjtBQUNEOztBQUFBOztBQUNELFdBQVNFLFdBQVQsQ0FBcUJqRixJQUFyQixFQUEyQmtGLFVBQTNCLEVBQXVDO0FBQ3JDQSxjQUFVLENBQUMzSCxVQUFYLENBQXNCeUMsSUFBSSxDQUFDSSxPQUFMLENBQWE5QyxFQUFuQyxFQUF1QzBDLElBQUksQ0FBQ0ksT0FBTCxDQUFhNUMsSUFBYixFQUF2QztBQUNBd0MsUUFBSSxDQUFDSSxPQUFMLEdBQWU4RSxVQUFmO0FBQ0EsV0FBT2xGLElBQVA7QUFDRDs7QUFDRCxXQUFTbUYsUUFBVCxDQUFrQkMsVUFBbEIsRUFBOEJGLFVBQTlCLEVBQTBDO0FBQ3hDLFFBQUlFLFVBQVUsSUFBSUEsVUFBVSxDQUFDMUksSUFBWCxLQUFvQndJLFVBQVUsQ0FBQ3hJLElBQWpELEVBQXVEO0FBQ3JELFVBQUkwSSxVQUFVLENBQUNySSxLQUFYLElBQW9CbUksVUFBVSxDQUFDbkksS0FBbkMsRUFBMEM7QUFDeEMsZUFBT3FJLFVBQVUsQ0FBQ3JJLEtBQVgsQ0FBaUJzSSxHQUFqQixLQUF5QkgsVUFBVSxDQUFDbkksS0FBWCxDQUFpQnNJLEdBQWpEO0FBQ0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7O0FBQ0QsV0FBTyxLQUFQO0FBQ0Q7O0FBQ0QsV0FBU1AsYUFBVCxDQUF1QjFFLE9BQXZCLEVBQWdDa0YsTUFBaEMsRUFBd0M7QUFDdEMsUUFBSWxGLE9BQUosRUFBYTtBQUNYQSxhQUFPLENBQUM3QyxVQUFSLENBQW1CeUgsS0FBSyxFQUF4QjtBQUNEOztBQUNELFdBQU87QUFDTDVFLGFBQU8sRUFBRUEsT0FESjtBQUVMcEQsY0FBUSxFQUFFLEVBRkw7QUFHTHNJLFlBQU0sRUFBRUEsTUFISDtBQUlMQyxZQUFNLEVBQUUsQ0FKSDtBQUtMdEgsV0FBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUI7QUFDdEIsWUFBSWtHLEtBQUssR0FBRyxJQUFaOztBQUVBWixXQUFHLENBQUMsUUFBUSxLQUFLbkQsT0FBTCxDQUFhMUQsSUFBdEIsQ0FBSDtBQUNBLGFBQUswRCxPQUFMLENBQWFuQyxLQUFiO0FBQ0FxRSxtQkFBVyxDQUFDdEIsT0FBWixDQUFvQixVQUFVd0UsQ0FBVixFQUFhO0FBQy9CLGlCQUFPQSxDQUFDLENBQUNyQixLQUFELENBQVI7QUFDRCxTQUZEO0FBR0QsT0FiSTtBQWNMaEcsU0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtBQUNsQixZQUFJc0gsTUFBTSxHQUFHLElBQWI7O0FBRUFsQyxXQUFHLENBQUMsUUFBUSxLQUFLbkQsT0FBTCxDQUFhMUQsSUFBdEIsQ0FBSDtBQUNBLGFBQUswRCxPQUFMLENBQWFqQyxHQUFiLEdBSmtCLENBS2xCOztBQUNBLFlBQUksS0FBS29ILE1BQUwsR0FBYyxLQUFLdkksUUFBTCxDQUFjVSxNQUFoQyxFQUF3QztBQUN0QyxlQUFLVixRQUFMLENBQWMwSSxNQUFkLENBQXFCLEtBQUtILE1BQTFCLEVBQWtDLEtBQUt2SSxRQUFMLENBQWNVLE1BQWQsR0FBdUIsS0FBSzZILE1BQTlELEVBQXNFdkUsT0FBdEUsQ0FBOEUsVUFBVTJFLFdBQVYsRUFBdUI7QUFDbkcsbUJBQU9mLGFBQWEsQ0FBQzVELE9BQWQsQ0FBc0IsVUFBVXdFLENBQVYsRUFBYTtBQUN4QyxxQkFBT0EsQ0FBQyxDQUFDRyxXQUFELENBQVI7QUFDRCxhQUZNLENBQVA7QUFHRCxXQUpEO0FBS0Q7O0FBQ0QsYUFBS0osTUFBTCxHQUFjLENBQWQ7QUFDQTlDLGlCQUFTLENBQUN6QixPQUFWLENBQWtCLFVBQVV3RSxDQUFWLEVBQWE7QUFDN0IsaUJBQU9BLENBQUMsQ0FBQ0MsTUFBRCxDQUFSO0FBQ0QsU0FGRDtBQUdELE9BL0JJO0FBZ0NMNUUsa0JBQVksRUFBRSxTQUFTQSxZQUFULENBQXNCcUUsVUFBdEIsRUFBa0M7QUFDOUMsWUFBSVUsTUFBTSxHQUFHLElBQWI7O0FBRUEsWUFBSUMsU0FBUyxHQUFHLEtBQUs3SSxRQUFMLENBQWMsS0FBS3VJLE1BQW5CLENBQWhCLENBSDhDLENBSzlDOztBQUNBLFlBQUlNLFNBQVMsSUFBSVYsUUFBUSxDQUFDVSxTQUFTLENBQUN6RixPQUFYLEVBQW9COEUsVUFBcEIsQ0FBekIsRUFBMEQ7QUFDeEQsZUFBS0ssTUFBTCxJQUFlLENBQWY7QUFDQSxpQkFBT04sV0FBVyxDQUFDWSxTQUFELEVBQVlYLFVBQVosQ0FBbEI7QUFDRCxTQVQ2QyxDQVc5Qzs7O0FBQ0EsWUFBSVksWUFBWSxHQUFHaEIsYUFBYSxDQUFDSSxVQUFELEVBQWEsSUFBYixDQUFoQzs7QUFFQSxZQUFJLEtBQUtsSSxRQUFMLENBQWMsS0FBS3VJLE1BQW5CLENBQUosRUFBZ0M7QUFDOUJYLHVCQUFhLENBQUM1RCxPQUFkLENBQXNCLFVBQVV3RSxDQUFWLEVBQWE7QUFDakMsbUJBQU9BLENBQUMsQ0FBQ0ksTUFBTSxDQUFDNUksUUFBUCxDQUFnQjRJLE1BQU0sQ0FBQ0wsTUFBdkIsQ0FBRCxDQUFSO0FBQ0QsV0FGRDtBQUdEOztBQUNELGFBQUt2SSxRQUFMLENBQWMsS0FBS3VJLE1BQW5CLElBQTZCTyxZQUE3QjtBQUNBLGFBQUtQLE1BQUwsSUFBZSxDQUFmO0FBQ0EsZUFBT08sWUFBUDtBQUNEO0FBdERJLEtBQVA7QUF3REQ7O0FBRUQsU0FBTztBQUNMekQsZUFBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJqQyxPQUFyQixFQUE4QjtBQUN6QyxhQUFPeUUsSUFBSSxHQUFHTSxRQUFRLENBQUNOLElBQUksQ0FBQ3pFLE9BQU4sRUFBZUEsT0FBZixDQUFSLEdBQWtDNkUsV0FBVyxDQUFDSixJQUFELEVBQU96RSxPQUFQLENBQTdDLEdBQStEMEUsYUFBYSxDQUFDMUUsT0FBRCxDQUExRjtBQUNELEtBSEk7QUFJTHlDLFNBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCZ0MsVUFBSSxHQUFHQyxhQUFhLEVBQXBCO0FBQ0FDLFNBQUcsR0FBRyxDQUFOO0FBQ0QsS0FQSTtBQVFMZ0Isb0JBQWdCLEVBQUUsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsYUFBT2hCLEdBQVA7QUFDRCxLQVZJO0FBV0xpQixZQUFRLEVBQUUsU0FBU0EsUUFBVCxHQUFvQjtBQUM1QixhQUFPLFNBQVNDLFFBQVQsQ0FBa0JqRyxJQUFsQixFQUF3QjtBQUM3QixZQUFJa0csR0FBRyxHQUFHekksU0FBUyxDQUFDQyxNQUFWLEdBQW1CLENBQW5CLElBQXdCRCxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCRSxTQUF6QyxHQUFxREYsU0FBUyxDQUFDLENBQUQsQ0FBOUQsR0FBb0UsQ0FBOUU7QUFFQSxlQUFPO0FBQ0x5SSxhQUFHLEVBQUVBLEdBREE7QUFFTHhKLGNBQUksRUFBRXNELElBQUksQ0FBQ0ksT0FBTCxDQUFhMUQsSUFGZDtBQUdMYyxjQUFJLEVBQUV3QyxJQUFJLENBQUNJLE9BQUwsQ0FBYTVDLElBQWIsRUFIRDtBQUlMRixZQUFFLEVBQUUwQyxJQUFJLENBQUNJLE9BQUwsQ0FBYTlDLEVBSlo7QUFLTE4sa0JBQVEsRUFBRWdELElBQUksQ0FBQ2hELFFBQUwsQ0FBY21KLEdBQWQsQ0FBa0IsVUFBVUMsS0FBVixFQUFpQjtBQUMzQyxtQkFBT0gsUUFBUSxDQUFDRyxLQUFELEVBQVFGLEdBQUcsR0FBRyxDQUFkLENBQWY7QUFDRCxXQUZTO0FBTEwsU0FBUDtBQVNELE9BWk0sQ0FZTHJCLElBWkssQ0FBUDtBQWFELEtBekJJO0FBMEJMckMsd0JBQW9CLEVBQUUsU0FBU0Esb0JBQVQsQ0FBOEJELFFBQTlCLEVBQXdDO0FBQzVERCxpQkFBVyxDQUFDMUIsSUFBWixDQUFpQjJCLFFBQWpCO0FBQ0QsS0E1Qkk7QUE2QkxHLHNCQUFrQixFQUFFLFNBQVNBLGtCQUFULENBQTRCSCxRQUE1QixFQUFzQztBQUN4REUsZUFBUyxDQUFDN0IsSUFBVixDQUFlMkIsUUFBZjtBQUNELEtBL0JJO0FBZ0NMSSxnQkFBWSxFQUFFLFNBQVNBLFlBQVQsQ0FBc0JKLFFBQXRCLEVBQWdDO0FBQzVDcUMsbUJBQWEsQ0FBQ2hFLElBQWQsQ0FBbUIyQixRQUFuQjtBQUNEO0FBbENJLEdBQVA7QUFvQ0Q7O0FBQUEsQzs7Ozs7Ozs7Ozs7O0FDeElZOztBQUVibkcsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUlBLElBQUk4SixtQkFBbUIsR0FBRzlILG1CQUFPLENBQUMsK0VBQUQsQ0FBakM7O0FBRUEsSUFBSStILG9CQUFvQixHQUFHN0gsc0JBQXNCLENBQUM0SCxtQkFBRCxDQUFqRDs7QUFFQSxTQUFTNUgsc0JBQVQsQ0FBZ0NXLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVoQixXQUFPLEVBQUVnQjtBQUFYLEdBQXJDO0FBQXdEOztBQUUvRixJQUFJbUgscUJBQXFCLEdBQUcsU0FBU0EscUJBQVQsQ0FBK0JDLFNBQS9CLEVBQTBDO0FBQ3BFLFNBQU8sWUFBWTtBQUNqQixLQUFDLEdBQUdGLG9CQUFvQixDQUFDbEksT0FBekIsRUFBa0NvSSxTQUFsQztBQUVBLFFBQUl4RyxJQUFJLEdBQUd3RyxTQUFTLENBQUN4RyxJQUFWLEVBQVg7QUFFQUEsUUFBSSxDQUFDSSxPQUFMLENBQWFwQyxrQ0FBYixDQUFnRCxLQUFoRDtBQUNBLFdBQU8sQ0FBQ2dDLElBQUksQ0FBQ0UsWUFBTixFQUFvQkYsSUFBSSxDQUFDSSxPQUFMLENBQWFwRCxRQUFqQyxDQUFQO0FBQ0QsR0FQRDtBQVFELENBVEQ7O0FBV0FWLE9BQU8sQ0FBQzhCLE9BQVIsR0FBa0JtSSxxQkFBbEIsQzs7Ozs7Ozs7Ozs7O0FDdkJhOztBQUVibkssTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUlBLElBQUlrSyxjQUFjLEdBQUdsSSxtQkFBTyxDQUFDLG9FQUFELENBQTVCOztBQUVBLElBQUltSSxlQUFlLEdBQUdqSSxzQkFBc0IsQ0FBQ2dJLGNBQUQsQ0FBNUM7O0FBRUEsSUFBSUosbUJBQW1CLEdBQUc5SCxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUkrSCxvQkFBb0IsR0FBRzdILHNCQUFzQixDQUFDNEgsbUJBQUQsQ0FBakQ7O0FBRUEsU0FBUzVILHNCQUFULENBQWdDVyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFaEIsV0FBTyxFQUFFZ0I7QUFBWCxHQUFyQztBQUF3RDtBQUUvRjs7O0FBQ0EsSUFBSXVILE9BQU8sR0FBRztBQUNaQyxVQUFRLEVBQUUsRUFERTtBQUVaQyxLQUFHLEVBQUUsU0FBU0EsR0FBVCxDQUFhekcsT0FBYixFQUFzQjtBQUN6QixRQUFJLEtBQUt3RyxRQUFMLENBQWN4RyxPQUFPLENBQUM5QyxFQUF0QixDQUFKLEVBQStCO0FBQzdCLGFBQU8sS0FBS3NKLFFBQUwsQ0FBY3hHLE9BQU8sQ0FBQzlDLEVBQXRCLENBQVA7QUFDRDs7QUFDRCxXQUFPLEtBQUtzSixRQUFMLENBQWN4RyxPQUFPLENBQUM5QyxFQUF0QixJQUE0QjtBQUFFd0osYUFBTyxFQUFFLEVBQVg7QUFBZUMsY0FBUSxFQUFFO0FBQXpCLEtBQW5DO0FBQ0QsR0FQVztBQVFaQyxTQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQjFKLEVBQWpCLEVBQXFCO0FBQzVCLFFBQUksS0FBS3NKLFFBQUwsQ0FBY3RKLEVBQWQsQ0FBSixFQUF1QjtBQUNyQixhQUFPLEtBQUtzSixRQUFMLENBQWN0SixFQUFkLENBQVA7QUFDRDtBQUNGO0FBWlcsQ0FBZDs7QUFlQSxJQUFJMkosWUFBWSxHQUFHLFNBQVNBLFlBQVQsQ0FBc0IxRSxRQUF0QixFQUFnQzJFLElBQWhDLEVBQXNDO0FBQ3ZELFNBQU87QUFDTDNFLFlBQVEsRUFBRUEsUUFETDtBQUVMMkUsUUFBSSxFQUFFQTtBQUZELEdBQVA7QUFJRCxDQUxEOztBQU1BLElBQUlDLFlBQVksR0FBRyxTQUFTQSxZQUFULENBQXNCQyxNQUF0QixFQUE4QjdFLFFBQTlCLEVBQXdDMkUsSUFBeEMsRUFBOEM7QUFDL0RFLFFBQU0sQ0FBQzdFLFFBQVAsR0FBa0JBLFFBQWxCO0FBQ0E2RSxRQUFNLENBQUNDLE9BQVAsR0FBaUJELE1BQU0sQ0FBQ0YsSUFBeEI7QUFDQUUsUUFBTSxDQUFDRixJQUFQLEdBQWNBLElBQWQ7QUFDQSxTQUFPRSxNQUFQO0FBQ0QsQ0FMRDs7QUFPQSxTQUFTRSxTQUFULENBQW1CRCxPQUFuQixFQUE0QkUsT0FBNUIsRUFBcUM7QUFDbkMsTUFBSSxDQUFDRixPQUFMLEVBQWMsT0FBTyxLQUFQO0FBQ2QsTUFBSUEsT0FBTyxDQUFDM0osTUFBUixLQUFtQjZKLE9BQU8sQ0FBQzdKLE1BQS9CLEVBQXVDLE9BQU8sS0FBUDtBQUN2QyxTQUFPLENBQUMsR0FBR2dKLGVBQWUsQ0FBQ3RJLE9BQXBCLEVBQTZCaUosT0FBN0IsRUFBc0NFLE9BQXRDLENBQVA7QUFDRDs7QUFDRCxTQUFTQyxhQUFULENBQXVCeEgsSUFBdkIsRUFBNkJvSCxNQUE3QixFQUFxQztBQUNuQyxNQUFJRixJQUFJLEdBQUdFLE1BQU0sQ0FBQ0YsSUFBbEI7QUFBQSxNQUNJRyxPQUFPLEdBQUdELE1BQU0sQ0FBQ0MsT0FEckI7QUFBQSxNQUVJOUUsUUFBUSxHQUFHNkUsTUFBTSxDQUFDN0UsUUFGdEI7O0FBS0EsTUFBSSxPQUFPMkUsSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUMvQkUsVUFBTSxDQUFDSixPQUFQLEdBQWlCekUsUUFBUSxFQUF6QjtBQUNELEdBRkQsTUFFTyxJQUFJMkUsSUFBSSxDQUFDeEosTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUM1QixRQUFJc0MsSUFBSSxDQUFDSSxPQUFMLENBQWE1QyxJQUFiLE9BQXdCLENBQTVCLEVBQStCO0FBQzdCNEosWUFBTSxDQUFDSixPQUFQLEdBQWlCekUsUUFBUSxFQUF6QjtBQUNEO0FBQ0YsR0FKTSxNQUlBO0FBQ0wsUUFBSWtGLFFBQVEsR0FBR0gsU0FBUyxDQUFDRCxPQUFELEVBQVVILElBQVYsQ0FBeEI7O0FBRUEsUUFBSSxDQUFDTyxRQUFMLEVBQWU7QUFDYkwsWUFBTSxDQUFDSixPQUFQLEdBQWlCekUsUUFBUSxFQUF6QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxJQUFJbUYsbUJBQW1CLEdBQUcsU0FBU0EsbUJBQVQsQ0FBNkJsQixTQUE3QixFQUF3QztBQUNoRUEsV0FBUyxDQUFDN0QsWUFBVixDQUF1QixVQUFVM0MsSUFBVixFQUFnQjtBQUNyQyxRQUFJSSxPQUFPLEdBQUdKLElBQUksQ0FBQ0ksT0FBbkI7QUFFQSxRQUFJdUgsT0FBTyxHQUFHaEIsT0FBTyxDQUFDRSxHQUFSLENBQVl6RyxPQUFaLENBQWQ7QUFFQXVILFdBQU8sQ0FBQ2IsT0FBUixDQUFnQjlGLE9BQWhCLENBQXdCLFVBQVVvRyxNQUFWLEVBQWtCO0FBQ3hDLFVBQUlBLE1BQU0sQ0FBQ0osT0FBWCxFQUFvQkksTUFBTSxDQUFDSixPQUFQO0FBQ3JCLEtBRkQ7QUFHQUwsV0FBTyxDQUFDSyxPQUFSLENBQWdCaEgsSUFBSSxDQUFDSSxPQUFMLENBQWE5QyxFQUE3QjtBQUNELEdBVEQ7QUFVQWtKLFdBQVMsQ0FBQy9ELFNBQVYsQ0FBb0IsVUFBVXpDLElBQVYsRUFBZ0I7QUFDbEMsUUFBSUksT0FBTyxHQUFHSixJQUFJLENBQUNJLE9BQW5CO0FBRUEsUUFBSXVILE9BQU8sR0FBR2hCLE9BQU8sQ0FBQ0UsR0FBUixDQUFZekcsT0FBWixDQUFkOztBQUVBLFFBQUl1SCxPQUFPLENBQUNiLE9BQVIsQ0FBZ0JwSixNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM5QmlLLGFBQU8sQ0FBQ2IsT0FBUixDQUFnQjlGLE9BQWhCLENBQXdCLFVBQVVvRyxNQUFWLEVBQWtCO0FBQ3hDLGVBQU9JLGFBQWEsQ0FBQ3hILElBQUQsRUFBT29ILE1BQVAsQ0FBcEI7QUFDRCxPQUZEO0FBR0Q7QUFDRixHQVZEO0FBV0EsU0FBTyxVQUFVN0UsUUFBVixFQUFvQjJFLElBQXBCLEVBQTBCO0FBQy9CLEtBQUMsR0FBR1osb0JBQW9CLENBQUNsSSxPQUF6QixFQUFrQ29JLFNBQWxDO0FBRUEsUUFBSXhHLElBQUksR0FBR3dHLFNBQVMsQ0FBQ3hHLElBQVYsRUFBWDtBQUNBLFFBQUlJLE9BQU8sR0FBR0osSUFBSSxDQUFDSSxPQUFuQjtBQUVBLFFBQUl1SCxPQUFPLEdBQUdoQixPQUFPLENBQUNFLEdBQVIsQ0FBWXpHLE9BQVosQ0FBZCxDQU4rQixDQVEvQjs7QUFDQSxRQUFJQSxPQUFPLENBQUM1QyxJQUFSLE9BQW1CLENBQXZCLEVBQTBCO0FBQ3hCbUssYUFBTyxDQUFDYixPQUFSLENBQWdCbEcsSUFBaEIsQ0FBcUJxRyxZQUFZLENBQUMxRSxRQUFELEVBQVcyRSxJQUFYLENBQWpDLEVBRHdCLENBR3hCO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsVUFBSVUsS0FBSyxHQUFHRCxPQUFPLENBQUNaLFFBQXBCO0FBRUFZLGFBQU8sQ0FBQ1osUUFBUixHQUFtQmEsS0FBSyxHQUFHRCxPQUFPLENBQUNiLE9BQVIsQ0FBZ0JwSixNQUFoQixHQUF5QixDQUFqQyxHQUFxQ2lLLE9BQU8sQ0FBQ1osUUFBUixHQUFtQixDQUF4RCxHQUE0RCxDQUEvRTtBQUNBSSxrQkFBWSxDQUFDUSxPQUFPLENBQUNiLE9BQVIsQ0FBZ0JjLEtBQWhCLENBQUQsRUFBeUJyRixRQUF6QixFQUFtQzJFLElBQW5DLENBQVo7QUFDRDtBQUNGLEdBbkJEO0FBb0JELENBMUNEOztBQTRDQTVLLE9BQU8sQ0FBQzhCLE9BQVIsR0FBa0JzSixtQkFBbEI7O0FBR0FBLG1CQUFtQixDQUFDNUUsS0FBcEIsR0FBNEIsWUFBWTtBQUN0QzZELFNBQU8sQ0FBQ0MsUUFBUixHQUFtQixFQUFuQjtBQUNELENBRkQsQzs7Ozs7Ozs7Ozs7O0FDdEhhOztBQUVieEssTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUlBLElBQUk4SixtQkFBbUIsR0FBRzlILG1CQUFPLENBQUMsK0VBQUQsQ0FBakM7O0FBRUEsSUFBSStILG9CQUFvQixHQUFHN0gsc0JBQXNCLENBQUM0SCxtQkFBRCxDQUFqRDs7QUFFQSxTQUFTNUgsc0JBQVQsQ0FBZ0NXLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVoQixXQUFPLEVBQUVnQjtBQUFYLEdBQXJDO0FBQXdEOztBQUUvRixJQUFJeUksb0JBQW9CLEdBQUcsU0FBU0Esb0JBQVQsQ0FBOEJyQixTQUE5QixFQUF5QztBQUNsRSxTQUFPLFlBQVk7QUFDakIsS0FBQyxHQUFHRixvQkFBb0IsQ0FBQ2xJLE9BQXpCLEVBQWtDb0ksU0FBbEM7QUFFQSxXQUFPQSxTQUFTLENBQUN4RyxJQUFWLEdBQWlCSSxPQUF4QjtBQUNELEdBSkQ7QUFLRCxDQU5EOztBQVFBOUQsT0FBTyxDQUFDOEIsT0FBUixHQUFrQnlKLG9CQUFsQixDOzs7Ozs7Ozs7Ozs7QUNwQmE7O0FBRWJ6TCxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSThKLG1CQUFtQixHQUFHOUgsbUJBQU8sQ0FBQywrRUFBRCxDQUFqQzs7QUFFQSxJQUFJK0gsb0JBQW9CLEdBQUc3SCxzQkFBc0IsQ0FBQzRILG1CQUFELENBQWpEOztBQUVBLFNBQVM1SCxzQkFBVCxDQUFnQ1csR0FBaEMsRUFBcUM7QUFBRSxTQUFPQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsVUFBWCxHQUF3QkQsR0FBeEIsR0FBOEI7QUFBRWhCLFdBQU8sRUFBRWdCO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLFNBQVMwSSxlQUFULENBQXlCMUksR0FBekIsRUFBOEJpRyxHQUE5QixFQUFtQzlJLEtBQW5DLEVBQTBDO0FBQUUsTUFBSThJLEdBQUcsSUFBSWpHLEdBQVgsRUFBZ0I7QUFBRWhELFVBQU0sQ0FBQ0MsY0FBUCxDQUFzQitDLEdBQXRCLEVBQTJCaUcsR0FBM0IsRUFBZ0M7QUFBRTlJLFdBQUssRUFBRUEsS0FBVDtBQUFnQndMLGdCQUFVLEVBQUUsSUFBNUI7QUFBa0NDLGtCQUFZLEVBQUUsSUFBaEQ7QUFBc0RDLGNBQVEsRUFBRTtBQUFoRSxLQUFoQztBQUEwRyxHQUE1SCxNQUFrSTtBQUFFN0ksT0FBRyxDQUFDaUcsR0FBRCxDQUFILEdBQVc5SSxLQUFYO0FBQW1COztBQUFDLFNBQU82QyxHQUFQO0FBQWE7QUFBQzs7O0FBR2xOLElBQUk4SSxnQkFBZ0IsR0FBRyxTQUFTQSxnQkFBVCxDQUEwQkMsT0FBMUIsRUFBbUM7QUFDeEQsU0FBTyxnQkFBZ0JBLE9BQXZCO0FBQ0QsQ0FGRDs7QUFJQSxJQUFJQyxjQUFjLEdBQUcsU0FBU0EsY0FBVCxDQUF3QkMsWUFBeEIsRUFBc0NySSxJQUF0QyxFQUE0Q3NJLFFBQTVDLEVBQXNEO0FBQ3pFLE1BQUksQ0FBQ3RJLElBQUwsRUFBVztBQUNULFVBQU1zSSxRQUFRLEVBQWQ7QUFDRDs7QUFDRCxNQUFJQyxNQUFNLEdBQUcsS0FBSyxDQUFsQjs7QUFFQSxNQUFJdkksSUFBSSxDQUFDcUksWUFBRCxDQUFSLEVBQXdCO0FBQ3RCRSxVQUFNLEdBQUd2SSxJQUFUO0FBQ0QsR0FGRCxNQUVPO0FBQ0x1SSxVQUFNLEdBQUd2SSxJQUFJLENBQUNoRCxRQUFMLENBQWN3TCxJQUFkLENBQW1CLFVBQVVwQyxLQUFWLEVBQWlCO0FBQzNDLGFBQU8sQ0FBQyxDQUFDQSxLQUFLLENBQUNpQyxZQUFELENBQWQ7QUFDRCxLQUZRLENBQVQ7QUFHRDs7QUFDRCxNQUFJSSxPQUFPLEdBQUdGLE1BQU0sR0FBR0EsTUFBTSxDQUFDRixZQUFELENBQU4sRUFBSCxHQUE0QixJQUFoRDs7QUFFQSxNQUFJSSxPQUFPLEtBQUssSUFBaEIsRUFBc0I7QUFDcEIsV0FBT0EsT0FBTyxDQUFDbE0sS0FBZjtBQUNEOztBQUNELFNBQU82TCxjQUFjLENBQUNDLFlBQUQsRUFBZXJJLElBQUksQ0FBQ3NGLE1BQXBCLEVBQTRCZ0QsUUFBNUIsQ0FBckI7QUFDRCxDQW5CRDs7QUFxQkEsSUFBSUksZ0JBQWdCLEdBQUcsU0FBU0EsZ0JBQVQsQ0FBMEJQLE9BQTFCLEVBQW1DbkksSUFBbkMsRUFBeUM7QUFDOUQsTUFBSTJJLFFBQVEsR0FBRyxTQUFTQSxRQUFULENBQWtCM0ksSUFBbEIsRUFBd0I7QUFDckMsUUFBSTRJLEtBQUssR0FBR25MLFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixDQUFuQixJQUF3QkQsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQkUsU0FBekMsR0FBcURGLFNBQVMsQ0FBQyxDQUFELENBQTlELEdBQW9FLEVBQWhGO0FBRUFtTCxTQUFLLENBQUNoSSxJQUFOLENBQVdaLElBQUksQ0FBQ0ksT0FBTCxDQUFhMUQsSUFBeEI7O0FBQ0EsUUFBSXNELElBQUksQ0FBQ3NGLE1BQVQsRUFBaUI7QUFDZixhQUFPcUQsUUFBUSxDQUFDM0ksSUFBSSxDQUFDc0YsTUFBTixFQUFjc0QsS0FBZCxDQUFmO0FBQ0Q7O0FBQ0QsV0FBT0EsS0FBUDtBQUNELEdBUkQ7O0FBVUEsU0FBTyxJQUFJM0wsS0FBSixDQUFVLE1BQU1rTCxPQUFOLEdBQWdCLHVCQUFoQixHQUEwQ25JLElBQUksQ0FBQ0ksT0FBTCxDQUFhMUQsSUFBdkQsR0FBOEQsaUNBQTlELEdBQWtHaU0sUUFBUSxDQUFDM0ksSUFBRCxDQUFSLENBQWVlLE9BQWYsR0FBeUJvRixHQUF6QixDQUE2QixVQUFVekosSUFBVixFQUFnQjtBQUM5SixXQUFPLFFBQVFBLElBQVIsR0FBZSxHQUF0QjtBQUNELEdBRmtILEVBRWhIbU0sSUFGZ0gsQ0FFM0csSUFGMkcsQ0FBNUcsQ0FBUDtBQUdELENBZEQ7O0FBZ0JBLElBQUlDLG9CQUFvQixHQUFHLFNBQVNBLG9CQUFULENBQThCdEMsU0FBOUIsRUFBeUM7QUFDbEVBLFdBQVMsQ0FBQ2xFLFdBQVYsQ0FBc0IsVUFBVXRDLElBQVYsRUFBZ0I7QUFDcEMsUUFBSUksT0FBTyxHQUFHSixJQUFJLENBQUNJLE9BQW5CO0FBQ0EsUUFBSXJELEtBQUssR0FBR3FELE9BQU8sQ0FBQ3JELEtBQXBCO0FBRUEsUUFBSWdNLFNBQVMsR0FBR2hNLEtBQUssR0FBR1gsTUFBTSxDQUFDNE0sSUFBUCxDQUFZak0sS0FBWixDQUFILEdBQXdCLEVBQTdDO0FBRUFnTSxhQUFTLENBQUMvSCxPQUFWLENBQWtCLFVBQVVpSSxRQUFWLEVBQW9CO0FBQ3BDLFVBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQixDQUFoQixNQUF1QixHQUEzQixFQUFnQztBQUM5QixZQUFJZixPQUFPLEdBQUdjLFFBQVEsQ0FBQ0UsTUFBVCxDQUFnQixDQUFoQixFQUFtQkYsUUFBUSxDQUFDdkwsTUFBNUIsQ0FBZDtBQUNBLFlBQUkwTCxZQUFZLEdBQUdoQixjQUFjLENBQUNGLGdCQUFnQixDQUFDQyxPQUFELENBQWpCLEVBQTRCbkksSUFBSSxDQUFDc0YsTUFBakMsRUFBeUMsWUFBWTtBQUNwRixpQkFBT29ELGdCQUFnQixDQUFDUCxPQUFELEVBQVVuSSxJQUFWLENBQXZCO0FBQ0QsU0FGZ0MsQ0FBakM7QUFJQUksZUFBTyxDQUFDeEMsVUFBUixDQUFtQmtLLGVBQWUsQ0FBQyxFQUFELEVBQUtLLE9BQUwsRUFBY2lCLFlBQWQsQ0FBbEM7QUFDRCxPQVBELE1BT08sSUFBSUgsUUFBUSxLQUFLLFNBQWpCLEVBQTRCO0FBQ2pDakosWUFBSSxDQUFDa0ksZ0JBQWdCLENBQUNuTCxLQUFLLENBQUNrTSxRQUFELENBQU4sQ0FBakIsQ0FBSixHQUEwQyxZQUFZO0FBQ3BELGlCQUFPO0FBQUUxTSxpQkFBSyxFQUFFeUQsSUFBSSxDQUFDcUo7QUFBZCxXQUFQO0FBQ0QsU0FGRDtBQUdEO0FBQ0YsS0FiRDtBQWNELEdBcEJEO0FBc0JBLFNBQU8sVUFBVTlNLEtBQVYsRUFBaUI7QUFDdEIsS0FBQyxHQUFHK0osb0JBQW9CLENBQUNsSSxPQUF6QixFQUFrQ29JLFNBQWxDO0FBQ0EsUUFBSXhHLElBQUksR0FBR3dHLFNBQVMsQ0FBQ3hHLElBQVYsRUFBWDtBQUVBQSxRQUFJLENBQUNxSixTQUFMLEdBQWlCOU0sS0FBakI7QUFDQSxXQUFPLENBQUMsVUFBVStNLFFBQVYsRUFBb0I7QUFDMUIsYUFBT3RKLElBQUksQ0FBQ3FKLFNBQUwsR0FBaUJDLFFBQXhCO0FBQ0QsS0FGTSxDQUFQO0FBR0QsR0FSRDtBQVNELENBaENEOztBQWtDQWhOLE9BQU8sQ0FBQzhCLE9BQVIsR0FBa0IwSyxvQkFBbEIsQzs7Ozs7Ozs7Ozs7O0FDMUZhOztBQUViMU0sTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUlBLElBQUlnTixjQUFjLEdBQUcsWUFBWTtBQUFFLFdBQVNDLGFBQVQsQ0FBdUJ2RyxHQUF2QixFQUE0QnhDLENBQTVCLEVBQStCO0FBQUUsUUFBSWdKLElBQUksR0FBRyxFQUFYO0FBQWUsUUFBSUMsRUFBRSxHQUFHLElBQVQ7QUFBZSxRQUFJQyxFQUFFLEdBQUcsS0FBVDtBQUFnQixRQUFJQyxFQUFFLEdBQUdqTSxTQUFUOztBQUFvQixRQUFJO0FBQUUsV0FBSyxJQUFJa00sRUFBRSxHQUFHNUcsR0FBRyxDQUFDNkcsTUFBTSxDQUFDQyxRQUFSLENBQUgsRUFBVCxFQUFpQ0MsRUFBdEMsRUFBMEMsRUFBRU4sRUFBRSxHQUFHLENBQUNNLEVBQUUsR0FBR0gsRUFBRSxDQUFDL0gsSUFBSCxFQUFOLEVBQWlCQyxJQUF4QixDQUExQyxFQUF5RTJILEVBQUUsR0FBRyxJQUE5RSxFQUFvRjtBQUFFRCxZQUFJLENBQUM3SSxJQUFMLENBQVVvSixFQUFFLENBQUN6TixLQUFiOztBQUFxQixZQUFJa0UsQ0FBQyxJQUFJZ0osSUFBSSxDQUFDL0wsTUFBTCxLQUFnQitDLENBQXpCLEVBQTRCO0FBQVE7QUFBRSxLQUF2SixDQUF3SixPQUFPd0osR0FBUCxFQUFZO0FBQUVOLFFBQUUsR0FBRyxJQUFMO0FBQVdDLFFBQUUsR0FBR0ssR0FBTDtBQUFXLEtBQTVMLFNBQXFNO0FBQUUsVUFBSTtBQUFFLFlBQUksQ0FBQ1AsRUFBRCxJQUFPRyxFQUFFLENBQUMsUUFBRCxDQUFiLEVBQXlCQSxFQUFFLENBQUMsUUFBRCxDQUFGO0FBQWlCLE9BQWhELFNBQXlEO0FBQUUsWUFBSUYsRUFBSixFQUFRLE1BQU1DLEVBQU47QUFBVztBQUFFOztBQUFDLFdBQU9ILElBQVA7QUFBYzs7QUFBQyxTQUFPLFVBQVV4RyxHQUFWLEVBQWV4QyxDQUFmLEVBQWtCO0FBQUUsUUFBSXlDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixHQUFkLENBQUosRUFBd0I7QUFBRSxhQUFPQSxHQUFQO0FBQWEsS0FBdkMsTUFBNkMsSUFBSTZHLE1BQU0sQ0FBQ0MsUUFBUCxJQUFtQjNOLE1BQU0sQ0FBQzZHLEdBQUQsQ0FBN0IsRUFBb0M7QUFBRSxhQUFPdUcsYUFBYSxDQUFDdkcsR0FBRCxFQUFNeEMsQ0FBTixDQUFwQjtBQUErQixLQUFyRSxNQUEyRTtBQUFFLFlBQU0sSUFBSXlKLFNBQUosQ0FBYyxzREFBZCxDQUFOO0FBQThFO0FBQUUsR0FBck87QUFBd08sQ0FBaG9CLEVBQXJCOztBQUVBNU4sT0FBTyxDQUFDOEIsT0FBUixHQUFrQitMLG1CQUFsQjs7QUFFQSxJQUFJOUQsbUJBQW1CLEdBQUc5SCxtQkFBTyxDQUFDLCtFQUFELENBQWpDOztBQUVBLElBQUkrSCxvQkFBb0IsR0FBRzdILHNCQUFzQixDQUFDNEgsbUJBQUQsQ0FBakQ7O0FBRUEsU0FBUzVILHNCQUFULENBQWdDVyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFaEIsV0FBTyxFQUFFZ0I7QUFBWCxHQUFyQztBQUF3RDs7QUFFL0YsSUFBSWdMLFdBQVcsR0FBRyxFQUFsQjs7QUFFQSxTQUFTQyxzQkFBVCxDQUFnQ0MsU0FBaEMsRUFBMkNDLFdBQTNDLEVBQXdEO0FBQ3RELFNBQU8sVUFBVUMsSUFBVixFQUFnQjtBQUNyQixRQUFJN0csSUFBSSxHQUFHNkcsSUFBSSxDQUFDN0csSUFBaEI7O0FBRUEsUUFBSThHLFlBQVksR0FBR0YsV0FBVyxFQUE5QjtBQUFBLFFBQ0lHLGFBQWEsR0FBR25CLGNBQWMsQ0FBQ2tCLFlBQUQsRUFBZSxDQUFmLENBRGxDO0FBQUEsUUFFSXpOLFFBQVEsR0FBRzBOLGFBQWEsQ0FBQyxDQUFELENBRjVCOztBQUlBSixhQUFTLENBQUMzRyxJQUFELEVBQU8sVUFBVWdILE9BQVYsRUFBbUI7QUFDakMsYUFBTzNOLFFBQVEsQ0FBQztBQUFFMk4sZUFBTyxFQUFFQTtBQUFYLE9BQUQsQ0FBZjtBQUNELEtBRlEsQ0FBVDtBQUdELEdBVkQ7QUFXRDs7QUFBQTs7QUFDRCxTQUFTQyxvQkFBVCxDQUE4QkMsT0FBOUIsRUFBdUM7QUFDckMsU0FBTyxVQUFVQyxLQUFWLEVBQWlCO0FBQ3RCLFFBQUluSCxJQUFJLEdBQUdtSCxLQUFLLENBQUNuSCxJQUFqQjtBQUFBLFFBQ0lnSCxPQUFPLEdBQUdHLEtBQUssQ0FBQ0gsT0FEcEI7QUFHQUUsV0FBTyxDQUFDbEgsSUFBRCxFQUFPZ0gsT0FBUCxDQUFQO0FBQ0QsR0FMRDtBQU1EOztBQUVELElBQUlMLFNBQVMsR0FBRyxTQUFTQSxTQUFULENBQW1CbEssT0FBbkIsRUFBNEJ1RCxJQUE1QixFQUFrQ3BCLFFBQWxDLEVBQTRDO0FBQzFELE1BQUksQ0FBQzZILFdBQVcsQ0FBQ3pHLElBQUQsQ0FBaEIsRUFBd0J5RyxXQUFXLENBQUN6RyxJQUFELENBQVgsR0FBb0IsRUFBcEI7QUFDeEJ5RyxhQUFXLENBQUN6RyxJQUFELENBQVgsQ0FBa0J2RCxPQUFPLENBQUM5QyxFQUExQixJQUFnQ2lGLFFBQWhDO0FBQ0EsU0FBTyxZQUFZO0FBQ2pCLFdBQU82SCxXQUFXLENBQUN6RyxJQUFELENBQVgsQ0FBa0J2RCxPQUFPLENBQUM5QyxFQUExQixDQUFQO0FBQ0QsR0FGRDtBQUdELENBTkQ7O0FBT0EsSUFBSXVOLE9BQU8sR0FBRyxTQUFTQSxPQUFULENBQWlCbEgsSUFBakIsRUFBdUJnSCxPQUF2QixFQUFnQztBQUM1QyxNQUFJLENBQUNQLFdBQVcsQ0FBQ3pHLElBQUQsQ0FBaEIsRUFBd0I7QUFDeEJ2SCxRQUFNLENBQUM0TSxJQUFQLENBQVlvQixXQUFXLENBQUN6RyxJQUFELENBQXZCLEVBQStCM0MsT0FBL0IsQ0FBdUMsVUFBVTFELEVBQVYsRUFBYztBQUNuRDhNLGVBQVcsQ0FBQ3pHLElBQUQsQ0FBWCxDQUFrQnJHLEVBQWxCLEVBQXNCcU4sT0FBdEI7QUFDRCxHQUZEO0FBR0QsQ0FMRDs7QUFPQSxTQUFTUixtQkFBVCxDQUE2QjNELFNBQTdCLEVBQXdDK0QsV0FBeEMsRUFBcUQ7QUFDbkQvRCxXQUFTLENBQUM3RCxZQUFWLENBQXVCLFVBQVUzQyxJQUFWLEVBQWdCO0FBQ3JDNUQsVUFBTSxDQUFDNE0sSUFBUCxDQUFZb0IsV0FBWixFQUF5QnBKLE9BQXpCLENBQWlDLFVBQVUyQyxJQUFWLEVBQWdCO0FBQy9DLFVBQUl5RyxXQUFXLENBQUN6RyxJQUFELENBQVgsQ0FBa0IzRCxJQUFJLENBQUNJLE9BQUwsQ0FBYTlDLEVBQS9CLENBQUosRUFBd0M7QUFDdEMsZUFBTzhNLFdBQVcsQ0FBQ3pHLElBQUQsQ0FBWCxDQUFrQjNELElBQUksQ0FBQ0ksT0FBTCxDQUFhOUMsRUFBL0IsQ0FBUDtBQUNEO0FBQ0YsS0FKRDtBQUtELEdBTkQ7QUFPQSxTQUFPLFVBQVV5TixhQUFWLEVBQXlCO0FBQzlCLEtBQUMsR0FBR3pFLG9CQUFvQixDQUFDbEksT0FBekIsRUFBa0NvSSxTQUFsQztBQUVBLFFBQUl4RyxJQUFJLEdBQUd3RyxTQUFTLENBQUN4RyxJQUFWLEVBQVg7QUFDQSxRQUFJZ0wsRUFBRSxHQUFHRCxhQUFhLElBQUkvSyxJQUFJLENBQUNJLE9BQS9COztBQUNBLFFBQUk2SyxhQUFhLEdBQUcsU0FBU0EsYUFBVCxHQUF5QjtBQUMzQyxXQUFLLElBQUlDLElBQUksR0FBR3pOLFNBQVMsQ0FBQ0MsTUFBckIsRUFBNkJ5TixNQUFNLEdBQUdqSSxLQUFLLENBQUNnSSxJQUFELENBQTNDLEVBQW1ERSxJQUFJLEdBQUcsQ0FBL0QsRUFBa0VBLElBQUksR0FBR0YsSUFBekUsRUFBK0VFLElBQUksRUFBbkYsRUFBdUY7QUFDckZELGNBQU0sQ0FBQ0MsSUFBRCxDQUFOLEdBQWUzTixTQUFTLENBQUMyTixJQUFELENBQXhCO0FBQ0Q7O0FBRUQsYUFBT2QsU0FBUyxDQUFDM0osS0FBVixDQUFnQmhELFNBQWhCLEVBQTJCLENBQUNxTixFQUFELEVBQUsvRyxNQUFMLENBQVlrSCxNQUFaLENBQTNCLENBQVA7QUFDRCxLQU5EOztBQU9BLFFBQUlFLFdBQVcsR0FBRyxTQUFTQSxXQUFULEdBQXVCO0FBQ3ZDLGFBQU9SLE9BQU8sQ0FBQ2xLLEtBQVIsQ0FBY2hELFNBQWQsRUFBeUJGLFNBQXpCLENBQVA7QUFDRCxLQUZEOztBQUlBLFdBQU87QUFDTDZNLGVBQVMsRUFBRVcsYUFETjtBQUVMSixhQUFPLEVBQUVRLFdBRko7QUFHTGpCLGlCQUFXLEVBQUVBLFdBSFI7QUFJTGtCLGVBQVMsRUFBRWpCLHNCQUFzQixDQUFDWSxhQUFELEVBQWdCVixXQUFoQixDQUo1QjtBQUtMZ0IsYUFBTyxFQUFFWCxvQkFBb0IsQ0FBQ1MsV0FBRDtBQUx4QixLQUFQO0FBT0QsR0F2QkQ7QUF3QkQ7O0FBRURsQixtQkFBbUIsQ0FBQ3JILEtBQXBCLEdBQTRCLFlBQVk7QUFDdENzSCxhQUFXLEdBQUcsRUFBZDtBQUNELENBRkQsQzs7Ozs7Ozs7Ozs7O0FDeEZhOztBQUViaE8sTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUlBLElBQUlnTixjQUFjLEdBQUcsWUFBWTtBQUFFLFdBQVNDLGFBQVQsQ0FBdUJ2RyxHQUF2QixFQUE0QnhDLENBQTVCLEVBQStCO0FBQUUsUUFBSWdKLElBQUksR0FBRyxFQUFYO0FBQWUsUUFBSUMsRUFBRSxHQUFHLElBQVQ7QUFBZSxRQUFJQyxFQUFFLEdBQUcsS0FBVDtBQUFnQixRQUFJQyxFQUFFLEdBQUdqTSxTQUFUOztBQUFvQixRQUFJO0FBQUUsV0FBSyxJQUFJa00sRUFBRSxHQUFHNUcsR0FBRyxDQUFDNkcsTUFBTSxDQUFDQyxRQUFSLENBQUgsRUFBVCxFQUFpQ0MsRUFBdEMsRUFBMEMsRUFBRU4sRUFBRSxHQUFHLENBQUNNLEVBQUUsR0FBR0gsRUFBRSxDQUFDL0gsSUFBSCxFQUFOLEVBQWlCQyxJQUF4QixDQUExQyxFQUF5RTJILEVBQUUsR0FBRyxJQUE5RSxFQUFvRjtBQUFFRCxZQUFJLENBQUM3SSxJQUFMLENBQVVvSixFQUFFLENBQUN6TixLQUFiOztBQUFxQixZQUFJa0UsQ0FBQyxJQUFJZ0osSUFBSSxDQUFDL0wsTUFBTCxLQUFnQitDLENBQXpCLEVBQTRCO0FBQVE7QUFBRSxLQUF2SixDQUF3SixPQUFPd0osR0FBUCxFQUFZO0FBQUVOLFFBQUUsR0FBRyxJQUFMO0FBQVdDLFFBQUUsR0FBR0ssR0FBTDtBQUFXLEtBQTVMLFNBQXFNO0FBQUUsVUFBSTtBQUFFLFlBQUksQ0FBQ1AsRUFBRCxJQUFPRyxFQUFFLENBQUMsUUFBRCxDQUFiLEVBQXlCQSxFQUFFLENBQUMsUUFBRCxDQUFGO0FBQWlCLE9BQWhELFNBQXlEO0FBQUUsWUFBSUYsRUFBSixFQUFRLE1BQU1DLEVBQU47QUFBVztBQUFFOztBQUFDLFdBQU9ILElBQVA7QUFBYzs7QUFBQyxTQUFPLFVBQVV4RyxHQUFWLEVBQWV4QyxDQUFmLEVBQWtCO0FBQUUsUUFBSXlDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixHQUFkLENBQUosRUFBd0I7QUFBRSxhQUFPQSxHQUFQO0FBQWEsS0FBdkMsTUFBNkMsSUFBSTZHLE1BQU0sQ0FBQ0MsUUFBUCxJQUFtQjNOLE1BQU0sQ0FBQzZHLEdBQUQsQ0FBN0IsRUFBb0M7QUFBRSxhQUFPdUcsYUFBYSxDQUFDdkcsR0FBRCxFQUFNeEMsQ0FBTixDQUFwQjtBQUErQixLQUFyRSxNQUEyRTtBQUFFLFlBQU0sSUFBSXlKLFNBQUosQ0FBYyxzREFBZCxDQUFOO0FBQThFO0FBQUUsR0FBck87QUFBd08sQ0FBaG9CLEVBQXJCOztBQUVBNU4sT0FBTyxDQUFDOEIsT0FBUixHQUFrQm9OLG9CQUFsQjs7QUFFQSxTQUFTQyx3QkFBVCxDQUFrQ3JNLEdBQWxDLEVBQXVDNEosSUFBdkMsRUFBNkM7QUFBRSxNQUFJMEMsTUFBTSxHQUFHLEVBQWI7O0FBQWlCLE9BQUssSUFBSWpMLENBQVQsSUFBY3JCLEdBQWQsRUFBbUI7QUFBRSxRQUFJNEosSUFBSSxDQUFDMkMsT0FBTCxDQUFhbEwsQ0FBYixLQUFtQixDQUF2QixFQUEwQjtBQUFVLFFBQUksQ0FBQ3JFLE1BQU0sQ0FBQ3dQLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQzFNLEdBQXJDLEVBQTBDcUIsQ0FBMUMsQ0FBTCxFQUFtRDtBQUFVaUwsVUFBTSxDQUFDakwsQ0FBRCxDQUFOLEdBQVlyQixHQUFHLENBQUNxQixDQUFELENBQWY7QUFBcUI7O0FBQUMsU0FBT2lMLE1BQVA7QUFBZ0I7O0FBRTVOLFNBQVNLLHFCQUFULENBQStCQyxRQUEvQixFQUF5QztBQUN2QyxTQUFPLFVBQVV4QixJQUFWLEVBQWdCO0FBQ3JCLFFBQUl5QixNQUFNLEdBQUd6QixJQUFJLENBQUN5QixNQUFsQjtBQUFBLFFBQ0lDLGFBQWEsR0FBRzFCLElBQUksQ0FBQzBCLGFBRHpCO0FBQUEsUUFFSUMsSUFBSSxHQUFHVix3QkFBd0IsQ0FBQ2pCLElBQUQsRUFBTyxDQUFDLFFBQUQsRUFBVyxlQUFYLENBQVAsQ0FGbkM7O0FBSUEsUUFBSXlCLE1BQUosRUFBWTtBQUNWRCxjQUFRLENBQUNDLE1BQUQsQ0FBUjtBQUNELEtBRkQsTUFFTyxJQUFJQyxhQUFKLEVBQW1CO0FBQ3hCRixjQUFRLENBQUNFLGFBQWEsQ0FBQ0MsSUFBRCxDQUFkLENBQVI7QUFDRCxLQUZNLE1BRUE7QUFDTCxZQUFNLElBQUlsUCxLQUFKLENBQVUsc0RBQVYsQ0FBTjtBQUNEO0FBQ0YsR0FaRDtBQWFEOztBQUVELFNBQVN1TyxvQkFBVCxDQUE4QlksUUFBOUIsRUFBd0M7QUFDdEMsU0FBTyxVQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQztBQUN0QyxRQUFJeE4sU0FBUyxHQUFHc04sUUFBUSxDQUFDRSxZQUFELENBQXhCO0FBQUEsUUFDSXZOLFVBQVUsR0FBR3dLLGNBQWMsQ0FBQ3pLLFNBQUQsRUFBWSxDQUFaLENBRC9CO0FBQUEsUUFFSXlOLEtBQUssR0FBR3hOLFVBQVUsQ0FBQyxDQUFELENBRnRCO0FBQUEsUUFHSXlOLFFBQVEsR0FBR3pOLFVBQVUsQ0FBQyxDQUFELENBSHpCO0FBQUEsUUFJSTBOLFFBQVEsR0FBRzFOLFVBQVUsQ0FBQyxDQUFELENBSnpCOztBQU1BLFFBQUlpTixRQUFRLEdBQUcsU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7QUFDdkMsYUFBT08sUUFBUSxDQUFDSCxPQUFPLENBQUNJLFFBQVEsRUFBVCxFQUFhUixNQUFiLENBQVIsQ0FBZjtBQUNELEtBRkQ7O0FBSUEsV0FBTyxDQUFDTSxLQUFELEVBQVFQLFFBQVIsRUFBa0JELHFCQUFxQixDQUFDQyxRQUFELENBQXZDLEVBQW1EO0FBQzFELGdCQUFZO0FBQ1YsYUFBT1MsUUFBUSxFQUFmO0FBQ0QsS0FITSxDQUdMO0FBSEssS0FBUDtBQUtELEdBaEJEO0FBaUJELEM7Ozs7Ozs7Ozs7OztBQzlDWTs7QUFFYnJRLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM4QixPQUFSLEdBQWtCc08sa0JBQWxCOztBQUVBLElBQUlyRyxtQkFBbUIsR0FBRzlILG1CQUFPLENBQUMsK0VBQUQsQ0FBakM7O0FBRUEsSUFBSStILG9CQUFvQixHQUFHN0gsc0JBQXNCLENBQUM0SCxtQkFBRCxDQUFqRDs7QUFFQSxTQUFTNUgsc0JBQVQsQ0FBZ0NXLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVoQixXQUFPLEVBQUVnQjtBQUFYLEdBQXJDO0FBQXdEOztBQUUvRixJQUFJdUgsT0FBTyxHQUFHO0FBQ1pDLFVBQVEsRUFBRSxFQURFO0FBRVpDLEtBQUcsRUFBRSxTQUFTQSxHQUFULENBQWF6RyxPQUFiLEVBQXNCO0FBQ3pCLFFBQUksS0FBS3dHLFFBQUwsQ0FBY3hHLE9BQU8sQ0FBQzlDLEVBQXRCLENBQUosRUFBK0I7QUFDN0IsYUFBTyxLQUFLc0osUUFBTCxDQUFjeEcsT0FBTyxDQUFDOUMsRUFBdEIsQ0FBUDtBQUNEOztBQUNELFdBQU8sS0FBS3NKLFFBQUwsQ0FBY3hHLE9BQU8sQ0FBQzlDLEVBQXRCLElBQTRCO0FBQUVxUCxZQUFNLEVBQUUsRUFBVjtBQUFjNUYsY0FBUSxFQUFFO0FBQXhCLEtBQW5DO0FBQ0QsR0FQVztBQVFaQyxTQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQjFKLEVBQWpCLEVBQXFCO0FBQzVCLFFBQUksS0FBS3NKLFFBQUwsQ0FBY3RKLEVBQWQsQ0FBSixFQUF1QjtBQUNyQixhQUFPLEtBQUtzSixRQUFMLENBQWN0SixFQUFkLENBQVA7QUFDRDtBQUNGO0FBWlcsQ0FBZDtBQWFHOztBQUNILFNBQVNvUCxrQkFBVCxDQUE0QmxHLFNBQTVCLEVBQXVDO0FBQ3JDQSxXQUFTLENBQUM3RCxZQUFWLENBQXVCLFVBQVUzQyxJQUFWLEVBQWdCO0FBQ3JDLFdBQU8yRyxPQUFPLENBQUNLLE9BQVIsQ0FBZ0JoSCxJQUFJLENBQUNJLE9BQUwsQ0FBYTlDLEVBQTdCLENBQVA7QUFDRCxHQUZEO0FBR0EsU0FBTyxVQUFVZ1AsWUFBVixFQUF3QjtBQUM3QixLQUFDLEdBQUdoRyxvQkFBb0IsQ0FBQ2xJLE9BQXpCLEVBQWtDb0ksU0FBbEM7QUFFQSxRQUFJeEcsSUFBSSxHQUFHd0csU0FBUyxDQUFDeEcsSUFBVixFQUFYO0FBQ0EsUUFBSUksT0FBTyxHQUFHSixJQUFJLENBQUNJLE9BQW5CO0FBRUEsUUFBSXVILE9BQU8sR0FBR2hCLE9BQU8sQ0FBQ0UsR0FBUixDQUFZekcsT0FBWixDQUFkO0FBRUEsUUFBSXdILEtBQUssR0FBRyxLQUFLLENBQWpCLENBUjZCLENBVTdCOztBQUNBLFFBQUl4SCxPQUFPLENBQUM1QyxJQUFSLE9BQW1CLENBQXZCLEVBQTBCO0FBQ3hCbUssYUFBTyxDQUFDZ0YsTUFBUixDQUFlL0wsSUFBZixDQUFvQjBMLFlBQXBCO0FBQ0ExRSxXQUFLLEdBQUdELE9BQU8sQ0FBQ2dGLE1BQVIsQ0FBZWpQLE1BQWYsR0FBd0IsQ0FBaEMsQ0FGd0IsQ0FJeEI7QUFDRCxLQUxELE1BS087QUFDTGtLLFdBQUssR0FBR0QsT0FBTyxDQUFDWixRQUFoQjtBQUNBWSxhQUFPLENBQUNaLFFBQVIsR0FBbUJhLEtBQUssR0FBR0QsT0FBTyxDQUFDZ0YsTUFBUixDQUFlalAsTUFBZixHQUF3QixDQUFoQyxHQUFvQ2lLLE9BQU8sQ0FBQ1osUUFBUixHQUFtQixDQUF2RCxHQUEyRCxDQUE5RTtBQUNEOztBQUVELFdBQU8sQ0FBQ1ksT0FBTyxDQUFDZ0YsTUFBUixDQUFlL0UsS0FBZixDQUFELEVBQXdCLFVBQVVnRixRQUFWLEVBQW9CO0FBQ2pEakYsYUFBTyxDQUFDZ0YsTUFBUixDQUFlL0UsS0FBZixJQUF3QmdGLFFBQXhCOztBQUNBLFVBQUksQ0FBQ3hNLE9BQU8sQ0FBQ3JDLFNBQVIsRUFBTCxFQUEwQjtBQUN4QmlDLFlBQUksQ0FBQ0MsS0FBTDtBQUNEOztBQUNELGFBQU8yTSxRQUFQO0FBQ0QsS0FOTSxFQU1KLFlBQVk7QUFDYixhQUFPakYsT0FBTyxDQUFDZ0YsTUFBUixDQUFlL0UsS0FBZixDQUFQO0FBQ0QsS0FSTSxDQUFQO0FBU0QsR0E5QkQ7QUErQkQ7O0FBRUQ4RSxrQkFBa0IsQ0FBQzVKLEtBQW5CLEdBQTJCLFlBQVk7QUFDckM2RCxTQUFPLENBQUNDLFFBQVIsR0FBbUIsRUFBbkI7QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7OztBQ2hFYTs7QUFFYnhLLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3QztBQUdBRCxPQUFPLENBQUM4QixPQUFSLEdBQWtCeU8sa0JBQWxCOztBQUNBLFNBQVNBLGtCQUFULENBQTRCckcsU0FBNUIsRUFBdUM7QUFDckMsTUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQ2QsVUFBTSxJQUFJdkosS0FBSixDQUFVLDZGQUFWLENBQU47QUFDRDs7QUFDRCxNQUFJLENBQUN1SixTQUFTLENBQUN4RyxJQUFWLEVBQUwsRUFBdUI7QUFDckIsVUFBTSxJQUFJL0MsS0FBSixDQUFVLDBEQUFWLENBQU47QUFDRDtBQUNGOztBQUFBLEM7Ozs7Ozs7Ozs7OztBQ2JZOztBQUViYixNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7QUFHQUQsT0FBTyxDQUFDd1EsYUFBUixHQUF3QkEsYUFBeEI7O0FBRUEsSUFBSUMsVUFBVSxHQUFHeE8sbUJBQU8sQ0FBQywyQ0FBRCxDQUF4Qjs7QUFFQSxJQUFJeU8sV0FBVyxHQUFHdk8sc0JBQXNCLENBQUNzTyxVQUFELENBQXhDOztBQUVBLElBQUl6TyxlQUFlLEdBQUdDLG1CQUFPLENBQUMsaUVBQUQsQ0FBN0I7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUdDLHNCQUFzQixDQUFDSCxlQUFELENBQTdDOztBQUVBLElBQUkyTyxXQUFXLEdBQUcxTyxtQkFBTyxDQUFDLDZDQUFELENBQXpCOztBQUVBLElBQUkyTyxZQUFZLEdBQUd6TyxzQkFBc0IsQ0FBQ3dPLFdBQUQsQ0FBekM7O0FBRUEsSUFBSXhDLFlBQVksR0FBR2xNLG1CQUFPLENBQUMsMkRBQUQsQ0FBMUI7O0FBRUEsSUFBSW1NLGFBQWEsR0FBR2pNLHNCQUFzQixDQUFDZ00sWUFBRCxDQUExQzs7QUFFQSxJQUFJMEMsV0FBVyxHQUFHNU8sbUJBQU8sQ0FBQyx5REFBRCxDQUF6Qjs7QUFFQSxJQUFJNk8sWUFBWSxHQUFHM08sc0JBQXNCLENBQUMwTyxXQUFELENBQXpDOztBQUVBLElBQUlFLFdBQVcsR0FBRzlPLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsSUFBSStPLFlBQVksR0FBRzdPLHNCQUFzQixDQUFDNE8sV0FBRCxDQUF6Qzs7QUFFQSxJQUFJek8sVUFBVSxHQUFHTCxtQkFBTyxDQUFDLHVEQUFELENBQXhCOztBQUVBLElBQUlNLFdBQVcsR0FBR0osc0JBQXNCLENBQUNHLFVBQUQsQ0FBeEM7O0FBRUEsSUFBSUUsU0FBUyxHQUFHUCxtQkFBTyxDQUFDLHFEQUFELENBQXZCOztBQUVBLElBQUlRLFVBQVUsR0FBR04sc0JBQXNCLENBQUNLLFNBQUQsQ0FBdkM7O0FBRUEsSUFBSXlPLFdBQVcsR0FBR2hQLG1CQUFPLENBQUMseURBQUQsQ0FBekI7O0FBRUEsSUFBSWlQLFlBQVksR0FBRy9PLHNCQUFzQixDQUFDOE8sV0FBRCxDQUF6Qzs7QUFFQSxJQUFJdk8sVUFBVSxHQUFHVCxtQkFBTyxDQUFDLHVEQUFELENBQXhCOztBQUVBLElBQUlVLFdBQVcsR0FBR1Isc0JBQXNCLENBQUNPLFVBQUQsQ0FBeEM7O0FBRUEsU0FBU1Asc0JBQVQsQ0FBZ0NXLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVoQixXQUFPLEVBQUVnQjtBQUFYLEdBQXJDO0FBQXdEOztBQUUvRixTQUFTME4sYUFBVCxHQUF5QjtBQUN2QixNQUFJdEcsU0FBUyxHQUFHLENBQUMsR0FBR3dHLFdBQVcsQ0FBQzVPLE9BQWhCLEdBQWhCOztBQUVBLFdBQVNxUCxDQUFULENBQVdoUixJQUFYLEVBQWlCTSxLQUFqQixFQUF3QjtBQUN0QixTQUFLLElBQUltTyxJQUFJLEdBQUd6TixTQUFTLENBQUNDLE1BQXJCLEVBQTZCVixRQUFRLEdBQUdrRyxLQUFLLENBQUNnSSxJQUFJLEdBQUcsQ0FBUCxHQUFXQSxJQUFJLEdBQUcsQ0FBbEIsR0FBc0IsQ0FBdkIsQ0FBN0MsRUFBd0VFLElBQUksR0FBRyxDQUFwRixFQUF1RkEsSUFBSSxHQUFHRixJQUE5RixFQUFvR0UsSUFBSSxFQUF4RyxFQUE0RztBQUMxR3BPLGNBQVEsQ0FBQ29PLElBQUksR0FBRyxDQUFSLENBQVIsR0FBcUIzTixTQUFTLENBQUMyTixJQUFELENBQTlCO0FBQ0Q7O0FBRUQsV0FBTyxDQUFDLEdBQUc4QixZQUFZLENBQUM5TyxPQUFqQixFQUEwQjNCLElBQTFCLEVBQWdDTSxLQUFoQyxFQUF1Q0MsUUFBdkMsQ0FBUDtBQUNEOztBQUNELFdBQVNtRixHQUFULENBQWEvQixPQUFiLEVBQXNCO0FBQ3BCLFFBQUksQ0FBQyxDQUFDLEdBQUc1QixnQkFBZ0IsQ0FBQ0osT0FBckIsRUFBOEJnQyxPQUE5QixDQUFMLEVBQTZDO0FBQzNDLFlBQU0sSUFBSW5ELEtBQUosQ0FBVSxxQ0FBcUNtRCxPQUFPLENBQUN2RCxRQUFSLEVBQXJDLEdBQTBELFVBQXBFLENBQU47QUFDRDs7QUFDRCxXQUFPMkosU0FBUyxDQUFDckUsR0FBVixDQUFjL0IsT0FBZCxDQUFQO0FBQ0Q7O0FBQ0QsTUFBSXNOLFFBQVEsR0FBRyxTQUFTQSxRQUFULEdBQW9CLENBQUUsQ0FBckM7O0FBQ0EsTUFBSW5ELFdBQVcsR0FBRyxDQUFDLEdBQUdHLGFBQWEsQ0FBQ3RNLE9BQWxCLEVBQTJCb0ksU0FBM0IsQ0FBbEI7QUFDQSxNQUFJbUgsVUFBVSxHQUFHLENBQUMsR0FBR1AsWUFBWSxDQUFDaFAsT0FBakIsRUFBMEJvSSxTQUExQixDQUFqQjtBQUNBLE1BQUk0RixRQUFRLEdBQUcsQ0FBQyxHQUFHck4sVUFBVSxDQUFDWCxPQUFmLEVBQXdCb0ksU0FBeEIsQ0FBZjtBQUNBLE1BQUlvSCxVQUFVLEdBQUcsQ0FBQyxHQUFHTixZQUFZLENBQUNsUCxPQUFqQixFQUEwQm9JLFNBQTFCLEVBQXFDNEYsUUFBckMsQ0FBakI7QUFDQSxNQUFJeUIsU0FBUyxHQUFHLENBQUMsR0FBR2hQLFdBQVcsQ0FBQ1QsT0FBaEIsRUFBeUJvSSxTQUF6QixFQUFvQytELFdBQXBDLENBQWhCO0FBQ0EsTUFBSXVELFVBQVUsR0FBRyxDQUFDLEdBQUdOLFlBQVksQ0FBQ3BQLE9BQWpCLEVBQTBCZ08sUUFBMUIsQ0FBakI7QUFDQSxNQUFJMkIsU0FBUyxHQUFHLENBQUMsR0FBRzlPLFdBQVcsQ0FBQ2IsT0FBaEIsRUFBeUJvSSxTQUF6QixDQUFoQjtBQUVBLFNBQU87QUFDTGlILEtBQUMsRUFBRUEsQ0FERTtBQUVMdEwsT0FBRyxFQUFFQSxHQUZBO0FBR0x1TCxZQUFRLEVBQUVBLFFBSEw7QUFJTGxILGFBQVMsRUFBRUEsU0FKTjtBQUtMK0QsZUFBVyxFQUFFQSxXQUxSO0FBTUxvRCxjQUFVLEVBQUVBLFVBTlA7QUFPTEMsY0FBVSxFQUFFQSxVQVBQO0FBUUxDLGFBQVMsRUFBRUEsU0FSTjtBQVNMekIsWUFBUSxFQUFFQSxRQVRMO0FBVUwwQixjQUFVLEVBQUVBLFVBVlA7QUFXTEMsYUFBUyxFQUFFQTtBQVhOLEdBQVA7QUFhRDs7QUFFRCxJQUFJQyxPQUFPLEdBQUdsQixhQUFhLEVBQTNCO0FBRUFtQixNQUFNLENBQUMzUixPQUFQLEdBQWlCMFIsT0FBakI7QUFDQUMsTUFBTSxDQUFDM1IsT0FBUCxDQUFld1EsYUFBZixHQUErQkEsYUFBYSxFQUE1QyxDOzs7Ozs7Ozs7Ozs7QUM1RmE7O0FBRWIxUSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxPQUFLLEVBQUU7QUFEb0MsQ0FBN0M7QUFHQUQsT0FBTyxDQUFDOEIsT0FBUixHQUFrQjhQLGNBQWxCOztBQUNBLFNBQVNBLGNBQVQsQ0FBd0I5TixPQUF4QixFQUFpQztBQUMvQixTQUFPQSxPQUFPLElBQUlBLE9BQU8sQ0FBQ2xELE9BQVIsS0FBb0IsSUFBdEM7QUFDRDs7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUNSWTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFdBQVc7QUFDakM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsV0FBVztBQUMvQjs7QUFFQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0REE7QUFDQTtBQUNBOztBQUVBLGlDOzs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQSxpREFBaUQsZ0JBQWdCO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUM7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBOztBQUVBLGtDOzs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsK0JBQStCO0FBQzVFOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVDOzs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7O0FBRUEsa0M7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7Ozs7OztBQ0pBLHFCQUFxQixtQkFBTyxDQUFDLGlGQUFrQjs7QUFFL0M7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0M7Ozs7Ozs7Ozs7O0FDekJBLHFCQUFxQixtQkFBTyxDQUFDLGlGQUFrQjs7QUFFL0MsMkJBQTJCLG1CQUFPLENBQUMsNkZBQXdCOztBQUUzRCxzQkFBc0IsbUJBQU8sQ0FBQyxtRkFBbUI7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQSxnQzs7Ozs7Ozs7Ozs7QUNWQSx3QkFBd0IsbUJBQU8sQ0FBQyx1RkFBcUI7O0FBRXJELHNCQUFzQixtQkFBTyxDQUFDLG1GQUFtQjs7QUFFakQsd0JBQXdCLG1CQUFPLENBQUMsdUZBQXFCOztBQUVyRDtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLEtBQUs7QUFDTCxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7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Ozs7Ozs7Ozs7QUM5RkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTRyxHQUFULEdBQWU7QUFBQSxtQkFDT3pFLHNEQUFTLEVBRGhCO0FBQUEsTUFDTGhELE9BREssY0FDTEEsT0FESzs7QUFHYixTQUNFLCtDQUFDLDZDQUFELFFBQ0UsK0NBQUMsOENBQUQ7QUFBVyxnQkFBWSxFQUFHQTtBQUExQixJQURGLEVBRUUsK0NBQUMsMkNBQUQ7QUFBUSxnQkFBWSxFQUFHQTtBQUF2QixJQUZGLEVBR0UsK0NBQUMsZ0RBQUQsQ0FBUyxRQUFUO0FBQWtCLFdBQU8sRUFBQztBQUExQixJQUhGLEVBSUUsK0NBQUMsOENBQUQ7QUFBTyxXQUFPLEVBQUMsT0FBZjtBQUF1QixpQkFBYTtBQUFwQyxLQUNFLCtDQUFDLCtDQUFEO0FBQVEsV0FBTyxFQUFDO0FBQWhCLEtBQ0UsK0NBQUMsaURBQUQ7QUFBVSxVQUFNLE1BQWhCO0FBQWlCLFdBQU87QUFBeEIsSUFERixFQUVFLCtDQUFDLHNEQUFEO0FBQW1CLFdBQU87QUFBMUIsSUFGRixDQURGLEVBS0UsK0NBQUMsMERBQUQ7QUFBbUIsVUFBTTtBQUF6QixJQUxGLEVBTUUsK0NBQUMsb0RBQUQ7QUFBaUIsVUFBTTtBQUF2QixJQU5GLEVBT0UsK0NBQUMsZ0RBQUQsQ0FBUyxPQUFUO0FBQWlCLFVBQU07QUFBdkIsSUFQRixDQUpGLENBREY7QUFnQkQ7O0FBQUE7QUFFRDFJLGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuICB2YXIgcmVzdWx0ID0gL15mdW5jdGlvblxccysoW1xcd1xcJF0rKVxccypcXCgvLmV4ZWMoZnVuYy50b1N0cmluZygpKTtcblxuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0WzFdIDogJ3Vua25vd24nO1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uLiBcIicgKyBmdW5jICsgJ1wiIGdpdmVuIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIF9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTogdHJ1ZSxcbiAgICBpZDogbnVsbCxcbiAgICBwcm9wczogcHJvcHMsXG4gICAgbmFtZTogZ2V0RnVuY05hbWUoZnVuYyksXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoaWQpIHtcbiAgICAgIHZhciB1c2VkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICB0aGlzLl9fdXNlZCA9IHVzZWQ7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB0cnVlO1xuICAgIH0sXG4gICAgbWVyZ2VQcm9wczogZnVuY3Rpb24gbWVyZ2VQcm9wcyhuZXdQcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICB9LFxuICAgIHVzZWQ6IGZ1bmN0aW9uIHVzZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3VzZWQ7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcnVubmluZztcbiAgICB9LFxuICAgIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHk6IGZ1bmN0aW9uIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5ID0gdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IHRydWU7XG4gICAgICB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSA9IHRydWU7XG4gICAgfSxcbiAgICBjb25zdW1lOiBmdW5jdGlvbiBjb25zdW1lKCkge1xuICAgICAgcmV0dXJuIGZ1bmModGhpcy5wcm9wcyk7XG4gICAgfSxcbiAgICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICAgIHRoaXMuX191c2VkICs9IDE7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUVsZW1lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUHJvY2Vzc29yO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50ID0gcmVxdWlyZSgnLi91dGlscy9pc0FjdE1MRWxlbWVudCcpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQWN0TUxFbGVtZW50KTtcblxudmFyIF9UcmVlID0gcmVxdWlyZSgnLi9UcmVlJyk7XG5cbnZhciBfVHJlZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UcmVlKTtcblxudmFyIF91c2VQdWJTdWIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVB1YlN1YicpO1xuXG52YXIgX3VzZVB1YlN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQdWJTdWIpO1xuXG52YXIgX3VzZVN0YXRlID0gcmVxdWlyZSgnLi9ob29rcy91c2VTdGF0ZScpO1xuXG52YXIgX3VzZVN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVN0YXRlKTtcblxudmFyIF91c2VFZmZlY3QgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVmZmVjdCcpO1xuXG52YXIgX3VzZUVmZmVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VFZmZlY3QpO1xuXG52YXIgX1F1ZXVlID0gcmVxdWlyZSgnLi9RdWV1ZScpO1xuXG52YXIgX1F1ZXVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1F1ZXVlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbnZhciBDT05TVU1FID0gJ0NPTlNVTUUnO1xudmFyIFBST0NFU1NfUkVTVUxUID0gJ1BST0NFU1NfUkVTVUxUJztcbnZhciBSRVRVUk5FRF9FTEVNRU5UID0gJ1JFVFVSTkVEX0VMRU1FTlQnO1xudmFyIEhBTkRMRV9DSElMRFJFTiA9ICdIQU5ETEVfQ0hJTERSRU4nO1xudmFyIENISUxEID0gJ0NISUxEJztcblxudmFyIGlzR2VuZXJhdG9yID0gZnVuY3Rpb24gaXNHZW5lcmF0b3Iob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsnbmV4dCddID09PSAnZnVuY3Rpb24nO1xufTtcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsndGhlbiddID09PSAnZnVuY3Rpb24nO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc29yKCkge1xuICB2YXIgdHJlZSA9ICgwLCBfVHJlZTIuZGVmYXVsdCkoKTtcbiAgdmFyIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICB2YXIgcHJvY2Vzc05vZGUgPSBmdW5jdGlvbiBwcm9jZXNzTm9kZShub2RlKSB7XG4gICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgIG5vZGUuZW50ZXIoKTtcbiAgICBub2RlLnJlcnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgIH07XG4gICAgbm9kZS5jYWxsQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuZWxlbWVudC5jaGlsZHJlbjtcblxuXG4gICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgcXVldWVJdGVtc1RvQWRkID0gW107XG4gICAgICAgIHZhciBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB2YXIgY2hpbGRyZW5RdWV1ZSA9ICgwLCBfUXVldWUyLmRlZmF1bHQpKCcgICcgKyBub2RlLmVsZW1lbnQubmFtZSArICc6Y2hpbGRyZW4nKTtcblxuICAgICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XG4gICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGNoaWxkcmVuW2ldKSkge1xuICAgICAgICAgICAgdmFyIF9jaGlsZHJlbiRpO1xuXG4gICAgICAgICAgICAoX2NoaWxkcmVuJGkgPSBjaGlsZHJlbltpXSkubWVyZ2VQcm9wcy5hcHBseShfY2hpbGRyZW4kaSwgX2FyZ3VtZW50cyk7XG4gICAgICAgICAgICBxdWV1ZUl0ZW1zVG9BZGQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjaGlsZHJlbltpXSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2hpbGRyZW5baV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBmdW5jUmVzdWx0ID0gY2hpbGRyZW5baV0uYXBwbHkoY2hpbGRyZW4sIF9hcmd1bWVudHMpO1xuXG4gICAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZnVuY1Jlc3VsdCkpIHtcbiAgICAgICAgICAgICAgcXVldWVJdGVtc1RvQWRkLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShmdW5jUmVzdWx0KSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChmdW5jUmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBfbG9vcChpKTtcbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUl0ZW1zVG9BZGQucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgICBjaGlsZHJlblF1ZXVlLnByZXBlbmRJdGVtKENISUxELCBmdW5jLCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzLnB1c2gocik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlblF1ZXVlLnByb2Nlc3MoKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuUXVldWUub25Eb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIHZhciByZXN1bHRzID0ge307XG4gICAgdmFyIHF1ZXVlID0gKDAsIF9RdWV1ZTIuZGVmYXVsdCkoJyAnICsgbm9kZS5lbGVtZW50Lm5hbWUpO1xuXG4gICAgLy8gQ09OU1VNRVxuICAgIHF1ZXVlLmFkZChDT05TVU1FLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9kZS5lbGVtZW50LmNvbnN1bWUoKTtcbiAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0c1tDT05TVU1FXSA9IHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8vIFBST0NFU1NfUkVTVUxUXG4gICAgcXVldWUuYWRkKFBST0NFU1NfUkVTVUxULCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29uc3VtcHRpb24gPSByZXN1bHRzW0NPTlNVTUVdO1xuXG4gICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoY29uc3VtcHRpb24pKSB7XG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoY29uc3VtcHRpb24pKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNHZW5lcmF0b3IoY29uc3VtcHRpb24pKSB7XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBjb25zdW1wdGlvbjtcblxuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChnZW5lcmF0b3JEb25lKSB7XG4gICAgICAgICAgICB2YXIgZ2VuUmVzdWx0ID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gaXRlcmF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSBnZW5lcmF0b3IubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmICghZ2VuUmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0ZShyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRlKHJlcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlcyA9IHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlKF9yZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZXMudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JEb25lKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRvckRvbmUoX3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGdlbmVyYXRvckRvbmUoZ2VuUmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy8gSEFORExFX0NISUxEUkVOXG4gICAgcXVldWUuYWRkKEhBTkRMRV9DSElMRFJFTiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudC5zaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5KCkgPyBub2RlLmNhbGxDaGlsZHJlbigpIDogbnVsbDtcbiAgICB9KTtcblxuICAgIC8vIFJ1bm5pbmcgdGhlIHF1ZXVlXG4gICAgcXVldWUucHJvY2VzcygpO1xuXG4gICAgLy8gR2V0dGluZyB0aGUgcmVzdWx0LiBJdCBpcyBlaXRoZXIgYSBwcm9taXNlIGlmIHRoZXJlIGlzXG4gICAgLy8gc29tZXRoaW5nIGFzeW5jaHJvbm91cyBvciBhIHZhbHVlXG4gICAgcmV0dXJuIHF1ZXVlLm9uRG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLm91dCgpO1xuICAgICAgcmV0dXJuIFJFVFVSTkVEX0VMRU1FTlQgaW4gcmVzdWx0cyA/IHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gOiByZXN1bHRzW0NPTlNVTUVdO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbm9kZTogZnVuY3Rpb24gbm9kZSgpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9LFxuICAgIHJ1bjogZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICAgIHZhciByb290Tm9kZSA9IHRyZWUucmVzb2x2ZVJvb3QoZWxlbWVudCk7XG5cbiAgICAgIHJldHVybiBwcm9jZXNzTm9kZShyb290Tm9kZSk7XG4gICAgfSxcbiAgICBvbk5vZGVFbnRlcjogZnVuY3Rpb24gb25Ob2RlRW50ZXIoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlT3V0OiBmdW5jdGlvbiBvbk5vZGVPdXQoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLm9uTm9kZVJlbW92ZShjYWxsYmFjayk7XG4gICAgfSxcbiAgICBzeXN0ZW06IGZ1bmN0aW9uIHN5c3RlbSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyZWU6IHRyZWUsXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgdHJlZS5yZXNldCgpO1xuICAgICAgICAgIF91c2VQdWJTdWIyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlU3RhdGUyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlRWZmZWN0Mi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVRdWV1ZTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbnZhciBMT0dTID0gZmFsc2U7XG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgcmV0dXJuIExPR1MgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsndGhlbiddID09PSAnZnVuY3Rpb24nO1xufTtcbnZhciBjcmVhdGVJdGVtID0gZnVuY3Rpb24gY3JlYXRlSXRlbSh0eXBlLCBmdW5jKSB7XG4gIHZhciBvbkRvbmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZ1bmN0aW9uICgpIHt9O1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZnVuYzogZnVuYyxcbiAgICBvbkRvbmU6IG9uRG9uZVxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUXVldWUoY29udGV4dCkge1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgdmFyIGFzeW5jID0gZmFsc2U7XG4gIHZhciBydW5uaW5nID0gZmFsc2U7XG4gIHZhciByZWxlYXNlID0gZnVuY3Rpb24gcmVsZWFzZSgpIHt9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGQodHlwZSwgZnVuYywgb25Eb25lKSB7XG4gICAgICBsb2coY29udGV4dCArICc6UTogWy4uLicgKyB0eXBlICsgJ10gKCcgKyAoaXRlbXMubGVuZ3RoICsgMSkgKyAnIHRvdGFsKScpO1xuICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSkpO1xuICAgIH0sXG4gICAgcHJlcGVuZEl0ZW06IGZ1bmN0aW9uIHByZXBlbmRJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSkge1xuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6IFsnICsgdHlwZSArICcuLi5dICgnICsgKGl0ZW1zLmxlbmd0aCArIDEpICsgJyB0b3RhbCknKTtcbiAgICAgIGl0ZW1zID0gW2NyZWF0ZUl0ZW0odHlwZSwgZnVuYywgb25Eb25lKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShpdGVtcykpO1xuICAgIH0sXG4gICAgcHJvY2VzczogZnVuY3Rpb24gcHJvY2VzcyhsYXN0UmVzdWx0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbG9nKGNvbnRleHQgKyAnOlE6ZG9uZScpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlbSA9IGl0ZW1zLnNoaWZ0KCk7XG5cbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiAnICsgaXRlbS50eXBlICsgJygpICgnICsgaXRlbXMubGVuZ3RoICsgJyBsZWZ0KScpO1xuICAgICAgdmFyIHJlc3VsdCA9IGl0ZW0uZnVuYyhsYXN0UmVzdWx0KTtcblxuICAgICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgIGFzeW5jID0gdHJ1ZTtcbiAgICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24gKGFzeW5jUmVzdWx0KSB7XG4gICAgICAgICAgaXRlbS5vbkRvbmUoYXN5bmNSZXN1bHQpO1xuICAgICAgICAgIF90aGlzLnByb2Nlc3MoYXN5bmNSZXN1bHQpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZWxlYXNlKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLm9uRG9uZShyZXN1bHQpO1xuICAgICAgICB0aGlzLnByb2Nlc3MocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uRG9uZTogZnVuY3Rpb24gb25Eb25lKGdldFJlc3VsdCkge1xuICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZG9uZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9uZShnZXRSZXN1bHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0UmVzdWx0KCk7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiBydW5uaW5nO1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gVHJlZTtcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBuby1yZXR1cm4tYXNzaWduLCBtYXgtbGVuICovXG52YXIgTE9HUyA9IGZhbHNlO1xudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBMT0dTID8gKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG5cbmZ1bmN0aW9uIFRyZWUoKSB7XG4gIHZhciBvbk5vZGVFbnRlciA9IFtdO1xuICB2YXIgb25Ob2RlT3V0ID0gW107XG4gIHZhciBfb25Ob2RlUmVtb3ZlID0gW107XG4gIHZhciByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICB2YXIgaWRzID0gMDtcblxuICBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgICByZXR1cm4gJ2EnICsgKytpZHM7XG4gIH07XG4gIGZ1bmN0aW9uIHVzZVNhbWVOb2RlKG5vZGUsIG5ld0VsZW1lbnQpIHtcbiAgICBuZXdFbGVtZW50LmluaXRpYWxpemUobm9kZS5lbGVtZW50LmlkLCBub2RlLmVsZW1lbnQudXNlZCgpKTtcbiAgICBub2RlLmVsZW1lbnQgPSBuZXdFbGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIHRyZWVEaWZmKG9sZEVsZW1lbnQsIG5ld0VsZW1lbnQpIHtcbiAgICBpZiAob2xkRWxlbWVudCAmJiBvbGRFbGVtZW50Lm5hbWUgPT09IG5ld0VsZW1lbnQubmFtZSkge1xuICAgICAgaWYgKG9sZEVsZW1lbnQucHJvcHMgJiYgbmV3RWxlbWVudC5wcm9wcykge1xuICAgICAgICByZXR1cm4gb2xkRWxlbWVudC5wcm9wcy5rZXkgPT09IG5ld0VsZW1lbnQucHJvcHMua2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQsIHBhcmVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmluaXRpYWxpemUoZ2V0SWQoKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICBjdXJzb3I6IDAsXG4gICAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgbG9nKCctPiAnICsgdGhpcy5lbGVtZW50Lm5hbWUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuZW50ZXIoKTtcbiAgICAgICAgb25Ob2RlRW50ZXIuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIGxvZygnPC0gJyArIHRoaXMuZWxlbWVudC5uYW1lKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm91dCgpO1xuICAgICAgICAvLyBJZiB0aGVyZSdyZSBtb3JlIG5vZGVzIGluIHRoZSB0cmVlIHRoYW4gd2hhdCB3YXMgcHJvY2Vzc2VkXG4gICAgICAgIGlmICh0aGlzLmN1cnNvciA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5jdXJzb3IpLmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZWROb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjKHJlbW92ZWROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Vyc29yID0gMDtcbiAgICAgICAgb25Ob2RlT3V0LmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyhfdGhpczIpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBhZGRDaGlsZE5vZGU6IGZ1bmN0aW9uIGFkZENoaWxkTm9kZShuZXdFbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXTtcblxuICAgICAgICAvLyB1c2luZyB0aGUgc2FtZSBub2RlXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgdHJlZURpZmYoY2hpbGROb2RlLmVsZW1lbnQsIG5ld0VsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgICByZXR1cm4gdXNlU2FtZU5vZGUoY2hpbGROb2RlLCBuZXdFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0aW5nIGEgbmV3IG5vZGVcbiAgICAgICAgdmFyIG5ld0NoaWxkTm9kZSA9IGNyZWF0ZU5ld05vZGUobmV3RWxlbWVudCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdKSB7XG4gICAgICAgICAgX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICByZXR1cm4gYyhfdGhpczMuY2hpbGRyZW5bX3RoaXMzLmN1cnNvcl0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdID0gbmV3Q2hpbGROb2RlO1xuICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGROb2RlO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVSb290OiBmdW5jdGlvbiByZXNvbHZlUm9vdChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gcm9vdCA9IHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgPyB1c2VTYW1lTm9kZShyb290LCBlbGVtZW50KSA6IGNyZWF0ZU5ld05vZGUoZWxlbWVudCk7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHM6IGZ1bmN0aW9uIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2U6IGZ1bmN0aW9uIGRpYWdub3NlKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxvb3BPdmVyKG5vZGUpIHtcbiAgICAgICAgdmFyIGluZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZDogaW5kLFxuICAgICAgICAgIG5hbWU6IG5vZGUuZWxlbWVudC5uYW1lLFxuICAgICAgICAgIHVzZWQ6IG5vZGUuZWxlbWVudC51c2VkKCksXG4gICAgICAgICAgaWQ6IG5vZGUuZWxlbWVudC5pZCxcbiAgICAgICAgICBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9vcE92ZXIoY2hpbGQsIGluZCArIDEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICB9KHJvb3QpO1xuICAgIH0sXG4gICAgYWRkTm9kZUVudGVyQ2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVFbnRlckNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVFbnRlci5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIGFkZE5vZGVPdXRDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVPdXQucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgX29uTm9kZVJlbW92ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlQ2hpbGRyZW5Ib29rID0gZnVuY3Rpb24gY3JlYXRlVXNlQ2hpbGRyZW5Ib29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgbm9kZS5lbGVtZW50LnNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkoZmFsc2UpO1xuICAgIHJldHVybiBbbm9kZS5jYWxsQ2hpbGRyZW4sIG5vZGUuZWxlbWVudC5jaGlsZHJlbl07XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VDaGlsZHJlbkhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwgPSByZXF1aXJlKCdmYXN0LWRlZXAtZXF1YWwnKTtcblxudmFyIF9mYXN0RGVlcEVxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zhc3REZWVwRXF1YWwpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbnZhciBTdG9yYWdlID0ge1xuICBlbGVtZW50czoge30sXG4gIGdldDogZnVuY3Rpb24gZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0geyBlZmZlY3RzOiBbXSwgY29uc3VtZXI6IDAgfTtcbiAgfSxcbiAgY2xlYW5VcDogZnVuY3Rpb24gY2xlYW5VcChpZCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2lkXSkge1xuICAgICAgZGVsZXRlIHRoaXMuZWxlbWVudHNbaWRdO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGNyZWF0ZUVmZmVjdCA9IGZ1bmN0aW9uIGNyZWF0ZUVmZmVjdChjYWxsYmFjaywgZGVwcykge1xuICByZXR1cm4ge1xuICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICBkZXBzOiBkZXBzXG4gIH07XG59O1xudmFyIHVwZGF0ZUVmZmVjdCA9IGZ1bmN0aW9uIHVwZGF0ZUVmZmVjdChlZmZlY3QsIGNhbGxiYWNrLCBkZXBzKSB7XG4gIGVmZmVjdC5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICBlZmZlY3Qub2xkRGVwcyA9IGVmZmVjdC5kZXBzO1xuICBlZmZlY3QuZGVwcyA9IGRlcHM7XG4gIHJldHVybiBlZmZlY3Q7XG59O1xuXG5mdW5jdGlvbiBkZXBzRXF1YWwob2xkRGVwcywgbmV3RGVwcykge1xuICBpZiAoIW9sZERlcHMpIHJldHVybiBmYWxzZTtcbiAgaWYgKG9sZERlcHMubGVuZ3RoICE9PSBuZXdEZXBzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKDAsIF9mYXN0RGVlcEVxdWFsMi5kZWZhdWx0KShvbGREZXBzLCBuZXdEZXBzKTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVFZmZlY3Qobm9kZSwgZWZmZWN0KSB7XG4gIHZhciBkZXBzID0gZWZmZWN0LmRlcHMsXG4gICAgICBvbGREZXBzID0gZWZmZWN0Lm9sZERlcHMsXG4gICAgICBjYWxsYmFjayA9IGVmZmVjdC5jYWxsYmFjaztcblxuXG4gIGlmICh0eXBlb2YgZGVwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gIH0gZWxzZSBpZiAoZGVwcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAobm9kZS5lbGVtZW50LnVzZWQoKSA9PT0gMSkge1xuICAgICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYXJlRXF1YWwgPSBkZXBzRXF1YWwob2xkRGVwcywgZGVwcyk7XG5cbiAgICBpZiAoIWFyZUVxdWFsKSB7XG4gICAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBjcmVhdGVVc2VFZmZlY3RIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlRWZmZWN0SG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIHN0b3JhZ2UuZWZmZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChlZmZlY3QpIHtcbiAgICAgIGlmIChlZmZlY3QuY2xlYW5VcCkgZWZmZWN0LmNsZWFuVXAoKTtcbiAgICB9KTtcbiAgICBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHByb2Nlc3Nvci5vbk5vZGVPdXQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICBpZiAoc3RvcmFnZS5lZmZlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0b3JhZ2UuZWZmZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChlZmZlY3QpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVFZmZlY3Qobm9kZSwgZWZmZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIGRlcHMpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICAvLyBmaXJzdCBydW5cbiAgICBpZiAoZWxlbWVudC51c2VkKCkgPT09IDApIHtcbiAgICAgIHN0b3JhZ2UuZWZmZWN0cy5wdXNoKGNyZWF0ZUVmZmVjdChjYWxsYmFjaywgZGVwcykpO1xuXG4gICAgICAvLyBvdGhlciBydW5zXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpbmRleCA9IHN0b3JhZ2UuY29uc3VtZXI7XG5cbiAgICAgIHN0b3JhZ2UuY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2UuZWZmZWN0cy5sZW5ndGggLSAxID8gc3RvcmFnZS5jb25zdW1lciArIDEgOiAwO1xuICAgICAgdXBkYXRlRWZmZWN0KHN0b3JhZ2UuZWZmZWN0c1tpbmRleF0sIGNhbGxiYWNrLCBkZXBzKTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFZmZlY3RIb29rO1xuXG5cbmNyZWF0ZVVzZUVmZmVjdEhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVVc2VFbGVtZW50SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRIb29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgcmV0dXJuIHByb2Nlc3Nvci5ub2RlKCkuZWxlbWVudDtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVsZW1lbnRIb29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfSAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5cblxudmFyIGJyaWRnZU1ldGhvZE5hbWUgPSBmdW5jdGlvbiBicmlkZ2VNZXRob2ROYW1lKGtleXdvcmQpIHtcbiAgcmV0dXJuICdfX3JlcXVlc3RfXycgKyBrZXl3b3JkO1xufTtcblxudmFyIHJlc29sdmVQcm9kdWN0ID0gZnVuY3Rpb24gcmVzb2x2ZVByb2R1Y3QoYnJpZGdlTWV0aG9kLCBub2RlLCBnZXRFcnJvcikge1xuICBpZiAoIW5vZGUpIHtcbiAgICB0aHJvdyBnZXRFcnJvcigpO1xuICB9XG4gIHZhciBzb3VyY2UgPSB2b2lkIDA7XG5cbiAgaWYgKG5vZGVbYnJpZGdlTWV0aG9kXSkge1xuICAgIHNvdXJjZSA9IG5vZGU7XG4gIH0gZWxzZSB7XG4gICAgc291cmNlID0gbm9kZS5jaGlsZHJlbi5maW5kKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgcmV0dXJuICEhY2hpbGRbYnJpZGdlTWV0aG9kXTtcbiAgICB9KTtcbiAgfVxuICB2YXIgcHJvZHVjdCA9IHNvdXJjZSA/IHNvdXJjZVticmlkZ2VNZXRob2RdKCkgOiBudWxsO1xuXG4gIGlmIChwcm9kdWN0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHByb2R1Y3QudmFsdWU7XG4gIH1cbiAgcmV0dXJuIHJlc29sdmVQcm9kdWN0KGJyaWRnZU1ldGhvZCwgbm9kZS5wYXJlbnQsIGdldEVycm9yKTtcbn07XG5cbnZhciBnZXROb3RGb3VuZEVycm9yID0gZnVuY3Rpb24gZ2V0Tm90Rm91bmRFcnJvcihrZXl3b3JkLCBub2RlKSB7XG4gIHZhciBnZXRTdGFjayA9IGZ1bmN0aW9uIGdldFN0YWNrKG5vZGUpIHtcbiAgICB2YXIgc3RhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IFtdO1xuXG4gICAgc3RhY2sucHVzaChub2RlLmVsZW1lbnQubmFtZSk7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICByZXR1cm4gZ2V0U3RhY2sobm9kZS5wYXJlbnQsIHN0YWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xuXG4gIHJldHVybiBuZXcgRXJyb3IoJ1wiJyArIGtleXdvcmQgKyAnXCIgcHJvcCByZXF1ZXN0ZWQgYnkgXCInICsgbm9kZS5lbGVtZW50Lm5hbWUgKyAnXCIgY2FuIG5vdCBiZSBmb3VuZC5cXG5cXG5TdGFjazpcXG4nICsgZ2V0U3RhY2sobm9kZSkucmV2ZXJzZSgpLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnICA8JyArIG5hbWUgKyAnPic7XG4gIH0pLmpvaW4oJ1xcbicpKTtcbn07XG5cbnZhciBjcmVhdGVVc2VQcm9kdWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZVByb2R1Y3RIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlRW50ZXIoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgcHJvcHMgPSBlbGVtZW50LnByb3BzO1xuXG4gICAgdmFyIHByb3BOYW1lcyA9IHByb3BzID8gT2JqZWN0LmtleXMocHJvcHMpIDogW107XG5cbiAgICBwcm9wTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcE5hbWUpIHtcbiAgICAgIGlmIChwcm9wTmFtZS5jaGFyQXQoMCkgPT09ICckJykge1xuICAgICAgICB2YXIga2V5d29yZCA9IHByb3BOYW1lLnN1YnN0cigxLCBwcm9wTmFtZS5sZW5ndGgpO1xuICAgICAgICB2YXIgcHJvZHVjdFZhbHVlID0gcmVzb2x2ZVByb2R1Y3QoYnJpZGdlTWV0aG9kTmFtZShrZXl3b3JkKSwgbm9kZS5wYXJlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Tm90Rm91bmRFcnJvcihrZXl3b3JkLCBub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5tZXJnZVByb3BzKF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5d29yZCwgcHJvZHVjdFZhbHVlKSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnZXhwb3J0cycpIHtcbiAgICAgICAgbm9kZVticmlkZ2VNZXRob2ROYW1lKHByb3BzW3Byb3BOYW1lXSldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBub2RlLl9fcHJvZHVjdCB9O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgbm9kZS5fX3Byb2R1Y3QgPSB2YWx1ZTtcbiAgICByZXR1cm4gW2Z1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgcmV0dXJuIG5vZGUuX19wcm9kdWN0ID0gbmV3VmFsdWU7XG4gICAgfV07XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQcm9kdWN0SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHViU3ViSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3Vic2NyaWJlcnMgPSB7fTtcblxuZnVuY3Rpb24gY3JlYXRlU3Vic2NyaWJlRWxlbWVudChzdWJzY3JpYmUsIHVzZUNoaWxkcmVuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciB0eXBlID0gX3JlZi50eXBlO1xuXG4gICAgdmFyIF91c2VDaGlsZHJlbiA9IHVzZUNoaWxkcmVuKCksXG4gICAgICAgIF91c2VDaGlsZHJlbjIgPSBfc2xpY2VkVG9BcnJheShfdXNlQ2hpbGRyZW4sIDEpLFxuICAgICAgICBjaGlsZHJlbiA9IF91c2VDaGlsZHJlbjJbMF07XG5cbiAgICBzdWJzY3JpYmUodHlwZSwgZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlbih7IHBheWxvYWQ6IHBheWxvYWQgfSk7XG4gICAgfSk7XG4gIH07XG59O1xuZnVuY3Rpb24gY3JlYXRlUHVibGlzaEVsZW1lbnQocHVibGlzaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIHR5cGUgPSBfcmVmMi50eXBlLFxuICAgICAgICBwYXlsb2FkID0gX3JlZjIucGF5bG9hZDtcblxuICAgIHB1Ymxpc2godHlwZSwgcGF5bG9hZCk7XG4gIH07XG59XG5cbnZhciBzdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgc3Vic2NyaWJlcnNbdHlwZV0gPSB7fTtcbiAgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0gPSBjYWxsYmFjaztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF07XG4gIH07XG59O1xudmFyIHB1Ymxpc2ggPSBmdW5jdGlvbiBwdWJsaXNoKHR5cGUsIHBheWxvYWQpIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgcmV0dXJuO1xuICBPYmplY3Qua2V5cyhzdWJzY3JpYmVyc1t0eXBlXSkuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICBzdWJzY3JpYmVyc1t0eXBlXVtpZF0ocGF5bG9hZCk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVXNlUHViU3ViSG9vayhwcm9jZXNzb3IsIHVzZUNoaWxkcmVuKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgaWYgKHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF0pIHtcbiAgICAgICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlZEVsZW1lbnQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWwgPSBzY29wZWRFbGVtZW50IHx8IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgc3Vic2NyaWJlRnVuYyA9IGZ1bmN0aW9uIHN1YnNjcmliZUZ1bmMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YnNjcmliZS5hcHBseSh1bmRlZmluZWQsIFtlbF0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG4gICAgdmFyIHB1Ymxpc2hGdW5jID0gZnVuY3Rpb24gcHVibGlzaEZ1bmMoKSB7XG4gICAgICByZXR1cm4gcHVibGlzaC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZUZ1bmMsXG4gICAgICBwdWJsaXNoOiBwdWJsaXNoRnVuYyxcbiAgICAgIHN1YnNjcmliZXJzOiBzdWJzY3JpYmVycyxcbiAgICAgIFN1YnNjcmliZTogY3JlYXRlU3Vic2NyaWJlRWxlbWVudChzdWJzY3JpYmVGdW5jLCB1c2VDaGlsZHJlbiksXG4gICAgICBQdWJsaXNoOiBjcmVhdGVQdWJsaXNoRWxlbWVudChwdWJsaXNoRnVuYylcbiAgICB9O1xuICB9O1xufVxuXG5jcmVhdGVVc2VQdWJTdWJIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBzdWJzY3JpYmVycyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUmVkdWNlckhvb2s7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBhY3Rpb24gPSBfcmVmLmFjdGlvbixcbiAgICAgICAgcHJvcHNUb0FjdGlvbiA9IF9yZWYucHJvcHNUb0FjdGlvbixcbiAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2FjdGlvbicsICdwcm9wc1RvQWN0aW9uJ10pO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgZGlzcGF0Y2goYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHByb3BzVG9BY3Rpb24pIHtcbiAgICAgIGRpc3BhdGNoKHByb3BzVG9BY3Rpb24ocmVzdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJzxEaXNwYXRjaD4gZXhwZWN0cyBcImFjdGlvblwiIG9yIFwicHJvcHNUb0FjdGlvblwiIHByb3AuJyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVc2VSZWR1Y2VySG9vayh1c2VTdGF0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xuICAgIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShpbml0aWFsU3RhdGUpLFxuICAgICAgICBfdXNlU3RhdGUyID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAzKSxcbiAgICAgICAgc3RhdGUgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgICBzZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMV0sXG4gICAgICAgIGdldFN0YXRlID0gX3VzZVN0YXRlMlsyXTtcblxuICAgIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHNldFN0YXRlKHJlZHVjZXIoZ2V0U3RhdGUoKSwgYWN0aW9uKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoLCBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpLCAvLyA8RGlzcGF0Y2g+XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldFN0YXRlKCk7XG4gICAgfSAvLyA8R2V0U3RhdGU+XG4gICAgXTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VTdGF0ZUhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IHN0YXRlczogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0b3JhZ2Uuc3RhdGVzW2luZGV4XSwgZnVuY3Rpb24gKG5ld1N0YXRlKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlc1tpbmRleF0gPSBuZXdTdGF0ZTtcbiAgICAgIGlmICghZWxlbWVudC5pc1J1bm5pbmcoKSkge1xuICAgICAgICBub2RlLnJlcnVuKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XTtcbiAgICB9XTtcbiAgfTtcbn1cblxuY3JlYXRlVXNlU3RhdGVIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBTdG9yYWdlLmVsZW1lbnRzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVmFsaWRIb29rQ29udGV4dDtcbmZ1bmN0aW9uIGlzVmFsaWRIb29rQ29udGV4dChwcm9jZXNzb3IpIHtcbiAgaWYgKCFwcm9jZXNzb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB0ZXJyaWJseSB3cm9uZyBoYXBwZW5lZC4gVGhlIGhvb2sgZmFjdG9yeSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aG91dCBhIHByb2Nlc3Nvci4nKTtcbiAgfVxuICBpZiAoIXByb2Nlc3Nvci5ub2RlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvb2tzIG11c3QgYmUgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIGFuIEFjdE1MIGVsZW1lbnQuJyk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jcmVhdGVSdW50aW1lID0gY3JlYXRlUnVudGltZTtcblxudmFyIF9Qcm9jZXNzb3IgPSByZXF1aXJlKCcuL1Byb2Nlc3NvcicpO1xuXG52YXIgX1Byb2Nlc3NvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Qcm9jZXNzb3IpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50ID0gcmVxdWlyZSgnLi91dGlscy9pc0FjdE1MRWxlbWVudCcpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQWN0TUxFbGVtZW50KTtcblxudmFyIF9BY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9BY3RFbGVtZW50Jyk7XG5cbnZhciBfQWN0RWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY3RFbGVtZW50KTtcblxudmFyIF91c2VDaGlsZHJlbiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlQ2hpbGRyZW4nKTtcblxudmFyIF91c2VDaGlsZHJlbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VDaGlsZHJlbik7XG5cbnZhciBfdXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWxlbWVudCcpO1xuXG52YXIgX3VzZUVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWxlbWVudCk7XG5cbnZhciBfdXNlUHJvZHVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHJvZHVjdCcpO1xuXG52YXIgX3VzZVByb2R1Y3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHJvZHVjdCk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlUmVkdWNlciA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUmVkdWNlcicpO1xuXG52YXIgX3VzZVJlZHVjZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUmVkdWNlcik7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlUnVudGltZSgpIHtcbiAgdmFyIHByb2Nlc3NvciA9ICgwLCBfUHJvY2Vzc29yMi5kZWZhdWx0KSgpO1xuXG4gIGZ1bmN0aW9uIEEoZnVuYywgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfQWN0RWxlbWVudDIuZGVmYXVsdCkoZnVuYywgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfVxuICBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAnICsgZWxlbWVudC50b1N0cmluZygpICsgJyBwYXNzZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzb3IucnVuKGVsZW1lbnQpO1xuICB9XG4gIHZhciBGcmFnbWVudCA9IGZ1bmN0aW9uIEZyYWdtZW50KCkge307XG4gIHZhciB1c2VDaGlsZHJlbiA9ICgwLCBfdXNlQ2hpbGRyZW4yLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VFbGVtZW50ID0gKDAsIF91c2VFbGVtZW50Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlU3RhdGUgPSAoMCwgX3VzZVN0YXRlMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlUHJvZHVjdCA9ICgwLCBfdXNlUHJvZHVjdDIuZGVmYXVsdCkocHJvY2Vzc29yLCB1c2VTdGF0ZSk7XG4gIHZhciB1c2VQdWJTdWIgPSAoMCwgX3VzZVB1YlN1YjIuZGVmYXVsdCkocHJvY2Vzc29yLCB1c2VDaGlsZHJlbik7XG4gIHZhciB1c2VSZWR1Y2VyID0gKDAsIF91c2VSZWR1Y2VyMi5kZWZhdWx0KSh1c2VTdGF0ZSk7XG4gIHZhciB1c2VFZmZlY3QgPSAoMCwgX3VzZUVmZmVjdDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICByZXR1cm4ge1xuICAgIEE6IEEsXG4gICAgcnVuOiBydW4sXG4gICAgRnJhZ21lbnQ6IEZyYWdtZW50LFxuICAgIHByb2Nlc3NvcjogcHJvY2Vzc29yLFxuICAgIHVzZUNoaWxkcmVuOiB1c2VDaGlsZHJlbixcbiAgICB1c2VFbGVtZW50OiB1c2VFbGVtZW50LFxuICAgIHVzZVByb2R1Y3Q6IHVzZVByb2R1Y3QsXG4gICAgdXNlUHViU3ViOiB1c2VQdWJTdWIsXG4gICAgdXNlU3RhdGU6IHVzZVN0YXRlLFxuICAgIHVzZVJlZHVjZXI6IHVzZVJlZHVjZXIsXG4gICAgdXNlRWZmZWN0OiB1c2VFZmZlY3RcbiAgfTtcbn1cblxudmFyIHJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZVJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0FjdE1MRWxlbWVudDtcbmZ1bmN0aW9uIGlzQWN0TUxFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5fX2FjdG1sID09PSB0cnVlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBrZXlMaXN0ID0gT2JqZWN0LmtleXM7XG52YXIgaGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIHZhciBhcnJBID0gaXNBcnJheShhKVxuICAgICAgLCBhcnJCID0gaXNBcnJheShiKVxuICAgICAgLCBpXG4gICAgICAsIGxlbmd0aFxuICAgICAgLCBrZXk7XG5cbiAgICBpZiAoYXJyQSAmJiBhcnJCKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGRhdGVBID0gYSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICwgZGF0ZUIgPSBiIGluc3RhbmNlb2YgRGF0ZTtcbiAgICBpZiAoZGF0ZUEgIT0gZGF0ZUIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBhLmdldFRpbWUoKSA9PSBiLmdldFRpbWUoKTtcblxuICAgIHZhciByZWdleHBBID0gYSBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgLCByZWdleHBCID0gYiBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICBpZiAocmVnZXhwQSAhPSByZWdleHBCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG5cbiAgICB2YXIga2V5cyA9IGtleUxpc3QoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoICE9PSBrZXlMaXN0KGIpLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghaGFzUHJvcC5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIWVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQyOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZvY3VzRmllbGQgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENoZWNrRm9yRWRpdEZpZWxkKHsgdG9kb3MgfSkge1xuICByZXR1cm4gPEZvY3VzRmllbGQgaW5kZXg9eyB0b2Rvcy5maW5kSW5kZXgoKHsgZWRpdGluZyB9KSA9PiBlZGl0aW5nKSB9IC8+O1xufVxuIiwiaW1wb3J0IHsgdXNlQ2hpbGRyZW4gfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQge1xuICBUT0dHTEUsXG4gIE5FV19UT0RPLFxuICBERUxFVEUsXG4gIEVESVQsXG4gIEVESVRfVE9ETyxcbiAgQ0xFQVJfQ09NUExFVEVEXG59IGZyb20gJy4vU3RvcmUnO1xuXG5pbXBvcnQge1xuICBGSUxURVJfQUxMLFxuICBGSUxURVJfQUNUSVZFLFxuICBGSUxURVJfQ09NUExFVEVEXG59IGZyb20gJy4vRmlsdGVyJztcblxuY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBsaXN0ID0gJCgnLnRvZG8tbGlzdCcpO1xuY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuXG5jb25zdCBFTlRFUiA9IDEzO1xuY29uc3QgRVNDID0gMjc7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKCkge1xuICBjb25zdCBbICwgY29udGVudCBdID0gdXNlQ2hpbGRyZW4oKTtcblxuICBsaXN0LmlubmVySFRNTCA9IGNvbnRlbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihUT0dHTEUsIHRvZG9JbmRleCk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZGVsZXRlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihERUxFVEUsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9XG4gIH0pO1xuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRVNDKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV3JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgb25Vc2VyQWN0aW9uKE5FV19UT0RPLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gRm9jdXNGaWVsZCh7IGluZGV4IH0pIHtcbiAgY29uc3QgZWwgPSAkKGAuZWRpdFtkYXRhLWluZGV4PVwiJHsgaW5kZXggfVwiXWApO1xuXG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPSBlbC52YWx1ZS5sZW5ndGg7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3NDaGVja2VyKHsgdG9kb3MgfSkge1xuICBjb25zdCBjb21wbGV0ZWQgPSB0b2Rvcy5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IGNvbXBsZXRlZCkubGVuZ3RoO1xuICBjb25zdCBpdGVtc0xlZnQgPSB0b2Rvcy5sZW5ndGggLSBjb21wbGV0ZWQ7XG5cbiAgJCgnW2RhdGEtY291bnRdJykuaW5uZXJIVE1MID0gYFxuICAgIDxzdHJvbmc+JHsgaXRlbXNMZWZ0IH08L3N0cm9uZz4gJHsgaXRlbXNMZWZ0ID4gMSB8fCBpdGVtc0xlZnQgPT09IDAgPyAnaXRlbXMnIDogJ2l0ZW0nIH0gbGVmdFxuICBgO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGb290ZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICAkKCdbZGF0YS1maWx0ZXJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWxsJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUxMKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9BQ1RJVkUpO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWNvbXBsZXRlZCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0NPTVBMRVRFRCk7XG4gICAgfVxuICB9KTtcbiAgJCgnW2RhdGEtY2xlYXItY29tcGxldGVkXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG9uVXNlckFjdGlvbihDTEVBUl9DT01QTEVURUQpO1xuICB9KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlsdGVyT3B0aW9uc1RhYnMoeyBmaWx0ZXIgfSkge1xuICAkKCdbZGF0YS1hbGxdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FMTCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICQoJ1tkYXRhLWFjdGl2ZV0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUNUSVZFID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgJCgnW2RhdGEtY29tcGxldGVkXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQgPyAnc2VsZWN0ZWQnIDogJycpO1xufVxuIiwiLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSwgRnJhZ21lbnQsIHVzZVByb2R1Y3QsIHVzZVB1YlN1YiwgdXNlU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5leHBvcnQgY29uc3QgRklMVEVSX0FMTCA9ICdGSUxURVJfQUxMJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQUNUSVZFID0gJ0ZJTFRFUl9BQ1RJVkUnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9DT01QTEVURUQgPSAnRklMVEVSX0NPTVBMRVRFRCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpbHRlcigpIHtcbiAgY29uc3QgWyBmaWx0ZXIsIHNldEZpbHRlciBdID0gdXNlU3RhdGUoRklMVEVSX0FMTCk7XG4gIGNvbnN0IHsgU3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcblxuICB1c2VQcm9kdWN0KGZpbHRlcik7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBGSUxURVJfQUxMIH0+XG4gICAgICAgIHsgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9BTEwpIH1cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRklMVEVSX0FDVElWRSB9PlxuICAgICAgICB7ICgpID0+IHNldEZpbHRlcihGSUxURVJfQUNUSVZFKSB9XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEZJTFRFUl9DT01QTEVURUQgfT5cbiAgICAgICAgeyAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0NPTVBMRVRFRCkgfVxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyB1c2VQcm9kdWN0IH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vU3RvcmUnO1xuXG5jb25zdCBpbml0aWFsVmFsdWUgPSBKU09OLnN0cmluZ2lmeShbXG4gIFRvRG8oeyBsYWJlbDogJ0FjdE1MIGlzIHVzaW5nIEpTWCcgfSksXG4gIFRvRG8oeyBsYWJlbDogJ0l0IGlzIGxpa2UgUmVhY3QgYnV0IG5vdCBmb3IgcmVuZGVyaW5nJyB9KVxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgUHJvdmlkZXI6ICgpID0+IHtcbiAgICB1c2VQcm9kdWN0KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykgfHwgaW5pdGlhbFZhbHVlKSk7XG4gIH0sXG4gIFN0b3JhZ2U6ICh7IHRvZG9zIH0pID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICB9XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZpbGxDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBGSUxURVJfQUxMLCBGSUxURVJfQUNUSVZFLCBGSUxURVJfQ09NUExFVEVEIH0gZnJvbSAnLi9GaWx0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlcih7IHRvZG9zLCBmaWx0ZXIgfSkge1xuICByZXR1cm4gKFxuICAgIDxGaWxsQ29udGFpbmVyPlxuICAgICAge1xuICAgICAgICB0b2Rvc1xuICAgICAgICAuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiB7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FMTCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSkgcmV0dXJuICFjb21wbGV0ZWQ7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCkgcmV0dXJuIGNvbXBsZXRlZDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLm1hcCgodG9kbywgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpQ2xhc3MgPSB0b2RvLmVkaXRpbmcgPyAnZWRpdGluZycgOiAodG9kby5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnKTtcblxuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9JyR7IGxpQ2xhc3MgfSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGVcbiAgICAgICAgICAgICAgICAgICR7IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfT5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtbGFiZWw+JHsgdG9kby5sYWJlbCB9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImRlc3Ryb3lcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWRlbGV0ZT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXRcIiB2YWx1ZT1cIiR7IHRvZG8ubGFiZWwgfVwiIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWVkaXQ+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgICB9XG4gICAgPC9GaWxsQ29udGFpbmVyPlxuICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIEZyYWdtZW50LCB1c2VSZWR1Y2VyLCB1c2VQcm9kdWN0LCB1c2VQdWJTdWIgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFID0gJ1RPR0dMRSc7XG5leHBvcnQgY29uc3QgTkVXX1RPRE8gPSAnTkVXX1RPRE8nO1xuZXhwb3J0IGNvbnN0IERFTEVURSA9ICdERUxFVEUnO1xuZXhwb3J0IGNvbnN0IEVESVQgPSAnRURJVCc7XG5leHBvcnQgY29uc3QgRURJVF9UT0RPID0gJ0VESVRfVE9ETyc7XG5leHBvcnQgY29uc3QgQ0xFQVJfQ09NUExFVEVEID0gJ0NMRUFSX0NPTVBMRVRFRCc7XG5cbmNvbnN0IHRvZ2dsZSA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IFRPR0dMRSwgdG9kb0luZGV4IH0pO1xuY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IERFTEVURSwgdG9kb0luZGV4IH0pO1xuY29uc3QgbmV3VG9kbyA9IChsYWJlbCkgPT4gKHsgdHlwZTogTkVXX1RPRE8sIGxhYmVsIH0pO1xuY29uc3QgZWRpdCA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IEVESVQsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGVkaXRUb0RvID0gKHsgaW5kZXgsIGxhYmVsIH0pID0+ICh7IHR5cGU6IEVESVRfVE9ETywgaW5kZXgsIGxhYmVsIH0pO1xuY29uc3QgY2xlYXJDb21wbGV0ZWQgPSAoKSA9PiAoeyB0eXBlOiBDTEVBUl9DT01QTEVURUQgfSk7XG5cbmV4cG9ydCBjb25zdCBUb0RvID0gKHsgbGFiZWwgfSkgPT4gKHsgbGFiZWwsIGNvbXBsZXRlZDogZmFsc2UsIGVkaXRpbmc6IGZhbHNlIH0pO1xuY29uc3QgcmVkdWNlciA9IGZ1bmN0aW9uICh0b2RvcywgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRTpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkOiAhdG9kby5jb21wbGV0ZWRcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBlZGl0aW5nOiAhdG9kby5lZGl0aW5nXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVF9UT0RPOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24uaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGxhYmVsOiBhY3Rpb24ubGFiZWwsXG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIE5FV19UT0RPOlxuICAgICAgcmV0dXJuIFsgLi4udG9kb3MsIFRvRG8oeyBsYWJlbDogYWN0aW9uLmxhYmVsIH0pIF07XG4gICAgY2FzZSBERUxFVEU6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggIT09IGFjdGlvbi50b2RvSW5kZXgpO1xuICAgIGNhc2UgQ0xFQVJfQ09NUExFVEVEOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbykgPT4gIXRvZG8uY29tcGxldGVkKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRvZG9zO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yZSh7IGluaXRpYWxWYWx1ZSB9KSB7XG4gIGNvbnN0IFsgdG9kb3MsICwgRGlzcGF0Y2ggXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgeyBTdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuXG4gIHVzZVByb2R1Y3QodG9kb3MpO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgVE9HR0xFIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZDogdG9kb0luZGV4IH0pID0+IHRvZ2dsZSh0b2RvSW5kZXgpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgTkVXX1RPRE8gfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkOiBsYWJlbCB9KSA9PiBuZXdUb2RvKGxhYmVsKSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IERFTEVURSB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IHRvZG9JbmRleCB9KSA9PiBkZWxldGVUb2RvKHRvZG9JbmRleCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBFRElUIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZDogdG9kb0luZGV4IH0pID0+IGVkaXQodG9kb0luZGV4KSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEVESVRfVE9ETyB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQgfSkgPT4gZWRpdFRvRG8ocGF5bG9hZCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBDTEVBUl9DT01QTEVURUQgfT5cbiAgICAgICAgPERpc3BhdGNoIGFjdGlvbj17IGNsZWFyQ29tcGxldGVkKCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIHJ1biwgRnJhZ21lbnQsIHVzZVB1YlN1YiB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBDaGVja0ZvckVkaXRGaWVsZCBmcm9tICcuL0NoZWNrRm9yRWRpdEZpZWxkJztcbmltcG9ydCB7IFByb2dyZXNzQ2hlY2tlciwgRmlsdGVyT3B0aW9uc1RhYnMsIENvbnRhaW5lciwgRm9vdGVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IEZpbHRlciBmcm9tICcuL0ZpbHRlcic7XG5pbXBvcnQgUGVyc2lzdCBmcm9tICcuL1BlcnNpc3QnO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IHsgcHVibGlzaCB9ID0gdXNlUHViU3ViKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8Q29udGFpbmVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfSAvPlxuICAgICAgPEZvb3RlciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0vPlxuICAgICAgPFBlcnNpc3QuUHJvdmlkZXIgZXhwb3J0cz0naW5pdGlhbFZhbHVlJyAvPlxuICAgICAgPFN0b3JlIGV4cG9ydHM9J3RvZG9zJyAkaW5pdGlhbFZhbHVlPlxuICAgICAgICA8RmlsdGVyIGV4cG9ydHM9J2ZpbHRlcic+XG4gICAgICAgICAgPFJlbmRlcmVyICR0b2RvcyAkZmlsdGVyIC8+XG4gICAgICAgICAgPEZpbHRlck9wdGlvbnNUYWJzICRmaWx0ZXIgLz5cbiAgICAgICAgPC9GaWx0ZXI+XG4gICAgICAgIDxDaGVja0ZvckVkaXRGaWVsZCAkdG9kb3MgLz5cbiAgICAgICAgPFByb2dyZXNzQ2hlY2tlciAkdG9kb3MgLz5cbiAgICAgICAgPFBlcnNpc3QuU3RvcmFnZSAkdG9kb3MgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=