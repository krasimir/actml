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
    id: null,
    props: props,
    name: getFuncName(func),
    children: children,
    initialize: function initialize(id) {
      var used = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.id = id;
      this.__used = used;
      this.__running = false;
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
    enter: function enter() {
      this.__running = true;
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
/* eslint-disable no-use-before-define, consistent-return */


var CHILDREN = '__ACTML_CHILDREN__';
var CONSUME = 'CONSUME';
var PROCESS_RESULT = 'PROCESS_RESULT';
var RETURNED_ELEMENT = 'RETURNED_ELEMENT';
var CHILD = 'CHILD';

var isGenerator = function isGenerator(obj) {
  return obj && typeof obj['next'] === 'function';
};

var isPromise = function isPromise(obj) {
  return obj && typeof obj['then'] === 'function';
};

function createChildrenFunc(node, processNode) {
  var f = function f() {
    var _arguments = arguments;
    var children = node.element.children;

    if (children && children.length > 0) {
      var queueItemsToAdd = [];
      var results = [];
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
            results.push(funcResult);
          }
        } else {
          results.push(children[i]);
        }
      };

      for (var i = 0; i < children.length; i++) {
        _loop(i);
      }

      queueItemsToAdd.reverse().forEach(function (func) {
        childrenQueue.prependItem(CHILD, func, function (r) {
          return results.push(r);
        });
      });
      childrenQueue.process();
      return childrenQueue.onDone(function () {
        return results;
      });
    }
  };

  f[CHILDREN] = true;
  return f;
}

function createProcessor() {
  var tree = (0, _Tree2.default)();
  var currentNode = null;

  var processNode = function processNode(node) {
    currentNode = node;
    node.enter();

    node.rerun = function () {
      return processNode(node);
    };

    node.element.mergeProps({
      children: createChildrenFunc(node, processNode)
    });
    var results = {};
    var queue = (0, _Queue2.default)(' ' + node.element.name); // CONSUME

    queue.add(CONSUME, function () {
      return node.element.consume();
    }, function (result) {
      return results[CONSUME] = result;
    }); // PROCESS_RESULT

    queue.add(PROCESS_RESULT, function () {
      var consumption = results[CONSUME]; // ActML element

      if ((0, _isActMLElement2.default)(consumption)) {
        queue.prependItem(RETURNED_ELEMENT, function () {
          return processNode(node.addChildNode(consumption));
        }, function (result) {
          return results[RETURNED_ELEMENT] = result;
        }); // generator
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
        }); // children
      } else if (consumption && consumption[CHILDREN]) {
        queue.prependItem(RETURNED_ELEMENT, function () {
          return consumption();
        }, function (result) {
          results[RETURNED_ELEMENT] = result && result.length === 1 ? result[0] : result;
        });
      }
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
exports.default = createUsePubSubHook;

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var subscribers = {};

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
      subscribers: subscribers
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
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var dispatch = function dispatch(action) {
      return setState(reducer(state(), action));
    };

    return [state, dispatch, createDispatchElement(dispatch), // <Dispatch>
    function () {
      return state();
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

    return [function () {
      return storage.states[index];
    }, function (newState) {
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

var _useElement = __webpack_require__(/*! ./hooks/useElement */ "../../lib/hooks/useElement.js");

var _useElement2 = _interopRequireDefault(_useElement);

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

  var Fragment = function Fragment(_ref) {
    var children = _ref.children;
    return children;
  };

  var useElement = (0, _useElement2.default)(processor);
  var useState = (0, _useState2.default)(processor);
  var usePubSub = (0, _usePubSub2.default)(processor);
  var useReducer = (0, _useReducer2.default)(useState);
  var useEffect = (0, _useEffect2.default)(processor);
  return {
    A: A,
    run: run,
    Fragment: Fragment,
    processor: processor,
    useElement: useElement,
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
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_2__);




var $ = function $(selector) {
  return document.querySelector(selector);
};

var list = $('.todo-list');
var header = $('.header');
var ENTER = 13;
var ESC = 27;
function FillContainer(_ref) {
  var children = _ref.children;
  list.innerHTML = children();
}
function Container(_ref2) {
  var onUserAction = _ref2.onUserAction;
  Object(_lib__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    list.addEventListener('click', function (e) {
      var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

      if (e.target.hasAttribute('data-toggle')) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["TOGGLE"], todoIndex);
      } else if (e.target.hasAttribute('data-delete')) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["DELETE"], todoIndex);
      }
    });
    list.addEventListener('dblclick', function (e) {
      var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

      if (e.target.hasAttribute('data-label')) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["EDIT"], todoIndex);
      }
    });
    list.addEventListener('focusout', function (e) {
      var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

      if (e.target.hasAttribute('data-edit')) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["EDIT_TODO"], {
          index: todoIndex,
          label: e.target.value
        });
      }
    });
    list.addEventListener('keyup', function (e) {
      var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

      if (e.target.hasAttribute('data-edit') && e.keyCode === ENTER) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["EDIT_TODO"], {
          index: todoIndex,
          label: e.target.value
        });
      } else if (e.target.hasAttribute('data-edit') && e.keyCode === ESC) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["EDIT"], todoIndex);
      }
    });
    header.addEventListener('keyup', function (e) {
      if (e.target.hasAttribute('data-new') && e.keyCode === ENTER) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["NEW_TODO"], e.target.value);
        e.target.value = '';
      }
    });
  }, []);
}
function FocusField(_ref3) {
  var index = _ref3.index;
  var el = $(".edit[data-index=\"".concat(index, "\"]"));

  if (el) {
    el.focus();
    el.selectionStart = el.selectionEnd = el.value.length;
  }
}
;
function ProgressChecker(_ref4) {
  var todos = _ref4.todos;
  var completed = todos.filter(function (_ref5) {
    var completed = _ref5.completed;
    return completed;
  }).length;
  var itemsLeft = todos.length - completed;
  $('[data-count]').innerHTML = "\n    <strong>".concat(itemsLeft, "</strong> ").concat(itemsLeft > 1 || itemsLeft === 0 ? 'items' : 'item', " left\n  ");
}
;
function Footer(_ref6) {
  var onUserAction = _ref6.onUserAction;
  Object(_lib__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    $('[data-filter]').addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-all')) {
        onUserAction(___WEBPACK_IMPORTED_MODULE_1__["FILTER_ALL"]);
      } else if (e.target.hasAttribute('data-active')) {
        onUserAction(___WEBPACK_IMPORTED_MODULE_1__["FILTER_ACTIVE"]);
      } else if (e.target.hasAttribute('data-completed')) {
        onUserAction(___WEBPACK_IMPORTED_MODULE_1__["FILTER_COMPLETED"]);
      }
    });
    $('[data-clear-completed]').addEventListener('click', function () {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["CLEAR_COMPLETED"]);
    });
  }, []);
}
;
function FilterOptionsTabs(_ref7) {
  var filter = _ref7.filter;
  Object(_lib__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    $('[data-all]').setAttribute('class', filter === ___WEBPACK_IMPORTED_MODULE_1__["FILTER_ALL"] ? 'selected' : '');
    $('[data-active]').setAttribute('class', filter === ___WEBPACK_IMPORTED_MODULE_1__["FILTER_ACTIVE"] ? 'selected' : '');
    $('[data-completed]').setAttribute('class', filter === ___WEBPACK_IMPORTED_MODULE_1__["FILTER_COMPLETED"] ? 'selected' : '');
  }, [filter]);
}

/***/ }),

/***/ "./src/Persist.js":
/*!************************!*\
  !*** ./src/Persist.js ***!
  \************************/
/*! exports provided: useLocalStorage, Persist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocalStorage", function() { return useLocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Persist", function() { return Persist; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store */ "./src/Store.js");



var initialValue = JSON.stringify([Object(_Store__WEBPACK_IMPORTED_MODULE_2__["ToDo"])({
  label: 'ActML is using JSX'
}), Object(_Store__WEBPACK_IMPORTED_MODULE_2__["ToDo"])({
  label: 'It is like React but not for rendering'
})]);
var useLocalStorage = function useLocalStorage() {
  var _useState = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useState"])(JSON.parse(localStorage.getItem('todos') || initialValue)),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 1),
      getData = _useState2[0];

  return getData();
};
var Persist = function Persist(_ref) {
  var todos = _ref.todos;
  localStorage.setItem('todos', JSON.stringify(todos));
};

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
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./src/index.js");
/* eslint-disable react/prop-types */

/** @jsx A */



function Renderer(_ref) {
  var todos = _ref.todos,
      filter = _ref.filter;
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["FillContainer"], null, function () {
    return todos.filter(function (_ref2) {
      var completed = _ref2.completed;
      if (filter === ___WEBPACK_IMPORTED_MODULE_2__["FILTER_ALL"]) return true;
      if (filter === ___WEBPACK_IMPORTED_MODULE_2__["FILTER_ACTIVE"]) return !completed;
      if (filter === ___WEBPACK_IMPORTED_MODULE_2__["FILTER_COMPLETED"]) return completed;
      return false;
    }).map(function (todo, i) {
      var liClass = todo.editing ? 'editing' : todo.completed ? 'completed' : '';
      return "\n            <li class='".concat(liClass, "'>\n              <div class=\"view\">\n                <input \n                  class=\"toggle\"\n                  type=\"checkbox\"\n                  data-index=\"").concat(i, "\"\n                  data-toggle\n                  ").concat(todo.completed ? 'checked' : '', ">\n                <label data-index=\"").concat(i, "\" data-label>").concat(todo.label, "</label>\n                <button\n                  class=\"destroy\"\n                  data-index=\"").concat(i, "\"\n                  data-delete></button>\n              </div>\n              <input class=\"edit\" value=\"").concat(todo.label, "\" data-index=\"").concat(i, "\" data-edit>\n            </li>\n          ");
    }).join('');
  });
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
  var initialValue = _ref3.initialValue,
      children = _ref3.children;

  var _useReducer = Object(_lib__WEBPACK_IMPORTED_MODULE_3__["useReducer"])(reducer, initialValue),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useReducer, 2),
      todos = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_3__["usePubSub"])(),
      subscribe = _usePubSub.subscribe;

  Object(_lib__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    subscribe(TOGGLE, function (todoIndex) {
      return dispatch(toggle(todoIndex));
    });
    subscribe(NEW_TODO, function (label) {
      return dispatch(newTodo(label));
    });
    subscribe(DELETE, function (todoIndex) {
      return dispatch(deleteTodo(todoIndex));
    });
    subscribe(EDIT, function (label) {
      return dispatch(edit(label));
    });
    subscribe(EDIT_TODO, function (payload) {
      return dispatch(editToDo(payload));
    });
    subscribe(CLEAR_COMPLETED, function () {
      return dispatch(clearCompleted());
    });
  }, []);
  children({
    todos: todos()
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_ALL", function() { return FILTER_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_ACTIVE", function() { return FILTER_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_COMPLETED", function() { return FILTER_COMPLETED; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.js");
/* harmony import */ var _CheckForEditField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CheckForEditField */ "./src/CheckForEditField.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Persist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Persist */ "./src/Persist.js");


/** @jsx A */






var FILTER_ALL = 'FILTER_ALL';
var FILTER_ACTIVE = 'FILTER_ACTIVE';
var FILTER_COMPLETED = 'FILTER_COMPLETED';

function App() {
  var initialValue = Object(_Persist__WEBPACK_IMPORTED_MODULE_6__["useLocalStorage"])();

  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["usePubSub"])(),
      publish = _usePubSub.publish,
      subscribe = _usePubSub.subscribe;

  var _useState = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useState"])(FILTER_ALL),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    subscribe(FILTER_ALL, function () {
      return setFilter(FILTER_ALL);
    });
    subscribe(FILTER_ACTIVE, function () {
      return setFilter(FILTER_ACTIVE);
    });
    subscribe(FILTER_COMPLETED, function () {
      return setFilter(FILTER_COMPLETED);
    });
  }, []);
  return Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_lib__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_5__["Container"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_5__["Footer"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_Store__WEBPACK_IMPORTED_MODULE_2__["default"], {
    initialValue: initialValue
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_5__["FilterOptionsTabs"], {
    filter: filter()
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_Renderer__WEBPACK_IMPORTED_MODULE_3__["default"], {
    filter: filter()
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_CheckForEditField__WEBPACK_IMPORTED_MODULE_4__["default"], null), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_5__["ProgressChecker"], null), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_Persist__WEBPACK_IMPORTED_MODULE_6__["Persist"], null)));
}

;
Object(_lib__WEBPACK_IMPORTED_MODULE_1__["run"])(Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(App, null));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUXVldWUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9UcmVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlRWZmZWN0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVB1YlN1Yi5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvdXRpbHMvaXNBY3RNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL25vZGVfbW9kdWxlcy9mYXN0LWRlZXAtZXF1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2hlY2tGb3JFZGl0RmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyc2lzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImdldEZ1bmNOYW1lIiwiZnVuYyIsIm5hbWUiLCJyZXN1bHQiLCJleGVjIiwidG9TdHJpbmciLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsIkVycm9yIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJlbnRlciIsImNvbnN1bWUiLCJvdXQiLCJkZWZhdWx0IiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3VzZUVmZmVjdCIsIl91c2VFZmZlY3QyIiwiX1F1ZXVlIiwiX1F1ZXVlMiIsIm9iaiIsIl9fZXNNb2R1bGUiLCJDSElMRFJFTiIsIkNPTlNVTUUiLCJQUk9DRVNTX1JFU1VMVCIsIlJFVFVSTkVEX0VMRU1FTlQiLCJDSElMRCIsImlzR2VuZXJhdG9yIiwiaXNQcm9taXNlIiwiY3JlYXRlQ2hpbGRyZW5GdW5jIiwibm9kZSIsInByb2Nlc3NOb2RlIiwiZiIsIl9hcmd1bWVudHMiLCJlbGVtZW50IiwicXVldWVJdGVtc1RvQWRkIiwicmVzdWx0cyIsImNoaWxkcmVuUXVldWUiLCJfbG9vcCIsImkiLCJfY2hpbGRyZW4kaSIsImFwcGx5IiwicHVzaCIsImFkZENoaWxkTm9kZSIsImZ1bmNSZXN1bHQiLCJyZXZlcnNlIiwiZm9yRWFjaCIsInByZXBlbmRJdGVtIiwiciIsInByb2Nlc3MiLCJvbkRvbmUiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJyZXJ1biIsInF1ZXVlIiwiYWRkIiwiY29uc3VtcHRpb24iLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwiZ2VuZXJhdG9yRG9uZSIsImdlblJlc3VsdCIsIml0ZXJhdGUiLCJuZXh0IiwiZG9uZSIsInJlcyIsInRoZW4iLCJfcmVzIiwicnVuIiwicm9vdE5vZGUiLCJyZXNvbHZlUm9vdCIsIm9uTm9kZUVudGVyIiwiY2FsbGJhY2siLCJhZGROb2RlRW50ZXJDYWxsYmFjayIsIm9uTm9kZU91dCIsImFkZE5vZGVPdXRDYWxsYmFjayIsIm9uTm9kZVJlbW92ZSIsInN5c3RlbSIsInJlc2V0IiwiY2xlYXIiLCJjcmVhdGVRdWV1ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImFycjIiLCJmcm9tIiwiTE9HUyIsImxvZyIsIl9jb25zb2xlIiwiY29uc29sZSIsImNyZWF0ZUl0ZW0iLCJ0eXBlIiwiY29udGV4dCIsIml0ZW1zIiwiYXN5bmMiLCJydW5uaW5nIiwicmVsZWFzZSIsImNvbmNhdCIsImxhc3RSZXN1bHQiLCJfdGhpcyIsIml0ZW0iLCJzaGlmdCIsImFzeW5jUmVzdWx0IiwiY2F0Y2giLCJlcnJvciIsImdldFJlc3VsdCIsInJlamVjdCIsIlRyZWUiLCJfb25Ob2RlUmVtb3ZlIiwicm9vdCIsImNyZWF0ZU5ld05vZGUiLCJpZHMiLCJnZXRJZCIsInVzZVNhbWVOb2RlIiwibmV3RWxlbWVudCIsInRyZWVEaWZmIiwib2xkRWxlbWVudCIsImtleSIsInBhcmVudCIsImN1cnNvciIsImMiLCJfdGhpczIiLCJzcGxpY2UiLCJyZW1vdmVkTm9kZSIsIl90aGlzMyIsImNoaWxkTm9kZSIsIm5ld0NoaWxkTm9kZSIsImdldE51bU9mRWxlbWVudHMiLCJkaWFnbm9zZSIsImxvb3BPdmVyIiwiaW5kIiwibWFwIiwiY2hpbGQiLCJfZmFzdERlZXBFcXVhbCIsIl9mYXN0RGVlcEVxdWFsMiIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsIlN0b3JhZ2UiLCJlbGVtZW50cyIsImdldCIsImVmZmVjdHMiLCJjb25zdW1lciIsImNsZWFuVXAiLCJjcmVhdGVFZmZlY3QiLCJkZXBzIiwidXBkYXRlRWZmZWN0IiwiZWZmZWN0Iiwib2xkRGVwcyIsImRlcHNFcXVhbCIsIm5ld0RlcHMiLCJyZXNvbHZlRWZmZWN0IiwiYXJlRXF1YWwiLCJjcmVhdGVVc2VFZmZlY3RIb29rIiwicHJvY2Vzc29yIiwic3RvcmFnZSIsImluZGV4IiwiY3JlYXRlVXNlRWxlbWVudEhvb2siLCJjcmVhdGVVc2VQdWJTdWJIb29rIiwic3Vic2NyaWJlcnMiLCJzdWJzY3JpYmUiLCJwdWJsaXNoIiwicGF5bG9hZCIsImtleXMiLCJzY29wZWRFbGVtZW50IiwiZWwiLCJzdWJzY3JpYmVGdW5jIiwiX2xlbiIsInBhcmFtcyIsIl9rZXkiLCJwdWJsaXNoRnVuYyIsIl9zbGljZWRUb0FycmF5Iiwic2xpY2VJdGVyYXRvciIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJfaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3MiLCJlcnIiLCJUeXBlRXJyb3IiLCJjcmVhdGVVc2VSZWR1Y2VySG9vayIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsInRhcmdldCIsImluZGV4T2YiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsIl9yZWYiLCJhY3Rpb24iLCJwcm9wc1RvQWN0aW9uIiwicmVzdCIsInVzZVN0YXRlIiwicmVkdWNlciIsImluaXRpYWxTdGF0ZSIsInN0YXRlIiwic2V0U3RhdGUiLCJjcmVhdGVVc2VTdGF0ZUhvb2siLCJzdGF0ZXMiLCJuZXdTdGF0ZSIsImlzVmFsaWRIb29rQ29udGV4dCIsImNyZWF0ZVJ1bnRpbWUiLCJfUHJvY2Vzc29yIiwiX1Byb2Nlc3NvcjIiLCJfQWN0RWxlbWVudCIsIl9BY3RFbGVtZW50MiIsIl91c2VFbGVtZW50IiwiX3VzZUVsZW1lbnQyIiwiX3VzZVJlZHVjZXIiLCJfdXNlUmVkdWNlcjIiLCJBIiwiRnJhZ21lbnQiLCJ1c2VFbGVtZW50IiwidXNlUHViU3ViIiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsInJ1bnRpbWUiLCJtb2R1bGUiLCJpc0FjdE1MRWxlbWVudCIsIkNoZWNrRm9yRWRpdEZpZWxkIiwidG9kb3MiLCJmaW5kSW5kZXgiLCJlZGl0aW5nIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGlzdCIsImhlYWRlciIsIkVOVEVSIiwiRVNDIiwiRmlsbENvbnRhaW5lciIsImlubmVySFRNTCIsIkNvbnRhaW5lciIsIm9uVXNlckFjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidG9kb0luZGV4IiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJUT0dHTEUiLCJERUxFVEUiLCJFRElUIiwiRURJVF9UT0RPIiwibGFiZWwiLCJrZXlDb2RlIiwiTkVXX1RPRE8iLCJGb2N1c0ZpZWxkIiwiZm9jdXMiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsIlByb2dyZXNzQ2hlY2tlciIsImNvbXBsZXRlZCIsImZpbHRlciIsIml0ZW1zTGVmdCIsIkZvb3RlciIsIkZJTFRFUl9BTEwiLCJGSUxURVJfQUNUSVZFIiwiRklMVEVSX0NPTVBMRVRFRCIsIkNMRUFSX0NPTVBMRVRFRCIsIkZpbHRlck9wdGlvbnNUYWJzIiwic2V0QXR0cmlidXRlIiwiaW5pdGlhbFZhbHVlIiwiSlNPTiIsInN0cmluZ2lmeSIsIlRvRG8iLCJ1c2VMb2NhbFN0b3JhZ2UiLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXREYXRhIiwiUGVyc2lzdCIsInNldEl0ZW0iLCJSZW5kZXJlciIsInRvZG8iLCJsaUNsYXNzIiwiam9pbiIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVkaXRUb0RvIiwiY2xlYXJDb21wbGV0ZWQiLCJTdG9yZSIsIkFwcCIsInNldEZpbHRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYkEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUdBLFNBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLE1BQUlBLElBQUksQ0FBQ0MsSUFBVCxFQUFlLE9BQU9ELElBQUksQ0FBQ0MsSUFBWjtBQUNmLE1BQUlDLE1BQU0sR0FBRyw2QkFBNkJDLElBQTdCLENBQWtDSCxJQUFJLENBQUNJLFFBQUwsRUFBbEMsQ0FBYjtBQUVBLFNBQU9GLE1BQU0sR0FBR0Es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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLGtCQUFrQjtBQUNuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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QUYzQjtBQUFBLE1BRUx4RCxPQUZLLGNBRUxBLE9BRks7QUFBQSxNQUVJRCxTQUZKLGNBRUlBLFNBRko7O0FBQUEsa0JBR2lCb0MscURBQVEsQ0FBQ2lFLFVBQUQsQ0FIekI7QUFBQTtBQUFBLE1BR0xILE1BSEs7QUFBQSxNQUdHZ0MsU0FISDs7QUFLYnZFLHdEQUFTLENBQUMsWUFBTTtBQUNkM0QsYUFBUyxDQUFDcUcsVUFBRCxFQUFhO0FBQUEsYUFBTTZCLFNBQVMsQ0FBQzdCLFVBQUQsQ0FBZjtBQUFBLEtBQWIsQ0FBVDtBQUNBckcsYUFBUyxDQUFDc0csYUFBRCxFQUFnQjtBQUFBLGFBQU00QixTQUFTLENBQUM1QixhQUFELENBQWY7QUFBQSxLQUFoQixDQUFUO0FBQ0F0RyxhQUFTLENBQUN1RyxnQkFBRCxFQUFtQjtBQUFBLGFBQU0yQixTQUFTLENBQUMzQixnQkFBRCxDQUFmO0FBQUEsS0FBbkIsQ0FBVDtBQUNELEdBSlEsRUFJTixFQUpNLENBQVQ7QUFNQSxTQUNFLCtDQUFDLDZDQUFELFFBQ0UsK0NBQUMsOENBQUQ7QUFBVyxnQkFBWSxFQUFHdEc7QUFBMUIsSUFERixFQUVFLCtDQUFDLDJDQUFEO0FBQVEsZ0JBQVksRUFBR0E7QUFBdkIsSUFGRixFQUdFLCtDQUFDLDhDQUFEO0FBQU8sZ0JBQVksRUFBRzBHO0FBQXRCLEtBQ0UsK0NBQUMsc0RBQUQ7QUFBbUIsVUFBTSxFQUFHVCxNQUFNO0FBQWxDLElBREYsRUFFRSwrQ0FBQyxpREFBRDtBQUFVLFVBQU0sRUFBR0EsTUFBTTtBQUF6QixJQUZGLEVBR0UsK0NBQUMsMERBQUQsT0FIRixFQUlFLCtDQUFDLG9EQUFELE9BSkYsRUFLRSwrQ0FBQyxnREFBRCxPQUxGLENBSEYsQ0FERjtBQWFEOztBQUFBO0FBRUQ5TCxnREFBRyxDQUFDLCtDQUFDLEdBQUQsT0FBRCxDQUFILEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmZ1bmN0aW9uIGdldEZ1bmNOYW1lKGZ1bmMpIHtcbiAgaWYgKGZ1bmMubmFtZSkgcmV0dXJuIGZ1bmMubmFtZTtcbiAgdmFyIHJlc3VsdCA9IC9eZnVuY3Rpb25cXHMrKFtcXHdcXCRdKylcXHMqXFwoLy5leGVjKGZ1bmMudG9TdHJpbmcoKSk7XG5cbiAgcmV0dXJuIHJlc3VsdCA/IHJlc3VsdFsxXSA6ICd1bmtub3duJztcbn07XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmdW5jLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBY3RNTCBlbGVtZW50IGV4cGVjdHMgYSBmdW5jdGlvbi4gXCInICsgZnVuYyArICdcIiBnaXZlbiBpbnN0ZWFkLicpO1xuICB9XG4gIHJldHVybiB7XG4gICAgX19hY3RtbDogdHJ1ZSxcbiAgICBfX3VzZWQ6IDAsXG4gICAgX19ydW5uaW5nOiBmYWxzZSxcbiAgICBpZDogbnVsbCxcbiAgICBwcm9wczogcHJvcHMsXG4gICAgbmFtZTogZ2V0RnVuY05hbWUoZnVuYyksXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoaWQpIHtcbiAgICAgIHZhciB1c2VkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICB0aGlzLl9fdXNlZCA9IHVzZWQ7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgIH0sXG4gICAgbWVyZ2VQcm9wczogZnVuY3Rpb24gbWVyZ2VQcm9wcyhuZXdQcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICB9LFxuICAgIHVzZWQ6IGZ1bmN0aW9uIHVzZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3VzZWQ7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcnVubmluZztcbiAgICB9LFxuICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcigpIHtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbnN1bWU6IGZ1bmN0aW9uIGNvbnN1bWUoKSB7XG4gICAgICByZXR1cm4gZnVuYyh0aGlzLnByb3BzKTtcbiAgICB9LFxuICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgdGhpcy5fX3VzZWQgKz0gMTtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlRWxlbWVudDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVQcm9jZXNzb3I7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX1RyZWUgPSByZXF1aXJlKCcuL1RyZWUnKTtcblxudmFyIF9UcmVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RyZWUpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG52YXIgX3VzZUVmZmVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWZmZWN0Jyk7XG5cbnZhciBfdXNlRWZmZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVmZmVjdCk7XG5cbnZhciBfUXVldWUgPSByZXF1aXJlKCcuL1F1ZXVlJyk7XG5cbnZhciBfUXVldWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUXVldWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgY29uc2lzdGVudC1yZXR1cm4gKi9cbnZhciBDSElMRFJFTiA9ICdfX0FDVE1MX0NISUxEUkVOX18nO1xuXG52YXIgQ09OU1VNRSA9ICdDT05TVU1FJztcbnZhciBQUk9DRVNTX1JFU1VMVCA9ICdQUk9DRVNTX1JFU1VMVCc7XG52YXIgUkVUVVJORURfRUxFTUVOVCA9ICdSRVRVUk5FRF9FTEVNRU5UJztcbnZhciBDSElMRCA9ICdDSElMRCc7XG5cbnZhciBpc0dlbmVyYXRvciA9IGZ1bmN0aW9uIGlzR2VuZXJhdG9yKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ25leHQnXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG52YXIgaXNQcm9taXNlID0gZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ3RoZW4nXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoaWxkcmVuRnVuYyhub2RlLCBwcm9jZXNzTm9kZSkge1xuICB2YXIgZiA9IGZ1bmN0aW9uIGYoKSB7XG4gICAgdmFyIF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5lbGVtZW50LmNoaWxkcmVuO1xuXG5cbiAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHF1ZXVlSXRlbXNUb0FkZCA9IFtdO1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHZhciBjaGlsZHJlblF1ZXVlID0gKDAsIF9RdWV1ZTIuZGVmYXVsdCkoJyAgJyArIG5vZGUuZWxlbWVudC5uYW1lICsgJzpjaGlsZHJlbicpO1xuXG4gICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XG4gICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICB2YXIgX2NoaWxkcmVuJGk7XG5cbiAgICAgICAgICAoX2NoaWxkcmVuJGkgPSBjaGlsZHJlbltpXSkubWVyZ2VQcm9wcy5hcHBseShfY2hpbGRyZW4kaSwgX2FyZ3VtZW50cyk7XG4gICAgICAgICAgcXVldWVJdGVtc1RvQWRkLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGNoaWxkcmVuW2ldKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNoaWxkcmVuW2ldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFyIGZ1bmNSZXN1bHQgPSBjaGlsZHJlbltpXS5hcHBseShjaGlsZHJlbiwgX2FyZ3VtZW50cyk7XG5cbiAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZnVuY1Jlc3VsdCkpIHtcbiAgICAgICAgICAgIHF1ZXVlSXRlbXNUb0FkZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGZ1bmNSZXN1bHQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goZnVuY1Jlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX2xvb3AoaSk7XG4gICAgICB9XG4gICAgICBxdWV1ZUl0ZW1zVG9BZGQucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgY2hpbGRyZW5RdWV1ZS5wcmVwZW5kSXRlbShDSElMRCwgZnVuYywgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0cy5wdXNoKHIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY2hpbGRyZW5RdWV1ZS5wcm9jZXNzKCk7XG4gICAgICByZXR1cm4gY2hpbGRyZW5RdWV1ZS5vbkRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBmW0NISUxEUkVOXSA9IHRydWU7XG4gIHJldHVybiBmO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9jZXNzb3IoKSB7XG4gIHZhciB0cmVlID0gKDAsIF9UcmVlMi5kZWZhdWx0KSgpO1xuICB2YXIgY3VycmVudE5vZGUgPSBudWxsO1xuXG4gIHZhciBwcm9jZXNzTm9kZSA9IGZ1bmN0aW9uIHByb2Nlc3NOb2RlKG5vZGUpIHtcbiAgICBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgbm9kZS5lbnRlcigpO1xuICAgIG5vZGUucmVydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZSk7XG4gICAgfTtcbiAgICBub2RlLmVsZW1lbnQubWVyZ2VQcm9wcyh7XG4gICAgICBjaGlsZHJlbjogY3JlYXRlQ2hpbGRyZW5GdW5jKG5vZGUsIHByb2Nlc3NOb2RlKVxuICAgIH0pO1xuXG4gICAgdmFyIHJlc3VsdHMgPSB7fTtcbiAgICB2YXIgcXVldWUgPSAoMCwgX1F1ZXVlMi5kZWZhdWx0KSgnICcgKyBub2RlLmVsZW1lbnQubmFtZSk7XG5cbiAgICAvLyBDT05TVU1FXG4gICAgcXVldWUuYWRkKENPTlNVTUUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub2RlLmVsZW1lbnQuY29uc3VtZSgpO1xuICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHRzW0NPTlNVTUVdID0gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLy8gUFJPQ0VTU19SRVNVTFRcbiAgICBxdWV1ZS5hZGQoUFJPQ0VTU19SRVNVTFQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb25zdW1wdGlvbiA9IHJlc3VsdHNbQ09OU1VNRV07XG5cbiAgICAgIC8vIEFjdE1MIGVsZW1lbnRcbiAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjb25zdW1wdGlvbikpIHtcbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjb25zdW1wdGlvbikpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdlbmVyYXRvclxuICAgICAgfSBlbHNlIGlmIChpc0dlbmVyYXRvcihjb25zdW1wdGlvbikpIHtcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IGNvbnN1bXB0aW9uO1xuXG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGdlbmVyYXRvckRvbmUpIHtcbiAgICAgICAgICAgIHZhciBnZW5SZXN1bHQgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiBpdGVyYXRlKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IGdlbmVyYXRvci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKCFnZW5SZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVzID0gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2UocmVzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGUocmVzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVzID0gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2UoX3JlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Jlcy50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRvckRvbmUocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yRG9uZShfcmVzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yRG9uZShnZW5SZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGlsZHJlblxuICAgICAgfSBlbHNlIGlmIChjb25zdW1wdGlvbiAmJiBjb25zdW1wdGlvbltDSElMRFJFTl0pIHtcbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb25zdW1wdGlvbigpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID09PSAxID8gcmVzdWx0WzBdIDogcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJ1bm5pbmcgdGhlIHF1ZXVlXG4gICAgcXVldWUucHJvY2VzcygpO1xuXG4gICAgLy8gR2V0dGluZyB0aGUgcmVzdWx0LiBJdCBpcyBlaXRoZXIgYSBwcm9taXNlIGlmIHRoZXJlIGlzXG4gICAgLy8gc29tZXRoaW5nIGFzeW5jaHJvbm91cyBvciBhIHZhbHVlXG4gICAgcmV0dXJuIHF1ZXVlLm9uRG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLm91dCgpO1xuICAgICAgcmV0dXJuIFJFVFVSTkVEX0VMRU1FTlQgaW4gcmVzdWx0cyA/IHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gOiByZXN1bHRzW0NPTlNVTUVdO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbm9kZTogZnVuY3Rpb24gbm9kZSgpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9LFxuICAgIHJ1bjogZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICAgIHZhciByb290Tm9kZSA9IHRyZWUucmVzb2x2ZVJvb3QoZWxlbWVudCk7XG5cbiAgICAgIHJldHVybiBwcm9jZXNzTm9kZShyb290Tm9kZSk7XG4gICAgfSxcbiAgICBvbk5vZGVFbnRlcjogZnVuY3Rpb24gb25Ob2RlRW50ZXIoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlT3V0OiBmdW5jdGlvbiBvbk5vZGVPdXQoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLm9uTm9kZVJlbW92ZShjYWxsYmFjayk7XG4gICAgfSxcbiAgICBzeXN0ZW06IGZ1bmN0aW9uIHN5c3RlbSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyZWU6IHRyZWUsXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgdHJlZS5yZXNldCgpO1xuICAgICAgICAgIF91c2VQdWJTdWIyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlU3RhdGUyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlRWZmZWN0Mi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVRdWV1ZTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbnZhciBMT0dTID0gZmFsc2U7XG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgcmV0dXJuIExPR1MgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsndGhlbiddID09PSAnZnVuY3Rpb24nO1xufTtcbnZhciBjcmVhdGVJdGVtID0gZnVuY3Rpb24gY3JlYXRlSXRlbSh0eXBlLCBmdW5jKSB7XG4gIHZhciBvbkRvbmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZ1bmN0aW9uICgpIHt9O1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZnVuYzogZnVuYyxcbiAgICBvbkRvbmU6IG9uRG9uZVxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUXVldWUoY29udGV4dCkge1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgdmFyIGFzeW5jID0gZmFsc2U7XG4gIHZhciBydW5uaW5nID0gZmFsc2U7XG4gIHZhciByZWxlYXNlID0gZnVuY3Rpb24gcmVsZWFzZSgpIHt9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGQodHlwZSwgZnVuYywgb25Eb25lKSB7XG4gICAgICBsb2coY29udGV4dCArICc6UTogWy4uLicgKyB0eXBlICsgJ10gKCcgKyAoaXRlbXMubGVuZ3RoICsgMSkgKyAnIHRvdGFsKScpO1xuICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSkpO1xuICAgIH0sXG4gICAgcHJlcGVuZEl0ZW06IGZ1bmN0aW9uIHByZXBlbmRJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSkge1xuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6IFsnICsgdHlwZSArICcuLi5dICgnICsgKGl0ZW1zLmxlbmd0aCArIDEpICsgJyB0b3RhbCknKTtcbiAgICAgIGl0ZW1zID0gW2NyZWF0ZUl0ZW0odHlwZSwgZnVuYywgb25Eb25lKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShpdGVtcykpO1xuICAgIH0sXG4gICAgcHJvY2VzczogZnVuY3Rpb24gcHJvY2VzcyhsYXN0UmVzdWx0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbG9nKGNvbnRleHQgKyAnOlE6ZG9uZScpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlbSA9IGl0ZW1zLnNoaWZ0KCk7XG5cbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiAnICsgaXRlbS50eXBlICsgJygpICgnICsgaXRlbXMubGVuZ3RoICsgJyBsZWZ0KScpO1xuICAgICAgdmFyIHJlc3VsdCA9IGl0ZW0uZnVuYyhsYXN0UmVzdWx0KTtcblxuICAgICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgIGFzeW5jID0gdHJ1ZTtcbiAgICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24gKGFzeW5jUmVzdWx0KSB7XG4gICAgICAgICAgaXRlbS5vbkRvbmUoYXN5bmNSZXN1bHQpO1xuICAgICAgICAgIF90aGlzLnByb2Nlc3MoYXN5bmNSZXN1bHQpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZWxlYXNlKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLm9uRG9uZShyZXN1bHQpO1xuICAgICAgICB0aGlzLnByb2Nlc3MocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uRG9uZTogZnVuY3Rpb24gb25Eb25lKGdldFJlc3VsdCkge1xuICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZG9uZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9uZShnZXRSZXN1bHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0UmVzdWx0KCk7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiBydW5uaW5nO1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gVHJlZTtcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBuby1yZXR1cm4tYXNzaWduLCBtYXgtbGVuICovXG52YXIgTE9HUyA9IGZhbHNlO1xudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBMT0dTID8gKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG5cbmZ1bmN0aW9uIFRyZWUoKSB7XG4gIHZhciBvbk5vZGVFbnRlciA9IFtdO1xuICB2YXIgb25Ob2RlT3V0ID0gW107XG4gIHZhciBfb25Ob2RlUmVtb3ZlID0gW107XG4gIHZhciByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICB2YXIgaWRzID0gMDtcblxuICBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgICByZXR1cm4gJ2EnICsgKytpZHM7XG4gIH07XG4gIGZ1bmN0aW9uIHVzZVNhbWVOb2RlKG5vZGUsIG5ld0VsZW1lbnQpIHtcbiAgICBuZXdFbGVtZW50LmluaXRpYWxpemUobm9kZS5lbGVtZW50LmlkLCBub2RlLmVsZW1lbnQudXNlZCgpKTtcbiAgICBub2RlLmVsZW1lbnQgPSBuZXdFbGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIHRyZWVEaWZmKG9sZEVsZW1lbnQsIG5ld0VsZW1lbnQpIHtcbiAgICBpZiAob2xkRWxlbWVudCAmJiBvbGRFbGVtZW50Lm5hbWUgPT09IG5ld0VsZW1lbnQubmFtZSkge1xuICAgICAgaWYgKG9sZEVsZW1lbnQucHJvcHMgJiYgbmV3RWxlbWVudC5wcm9wcykge1xuICAgICAgICByZXR1cm4gb2xkRWxlbWVudC5wcm9wcy5rZXkgPT09IG5ld0VsZW1lbnQucHJvcHMua2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQsIHBhcmVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmluaXRpYWxpemUoZ2V0SWQoKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICBjdXJzb3I6IDAsXG4gICAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgbG9nKCctPiAnICsgdGhpcy5lbGVtZW50Lm5hbWUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuZW50ZXIoKTtcbiAgICAgICAgb25Ob2RlRW50ZXIuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIGxvZygnPC0gJyArIHRoaXMuZWxlbWVudC5uYW1lKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm91dCgpO1xuICAgICAgICAvLyBJZiB0aGVyZSdyZSBtb3JlIG5vZGVzIGluIHRoZSB0cmVlIHRoYW4gd2hhdCB3YXMgcHJvY2Vzc2VkXG4gICAgICAgIGlmICh0aGlzLmN1cnNvciA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5jdXJzb3IpLmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZWROb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjKHJlbW92ZWROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Vyc29yID0gMDtcbiAgICAgICAgb25Ob2RlT3V0LmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyhfdGhpczIpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBhZGRDaGlsZE5vZGU6IGZ1bmN0aW9uIGFkZENoaWxkTm9kZShuZXdFbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXTtcblxuICAgICAgICAvLyB1c2luZyB0aGUgc2FtZSBub2RlXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgdHJlZURpZmYoY2hpbGROb2RlLmVsZW1lbnQsIG5ld0VsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgICByZXR1cm4gdXNlU2FtZU5vZGUoY2hpbGROb2RlLCBuZXdFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0aW5nIGEgbmV3IG5vZGVcbiAgICAgICAgdmFyIG5ld0NoaWxkTm9kZSA9IGNyZWF0ZU5ld05vZGUobmV3RWxlbWVudCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdKSB7XG4gICAgICAgICAgX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICByZXR1cm4gYyhfdGhpczMuY2hpbGRyZW5bX3RoaXMzLmN1cnNvcl0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdID0gbmV3Q2hpbGROb2RlO1xuICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGROb2RlO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVSb290OiBmdW5jdGlvbiByZXNvbHZlUm9vdChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gcm9vdCA9IHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgPyB1c2VTYW1lTm9kZShyb290LCBlbGVtZW50KSA6IGNyZWF0ZU5ld05vZGUoZWxlbWVudCk7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHM6IGZ1bmN0aW9uIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2U6IGZ1bmN0aW9uIGRpYWdub3NlKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxvb3BPdmVyKG5vZGUpIHtcbiAgICAgICAgdmFyIGluZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZDogaW5kLFxuICAgICAgICAgIG5hbWU6IG5vZGUuZWxlbWVudC5uYW1lLFxuICAgICAgICAgIHVzZWQ6IG5vZGUuZWxlbWVudC51c2VkKCksXG4gICAgICAgICAgaWQ6IG5vZGUuZWxlbWVudC5pZCxcbiAgICAgICAgICBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9vcE92ZXIoY2hpbGQsIGluZCArIDEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICB9KHJvb3QpO1xuICAgIH0sXG4gICAgYWRkTm9kZUVudGVyQ2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVFbnRlckNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVFbnRlci5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIGFkZE5vZGVPdXRDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVPdXQucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgX29uTm9kZVJlbW92ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9mYXN0RGVlcEVxdWFsID0gcmVxdWlyZSgnZmFzdC1kZWVwLWVxdWFsJyk7XG5cbnZhciBfZmFzdERlZXBFcXVhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mYXN0RGVlcEVxdWFsKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG52YXIgU3RvcmFnZSA9IHtcbiAgZWxlbWVudHM6IHt9LFxuICBnZXQ6IGZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0pIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSA9IHsgZWZmZWN0czogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBjcmVhdGVFZmZlY3QgPSBmdW5jdGlvbiBjcmVhdGVFZmZlY3QoY2FsbGJhY2ssIGRlcHMpIHtcbiAgcmV0dXJuIHtcbiAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgZGVwczogZGVwc1xuICB9O1xufTtcbnZhciB1cGRhdGVFZmZlY3QgPSBmdW5jdGlvbiB1cGRhdGVFZmZlY3QoZWZmZWN0LCBjYWxsYmFjaywgZGVwcykge1xuICBlZmZlY3QuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgZWZmZWN0Lm9sZERlcHMgPSBlZmZlY3QuZGVwcztcbiAgZWZmZWN0LmRlcHMgPSBkZXBzO1xuICByZXR1cm4gZWZmZWN0O1xufTtcblxuZnVuY3Rpb24gZGVwc0VxdWFsKG9sZERlcHMsIG5ld0RlcHMpIHtcbiAgaWYgKCFvbGREZXBzKSByZXR1cm4gZmFsc2U7XG4gIGlmIChvbGREZXBzLmxlbmd0aCAhPT0gbmV3RGVwcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICgwLCBfZmFzdERlZXBFcXVhbDIuZGVmYXVsdCkob2xkRGVwcywgbmV3RGVwcyk7XG59XG5mdW5jdGlvbiByZXNvbHZlRWZmZWN0KG5vZGUsIGVmZmVjdCkge1xuICB2YXIgZGVwcyA9IGVmZmVjdC5kZXBzLFxuICAgICAgb2xkRGVwcyA9IGVmZmVjdC5vbGREZXBzLFxuICAgICAgY2FsbGJhY2sgPSBlZmZlY3QuY2FsbGJhY2s7XG5cblxuICBpZiAodHlwZW9mIGRlcHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICB9IGVsc2UgaWYgKGRlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKG5vZGUuZWxlbWVudC51c2VkKCkgPT09IDEpIHtcbiAgICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGFyZUVxdWFsID0gZGVwc0VxdWFsKG9sZERlcHMsIGRlcHMpO1xuXG4gICAgaWYgKCFhcmVFcXVhbCkge1xuICAgICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgY3JlYXRlVXNlRWZmZWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVmZmVjdEhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICBzdG9yYWdlLmVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmZWN0KSB7XG4gICAgICBpZiAoZWZmZWN0LmNsZWFuVXApIGVmZmVjdC5jbGVhblVwKCk7XG4gICAgfSk7XG4gICAgU3RvcmFnZS5jbGVhblVwKG5vZGUuZWxlbWVudC5pZCk7XG4gIH0pO1xuICBwcm9jZXNzb3Iub25Ob2RlT3V0KGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgaWYgKHN0b3JhZ2UuZWZmZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBzdG9yYWdlLmVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmZWN0KSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlRWZmZWN0KG5vZGUsIGVmZmVjdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBkZXBzKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLmVmZmVjdHMucHVzaChjcmVhdGVFZmZlY3QoY2FsbGJhY2ssIGRlcHMpKTtcblxuICAgICAgLy8gb3RoZXIgcnVuc1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuXG4gICAgICBzdG9yYWdlLmNvbnN1bWVyID0gaW5kZXggPCBzdG9yYWdlLmVmZmVjdHMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICAgIHVwZGF0ZUVmZmVjdChzdG9yYWdlLmVmZmVjdHNbaW5kZXhdLCBjYWxsYmFjaywgZGVwcyk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWZmZWN0SG9vaztcblxuXG5jcmVhdGVVc2VFZmZlY3RIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBTdG9yYWdlLmVsZW1lbnRzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHJldHVybiBwcm9jZXNzb3Iubm9kZSgpLmVsZW1lbnQ7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQdWJTdWJIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzdWJzY3JpYmVycyA9IHt9O1xuXG52YXIgc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKGVsZW1lbnQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHN1YnNjcmliZXJzW3R5cGVdID0ge307XG4gIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdID0gY2FsbGJhY2s7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdO1xuICB9O1xufTtcbnZhciBwdWJsaXNoID0gZnVuY3Rpb24gcHVibGlzaCh0eXBlLCBwYXlsb2FkKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnNbdHlwZV0pLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgc3Vic2NyaWJlcnNbdHlwZV1baWRdKHBheWxvYWQpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVB1YlN1Ykhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgaWYgKHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF0pIHtcbiAgICAgICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlZEVsZW1lbnQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWwgPSBzY29wZWRFbGVtZW50IHx8IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgc3Vic2NyaWJlRnVuYyA9IGZ1bmN0aW9uIHN1YnNjcmliZUZ1bmMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YnNjcmliZS5hcHBseSh1bmRlZmluZWQsIFtlbF0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG4gICAgdmFyIHB1Ymxpc2hGdW5jID0gZnVuY3Rpb24gcHVibGlzaEZ1bmMoKSB7XG4gICAgICByZXR1cm4gcHVibGlzaC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZUZ1bmMsXG4gICAgICBwdWJsaXNoOiBwdWJsaXNoRnVuYyxcbiAgICAgIHN1YnNjcmliZXJzOiBzdWJzY3JpYmVyc1xuICAgIH07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVB1YlN1Ykhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHN1YnNjcmliZXJzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VSZWR1Y2VySG9vaztcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGFjdGlvbiA9IF9yZWYuYWN0aW9uLFxuICAgICAgICBwcm9wc1RvQWN0aW9uID0gX3JlZi5wcm9wc1RvQWN0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnYWN0aW9uJywgJ3Byb3BzVG9BY3Rpb24nXSk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBkaXNwYXRjaChhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAocHJvcHNUb0FjdGlvbikge1xuICAgICAgZGlzcGF0Y2gocHJvcHNUb0FjdGlvbihyZXN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERpc3BhdGNoPiBleHBlY3RzIFwiYWN0aW9uXCIgb3IgXCJwcm9wc1RvQWN0aW9uXCIgcHJvcC4nKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVJlZHVjZXJIb29rKHVzZVN0YXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgaW5pdGlhbFN0YXRlKSB7XG4gICAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGluaXRpYWxTdGF0ZSksXG4gICAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDIpLFxuICAgICAgICBzdGF0ZSA9IF91c2VTdGF0ZTJbMF0sXG4gICAgICAgIHNldFN0YXRlID0gX3VzZVN0YXRlMlsxXTtcblxuICAgIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHNldFN0YXRlKHJlZHVjZXIoc3RhdGUoKSwgYWN0aW9uKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoLCBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpLCAvLyA8RGlzcGF0Y2g+XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlKCk7XG4gICAgfSAvLyA8R2V0U3RhdGU+XG4gICAgXTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VTdGF0ZUhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IHN0YXRlczogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICB9XG5cbiAgICByZXR1cm4gW2Z1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlLnN0YXRlc1tpbmRleF07XG4gICAgfSwgZnVuY3Rpb24gKG5ld1N0YXRlKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlc1tpbmRleF0gPSBuZXdTdGF0ZTtcbiAgICAgIGlmICghZWxlbWVudC5pc1J1bm5pbmcoKSkge1xuICAgICAgICBub2RlLnJlcnVuKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfV07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1ZhbGlkSG9va0NvbnRleHQ7XG5mdW5jdGlvbiBpc1ZhbGlkSG9va0NvbnRleHQocHJvY2Vzc29yKSB7XG4gIGlmICghcHJvY2Vzc29yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgdGVycmlibHkgd3JvbmcgaGFwcGVuZWQuIFRoZSBob29rIGZhY3RvcnkgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGhvdXQgYSBwcm9jZXNzb3IuJyk7XG4gIH1cbiAgaWYgKCFwcm9jZXNzb3Iubm9kZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIb29rcyBtdXN0IGJlIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiBhbiBBY3RNTCBlbGVtZW50LicpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlUnVudGltZSA9IGNyZWF0ZVJ1bnRpbWU7XG5cbnZhciBfUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9Qcm9jZXNzb3InKTtcblxudmFyIF9Qcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvY2Vzc29yKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfQWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vQWN0RWxlbWVudCcpO1xuXG52YXIgX0FjdEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0RWxlbWVudCk7XG5cbnZhciBfdXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWxlbWVudCcpO1xuXG52YXIgX3VzZUVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWxlbWVudCk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlUmVkdWNlciA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUmVkdWNlcicpO1xuXG52YXIgX3VzZVJlZHVjZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUmVkdWNlcik7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlUnVudGltZSgpIHtcbiAgdmFyIHByb2Nlc3NvciA9ICgwLCBfUHJvY2Vzc29yMi5kZWZhdWx0KSgpO1xuXG4gIGZ1bmN0aW9uIEEoZnVuYywgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfQWN0RWxlbWVudDIuZGVmYXVsdCkoZnVuYywgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfVxuICBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAnICsgZWxlbWVudC50b1N0cmluZygpICsgJyBwYXNzZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzb3IucnVuKGVsZW1lbnQpO1xuICB9XG4gIHZhciBGcmFnbWVudCA9IGZ1bmN0aW9uIEZyYWdtZW50KF9yZWYpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfTtcbiAgdmFyIHVzZUVsZW1lbnQgPSAoMCwgX3VzZUVsZW1lbnQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VTdGF0ZSA9ICgwLCBfdXNlU3RhdGUyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VQdWJTdWIgPSAoMCwgX3VzZVB1YlN1YjIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVJlZHVjZXIgPSAoMCwgX3VzZVJlZHVjZXIyLmRlZmF1bHQpKHVzZVN0YXRlKTtcbiAgdmFyIHVzZUVmZmVjdCA9ICgwLCBfdXNlRWZmZWN0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gIHJldHVybiB7XG4gICAgQTogQSxcbiAgICBydW46IHJ1bixcbiAgICBGcmFnbWVudDogRnJhZ21lbnQsXG4gICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IsXG4gICAgdXNlRWxlbWVudDogdXNlRWxlbWVudCxcbiAgICB1c2VQdWJTdWI6IHVzZVB1YlN1YixcbiAgICB1c2VTdGF0ZTogdXNlU3RhdGUsXG4gICAgdXNlUmVkdWNlcjogdXNlUmVkdWNlcixcbiAgICB1c2VFZmZlY3Q6IHVzZUVmZmVjdFxuICB9O1xufVxuXG52YXIgcnVudGltZSA9IGNyZWF0ZVJ1bnRpbWUoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlUnVudGltZSA9IGNyZWF0ZVJ1bnRpbWUoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQWN0TUxFbGVtZW50O1xuZnVuY3Rpb24gaXNBY3RNTEVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50Ll9fYWN0bWwgPT09IHRydWU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGtleUxpc3QgPSBPYmplY3Qua2V5cztcbnZhciBoYXNQcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09ICdvYmplY3QnICYmIHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFyckEgPSBpc0FycmF5KGEpXG4gICAgICAsIGFyckIgPSBpc0FycmF5KGIpXG4gICAgICAsIGlcbiAgICAgICwgbGVuZ3RoXG4gICAgICAsIGtleTtcblxuICAgIGlmIChhcnJBICYmIGFyckIpIHtcbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgICBpZiAoIWVxdWFsKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYXJyQSAhPSBhcnJCKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgZGF0ZUEgPSBhIGluc3RhbmNlb2YgRGF0ZVxuICAgICAgLCBkYXRlQiA9IGIgaW5zdGFuY2VvZiBEYXRlO1xuICAgIGlmIChkYXRlQSAhPSBkYXRlQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChkYXRlQSAmJiBkYXRlQikgcmV0dXJuIGEuZ2V0VGltZSgpID09IGIuZ2V0VGltZSgpO1xuXG4gICAgdmFyIHJlZ2V4cEEgPSBhIGluc3RhbmNlb2YgUmVnRXhwXG4gICAgICAsIHJlZ2V4cEIgPSBiIGluc3RhbmNlb2YgUmVnRXhwO1xuICAgIGlmIChyZWdleHBBICE9IHJlZ2V4cEIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAocmVnZXhwQSAmJiByZWdleHBCKSByZXR1cm4gYS50b1N0cmluZygpID09IGIudG9TdHJpbmcoKTtcblxuICAgIHZhciBrZXlzID0ga2V5TGlzdChhKTtcbiAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGggIT09IGtleUxpc3QoYikubGVuZ3RoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgaWYgKCFoYXNQcm9wLmNhbGwoYiwga2V5c1tpXSkpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gYSE9PWEgJiYgYiE9PWI7XG59O1xuIiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlczsiLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpICUgMikge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDI7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgRm9jdXNGaWVsZCB9IGZyb20gJy4vRE9NJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hlY2tGb3JFZGl0RmllbGQoeyB0b2RvcyB9KSB7XG4gIHJldHVybiA8Rm9jdXNGaWVsZCBpbmRleD17IHRvZG9zLmZpbmRJbmRleCgoeyBlZGl0aW5nIH0pID0+IGVkaXRpbmcpIH0gLz47XG59XG4iLCJpbXBvcnQge1xuICBUT0dHTEUsXG4gIE5FV19UT0RPLFxuICBERUxFVEUsXG4gIEVESVQsXG4gIEVESVRfVE9ETyxcbiAgQ0xFQVJfQ09NUExFVEVEXG59IGZyb20gJy4vU3RvcmUnO1xuaW1wb3J0IHtcbiAgRklMVEVSX0FMTCxcbiAgRklMVEVSX0FDVElWRSxcbiAgRklMVEVSX0NPTVBMRVRFRFxufSBmcm9tICcuLyc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5jb25zdCAkID0gKHNlbGVjdG9yKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbmNvbnN0IGxpc3QgPSAkKCcudG9kby1saXN0Jyk7XG5jb25zdCBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5cbmNvbnN0IEVOVEVSID0gMTM7XG5jb25zdCBFU0MgPSAyNztcblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxDb250YWluZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGxpc3QuaW5uZXJIVE1MID0gY2hpbGRyZW4oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oVE9HR0xFLCB0b2RvSW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZGVsZXRlJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKERFTEVURSwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElUX1RPRE8sIHsgaW5kZXg6IHRvZG9JbmRleCwgbGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSAmJiBlLmtleUNvZGUgPT09IEVTQykge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1uZXcnKSAmJiBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihORVdfVE9ETywgZS50YXJnZXQudmFsdWUpO1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBbXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gRm9jdXNGaWVsZCh7IGluZGV4IH0pIHtcbiAgY29uc3QgZWwgPSAkKGAuZWRpdFtkYXRhLWluZGV4PVwiJHsgaW5kZXggfVwiXWApO1xuXG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPSBlbC52YWx1ZS5sZW5ndGg7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3NDaGVja2VyKHsgdG9kb3MgfSkge1xuICBjb25zdCBjb21wbGV0ZWQgPSB0b2Rvcy5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IGNvbXBsZXRlZCkubGVuZ3RoO1xuICBjb25zdCBpdGVtc0xlZnQgPSB0b2Rvcy5sZW5ndGggLSBjb21wbGV0ZWQ7XG5cbiAgJCgnW2RhdGEtY291bnRdJykuaW5uZXJIVE1MID0gYFxuICAgIDxzdHJvbmc+JHsgaXRlbXNMZWZ0IH08L3N0cm9uZz4gJHsgaXRlbXNMZWZ0ID4gMSB8fCBpdGVtc0xlZnQgPT09IDAgPyAnaXRlbXMnIDogJ2l0ZW0nIH0gbGVmdFxuICBgO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGb290ZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICQoJ1tkYXRhLWZpbHRlcl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFsbCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUxMKTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFjdGl2ZScpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUNUSVZFKTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWNvbXBsZXRlZCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQ09NUExFVEVEKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKCdbZGF0YS1jbGVhci1jb21wbGV0ZWRdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBvblVzZXJBY3Rpb24oQ0xFQVJfQ09NUExFVEVEKTtcbiAgICB9KTtcbiAgfSwgW10pO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaWx0ZXJPcHRpb25zVGFicyh7IGZpbHRlciB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgJCgnW2RhdGEtYWxsXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9BTEwgPyAnc2VsZWN0ZWQnIDogJycpO1xuICAgICQoJ1tkYXRhLWFjdGl2ZV0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUNUSVZFID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgICAkKCdbZGF0YS1jb21wbGV0ZWRdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gIH0sIFtmaWx0ZXJdKTtcbn1cbiIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vU3RvcmUnO1xuXG5jb25zdCBpbml0aWFsVmFsdWUgPSBKU09OLnN0cmluZ2lmeShbXG4gIFRvRG8oeyBsYWJlbDogJ0FjdE1MIGlzIHVzaW5nIEpTWCcgfSksXG4gIFRvRG8oeyBsYWJlbDogJ0l0IGlzIGxpa2UgUmVhY3QgYnV0IG5vdCBmb3IgcmVuZGVyaW5nJyB9KVxuXSk7XG5cbmV4cG9ydCBjb25zdCB1c2VMb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IFsgZ2V0RGF0YSBdID0gdXNlU3RhdGUoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSB8fCBpbml0aWFsVmFsdWUpKTtcblxuICByZXR1cm4gZ2V0RGF0YSgpO1xufTtcbmV4cG9ydCBjb25zdCBQZXJzaXN0ID0gKHsgdG9kb3MgfSkgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGaWxsQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgRklMVEVSX0FMTCwgRklMVEVSX0FDVElWRSwgRklMVEVSX0NPTVBMRVRFRCB9IGZyb20gJy4vJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyZXIoeyB0b2RvcywgZmlsdGVyIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8RmlsbENvbnRhaW5lcj5cbiAgICAgIHtcbiAgICAgICAgKCkgPT4gdG9kb3NcbiAgICAgICAgLmZpbHRlcigoeyBjb21wbGV0ZWQgfSkgPT4ge1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BTEwpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BQ1RJVkUpIHJldHVybiAhY29tcGxldGVkO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQpIHJldHVybiBjb21wbGV0ZWQ7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KS5tYXAoKHRvZG8sIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBsaUNsYXNzID0gdG9kby5lZGl0aW5nID8gJ2VkaXRpbmcnIDogKHRvZG8uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJyk7XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPSckeyBsaUNsYXNzIH0nPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlXG4gICAgICAgICAgICAgICAgICAkeyB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnIH0+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWxhYmVsPiR7IHRvZG8ubGFiZWwgfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkZXN0cm95XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS1kZWxldGU+PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZGl0XCIgdmFsdWU9XCIkeyB0b2RvLmxhYmVsIH1cIiBkYXRhLWluZGV4PVwiJHsgaSB9XCIgZGF0YS1lZGl0PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICBgO1xuICAgICAgICB9KS5qb2luKCcnKVxuICAgICAgfVxuICAgIDwvRmlsbENvbnRhaW5lcj5cbiAgKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyB1c2VSZWR1Y2VyLCB1c2VQdWJTdWIsIHVzZUVmZmVjdCB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmV4cG9ydCBjb25zdCBUT0dHTEUgPSAnVE9HR0xFJztcbmV4cG9ydCBjb25zdCBORVdfVE9ETyA9ICdORVdfVE9ETyc7XG5leHBvcnQgY29uc3QgREVMRVRFID0gJ0RFTEVURSc7XG5leHBvcnQgY29uc3QgRURJVCA9ICdFRElUJztcbmV4cG9ydCBjb25zdCBFRElUX1RPRE8gPSAnRURJVF9UT0RPJztcbmV4cG9ydCBjb25zdCBDTEVBUl9DT01QTEVURUQgPSAnQ0xFQVJfQ09NUExFVEVEJztcblxuY29uc3QgdG9nZ2xlID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogVE9HR0xFLCB0b2RvSW5kZXggfSk7XG5jb25zdCBkZWxldGVUb2RvID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogREVMRVRFLCB0b2RvSW5kZXggfSk7XG5jb25zdCBuZXdUb2RvID0gKGxhYmVsKSA9PiAoeyB0eXBlOiBORVdfVE9ETywgbGFiZWwgfSk7XG5jb25zdCBlZGl0ID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogRURJVCwgdG9kb0luZGV4IH0pO1xuY29uc3QgZWRpdFRvRG8gPSAoeyBpbmRleCwgbGFiZWwgfSkgPT4gKHsgdHlwZTogRURJVF9UT0RPLCBpbmRleCwgbGFiZWwgfSk7XG5jb25zdCBjbGVhckNvbXBsZXRlZCA9ICgpID0+ICh7IHR5cGU6IENMRUFSX0NPTVBMRVRFRCB9KTtcblxuZXhwb3J0IGNvbnN0IFRvRG8gPSAoeyBsYWJlbCB9KSA9PiAoeyBsYWJlbCwgY29tcGxldGVkOiBmYWxzZSwgZWRpdGluZzogZmFsc2UgfSk7XG5cbmNvbnN0IHJlZHVjZXIgPSBmdW5jdGlvbiAodG9kb3MsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBUT0dHTEU6XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi50b2RvSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogIXRvZG8uY29tcGxldGVkXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVDpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgZWRpdGluZzogIXRvZG8uZWRpdGluZ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICBjYXNlIEVESVRfVE9ETzpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLmluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBsYWJlbDogYWN0aW9uLmxhYmVsLFxuICAgICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBORVdfVE9ETzpcbiAgICAgIHJldHVybiBbIC4uLnRvZG9zLCBUb0RvKHsgbGFiZWw6IGFjdGlvbi5sYWJlbCB9KSBdO1xuICAgIGNhc2UgREVMRVRFOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbywgaW5kZXgpID0+IGluZGV4ICE9PSBhY3Rpb24udG9kb0luZGV4KTtcbiAgICBjYXNlIENMRUFSX0NPTVBMRVRFRDpcbiAgICAgIHJldHVybiB0b2Rvcy5maWx0ZXIoKHRvZG8pID0+ICF0b2RvLmNvbXBsZXRlZCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0b2RvcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RvcmUoeyBpbml0aWFsVmFsdWUsIGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgWyB0b2RvcywgZGlzcGF0Y2ggXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgeyBzdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3Vic2NyaWJlKFRPR0dMRSwgKHRvZG9JbmRleCkgPT4gZGlzcGF0Y2godG9nZ2xlKHRvZG9JbmRleCkpKTtcbiAgICBzdWJzY3JpYmUoTkVXX1RPRE8sIChsYWJlbCkgPT4gZGlzcGF0Y2gobmV3VG9kbyhsYWJlbCkpKTtcbiAgICBzdWJzY3JpYmUoREVMRVRFLCAodG9kb0luZGV4KSA9PiBkaXNwYXRjaChkZWxldGVUb2RvKHRvZG9JbmRleCkpKTtcbiAgICBzdWJzY3JpYmUoRURJVCwgKGxhYmVsKSA9PiBkaXNwYXRjaChlZGl0KGxhYmVsKSkpO1xuICAgIHN1YnNjcmliZShFRElUX1RPRE8sIChwYXlsb2FkKSA9PiBkaXNwYXRjaChlZGl0VG9EbyhwYXlsb2FkKSkpO1xuICAgIHN1YnNjcmliZShDTEVBUl9DT01QTEVURUQsICgpID0+IGRpc3BhdGNoKGNsZWFyQ29tcGxldGVkKCkpKTtcbiAgfSwgW10pO1xuXG4gIGNoaWxkcmVuKHsgdG9kb3M6IHRvZG9zKCkgfSk7XG59XG4iLCIvKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCBydW4sIEZyYWdtZW50LCB1c2VQdWJTdWIsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgQ2hlY2tGb3JFZGl0RmllbGQgZnJvbSAnLi9DaGVja0ZvckVkaXRGaWVsZCc7XG5pbXBvcnQgeyBQcm9ncmVzc0NoZWNrZXIsIEZpbHRlck9wdGlvbnNUYWJzLCBDb250YWluZXIsIEZvb3RlciB9IGZyb20gJy4vRE9NJztcbmltcG9ydCB7IHVzZUxvY2FsU3RvcmFnZSwgUGVyc2lzdCB9IGZyb20gJy4vUGVyc2lzdCc7XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfQUxMID0gJ0ZJTFRFUl9BTEwnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9BQ1RJVkUgPSAnRklMVEVSX0FDVElWRSc7XG5leHBvcnQgY29uc3QgRklMVEVSX0NPTVBMRVRFRCA9ICdGSUxURVJfQ09NUExFVEVEJztcblxuZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCBpbml0aWFsVmFsdWUgPSB1c2VMb2NhbFN0b3JhZ2UoKTtcbiAgY29uc3QgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuICBjb25zdCBbIGZpbHRlciwgc2V0RmlsdGVyIF0gPSB1c2VTdGF0ZShGSUxURVJfQUxMKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHN1YnNjcmliZShGSUxURVJfQUxMLCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FMTCkpO1xuICAgIHN1YnNjcmliZShGSUxURVJfQUNUSVZFLCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FDVElWRSkpO1xuICAgIHN1YnNjcmliZShGSUxURVJfQ09NUExFVEVELCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0NPTVBMRVRFRCkpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8Q29udGFpbmVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfSAvPlxuICAgICAgPEZvb3RlciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0vPlxuICAgICAgPFN0b3JlIGluaXRpYWxWYWx1ZT17IGluaXRpYWxWYWx1ZSB9PlxuICAgICAgICA8RmlsdGVyT3B0aW9uc1RhYnMgZmlsdGVyPXsgZmlsdGVyKCkgfSAvPlxuICAgICAgICA8UmVuZGVyZXIgZmlsdGVyPXsgZmlsdGVyKCkgfS8+XG4gICAgICAgIDxDaGVja0ZvckVkaXRGaWVsZCAvPlxuICAgICAgICA8UHJvZ3Jlc3NDaGVja2VyIC8+XG4gICAgICAgIDxQZXJzaXN0IC8+XG4gICAgICA8L1N0b3JlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuXG5ydW4oPEFwcCAvPik7XG4iXSwic291cmNlUm9vdCI6IiJ9